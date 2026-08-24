import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { debugLog } from "@/lib/debugLog";
import { NAV_SHOW_PROGRESS } from "./Hero";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onHeroProgress = (e: Event) => {
      const progress = (e as CustomEvent<{ progress: number }>).detail.progress;
      setVisible((prev) => prev || progress > NAV_SHOW_PROGRESS);
      if (progress > NAV_SHOW_PROGRESS - 0.05 && progress < NAV_SHOW_PROGRESS + 0.05) {
        debugLog("Navbar.tsx:hero-progress", "navbar tied to hero progress", {
          progress,
          visible: progress > NAV_SHOW_PROGRESS,
          threshold: NAV_SHOW_PROGRESS,
        }, "H-nav", "post-fix-v4");
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const sections = navLinks.map((link) => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && y >= element.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("crest:hero-progress", onHeroProgress);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("crest:hero-progress", onHeroProgress);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace("#", "");
    if (targetId === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center px-6 pt-6 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center justify-between w-full max-w-4xl rounded-full bg-background/85 backdrop-blur-2xl shadow-lg shadow-black/5 ring-1 ring-border py-2.5 px-5"
          >
            <a href="#home" onClick={(e) => scrollToSection(e, "#")} className="text-xl font-display tracking-tight text-foreground" aria-label="Crest Home">
              Crest
            </a>
            <nav className="hidden md:flex items-center gap-1 rounded-full bg-secondary/40 p-1 ring-1 ring-border/50" aria-label="Primary">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-background text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"}`}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">Log in</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="group inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">Book Demo</a>
            </div>
            <button type="button" className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {visible && mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute top-20 left-6 right-6 rounded-[2rem] bg-background/95 backdrop-blur-2xl ring-1 ring-border p-6 shadow-2xl pointer-events-auto origin-top">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={`block px-4 py-3 rounded-2xl text-lg font-display transition-colors ${activeSection === link.href.substring(1) ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="block w-full text-center rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground">Book Demo</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
