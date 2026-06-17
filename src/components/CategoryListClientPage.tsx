"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import ServiceCategories from "@/components/ServiceCategories";
import Image from "next/image";

interface CategoryListClientPageProps {
  heading: string;
  breadcrumb: string;
  description: string;
  items: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  }[];
  moreItems?: {
    title: string;
    image: string;
    href: string;
  }[];
}

export default function CategoryListClientPage({
  heading,
  breadcrumb,
  description,
  items,
  moreItems,
}: CategoryListClientPageProps) {
  return (
    <main className="bg-primary min-h-screen relative overflow-hidden">
      {/* Sticky Background Images with Parallax/Float Effect */}
      <div className="hidden md:block fixed opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0 transform -translate-x-1/4 -translate-y-1/4">
        <Image
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20left.png"
          alt="Decorative Flower"
          fill
          className="object-contain"
        />
      </div>
      <div className="hidden md:block fixed opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0 transform translate-x-1/4 translate-y-1/4">
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
          <PageHeader
            title={heading}
            breadcrumb={breadcrumb}
            description={description}
            backgroundImage="https://nairobi.life/image/bg2.jpg"
          />
        </div>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <BentoGrid items={items} />
          </div>
        </section>

        {moreItems && moreItems.length > 0 && (
          <ServiceCategories title="More to Explore" items={moreItems} />
        )}

        <Footer />
      </div>
    </main>
  );
}
