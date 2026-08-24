import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BookDemo } from "./BookDemo";

export function BookDemoPage() {
  return (
    <div className="relative">
      <div className="absolute left-4 sm:left-6 lg:left-8 top-24 sm:top-28 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-xl transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Crest
        </Link>
      </div>
      <BookDemo />
    </div>
  );
}
