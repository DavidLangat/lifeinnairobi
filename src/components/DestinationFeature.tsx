import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationFeatureProps {
  data: {
    title: string;
    paragraphs: string[];
    idealFor?: string;
    tourDuration?: string;
    driveFromCBD?: string;
    button: {
      text: string;
      link: string;
    };
    image: {
      src: string;
      alt: string;
    };
    imagePosition?: string;
  }[];
}

export default function DestinationFeature({ data }: DestinationFeatureProps) {
  return (
    <div className="flex flex-col space-y-24 lg:space-y-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {data.map((item, index) => {
        const isImageLeft = item.imagePosition !== "right";

        return (
          <section key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Column */}
            <div className={`relative w-full h-[350px] lg:h-[450px] ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
              {item.image.src ? (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover rounded-xl"
                />
              ) : (
                <div className="absolute inset-0 bg-accent/10 flex items-center justify-center border border-accent/20 rounded-xl">
                  <span className="text-accent/50 font-serif text-lg">Image Placeholder</span>
                </div>
              )}
            </div>

            {/* Text Content Column */}
            <div className={`flex flex-col space-y-6 lg:pt-4 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
              <h2 className="text-3xl md:text-4xl font-serif text-background leading-tight">
                {item.title}
              </h2>

              <div className="text-gray-600 space-y-4 font-sans leading-relaxed">
                {item.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>

              {/* Trip Details */}
              <div className="flex flex-col space-y-1.5 font-sans pt-2 border-l-2 border-accent/30 pl-4">
                {item.tourDuration && (
                  <p>
                    <span className="font-semibold text-gray-800">Tour Duration:</span>{" "}
                    <span className="text-gray-600">{item.tourDuration}</span>
                  </p>
                )}
                {item.driveFromCBD && (
                  <p>
                    <span className="font-semibold text-gray-800">Drive from Nairobi CBD:</span>{" "}
                    <span className="text-gray-600">{item.driveFromCBD}</span>
                  </p>
                )}
              </div>

              {item.idealFor && (
                <p className="text-accent text-sm font-medium pt-2">
                  {item.idealFor}
                </p>
              )}

              <div className="pt-4">
                <Link
                  href={item.button.link}
                  className="inline-block bg-background text-primary font-bold px-8 py-3 rounded-full hover:bg-background/90 transition-colors uppercase tracking-widest text-xs"
                >
                  {item.button.text}
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
