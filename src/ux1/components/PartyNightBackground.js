import Image from "next/image";

/** 6번: 불꽃 배경이 블러·상승하며 날씨 배경과 교체 */
export default function PartyNightBackground({ step }) {
  const active = step >= 6;

  return (
    <div
      className={`party-night-bg pointer-events-none absolute inset-0 z-[12] overflow-hidden rounded-full ${
        active ? "party-night-bg--active" : ""
      }`}
      aria-hidden={!active}
    >
      <Image
        src="/figma/party-night-bg.png"
        alt=""
        fill
        className="party-night-bg__img object-cover object-center"
        sizes="(max-width: 560px) 88vmin, 560px"
      />
    </div>
  );
}
