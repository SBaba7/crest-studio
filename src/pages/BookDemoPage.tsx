import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SimplexNoise } from "@paper-design/shaders-react";
import { BookDemo } from "./BookDemo";

export function BookDemoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#100b18] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <SimplexNoise
          colors={["#0B1020", "#2A1458", "#6D28D9", "#C084FC", "#F5F3FF"]}
          stepsPerColor={2}
          softness={0.08}
          speed={0.34}
          scale={0.72}
          fit="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(17,10,31,0.12),rgba(10,7,16,0.76)_52%,rgba(8,6,12,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,15,0.72),rgba(16,11,24,0.9))]" />

      <div className="absolute left-4 top-8 z-30 sm:left-6 sm:top-10 lg:left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/70 shadow-sm backdrop-blur-xl transition-colors hover:bg-white/[0.1] hover:text-white"
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
