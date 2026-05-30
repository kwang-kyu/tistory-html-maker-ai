import type { SceneTimelineItem, ShortsAdExport } from "../types";
import {
  DURATION_LABELS,
  PLATFORM_LABELS,
  TONE_LABELS,
} from "../types";

export function formatSceneTimelineForCopy(
  timeline: SceneTimelineItem[],
): string {
  return timeline
    .map(
      (s, i) =>
        `[${i + 1}] ${s.time}\n연출: ${s.visual}\n자막: ${s.caption}\n보이스: ${s.voice}`,
    )
    .join("\n\n");
}

/** 캡컷용 복사 — 장면 구성 블록 */
export function formatSceneTimelineForCapCut(
  timeline: SceneTimelineItem[],
): string {
  return timeline
    .map(
      (s) =>
        `${s.time}\n화면: ${s.visual}\n자막: ${s.caption}\n음성: ${s.voice}`,
    )
    .join("\n\n");
}

export function buildCapCutCopyText(data: ShortsAdExport): string {
  return [
    "[캡컷용 쇼츠 제작 자료]",
    "",
    "■ 영상 길이",
    `${data.selectedDuration}초`,
    "",
    "■ 플랫폼",
    PLATFORM_LABELS[data.selectedPlatform],
    "",
    "■ 톤",
    TONE_LABELS[data.selectedTone],
    "",
    "■ 제품 요약",
    data.productSummary,
    "",
    "■ 오프닝 훅",
    data.hook,
    "",
    "■ 음성 대본",
    data.voiceScript,
    "",
    "■ 화면 자막",
    data.captionScript,
    "",
    "■ 장면 구성",
    formatSceneTimelineForCapCut(data.sceneTimeline),
    "",
    "■ 영상 생성 프롬프트",
    data.videoPrompt,
  ].join("\n");
}

export function formatApiPayloadForCopy(
  payload: Record<string, unknown>,
): string {
  return JSON.stringify(payload, null, 2);
}

export function buildFullCopyText(data: ShortsAdExport): string {
  const meta = `길이: ${DURATION_LABELS[data.selectedDuration]} | 플랫폼: ${PLATFORM_LABELS[data.selectedPlatform]} | 톤: ${TONE_LABELS[data.selectedTone]}`;

  return [
    meta,
    "",
    "■ 제품 분석 요약",
    data.productSummary,
    "",
    "■ 오프닝 훅",
    data.hook,
    "",
    "■ 음성 대본",
    data.voiceScript,
    "",
    "■ 캡컷용 자막",
    data.captionScript,
    "",
    "■ 장면 타임라인",
    formatSceneTimelineForCopy(data.sceneTimeline),
    "",
    "■ 영상 생성 프롬프트",
    data.videoPrompt,
    "",
    "■ API 전송용 JSON (apiPayload)",
    formatApiPayloadForCopy(data.apiPayload),
  ].join("\n");
}

export function buildExportJson(data: ShortsAdExport): string {
  const payload = {
    productSummary: data.productSummary,
    hook: data.hook,
    voiceScript: data.voiceScript,
    captionScript: data.captionScript,
    sceneTimeline: data.sceneTimeline,
    videoPrompt: data.videoPrompt,
    apiPayload: data.apiPayload,
    selectedDuration: data.selectedDuration,
    selectedPlatform: data.selectedPlatform,
    selectedTone: data.selectedTone,
  };
  return JSON.stringify(payload, null, 2);
}

export function downloadJsonFile(data: ShortsAdExport, filename: string): void {
  const blob = new Blob([buildExportJson(data)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
