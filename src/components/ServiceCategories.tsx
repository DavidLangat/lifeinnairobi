'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import guideData from '@/data/travel-guide-data.json';

// Define interface for the data items
interface ServiceItem {
  title: string;
  image: string;
  href: string;
}

export default function ServiceCategories({ items, title }: { items?: ServiceItem[], title?: string }) {
  // Use passed items or fallback to default services from JSON
  const displayItems = items || guideData.services;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Function to scroll to next item
    const scrollToNext = () => {
      if (!scrollContainer) return;

      const itemWidth = scrollContainer.children[0]?.clientWidth || scrollContainer.clientWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      // const scrollWidth = scrollContainer.scrollWidth; // Unused
      // const clientWidth = scrollContainer.clientWidth; // Unused
      const totalItems = displayItems.length;

      // Calculate current item index based on scroll position
      let currentIndex = Math.round(scrollLeft / itemWidth);

      // Determine next index
      let nextIndex = currentIndex + 1;

      // Loop back to start if we reached the end
      if (nextIndex >= totalItems) {
        nextIndex = 0;
      }

      // Scroll to the specific position of the next item
      scrollContainer.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth'
      });
    };

    const scrollInterval = setInterval(scrollToNext, 3000); // Scroll every 3 seconds

    // Optional: Pause on hover could be implemented by clearing/setting interval on mouse events
    // For now, simple interval as requested.

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="pt-20 pb-10 bg-background">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {title && (
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-12 text-center">
            {title}
          </h2>
        )}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayItems.map((service, index) => (
              <div
                key={index}
                className="relative shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start px-4"
              >
                <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                  <Link href={service.href} className="block h-full w-full">
                    {/* Background Image */}
                    <Image
                      
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 text-center">
                      <h3 className="text-primary font-serif text-2xl font-medium tracking-wide">
                        {service.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
