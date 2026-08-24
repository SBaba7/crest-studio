import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { debugLog } from "@/lib/debugLog";
import { NAV_SHOW_PROGRESS } from "./Hero";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isBookDemoPage = location.pathname === "/book-demo" || location.pathname === "/demo";

  const [visible, setVisible] = useState(!isHomePage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!isHomePage) {
      setVisible(true);
      return;
    }

    const onHeroProgress = (e: Event) => {
      const progress = (e as CustomEvent<{ progress: number }>).detail.progress;
      setVisible(progress > NAV_SHOW_PROGRESS);
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
  }, [isHomePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace("#", "");

    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        if (targetId) {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
      return;
    }

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

  const shellClass = isBookDemoPage
    ? "bg-[#140b20]/55 ring-white/10 shadow-black/20"
    : "bg-background/85 shadow-black/5 ring-border";
  const mutedClass = isBookDemoPage ? "text-white/65 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const navShellClass = isBookDemoPage ? "bg-white/[0.05] ring-white/10" : "bg-secondary/40 ring-border/50";
  const inactiveNavClass = isBookDemoPage ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const mobileButtonClass = isBookDemoPage ? "bg-white/10 text-white" : "bg-secondary text-foreground";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center px-6 pt-6 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl rounded-full backdrop-blur-2xl ring-1 py-2.5 px-5 ${shellClass}`}
          >
            <Link
              to="/"
              className={`group shrink-0 text-sm font-semibold tracking-[-0.04em] transition-opacity duration-300 hover:opacity-65 ${isBookDemoPage ? "text-white" : "text-[#09060e]"}`}
              aria-label="Crest Home"
            >
              Crest.
            </Link>
            <nav className={`hidden md:flex items-center gap-1 rounded-full p-1 ring-1 ${navShellClass}`} aria-label="Primary">
              {navLinks.map((link) => {
                const isActive = isHomePage && activeSection === link.href.substring(1);
                return (
                  <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? (isBookDemoPage ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10" : "bg-background text-foreground shadow-sm ring-1 ring-border") : inactiveNavClass}`}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className={`text-sm font-medium transition-colors px-3 py-2 ${mutedClass}`}>Log in</Link>
              <Link to="/book-demo" className="group inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">
                Book demo
              </Link>
            </div>
            <button type="button" className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full ${mobileButtonClass}`} aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className={`absolute top-20 left-6 right-6 rounded-[2rem] backdrop-blur-2xl ring-1 p-6 shadow-2xl pointer-events-auto origin-top ${isBookDemoPage ? "bg-[#140b20]/95 ring-white/10" : "bg-background/95 ring-border"}`}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`block px-4 py-3 rounded-2xl text-lg font-display transition-colors ${isHomePage && activeSection === link.href.substring(1) ? (isBookDemoPage ? "bg-white/10 text-white" : "bg-secondary text-foreground") : (isBookDemoPage ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}`}>
                  {link.label}
                </a>
              ))}
              <div className={`mt-4 pt-4 border-t flex flex-col gap-3 ${isBookDemoPage ? "border-white/10" : "border-border"}`}>
                <Link to="/login" onClick={() => setMobileOpen(false)} className={`block w-full text-center rounded-full py-3 text-base font-semibold ${isBookDemoPage ? "bg-white/10 text-white" : "bg-secondary text-foreground"}`}>Log in</Link>
                <Link to="/book-demo" onClick={() => setMobileOpen(false)} className="block w-full text-center rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground">Book demo</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
