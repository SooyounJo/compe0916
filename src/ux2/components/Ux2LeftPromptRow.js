import { LEFT_TEXT_GRADIENT } from "@/ux2/lib/ux2Step1Layout";

const TEXT_STYLE = {
  backgroundImage: LEFT_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** Figma 55:148 — 텍스트만 (인스타 블롭은 Ux2InstagramIconPersist) */
export default function Ux2LeftPromptRow({ lines }) {
  return (
    <div className="flex h-full w-full items-center pl-[9.2cqw] pr-[3.6cqw]">
      <div
        className="font-doto w-full text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em]"
        style={TEXT_STYLE}
      >
        {lines.map((line, index) => (
          <p
            key={line}
            className={index < lines.length - 1 ? "mb-0" : undefined}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
