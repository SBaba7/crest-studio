import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Deepfake & Voice Clone Detection",
    description:
      "Real-time analysis of video calls, voicemails, and synthetic media. Crest flags impersonation attempts before credentials are shared.",
    icon: Shield,
    stat: "1,204 blocked last quarter",
  },
  {
    name: "Adaptive Zero-Trust Access",
    description:
      "Risk scores update per session based on device posture, geolocation, and behavioral anomalies — not static rule sets.",
    icon: Lock,
    stat: "Sub-200ms policy enforcement",
  },
  {
    name: "Unified Threat Visibility",
    description:
      "Email, endpoint, cloud, and identity signals in one timeline. Analysts see the full attack chain, not isolated alerts.",
    icon: Eye,
    stat: "47× faster triage vs. legacy SIEM",
  },
  {
    name: "Continuous Exposure Scanning",
    description:
      "Automated discovery of misconfigurations, exposed credentials, and shadow IT — prioritized by exploitability, not volume.",
    icon: AlertTriangle,
    stat: "Scans every 4 hours",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              The platform
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl font-display text-foreground leading-tight">
              Security that matches the speed of AI-generated attacks.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg leading-relaxed text-muted-foreground font-light"
          >
            Crest replaces fragmented point solutions with one behavioral detection
            layer — deployed in minutes, not quarters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-8 sm:p-10 hover:border-primary/30 transition-colors duration-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <span className="text-[11px] tracking-wide uppercase text-muted-foreground font-medium">
                  {feature.stat}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-display text-foreground mb-3">{feature.name}</h3>
                <p className="text-base leading-relaxed text-muted-foreground font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
