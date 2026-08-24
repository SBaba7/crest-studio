import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollFloat } from "./ScrollFloat";
import { ScrollReveal } from "./ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Crest detect AI-powered threats and synthetic attacks?",
    answer:
      "Crest analyzes behavioral heuristics, communication graph context, and multi-modal signals rather than relying solely on static IOCs or legacy signatures. This allows the engine to recognize zero-day prompt injection, AI-generated phishing patterns, and novel attack payloads in real time.",
  },
  {
    question: "How does deepfake video and synthetic voice detection work?",
    answer:
      "Crest inspects live audio and video streams for micro-temporal incoherence, synthetic acoustic artifacts, and biometric anomalies. Impersonation attempts during executive calls, voicemails, or video conferences are flagged before sensitive actions can occur.",
  },
  {
    question: "Does Crest integrate with our existing SIEM and security tools?",
    answer:
      "Yes. Crest provides native bi-directional connectors for major SIEM, SOAR, and EDR platforms including Splunk, Microsoft Sentinel, CrowdStrike, Datadog, and Okta, with automated webhook support for custom workflows.",
  },
  {
    question: "What is the typical deployment timeline?",
    answer:
      "Cloud SaaS deployments typically take under 15 minutes via API-based integrations. For hybrid or private cloud configurations, our Helm charts and containerized agents can be deployed and validated within one to two business days.",
  },
  {
    question: "Does Crest introduce latency to email and network traffic?",
    answer:
      "No. Crest leverages asynchronous inspection and distributed edge infrastructure. Inline checks operate in sub-5ms latency, ensuring seamless performance without disrupting day-to-day employee operations.",
  },
  {
    question: "Do you offer on-premise or air-gapped deployment options?",
    answer:
      "Yes. Crest Enterprise supports dedicated VPC instances, sovereign government cloud regions, and fully isolated on-premise environments with localized model weights.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-background border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-3">
            Questions & Answers
          </p>
          <ScrollFloat
            containerClassName="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            animationDuration={0.85}
            ease="back.inOut(2)"
            scrollStart="top bottom-=12%"
            scrollEnd="bottom center+=8%"
            stagger={0.022}
          >
            Frequently Asked Questions
          </ScrollFloat>
          <ScrollReveal
            containerClassName="mx-auto mt-4 max-w-2xl"
            textClassName="text-base font-light text-muted-foreground sm:text-lg"
            baseOpacity={0.12}
            baseRotation={2}
            blurStrength={6}
            rotationEnd="bottom center+=8%"
            wordAnimationEnd="bottom center+=8%"
          >
            Clear answers regarding Crest&apos;s threat detection technology, integrations, and deployment options.
          </ScrollReveal>
        </div>

        <div className="divide-y divide-border/60 border-y border-border/60">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors pr-6">
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-base text-muted-foreground leading-relaxed font-light pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
