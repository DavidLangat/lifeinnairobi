'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Share2 } from 'lucide-react';
import aboutData from '@/data/about-data.json';
import ShareModal from './ShareModal';

const Tiktok = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" {...props}><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" /></svg>
  );
};

// Helper to render a single text block
const TextBlock = ({ data, id }: { data: { heading: string, text: string[], list?: string[], closingText?: string }, id?: string }) => (
  <div id={id} className="mb-12 scroll-mt-32">
    <h2 className="font-serif text-2xl md:text-3xl text-background mb-4">
      {data.heading}
    </h2>
    <div className="space-y-4 text-gray-600 leading-relaxed font-open-sans">
      {data.text.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
      {data.list && (
        <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-gray-400">
          {data.list.map((item, index) => (
            <li key={index} className="pl-2">{item}</li>
          ))}
        </ul>
      )}
      {data.closingText && (
        <p className="mt-4 italic text-accent border-l-4 border-background pl-4 py-1">
          {data.closingText}
        </p>
      )}
    </div>
  </div>
);

export default function AboutNairobiSection() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { section } = aboutData;
  const { images } = section;

  const sections = [
    { id: 'intro', data: section.introduction, label: 'About Nairobi' },
    { id: 'location', data: section.location, label: 'Location' },
    { id: 'origin', data: section.nameOrigin, label: 'Name Origin' },
    { id: 'history', data: section.history, label: 'History of Tea', image: images.image5 },
    { id: 'region', data: section.regionDefinition, label: 'The Region' },
    { id: 'climate', data: section.climate, label: 'Climate & Landscape' },
    { id: 'known-for', data: section.knownFor, label: 'What to Expect', image: images.image1 }, // Using image1 as a break
    { id: 'tourism', data: section.tourismEmergence, label: 'Tourism' },
    { id: 'our-role', data: section.ourRole, label: 'Our Role' },
  ];

  return (
    <section className="bg-primary py-16 md:py-24">
      
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Sidebar - Sticky */}
          <aside className="w-full lg:w-1/4 order-2 lg:order-1">
            <div className="sticky top-12 space-y-10 ">

              {/* Navigation / TOC */}
              <div className="hidden lg:block bg-background p-6 rounded-2xl" >
                <h3 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 border-b border-accent pb-2">
                  Contents
                </h3>
                <nav className="space-y-3">
                  {sections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-primary hover:text-secondary transition-colors duration-300 font-medium font-sans"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Box */}
              <div className="bg-accent p-6 rounded-2xl">
                <h4 className="font-serif text-primary mb-2">Did you know?</h4>
                <p className="text-sm text-primary mb-4 font-sans leading-relaxed">
                  Nairobi is often called the "richest village in Africa" due to its lush fertile land and heritage estates.
                </p>
                <div className="flex gap-4 pt-2">
                  {/* Social placeholders */}
                  <button
                    onClick={() => window.open('https://www.instagram.com/life_in_Nairobi', '_blank')}
                    className="text-primary hover:text-primary transition-colors hover:cursor-pointer"><Instagram size={18} /></button>
                  <button 
                  onClick={() => window.open('https://www.tiktok.com/@life_in_Nairobi', '_blank')}
                  className="text-primary hover:text-primary transition-colors hover:cursor-pointer"><Tiktok className="w-4 h-4 " /></button>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="text-primary hover:text-primary transition-colors hover:cursor-pointer"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Mobile TOC alternative could go here or be hidden */}
            </div>
          </aside>

          {/* Main Content Column */}
          <article className="w-full lg:w-3/4 order-1 lg:order-2">

            {/* Introduction Section (Rendered First) */}
            <TextBlock id="intro" data={section.introduction} />

            {/* Lead Image */}
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
              <Image
                
                src={images.image3} // Using a scenic landscape as the lead for this section
                alt="Nairobi Landscape"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <p className="text-sm font-medium uppercase tracking-wider opacity-90 mb-2">The Highlands</p>
                <h1 className="font-serif text-3xl md:text-4xl">Exploring Nairobi</h1>
              </div>
            </div>

            {/* Render Remaining Sections */}
            <div>
              {sections.filter(s => s.id !== 'intro').map((item, idx) => (
                <React.Fragment key={item.id}>
                  <TextBlock id={item.id} data={item.data} />

                  {/* Insert Image breaks */}
                  {item.image && (
                    <div className="my-12 relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
                      <Image
                        
                        src={item.image}
                        alt={item.data.heading}
                        fill
                        className="object-cover object-[50%_60%] hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                        {item.data.heading === "Nairobi and the History of Tea" ? <p className="text-white/90 text-sm font-sans">By bandabarn, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=35732143</p> : <p className="text-white/90 text-sm font-sans">{item.data.heading}</p>}
                      </div>
                    </div>
                  )}

                  {/* Horizontal Divider between some sections */}
                  {idx !== sections.length - 2 && !item.image && ( // Adjusted length check since we filtered one item
                    <hr className="border-gray-100 my-8 w-1/3" />
                  )}
                </React.Fragment>
              ))}
            </div>


          </article>

        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share this guide to Nairobi"
      />
    </section>
  );
}
