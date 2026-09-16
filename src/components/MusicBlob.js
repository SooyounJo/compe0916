import Image from "next/image";

/** 궤도 아이콘(IconOrbitCarousel)과 동일한 블롭·음표 비율 */
export default function MusicBlob({ active, orbitShell = false }) {
  return (
    <div
      className={`relative h-full w-full ${orbitShell ? "opacity-[0.52]" : ""}`}
      aria-hidden={!active}
    >
      {orbitShell ? (
        <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/15 blur-md" />
      ) : null}
      <Image
        src="/figma/blob-icon-bg.svg"
        alt=""
        width={276}
        height={276}
        className={`pointer-events-none absolute inset-0 z-[1] h-full w-full max-w-none object-contain ${
          orbitShell
            ? "drop-shadow-[0_0_22px_rgba(255,255,255,0.22)]"
            : "drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
        }`}
      />
      <Image
        src="/figma/music-note.svg"
        alt=""
        width={88}
        height={88}
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
          orbitShell ? "z-[2] h-[26%] w-[26%]" : "h-[32%] w-[32%]"
        }`}
      />
    </div>
  );
}
