import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { PlasmaShader } from "./PlasmaShader";
import { ArrowDown, Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FRAME_PADDING = 20;
const FRAME_RADIUS = 28;
const CINEMATIC_HEIGHT = 380; // Flowing scroll height for agile, responsive scroll feel

// Streamlined, continuous milestone progression
const HERO_HIDE_START = 0.01;
const HERO_HIDE_END = 0.12;
const BORDER_EXPAND_START = 0.08;
const BORDER_EXPAND_END = 0.20;
const PLATFORM_ENTER_START = 0.18;
const PLATFORM_ENTER_END = 0.28;
const PLATFORM_MOVE_START = 0.30;
const PLATFORM_MOVE_END = 0.40;
const FEATURES_START = 0.40;
const FEATURES_END = 0.98;
export const NAV_SHOW_PROGRESS = BORDER_EXPAND_END + 0.01;

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const platformTitleOpacity = useTransform(
    scrollYProgress,
    [PLATFORM_ENTER_START, PLATFORM_ENTER_END, PLATFORM_MOVE_END, PLATFORM_MOVE_END + 0.05],
    [0, 1, 1, 0.95]
  );
  const platformTitleY = useTransform(
    scrollYProgress,
    [PLATFORM_ENTER_START, PLATFORM_ENTER_END, PLATFORM_MOVE_START, PLATFORM_MOVE_END],
    ["60vh", "0vh", "0vh", "-38vh"]
  );
  const platformTitleX = useTransform(
    scrollYProgress,
    [PLATFORM_MOVE_START, PLATFORM_MOVE_END],
    ["0vw", "-36vw"]
  );
  const platformTitleScale = useTransform(
    scrollYProgress,
    [PLATFORM_MOVE_START, PLATFORM_MOVE_END],
    [1, 0.72]
  );
  const anchoredLineOpacity = useTransform(
    scrollYProgress,
    [PLATFORM_MOVE_START, PLATFORM_MOVE_END],
    [0, 1]
  );
  const remainingProgress = useTransform(
    scrollYProgress,
    [FEATURES_START, FEATURES_END],
    [1, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const borderDone = progress >= BORDER_EXPAND_END;
    const expansion = Math.min(
      1,
      Math.max(0, (progress - BORDER_EXPAND_START) / (BORDER_EXPAND_END - BORDER_EXPAND_START))
    );
    const padding = Math.round(FRAME_PADDING * (1 - expansion));
    const radius = Math.round(FRAME_RADIUS * (1 - expansion));

    if (outerRef.current) outerRef.current.style.padding = `${padding}px`;
    if (innerRef.current) {
      innerRef.current.style.borderRadius = `${radius}px`;
      innerRef.current.style.clipPath = `inset(0 round ${radius}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.opacity = radius >= 6 ? "1" : "0";
      ringRef.current.style.borderRadius = `${radius}px`;
    }

    setShowContent(progress < HERO_HIDE_END);
    setShowScrollHint(progress < 0.04);

    window.dispatchEvent(
      new CustomEvent("crest:hero-progress", {
        detail: { progress, borderDone },
      })
    );
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ height: `${CINEMATIC_HEIGHT}vh` }}
      className="relative bg-background"
    >
      <div className="sticky top-0 h-[100dvh] w-full bg-background z-0">
        <div
          ref={outerRef}
          className="absolute inset-0 bg-background transition-[padding] duration-75 ease-out"
          style={{ padding: `${FRAME_PADDING}px` }}
        >
          <div
            ref={innerRef}
            className="relative w-full h-full overflow-hidden bg-[#2e1050]"
            style={{
              borderRadius: `${FRAME_RADIUS}px`,
              clipPath: `inset(0 round ${FRAME_RADIUS}px)`,
            }}
          >
            {/* Purple Plasma Shader */}
            <PlasmaShader className="absolute inset-0 w-full h-full block" />

            {/* Clean subtle border without glow */}
            <div
              ref={ringRef}
              className="absolute inset-0 z-[2] pointer-events-none border border-white/15 transition-opacity duration-200"
              style={{ borderRadius: `${FRAME_RADIUS}px` }}
            />

            {/* Hero Main Headline */}
            <motion.div
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 z-30 p-8 sm:p-10 lg:p-14 max-w-xl pointer-events-none"
            >
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-4">
                Enterprise Cybersecurity
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display text-white leading-[1.08] text-balance">
                Detect AI threats <span className="italic text-white/85 font-normal">before</span> they reach your perimeter.
              </h1>
            </motion.div>

            {/* Hero Subtitle & CTA */}
            <motion.div
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 z-30 p-8 sm:p-10 lg:p-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
              style={{ pointerEvents: showContent ? "auto" : "none" }}
            >
              <p className="text-sm sm:text-base text-white/80 max-w-sm leading-relaxed font-light">
                Crest neutralizes deepfakes, AI-generated phishing, and zero-day payloads across email, endpoints, and cloud — from one platform.
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-full border border-white/30 backdrop-blur-md transition-all shadow-sm"
                >
                  <span>Book demo</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>

            {/* "The Platform" Traveling Title */}
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
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-4">
                  Scroll to explore
                </p>
                <h2
                  id="platform"
                  className="text-5xl sm:text-6xl lg:text-7xl font-display text-white leading-[1.08]"
                >
                  The Platform
                </h2>
                <motion.div
                  style={{ opacity: anchoredLineOpacity }}
                  className="mx-auto mt-6 w-[min(16rem,70vw)] px-2"
                  aria-hidden="true"
                >
                  <div className="h-[2px] bg-white/25 rounded-full overflow-hidden">
                    <motion.div
                      style={{ scaleX: remainingProgress }}
                      className="h-full w-full origin-left bg-white rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Platform Feature Cards with Glassmorphic Matte Surface */}
            {platformFeatures.map((feature, index) => (
              <PlatformFeatureCard
                key={feature.name}
                feature={feature}
                index={index}
                total={platformFeatures.length}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Floating scroll prompt */}
            <motion.div
              animate={{ opacity: showScrollHint ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-none"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-medium">Scroll</span>
              <ArrowDown className="h-3.5 w-3.5 text-white/60 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformFeatureCard({
  feature,
  index,
  total,
  scrollYProgress,
}: {
  feature: PlatformFeature;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segment = (FEATURES_END - FEATURES_START) / total;
  const start = FEATURES_START + index * segment;
  const enterEnd = start + segment * 0.16;
  const holdEnd = start + segment * 0.76;
  const end = start + segment;

  const opacity = useTransform(scrollYProgress, [start, enterEnd, holdEnd, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, enterEnd, holdEnd, end], [36, 0, 0, -28]);
  const scale = useTransform(scrollYProgress, [start, enterEnd, holdEnd, end], [0.97, 1, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 z-20 flex items-center justify-center p-5 sm:p-8 lg:p-12 pt-24 sm:pt-28 pointer-events-none"
    >
      {/* Authentic Frosted Glass Card matching reference image */}
      <div className="max-w-3xl w-full rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.08] sm:bg-white/[0.09] backdrop-blur-2xl sm:backdrop-blur-3xl border border-white/25 p-7 sm:p-10 lg:p-12 shadow-md flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-white tracking-tight leading-[1.1] mb-2.5">
              {feature.name}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/30 bg-white/5 text-[11px] sm:text-xs font-medium text-white/90 backdrop-blur-sm">
              <feature.icon className="w-3.5 h-3.5 text-white/90" />
              <span>Threat Defense</span>
            </div>
          </div>

          <div className="text-right shrink-0 hidden sm:block">
            <p className="text-xs sm:text-sm font-medium text-white/90 tracking-wide">
              Continuous Intelligence
            </p>
            <p className="text-[11px] font-mono text-white/60 tracking-wider mt-0.5">
              Module 0{index + 1} / 0{total}
            </p>
          </div>
        </div>

        {/* Center Content Body */}
        <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-light my-5 sm:my-6 max-w-2xl">
          {feature.description}
        </p>

        {/* Bottom Footer Row */}
        <div className="flex items-end justify-between gap-4 pt-3 border-t border-white/10">
          <div className="text-xs sm:text-sm font-medium text-white/80 leading-snug">
            <span>Designed for Enterprise</span>
            <span className="block text-[11px] text-white/60 font-light">Autonomous SOC Response</span>
          </div>

          {/* Reference pill badge: solid white badge + secondary label */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 p-1 pl-1.5 pr-3.5 rounded-full border border-white/20 backdrop-blur-md">
            <span className="px-2.5 py-0.5 rounded-full bg-white text-purple-950 text-[11px] font-bold uppercase tracking-wider">
              LIVE
            </span>
            <span className="text-xs sm:text-sm font-medium text-white/90">
              {feature.stat}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
