import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl rounded-[3rem] bg-gradient-to-br from-[#290e45] via-[#1d0833] to-[#130522] overflow-hidden relative border border-purple-500/20 shadow-xl"
      >
        <div className="px-6 py-20 sm:px-16 sm:py-24 relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-display leading-[1.1] text-white">
              Start blocking AI threats{" "}
              <span className="italic text-[#d8b4fe]">this week.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
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
              className="w-full sm:w-auto rounded-full bg-[#581c87] hover:bg-[#6b21a8] text-white border border-purple-300/30 px-8 py-4 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] text-center shadow-sm"
            >
              Book a demo
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 text-base font-medium transition-all text-center backdrop-blur-sm"
            >
              View pricing
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
