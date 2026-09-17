import { AgentDotsContinuity } from "@/ux2/components/AgentDots";

/** UX1 7단계 중앙 로딩 — step1 row 닷 (orbit step3 클러스터 아님) */
export default function Ux2Ux1Step7CenterLoadingDots({ white = false }) {
  return (
    <AgentDotsContinuity
      step={1}
      gathering={false}
      step1White={white}
      enableSpin={false}
    />
  );
}
