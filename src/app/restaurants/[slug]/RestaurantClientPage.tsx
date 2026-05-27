'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCategories from '@/components/ServiceCategories';
import Link from 'next/link';
import BlogPostHero from '@/components/BlogPostHero';
import Image from 'next/image';


interface RestaurantClientPageProps {
  item: {
    name: string;
    slug: string;
    image: string;
    category: string;
    isActive: boolean;
    contentHtml: string;
  };
  relatedRestaurants: any[];
}

export default function RestaurantClientPage({ item, relatedRestaurants }: RestaurantClientPageProps) {
  return (
    <main className="min-h-screen bg-primary relative overflow-hidden">
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
                    image={item.image}
                    title={item.name}
                    alt={item.name}
                />
            </div>

            <article className="md:pt-32 pb-20">
                <div 
                    className="container mx-auto px-6 lg:px-12 max-w-5xl"
                >
                    {/* title */}
                    {item.name && (
                        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background mb-4">
                            {item.name}
                        </h2>
                    )}

                    <div className="prose prose-lg max-w-none text-gray-600 font-open-sans">
                        {item.category && (
                            <div className="mb-8 font-serif text-gray-900 font-bold uppercase tracking-wide text-xs">
                                in <span className="text-gray-600">{item.category}</span>
                            </div>
                        )}

                        <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

                        {/* Action Buttons / CTA */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 not-prose">
                            <a
                                href={`https://wa.me/254740726783?text=Hello%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20${encodeURIComponent(item.name)}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-opacity-90 transition-all font-sans uppercase tracking-wider text-sm"
                            >
                                Reserve a Table
                            </a>
                            <Link
                                href="/restaurants"
                                className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-all font-sans uppercase tracking-wider text-sm"
                            >
                                View All Restaurants
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            <ServiceCategories
                title="More Dining Options"
                items={relatedRestaurants}
            />

            <Footer />
        </div>
    </main>
  );
}
