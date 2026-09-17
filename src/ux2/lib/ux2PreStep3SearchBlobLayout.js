import {
  pctCircleRight,
  STEP0_RIGHT_ICON_BLOB,
  STEP0_SEARCH_BLOB,
} from "@/ux2/lib/ux2Step0Layout";
import { pctPre, PRE_STEP_VOICE, sizeCqwPre } from "@/ux2/lib/ux2PreStepLayout";
import { PRE_STEP_RIGHT_3_VOICE } from "@/ux2/lib/ux2PreStepRightLayout";

export const UX2_PRE_STEP3_LEFT_SEARCH = {
  centerX: PRE_STEP_VOICE.centerX,
  centerY: PRE_STEP_VOICE.centerY,
  blobSizeCqw: sizeCqwPre(STEP0_SEARCH_BLOB.size),
  toPct: pctPre,
};

export const UX2_PRE_STEP3_RIGHT_SEARCH = {
  centerX: PRE_STEP_RIGHT_3_VOICE.centerX,
  centerY: PRE_STEP_RIGHT_3_VOICE.centerY,
  blobSizeCqw: pctCircleRight(STEP0_RIGHT_ICON_BLOB.size),
  toPct: pctCircleRight,
};
