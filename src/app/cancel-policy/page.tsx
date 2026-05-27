import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import restaurantData from '@/data/restaurant-data.json';
import ServiceCategories from '@/components/ServiceCategories';
import Link from 'next/link';
import BlogPostHero from '@/components/BlogPostHero';
import Image from 'next/image';

export default function CancelPolicyPage() {
    const title = "Cancellation, Return and Refund Policy";
    const heroImage = "https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/Ridge%20Cabin%20Resort.jpg";

    return (        
        <main className="min-h-screen bg-primary">
            {/* Sticky Background Images */}
            <div
                className='relative z-10'
            >

                <Navbar />

                <BlogPostHero
                    image={""}
                    title={title}
                    alt={title}
                />
            </div>

            <article className=" pb-20">
                {/* <div className="hidden md:block fixed opacity-30 top-36 left-30 w-[500px] h-[500px] pointer-events-none z-0 transform -translate-x-1/4 -translate-y-1/4">
                    <Image
                        
                        src="https://ik.imagekit.io/lxn522qamc/tigonilife/v2/background/Artboard%20left.png"
                        alt="Decorative Flower"
                        fill
                        className="object-contain"
                    />
                </div> */}
                {/* <div className="hidden md:block fixed opacity-30 bottom-30 right-30 w-[500px] h-[500px] pointer-events-none z-0 transform translate-x-1/4 translate-y-1/4">
                    <Image
                        
                        src="https://ik.imagekit.io/lxn522qamc/tigonilife/v2/background/Artboard%20Right%20Bottom.png"
                        alt="Decorative Flower"
                        fill
                        className="object-contain"
                    />
                </div> */}
                <div className="container mx-auto px-6 lg:px-12 max-w-5xl">

                    {/* title */}
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background mb-8">
                        {title}
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-600 font-open-sans">

                        <p>
                            We understand that plans can sometimes change, and we aim to be as fair and flexible as possible while ensuring smooth planning for all experiences.
                        </p>

                        <p>
                            Cancellations made more than 48 hours before the scheduled event are eligible for a 50% refund of the total booking fee. To process your request, please notify us in writing via email, phone, or WhatsApp.
                        </p>

                        <p>
                            Unfortunately, no-shows or late arrivals will result in the full experience fee being charged, as preparations and reservations will already have been made.
                        </p>

                        <p>
                            If you need to reschedule your experience, we are happy to assist. Rescheduling requests must be communicated in writing through email, phone, or WhatsApp at least 48 hours before the scheduled event date. Please note that rescheduling is subject to availability.
                        </p>

                        <p>
                            Kindly note that tickets are non-transferable and cannot be reassigned or used by another person.
                        </p>

                        <p>
                            We encourage you to reach out as early as possible if your plans change. This helps us serve you better and maintain the quality of experiences for all our guests.
                        </p>

                        {/* Action Buttons / CTA */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 not-prose">
                            <a
                                href="https://wa.me/254740726783?text=Hello%2C%20I%20have%20a%20question%20about%20the%20cancellation%20policy."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-opacity-90 transition-all font-sans uppercase tracking-wider text-sm"
                            >
                                Contact Support
                            </a>
                           
                        </div>
                    </div>

                </div>
            </article>

            <div
                className='relative z-10'
            >

                <ServiceCategories
                    title="Explore Nairobi"
                    items={restaurantData.items
                        .slice(0, 4)
                        .map(i => ({
                            title: i.name,
                            image: i.image,
                            href: `/restaurants/${i.slug}`
                        }))}
                />

                <Footer />
            </div>
        </main>
    );
}
