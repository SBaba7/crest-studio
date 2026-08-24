import { NotFound, Illustration } from "@/components/ui/not-found";

export function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full justify-center min-h-full bg-background p-6 md:p-10 pt-24">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] text-teal-400" />
        <NotFound
          title="Page not found"
          description="Lost, this page is. In another system, it may be."
        />
      </div>
    </div>
  );
}
