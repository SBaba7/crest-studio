import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "/contact",
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
    href: "/contact",
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
    href: "/contact",
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Pricing() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-400">Pricing</h2>
          <p className="mt-2 text-4xl font-display font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, transparent pricing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Choose the plan that fits your organization's security needs. All plans include a 14-day free trial.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? "bg-white/[0.05] ring-2 ring-teal-500" : "ring-1 ring-white/[0.1]",
                "rounded-3xl p-8 xl:p-10 transition-all hover:bg-white/[0.03]"
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? "text-teal-400" : "text-foreground",
                  "text-lg font-semibold leading-8"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">{tier.priceMonthly}</span>
                {tier.priceMonthly !== "Custom" && <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>}
              </p>
              <Link
                to={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-teal-500 text-gray-950 hover:bg-teal-400"
                    : "bg-white/10 text-white hover:bg-white/20",
                  "mt-6 block rounded-xl py-2.5 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
                )}
              >
                {tier.priceMonthly === "Custom" ? "Contact sales" : "Start free trial"}
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-teal-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
