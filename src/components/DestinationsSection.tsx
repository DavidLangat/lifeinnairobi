'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import destinationsData from '@/data/destinations-data.json';
import Link from 'next/link';

export default function DestinationsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Auto-scroll functionality for infinite loop
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollToNext = () => {
      if (!scrollContainer || isHoveredRef.current) return;

      const itemWidth = scrollContainer.children[0]?.clientWidth || scrollContainer.clientWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      const totalItems = destinationsData.items.length;

      // Calculate current item index
      let currentIndex = Math.round(scrollLeft / itemWidth);
      let nextIndex = currentIndex + 1;

      // If we are at the end of the FIRST set of items (which is totalItems)
      // We want to scroll to the first item of the SECOND set (which is at index totalItems)
      // Then silently snap back to 0
      if (nextIndex > totalItems) {
        scrollContainer.scrollTo({ left: 0, behavior: 'instant' });
        nextIndex = 1;
      }

      scrollContainer.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth'
      });

      // Special handling for the loop reset
      // We wait for the smooth scroll to finish (approx 600ms) then check if we are in the "duplicate" zone
      // If nextIndex equals totalItems, it means we are displaying the first item of the duplicate set.
      // We can then silently swap to index 0.
      if (nextIndex === totalItems) {
        setTimeout(() => {
          if (scrollContainer) {
            scrollContainer.scrollTo({ left: 0, behavior: 'instant' });
          }
        }, 600); // 600ms to allow smooth scroll to complete
      }
    };

    const scrollInterval = setInterval(scrollToNext, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-10 lg:py-12 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* Header - Left Aligned */}
        <div className="mb-6 space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background">
            {destinationsData.heading}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
            {destinationsData.description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative font-sans">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
          >
            {/* Render items twice for infinite loop effect */}
            {[...destinationsData.items, ...destinationsData.items].map((item, index) => {
              const slug = (item as any).slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
              return (
                <div
                  key={`${item.name}-${index}`}
                  className="relative shrink-0 w-full md:w-1/2 lg:w-1/4 snap-start px-4"
                >
                  <Link
                    href={`/local-things-to-do-in-nairobi/${slug}`}
                    className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer block"
                  >
                    {/* Background Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay - Stronger at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300" />

                    {/* Content Container */}
                    <h3 className="text-primary font-serif text-3xl mb-2 tracking-wide text-shadow-sm absolute bottom-18 left-8 right-8 line-clamp-2 capitalize">
                      {item.name}
                    </h3>
                    <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">

                      {/* Left: Title & Location */}
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pb-2">
                        <div className="flex items-center gap-2 text-primary/70 text-xs font-medium uppercase tracking-widest">
                          <MapPin className="w-3 h-3" />
                          <span>{(item as any).location}</span>
                        </div>
                      </div>

                      {/* Right: Price */}
                      <div className="text-right text-primary transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <span className="text-[10px] uppercase tracking-wider block opacity-70 mb-1">Start from</span>
                        <span className="font-serif text-3xl font-normal">Ksh.{(item as any).price}</span>
                      </div>

                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* View More Link */}
        {(destinationsData as any).viewMoreLink && (
          <div className="flex justify-start mt-0 pb-4">
            <Link
              href={(destinationsData as any).viewMoreLink}
              className="inline-flex items-center gap-2 border-b text-background border-background hover:border-accent hover:text-accent pb-1 text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              View More
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

