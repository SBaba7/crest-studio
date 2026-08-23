import { PlasmaShader } from "./PlasmaShader";

export function Footer() {
  const navigation = {
    product: [
      { name: "Platform", href: "#platform" },
      { name: "Product", href: "#product" },
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Careers", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Security", href: "#" },
    ],
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || href === "#") return;
    e.preventDefault();
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 overflow-hidden min-h-[420px]">
      <PlasmaShader className="absolute inset-0 w-full h-full block" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,8,30,0.85) 0%, rgba(15,8,30,0.92) 100%)",
        }}
      />

      <div className="relative z-10 pt-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-12">
            <div className="space-y-6 xl:col-span-1">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-2xl font-display tracking-tight text-white hover:text-[#c4a8f0] transition-colors"
              >
                Crest
              </a>
              <p className="text-sm leading-relaxed text-white/50 max-w-xs font-light">
                Unified threat detection for the AI era. Deepfake blocking, phishing
                neutralization, and zero-trust enforcement — deployed in minutes.
              </p>
              <p className="text-sm text-white/50">
                <a href="mailto:sales@crestsecurity.io" className="hover:text-[#c4a8f0] transition-colors">
                  sales@crestsecurity.io
                </a>
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">Product</h3>
                  <ul role="list" className="space-y-4">
                    {navigation.product.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollTo(e, item.href)}
                          className="text-sm text-white/45 hover:text-[#c4a8f0] transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">Company</h3>
                  <ul role="list" className="space-y-4">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollTo(e, item.href)}
                          className="text-sm text-white/45 hover:text-[#c4a8f0] transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">Legal</h3>
                <ul role="list" className="space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm text-white/45 hover:text-[#c4a8f0] transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/35">
              &copy; {new Date().getFullYear()} Crest Security. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs font-medium">
              <a href="#" className="text-white/35 hover:text-white/70 transition-colors">LinkedIn</a>
              <a href="#" className="text-white/35 hover:text-white/70 transition-colors">X</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
