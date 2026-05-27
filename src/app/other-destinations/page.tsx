import React from 'react';
import { Metadata } from 'next';
import otherDestinationsData from '@/data/other-destinations.json';
import DestinationsClientPage from './DestinationsClientPage';

export const metadata: Metadata = {
  title: 'Other Destinations in Nairobi | Hidden Gems & Leisure',
  description: 'Discover more hidden gems, relaxation spots, and leisure activities in Nairobi. From serene gardens to exclusive spas.',
  keywords: ['Nairobi Destinations', 'Hidden Gems Nairobi', 'Relaxation Spots', 'Leisure Activities Nairobi', 'Spas in Nairobi', 'Gardens in Nairobi'],
  alternates: {
    canonical: 'https://nairobi.life/other-destinations',
  },
  openGraph: {
    title: 'Other Destinations in Nairobi | Hidden Gems & Leisure',
    description: 'Discover more hidden gems, relaxation spots, and leisure activities in Nairobi.',
    url: 'https://nairobi.life/other-destinations',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Hidden Gems in Nairobi',
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
    title: 'Other Destinations in Nairobi | Hidden Gems & Leisure',
    description: 'Discover more hidden gems, relaxation spots, and leisure activities in Nairobi.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function DestinationsPage() {
    const items = otherDestinationsData.items.map(item => ({
        title: item.name,
        subtitle: item.category || 'Other Destinations',
        image: item.image,
        href: `/other-destinations/${item.slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`,
    }));

    const moreItems = otherDestinationsData.items.slice(0, 4).map(item => ({
        title: item.name,
        image: item.image,
        href: `/activities/${(item as any).slug || item.name.toLowerCase().replace(/ /g, '-')}`
    }));

  return (
    <DestinationsClientPage 
      heading={otherDestinationsData.heading || "Destinations"}
      description={otherDestinationsData.description}
      items={items}
      moreItems={moreItems}
    />
  );
}
