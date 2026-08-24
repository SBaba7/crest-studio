import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { PlasmaShader } from "./PlasmaShader";
import { ArrowDown } from "lucide-react";
import { debugLog } from "@/lib/debugLog";

const FRAME_PADDING = 24;
const FRAME_RADIUS = 32;
const SCROLL_RANGE = 400;
const CONTENT_HIDE_PROGRESS = 0.35;
export const NAV_SHOW_PROGRESS = 0.78;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const lastLogRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const platformTitleOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.18, 0.34, 0.72],
    [0, 0.35, 1, 1]
  );
  const platformTitleX = useTransform(
    scrollYProgress,
    [0.08, 0.34],
    ["0vw", "-38vw"]
  );
  const platformTitleY = useTransform(
    scrollYProgress,
    [0.08, 0.34],
    ["0vh", "-38vh"]
  );
  const platformTitleScale = useTransform(scrollYProgress, [0.08, 0.34], [1, 0.68]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const snapped = progress > 0.94 ? 1 : progress;
    const padding = snapped >= 1 ? 0 : Math.round(FRAME_PADDING * (1 - snapped));
    const radius = snapped >= 1 ? 0 : Math.max(0, Math.round(FRAME_RADIUS * (1 - snapped)));

    if (outerRef.current) {
      outerRef.current.style.padding = `${padding}px`;
    }
    if (innerRef.current) {
      innerRef.current.style.borderRadius = radius > 0 ? `${radius}px` : "0px";
      innerRef.current.style.clipPath = `inset(0 round ${radius}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.opacity = radius >= 8 ? "1" : "0";
      ringRef.current.style.borderRadius = radius > 0 ? `${radius}px` : "0px";
    }

    setShowContent(progress < CONTENT_HIDE_PROGRESS);
    setShowScrollHint(progress < 0.06);

    window.dispatchEvent(
      new CustomEvent("crest:hero-progress", { detail: { progress } })
    );

    const now = Date.now();
    if (now - lastLogRef.current > 150) {
      lastLogRef.current = now;
      debugLog(
        "Hero.tsx:progress",
        "hero section scroll progress",
        {
          progress,
          padding,
          radius,
          showContent: progress < CONTENT_HIDE_PROGRESS,
          navShouldShow: progress > NAV_SHOW_PROGRESS,
          snapped: snapped >= 1,
        },
        "H9-H12",
        "post-fix-v3"
      );
    }
  });

  useEffect(() => {
    debugLog(
      "Hero.tsx:mount",
      "hero section mounted",
      {
        sectionHeight: `calc(100dvh + ${SCROLL_RANGE}px)`,
      },
      "H12",
      "post-fix-v3"
    );
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ height: `calc(100dvh + ${SCROLL_RANGE}px)` }}
      className="relative bg-white"
    >
      <div className="fixed inset-0 top-0 h-[100dvh] w-full bg-white z-0 pointer-events-none">
        <div
          ref={outerRef}
          className="absolute inset-0 bg-white"
          style={{ padding: `${FRAME_PADDING}px` }}
        >
          <div
            ref={innerRef}
            className="relative w-full h-full overflow-hidden bg-[#1a0f2e]"
            style={{
              borderRadius: `${FRAME_RADIUS}px`,
              clipPath: `inset(0 round ${FRAME_RADIUS}px)`,
            }}
          >
            <PlasmaShader className="absolute inset-0 w-full h-full block" />

            <div
              ref={ringRef}
              className="absolute inset-0 z-[2] pointer-events-none ring-[1.5px] ring-inset ring-white/90 transition-opacity duration-150"
              style={{ borderRadius: `${FRAME_RADIUS}px` }}
            />

            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(15,8,30,0.4) 100%)",
              }}
            />

            <motion.div
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 z-30 p-8 sm:p-10 lg:p-14 max-w-xl pointer-events-none"
            >
              <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase text-white/50 mb-5">
                Enterprise Cybersecurity
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display text-white leading-[1.08] text-balance">
                Detect AI threats <span className="italic text-white/70">before</span> they reach your perimeter.
              </h1>
            </motion.div>

            <motion.div
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 z-30 p-8 sm:p-10 lg:p-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
              style={{ pointerEvents: showContent ? "auto" : "none" }}
            >
              <p className="text-sm sm:text-base text-white/55 max-w-sm leading-relaxed font-light">
                Crest neutralizes deepfakes, AI-generated phishing, and zero-day payloads across email, endpoints, and cloud — from one platform.
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href="#platform"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("platform")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  See platform →
                </a>
              </div>
            </motion.div>

            <motion.div
              style={{
                opacity: platformTitleOpacity,
                x: platformTitleX,
                y: platformTitleY,
                scale: platformTitleScale,
              }}
              className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            >
              <div className="text-center px-8">
                <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase text-white/50 mb-5">
                  Scroll to explore
                </p>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-white leading-[1.08]">
                  The Platform
                </h2>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: showScrollHint ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
              <ArrowDown className="h-3.5 w-3.5 text-white/30 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
