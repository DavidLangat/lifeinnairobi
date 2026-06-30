import React from "react";
import Image from "next/image";

interface TouristAttractionsProps {
  data: {
    heading: string;
    paragraphs: string[];
    readMoreText: string;
    readMoreLink: string;
    map: {
      imageSrc: string;
      imageAlt: string;
      buttonText: string;
      buttonLink: string;
    };
  };
}

export default function TouristAttractions({ data }: TouristAttractionsProps) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-20 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-background leading-tight">
            {data.heading}
          </h2>

          <div className="text-gray-800 space-y-6 text-lg font-sans">
            {data.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>

          {/* <div className="pt-2">
            <a
              href={data.readMoreLink}
              className="text-background font-bold flex items-center hover:text-accent transition-colors text-base inline-flex"
            >
              {data.readMoreText}{" "}
              <span className="ml-2 text-2xl leading-none font-normal">+</span>
            </a>
          </div> */}
        </div>

        {/* Right Column: Map Image */}
        {/* <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/5 rounded-3xl flex items-center justify-center border border-accent/10 overflow-hidden">
            {data.map.imageSrc ? (
              <Image
                src={data.map.imageSrc}
                alt={data.map.imageAlt}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-accent/40 font-serif text-xl">
                Map Image Placeholder
              </span>
            )}
          </div>

          <a
            href={data.map.buttonLink}
            className="relative z-10 bg-secondary/95 backdrop-blur-sm text-background font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-white transition-all hover:scale-105 uppercase tracking-widest text-sm border border-background/10 inline-block text-center"
          >
            {data.map.buttonText}
          </a>
        </div> */}
      </div>
    </section>
  );
}
