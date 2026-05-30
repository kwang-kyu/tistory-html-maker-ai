import type {
  GenerationOptions,
  SceneTimelineItem,
  ShortsAdResult,
  ShortsDuration,
} from "../types";
import { PLATFORM_LABELS, sceneCountForDuration } from "../types";

const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const VISION_MODEL = "gpt-4o";

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "API 키가 없습니다. .env 파일에 VITE_OPENAI_API_KEY를 설정한 뒤 개발 서버를 다시 시작해 주세요.",
    );
  }
  return key;
}

const PLATFORM_GUIDES: Record<GenerationOptions["platform"], string> = {
  reels:
    "인스타그램 릴스: 감성적·시각적인 문구, 여백 있는 컷, 감정선이 드러나는 자막.",
  shorts:
    "유튜브 쇼츠: 첫 1초 강한 후킹, 짧은 정보 전달, 빠른 컷 전환.",
  tiktok:
    "틱톡: 트렌디·가벼운 톤, 유행어·밈을 자연스럽게, Z세대 친화적 표현.",
  naver_blog:
    "네이버 블로그용 숏클립: 설명형·신뢰형, 스펙·근거·구매 전환(CTA)을 분명히.",
};

const TONE_GUIDES: Record<GenerationOptions["tone"], string> = {
  hooking: "톤: 강한 후킹형 — 반전·질문·숫자로 첫 화면에서 시선 고정.",
  emotional: "톤: 감성 후기형 — 경험담·공감·솔직한 후기 어조.",
  informational: "톤: 정보형 — 팩트·스펙·비교·핵심 정보만 간결히.",
  sales: "톤: 판매형 — 혜택·한정·가격·구매 CTA를 분명히.",
};

function voiceScriptRules(duration: ShortsDuration): string {
  const readWindow =
    duration === 10
      ? "약 9~10초"
      : duration === 15
        ? "약 14~15초"
        : "약 28~30초";
  const sentenceLimit =
    duration === 10
      ? "한국어 기준 3~4문장 이내"
      : duration === 15
        ? "한국어 기준 5문장 이내"
        : "한국어 기준 8~10문장 이내";

  return `[voiceScript 필수 규칙 — MP3·SRT에 그대로 사용]
- ${duration}초 쇼츠에 맞는 음성 내레이션 전체 대본
- ${sentenceLimit}
- 쇼츠 광고용으로 빠르고 경쾌한 말투, 너무 긴 설명 금지
- 자연스럽게 읽었을 때 ${readWindow}에 가까운 분량
- 각 문장은 마침표·물음표·느낌표로 끝내 명확히 구분
- 마지막 문장은 CTA로 마무리 (예: "지금 바로 확인해보세요.")
- sceneTimeline의 voice 필드는 voiceScript 문장과 동일하거나 대응되게 작성`;
}

function buildPrompt(options: GenerationOptions): string {
  const { duration, platform, tone } = options;
  const sceneCount = sceneCountForDuration(duration);
  const secPerScene = Math.round(duration / sceneCount);

  return `당신은 한국어 숏폼 제품 광고 기획자입니다.
첨부된 제품 이미지를 분석하고, ${duration}초 영상 제작용 결과를 JSON으로만 반환하세요.

[설정]
- 영상 길이: ${duration}초
- 플랫폼: ${PLATFORM_LABELS[platform]}
- ${TONE_GUIDES[tone]}
- 플랫폼 가이드: ${PLATFORM_GUIDES[platform]}

${voiceScriptRules(duration)}

[출력 규칙]
- 키 이름을 바꾸지 마세요. 값은 모두 한국어( videoPrompt는 영어+한국어 혼합 가능).
- sceneTimeline은 정확히 ${sceneCount}개 구간으로 나누세요. 전체 합이 ${duration}초가 되도록 time 필드를 "0-${secPerScene}초" 형식으로 연속 작성하세요.
- captionScript는 화면 강조용 짧은 온스크린 문구만(줄바꿈으로 구간 구분). voiceScript와 다른 짧은 카피 — 음성·SRT용이 아님.
- videoPrompt는 AI 영상 생성 도구용 1문단 장면 묘사.
- apiPayload에 duration, platform, tone, sceneCount, suggestedAspectRatio("9:16") 등 메타데이터를 넣으세요.

{
  "productSummary": "이미지 기반 제품 한 줄 요약",
  "hook": "오프닝 훅",
  "voiceScript": "전체 보이스 대본",
  "captionScript": "캡컷용 자막 스크립트",
  "sceneTimeline": [
    { "time": "0-3초", "visual": "연출", "caption": "자막", "voice": "내레이션" }
  ],
  "videoPrompt": "영상 생성 프롬프트",
  "apiPayload": {}
}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseSceneTimeline(raw: unknown): SceneTimelineItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("sceneTimeline이 비어 있거나 올바른 배열이 아닙니다.");
  }
  return raw.map((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`sceneTimeline[${index}] 형식이 올바르지 않습니다.`);
    }
    const time = typeof item.time === "string" ? item.time : "";
    const visual = typeof item.visual === "string" ? item.visual : "";
    const caption = typeof item.caption === "string" ? item.caption : "";
    const voice = typeof item.voice === "string" ? item.voice : "";
    if (!time || !visual) {
      throw new Error(`sceneTimeline[${index}]에 필수 필드가 없습니다.`);
    }
    return { time, visual, caption, voice };
  });
}

function parseShortsAdResult(raw: unknown): ShortsAdResult {
  if (!isRecord(raw)) {
    throw new Error("API 응답이 JSON 객체가 아닙니다.");
  }

  const productSummary =
    typeof raw.productSummary === "string" ? raw.productSummary : "";
  const hook = typeof raw.hook === "string" ? raw.hook : "";
  const voiceScript = typeof raw.voiceScript === "string" ? raw.voiceScript : "";
  const captionScript =
    typeof raw.captionScript === "string" ? raw.captionScript : "";
  const videoPrompt =
    typeof raw.videoPrompt === "string" ? raw.videoPrompt : "";

  if (!productSummary || !hook) {
    throw new Error("productSummary 또는 hook이 비어 있습니다.");
  }

  const sceneTimeline = parseSceneTimeline(raw.sceneTimeline);
  const apiPayload = isRecord(raw.apiPayload) ? raw.apiPayload : {};

  return {
    productSummary,
    hook,
    voiceScript,
    captionScript,
    sceneTimeline,
    videoPrompt,
    apiPayload,
  };
}

async function readOpenAiError(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (isRecord(body) && isRecord(body.error)) {
      const msg = body.error.message;
      const code = body.error.code;
      if (typeof msg === "string") {
        return code ? `${msg} (${code})` : msg;
      }
    }
  } catch {
    /* ignore */
  }
  return `OpenAI API 오류 (HTTP ${response.status})`;
}

export async function analyzeProductWithVision(
  imageDataUrl: string,
  options: GenerationOptions,
): Promise<ShortsAdResult> {
  const apiKey = getApiKey();
  const maxTokens = options.duration >= 30 ? 4000 : 2800;

  let response: Response;
  try {
    response = await fetch(OPENAI_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        response_format: { type: "json_object" },
        max_tokens: maxTokens,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: buildPrompt(options) },
              {
                type: "image_url",
                image_url: { url: imageDataUrl, detail: "high" },
              },
            ],
          },
        ],
      }),
    });
  } catch {
    throw new Error("네트워크 오류로 OpenAI API에 연결하지 못했습니다.");
  }

  if (!response.ok) {
    throw new Error(await readOpenAiError(response));
  }

  const data: unknown = await response.json();
  if (!isRecord(data) || !Array.isArray(data.choices) || data.choices.length === 0) {
    throw new Error("OpenAI 응답 형식이 예상과 다릅니다.");
  }

  const first = data.choices[0];
  if (!isRecord(first) || !isRecord(first.message)) {
    throw new Error("메시지 본문을 찾을 수 없습니다.");
  }

  const content = first.message.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("모델이 빈 응답을 반환했습니다.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("모델 응답을 JSON으로 파싱하지 못했습니다.");
  }

  return parseShortsAdResult(parsed);
}
