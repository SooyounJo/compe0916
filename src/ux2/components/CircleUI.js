import Image from "next/image";
import { AgentDotsContinuity } from "@/components/AgentDots";
import { AgentBlobShell } from "@/components/AgentBlobCluster";
import BlurFade from "@/components/BlurFade";
import VoiceMusicSlot from "@/components/VoiceMusicSlot";
import PartyFooter from "@/components/PartyFooter";
import RightCompanionStep1 from "@/ux2/components/RightCompanionStep1";
import IconOrbitCarousel from "@/components/IconOrbitCarousel";
import OrbitWinePersist from "@/components/OrbitWinePersist";
import PartyNightScreen from "@/components/PartyNightScreen";
import PartyNightBackground from "@/components/PartyNightBackground";
import DotGridAmbient from "@/components/DotGridAmbient";
import WeatherBackground from "@/ux2/components/WeatherBackground";

const T = "duration-1000 ease-in-out transition-all";
/** 3→4: gather(3末) → 4에서 블롭·닷 함께 축소 */
const CENTER_CLUSTER_EASE =
  "ease-[cubic-bezier(0.33,0,0.15,1)] transition-[transform,opacity,filter]";
const CENTER_CLUSTER_IDLE = `scale-100 opacity-100 blur-0 duration-[900ms] ${CENTER_CLUSTER_EASE}`;
const CENTER_CLUSTER_GATHER = `scale-[0.94] opacity-[0.88] blur-[2px] duration-[1000ms] ${CENTER_CLUSTER_EASE}`;
const CENTER_CLUSTER_GONE = `scale-[0] opacity-0 blur-[10px] duration-[1200ms] ${CENTER_CLUSTER_EASE}`;
/** 2~6: Figma 에이전트 UI 축소 (1번은 풀 비율) */
const COMPACT_UI_SCALE = 0.46;

export default function CircleUI({
  step = 1,
  dotsGathering = false,
  dualRight = false,
  rootClassName = "",
}) {
  /** 듀얼 레이아웃 우측 원은 에이전트 UI를 풀 스케일로 */
  const isCompact = !dualRight && step >= 2 && step < 6;

  /** 2번만 보조 블롭 (5번은 궤도 UI — blob-extra 노란 조각이 중앙으로 새는 것 방지) */
  const blobExtrasOpacity = step === 2 ? 0.35 : 0;
  const showYellowBlobExtra = false;
  const blobSqueeze = step >= 3 && step <= 4;

  /** 1→2→3 같은 닷 DOM — BlurFade 제외 */
  const dotsPhase = step <= 1 ? 1 : step <= 3 ? step : 3;
  const centerClusterGather = dotsGathering && step === 3;
  const centerClusterExit = step >= 4;
  const showCenterDots =
    dualRight ? (step >= 2 && step <= 4) || dotsGathering : step <= 4 || dotsGathering;
  /** 2에서 미리 마운트(숨김) → 3에서 닷 크기에서 블롭으로 연속 확대 */
  const showCenterBlobShell =
    (step >= 2 && step <= 4) || dotsGathering;
  const shellLit = (step >= 3 && step <= 4) || dotsGathering;
  const dotsLayerVisible = step <= 4 || dotsGathering;

  const BLOB_SHELL_REVEAL =
    "origin-center transition-[transform,opacity,filter] duration-[1000ms] ease-[cubic-bezier(0.33,0,0.15,1)]";
  const blobShellRevealClass = shellLit
    ? "scale-100 opacity-100 blur-0"
    : "scale-[0.38] opacity-0 blur-[8px] pointer-events-none";

  const clusterMotionClass = centerClusterExit
    ? CENTER_CLUSTER_GONE
    : centerClusterGather
      ? CENTER_CLUSTER_GATHER
      : CENTER_CLUSTER_IDLE;

  return (
    <div
      className={`@container/circle relative aspect-square w-[min(88vmin,560px)] max-w-[560px] overflow-hidden rounded-full bg-[#0a0a0a] shadow-[0_8px_40px_rgba(0,0,0,0.45)] [container-type:size] ${
        step >= 6 ? "circle-step-6-out" : ""
      } ${rootClassName}`}
      role="img"
      aria-label="연속 UI 경험"
    >
      <BlurFade
        show={step < 6}
        className="pointer-events-none absolute -inset-[2.5%] overflow-hidden rounded-full"
      >
        <WeatherBackground step={step} dualInnerGlow={dualRight} />
      </BlurFade>
      <BlurFade
        show={step < 6 && step !== 1}
        className="pointer-events-none absolute inset-0 origin-center scale-[1.12]"
      >
        <Image
          src="/figma/ring-inner.svg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 560px) 88vmin, 560px"
        />
      </BlurFade>
      <BlurFade
        show={step < 6 && step !== 1}
        className="pointer-events-none absolute inset-0 origin-center scale-[1.04]"
      >
        <Image
          src="/figma/ring-outer.svg"
          alt=""
          fill
          className="object-cover object-center opacity-90"
          sizes="(max-width: 560px) 88vmin, 560px"
        />
      </BlurFade>

      <PartyNightBackground step={step} />
      <DotGridAmbient step={step} />
      <PartyNightScreen step={step} />

      <RightCompanionStep1 show={step === 1} />

      <VoiceMusicSlot step={step} dotsGathering={dotsGathering} />

      {/* 5~6 궤도·와인 — Figma cqw(원 전체), compact(0.46) 밖 */}
      <IconOrbitCarousel step={step} />
      <OrbitWinePersist step={step} />

      {/* 로딩 닷: 1번 하단 → 2·3 중앙, 항상 동일 인스턴스 (blur 페이드 없음) */}
      <div
        className={`absolute left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transition-[top,opacity] duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.2,1)] ${
          dotsLayerVisible ? "" : "pointer-events-none"
        }`}
        style={{
          top: dualRight && step <= 1 ? "50%" : step <= 1 ? "68%" : "50%",
          opacity: dotsLayerVisible ? 1 : 0,
        }}
      >
        <div
          className={`origin-center will-change-[transform,opacity,filter] ${clusterMotionClass}`}
          style={{ transformOrigin: "center center" }}
        >
          {showCenterBlobShell ? (
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${BLOB_SHELL_REVEAL} ${blobShellRevealClass}`}
            >
              <AgentBlobShell
                active={
                  shellLit &&
                  step === 3 &&
                  !dotsGathering &&
                  !centerClusterExit
                }
              />
            </div>
          ) : null}
          {showCenterDots ? (
            <div className="relative z-10">
              <AgentDotsContinuity
                step={dotsPhase}
                gathering={dotsGathering}
                step1White
              />
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={`absolute inset-0 z-20 origin-center transition-transform duration-1000 ease-in-out ${
          isCompact ? "" : "pointer-events-none"
        }`}
        style={{
          transform: isCompact ? `scale(${COMPACT_UI_SCALE})` : "scale(1)",
        }}
      >
        <BlurFade show={isCompact} className="absolute inset-0">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <BlurFade
              show={showYellowBlobExtra && blobExtrasOpacity > 0.02}
              opacity={blobExtrasOpacity * 0.95}
              className={`absolute -right-[8%] top-[8%] h-[38%] w-[38%] ${T} ${
                blobSqueeze ? "agent-squeeze-blob" : ""
              }`}
            >
              <Image
                src="/figma/blob-extra-1.svg"
                alt=""
                width={555}
                height={555}
                className="h-full w-full max-w-none"
              />
            </BlurFade>
            <BlurFade
              show={blobExtrasOpacity > 0.02}
              opacity={blobExtrasOpacity * 0.9}
              className={`absolute -right-[18%] top-[22%] h-[32%] w-[32%] ${T} ${
                blobSqueeze ? "agent-squeeze-blob agent-squeeze-blob-delay" : ""
              }`}
            >
              <Image
                src="/figma/blob-extra-2.svg"
                alt=""
                width={555}
                height={525}
                className="h-full w-full max-w-none"
              />
            </BlurFade>
            <BlurFade
              show={blobExtrasOpacity > 0.02}
              opacity={blobExtrasOpacity * 0.9}
              className={`absolute -left-[12%] bottom-[6%] h-[34%] w-[34%] ${T} ${
                blobSqueeze ? "agent-squeeze-blob agent-squeeze-blob-delay-2" : ""
              }`}
            >
              <Image
                src="/figma/blob-extra-3.svg"
                alt=""
                width={512}
                height={555}
                className="h-full w-full max-w-none"
              />
            </BlurFade>
          </div>

        </BlurFade>
      </div>

      <PartyFooter step={step} />
    </div>
  );
}
