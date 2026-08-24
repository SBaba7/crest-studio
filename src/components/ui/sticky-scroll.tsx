'use client';

import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { forwardRef } from 'react';

const gallery = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop',
];

const Component = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <ReactLenis root>
      <div ref={ref} className="bg-[#0b0710] text-white">
        <section className="sticky top-0 grid min-h-[78vh] w-full place-content-center overflow-hidden bg-[#0f0a18]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(180,124,255,0.22),transparent_38%)]" />
          <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[#c79cff]">About Crest</p>
            <h1 className="font-display text-5xl font-semibold leading-[110%] tracking-tight sm:text-6xl lg:text-7xl">Security for a world that keeps becoming more synthetic.</h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">Crest was built around a simple idea: security should understand context, adapt to change, and stay out of the way of the people it protects.</p>
            <div className="mt-10 text-xs uppercase tracking-[0.24em] text-white/30">Scroll to explore</div>
          </div>
        </section>

        <section className="w-full bg-[#0b0710] px-2 py-2 sm:px-3">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
            <div className="grid gap-2 md:col-span-4">
              {gallery.slice(0, 4).map((src, index) => (
                <figure key={src} className="w-full overflow-hidden rounded-md">
                  <img src={src} alt={`Crest technology visual ${index + 1}`} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.02] sm:h-96" />
                </figure>
              ))}
            </div>

            <div className="sticky top-0 hidden h-screen w-full gap-2 md:col-span-4 md:grid md:grid-rows-3">
              {gallery.slice(4, 7).map((src, index) => (
                <figure key={src} className="h-full w-full overflow-hidden rounded-md">
                  <img src={src} alt={`Crest security visual ${index + 5}`} loading={index === 0 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                </figure>
              ))}
            </div>

            <div className="grid gap-2 md:col-span-4">
              {gallery.slice(7).map((src, index) => (
                <figure key={src} className="w-full overflow-hidden rounded-md">
                  <img src={src} alt={`Crest team visual ${index + 8}`} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.02] sm:h-96" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
});

Component.displayName = 'StickyScroll';

export default Component;
