'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import destinationsData from '@/data/bestthings-data.json';
import Link from 'next/link';

export default function DestinationsSection() {
  return (
    <section className="py-10 lg:py-12  text-gray-900 ">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl ">

        {/* Header - Left Aligned */}
        <div className="mb-6 space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background">
            {destinationsData.heading}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
            {destinationsData.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {destinationsData.items.map((item, index) => {
            const slug = (item as any).slug || item.name.toLowerCase().replace(/ /g, '-');
            return (
              <Link
                href={`/activities/${slug}`}
                key={index}
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
                <h3 className="text-primary font-serif text-3xl mb-2 tracking-wide text-shadow-sm absolute bottom-18 left-8">{item.name}</h3>
                <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">

                  {/* Left: Title & Location */}
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pb-2">
                    <div className="flex items-center gap-2 text-primary/70 text-xs font-medium uppercase tracking-widest">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div className="text-right text-primary transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <span className="text-[10px] uppercase tracking-wider block opacity-70 mb-1">Start from</span>
                    <span className="font-serif text-3xl font-normal">Ksh.{item.price}</span>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
