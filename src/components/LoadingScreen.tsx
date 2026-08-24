import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PlasmaShader } from "./PlasmaShader";

const FRAME_PADDING = 20;
const FRAME_RADIUS = 28;
type LoadingPhase = 0 | 1 | 2 | 3;

interface LoadingScreenProps {
  onComplete?: () => void;
}

/**
 * Draws a single purple line precisely inside the same 20px frame used by the
 * hero. Once complete, that line expands vertically from its centre into the
 * same rounded shader rectangle, creating a continuous handoff to the hero.
 */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();
  const [hasPlayedOnce] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      sessionStorage.getItem("crest_initial_loaded") === "true" ||
      (window as Window & { __crest_initial_loaded?: boolean }).__crest_initial_loaded === true
    );
  });
  const [phase, setPhase] = useState<LoadingPhase>(0);
  const [isCompleted, setIsCompleted] = useState(hasPlayedOnce);

  useEffect(() => {
    if (hasPlayedOnce) {
      onComplete?.();
      return;
    }

    const timings = reduceMotion
      ? { lineComplete: 40, expand: 90, release: 170, complete: 250 }
      : { lineComplete: 1_160, expand: 1_520, release: 2_900, complete: 3_520 };

    const lineTimer = window.setTimeout(() => setPhase(1), timings.lineComplete);
    const expandTimer = window.setTimeout(() => setPhase(2), timings.expand);
    const releaseTimer = window.setTimeout(() => setPhase(3), timings.release);
    const completeTimer = window.setTimeout(() => {
      setIsCompleted(true);
      sessionStorage.setItem("crest_initial_loaded", "true");
      (window as Window & { __crest_initial_loaded?: boolean }).__crest_initial_loaded = true;
      onComplete?.();
      window.dispatchEvent(new CustomEvent("crest:opening-complete"));
    }, timings.complete);

    return () => {
      window.clearTimeout(lineTimer);
      window.clearTimeout(expandTimer);
      window.clearTimeout(releaseTimer);
      window.clearTimeout(completeTimer);
    };
  }, [hasPlayedOnce, onComplete, reduceMotion]);

  if (isCompleted) return null;

  const ease = [0.77, 0, 0.175, 1] as const;
  const lineComplete = phase >= 1;
  const frameOpen = phase >= 2;

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="crest-line-reveal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.08 : 0.62, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-white"
          aria-hidden="true"
        >
          <motion.img
            src="/crest-logo-black.svg"
            alt=""
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 10 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-40 -translate-x-1/2 -translate-y-[calc(100%+1.9rem)] sm:w-48"
          />

          <div
            className="absolute"
            style={{
              left: `${FRAME_PADDING}px`,
              right: `${FRAME_PADDING}px`,
              top: `${FRAME_PADDING}px`,
              bottom: `${FRAME_PADDING}px`,
            }}
          >
            <motion.div
              initial={{ scaleY: 0.0035 }}
              animate={{ scaleY: frameOpen ? 1 : 0.0035 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.22, ease }}
              style={{ transformOrigin: "center", borderRadius: `${FRAME_RADIUS}px` }}
              className="absolute inset-0 overflow-hidden will-change-transform"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 1.08, ease: [0.65, 0, 0.15, 1] }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 bg-[#3b1759] will-change-transform"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: frameOpen ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.58, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <PlasmaShader className="absolute inset-0 block h-full w-full" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: frameOpen ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.3, delay: reduceMotion ? 0 : 0.28 }}
                style={{ borderRadius: `${FRAME_RADIUS}px` }}
                className="pointer-events-none absolute inset-0 border border-white/15"
              />

              <motion.img
                src="/crest-logo-white.svg"
                alt=""
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: frameOpen ? 1 : 0, scale: frameOpen ? 1 : 0.96 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.46, delay: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-56 -translate-x-1/2 -translate-y-1/2 sm:w-72"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
