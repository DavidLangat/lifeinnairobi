'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Facebook, Twitter, Instagram, Clock, TriangleAlert, ArrowDown } from 'lucide-react';
import heroData from '@/data/hero-data.json';

// tiktok compont <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"/></svg>

const Tiktok = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" {...props}><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" /></svg>
  );
};

interface Feature {
  icon: string;
  description: string;
}

interface SocialLink {
  platform: string;
  href: string;
}

interface HeroData {
  subtitle?: string;
  title?: string;
  paragraph?: string;
  button?: {
    text?: string | null;
    href?: string | null;
  };
  socialLinks?: SocialLink[];
  features?: Feature[];
}

const data = heroData as HeroData;

const IconMap: { [key: string]: React.ElementType } = {
  clock: Clock,
  mountain: TriangleAlert,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  tiktok: Tiktok,
};

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen min-h-[600px] lg:h-[90vh] overflow-hidden bg-gray-900 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-105"
        style={{
          backgroundImage: 'url("/image/bg2.jpg")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />
      </div>

      <div className="container mx-auto px-6 lg:px-6 h-full relative z-10 flex flex-col justify-end pb-26 lg:pb-20 max-w-7xl">

        {/* Main Content - Bottom Left */}
        <div className="max-w-3xl space-y-2 animate-in fade-in slide-in-from-left-8 duration-1000">

          {/* Badge */}
          {/* {data.subtitle && (
            <div className="inline-block">
              <span className="px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs tracking-wider uppercase font-medium">
                {data.subtitle}
              </span>
            </div>
          )} */}

          {/* Title */}
          {data.title && (
            <h1 className=" font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.1] md:leading-[1.1] text-primary">
              {data.title}
            </h1>
          )}
          {data.paragraph && (
            <p className="text-primary text-base leading-relaxed font-open-sans">
              {data.paragraph}
            </p>
          )}

          {/* Button */}
          {data.button && data.button.text && data.button.href && (
            <div className="pt-2">
              <Link
                href={data.button.href}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full text-xs font-bold tracking-widest hover:bg-gray-200 transition-colors uppercase group"
              >
                <span>{data.button.text}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Right Side Socials */}
        {data.socialLinks && data.socialLinks.length > 0 && (
          <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {data.socialLinks.map((social, index) => {
              const Icon = IconMap[social.platform];
              if (!Icon) return null;
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/30 bg-accent hover:bg-background text-primary hover:border-background transition-all duration-300"
                  aria-label={social.platform}
                >
                  <Icon className="w-4 h-4 " />
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom Features - Shifted Right */}
        {data.features && data.features.length > 0 && (
          <div className="hidden lg:flex absolute bottom-12 right-24 flex-row gap-12">
            {data.features.map((feature, index) => {
              const Icon = IconMap[feature.icon] || IconMap.mountain;
              return (
                <div key={index} className="flex items-start gap-4 max-w-xs bg-primary/20 backdrop-blur-md p-4 rounded-xl border border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    {Icon ? <Icon className="w-4 h-4" /> : null}
                  </div>
                  <p className="text-gray-200 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-6 lg:right-12 hidden md:flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-linear-to-b from-transparent to-primary/50" />
          <ArrowDown className="w-5 h-5 text-primary/70 animate-bounce" />
        </div>

      </div>
    </div>
  );
}
