const STEPS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ScreenNav({ activeStep, onSelect }) {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex justify-center gap-2 px-4 py-4"
      aria-label="연속 UI 진행 단계"
    >
      {STEPS.map((step) => {
        const isActive = activeStep === step;
        return (
          <button
            key={step}
            type="button"
            onClick={() => onSelect(step)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-[#383645] shadow-md"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
            aria-current={isActive ? "step" : undefined}
          >
            {step}
          </button>
        );
      })}
    </nav>
  );
}
