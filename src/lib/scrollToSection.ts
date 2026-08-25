import type Lenis from "lenis";

const NAV_OFFSET = 112;

// The "Platform" title lives inside the pinned/scroll-jacked hero on desktop
// (see Hero.tsx: DesktopHero renders it inside a scroll-linked motion.div).
// Its on-screen position is driven by scroll progress itself, so measuring
// its getBoundingClientRect() and scrolling toward that spot makes the
// target move again as soon as the scroll starts — the nav link can never
// quite catch it. Instead we compute the exact scrollTop that corresponds to
// the moment the title is fully revealed and holding still, before it slides
// away into the feature cards (progress 0.28-0.30 in Hero.tsx).
const HERO_ID = "home";
const DESKTOP_MEDIA_QUERY = "(min-width: 640px)";
const PLATFORM_HOLD_PROGRESS = 0.29;

function resolvePlatformScrollTop(): number | null {
  if (typeof window === "undefined") return null;
  if (!window.matchMedia(DESKTOP_MEDIA_QUERY).matches) return null; // mobile hero isn't scroll-jacked

  const hero = document.getElementById(HERO_ID);
  if (!hero) return null;

  const scrollRange = hero.offsetHeight - window.innerHeight;
  if (scrollRange <= 0) return null;

  const heroTop = hero.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, heroTop + PLATFORM_HOLD_PROGRESS * scrollRange);
}

function resolveScrollTarget(targetId: string): number | null {
  if (targetId === "platform") {
    const platformTop = resolvePlatformScrollTop();
    if (platformTop !== null) return platformTop;
  }

  const target = document.getElementById(targetId);
  if (!target) return null;

  const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  return Math.max(0, targetTop);
}

/**
 * Scrolls to a section by id. When a Lenis instance is passed, the scroll is
 * handed to Lenis so it doesn't fight the page's smooth-scroll animation —
 * calling the native window.scrollTo while Lenis is mid-animation leaves
 * Lenis's own loop to override it on the next frame, which is what made nav
 * clicks feel broken/jumpy.
 */
export function scrollToSection(
  targetId: string,
  behavior: ScrollBehavior = "smooth",
  lenis?: Lenis
) {
  const top = resolveScrollTarget(targetId);
  if (top === null) return false;

  if (lenis) {
    lenis.scrollTo(top, { immediate: behavior === "auto" });
  } else {
    window.scrollTo({ top, left: 0, behavior });
  }

  return true;
}
