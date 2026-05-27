'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
  description?: string;
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  breadcrumb,
  description,
  backgroundImage = 'v2/images/background.jpeg'
}: PageHeaderProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center bg-gray-900 text-primary overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/image/bg2.jpg")`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl pt-20">
        <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/80">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{breadcrumb}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight ">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-primary text-base md:text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
