import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CrestChromaWavesProps {
  className?: string;
}

/**
 * An original SVG-based chromatic wave treatment. It is intentionally separate
 * from third-party component code and only mounts motion while it is on screen.
 */
export function CrestChromaWaves({ className = "" }: CrestChromaWavesProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const id = useId().replace(/:/g, "");
  const isAnimated = inView && !reduceMotion;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "180px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id={`${id}-violet`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#261143" stopOpacity="0" />
            <stop offset="32%" stopColor="#9559e9" stopOpacity="0.56" />
            <stop offset="67%" stopColor="#ba8cff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#261143" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-blue`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84c7ff" stopOpacity="0" />
            <stop offset="38%" stopColor="#5c75ff" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#d79bff" stopOpacity="0.46" />
            <stop offset="100%" stopColor="#170b2a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8adff" stopOpacity="0.48" />
            <stop offset="55%" stopColor="#7046ca" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#08050e" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-noise`} x="-15%" y="-30%" width="130%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.023" numOctaves="2" seed="9" result="noise">
              {isAnimated && (
                <animate
                  attributeName="baseFrequency"
                  dur="13s"
                  values="0.005 0.023;0.012 0.034;0.005 0.023"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="78" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          <filter id={`${id}-soft`} x="-15%" y="-20%" width="130%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1600" height="1000" fill="#08050e" />
        <ellipse cx="790" cy="440" rx="610" ry="440" fill={`url(#${id}-glow)`} filter={`url(#${id}-soft)`} />

        <g filter={`url(#${id}-noise)`} style={{ mixBlendMode: "screen" }}>
          <path d="M-120 220C145 78 306 403 560 275C836 136 950 45 1192 214C1358 330 1484 285 1720 158V560C1452 695 1268 652 1060 574C812 480 627 675 386 534C210 430 68 508-120 610V220Z" fill={`url(#${id}-violet)`} />
          <path d="M-130 510C125 374 319 664 523 556C752 435 874 352 1105 493C1358 646 1510 540 1730 420V820C1481 921 1313 834 1082 743C883 664 699 875 448 741C214 617 54 746-130 838V510Z" fill={`url(#${id}-blue)`} opacity="0.88" />
          <path d="M-140 742C126 609 280 839 536 730C790 622 918 568 1115 712C1332 870 1517 744 1735 641V1040H-140V742Z" fill={`url(#${id}-violet)`} opacity="0.56" />
        </g>

        <g opacity="0.28" fill="none" stroke="#efe7ff" strokeWidth="1">
          <path d="M-60 358C240 208 362 499 616 382C876 262 1012 171 1265 332C1431 438 1545 384 1670 315" />
          <path d="M-70 674C214 541 352 790 608 665C856 545 996 471 1230 614C1418 727 1530 667 1680 588" />
        </g>
      </svg>
    </div>
  );
}
