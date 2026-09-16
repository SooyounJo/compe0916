import BlurFade from "@/ux2/components/BlurFade";
import Ux2LeftPromptRow from "@/ux2/components/Ux2LeftPromptRow";

/** Figma [55:148](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=55-148) */
export default function LeftCompanionStep1({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[2]"
    >
      <Ux2LeftPromptRow
        lines={["Want to see more", "travel photos from 2022?"]}
      />
    </BlurFade>
  );
}
