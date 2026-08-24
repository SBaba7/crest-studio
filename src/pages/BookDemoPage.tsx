import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BookDemo } from "./BookDemo";
import { SimplexNoiseWebGL } from "@/components/SimplexNoiseWebGL";

export function BookDemoPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#12091f] text-foreground">
      <SimplexNoiseWebGL className="z-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_20%,rgba(88,28,135,0.18),rgba(18,9,31,0.48)_52%,rgba(8,4,14,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(18,9,31,0.16),rgba(18,9,31,0.58))]" />

      <div className="absolute left-4 top-8 z-30 sm:left-6 sm:top-10 lg:left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#160d25]/70 px-4 py-2.5 text-sm font-medium text-white/70 shadow-sm backdrop-blur-xl transition-colors hover:border-white/25 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Crest
        </Link>
      </div>

      <div className="relative z-10">
        <BookDemo />
      </div>
    </div>
  );
}
