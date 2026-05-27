'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import ActivityNavigation from '@/components/ActivityNavigation';
import ServiceCategories from '@/components/ServiceCategories';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import ActivityBookingWidget from '@/components/booking/ActivityBookingWidget';

interface EventClientPageProps {
    event: {
        name: string;
        slug: string;
        image: string;
        shortDescription: string;
        fullDescription: string;
        highlights: string[] | string;
        gallery: Array<string | { src: string; alt: string }>;
        itinerary?: Array<{ title: string; description: string }>;
        pricing?: {
            citizen?: number;
            resident?: number;
            nonResident?: number;
        };
        price: number;
        date: string;
        keyDetails?: {
            duration: string;
            location: string;
        };
    };
}

export default function EventClientPage({ event }: EventClientPageProps) {
    const details = event as EventClientPageProps['event'];
    const searchParams = useSearchParams();

    const isValidIsoDate = (value: string | null): value is string => {
        if (!value) return false;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return false;
        return parsed.toISOString().slice(0, 10) === value;
    };

    const selectedDate = searchParams.get('date');
    const eventDate = isValidIsoDate(selectedDate) ? selectedDate : event.date;

    return (
        <main className="bg-primary min-h-screen font-sans text-gray-900 relative overflow-hidden">
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
                        title={event.name}
                        breadcrumb="Calendar"
                        backgroundImage={event.image}
                    />
                </div>

                <div className="container mx-auto px-6 lg:px-12 py-10 lg:py-6 max-w-7xl">

                    {/* Sub Navigation */}
                    <ActivityNavigation />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 justify-start">

                        {/* Main Content Column (8 cols) */}
                        <div className="lg:col-span-8 space-y-1">

                            {/* Intro Text - ID: Overview */}
                            <section 
                                id="overview" 
                                className="scroll-mt-32 space-y-10"
                            >
                                <h2 className="text-2xl font-serif text-background font-medium mb-2">About</h2>
                                <div
                                    className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600"
                                    dangerouslySetInnerHTML={{ __html: event.fullDescription }}
                                />

                                {/* Gallery */}
                                {details.gallery && details.gallery.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[400px] not-prose">
                                        {details.gallery.slice(0, 2).map((img, idx: number) => (
                                            <div key={idx} className="relative rounded-xl overflow-hidden h-[300px] md:h-full">
                                                <Image
                                                    
                                                    src={typeof img === 'string' ? img : img.src}
                                                    alt={typeof img === 'string' ? 'Gallery' : img.alt}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden h-[400px] w-full not-prose">
                                        <Image
                                             
                                            src={event.image} 
                                            alt={event.name} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                )}
                            </section> {/* End Overview */}

                            {/* Details Section - ID: Details */}
                            <section 
                                id="details" 
                                className="scroll-mt-32 pt-10"
                            >
                                {Array.isArray(event.highlights) ? (
                                    <ul className="list-disc pl-6 space-y-3 text-gray-600">
                                        {event.highlights.map((highlight, index) => (
                                            <li key={`${event.slug}-highlight-${index}`}>{highlight}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div
                                        className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600"
                                        dangerouslySetInnerHTML={{ __html: event.highlights }}
                                    />
                                )}
                            </section>

                            {/* Itinerary Section - ID: Itinerary */}
                            {details.itinerary && (
                                <section 
                                    id="itinerary" 
                                    className="scroll-mt-32 pt-4"
                                >
                                    <h3 className="text-2xl font-serif text-background font-medium mb-6">Itinerary</h3>
                                    <div className="space-y-6 relative border-l-2 border-background ml-3 pl-8">
                                        {details.itinerary.map((item, idx: number) => (
                                            <div key={idx} className="relative">
                                                <span className="absolute -left-[41px] top-0 bg-background text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white">
                                                    {idx + 1}
                                                </span>
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                                                <p className="text-gray-600 whitespace-pre-line ">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                        </div>

                        {/* Sidebar Column (4 cols) - Sticky */}
                        <div className="lg:col-span-4 relative">
                            <div 
                                className="sticky top-10 space-y-6"
                            >

                                {/* Pricing Widget */}
                                {details.pricing && (
                                    <div className="bg-background rounded-xl border border-background p-6">
                                        <h4 className="text-sm font-bold uppercase tracking-widest block mb-1 text-primary">Pricing Tiers</h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex justify-between">
                                                <span className="text-primary">Citizen Rate</span>
                                                <span className="font-bold text-primary">Ksh {details.pricing.citizen?.toLocaleString()}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-primary">Resident Rate</span>
                                                <span className="font-bold text-primary">Ksh {details.pricing.resident?.toLocaleString()}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-primary">Non-Resident Rate</span>
                                                <span className="font-bold text-primary">Ksh {details.pricing.nonResident?.toLocaleString()}</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* Booking Card */}
                                <div className="bg-secondary rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 md:p-8">
                                    <div className="mb-6 pb-6 border-b border-gray-100">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-1">Passes from</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-background">Ksh {event.price?.toLocaleString()}</span>
                                            <span className="text-gray-500 font-medium"> / person</span>
                                        </div>
                                        {/* <ActivityBookingWidget
                                            activitySlug={"Nairobi-hiking-tours"}
                                            activityName={event.name}
                                            basePrice={event.price || 0}
                                            pricing={{
                                                citizen: event.pricing?.citizen ?? event.price ?? 0,
                                                resident: event.pricing?.resident ?? event.price ?? 0,
                                                nonResident: event.pricing?.nonResident ?? event.price ?? 0,
                                            }}
                                        /> */}
                                    </div>

                                    <a
                                        href={`https://wa.me/254740726783?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(event.name)}%20on%20${eventDate}`}
                                        target="_blank"
                                        className="w-full bg-accent hover:bg-background text-primary text-center py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl mb-6 flex items-center justify-center gap-2"
                                    >
                                        <span>Check Availability</span>
                                    </a>

                                    {/* Key Details List */}
                                    <div className="space-y-4 text-gray-600">
                                        {details.keyDetails && (
                                            <>
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-teal-50 p-2 rounded-lg text-background shrink-0">
                                                        <Clock className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-bold text-gray-900">Duration</span>
                                                        <span className="text-sm">{details.keyDetails.duration}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <div className="bg-teal-50 p-2 rounded-lg text-background shrink-0">
                                                        <Calendar className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-bold text-gray-900">Date</span>
                                                        <span className="text-sm">{eventDate}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <div className="bg-teal-50 p-2 rounded-lg text-background shrink-0">
                                                        <MapPin className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-bold text-gray-900">Meeting Point</span>
                                                        <span className="text-sm">{details.keyDetails.location}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <ServiceCategories />

                <Footer />
            </div>
        </main>
    );
}
