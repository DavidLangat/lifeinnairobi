"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import ServiceCategories from "@/components/ServiceCategories";
// import Image from 'next/image';
import Image from "next/image";
import TouristAttractions from "@/components/TouristAttractions";
import touristAttractionsData from "@/data/tourist-attractions-data.json";
import DestinationFeature from "@/components/DestinationFeature";
import destinationFeatureData from "@/data/destination-feature-data.json";
import PlanningTips from "@/components/PlanningTips";
import planningTipsData from "@/data/planning-tips-data.json";

interface DayTripClientPageProps {
  heading: string;
  description: string;
  activities: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  }[];
}

export default function DayTripClientPage({
  heading,
  description,
  activities,
}: DayTripClientPageProps) {
  return (
    <main className="bg-primary min-h-screen relative overflow-hidden">
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
            title={"Day Trip from Nairobi"}
            breadcrumb="Day Trip from Nairobi"
            description={""}
            backgroundImage="https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/background.jpeg"
          />
        </div>
        {/* Content */}
        <TouristAttractions data={touristAttractionsData} />
        <DestinationFeature data={destinationFeatureData} />
        <PlanningTips data={planningTipsData} />
        <ServiceCategories />

        <Footer />
      </div>
    </main>
  );
}
