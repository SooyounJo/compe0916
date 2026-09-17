import Image from "next/image";
import {
  UX2_RIGHT_VIDEO_BLOB_SRC,
  UX2_RIGHT_WHITE_BLOB_IMG_CLASS,
} from "@/ux2/lib/ux2RightIconFill";

/** UX2 듀얼 우측 4단계 — white camera(video) 블롭 */
export default function Ux2RightStep4CameraIcon() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={UX2_RIGHT_VIDEO_BLOB_SRC}
        alt=""
        fill
        className={UX2_RIGHT_WHITE_BLOB_IMG_CLASS}
        sizes="18vw"
        priority
      />
    </div>
  );
}
