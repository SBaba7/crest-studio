import { Shield, ArrowRight, Eye, Zap, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import StickyScroll from "@/components/ui/sticky-scroll";

const values = [
  {
    icon: Shield,
    title: "Zero Trust, Human First",
    body: "We design security systems that distrust the threat without making people fight the product every day.",
  },
  {
    icon: Zap,
    title: "Move at the Speed of the Threat",
    body: "Attackers iterate constantly. Crest is built to adapt quickly, ship useful defenses, and improve from every signal.",
  },
  {
    icon: Eye,
    title: "Clarity Over Complexity",
    body: "Security teams need signal, not another wall of alerts. We turn fragmented evidence into decisions people can act on.",
  },
  {
    icon: HeartHandshake,
    title: "Trust Is the Product",
    body: "Privacy, transparency, and responsible security engineering are part of what we build—not a layer added afterward.",
  },
];

export function About() {
  return (
    <div className="min-h-screen bg-[#0b0710] text-white">
      <StickyScroll />

      <section className="bg-background px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Why Crest exists</p>
              <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                The threat changed. Security had to change with it.
              </h2>
            </div>
            <div className="max-w-3xl space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                AI lowered the cost of creating convincing attacks. Voice clones, synthetic identities, personalized phishing, and novel payloads can now be produced at a scale traditional defenses were never designed to handle.
              </p>
              <p>
                Crest exists to close that gap with adaptive detection, contextual risk, and automated response—so security teams can spend less time chasing noise and more time protecting what matters.
              </p>
              <Link to="/book-demo" className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                See Crest in action
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/20 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Our operating principles</p>
            <h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">A security company should make security feel simpler.</h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="rounded-3xl border border-border bg-background/60 p-7 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{value.title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-muted-foreground">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Built for what comes next</p>
          <h2 className="mt-5 font-display text-4xl tracking-tight sm:text-6xl">Defend the real world behind the screen.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Crest is being built for teams that cannot afford to treat AI-native threats as tomorrow&apos;s problem.
          </p>
          <Link to="/book-demo" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
