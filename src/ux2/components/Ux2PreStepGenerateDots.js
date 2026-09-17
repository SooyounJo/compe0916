"use client";

import DotGridAmbient from "@/ux2/components/DotGridAmbient";

/** -4~-2 — generate 픽셀 닷 그리드 (우측 원) · -4·-3 중앙 로딩 없음 */
export default function Ux2PreStepGenerateDots({ step = 0, className = "" }) {
  if (step < -4 || step > -2) {
    return null;
  }

  if (step === -4 || step === -3) {
    return null;
  }

  return (
    <DotGridAmbient step={step} variant="preStep" className={className} />
  );
}
