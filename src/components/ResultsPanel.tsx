import type { ShortsAdExport } from "../types";
import {
  DURATION_LABELS,
  PLATFORM_LABELS,
  TONE_LABELS,
} from "../types";
import {
  formatApiPayloadForCopy,
  formatSceneTimelineForCopy,
} from "../utils/resultText";
import { ResultCard } from "./ResultCard";

interface ResultsPanelProps {
  data: ShortsAdExport;
  onCopy: (text: string) => void;
  onCopyAll: () => void;
  onCopyCapCut: () => void;
  onDownloadJson: () => void;
  onDownloadVoiceMp3: () => void;
  onDownloadSrt: () => void;
  isTtsLoading: boolean;
}

export function ResultsPanel({
  data,
  onCopy,
  onCopyAll,
  onCopyCapCut,
  onDownloadJson,
  onDownloadVoiceMp3,
  onDownloadSrt,
  isTtsLoading,
}: ResultsPanelProps) {
  const metaLine = `${DURATION_LABELS[data.selectedDuration]} · ${PLATFORM_LABELS[data.selectedPlatform]} · ${TONE_LABELS[data.selectedTone]}`;

  return (
    <article className="results">
      <header className="results__head">
        <div>
          <p className="results__eyebrow">생성 완료</p>
          <p className="results__meta">{metaLine}</p>
        </div>
        <span className="chip chip--ok">OpenAI Vision</span>
      </header>

      <div className="results__actions">
        <button type="button" className="btn-secondary" onClick={onCopyAll}>
          전체 복사
        </button>
        <button type="button" className="btn-secondary" onClick={onCopyCapCut}>
          캡컷용 복사
        </button>
        <button type="button" className="btn-secondary" onClick={onDownloadJson}>
          JSON 다운로드
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={onDownloadVoiceMp3}
          disabled={isTtsLoading}
        >
          {isTtsLoading ? "음성 생성 중..." : "음성 MP3 다운로드"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={onDownloadSrt}
          title="음성 대본과 동일한 문장으로 SRT 파일 생성"
        >
          SRT 자막 다운로드
        </button>
      </div>

      <ResultCard
        title="제품 분석 요약"
        copyText={data.productSummary}
        onCopy={onCopy}
      >
        <p className="result-text">{data.productSummary}</p>
      </ResultCard>

      <ResultCard title="오프닝 훅" copyText={data.hook} onCopy={onCopy}>
        <p className="result-text result-text--hook">{data.hook}</p>
      </ResultCard>

      <ResultCard
        title="음성 대본"
        copyText={data.voiceScript}
        onCopy={onCopy}
      >
        <p className="result-card__hint">MP3로 읽히는 문장 · SRT 자막과 동일</p>
        <p className="result-text result-text--script">{data.voiceScript}</p>
      </ResultCard>

      <ResultCard
        title="캡컷용 자막"
        copyText={data.captionScript}
        onCopy={onCopy}
      >
        <p className="result-card__hint">화면 강조용 짧은 문구 (음성·SRT와 별도)</p>
        <p className="result-text result-text--script">{data.captionScript}</p>
      </ResultCard>

      <ResultCard
        title="장면 타임라인"
        copyText={formatSceneTimelineForCopy(data.sceneTimeline)}
        onCopy={onCopy}
      >
        <ol className="timeline">
          {data.sceneTimeline.map((s, i) => (
            <li key={i} className="timeline__item">
              <div className="timeline__time">{s.time}</div>
              <div className="timeline__body">
                <p className="timeline__row">
                  <span className="k">연출</span>
                  <span>{s.visual}</span>
                </p>
                <p className="timeline__row">
                  <span className="k">자막</span>
                  <span>{s.caption}</span>
                </p>
                <p className="timeline__row">
                  <span className="k">보이스</span>
                  <span>{s.voice}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ResultCard>

      <ResultCard
        title="영상 생성 프롬프트"
        copyText={data.videoPrompt}
        onCopy={onCopy}
      >
        <p className="result-text result-text--dim">{data.videoPrompt}</p>
      </ResultCard>

      <ResultCard
        title="API 전송용 JSON"
        copyText={formatApiPayloadForCopy(data.apiPayload)}
        onCopy={onCopy}
      >
        <pre className="json-pre">
          {JSON.stringify(data.apiPayload, null, 2)}
        </pre>
      </ResultCard>
    </article>
  );
}
