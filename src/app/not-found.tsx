import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-primary relative overflow-hidden flex flex-col">
      {/* Sticky Background Images with Parallax/Float Effect */}
      <div className="hidden md:block fixed opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0 transform -translate-x-1/4 -translate-y-1/4">
        <Image
          src="https://ik.imagekit.io/kggumm8iz/tigonilife/v2/background/Artboard%20left.png"
          alt="Decorative Background"
          fill
          className="object-contain"
        />
      </div>
      <div className="hidden md:block fixed opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0 transform translate-x-1/4 translate-y-1/4">
        <Image
          src="https://ik.imagekit.io/kggumm8iz/tigonilife/v2/background/Artboard%20Right%20Bottom.png"
          alt="Decorative Background"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center px-6 py-32">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <h1 className="font-serif text-8xl md:text-9xl text-background mb-6 leading-none">
              404
            </h1>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-800 mb-6">
              Page Not Found
            </h2>
            <p className="text-gray-600 font-open-sans text-lg md:text-xl mb-12 leading-relaxed max-w-lg">
              We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps you took a wrong turn while exploring.
            </p>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-opacity-90 transition-all font-sans uppercase tracking-wider text-sm shadow-md"
            >
              Return Home
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
