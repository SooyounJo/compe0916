import { UX2_MINUS5_STEP, UX2_NAV_STEPS } from "@/ux2/lib/ux2FlowSteps";

export default function ScreenNav({ activeStep, onSelect }) {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex max-w-[100vw] flex-wrap justify-center gap-1.5 px-3 py-3 sm:gap-2 sm:px-4 sm:py-4"
      aria-label="연속 UI 진행 단계"
    >      {UX2_NAV_STEPS.map((step) => {
        const isActive = activeStep === step;
        return (
          <button
            key={step}
            type="button"
            onClick={() => onSelect(step)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 text-xs font-medium transition-colors sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm ${
              isActive
                ? "bg-white text-[#383645] shadow-md"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
            aria-current={isActive ? "step" : undefined}
          >
            {step === UX2_MINUS5_STEP ? "−5" : step}
          </button>
        );
      })}
    </nav>
  );
}
