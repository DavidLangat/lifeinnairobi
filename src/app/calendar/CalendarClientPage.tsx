'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import CalendarSection from '@/components/CalendarSection';
import ServiceCategories from '@/components/ServiceCategories';
import Image from 'next/image';

export default function CalendarClientPage() {
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
                    <PageHeader
                        title="Event Calendar"
                        breadcrumb="Calendar"
                        description=""
                        backgroundImage="https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/background.jpeg"
                    />
                </div>

                <div>
                    <React.Suspense fallback={<div className="h-64 w-full flex items-center justify-center bg-primary"><div className="animate-pulse text-gray-500">Loading Events...</div></div>}>
                        <CalendarSection />
                    </React.Suspense>
                </div>

                <ServiceCategories />

                <Footer />
            </div>
        </main>
    );
}
