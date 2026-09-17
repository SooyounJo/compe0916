import Image from "next/image";
import { AgentDotsContinuity } from "@/ux2/components/AgentDots";
import { AgentBlobShell } from "@/components/AgentBlobCluster";
import BlurFade from "@/components/BlurFade";
import VoiceMusicSlot from "@/components/VoiceMusicSlot";
import PartyFooter from "@/ux2/components/PartyFooter";
import RightCompanionStep0 from "@/ux2/components/RightCompanionStep0";
import RightCompanionStep1To2 from "@/ux2/components/RightCompanionStep1To2";
import RightCompanionStep4 from "@/ux2/components/RightCompanionStep4";
import RightCompanionStep5 from "@/ux2/components/RightCompanionStep5";
import IconOrbitCarousel from "@/components/IconOrbitCarousel";
import OrbitWinePersist from "@/components/OrbitWinePersist";
import PartyNightScreen from "@/components/PartyNightScreen";
import PartyNightBackground from "@/components/PartyNightBackground";
import Ux2CenterHalftoneExpand from "@/ux2/components/Ux2CenterHalftoneExpand";
import RightCompanionStep6 from "@/ux2/components/RightCompanionStep6";
import Ux2Step7RightBackground from "@/ux2/components/Ux2Step7RightBackground";
import RightCompanionStep8 from "@/ux2/components/RightCompanionStep8";
import RightCompanionStep9 from "@/ux2/components/RightCompanionStep9";
import Ux2Step9RightBackground from "@/ux2/components/Ux2Step9RightBackground";
import DotGridAmbient from "@/ux2/components/DotGridAmbient";
import WeatherBackground from "@/ux2/components/WeatherBackground";
import Ux2InstagramIconPersist from "@/ux2/components/Ux2InstagramIconPersist";
import Ux2Step0IconMotion from "@/ux2/components/Ux2Step0IconMotion";
import Ux2VoiceIconAtSlot from "@/ux2/components/Ux2VoiceIconAtSlot";
import { pctCircleRight, STEP0_RIGHT_ROW } from "@/ux2/lib/ux2Step0Layout";
import cardStyles from "@/ux2/styles/step1-to2-cards.module.css";

const RIGHT_ROW = STEP0_RIGHT_ROW;
const RIGHT_SLOT_X = RIGHT_ROW.left + RIGHT_ROW.blobSize / 2;
const RIGHT_SLOT_Y = RIGHT_ROW.top + RIGHT_ROW.height / 2;
const RIGHT_BLOB_CQW = pctCircleRight(RIGHT_ROW.blobSize);

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
  showIgPersist = false,
  onIgSlotReady,
}) {
  /** 듀얼 레이아웃 우측 원은 에이전트 UI를 풀 스케일로 */
  const isCompact = !dualRight && step >= 2 && step < 6;

  /** 2번만 보조 블롭 (5번은 궤도 UI — blob-extra 노란 조각이 중앙으로 새는 것 방지) */
  const blobExtrasOpacity = step === 2 ? 0.35 : 0;
  const showYellowBlobExtra = false;
  const blobSqueeze = step >= 3 && step <= 4;

  /** 1→2→3 같은 닷 DOM — BlurFade 제외 */
  const dotsPhase = step <= 1 ? 1 : step <= 3 ? step : 3;
  const centerClusterGather = dotsGathering;
  const centerClusterExit = step >= 4 && !dotsGathering;
  /** 듀얼 우측: 3→4 gather·축소 동안만 중앙 닷/쉘 */
  const showCenterDots = dualRight
    ? dotsGathering && step <= 4
    : step <= 4 || dotsGathering;
  const showCenterBlobShell = dualRight
    ? dotsGathering && step <= 4
    : (step >= 2 && step <= 4) || dotsGathering;
  const shellLit = dualRight
    ? dotsGathering && step <= 4
    : (step >= 3 && step <= 4) || dotsGathering;
  const centerDotsSpin = !dualRight;
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

  /** UX2 듀얼 우측 — 0·1·2단계 정적 BG (링 미표시) */
  const showWeatherRings =
    step < 6 && (dualRight ? step >= 3 : step !== 1);

  /** 듀얼 우측: 7+ 할프톤 정적 BG · 3~6 weather · 단일 원 6에서 party-night */
  const showWeatherLayer = dualRight ? step < 7 : step < 6;
  const showStep7RightVideoBg = dualRight && (step === 7 || step === 8);
  const circleStep6Out = step >= 6 && !dualRight;

  return (
    <div
      className={`@container/circle relative aspect-square w-[min(88vmin,560px)] max-w-[560px] overflow-hidden rounded-full bg-[#0a0a0a] shadow-[0_8px_40px_rgba(0,0,0,0.45)] [container-type:size] ${
        circleStep6Out ? "circle-step-6-out" : ""
      } ${rootClassName}`}
      role="img"
      aria-label="연속 UI 경험"
    >
      <BlurFade
        show={showWeatherLayer}
        className="pointer-events-none absolute -inset-[2.5%] overflow-hidden rounded-full"
      >
        <WeatherBackground step={step} dualInnerGlow={dualRight} />
      </BlurFade>
      <BlurFade
        show={showWeatherRings}
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
        show={showWeatherRings}
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

      {dualRight ? (
        <Ux2CenterHalftoneExpand step={step} />
      ) : (
        <PartyNightBackground step={step} />
      )}
      {dualRight ? (
        <Ux2Step7RightBackground show={showStep7RightVideoBg} />
      ) : null}
      {dualRight ? (
        <Ux2Step9RightBackground show={step >= 9 && step <= 11} step={step} />
      ) : null}
      <BlurFade
        show={dualRight ? step >= 5 && step <= 7 : step >= 5}
        className="pointer-events-none absolute inset-0 z-[28]"
      >
        {step >= 5 && (dualRight ? step <= 7 : true) ? (
          <DotGridAmbient step={step} />
        ) : null}
      </BlurFade>
      {dualRight && step >= 6 ? null : <PartyNightScreen step={step} />}

      {dualRight ? (
        <>
          <Ux2Step0IconMotion
            show={step === 0}
            slotCenterX={RIGHT_SLOT_X}
            slotCenterY={RIGHT_SLOT_Y}
            originCenterX={RIGHT_SLOT_X}
            originCenterY={RIGHT_SLOT_Y}
            blobSizeCqw={RIGHT_BLOB_CQW}
            toPct={pctCircleRight}
            onSettled={onIgSlotReady}
            handoffMode="opacity"
            instagramAtOrigin={false}
            iconFillColor="#FFFFFF"
            emphasized
          />
          <Ux2InstagramIconPersist
            show={showIgPersist}
            slotCenterX={RIGHT_SLOT_X}
            slotCenterY={RIGHT_SLOT_Y}
            blobSizeCqw={RIGHT_BLOB_CQW}
            toPct={pctCircleRight}
            emphasized
            className={step === 1 ? cardStyles.instagramCard1Glow : ""}
          />
          <Ux2VoiceIconAtSlot
            show={step === 3 || (step === 4 && dotsGathering)}
            slotCenterX={RIGHT_SLOT_X}
            slotCenterY={RIGHT_SLOT_Y}
            iconSizeCqw={RIGHT_BLOB_CQW * 0.58}
            toPct={pctCircleRight}
          />
        </>
      ) : null}

      <RightCompanionStep0 show={step === 0 && dualRight} />
      {dualRight ? <RightCompanionStep1To2 step={step} /> : null}
      {dualRight ? <RightCompanionStep4 show={step === 4} /> : null}
      {dualRight && step >= 4 && step <= 6 ? (
        <RightCompanionStep5 show={step === 5 || step === 6} step={step} />
      ) : null}
      {dualRight ? (
        <RightCompanionStep6
          show={step >= 6 && step <= 11}
          step={step}
        />
      ) : null}
      {dualRight ? (
        <RightCompanionStep8 show={step === 8} />
      ) : null}
      {dualRight && step >= 9 && step <= 11 ? (
        <RightCompanionStep9
          show
          flowStep={step}
          exitDown={step === 11}
          cardSlideFromLeft={step === 9}
        />
      ) : null}

      <BlurFade
        show={
          step >= 2 &&
          step <= 4 &&
          !(dualRight && (step === 2 || step === 3 || step === 4))
        }
        className="pointer-events-none absolute inset-0 z-30"
      >
        {step >= 2 &&
        step <= 4 &&
        !(dualRight && (step === 2 || step === 3 || step === 4)) ? (
          <VoiceMusicSlot step={step} dotsGathering={dotsGathering} />
        ) : null}
      </BlurFade>

      {/* 5~6 궤도·와인 — Figma cqw(원 전체), compact(0.46) 밖 */}
      <BlurFade
        show={step === 5 && !dualRight}
        className="pointer-events-none absolute inset-0 z-[11]"
      >
        {step === 5 && !dualRight ? <IconOrbitCarousel step={step} /> : null}
      </BlurFade>
      <BlurFade
        show={step >= 5 && !dualRight}
        className="pointer-events-none absolute inset-0 z-[11]"
      >
        {step >= 5 && !dualRight ? <OrbitWinePersist step={step} /> : null}
      </BlurFade>

      {/* 로딩 닷: 1번 하단 → 2·3 중앙 — 단계 버튼 전환 시 BlurFade */}
      <div
        className="absolute left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.2,1)]"
        style={{
          top: dualRight && step <= 1 ? "50%" : step <= 1 ? "68%" : "50%",
        }}
      >
        <BlurFade
          show={
            dotsLayerVisible &&
            (showCenterDots || showCenterBlobShell)
          }
          className="pointer-events-none"
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
                enableSpin={centerDotsSpin}
              />
            </div>
          ) : null}
        </div>
        </BlurFade>
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

      <PartyFooter step={step} dualRight={dualRight} />
    </div>
  );
}
