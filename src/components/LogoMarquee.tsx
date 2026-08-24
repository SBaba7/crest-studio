export function LogoMarquee() {
  const logos = [
    "Cloudflare",
    "Datadog",
    "Stripe",
    "Snowflake",
    "Coinbase",
    "Figma",
    "Vercel",
    "Notion",
    "Linear",
    "Plaid",
  ];

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 border-b border-border/50">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <span className="text-2xl font-display font-medium text-foreground/20 whitespace-nowrap select-none transition-colors hover:text-foreground/40">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
