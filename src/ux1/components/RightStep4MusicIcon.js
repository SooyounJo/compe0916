import Image from "next/image";

/**
 * UX1 4단계 — 우측 원 음악 아이콘
 * 왼쪽 people 아이콘과 동일한 크기·스타일의 반투명 슬롯 + 음악 노트 조합
 */
export default function RightStep4MusicIcon() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/figma/left-orbit/step6-music-blob.svg"
        alt=""
        fill
        className="object-contain"
        sizes="18vw"
        priority
      />
      <Image
        src="/figma/left-orbit/step6-music-note.svg"
        alt=""
        width={84}
        height={84}
        className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
}

