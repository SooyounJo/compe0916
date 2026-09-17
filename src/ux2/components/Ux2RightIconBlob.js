import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";
import { UX2_RIGHT_ICON_FILL } from "@/ux2/lib/ux2RightIconFill";

/** 우측 원 전용 — 글리프 항상 #FFFFFF */
export default function Ux2RightIconBlob(props) {
  return (
    <Ux2IconBlob {...props} iconFillColor={UX2_RIGHT_ICON_FILL} emphasized />
  );
}
