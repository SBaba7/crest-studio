import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlasmaShader } from "./PlasmaShader";

const FRAME_PADDING = 20;
const FRAME_RADIUS = 28;

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  // Check if initial animation has already completed in this browser session
  const [hasPlayedOnce] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      sessionStorage.getItem("crest_initial_loaded") === "true" ||
      (window as unknown as { __crest_initial_loaded?: boolean }).__crest_initial_loaded === true
    );
  });

  // phase: 0 = drawing line, 1 = curtain opening & expanding, 2 = fading out & revealing site
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [isCompleted, setIsCompleted] = useState(() => hasPlayedOnce);

  useEffect(() => {
    if (hasPlayedOnce) {
      onComplete?.();
      return;
    }

    // Stage 1: Line draws slowly and sleekly across the middle (0ms -> 2000ms)
    const timer1 = setTimeout(() => {
      setPhase(1); // Begin curtain opening & vertical portal expansion
    }, 2100);

    // Stage 2: Curtain opening takes ~2.4s of slow, sleek, luxurious expansion
    const timer2 = setTimeout(() => {
      setPhase(2); // Crossfade hand-off
    }, 4600);

    // Stage 3: Remove loader completely once site is fully unveiled
    const timer3 = setTimeout(() => {
      setIsCompleted(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("crest_initial_loaded", "true");
        (window as unknown as { __crest_initial_loaded?: boolean }).__crest_initial_loaded = true;
      }
      onComplete?.();
      window.dispatchEvent(new CustomEvent("crest:opening-complete"));
    }, 5400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [hasPlayedOnce, onComplete]);

  if (isCompleted) return null;

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="curtain-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto bg-white"
        >
          {/* Top Curtain Half (White panel that glides gracefully upward in phase 1) */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{
              y: phase === 1 ? "-100%" : "0%",
            }}
            transition={{
              duration: 2.4,
              ease: [0.77, 0, 0.175, 1], // Cinematic theatrical curtain ease
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-white z-20"
          />

          {/* Bottom Curtain Half (White panel that glides gracefully downward in phase 1) */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{
              y: phase === 1 ? "100%" : "0%",
            }}
            transition={{
              duration: 2.4,
              ease: [0.77, 0, 0.175, 1], // Cinematic theatrical curtain ease
            }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-20"
          />

          {/* Background backdrop behind curtains */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 1 ? 1 : 0 }}
            transition={{ duration: 1.6, delay: 0.2 }}
            className="absolute inset-0 bg-[#030712] z-0 pointer-events-none"
          />

          {/* Precision Congruent Portal (Shader Rectangle) */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${FRAME_PADDING}px`,
              right: `${FRAME_PADDING}px`,
              top: `${FRAME_PADDING}px`,
              bottom: `${FRAME_PADDING}px`,
            }}
          >
            {phase === 0 ? (
              /* Phase 0: Sleek, clean refined purple laser line drawing from left to right - no glow */
              <div
                className="absolute w-full"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "2.5px",
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.9,
                    ease: [0.65, 0, 0.15, 1],
                  }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "#581c87", // Clean, elegant, lighter purple without glowing halos
                  }}
                />
              </div>
            ) : (
              /* Phase 1: Expanding vertically like an opening portal aperture */
              <motion.div
                initial={{
                  top: "calc(50% - 1.25px)",
                  height: "2.5px",
                  borderRadius: "2px",
                }}
                animate={{
                  top: "0px",
                  height: "100%",
                  borderRadius: `${FRAME_RADIUS}px`,
                }}
                transition={{
                  duration: 2.4,
                  ease: [0.77, 0, 0.175, 1], // Perfectly synchronized with the curtain parting
                }}
                className="absolute left-0 right-0 overflow-hidden"
                style={{
                  backgroundColor: "#02010A",
                  clipPath: `inset(0 round ${FRAME_RADIUS}px)`,
                }}
              >
                {/* Live Waves Plasma Shader rendering seamlessly */}
                <PlasmaShader className="absolute inset-0 w-full h-full block" />

                {/* Subtle, clean boundary line without glow */}
                <div
                  className="absolute inset-0 pointer-events-none border border-white/15"
                  style={{ borderRadius: `${FRAME_RADIUS}px` }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
