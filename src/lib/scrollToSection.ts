export function scrollToSection(
  targetId: string,
  behavior: ScrollBehavior = "smooth"
) {
  const target = document.getElementById(targetId);

  if (!target) {
    return false;
  }

  const navigationOffset = 112;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navigationOffset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    left: 0,
    behavior,
  });

  return true;
}
