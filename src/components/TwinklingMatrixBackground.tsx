import { useEffect, useRef } from "react";

export function TwinklingMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;

    interface StarDot {
      x: number;
      y: number;
      baseAlpha: number;
      currentAlpha: number;
      targetAlpha: number;
      size: number;
      speed: number;
      hue: string; // purple tint variations
    }

    let dots: StarDot[] = [];

    const initDots = () => {
      dots = [];
      const spacing = 16; // dense grid spacing
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Add micro jitter to make it organic like the reference image
          const jitterX = (Math.random() - 0.5) * 4;
          const jitterY = (Math.random() - 0.5) * 4;
          const x = c * spacing + jitterX;
          const y = r * spacing + jitterY;

          // Mostly subtle/dim, with a subset of actively glowing / twinkling stars
          const isBright = Math.random() < 0.12;
          const isMedium = Math.random() < 0.35;
          const baseAlpha = isBright ? 0.35 + Math.random() * 0.45 : isMedium ? 0.15 + Math.random() * 0.25 : 0.03 + Math.random() * 0.08;
          
          const isPurpleTint = Math.random() < 0.45;
          const hue = isPurpleTint 
            ? Math.random() < 0.5 ? "rgba(192, 160, 255, " : "rgba(220, 200, 255, " 
            : "rgba(240, 240, 255, ";

          dots.push({
            x,
            y,
            baseAlpha,
            currentAlpha: baseAlpha,
            targetAlpha: baseAlpha,
            size: isBright ? 1.4 + Math.random() * 0.6 : 1.0 + Math.random() * 0.4,
            speed: 0.01 + Math.random() * 0.03,
            hue,
          });
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      initDots();
    };

    resize();
    window.addEventListener("resize", resize);

    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let tick = 0;
    const render = () => {
      if (!isVisible) return;
      tick++;

      // Clean, refined purple background without intense glowing halos
      ctx.fillStyle = "#120721";
      ctx.fillRect(0, 0, width, height);

      // Randomly pick a few dots every frame to trigger new twinkle targets
      const numTwinkles = Math.floor(dots.length * 0.008);
      for (let i = 0; i < numTwinkles; i++) {
        const idx = Math.floor(Math.random() * dots.length);
        const d = dots[idx];
        if (Math.random() < 0.6) {
          // Flare up
          d.targetAlpha = 0.5 + Math.random() * 0.5;
        } else {
          // Return to base or dim
          d.targetAlpha = d.baseAlpha * (0.5 + Math.random() * 0.5);
        }
      }

      // Draw all dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        // Smoothly interpolate towards targetAlpha
        dot.currentAlpha += (dot.targetAlpha - dot.currentAlpha) * dot.speed;

        // If close to target, drift back toward baseAlpha
        if (Math.abs(dot.targetAlpha - dot.currentAlpha) < 0.05) {
          dot.targetAlpha = dot.baseAlpha;
        }

        ctx.fillStyle = `${dot.hue}${dot.currentAlpha})`;
        // Draw tiny crisp square/pixel or micro circle
        ctx.beginPath();
        ctx.rect(dot.x - dot.size * 0.5, dot.y - dot.size * 0.5, dot.size, dot.size);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
export default TwinklingMatrixBackground;
