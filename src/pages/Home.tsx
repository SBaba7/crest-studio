import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { PlatformSection } from "@/components/PlatformSection";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { Check, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function Home() {
  const SLIDES = [
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      alt: "Crest threat command center dashboard",
      title: "Command Center",
      subtitle: "Real-time threat map",
    },
    {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
      alt: "AI threat analysis interface",
      title: "Threat Analysis",
      subtitle: "Behavioral inspection",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      alt: "Automated incident response playbooks",
      title: "Response Playbooks",
      subtitle: "Sub-second neutralization",
    },
  ];

  const tiers = [
    {
      name: "Starter",
      id: "tier-starter",
      priceMonthly: "$99",
      description: "Email and identity protection for teams up to 50 users.",
      features: ["Up to 50 users", "AI phishing detection", "Basic deepfake alerts", "Community support"],
      featured: false,
    },
    {
      name: "Pro",
      id: "tier-pro",
      priceMonthly: "$299",
      description: "Full-stack coverage for growing security operations.",
      features: [
        "Up to 250 users",
        "Endpoint + cloud scanning",
        "Custom simulation campaigns",
        "Priority support",
        "API access",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      priceMonthly: "Custom",
      description: "Dedicated infrastructure, VPC deployment, and 24/7 SOC integration.",
      features: [
        "Unlimited users",
        "On-premise / air-gapped",
        "Automated incident playbooks",
        "Dedicated CSM",
        "SLA-backed uptime",
      ],
      featured: false,
    },
  ];

  return (
    <div className="flex flex-col">
      <Hero />

      <PlatformSection />

      <div className="relative z-10 bg-background">
        <LogoMarquee />

        <Stats />

        <section id="product" className="py-24 sm:py-32 bg-secondary/20 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                  01 / Platform
                </p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-display text-foreground leading-tight">
                  One console for every surface attackers target.
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg text-muted-foreground font-light leading-relaxed"
              >
                Email gateways miss what looks legitimate. Crest inspects content
                behavior — not just headers — and gives your analysts a single
                pane for triage, remediation, and audit.
              </motion.p>
            </div>
          </div>
          <CoverflowCarousel slides={SLIDES} showCaption showNavigation showPagination autoPlay autoPlayInterval={4500} />
        </section>

        <Testimonials />

        <section id="pricing" className="py-24 sm:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
              <div>
                <p className="text-sm font-semibold tracking-widest text-primary uppercase">02 / Pricing</p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-display text-foreground">
                  Plans that scale with your threat surface
                </h2>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed lg:text-right">
                All plans include a 14-day trial. No credit card required.
              </p>
            </div>

            <div className="grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-6">
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`rounded-[2rem] p-8 xl:p-10 transition-all ${
                    tier.featured
                      ? "bg-[#1a0f2e] text-white ring-1 ring-[#1a0f2e]"
                      : "bg-card ring-1 ring-border hover:shadow-md"
                  }`}
                >
                  <h3
                    className={`text-xl font-display ${
                      tier.featured ? "text-[#c4a8f0]" : "text-foreground"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-6 ${
                      tier.featured ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-display">{tier.priceMonthly}</span>
                    {tier.priceMonthly !== "Custom" && (
                      <span
                        className={`text-sm font-medium ${
                          tier.featured ? "text-white/50" : "text-muted-foreground"
                        }`}
                      >
                        /month
                      </span>
                    )}
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`mt-6 block w-full rounded-full py-3 px-3 text-center text-sm font-semibold transition-colors ${
                      tier.featured
                        ? "bg-white text-[#1a0f2e] hover:bg-white/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {tier.priceMonthly === "Custom" ? "Contact sales" : "Start free trial"}
                  </a>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check
                          className={`h-5 w-5 flex-none ${
                            tier.featured ? "text-[#c4a8f0]" : "text-primary"
                          }`}
                          aria-hidden="true"
                        />
                        <span className={tier.featured ? "text-white/70" : "text-muted-foreground"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 sm:py-32 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-sm font-semibold tracking-widest text-primary uppercase">03 / About</p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-display text-foreground leading-tight">
                  Built for the moment security changed.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground font-light">
                  Crest was founded when our team watched a finance director approve a
                  wire transfer to a voice-cloned CFO — on a call that sounded
                  identical to the real person. Legacy tools flagged nothing.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground font-light">
                  We built the platform we wished existed: behavioral detection
                  that keeps pace with generative AI, deployed without a six-month
                  integration project.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#1a0f2e]"
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 40%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(99,51,153,0.3) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-2">Founded</p>
                  <p className="text-3xl font-display text-white">2023 · San Francisco</p>
                  <p className="mt-4 text-sm text-white/50 font-light max-w-xs">
                    SOC 2 Type II · ISO 27001 · FedRAMP in progress
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FAQ />

        <section id="contact" className="py-24 sm:py-32 bg-background border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">Contact</p>
              <h2 className="mt-4 text-3xl font-display sm:text-4xl text-foreground">
                Talk to our security team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-light">
                We respond to demo requests within 2 business hours.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="flex gap-x-6 bg-secondary/30 p-8 rounded-[2rem] border border-border">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm">
                    <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display text-foreground">Sales</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                      Custom demos, architecture reviews, and enterprise pricing.
                    </p>
                    <a
                      href="mailto:sales@crestsecurity.io"
                      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      sales@crestsecurity.io
                    </a>
                  </div>
                </div>
                <div className="flex gap-x-6 bg-secondary/30 p-8 rounded-[2rem] border border-border">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display text-foreground">Headquarters</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                      100 Security Plaza, Suite 400<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
              <form action="#" method="POST" className="bg-secondary/30 p-8 sm:p-10 rounded-[2.5rem] border border-border flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-foreground">
                      First name
                    </label>
                    <div className="mt-2">
                      <Input type="text" name="first-name" id="first-name" className="rounded-xl border-border bg-background" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-foreground">
                      Last name
                    </label>
                    <div className="mt-2">
                      <Input type="text" name="last-name" id="last-name" className="rounded-xl border-border bg-background" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Work email
                  </label>
                  <div className="mt-2">
                    <Input type="email" name="email" id="email" className="rounded-xl border-border bg-background" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    How can we help?
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="flex w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[2px] resize-none"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground rounded-full hover:bg-primary/90 font-semibold h-12 mt-2"
                >
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </section>

        <CTA />
      </div>
    </div>
  );
}
