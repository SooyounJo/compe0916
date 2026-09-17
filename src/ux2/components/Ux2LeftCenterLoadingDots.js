import { AgentDotsContinuity } from "@/ux2/components/AgentDots";

/** UX2 3단계 좌측 원 중앙 — 클러스터 orbit 로딩 */
export default function Ux2LeftCenterLoadingDots() {
  return <AgentDotsContinuity step={3} gathering={false} />;
}
