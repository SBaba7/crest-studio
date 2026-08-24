import type { ReactNode } from "react";

type InfiniteSliderProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  gap?: number;
};

export function InfiniteSlider({
  children,
  className = "",
  duration = 30,
  gap = 48,
}: InfiniteSliderProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <style>{`@keyframes crestInfiniteSlider { from { transform: translateX(0); } to { transform: translateX(calc(-50% - ${gap / 2}px)); } }`}</style>
      <div
        className="flex w-max items-center hover:[animation-play-state:paused]"
        style={{ animation: `crestInfiniteSlider ${duration}s linear infinite` }}
      >
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
