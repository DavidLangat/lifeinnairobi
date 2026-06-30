"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Star, Share2, Heart, Grid2X2, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface TripDetailClientPageProps {
  trip: {
    title: string;
    paragraphs: string[];
    idealFor?: string;
    tourDuration?: string;
    driveFromCBD?: string;
    image: {
      src: string;
      alt: string;
    };
    [key: string]: any;
  };
}

export default function TripDetailClientPage({ trip }: TripDetailClientPageProps) {
  return (
    <main className="bg-primary min-h-screen relative overflow-hidden">
      {/* Background Images for Parallax similar to other pages */}
      <div className="hidden md:block fixed opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0 transform -translate-x-1/4 -translate-y-1/4">
        <Image
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20left.png"
          alt="Decorative Background"
          fill
          className="object-contain"
        />
      </div>
      <div className="hidden md:block fixed opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0 transform translate-x-1/4 translate-y-1/4">
        <Image
          src="https://davidlangat.github.io/tigoniimages/v2/background/Artboard%20Right%20Bottom.png"
          alt="Decorative Background"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
 <PageHeader
            title={"Day Trip from Nairobi"}
            breadcrumb="Day Trip from Nairobi"
            description={""}
            backgroundImage="https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/background.jpeg"
          />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pt-24 md:pt-32">
          {/* Header section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-background font-bold mb-4 leading-tight">
                {trip.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-background/80 font-sans text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  <span className="font-medium text-background">Nairobi, Kenya</span>
                </div>
                {trip.tourDuration && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                    <span className="font-medium text-background">{trip.tourDuration}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-accent fill-accent" />
                  <span className="font-medium text-background">4.8 (124)</span>
                </div>
                <div className="flex items-center gap-1.5 text-accent/80">
                  <span className="font-medium px-3 py-1 bg-accent/20 text-accent rounded-full text-xs uppercase tracking-wider">Day Trips & Excursions</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-full border border-background/20 hover:bg-background/10 hover:border-background/40 transition-all text-background shadow-sm hover:shadow-md">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full border border-background/20 hover:bg-background/10 hover:border-background/40 transition-all text-background shadow-sm hover:shadow-md">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Gallery (Bento Box style) */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative group">
            {/* Main large image */}
            <div className="col-span-1 md:col-span-2 md:row-span-2 relative h-full w-full">
              <Image 
                src={trip.image.src} 
                alt={trip.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            
            {/* 4 smaller images - Reusing the same image with different object positions */}
            <div className="hidden md:block relative h-full w-full">
              <Image 
                src={trip.image.src} 
                alt={`${trip.title} detail view 1`}
                fill
                className="object-cover object-left-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="hidden md:block relative h-full w-full overflow-hidden">
               <Image 
                src={trip.image.src} 
                alt={`${trip.title} detail view 2`}
                fill
                className="object-cover object-right-bottom hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="hidden md:block relative h-full w-full">
              <Image 
                src={trip.image.src} 
                alt={`${trip.title} detail view 3`}
                fill
                className="object-cover object-bottom hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="hidden md:block relative h-full w-full overflow-hidden">
               <Image 
                src={trip.image.src} 
                alt={`${trip.title} detail view 4`}
                fill
                className="object-cover object-right hover:scale-105 transition-transform duration-700"
              />
              <button className="absolute bottom-4 right-4 bg-background text-primary px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:scale-105 hover:shadow-xl transition-all shadow-lg z-10 font-sans text-sm border border-background/20">
                <Grid2X2 className="w-4 h-4" />
                View all
              </button>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="mt-8 text-sm text-background/60 font-sans flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-accent transition-colors font-medium">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/day-trips-from-nairobi" className="hover:text-accent transition-colors font-medium">Day Trips from Nairobi</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-background font-medium truncate max-w-[200px] sm:max-w-none">{trip.title}</span>
          </div>

          {/* Initial Overview Content Area */}
          <div className="mt-12 mb-20">
            <div className="bg-secondary/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-background/10 shadow-xl">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-serif text-background mb-8">About this trip</h2>
                
                {trip.idealFor && (
                  <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl mb-6">
                    <p className="text-accent text-sm font-semibold tracking-wide">
                      {trip.idealFor}
                    </p>
                  </div>
                )}
                
                <div className="text-background/90 space-y-6 font-sans leading-relaxed text-lg">
                   {trip.paragraphs.map((p: string, i: number) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                   ))}
                </div>

                {trip.driveFromCBD && (
                  <div className="mt-8 pt-8 border-t border-background/10">
                    <p className="font-sans">
                      <span className="font-semibold text-background">Drive from Nairobi CBD:</span>{" "}
                      <span className="text-background/80">{trip.driveFromCBD}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
