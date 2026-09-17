import { AgentDotsContinuity } from "@/ux2/components/AgentDots";

/** UX1 8단계 우측 중앙 — 정삼각형 클러스터 회전(원형 로딩) */
export default function Ux2Ux1Step8CircleLoadingDots({ white = true }) {
  return (
    <AgentDotsContinuity
      step={2}
      gathering={false}
      step1White={white}
      enableSpin
    />
  );
}
