import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SlideData {
  title: string;
  category?: string;
  src: string;
  description?: string;
}

export interface CoverflowCarouselProps {
  slides: SlideData[];
  initialIndex?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  showCaption?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  aspectRatio?: "video" | "square" | "wide";
}

export function CoverflowCarousel({
  slides,
  initialIndex = 0,
  showPagination = true,
  showNavigation = true,
  showCaption = true,
  autoPlay = false,
  autoPlayInterval = 4000,
  className,
  aspectRatio = "video",
}: CoverflowCarouselProps) {
  const count = slides.length;
  const [selected, setSelected] = React.useState(
    Math.min(Math.max(initialIndex, 0), count - 1)
  );

  const prev = React.useCallback(
    () => setSelected((curr) => (curr - 1 + count) % count),
    [count]
  );
  const next = React.useCallback(
    () => setSelected((curr) => (curr + 1) % count),
    [count]
  );

  const [dragStart, setDragStart] = React.useState<number | null>(null);
  const [dragOffset, setDragOffset] = React.useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.touches[0].clientX - dragStart);
    }
  };
  const onTouchEnd = () => {
    if (dragOffset > 60) prev();
    else if (dragOffset < -60) next();
    setDragStart(null);
    setDragOffset(0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.clientX - dragStart);
    }
  };
  const onMouseUp = () => {
    if (dragOffset > 60) prev();
    else if (dragOffset < -60) next();
    setDragStart(null);
    setDragOffset(0);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  const pausedRef = React.useRef(false);

  React.useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, count, next]);

  const onPointerEnter = () => {
    pausedRef.current = true;
  };
  const onPointerLeaveFrame = () => {
    pausedRef.current = false;
  };

  const active = slides[selected];

  const aspectClass = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div
      className={cn("w-full max-w-6xl mx-auto px-4 select-none", className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeaveFrame}
    >
      <div
        className="relative h-[340px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-hidden [perspective:1200px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="relative w-full max-w-[560px] h-[300px] sm:h-[340px] md:h-[380px] flex items-center justify-center [transform-style:preserve-3d]">
          {slides.map((slide, i) => {
            let offset = i - selected;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const rotateY = offset * -32;
            const translateX = offset * 220;
            const translateZ = -Math.abs(offset) * 160;
            const scale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.3;
            const zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={slide.src + i}
                onClick={() => setSelected(i)}
                className={cn(
                  "absolute inset-0 cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/60 transition-colors",
                  isCenter ? "ring-2 ring-primary/40" : "hover:border-primary/40"
                )}
                style={{ zIndex }}
                animate={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity",
                    isCenter ? "opacity-90" : "opacity-60"
                  )}
                />
                <div className="absolute top-4 left-4">
                  {slide.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-black/50 text-white/90 backdrop-blur-md border border-white/10">
                      {slide.category}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg sm:text-xl font-display font-medium leading-tight">
                    {slide.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showNavigation && count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-4 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-lg hover:bg-background transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 sm:right-4 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-lg hover:bg-background transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && active && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-center max-w-xl mx-auto mt-4 px-4"
          >
            <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground">
              {active.title}
            </h3>
            {active.description && (
              <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {active.description}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {showPagination && count > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selected
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
