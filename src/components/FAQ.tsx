import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does deployment take?",
    a: "Most teams connect Crest to their email gateway and identity provider in under 30 minutes. Full endpoint and cloud coverage typically completes within a business day.",
  },
  {
    q: "What makes Crest different from legacy email security?",
    a: "Legacy tools rely on signature matching. Crest uses behavioral models trained on AI-generated content patterns — catching deepfakes, synthetic voice clones, and LLM-crafted phishing that bypass traditional filters.",
  },
  {
    q: "Do you support on-premise deployment?",
    a: "Yes. Enterprise plans include VPC deployment, air-gapped options, and dedicated infrastructure in your region. Contact sales for architecture review.",
  },
  {
    q: "What is your false positive rate?",
    a: "Across our customer base, Crest maintains a sub-0.02% false positive rate on legitimate business communication — verified through quarterly third-party audits.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-background border-t border-border">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">FAQ</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-display text-foreground">
            Common questions
          </h2>
        </motion.div>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left group"
                aria-expanded={open === i}
              >
                <span className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors pr-8">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
