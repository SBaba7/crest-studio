import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { PlasmaShader } from "./PlasmaShader";
import { debugLog } from "@/lib/debugLog";

const features = [
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

const INTRO_END = 0.14;
const STEP_COUNT = features.length + 1;
const VH_PER_STEP = 100;

export function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.02 && v < 0.98) {
      debugLog("PlatformSection.tsx:progress", "platform scroll progress", {
        progress: v,
        introDone: v > INTRO_END,
      }, "H-platform", "post-fix-v3");
    }
  });

  const introOpacity = useTransform(scrollYProgress, [0, INTRO_END * 0.7, INTRO_END], [1, 1, 0]);
  const anchoredOpacity = useTransform(scrollYProgress, [INTRO_END * 0.85, INTRO_END + 0.02], [0, 1]);

  return (
    <section
      id="platform"
      ref={sectionRef}
      style={{ height: `${STEP_COUNT * VH_PER_STEP}vh` }}
      className="relative z-20"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#101a24]">
        <PlasmaShader className="absolute inset-0 w-full h-full block" />

        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 72% 62% at 50% 45%, rgba(33, 105, 118, 0.18) 0%, transparent 46%), radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(5, 16, 24, 0.62) 100%)",
          }}
        />

        <motion.div
          style={{ opacity: introOpacity }}
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
          style={{ opacity: anchoredOpacity }}
          className="absolute top-0 left-0 z-30 p-8 sm:p-10 lg:p-14 pointer-events-none"
        >
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase text-white/50 mb-3">
            Enterprise Cybersecurity
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display text-white leading-[1.08]">
            The Platform
          </h2>
        </motion.div>

        {features.map((feature, index) => (
          <FeatureStep
            key={feature.name}
            feature={feature}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <ProgressDot key={i} scrollYProgress={scrollYProgress} step={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureStep({
  feature,
  index,
  scrollYProgress,
}: {
  feature: (typeof features)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segment = (1 - INTRO_END) / features.length;
  const start = INTRO_END + index * segment;
  const mid = start + segment * 0.5;
  const end = start + segment;

  const opacity = useTransform(scrollYProgress, [start, start + 0.04, end - 0.04, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [40, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-20 flex items-center justify-center px-8 sm:px-10 lg:px-14 pt-36 pointer-events-none"
    >
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <feature.icon className="h-6 w-6 text-white/80" aria-hidden="true" />
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">
            0{index + 1} / 0{features.length} · {feature.stat}
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

function ProgressDot({
  scrollYProgress,
  step,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  step: number;
}) {
  const start = step / STEP_COUNT;
  const end = (step + 1) / STEP_COUNT;
  const mid = (start + end) / 2;
  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.25, 1, 0.25]);
  return <motion.div style={{ opacity }} className="w-1.5 h-1.5 rounded-full bg-white/60" />;
}
