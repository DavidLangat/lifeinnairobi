'use client';

import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export interface BentoItem {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  price?: string | number;
}

interface BentoGridProps {
  items: BentoItem[];
}

export default function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
      {items.map((item, index) => {
        // Determine spanning based on index pattern
        // Pattern: Big Vertical (row-span-2), Small, Small, Wide (col-span-2)
        const patternIndex = index % 4;
        let spanClass = "";

        if (patternIndex === 0) {
          // Item 1: Tall Vertical
          spanClass = "md:row-span-2";
        } else if (patternIndex === 1 || patternIndex === 2) {
          // Item 2 & 3: Standard (1x1)
          spanClass = "";
        } else if (patternIndex === 3) {
          // Item 4: Wide
          spanClass = "md:col-span-2";
        }

        return (
          <div
            key={index}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer ${spanClass}`}
          >
            {/* Background Image */}
            <Image
              // 
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

            {/* Content Container */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">

              {/* Text Content */}
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-serif text-2xl mb-1 tracking-wide capitalize">{item.title}</h3>
                {/* <span className="text-white/70 text-sm font-medium">{item.subtitle}</span> */}
                {item.price && (
                  <div className="mt-2 text-white/90 text-sm font-semibold">
                    Starting from ${item.price}
                  </div>
                )}
              </div>

              {/* Icon Button */}
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>

            </div>

            {/* Link Wrapper */}
            <Link href={item.href} className="absolute inset-0 z-10">
              <span className="sr-only">View {item.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
