/**
 * ParticleBackground.jsx
 *
 * Pure-canvas particle engine — zero external dependencies.
 * Tuned for dark fintech aesthetics: slow drift, low density,
 * hair-thin connection lines, subtle pulse.
 *
 * Props
 * ─────
 * count        {number}  particle count          default 60
 * color        {string}  hex / rgb particle tint  default "#38bdf8"
 * speed        {number}  movement multiplier       default 0.3
 * maxDistance  {number}  px — line draw threshold  default 130
 * lineOpacity  {number}  0-1 for connection lines  default 0.15
 * particleOpacity {number} 0-1                    default 0.55
 * className    {string}  extra class on <canvas>
 */

import { useEffect, useRef } from "react";

/* ─── helpers ──────────────────────────────────────────────────────────────── */
const rand  = (min, max) => Math.random() * (max - min) + min;
const lerp  = (a, b, t) => a + (b - a) * t;

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "56,189,248";
}

/* ─── Particle class ───────────────────────────────────────────────────────── */
class Particle {
  constructor(W, H, speed) {
    this.W = W;
    this.H = H;
    this.speed = speed;
    this.reset(true);
  }

  reset(initial = false) {
    this.x  = rand(0, this.W);
    this.y  = initial ? rand(0, this.H) : rand(-20, this.H + 20);
    this.r  = rand(1, 2.2);           // radius
    this.vx = rand(-1, 1) * this.speed;
    this.vy = rand(0.1, 0.5) * this.speed;
    this.life   = 0;
    this.maxLife = rand(400, 900);    // frames alive
    this.opacity = 0;                 // fade in
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    // Gentle horizontal wander
    this.vx += rand(-0.003, 0.003);
    this.vx  = Math.max(-0.8, Math.min(0.8, this.vx));

    // Fade in / fade out envelope
    const t = this.life / this.maxLife;
    if (t < 0.12)      this.opacity = lerp(0, 1,   t / 0.12);
    else if (t > 0.85) this.opacity = lerp(1, 0,  (t - 0.85) / 0.15);
    else               this.opacity = 1;

    // Wrap or recycle
    if (this.x < -10)         this.x = this.W + 10;
    if (this.x > this.W + 10) this.x = -10;
    if (this.life >= this.maxLife || this.y > this.H + 20) this.reset();
  }

  draw(ctx, rgb, baseOpacity) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb},${(this.opacity * baseOpacity).toFixed(3)})`;
    ctx.fill();
  }
}

/* ─── Main component ───────────────────────────────────────────────────────── */
export default function ParticleBackground({
  count          = 80,
  color          = "#19899c",
  speed          = 0.3,
  maxDistance    = 130,
  lineOpacity    = 0.35,
  particleOpacity= 0.85,
  className      = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx    = canvas.getContext("2d");
    const rgb    = hexToRgb(color);
    let   raf    = null;
    let   particles = [];

    /* ── resize handler ── */
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = width  * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const W = width, H = height;
      particles = Array.from({ length: count }, () => new Particle(W, H, speed));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    /* ── draw connections ── */
    const drawLines = (list) => {
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i], b = list[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > maxDistance) continue;

          const alpha = (1 - dist / maxDistance) * lineOpacity *
                        Math.min(a.opacity, b.opacity);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    };

    /* ── animation loop ── */
    const loop = () => {
      const W = canvas.width  / devicePixelRatio;
      const H = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, W, H);

      // Update sizes on particles if canvas resized
      particles.forEach(p => { p.W = W; p.H = H; });

      particles.forEach(p => p.update());
      if (maxDistance > 0) drawLines(particles);
      particles.forEach(p => p.draw(ctx, rgb, particleOpacity));

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, color, speed, maxDistance, lineOpacity, particleOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position : "absolute",
        inset    : 0,
        zIndex  : 0,
        width    : "100%",
        height   : "100%",
        display  : "block",
      }}
    />
  );
}
