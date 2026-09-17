import Image from "next/image";

/** UX2 듀얼 우측 4단계 — Figma 카메라(video) 블롭 */
export default function Ux2RightStep4CameraIcon() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/figma/ux2/step4/video-blob.svg"
        alt=""
        fill
        className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
        sizes="18vw"
        priority
      />
    </div>
  );
}
