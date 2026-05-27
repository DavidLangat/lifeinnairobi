'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostHero from '@/components/BlogPostHero';
import ServiceCategories from '@/components/ServiceCategories';
import Link from 'next/link';
import { ArrowRight, Facebook, Twitter, Instagram, TriangleAlert, Clock, User } from 'lucide-react';

// Define types for the props
interface BlogPostClientPageProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    href: string;
    content?: any;
    author?: string;
    date?: string;
    category?: string;
    imageAlt?: string;
    imageAttribution?: string;
  };
  recentPosts: any[];
}

export default function BlogPostClientPage({ post, recentPosts }: BlogPostClientPageProps) {
  
  const content = post.content;
  const author = post.author;
  const date = post.date;
  const category = post.category;
  const imageAlt = post.imageAlt;
  const imageAttribution = post.imageAttribution;

  const Tiktok = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" {...props}><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" /></svg>
    );
  };

  const IconMap: { [key: string]: React.ElementType } = {
    clock: Clock,
    mountain: TriangleAlert,
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    tiktok: Tiktok,
  };

  return (
    <main className="bg-primary min-h-screen relative overflow-hidden">
      {/* Sticky Background Images with Parallax/Float Effect */}
    <div className="hidden md:block fixed  opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0  transform -translate-x-1/4 -translate-y-1/4">
        <Image
          
          src="https://ik.imagekit.io/lxn522qamc/tigonilife/v2/background/Artboard%20left.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>
      <div className="hidden md:block fixed  opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0  transform translate-x-1/4 translate-y-1/4">
        <Image
          
          src="https://ik.imagekit.io/lxn522qamc/tigonilife/v2/background/Artboard%20Right%20Bottom.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>


      <div className="relative z-10">
        <Navbar />

        <div>
            <BlogPostHero
            image={post.image}
            title={post.title}
            alt={imageAlt}
            attribution={imageAttribution}
            />
        </div>


        <article className="md:pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">

            {/* Header */}
            <header 
                className="mb-12 text-center lg:text-left"
            >
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background">
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium mt-6">
                {/* <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="uppercase tracking-wide text-xs font-bold text-background">{author}</span>
                </div> */}

                <div className="hidden sm:block w-px h-4 bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{date}</span>
                </div>

                <div className="hidden sm:block w-px h-4 bg-gray-300"></div>

                <div className="text-background font-bold uppercase tracking-wide text-xs">
                  in <span className="text-background">{category}</span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 mt-10"></div>
            </header>

            {/* Body Content */}
            <div 
                className="prose prose-lg max-w-none text-gray-600"
            >
              
              {Array.isArray(content.paragraphs) && (
                <div className="mb-8 space-y-4">
                  {content.paragraphs.map((paragraph: any, index: number) => (
                    <p
                      key={index}
                      className="leading-relaxed text-gray-700"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              )}


              {/* Gallery */}
              {content.gallery && content.gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 not-prose">
                  {content.gallery.map((img: any, idx: number) => (
                    <div key={idx} className="group relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                      <Image
                        
                        src={typeof img === 'string' ? img : img.src}
                        alt={typeof img === 'string' ? `Gallery image ${idx + 1}` : img.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* Closing is not empty */}
              {content.closing && content.closing.length && content.gallery.length > 0 && (
                  <div className="py-2 pt-8 flex flex-wrap gap-4 not-prose">
                <a
                  href={`https://wa.me/254740726783?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20${encodeURIComponent(post.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-opacity-90 transition-all font-sans uppercase tracking-wider text-sm"
                >
                  Book A Tour
                </a>
              </div>
              )}

       

              {Array.isArray(content.closing) && (
                <div className="mb-8 space-y-4 mt-8">
                  {content.closing.map((close: any, index: number) => (
                    <p
                      key={index}
                      className="leading-relaxed text-gray-700"
                      dangerouslySetInnerHTML={{ __html: close }}
                    />
                  ))}
                </div>
              )}

              {/* Action Buttons / CTA */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 not-prose">
                <a
                  href={`https://wa.me/254740726783?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20${encodeURIComponent(post.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-opacity-90 transition-all font-sans uppercase tracking-wider text-sm"
                >
                  Book A Tour
                </a>
                {/* View all activities */}
                <Link
                  href="/accommodation"
                  className="inline-flex items-center justify-center px-8 py-3 hover:bg-gray-100 text-background font-bold rounded-full bg-gray-200 transition-all font-sans uppercase tracking-wider text-sm"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Footer / Tags & Share */}
            <div 
                className="mt-16 pt-10 border-t border-gray-100"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                {/* Tags */}
                <div className="flex items-center gap-3">
                  <span className="font-serif text-gray-900 font-bold">Tags :</span>
                  <span className="px-3 py-1 bg-accent text-xs font-bold uppercase tracking-wider text-primary rounded">
                    {category}
                  </span>
                </div>

                {/* Share (Visual Only) */}
                <div className="flex items-center gap-4">
                  <span className="font-serif text-gray-900 font-bold">Share This Post :</span>
                  <div className="flex gap-2">
                    {['instagram', 'tiktok', 'Pinterest'].map((social) => {
                      const Icon = IconMap[social];
                      if (!Icon) return null;
                      return (
                        <button key={social} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary  hover:text-primary hover:bg-background transition-colors">
                          <Icon className="w-4 h-4" />
                          <span className="sr-only">Share on {social}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </article>
        
        <ServiceCategories
          title="Related Stories"
          items={recentPosts.map(post => ({
            title: post.title,
            image: post.image,
            href: post.href
          }))}
        />
        <Footer />
      </div>
    </main>
  );
}
