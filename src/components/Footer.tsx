'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import footerData from '@/data/footer-data.json';

export default function Footer() {
  const { logo, columns, newsletter, bottom } = footerData;
  const Tiktok = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" {...props}><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" /></svg>
    );
  };
  const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'tiktok': return <Tiktok className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <footer className="bg-background text-primary  pb-10">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-5 border-b border-primary/10 pb-10">

          {/* Column 1: Logo & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="block">
              {/* <h2 className="font-serif text-4xl mb-2">{logo.text}</h2> */}
              {/* Or use Image if present in JSON and generic logo text isn't enough */}
              <Image
                                src="/image/logo.png"

                alt="Nairobi Logo"
                width={260}
                height={60}
                className="w-auto h-12 md:h-14 lg:h-[60px] "
                priority
              />
            </Link>
            <div className="text-primary text-sm leading-relaxed max-w-xs">
              <p>{logo.address}</p>
              <a href={`tel:${logo.phone}`}>{logo.phone}</a><br />
              <a href={`mailto:${logo.email}`}>{logo.email}</a>
            </div>


            <div className="flex flex-wrap items-center gap-4">
              {logo.socials.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <SocialIcon platform={social.platform} />
                </Link>
              ))}


            </div>
          </div>

          {/* Column 2: Page Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl mb-6">{columns[0].title}</h3>
            <ul className="space-y-4">
              {columns[0].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-primary hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl mb-6">{columns[1].title}</h3>
            <ul className="space-y-4">
              {columns[1].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-primary hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (4 cols) */}
          <div className="lg:col-span-4 pl-0 lg:pl-8">
            <h3 className="font-serif text-xl mb-6">{newsletter.title}</h3>
            <p className="text-primary text-sm mb-6 leading-relaxed">
              {newsletter.description}
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={newsletter.placeholder}
                className="flex-1 bg-transparent border border-secondary/20 rounded-full px-6 py-3 text-base md:text-sm text-primary placeholder-secondary focus:outline-hidden focus:border-primary transition-colors" />
              <button type="submit" className="bg-primary text-background font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full hover:bg-secondary transition-colors">
                {newsletter.buttonText}
              </button>
            </form>

            {/* TripAdvisor Widget */}
            {/* <div className="mt-6 inline-block bg-secondary px-3 py-1.5 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors shadow-xs">
              <div id="TA_cdswritereviewnew126" className="TA_cdswritereviewnew">
                <ul id="UUwn2hA" className="TA_links hlJFXzLs5K">
                  <li id="p2zvPOI4" className="4wz9at5ZSK">
                    <a target="_blank" href="https://www.tripadvisor.com/Attraction_Review-g480204-d34100670-Reviews_Life_in_Nairobi-Limuru_Central_Province.html">
                      <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" className="h-6 w-auto" />
                    </a>
                  </li>
                </ul>
              </div>
              <Script
                src="https://www.jscache.com/wejs?wtype=cdswritereviewnew&uniq=126&locationId=34100670&lang=en_US&lang=en_US&display_version=2"
                async
                data-loadtrk
                onLoad={() => {
                  // @ts-ignore
                  if (typeof window !== 'undefined') window.loadtrk = true;
                }}
              />
            </div> */}
          </div>



        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-secondary gap-4">
          <p>{bottom.poweredBy}</p>
          <p>{bottom.copyright}</p>
        </div>

      </div>
    </footer>
  );
}
