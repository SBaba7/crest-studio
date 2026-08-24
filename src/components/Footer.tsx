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
    <footer className="relative z-10 overflow-hidden min-h-[440px] border-t border-white/10">
      <PlasmaShader className="absolute inset-0 w-full h-full block" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(38, 12, 68, 0.78) 0%, rgba(30, 9, 56, 0.94) 100%)" }} />
      <div className="relative z-10 pt-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-12">
            <div className="space-y-6 xl:col-span-1">
              <Link to="/" className="text-2xl font-display tracking-tight text-white hover:text-[#c9a7ff] transition-colors">Crest</Link>
              <p className="text-sm leading-relaxed text-white/50 max-w-xs font-light">Unified threat detection for the AI era. Deepfake blocking, phishing neutralization, and zero-trust enforcement — deployed in minutes.</p>
              <a href="mailto:sales@crestsecurity.io" className="text-sm text-white/50 hover:text-[#c9a7ff] transition-colors">sales@crestsecurity.io</a>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">Product</h3>
                  <ul className="space-y-4">{product.map((name) => <li key={name}><a href={`#${name.toLowerCase()}`} onClick={(e) => scrollTo(e, name)} className="text-sm text-white/45 hover:text-[#c9a7ff] transition-colors">{name}</a></li>)}</ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">Company</h3>
                  <ul className="space-y-4">
                    {company.map((name) => <li key={name}><a href={`#${name.toLowerCase()}`} onClick={(e) => scrollTo(e, name)} className="text-sm text-white/45 hover:text-[#c9a7ff] transition-colors">{name}</a></li>)}
                    <li><Link to="/book-demo" className="text-sm text-white/45 hover:text-[#c9a7ff] transition-colors">Book a demo</Link></li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">Legal</h3>
                <ul className="space-y-4">{legal.map(([name, href]) => <li key={name}><Link to={href} className="text-sm text-white/45 hover:text-[#c9a7ff] transition-colors">{name}</Link></li>)}</ul>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/35">&copy; {new Date().getFullYear()} Crest Security. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-medium"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-white/35 hover:text-white/70 transition-colors">LinkedIn</a><a href="https://x.com" target="_blank" rel="noreferrer" className="text-white/35 hover:text-white/70 transition-colors">X</a></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
