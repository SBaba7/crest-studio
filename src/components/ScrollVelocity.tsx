import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollVelocityProps {
  texts: ReactNode[];
  velocity?: number;
  className?: string;
  numCopies?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
}

function TickerLine({
  children,
  reverse,
  velocity,
  className,
  numCopies,
  parallaxClassName,
  scrollerClassName,
}: {
  children: ReactNode;
  reverse: boolean;
  velocity: number;
  className: string;
  numCopies: number;
  parallaxClassName: string;
  scrollerClassName: string;
}) {
  const reduceMotion = useReducedMotion();
  const copyCount = Math.max(numCopies, 8);
  const duration = Math.max(18, 52 - velocity * 0.25);
  const from = reverse ? "-50%" : "0%";
  const to = reverse ? "0%" : "-50%";
  const copies = Array.from({ length: copyCount }, (_, index) => (
    <span key={index} className={`shrink-0 ${className}`}>
      {children}&nbsp;&nbsp;&nbsp;
    </span>
  ));

  return (
    <div className={parallaxClassName}>
      <motion.div
        className={scrollerClassName}
        initial={{ x: from }}
        animate={reduceMotion ? { x: from } : { x: to }}
        transition={reduceMotion ? { duration: 0 } : { duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 whitespace-nowrap">{copies}</div>
        <div className="flex shrink-0 whitespace-nowrap" aria-hidden="true">
          {copies}
        </div>
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({
  texts,
  velocity = 100,
  className = "",
  numCopies = 6,
  parallaxClassName = "relative overflow-hidden",
  scrollerClassName = "flex w-max will-change-transform",
}: ScrollVelocityProps) {
  return (
    <section aria-label="Scrolling callout" className="space-y-1">
      {texts.map((text, index) => (
        <TickerLine
          key={index}
          reverse={index % 2 !== 0}
          velocity={velocity}
          className={className}
          numCopies={numCopies}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
        >
          {text}
        </TickerLine>
      ))}
    </section>
  );
}
