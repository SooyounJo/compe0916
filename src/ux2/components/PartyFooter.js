import BlurFade from "@/components/BlurFade";

export default function PartyFooter({ step, dualRight = false }) {
  const showParty = step === 4 && !dualRight;
  const showWine = step === 5 && !dualRight;

  const baseClass =
    "font-doto absolute bottom-[11%] left-1/2 z-30 w-full -translate-x-1/2 px-4 text-center text-[4.65cqw] font-black leading-none tracking-[-0.04em]";

  const textStyle = {
    backgroundImage:
      "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 4px 73px rgba(255,255,255,0.45)",
  };

  return (
    <>
      <BlurFade
        show={showParty}
        className={`${baseClass} party-footer-party-in`}
        style={textStyle}
      >
        Let&apos;s Party!
      </BlurFade>
      <BlurFade show={showWine} className={baseClass} style={textStyle}>
        wine, friends
      </BlurFade>
    </>
  );
}
