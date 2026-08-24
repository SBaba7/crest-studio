import { Shield } from "lucide-react";
import { CTA } from "@/components/CTA";

export function About() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500 shadow-[0_0_40px_rgba(0,212,170,0.4)]">
              <Shield className="h-8 w-8 text-gray-950" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-6xl">
            Security for the <span className="text-teal-400">AI era</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We founded Crest because the rules of cybersecurity changed overnight. 
            Legacy tools were built for predictable threats, but AI has democratized 
            sophisticated attacks. We're building the unified platform to restore the balance.
          </p>
        </div>
        
        <div className="mt-20 mx-auto max-w-3xl">
          <h2 className="text-2xl font-display font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            To empower organizations with adaptive, intelligent security that anticipates threats 
            before they materialize, protecting the integrity of human communication in an increasingly synthetic digital world.
          </p>

          <h2 className="text-2xl font-display font-bold mb-6">Our Values</h2>
          <ul className="space-y-6">
            <li className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Zero Trust, Infinite Empathy</h3>
              <p className="text-muted-foreground">We believe systems should trust nothing, but security tools must be empathetic to the humans using them. Good security shouldn't create friction.</p>
            </li>
            <li className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Pace over Perfection</h3>
              <p className="text-muted-foreground">In a world where threats evolve daily, deploying a 90% effective countermeasure today is better than a 100% effective one next month.</p>
            </li>
            <li className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Clarity is Security</h3>
              <p className="text-muted-foreground">Complexity is the enemy of security. We strive for radical simplicity in our interfaces, alerts, and remediation workflows.</p>
            </li>
          </ul>
        </div>
      </div>
      <CTA />
    </div>
  );
}
