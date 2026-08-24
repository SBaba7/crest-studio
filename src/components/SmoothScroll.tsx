import { useMemo } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Keeps native scrolling responsive while adding subtle interpolation on devices
 * that support motion. Lenis retains keyboard, anchor, and touch accessibility.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const options = useMemo(
    () => ({
      lerp: 0.085,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      autoResize: true,
    }),
    []
  );

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
