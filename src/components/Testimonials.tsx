import { motion } from "framer-motion";

export function Testimonials() {
  const testimonials = [
    {
      body: "Crest caught a highly sophisticated AI voice-cloning attack targeting our finance team that slipped past our existing email gateway. It's now the foundation of our security posture.",
      author: {
        name: "Sarah Jenkins",
        handle: "CISO at TechFlow",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      body: "The visibility into our threat landscape is unparalleled. We deployed Crest in under 30 minutes, and the automated neutralization has saved our analysts hundreds of hours.",
      author: {
        name: "Marcus Chen",
        handle: "VP of Engineering at CloudScale",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      body: "We evaluated three other platforms before choosing Crest. The difference is in the false positive rate—Crest simply doesn't flag legitimate communication.",
      author: {
        name: "Elena Rodriguez",
        handle: "Director of IT at FinTrust",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-sm font-semibold tracking-widest text-primary uppercase"
          >
            Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 text-4xl sm:text-5xl font-display font-medium text-foreground"
          >
            Trusted by security leaders
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.author.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col"
              >
                <figure className="rounded-[2.5rem] bg-background p-10 shadow-sm ring-1 ring-border flex flex-col justify-between h-full transition-shadow hover:shadow-md">
                  <blockquote className="text-base leading-relaxed text-foreground font-light italic">
                    <p>{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-x-4">
                    <img className="h-12 w-12 rounded-full object-cover ring-1 ring-border" src={testimonial.author.imageUrl} alt="" />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{testimonial.author.name}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{testimonial.author.handle}</div>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
