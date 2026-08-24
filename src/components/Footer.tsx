import { ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PlasmaShader } from "./PlasmaShader";

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = ["Platform", "Product", "Pricing", "FAQ"];
  const company = ["About", "Contact"];
  const legal = [
    ["Privacy Policy", "/privacy"],
    ["Terms of Service", "/terms"],
    ["Cookie Policy", "/cookies"],
    ["Security", "/security"],
  ];

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/#${id.toLowerCase()}`);
      return;
    }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative z-10 overflow-hidden bg-[#08050e] pt-20 text-white sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 overflow-hidden opacity-45">
        <PlasmaShader className="absolute inset-0 block h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#08050e_0%,rgba(8,5,14,0.18)_52%,#08050e_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[104rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[clamp(7rem,17vw,17rem)] items-center justify-center border-b border-white/10 pb-5 sm:pb-8">
          <img
            src="/crest-logo-white.svg"
            alt="Crest"
            className="h-[78%] w-auto max-w-[76vw] object-contain"
          />
        </div>
      </div>

      <div className="relative mt-10 rounded-t-[2.5rem] border-t border-white/10 bg-[#05030a] sm:mt-14 sm:rounded-t-[4rem]">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 sm:pb-10 sm:pt-16 lg:px-8 lg:pt-20">
          <div className="grid gap-14 xl:grid-cols-12 xl:gap-10">
            <div className="xl:col-span-4">
              <Link to="/" className="group flex h-7 w-28 items-center sm:h-8 sm:w-32" aria-label="Crest home">
                <img
                  src="/crest-logo-white.svg"
                  alt="Crest"
                  className="h-full w-full object-contain object-left transition-opacity duration-300 group-hover:opacity-70"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                Unified threat detection for the AI era. Deepfake blocking, phishing neutralization, and zero-trust enforcement—deployed in minutes.
              </p>
              <a href="mailto:sales@crestsecurity.io" className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white">
                sales@crestsecurity.io
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:col-span-7 xl:col-start-6">
              <FooterColumn title="Product">
                {product.map((name) => (
                  <a key={name} href={`#${name.toLowerCase()}`} onClick={(event) => scrollTo(event, name)} className="footer-link">
                    {name}
                  </a>
                ))}
              </FooterColumn>
              <FooterColumn title="Company">
                {company.map((name) => (
                  <a key={name} href={`#${name.toLowerCase()}`} onClick={(event) => scrollTo(event, name)} className="footer-link">
                    {name}
                  </a>
                ))}
                <Link to="/book-demo" className="footer-link">Book a demo</Link>
              </FooterColumn>
              <FooterColumn title="Legal" className="col-span-2 sm:col-span-1">
                {legal.map(([name, href]) => (
                  <Link key={href} to={href} className="footer-link">{name}</Link>
                ))}
              </FooterColumn>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-6 text-xs text-white/35 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Crest Security. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/80">LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/80">X</a>
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="ml-auto transition-colors hover:text-white/80 sm:ml-2">
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{title}</h3>
      <div className="mt-5 flex flex-col items-start gap-3.5">{children}</div>
    </div>
  );
}
