"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategories from "@/components/ServiceCategories";
import BlogPostHeroWithMap from "@/components/BlogPostHeroWithMap";
import Image from "next/image";
// import Image from 'next/image';

interface AboutDetailClientPageProps {
  post: {
    title: string;
    image: string;
    imageAlt?: string;
    imageAttribution?: string;
    content: {
      subheading: string;
      intro: string;
      paragraphs: string[];
      closing: string; // The type says closing string | undefined in some places, but let's assume it matches access
    };
  };
}

export default function AboutDetailClientPage({
  post,
}: AboutDetailClientPageProps) {
  return (
    <main className="bg-primary min-h-screen relative overflow-hidden">
      {/* Sticky Background Images with Parallax/Float Effect */}
      <div className="hidden md:block fixed  opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0  transform -translate-x-1/4 -translate-y-1/4">
        <Image
          //
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20left.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>
      <div className="hidden md:block fixed  opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0  transform translate-x-1/4 translate-y-1/4">
        <Image
          //
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20Right%20Bottom.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div>
          <BlogPostHeroWithMap
            image={post.image}
            title={post.title}
            alt={post.imageAlt}
            attribution={post.imageAttribution}
          />
        </div>

        <article className="md:pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            <div className="prose prose-lg max-w-none text-gray-600">
              {post.content.subheading && (
                <h2 className="font-serif text-3xl text-background mb-6">
                  {post.content.subheading}
                </h2>
              )}

              {post.content.intro && (
                <p className="mb-2 leading-relaxed">{post.content.intro}</p>
              )}

              {post.content.paragraphs &&
                post.content.paragraphs.map((para: string, idx: number) => (
                  <div
                    key={idx}
                    className="py-2 flex flex-wrap gap-2 not-prose"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}

              {post.content.closing && (
                <p className="leading-relaxed mt-4">{post.content.closing}</p>
              )}
            </div>
          </div>
        </article>

        <ServiceCategories />

        <Footer />
      </div>
    </main>
  );
}
