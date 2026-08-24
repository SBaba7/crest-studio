import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "#contact",
    priceMonthly: "$99",
    description: "Essential security for small teams getting started.",
    features: [
      "Up to 50 users",
      "Basic email security",
      "Standard awareness training",
      "Community support",
      "7-day data retention",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#contact",
    priceMonthly: "$299",
    description: "Advanced protection for growing organizations.",
    features: [
      "Up to 250 users",
      "Advanced AI threat detection",
      "Custom phishing simulations",
      "Priority email & chat support",
      "30-day data retention",
      "API access",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#contact",
    priceMonthly: "Custom",
    description: "Dedicated security infrastructure for large-scale operations.",
    features: [
      "Unlimited users",
      "Zero Trust Architecture",
      "Automated incident response playbooks",
      "24/7 dedicated support team",
      "Unlimited data retention",
      "Custom integrations",
      "On-premise deployment option",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">Pricing</h2>
          <p className="mt-2 text-4xl font-display font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, transparent pricing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Choose the plan that fits your organization's security needs. All plans include a 14-day free trial.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 flex flex-col justify-between transition-all ${
                tier.featured
                  ? "bg-[#2b1444] text-white border border-purple-400/30 sm:-translate-y-2"
                  : "bg-card/50 text-foreground border border-border/70"
              }`}
            >
              <div>
                <h3
                  id={tier.id}
                  className={`text-lg font-bold leading-8 ${
                    tier.featured ? "text-white" : "text-foreground"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-4 text-sm leading-6 ${
                    tier.featured ? "text-purple-200" : "text-muted-foreground"
                  }`}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      tier.featured ? "text-white" : "text-foreground"
                    }`}
                  >
                    {tier.priceMonthly}
                  </span>
                  {tier.priceMonthly !== "Custom" && (
                    <span
                      className={`text-sm font-semibold leading-6 ${
                        tier.featured ? "text-purple-300" : "text-muted-foreground"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </p>

                <a
                  href={tier.href}
                  onClick={(e) => {
                    if (tier.href.startsWith("#")) {
                      e.preventDefault();
                      document.getElementById(tier.href.substring(1))?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  aria-describedby={tier.id}
                  className={`mt-6 block rounded-xl py-2.5 px-3 text-center text-sm font-semibold leading-6 cursor-pointer transition-all ${
                    tier.featured
                      ? "bg-[#581c87] hover:bg-[#6b21a8] text-white border border-purple-300/30 shadow-sm font-semibold"
                      : "bg-[#3c1466] hover:bg-[#4d1a80] text-white border border-purple-400/20 shadow-sm"
                  }`}
                >
                  {tier.priceMonthly === "Custom" ? "Contact sales" : "Start free trial"}
                </a>

                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    tier.featured ? "text-purple-100" : "text-muted-foreground"
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-center">
                      <Check
                        className={`h-5 w-5 flex-none ${
                          tier.featured ? "text-purple-300" : "text-purple-600"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
