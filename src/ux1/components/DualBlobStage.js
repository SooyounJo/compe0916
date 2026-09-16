import CircleUI from "@/components/CircleUI";
import CompanionLeftBlob from "@/components/CompanionLeftBlob";

export default function DualBlobStage({ step = 1, dotsGathering = false }) {
  return (
    <div className="dual-blob-stage">
      <CompanionLeftBlob
        step={step}
        dotsGathering={dotsGathering}
        className="dual-blob__size"
      />
      <div className="dual-blob__right dual-blob__size">
        <CircleUI
          step={step}
          dotsGathering={dotsGathering}
          dualRight
          rootClassName="!h-full !w-full !max-w-none"
        />
      </div>
    </div>
  );
}
