/** Figma 17:1686 — 좌측 5단계 (1879 기준, 미세 보정) */
const F = 1879;

/** 블롭(cqw) 크기 — 내부 글리프는 Step5Icon에서 별도 축소 */
const ICON_SIZE_SCALE = 0.88;
const SHIFT_X_PX = 64;
const SHIFT_Y_PX = 118;
const CX = F / 2;
const FIGMA_MUSIC_Y = 946.875;
const MUSIC_Y = FIGMA_MUSIC_Y + SHIFT_Y_PX;
const CALENDAR_DY = 1284.241 - FIGMA_MUSIC_Y;
const MOON_DY = 1530.49 - FIGMA_MUSIC_Y;

function sizeCqw(px) {
  return (px / F) * 100 * ICON_SIZE_SCALE;
}

function centerPct(cx, cy) {
  return { left: `${(cx / F) * 100}%`, top: `${(cy / F) * 100}%` };
}

const musicCx = CX + 699.13 + SHIFT_X_PX;

const music = centerPct(musicCx, MUSIC_Y);
const calendar = centerPct(CX + 601.49 + SHIFT_X_PX, MUSIC_Y + CALENDAR_DY);
const moon = centerPct(CX + 354.99 + SHIFT_X_PX, MUSIC_Y + MOON_DY);

export const LEFT_STEP5_VOICE = centerPct(CX + 730.25, CX + 0.25);

/** Step5Icon — 블롭 대비 내부 심볼 % (cqw 아님) */
export const LEFT_STEP5_INNER_PCT = 34;

export const LEFT_STEP5_ICONS = [
  {
    id: "music",
    variant: "music",
    ...music,
    sizeCqw: sizeCqw(275.75),
  },
  {
    id: "calendar",
    src: "/figma/left-orbit/calendar-blob.svg",
    iconSrc: "/figma/left-orbit/calendar-icon.svg",
    ...calendar,
    sizeCqw: sizeCqw(258.482),
    opacity: 0.85,
  },
  {
    id: "moon",
    src: "/figma/left-orbit/calendar-blob.svg",
    iconSrc: "/figma/left-orbit/moon-icon.svg",
    ...moon,
    sizeCqw: sizeCqw(235.482),
  },
];
