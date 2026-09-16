"use client";

import { useCallback, useEffect, useState } from "react";
import CircleUI from "@/ux2/components/CircleUI";
import CompanionLeftBlob from "@/ux2/components/CompanionLeftBlob";

export default function DualBlobStage({ step = 1, dotsGathering = false }) {
  const [igSlotReady, setIgSlotReady] = useState(false);

  useEffect(() => {
    if (step === 0) {
      setIgSlotReady(false);
    } else if (step >= 1 && step <= 3) {
      setIgSlotReady(true);
    }
  }, [step]);

  const handleIgSlotReady = useCallback(() => {
    setIgSlotReady(true);
  }, []);

  const showIgPersist = step <= 2 && (step >= 1 || igSlotReady);

  return (
    <div className="dual-blob-stage flex-nowrap">
      <CompanionLeftBlob
        step={step}
        dotsGathering={dotsGathering}
        className="dual-blob__size"
        showIgPersist={showIgPersist}
        onIgSlotReady={handleIgSlotReady}
      />
      <div className="dual-blob__right dual-blob__size">
        <CircleUI
          step={step}
          dotsGathering={dotsGathering}
          dualRight
          rootClassName="!h-full !w-full !max-w-none"
          showIgPersist={showIgPersist}
          onIgSlotReady={handleIgSlotReady}
        />
      </div>
    </div>
  );
}
