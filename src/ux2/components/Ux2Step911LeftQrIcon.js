"use client";

import Image from "next/image";
import {
  pctLeft9,
  sizeCqwLeft9,
  STEP9_LEFT_QR_BLOB,
} from "@/ux2/lib/ux2Step9LeftLayout";
import {
  UX2_STEP9_QR_SCANNER_ICON,
  UX2_STEP9_QR_SCANNER_IN_BLOB_SCALE,
} from "@/ux2/lib/ux2Step9Icons";

/** 9~11 좌측 — QR 블롭·아이콘 유지 (BlurFade 밖) */
export default function Ux2Step911LeftQrIcon({ show = false }) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[7] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pctLeft9(STEP9_LEFT_QR_BLOB.centerX)}%`,
          top: `${pctLeft9(STEP9_LEFT_QR_BLOB.centerY)}%`,
          width: `${sizeCqwLeft9(STEP9_LEFT_QR_BLOB.size)}%`,
          height: `${sizeCqwLeft9(STEP9_LEFT_QR_BLOB.size)}%`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/figma/left-orbit/step6-music-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.3)]"
            sizes="18vw"
          />
          <Image
            src={UX2_STEP9_QR_SCANNER_ICON}
            alt=""
            width={96}
            height={96}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
            style={{
              width: `${UX2_STEP9_QR_SCANNER_IN_BLOB_SCALE * 100}%`,
              height: `${UX2_STEP9_QR_SCANNER_IN_BLOB_SCALE * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
