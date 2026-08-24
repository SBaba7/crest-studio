import { motion } from "framer-motion";

export function Stats() {
  const stats = [
    { id: 1, name: 'Faster detection than legacy tools', value: '47x' },
    { id: 2, name: 'AI-generated threats blocked', value: '99.8%' },
    { id: 3, name: 'Enterprise clients worldwide', value: '500+' },
  ]

  return (
    <section className="relative py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="mx-auto flex max-w-xs flex-col gap-y-6"
            >
              <dt className="text-base leading-7 text-muted-foreground font-light">{stat.name}</dt>
              <dd className="order-first text-6xl font-medium tracking-tight text-foreground sm:text-7xl font-display">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
