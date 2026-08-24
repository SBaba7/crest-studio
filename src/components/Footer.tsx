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

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/#${id.toLowerCase()}`);
      return;
    }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative shrink-0 overflow-hidden border-t border-white/10 bg-[#170c25] text-white">
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        <PlasmaShader className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,12,37,0.78),rgba(13,8,21,0.96))] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr] lg:gap-20">
          <div className="max-w-md">
            <Link to="/" className="text-3xl font-display tracking-tight text-white transition-colors hover:text-[#c9a7ff]">
              Crest
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              Unified threat detection for the AI era. Deepfake blocking, phishing neutralization, and zero-trust enforcement from one platform.
            </p>
            <a href="mailto:sales@crestsecurity.io" className="mt-6 inline-block text-sm text-white/55 transition-colors hover:text-[#c9a7ff]">
              sales@crestsecurity.io
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Product</h3>
              <ul className="space-y-3.5">
                {product.map((name) => (
                  <li key={name}>
                    <a href={`#${name.toLowerCase()}`} onClick={(e) => scrollTo(e, name)} className="text-sm text-white/45 transition-colors hover:text-white">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Company</h3>
              <ul className="space-y-3.5">
                {company.map((name) => (
                  <li key={name}>
                    <a href={`#${name.toLowerCase()}`} onClick={(e) => scrollTo(e, name)} className="text-sm text-white/45 transition-colors hover:text-white">
                      {name}
                    </a>
                  </li>
                ))}
                <li>
                  <Link to="/book-demo" className="text-sm text-white/45 transition-colors hover:text-white">Book a demo</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Legal</h3>
              <ul className="space-y-3.5">
                {legal.map(([name, href]) => (
                  <li key={name}>
                    <Link to={href} className="text-sm text-white/45 transition-colors hover:text-white">{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Crest Security. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/75">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/75">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
