import { ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { PlasmaShader } from "./PlasmaShader";
import { scrollToSection } from "@/lib/scrollToSection";

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const product = [
    { label: "Platform", id: "platform" },
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];
  const company = [{ label: "About", id: "about" }];
  const legal = [
    ["Privacy Policy", "/privacy"],
    ["Terms of Service", "/terms"],
    ["Cookie Policy", "/cookies"],
    ["Security", "/security"],
  ];

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const hash = `#${id}`;

    if (location.pathname === "/") {
      navigate({ hash });
      scrollToSection(id, "smooth", lenis);
      return;
    }

    navigate({ pathname: "/", hash });
  };

  return (
    <footer className="relative isolate z-10 overflow-hidden border-t border-white/10 bg-[#11061b] text-white">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-85 md:block" aria-hidden="true">
        <PlasmaShader className="absolute inset-0 block h-full w-full saturate-[1.3] contrast-[1.18] brightness-[1.08]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,5,14,0.12)_0%,rgba(8,5,14,0.04)_45%,rgba(8,5,14,0.2)_100%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:gap-14 sm:pb-16 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.7fr))] lg:gap-10">
          <div className="max-w-sm">
            <Link to="/" className="group -ml-[18px] flex h-9 w-36 items-center sm:h-10 sm:w-40" aria-label="Crest home">
              <img
                src="/footer_w.svg"
                alt="Crest"
                className="h-full w-full object-contain object-left transition-opacity duration-300 group-hover:opacity-70"
              />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Unified threat detection for the AI era. Deepfake blocking, phishing neutralization, and zero-trust enforcement—deployed in minutes.
            </p>
            <a href="mailto:sales@crestsecurity.io" className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-[#d8c5ff]">
              sales@crestsecurity.io
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <FooterColumn title="Product">
            {product.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(event) => scrollTo(event, link.id)} className="footer-link">
                {link.label}
              </a>
            ))}
          </FooterColumn>
          <FooterColumn title="Company">
            {company.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(event) => scrollTo(event, link.id)} className="footer-link">
                {link.label}
              </a>
            ))}
            <Link to="/book-demo" className="footer-link">Contact</Link>
            <Link to="/book-demo" className="footer-link">Book a demo</Link>
          </FooterColumn>
          <FooterColumn title="Legal">
            {legal.map(([name, href]) => (
              <Link key={href} to={href} className="footer-link">{name}</Link>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Crest Security. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/85">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/85">X</a>
            <button
              type="button"
              onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
              className="ml-auto transition-colors hover:text-white/85 sm:ml-2"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{title}</h3>
      <div className="mt-5 flex flex-col items-start gap-3.5">{children}</div>
    </div>
  );
}
