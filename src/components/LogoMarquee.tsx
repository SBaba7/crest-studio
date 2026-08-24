import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const companies = [
  { id: "crowdstrike", name: "CrowdStrike" },
  { id: "cloudflare", name: "Cloudflare" },
  { id: "okta", name: "Okta" },
  { id: "paloalto", name: "Palo Alto Networks" },
  { id: "microsoft", name: "Microsoft" },
  { id: "google", name: "Google Cloud" },
  { id: "aws", name: "AWS" },
  { id: "sentinelone", name: "SentinelOne" },
];

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background py-10 sm:py-12">
      <div className="relative mx-auto h-[88px] w-full max-w-[1600px]">
        <InfiniteSlider className="flex h-full w-full items-center" duration={34} gap={44}>
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex h-12 min-w-40 items-center justify-center rounded-xl px-5 sm:min-w-44"
            >
              <span className="whitespace-nowrap text-base font-display font-medium tracking-[-0.02em] text-foreground/25 transition-colors hover:text-foreground/45 sm:text-lg">
                {company.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="left-0"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="right-0"
          direction="right"
          blurIntensity={1}
        />
      </div>
    </section>
  );
}
