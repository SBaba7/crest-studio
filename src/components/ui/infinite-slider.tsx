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
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max items-center animate-[crest-infinite-slider_var(--duration)_linear_infinite] hover:[animation-play-state:paused]"
        style={{
          "--duration": `${duration}s`,
          gap: `${gap}px`,
        } as React.CSSProperties}
      >
        <div className="flex items-center" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
        <div className="flex items-center" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
