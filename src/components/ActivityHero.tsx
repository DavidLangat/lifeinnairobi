'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface ActivityHeroProps {
  title: string;
  image: string;
  price: number;
  currency?: string;
  location: string;
  shortDescription?: string;
}

export default function ActivityHero({ title, image, price, currency = 'KES', location, shortDescription }: ActivityHeroProps) {
  const currencySymbol = currency === 'USD' ? '$' : 'KSh';
  return (
    <div className="relative w-full h-[60vh] min-h-[500px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 md:pb-24">
        <div className="max-w-4xl space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-sm font-medium border border-white/20">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
            {title}
          </h1>

          {shortDescription && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              {shortDescription}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center backdrop-blur-sm border border-brand-green/30">
                <DollarSign className="w-5 h-5 text-brand-green-light" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-widest">Starting From</p>
                <p className="text-xl font-bold">{currencySymbol} {price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
