'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Heart, Bookmark } from 'lucide-react';

interface DestinationItem {
  name: string;
  image: string;
  slug?: string;
  category?: string;
  isActive?: boolean;
}

interface FavoriteDestinationsData {
  heading: string;
  description: string;
  viewMoreLink: string;
  items: DestinationItem[];
}

interface FavoriteDestinationsSectionProps {
  data: FavoriteDestinationsData;
  page?: string;
}


export default function FavoriteDestinationsSection({ data, page }: FavoriteDestinationsSectionProps) {
  const items = data.items.slice(0, 20);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Optional: Auto-scroll functionality (can be removed if not needed)
  // Auto-scroll functionality
  // Auto-scroll functionality for infinite loop
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Reset scroll to 0 initially if needed (though browser might handle it)
    // scrollContainer.scrollLeft = 0;

    const scrollToNext = () => {
      if (!scrollContainer || isHoveredRef.current) return;

      const itemWidth = scrollContainer.children[0]?.clientWidth || scrollContainer.clientWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      const totalItems = items.length;

      // Calculate current item index
      let currentIndex = Math.round(scrollLeft / itemWidth);
      let nextIndex = currentIndex + 1;

      // If we are at the end of the FIRST set of items (which is totalItems)
      // We want to scroll to the first item of the SECOND set (which is at index totalItems)
      // Then silently snap back to 0

      if (nextIndex > totalItems) {
        // Should not happen often if reset is working, but just in case
        scrollContainer.scrollTo({ left: 0, behavior: 'instant' });
        nextIndex = 1;
      }

      scrollContainer.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth'
      });

      // Special handling for the loop reset
      // We wait for the smooth scroll to finish (approx 500ms) then check if we are in the "duplicate" zone
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
  }, [items]);

  return (
    <section className="pt-5  text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* Header - Left Aligned */}
        <div className="mb-6 space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background">
            {data.heading}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2l">
            {data.description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Negative margin to allow items to be flush bglut contain padding */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
          >
            {/* Render items twice for infinite loop effect */}
            {[...items, ...items].map((item, index) => {
              // Determine base path based on viewMoreLink or fallback
              const basePath = page ? (page.startsWith('/') ? page : `/${page}`) : '';
              const slug = item.slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
              const href = (item as any).externalLink || `${basePath}/${slug}`;
              const isExternal = !!(item as any).externalLink;

              return (
                <div
                  key={`${item.name}-${index}`}
                  className="relative shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start px-4"
                >
                  <div className="group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer">
                    {/* Background Image */}
                    <Image
                      
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`${item.name === "Tea Pod Nairobi" ? "object-cover object-bottom" : "object-cover"} transition-transform duration-700 group-hover:scale-110`}
                    />

                    {/* Overlay */}
                    <Link href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300" />

                    {/* Action Buttons (Only for active items) */}
                    <div className={`pt-4 px-4 right-4 flex flex-row w-full  z-20 ${item.isActive ? 'justify-between' : 'justify-end'}`}>
                      {item.isActive && (
                        <button className="bg-primary backdrop-blur-md p-2.5 rounded-full text-background hover:bg-white hover:text-red-500 transition-colors duration-300 group/btn">
                          <Heart className="w-5 h-5 fill-background group-hover/btn:fill-current" />
                        </button>
                      )}
                      <button className="bg-primary backdrop-blur-md p-2.5 rounded-full text-background hover:bg-white hover:text-blue-500 transition-colors duration-300 group/btn">
                        <Bookmark className="w-5 h-5 fill-background group-hover/btn:fill-current" />
                      </button>
                    </div>

                    {/* Content */}
                    <Link href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="absolute inset-0 p-6 flex flex-col items-start justify-end text-center z-10">
                      <h3 className="text-primary font-serif text-xl md:text-2xl font-medium tracking-wide mb-1 text-left">
                        {item.name}
                      </h3>
                      {item.category && (
                        <p className="text-primary/80 text-sm font-medium uppercase tracking-widest font-sans text-left">
                          {item.category}
                        </p>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View More Link */}
        <div className="flex justify-start mt-0 pb-4">
          <Link
            href={data.viewMoreLink} // Placeholder link
            className="inline-flex items-center gap-2 border-b text-background border-background hover:border-accent hover:text-accent pb-1 text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            View More
          </Link>
        </div>

      </div>
    </section>
  );
}
