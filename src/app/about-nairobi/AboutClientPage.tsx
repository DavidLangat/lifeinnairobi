"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AboutNairobiSection from "@/components/AboutTigoniSection";
import ServiceCategories from "@/components/ServiceCategories";
// import Image from 'next/image';
import Image from "next/image";

interface AboutClientPageProps {
  header: {
    title: string;
    breadcrumb: string;
    description: string;
  };
}

export default function AboutClientPage({ header }: AboutClientPageProps) {
  return (
    <main className="bg-primary min-h-screen relative overflow-clip">
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
          <PageHeader
            title={header.title}
            breadcrumb={header.breadcrumb}
            description={header.description}
            backgroundImage="https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/background.jpeg"
          />
        </div>

        <div>
          <AboutNairobiSection />
        </div>

        <ServiceCategories />

        <Footer />
      </div>
    </main>
  );
}
