import { useEffect, useState } from "react";
import { UX2_PRE_STEP_NIGHT_HOLD_MS } from "@/ux2/lib/ux2PreStepRightEnter";

/** -1 — night 퇴장과 동시에 0단계 BG(좌·우) 페이드 인 */
export function useUx2PreStep1Handoff(step) {
  const [revealStep0Bg, setRevealStep0Bg] = useState(step >= 0);

  useEffect(() => {
    if (step === -1) {
      setRevealStep0Bg(false);
      const t = setTimeout(
        () => setRevealStep0Bg(true),
        UX2_PRE_STEP_NIGHT_HOLD_MS,
      );
      return () => clearTimeout(t);
    }

    if (step >= 0) {
      setRevealStep0Bg(true);
      return undefined;
    }

    setRevealStep0Bg(false);
    return undefined;
  }, [step]);

  return revealStep0Bg;
}
