import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const companies = [
  { id: "crowdstrike", name: "CrowdStrike", icon: "crowdstrike" },
  { id: "cloudflare", name: "Cloudflare", icon: "cloudflare" },
  { id: "okta", name: "Okta", icon: "okta" },
  { id: "paloalto", name: "Palo Alto Networks", icon: "paloaltonetworks" },
  { id: "microsoft", name: "Microsoft", icon: "microsoft" },
  { id: "google", name: "Google Cloud", icon: "googlecloud" },
  { id: "aws", name: "AWS", icon: "amazonaws" },
  { id: "sentinelone", name: "SentinelOne", icon: "sentinelone" },
];

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background py-10 sm:py-12">
      <div className="relative mx-auto h-[88px] w-full max-w-[1600px]">
        <InfiniteSlider className="flex h-full w-full items-center" duration={34} gap={44}>
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex h-12 min-w-40 items-center justify-center gap-3 px-5 sm:min-w-44"
              title={company.name}
            >
              <img
                src={`https://cdn.simpleicons.org/${company.icon}`}
                alt={company.name}
                className="h-5 w-auto max-w-8 opacity-25 brightness-0 invert transition-opacity group-hover:opacity-45"
                loading="lazy"
              />
              <span className="whitespace-nowrap text-base font-display tracking-[-0.02em] text-foreground/25 transition-colors hover:text-foreground/45 sm:text-lg">
                {company.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>

        <ProgressiveBlur className="left-0" direction="left" blurIntensity={1} />
        <ProgressiveBlur className="right-0" direction="right" blurIntensity={1} />
      </div>
    </section>
  );
}
