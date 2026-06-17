"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategories from "@/components/ServiceCategories";
import Link from "next/link";
import BlogPostHero from "@/components/BlogPostHero";
import Image from "next/image";

interface AccommodationDetailClientPageProps {
  item: {
    name: string;
    slug: string;
    image: string;
    category: string;
    isActive: boolean;
    contentHtml: string;
    contentHtml2?: string;
    gallery?: (string | { src: string; alt?: string; attribution?: string })[];
  };
  relatedAccommodations: any[];
}

export default function AccommodationDetailClientPage({
  item,
  relatedAccommodations,
}: AccommodationDetailClientPageProps) {
  return (
    <main className="min-h-screen bg-primary relative overflow-hidden">
      {/* Sticky Background Images with Parallax/Float Effect */}
      <div className="hidden md:block fixed  opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0  transform -translate-x-1/4 -translate-y-1/4">
        <Image
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20left.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>
      <div className="hidden md:block fixed  opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0  transform translate-x-1/4 translate-y-1/4">
        <Image
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20Right%20Bottom.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div>
          <BlogPostHero image={item.image} title={item.name} alt={item.name} />
        </div>

        <article className="md:pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            {item.name && (
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background mb-4">
                {item.name}
              </h2>
            )}

            <div className="prose prose-lg max-w-none text-gray-600 font-open-sans">
              {item.category && (
                <div className="mb-8 font-serif text-gray-900 font-bold uppercase tracking-wide text-xs">
                  <span className="text-gray-600">{item.category}</span>
                </div>
              )}

              <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

              {/* Gallery */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 not-prose">
                  {item.gallery.map((img: any, idx: number) => (
                    <div
                      key={idx}
                      className="group relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={typeof img === "string" ? img : img.src}
                        alt={
                          typeof img === "string"
                            ? `Gallery image ${idx + 1}`
                            : img.alt
                        }
                        fill
                        className="object-cover object-bottom hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              )}

              {item.contentHtml2 && (
                <div className="prose pt-10 prose-lg max-w-none text-gray-600 font-open-sans">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.contentHtml2 }}
                  />
                </div>
              )}

              {/* Action Buttons / CTA */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 not-prose">
                <a
                  href={`https://wa.me/254740726783?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20${encodeURIComponent(item.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-opacity-90 transition-all font-sans uppercase tracking-wider text-sm"
                >
                  Book Now
                </a>

                <Link
                  href="/accommodation"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-all font-sans uppercase tracking-wider text-sm"
                >
                  View All Accommodations
                </Link>
              </div>
            </div>
          </div>
        </article>

        <ServiceCategories
          title="More Accommodations"
          items={relatedAccommodations}
        />

        <Footer />
      </div>
    </main>
  );
}
