"use client";

import { useLayoutEffect, useState } from "react";
import Ux2LeftPromptRow from "@/ux2/components/Ux2LeftPromptRow";
import { ux2Step1RightIntroEndMs } from "@/ux2/lib/ux2Step1To2Morph";
import textStyles from "@/ux2/styles/ux2Step1LeftTextIn.module.css";

/** Figma [55:148](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=55-148) */
export default function LeftCompanionStep1({ show = false }) {
  const [showText, setShowText] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setShowText(false);
      return undefined;
    }
    setShowText(false);
    const t = setTimeout(() => setShowText(true), ux2Step1RightIntroEndMs());
    return () => clearTimeout(t);
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {showText ? (
        <div className={`${textStyles.inPlaceReveal} absolute inset-0`}>
          <Ux2LeftPromptRow
            lines={["Want to see more", "travel photos from 2022?"]}
          />
        </div>
      ) : null}
    </div>
  );
}
