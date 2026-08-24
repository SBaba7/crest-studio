import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { CTA } from "@/components/CTA";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

export function Product() {
  const SLIDES = [
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      alt: "Crest Dashboard",
      title: "Command Center",
      subtitle: "Total Visibility",
      meta: [
        { label: "Alerts", value: "Real-time" },
        { label: "Coverage", value: "100%" },
      ],
    },
    {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
      alt: "Threat Analysis",
      title: "Threat Analysis",
      subtitle: "Deep AI Inspection",
      meta: [
        { label: "Accuracy", value: "99.8%" },
        { label: "Speed", value: "< 50ms" },
      ],
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      alt: "Incident Response",
      title: "Automated Playbooks",
      subtitle: "Instant Response",
      meta: [
        { label: "Integrations", value: "150+" },
        { label: "Setup", value: "1-Click" },
      ],
    },
    {
      src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop",
      alt: "Code Scanning",
      title: "Vulnerability Scanning",
      subtitle: "Shift Left Security",
      meta: [
        { label: "Languages", value: "25+" },
        { label: "CI/CD", value: "Native" },
      ],
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24">
      {/* Product Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold tracking-tight sm:text-6xl text-foreground">
            The platform built for the <span className="text-teal-400">AI era</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore how Crest provides complete protection against next-generation threats with our unified security suite.
          </p>
        </div>
      </section>

      {/* Interactive Carousel Section */}
      <section className="py-12 bg-white/[0.02] border-y border-white/[0.06] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
          <h2 className="text-2xl font-display font-semibold text-center">See Crest in Action</h2>
        </div>
        <CoverflowCarousel slides={SLIDES} showCaption showNavigation showPagination />
      </section>

      {/* Deep Dive Features */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-display font-bold">Email Security Reimagined</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Legacy email gateways rely on outdated signatures. Crest uses behavioral AI and natural language processing to detect deepfakes, spear-phishing, and business email compromise before it reaches your employees.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-teal-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Neutralize advanced social engineering tactics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="h-6 w-6 text-teal-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Quarantine malicious attachments instantly</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold">Security Awareness Training</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Transform your workforce into your strongest defense. Crest delivers bite-sized, contextual training precisely when users need it most, based on their actual behavior.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Eye className="h-6 w-6 text-teal-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Real-world AI attack simulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-teal-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Automated compliance tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
