"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import ActivityNavigation from "@/components/ActivityNavigation";
import ServiceCategories from "@/components/ServiceCategories";
import EmbedSocialReviews from "@/components/EmbedSocialReviews";
import ActivityBookingCard from "@/components/ActivityBookingCard";
import ActivityPricingCard from "@/components/ActivityPricingCard";
import ActivityFAQ from "@/components/ActivityFAQ";
import {
  HTMLContentFirstParagraph,
  HTMLContentRest,
} from "@/components/HTMLContentSplit";
import ActivityBookingWidget from "@/components/booking/ActivityBookingWidget";
import ActivitySeoSchemas from "@/components/seo/ActivitySeoSchemas";

import destinationsData from "@/data/destinations-data.json";

interface ActivityClientPageProps {
  activity: {
    name: string;
    slug?: string;
    image: string;
    shortDescription: string;
    contentHtmltop?: string;
    contentHtml?: string;
    fullDescription?: string;
    highlights?: string[];
    gallery?: Array<{ src: string; alt: string } | string>;
    itinerary?: Array<{ title: string; description: string }>;
    faqs?: Array<{ question: string; answer: string }>;
    price?: number;
    pricing?: {
      citizen?: number;
      resident?: number;
      nonResident?: number;
    };
    keyDetails?: {
      duration: string;
      startTime: string[];
      location: string;
    };
  };
  details: any;
  relatedActivities: any[];
}

export default function ActivityClientPage({
  activity,
  details,
  relatedActivities,
}: ActivityClientPageProps) {
  return (
    <main className="bg-primary min-h-screen font-sans text-gray-900 relative overflow-clip">
      <ActivitySeoSchemas
        activity={activity}
        faqs={details.faqs}
        categoryName="Things to do in Nairobi"
        categoryUrl="https://lifeinnairobi.com/things-to-do-in-nairobi"
      />
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
            title={activity.name}
            breadcrumb="Things to do"
            backgroundImage="https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/background.jpeg"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-10 lg:py-6 max-w-7xl">
          {/* Sub Navigation */}
          <ActivityNavigation />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 justify-start">
            {/* Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-1">
              {/* Intro Text - ID: Overview */}
              <section id="overview" className="scroll-mt-32 space-y-10">
                <h2 className="text-2xl font-serif text-background font-medium mb-2">
                  About
                </h2>
                {details.contentHtmltop && (
                  <>
                    <div className="lg:hidden">
                      <HTMLContentFirstParagraph
                        contentHtml={details.contentHtmltop}
                      />
                      {/* Mobile Booking & Pricing Cards */}
                      <ActivityPricingCard
                        details={details}
                        className="lg:hidden mb-6"
                      />
                      <ActivityBookingCard
                        activity={activity}
                        details={details}
                        className="lg:hidden mb-10"
                      >
                        <ActivityBookingWidget
                          activitySlug={activity.slug || details.slug || ""}
                          activityName={activity.name}
                          basePrice={activity.price || 0}
                          pricing={details.pricing}
                        />
                      </ActivityBookingCard>
                      <HTMLContentRest contentHtml={details.contentHtmltop} />
                    </div>
                    <div
                      className="hidden lg:block prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600"
                      dangerouslySetInnerHTML={{
                        __html: details.contentHtmltop,
                      }}
                    />
                  </>
                )}

                {/* Gallery */}
                {details.gallery && details.gallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[400px] not-prose">
                    {details.gallery
                      .slice(0, 2)
                      .map((img: any, idx: number) => (
                        <div
                          key={idx}
                          className="relative rounded-xl overflow-hidden h-[300px] md:h-full"
                        >
                          <Image
                            src={typeof img === "string" ? img : img.src}
                            alt={typeof img === "string" ? "Gallery" : img.alt}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden h-[400px] w-full not-prose">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </section>{" "}
              {/* End Overview */}
              {/* Details Section - ID: Details */}
              <section id="details" className="scroll-mt-32 pt-10">
                {/* Render HTML Content (Highlights, Itinerary etc embedded) */}
                {details.contentHtml ? (
                  <>
                    <div
                      className="block prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600"
                      dangerouslySetInnerHTML={{ __html: details.contentHtml }}
                    />
                  </>
                ) : (
                  <div className="prose prose-lg max-w-none text-gray-600">
                    {details.fullDescription}
                  </div>
                )}

                {/* Fallback Highlights if no HTML content */}
                {!details.contentHtml && details.highlights && (
                  <div className="bg-gray-50 p-6 rounded-xl not-prose">
                    <h3 className="font-serif text-xl font-medium mb-4">
                      Highlights
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {details.highlights.map((h: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-teal-600 mt-1">✓</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
              {/* Itinerary Section - ID: Itinerary (If exists in data separately, otherwise part of details) */}
              {details.itinerary && (
                <section id="itinerary" className="scroll-mt-32 pt-4">
                  {/* Desktop View: Full List */}
                  <div className="block">
                    <h3 className="text-2xl font-serif text-background font-medium mb-6">
                      Itinerary
                    </h3>
                    <div className="space-y-6 relative border-l-2 border-background ml-3 pl-8">
                      {details.itinerary.map((item: any, idx: number) => (
                        <div key={idx} className="relative">
                          <span className="absolute -left-[41px] top-0 bg-background text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-gray-900 text-lg mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 whitespace-pre-line ">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              {/* FAQ Section */}
              {details.faqs && details.faqs.length > 0 && (
                <div className="pt-10">
                  <ActivityFAQ faqs={details.faqs} />
                </div>
              )}
              {/* Google Reviews Section */}
              {/* <section 
                  id="reviews" 
                  className="scroll-mt-32 pt-10"
              >
                <h3 className="text-2xl font-serif text-background font-medium mb-6">
                  Testimonials
                </h3>
                <EmbedSocialReviews />
              </section> */}
            </div>

            {/* Sidebar Column (4 cols) - Sticky */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-12 space-y-6">
                {/* Pricing Widget if detailed pricing exists */}
                <ActivityPricingCard
                  details={details}
                  className="hidden lg:block"
                />
                <ActivityBookingCard
                  activity={activity}
                  details={details}
                  className="hidden lg:block"
                >
                  <ActivityBookingWidget
                    activitySlug={activity.slug || details.slug || ""}
                    activityName={activity.name}
                    basePrice={activity.price || 0}
                    pricing={details.pricing}
                  />
                </ActivityBookingCard>
              </div>
            </div>
          </div>
        </div>

        {/* Related Activities */}
        <ServiceCategories items={relatedActivities} />

        <Footer />
      </div>
    </main>
  );
}
