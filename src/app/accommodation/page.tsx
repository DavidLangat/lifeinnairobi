import React from 'react';
import { Metadata } from 'next';
import destinationsData from '@/data/favorite-destinations.json';
import AccommodationClientPage from './AccommodationClientPage';

export const metadata: Metadata = {
  title: 'Accommodation in Nairobi | Places to Visit in Nairobi',
  description: 'Explore top-rated accommodations offering comfort, style, and exceptional hospitality for your next trip to Nairobi. Find your perfect getaway.',
  keywords: ['Accommodation in Nairobi', 'Hotels in Nairobi', 'Cottages Nairobi', 'Places to stay Nairobi', 'Vacation Rentals Limuru', 'Nairobi Retreats'],
  alternates: {
    canonical: 'https://nairobi.life/accommodation',
  },
  openGraph: {
    title: 'Accommodation in Nairobi | Places to Visit in Nairobi',
    description: 'Explore top-rated accommodations offering comfort, style, and exceptional hospitality for your next trip to Nairobi.',
    url: 'https://nairobi.life/accommodation',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Accommodation in Nairobi',
      },
    ],
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
    title: 'Accommodation in Nairobi | Cottages, Retreats & Stays',
    description: 'Explore top-rated accommodations offering comfort, style, and exceptional hospitality.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function DestinationsPage() {
    const items = destinationsData.items.map(item => ({
        title: item.name,
        subtitle: item.category || 'Accommodation',
        image: item.image,
        href: `/accommodation/${item.slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`,
    }));

    const moreItems = destinationsData.items.slice(0, 4).map(item => ({
        title: item.name,
        image: item.image,
        href: `/activities/${(item as any).slug || item.name.toLowerCase().replace(/ /g, '-')}`
    }));

  return (
    <AccommodationClientPage 
      heading={destinationsData.heading || "Accommodations in Nairobi"}
      description={destinationsData.description}
      items={items}
      moreItems={moreItems}
    />
  );
}
