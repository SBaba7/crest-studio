import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { CrestChromaWaves } from "./CrestChromaWaves";

const galleryColumns = {
  left: [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=82",
  ],
  center: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85",
  right: [
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=82",
  ],
};

const principles = [
  {
    number: "01",
    title: "Zero Trust, Infinite Empathy",
    description: "We believe systems should trust nothing, but security tools must remain empathetic to the humans using them. Good security should not create friction.",
  },
  {
    number: "02",
    title: "Pace over Perfection",
    description: "When threats evolve daily, deploying a strong countermeasure today is better than waiting for a perfect one next month.",
  },
  {
    number: "03",
    title: "Clarity is Security",
    description: "Complexity is the enemy of security. We build for radical simplicity in interfaces, alerts, and remediation workflows.",
  },
];

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        initial={{ y: reduceMotion ? 0 : "108%", opacity: reduceMotion ? 1 : 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative isolate overflow-clip bg-[#08050e] py-24 text-white sm:py-32 lg:py-40">
      <CrestChromaWaves className="pointer-events-none absolute inset-0 opacity-75 [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_86%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(8,5,14,0.22)_45%,rgba(8,5,14,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#cab1ff]" />
              02 / About Crest
            </div>
          </motion.div>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2 className="font-display text-[clamp(3.15rem,7.3vw,7.2rem)] leading-[0.9] tracking-[-0.045em] text-white">
              <RevealLine>Security for the</RevealLine>
              <RevealLine delay={0.08}>
                <span className="italic text-white/65">AI era.</span>
              </RevealLine>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-8 lg:mt-24 lg:grid-cols-12 lg:gap-10 lg:pt-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-base leading-relaxed text-white/60 sm:text-lg lg:col-span-4"
          >
            We founded Crest because the rules of cybersecurity changed overnight. Legacy tools were built for predictable threats, but AI has democratized sophisticated attacks. We are building the unified platform to restore the balance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-4 lg:col-span-5 lg:col-start-8"
          >
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#cab1ff]" strokeWidth={1.6} />
            <p className="font-display text-2xl leading-[1.08] tracking-tight text-white/90 sm:text-3xl">
              Adaptive intelligence that anticipates threats before they materialize.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid items-start gap-4 md:grid-cols-[1fr_1.1fr_1fr] lg:mt-32">
          <div className="hidden gap-4 md:grid md:content-start">
            {galleryColumns.left.map((src, index) => (
              <GalleryImage key={src} src={src} alt={`Crest intelligence interface ${index + 1}`} priority={index === 0} />
            ))}
          </div>

          <div className="lg:sticky lg:top-6 lg:h-[calc(100dvh-3rem)] lg:self-start">
            <div className="group relative h-[62vh] min-h-[32rem] overflow-hidden rounded-[2rem] border border-white/15 bg-[#110a1d] lg:h-full">
              <img
                src={galleryColumns.center}
                alt="Abstract security data visualisation"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(8,5,14,0.7)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">Our mission</p>
                <p className="mt-3 max-w-sm font-display text-2xl leading-[1.05] text-white sm:text-3xl">
                  Protect the integrity of human communication in an increasingly synthetic world.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden gap-4 md:grid md:content-start">
            {galleryColumns.right.map((src, index) => (
              <GalleryImage key={src} src={src} alt={`Crest security environment ${index + 1}`} priority={index === 0} />
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3 lg:mt-24">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.65, delay: reduceMotion ? 0 : index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group min-h-64 bg-[#0d0915] p-7 transition-colors duration-500 hover:bg-[#120d1d] sm:p-8"
            >
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                <span>{principle.number}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <h3 className="mt-14 max-w-xs font-display text-2xl leading-[1.02] text-white sm:text-[1.8rem]">{principle.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{principle.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryImage({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  return (
    <div className="group relative min-h-[18rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#110a1d] first:mt-10 last:mb-12 md:min-h-[28rem]">
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
      />
    </div>
  );
}
