import {
  handoffExitDelay,
  handoffRelocateDelay,
} from "@/ux2/lib/dualOrbitHandoff";

/** UX2 id → dualOrbitHandoff 키 */
const EXIT_KEY = {
  people: "people",
  gallery: "burger",
};

const RELOCATE_KEY = {
  video: "cocktail",
  edit: "calendar",
  bookmark: "moon",
};

export function ux2HandoffDelayS(icon) {
  if (icon.handoff === "exit") {
    const key = EXIT_KEY[icon.id];
    return key ? handoffExitDelay(key) : 0;
  }
  if (icon.handoff === "relocate") {
    const key = RELOCATE_KEY[icon.id];
    return key ? handoffRelocateDelay(key) : 0;
  }
  return 0;
}
