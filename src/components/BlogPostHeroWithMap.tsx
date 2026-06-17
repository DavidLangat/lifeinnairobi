"use client";

import React from "react";
import Image from "next/image";

interface BlogPostHeroProps {
  image: string;
  title: string;
  alt?: string;
  attribution?: string;
}

export default function BlogPostHeroWithMap({
  image,
  title,
  alt,
  attribution,
}: BlogPostHeroProps) {
  return (
    <div className="relative w-full mb-32 lg:mb-48">
      {/* Layer 1: Background Pattern (Decor) */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[550px]  overflow-hidden">
        <Image
          src={"https://nairobi.life/image/bg2.jpg"}
          alt="Tropical Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Layer 2: Foreground Featured Image */}
      <div className="absolute left-1/2 top-[55%] md:top-[40%] -translate-x-1/2 w-[90%] md:w-[65%] lg:w-[55%] h-[250px] md:h-[400px] lg:h-[600px] rounded-3xl overflow-hidden group">
        <div className="relative w-full h-full">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=Nairobi,Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full object-cover"
            title="Map of Nairobi"
          />
          {/* {attribution && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs font-serif">{attribution}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
