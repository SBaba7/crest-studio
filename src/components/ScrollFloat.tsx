import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  active?: boolean;
};

export function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.9,
  ease = "back.inOut(2)",
  scrollStart = "top bottom-=18%",
  scrollEnd = "bottom center+=8%",
  stagger = 0.028,
  active,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((token, tokenIndex) => {
      if (/^\s+$/.test(token)) return <span key={`space-${tokenIndex}`}> </span>;

      return (
        <span className="inline-block whitespace-nowrap" key={`word-${tokenIndex}`}>
          {token.split("").map((character, characterIndex) => (
            <span className="inline-block" data-scroll-float-char key={`${character}-${characterIndex}`}>
              {character}
            </span>
          ))}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof children !== "string") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scroller = scrollContainerRef?.current ?? window;
    const context = gsap.context(() => {
      const characters = element.querySelectorAll<HTMLElement>("[data-scroll-float-char]");
      if (prefersReducedMotion) {
        gsap.set(characters, { opacity: 1, yPercent: 0, scaleX: 1, scaleY: 1 });
        return;
      }

      if (typeof active === "boolean") {
        if (!active) {
          gsap.set(characters, { opacity: 0, yPercent: 120, scaleY: 2.1, scaleX: 0.72 });
          return;
        }
        gsap.fromTo(
          characters,
          { opacity: 0, yPercent: 120, scaleY: 2.1, scaleX: 0.72, transformOrigin: "50% 0%" },
          { duration: animationDuration, ease, opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger, onComplete: () => gsap.set(characters, { willChange: "auto" }) }
        );
        return;
      }

      gsap.fromTo(
        characters,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.1,
          scaleX: 0.72,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          onComplete: () => gsap.set(characters, { willChange: "auto" }),
          scrollTrigger: {
            trigger: element,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, element);

    return () => context.revert();
  }, [active, animationDuration, children, ease, scrollContainerRef, scrollEnd, scrollStart, stagger]);

  return (
    <h2 ref={containerRef} className={`overflow-hidden text-balance ${containerClassName}`}>
      <span className={textClassName}>{splitText}</span>
    </h2>
  );
}
