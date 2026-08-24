import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl rounded-[3rem] bg-[#1a0f2e] text-white overflow-hidden relative"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.5) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99,51,153,0.3) 0%, transparent 40%)",
          }}
        />

        <div className="px-6 py-20 sm:px-16 sm:py-24 relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-display leading-[1.1]">
              Start blocking AI threats{" "}
              <span className="italic text-[#c4a8f0]">this week.</span>
            </h2>
            <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
              14-day trial. Connect your email gateway in under 30 minutes.
              No credit card required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto rounded-full bg-white text-[#1a0f2e] px-8 py-4 text-base font-semibold hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Book a demo
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto rounded-full ring-1 ring-white/20 px-8 py-4 text-base font-medium text-white/80 hover:bg-white/10 transition-all text-center"
            >
              View pricing
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
