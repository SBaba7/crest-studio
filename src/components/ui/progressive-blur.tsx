type ProgressiveBlurProps = {
  className?: string;
  direction: "left" | "right";
  blurIntensity?: number;
};

export function ProgressiveBlur({
  className = "",
  direction,
  blurIntensity = 1,
}: ProgressiveBlurProps) {
  const side = direction === "left" ? "left-0" : "right-0";
  const gradient =
    direction === "left"
      ? "bg-gradient-to-r"
      : "bg-gradient-to-l";

  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 ${side} h-full w-[180px] pointer-events-none ${gradient} from-background via-background/75 to-transparent ${className}`}
      style={{ opacity: Math.min(1, 0.72 + blurIntensity * 0.12) }}
    />
  );
}
