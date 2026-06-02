import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import destinationsData from '@/data/bestthings-data.json';
import ActivityClientPage from './ActivityClientPage';

// Force static generation for all known slugs
export async function generateStaticParams() {
  return destinationsData.items.map((item) => ({
    slug: (item as any).slug || item.name.toLowerCase().replace(/ /g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Find the activity item
  const activity = destinationsData.items.find((item) => {
    const itemSlug = (item as any).slug || item.name.toLowerCase().replace(/ /g, '-');
    return itemSlug === slug;
  });

  if (!activity) {
    return {
      title: 'Activity Not Found | Nairobi',
      description: 'The requested activity could not be found.',
    };
  }

  return {
    title: `${activity.name === "Farm Tours" || activity.name === "Hiking Tours" ? activity.seo : activity.seo} | Things to do in Nairobi`,
    description: activity.shortDescription || `Experience ${activity.name} in Nairobi.`,
    keywords: [activity.name, 'Nairobi Activities', 'Things to do in Nairobi', 'Kenya Travel', 'Nairobi Day Trip'],
    alternates: {
      canonical: `https://nairobi.life/best-things-to-do-in-nairobi/${slug}`,
    },
    openGraph: {
      title: `${activity.name === "Farm Tours" || activity.name === "Hiking Tours" ? activity.seo : activity.seo} | Things to do in Nairobi`,
      description: activity.shortDescription || `Experience ${activity.name} in Nairobi.`,
      url: `https://nairobi.life/best-things-to-do-in-nairobi/${slug}`,
      images: [
        {
          url: activity.image,
          width: 1200,
          height: 630,
          alt: activity.name,
        },
      ],
      type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
      card: 'summary_large_image',
      title: activity.name,
      description: activity.shortDescription,
      images: [activity.image],
    },
  };
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find the activity item
  const activity = destinationsData.items.find((item) => {
    const itemSlug = (item as any).slug || item.name.toLowerCase().replace(/ /g, '-');
    return itemSlug === slug;
  });

  if (!activity) {
    notFound();
  }

  // Type assertion for our expanded data structure
  const details = activity as any;

  // Prepare related activities
  const relatedActivities = destinationsData.items
    .filter(item => (item as any).slug !== slug && (item as any).slug !== activity.name.toLowerCase().replace(/ /g, '-'))
    .slice(0, 4)
    .map(item => ({
      title: item.name,
      image: item.image,
      href: `/best-things-to-do-in-nairobi/${(item as any).slug || item.name.toLowerCase().replace(/ /g, '-')}`
    }));


  return <ActivityClientPage activity={activity as any} details={details} relatedActivities={relatedActivities} />;
}


//  {/* Practical Info Accordions (Keep these as they are useful at bottom) */}
//             //  {details.practicalInfo && (
//             //       <div className="space-y-4 pt-8 border-t border-gray-100">
//             //            {/* Re-using simple accordion logic inside simple divs for now or creating a component */}
//             //            {details.practicalInfo.map((info: any, idx: number) => (
//             //                <div key={idx}>
//             //                   <h4 className="font-bold text-gray-900 mb-2">{info.title}</h4>
//             //                   <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
//             //                </div>
//             //            ))}
//             //       </div>
//             //  )}
