"use client";

import { useLayoutEffect, useState } from "react";
import Ux2LeftPromptRow from "@/ux2/components/Ux2LeftPromptRow";
import textStyles from "@/ux2/styles/ux2Step1LeftTextIn.module.css";

/** Figma [1:887](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=1-887) */
export default function LeftCompanionStep2({ show = false }) {
  const [showText, setShowText] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setShowText(false);
      return undefined;
    }
    setShowText(false);
    const id = requestAnimationFrame(() => setShowText(true));
    return () => cancelAnimationFrame(id);
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {showText ? (
        <div className={`${textStyles.inPlaceReveal} absolute inset-0`}>
          <Ux2LeftPromptRow lines={["Browsing the", "2022 feed"]} />
        </div>
      ) : null}
    </div>
  );
}
