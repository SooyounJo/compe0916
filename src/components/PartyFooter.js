import BlurFade from "@/components/BlurFade";

export default function PartyFooter({ step }) {
  const showParty = step === 4;
  const showWine = step === 5;

  const baseClass =
    "font-doto absolute bottom-[11%] left-1/2 z-30 w-full -translate-x-1/2 px-4 text-center text-[4.65cqw] font-black leading-none tracking-[-0.04em]";

  return (
    <>
      <BlurFade
        show={showParty}
        className={`${baseClass} party-footer-party-in party-footer-text party-footer-text-shimmer`}
      >
        Let&apos;s Party!
      </BlurFade>
      <BlurFade
        show={showWine}
        className={`${baseClass} party-footer-text`}
      >
        wine, friends...
      </BlurFade>
    </>
  );
}
