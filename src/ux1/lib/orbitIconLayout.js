/**
 * UX1 5단계 우측 arc
 * - 사람: 12시 정중앙 (0°) 기준
 * - 음악: 4단계 고정 (270°) — globals.css .right-step4-music-icon
 * - 와인·버거: 270°→0° 사이 30° 등간격
 */
const STEP5_ARC_R = 39.2;

/** 4단계 음악 센터 = 270° */
export const STEP5_MUSIC_ARC_DEG = 270;
/** 사람 = 12시 정중앙 */
export const STEP5_PEOPLE_ARC_DEG = 0;

const STEP5_ARC_SPAN_DEG = STEP5_PEOPLE_ARC_DEG + 360 - STEP5_MUSIC_ARC_DEG;
const STEP5_ARC_STEP_DEG = STEP5_ARC_SPAN_DEG / 3;

export const STEP5_WINE_ARC_DEG = STEP5_MUSIC_ARC_DEG + STEP5_ARC_STEP_DEG;
export const STEP5_BURGER_ARC_DEG = STEP5_MUSIC_ARC_DEG + STEP5_ARC_STEP_DEG * 2;

function step5ArcPosition(degFromNorth) {
  const rad = (degFromNorth * Math.PI) / 180;
  return {
    left: `${50 + STEP5_ARC_R * Math.sin(rad)}%`,
    top: `${50 - STEP5_ARC_R * Math.cos(rad)}%`,
  };
}

/** 4→5 등장 stagger — arc 하단→상단 (와인 → 버거 → 사람) */
export const RIGHT_STEP5_STAGGER_INDEX = {
  wine: 0,
  burger: 1,
  people: 2,
};

/** 5→6 퇴장 stagger — arc 상단→하단 (사람 → 버거 → 와인) */
export const RIGHT_STEP6_EXIT_INDEX = {
  people: 0,
  burger: 1,
  wine: 2,
};

export const ORBIT_WINE = {
  sizeCqw: 14,
  ...step5ArcPosition(STEP5_WINE_ARC_DEG),
};

export const ORBIT_BURGER = {
  sizeCqw: 14,
  ...step5ArcPosition(STEP5_BURGER_ARC_DEG),
};

export const ORBIT_PEOPLE = {
  sizeCqw: 14,
  ...step5ArcPosition(STEP5_PEOPLE_ARC_DEG),
};
