import BlurFade from "@/ux2/components/BlurFade";
import Ux2LeftPromptRow from "@/ux2/components/Ux2LeftPromptRow";

/** Figma [1:887](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=1-887) */
export default function LeftCompanionStep2({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[2]"
    >
      <Ux2LeftPromptRow lines={["Browsing the", "2022 feed"]} />
    </BlurFade>
  );
}
