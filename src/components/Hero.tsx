import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { PlasmaShader } from "./PlasmaShader";
import { ArrowDown, Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { debugLog } from "@/lib/debugLog";

const FRAME_PADDING = 24;
const FRAME_RADIUS = 32;
const CINEMATIC_HEIGHT = 520;

// Phase 1: hero content leaves.
const HERO_HIDE_START = 0.02;
const HERO_HIDE_END = 0.18;

// Phase 2: the framed shader expands to full bleed.
const BORDER_EXPAND_START = HERO_HIDE_END;
const BORDER_EXPAND_END = 0.34;

// Phase 3: platform title rises into center only after the border is gone.
const PLATFORM_ENTER_START = BORDER_EXPAND_END;
const PLATFORM_ENTER_END = 0.48;

// Phase 4: once centered, keep it there for a while despite wheel input.
const PLATFORM_HOLD_START = PLATFORM_ENTER_END;
const PLATFORM_HOLD_END = 0.64;

// Phase 5: finally move the title into the top-left anchor.
const PLATFORM_MOVE_START = 0.66;
const PLATFORM_MOVE_END = 0.82;

// Phase 6: platform feature sequence.
const FEATURES_START = PLATFORM_MOVE_END;
const FEATURES_END = 0.98;
export const NAV_SHOW_PROGRESS = 0.78;

type PlatformFeature = {
  name: string;
  description: string;
  icon: LucideIcon;
  stat: string;
};

const platformFeatures: PlatformFeature[] = [
  {
    name: "Deepfake & Voice Clone Detection",
    description:
      "Real-time analysis of video calls, voicemails, and synthetic media. Crest flags impersonation attempts before credentials are shared.",
    icon: Shield,
    stat: "1,204 blocked last quarter",
  },
  {
    name: "Adaptive Zero-Trust Access",
    description:
      "Risk scores update per session based on device posture, geolocation, and behavioral anomalies — not static rule sets.",
    icon: Lock,
    stat: "Sub-200ms policy enforcement",
  },
  {
    name: "Unified Threat Visibility",
    description:
      "Email, endpoint, cloud, and identity signals in one timeline. Analysts see the full attack chain, not isolated alerts.",
    icon: Eye,
    stat: "47× faster triage vs. legacy SIEM",
  },
  {
    name: "Continuous Exposure Scanning",
    description:
      "Automated discovery of misconfigurations, exposed credentials, and shadow IT — prioritized by exploitability, not volume.",
    icon: AlertTriangle,
    stat: "Scans every 4 hours",
  },
];

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
    [PLATFORM_ENTER_START, PLATFORM_ENTER_START + 0.04, PLATFORM_ENTER_END],
    [0, 0.65, 1]
  );

  // Stay visually centered through the entire hold phase.
  const platformTitleY = useTransform(
    scrollYProgress,
    [PLATFORM_ENTER_START, PLATFORM_ENTER_END, PLATFORM_HOLD_END, PLATFORM_MOVE_END],
    ["115vh", "0vh", "0vh", "-38vh"]
  );

  const platformTitleX = useTransform(
    scrollYProgress,
    [PLATFORM_MOVE_START, PLATFORM_MOVE_END],
    ["0vw", "-38vw"]
  );

  const platformTitleScale = useTransform(
    scrollYProgress,
    [PLATFORM_MOVE_START, PLATFORM_MOVE_END],
    [1, 0.68]
  );

  const anchoredLineOpacity = useTransform(
    scrollYProgress,
    [PLATFORM_MOVE_START, PLATFORM_MOVE_START + 0.06],
    [0, 1]
  );

  const featureProgress = useTransform(
    scrollYProgress,
    [FEATURES_START, FEATURES_END],
    [0, 1]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const borderDone = progress >= BORDER_EXPAND_END;
    const expansion = Math.min(
      1,
      Math.max(0, (progress - BORDER_EXPAND_START) / (BORDER_EXPAND_END - BORDER_EXPAND_START))
    );
    const padding = Math.round(FRAME_PADDING * (1 - expansion));
    const radius = Math.round(FRAME_RADIUS * (1 - expansion));

    if (outerRef.current) {
      outerRef.current.style.padding = `${padding}px`;
    }
    if (innerRef.current) {
      innerRef.current.style.borderRadius = `${radius}px`;
      innerRef.current.style.clipPath = `inset(0 round ${radius}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.opacity = radius >= 8 ? "1" : "0";
      ringRef.current.style.borderRadius = `${radius}px`;
    }

    setShowContent(progress < HERO_HIDE_END);
    setShowScrollHint(progress < 0.05);

    window.dispatchEvent(
      new CustomEvent("crest:hero-progress", {
        detail: { progress, borderDone },
      })
    );

    const now = Date.now();
    if (now - lastLogRef.current > 220) {
      lastLogRef.current = now;
      debugLog(
        "Hero.tsx:progress",
        "hero cinematic scroll progress",
        {
          progress,
          showHero: progress < HERO_HIDE_END,
          borderDone,
          platformCentered: progress >= PLATFORM_ENTER_END && progress < PLATFORM_MOVE_START,
          platformAnchored: progress >= PLATFORM_MOVE_END,
          featuresActive: progress >= FEATURES_START,
        },
        "H-cinematic",
        "platform-scroll-v2"
      );
    }
  });

  useEffect(() => {
    debugLog(
      "Hero.tsx:mount",
      "hero cinematic section mounted",
      { sectionHeight: `${CINEMATIC_HEIGHT}vh` },
      "H-cinematic",
      "platform-scroll-v2"
    );
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ height: `${CINEMATIC_HEIGHT}vh` }}
      className="relative bg-white"
    >
      <div className="sticky top-0 h-[100dvh] w-full bg-white z-0">
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
              className="absolute inset-0 z-[2] pointer-events-none ring-[1.5px] ring-inset ring-white/90 transition-opacity duration-200"
              style={{ borderRadius: `${FRAME_RADIUS}px` }}
            />

            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(15,8,30,0.42) 100%)",
              }}
            />

            <motion.div
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 z-30 p-8 sm:p-10 lg:p-14 max-w-xl pointer-events-none"
            >
              <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase text-white/50 mb-5">
                Enterprise Cybersecurity
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display text-white leading-[1.08] text-balance">
                Detect AI threats{" "}
                <span className="italic text-white/70">before</span>{" "}
                they reach your perimeter.
              </h1>
            </motion.div>

            <motion.div
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 z-30 p-8 sm:p-10 lg:p-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
              style={{ pointerEvents: showContent ? "auto" : "none" }}
            >
              <p className="text-sm sm:text-base text-white/55 max-w-sm leading-relaxed font-light">
                Crest neutralizes deepfakes, AI-generated phishing, and zero-day
                payloads across email, endpoints, and cloud — from one platform.
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
                <h2 id="platform" className="text-5xl sm:text-6xl lg:text-7xl font-display text-white leading-[1.08]">
                  The Platform
                </h2>

                <motion.div
                  style={{ opacity: anchoredLineOpacity }}
                  className="mx-auto mt-7 w-[min(17rem,70vw)] px-3"
                  aria-hidden="true"
                >
                  <div className="h-px bg-white/20 overflow-hidden">
                    <motion.div
                      style={{ scaleX: featureProgress }}
                      className="h-full w-full origin-left bg-white/80"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {platformFeatures.map((feature, index) => (
              <PlatformFeature
                key={feature.name}
                feature={feature}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}

            <motion.div
              animate={{ opacity: showScrollHint ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
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

function PlatformFeature({
  feature,
  index,
  scrollYProgress,
}: {
  feature: PlatformFeature;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segment = (FEATURES_END - FEATURES_START) / platformFeatures.length;
  const start = FEATURES_START + index * segment;
  const end = start + segment;
  const mid = start + segment * 0.5;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.025, end - 0.025, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, mid, end], [40, 0, -40]);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.98, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 z-20 flex items-center justify-center px-8 sm:px-10 lg:px-14 pt-28 pointer-events-none"
    >
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <feature.icon className="h-6 w-6 text-white/80" aria-hidden="true" />
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">
            0{index + 1} / 0{platformFeatures.length} · {feature.stat}
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-display text-white mb-4">{feature.name}</h3>
        <p className="text-base sm:text-lg text-white/55 leading-relaxed font-light">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
