import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  active?: boolean;
};

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 3,
  blurStrength = 8,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom center+=4%",
  wordAnimationEnd = "bottom center+=4%",
  active,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="inline-block" data-scroll-reveal-word key={`${word}-${index}`}>
          {word}
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
      const words = element.querySelectorAll<HTMLElement>("[data-scroll-reveal-word]");
      if (prefersReducedMotion) {
        gsap.set(words, { opacity: 1, filter: "blur(0px)" });
        gsap.set(element, { rotate: 0 });
        return;
      }

      if (typeof active === "boolean") {
        if (!active) {
          gsap.set(words, { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)" });
          gsap.set(element, { rotate: baseRotation });
          return;
        }
        gsap.fromTo(element, { transformOrigin: "0% 50%", rotate: baseRotation }, { duration: 0.65, ease: "power2.out", rotate: 0 });
        gsap.fromTo(
          words,
          { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)" },
          { duration: 0.7, ease: "power2.out", opacity: 1, filter: "blur(0px)", stagger: 0.045 }
        );
        return;
      }

      gsap.fromTo(
        element,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top bottom-=8%",
            end: rotationEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: "opacity, filter" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top bottom-=18%",
            end: wordAnimationEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              scroller,
              start: "top bottom-=18%",
              end: wordAnimationEnd,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, element);

    return () => context.revert();
  }, [active, baseOpacity, baseRotation, blurStrength, children, enableBlur, rotationEnd, scrollContainerRef, wordAnimationEnd]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
}
