export default function DotGridOverlay({ step }) {
  const opacity =
    step >= 6 ? 0.16 : step >= 5 ? 0.08 : step >= 4 ? 0.03 : 0;

  if (opacity <= 0) return null;

  return (
    <div
      className="dot-grid-overlay pointer-events-none fixed inset-0 z-40 transition-opacity duration-1000 ease-in-out"
      style={{ opacity }}
      aria-hidden
    />
  );
}
