"use client";

import { useEffect, useRef } from "react";

const CELL = 7;
const SPAWN_S = 2.2;
const STEP6_FADE_DELAY_S = 1.35;
const STEP6_FADE_DURATION_S = 2;

function cellHash(ix, iy) {
  let h = ix * 374761393 + iy * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967296;
}

/**
 * 픽셀 흐름 필드 — 클러스터가 이동·소멸·재생성되며 흐르는 느낌 (글로우 halo 아님)
 */
function flowField(ix, iy, t) {
  const driftX = Math.sin(t * 0.42 + iy * 0.07) * 3.2 + Math.cos(t * 0.19) * 2;
  const driftY = Math.cos(t * 0.38 + ix * 0.06) * 2.8 + Math.sin(t * 0.23) * 2.2;

  const sx = ix + driftX + Math.sin(iy * 0.13 + t * 0.92) * 2.4;
  const sy = iy + driftY + Math.cos(ix * 0.11 - t * 0.86) * 2.1;

  const x = sx * 0.14;
  const y = sy * 0.12;
  const w0 = Math.sin(x * 0.62 + t * 0.55) * Math.cos(y * 0.58 - t * 0.48);
  const w1 = Math.sin(x * 1.05 + t * 1.12) * Math.cos(y * 0.82 - t * 0.88);
  const w2 = Math.sin((x + y) * 0.68 + t * 0.98);
  const w3 = Math.cos(x * 0.52 - t * 0.52 + y * 0.4);
  const mixed = w0 * 0.38 + w1 * 0.28 + w2 * 0.22 + w3 * 0.12;

  const gate = (cellHash(ix, iy) - 0.5) * 0.2;
  const churn =
    Math.sin(t * 3.2 + cellHash(ix + 3, iy + 5) * 6.283 + ix * 0.19 + iy * 0.14) *
    0.12;

  return mixed + gate + churn;
}

/** 흐름 잔상 — 직전 위치 샘플 */
function flowTrail(ix, iy, t) {
  const vx = Math.sin(t * 0.36 + iy * 0.09) * 1.1;
  const vy = Math.cos(t * 0.34 + ix * 0.08) * 1.05;
  return flowField(ix - vx, iy - vy, t - 0.07);
}

function spawnStrength(px, py, cx, cy, maxR, progress) {
  const dx = px - cx;
  const dy = py - cy;
  const d = Math.sqrt(dx * dx + dy * dy) / maxR;
  const edge = progress * 1.15;
  if (d > edge) return 0;
  const soft = 1 - d / Math.max(edge, 0.001);
  return soft * soft;
}

function drawPixel(ctx, cx, cy, size, alpha) {
  if (alpha < 0.03 || size < 1.5) return;
  const half = size / 2;
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  ctx.fillRect(cx - half, cy - half, size, size);
}

function isDotGridStepActive(s, variant) {
  if (variant === "preStep") {
    return s >= -4 && s <= -2;
  }
  return s >= 5;
}

export default function DotGridAmbient({
  step,
  variant = "ambient",
  className = "",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const phaseStartRef = useRef(0);
  const stepRef = useRef(step);
  const variantRef = useRef(variant);
  const isPreStep = variant === "preStep";

  stepRef.current = step;
  variantRef.current = variant;

  useEffect(() => {
    phaseStartRef.current = performance.now() / 1000;
  }, [step]);

  useEffect(() => {
    if (!isDotGridStepActive(step, variant)) return undefined;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let raf = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(rect.width / CELL) + 1;
      rows = Math.ceil(rect.height / CELL) + 1;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = (now) => {
      const s = stepRef.current;
      const mode = variantRef.current;
      if (!isDotGridStepActive(s, mode)) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const t = now / 1000;
      const phaseT = t - phaseStartRef.current;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.48;
      const maxR = Math.hypot(cx, cy);
      const preGenerate = mode === "preStep";
      const alphaBoost = preGenerate ? 1.35 : 1;

      let master = 1;
      if (preGenerate) {
        master = 1;
      } else if (s === 5) {
        master = Math.min(1, phaseT / SPAWN_S);
        master = master * master * (3 - 2 * master);
      } else if (s <= 7) {
        master = 1;
      } else {
        const fadeT = phaseT - STEP6_FADE_DELAY_S;
        if (fadeT > 0) {
          const fade = Math.min(1, fadeT / STEP6_FADE_DURATION_S);
          master = 1 - fade * 0.88;
        }
      }

      const spawnP =
        preGenerate || s !== 5 ? 1 : Math.min(1, phaseT / SPAWN_S);

      ctx.clearRect(0, 0, w, h);

      for (let iy = 0; iy < rows; iy += 1) {
        for (let ix = 0; ix < cols; ix += 1) {
          const baseX = ix * CELL + CELL * 0.5;
          const baseY = iy * CELL + CELL * 0.5;
          const spawn = spawnStrength(baseX, baseY, cx, cy, maxR, spawnP);
          if (spawn <= 0.02) continue;

          const h0 = cellHash(ix, iy);
          const jitterX = (h0 - 0.5) * 2.2;
          const jitterY = (cellHash(iy, ix) - 0.5) * 2.2;
          const gx = baseX + jitterX;
          const gy = baseY + jitterY;

          const v = flowField(ix, iy, t);
          const trail = flowTrail(ix, iy, t);

          const on = v > -0.02;
          const trailOn = !on && trail > 0.06;

          if (!on && !trailOn) continue;

          const pulse =
            0.62 +
            0.38 *
              Math.sin(
                t * (1.6 + h0 * 1.8) + cellHash(ix + 7, iy + 11) * 6.283,
              );

          if (trailOn) {
            const a =
              Math.min(0.5, (trail - 0.06) * 0.65) *
              spawn *
              master *
              pulse *
              alphaBoost;
            drawPixel(ctx, gx, gy, 2, a * 0.62);
            continue;
          }

          const density = Math.min(1, (v + 0.02) * 0.82);
          const bright = density > 0.38;
          const size = density > 0.52 ? 3 : 2;
          const alpha =
            Math.pow(density, 0.72) *
            spawn *
            master *
            pulse *
            (0.5 + h0 * 0.5) *
            alphaBoost;

          drawPixel(ctx, gx, gy, size, alpha * (bright ? 0.88 : 0.62));

          if (density > 0.45) {
            drawPixel(ctx, gx, gy, 2, alpha * 0.28);
          }
          if (density > 0.62) {
            drawPixel(ctx, gx, gy, 3, alpha * 0.18);
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [step, variant]);

  if (!isDotGridStepActive(step, variant)) return null;

  const wrapClass = isPreStep
    ? "dot-grid-ambient dot-grid-ambient--pre-step mix-blend-soft-light"
    : "dot-grid-ambient";

  return (
    <div
      ref={wrapRef}
      className={`${wrapClass} pointer-events-none absolute inset-0 overflow-hidden rounded-full ${
        isPreStep ? "z-[4]" : "z-[28]"
      } ${className}`}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="dot-grid-ambient__canvas block h-full w-full"
      />
    </div>
  );
}
