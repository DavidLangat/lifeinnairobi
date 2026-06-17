"use client";

import React from "react";
// import Image from 'next/image';
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationsSection from "@/components/DestinationsSection";
import FavoriteDestinationsSection from "@/components/FavoriteDestinationsSection";
import ServiceCategories from "@/components/ServiceCategories";
import Image from "next/image";
import BestThingsToDoSection from "@/components/BestThingsToDoSection";

interface HomeClientPageProps {
  restaurantData: any;
  favoriteDestinationsData: any;
  otherDestinationsData: any;
  eatData: any;
  golfData: any;
  padelData: any;
  shopData: any;
  stayData: any;
  partyData: any;
  hotelData: any;
}

export default function HomeClientPage({
  restaurantData,
  favoriteDestinationsData,
  otherDestinationsData,
  eatData,
  golfData,
  padelData,
  shopData,
  stayData,
  partyData,
  hotelData,
}: HomeClientPageProps) {
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
          <HeroSection />
        </div>
        <div>
          <BestThingsToDoSection />
        </div>

        <div>
          <DestinationsSection />
        </div>

        {/* <FavoriteDestinationsSection
          data={restaurantData}
        />
        <FavoriteDestinationsSection
          data={favoriteDestinationsData}
        />
        <FavoriteDestinationsSection
          data={otherDestinationsData}
        /> */}

        <FavoriteDestinationsSection
          page="restaurants-in-nairobi"
          data={eatData}
        />
        <FavoriteDestinationsSection
          page="accommodation-in-nairobi"
          data={stayData}
        />
        <FavoriteDestinationsSection
          page="hotels-in-nairobi"
          data={hotelData}
        />
        <FavoriteDestinationsSection page="shops-in-nairobi" data={shopData} />
        <FavoriteDestinationsSection
          page="golf-clubs-in-nairobi"
          data={golfData}
        />
        <FavoriteDestinationsSection
          page="padel-courts-in-nairobi"
          data={padelData}
        />
        <FavoriteDestinationsSection page="clubs-in-nairobi" data={partyData} />

        <div className="h-8"></div>

        <ServiceCategories />

        <Footer />
      </div>
    </main>
  );
}
