import React from 'react';
import { Metadata } from 'next';
import data from '@/data/golf-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Where to Golf in Nairobi | Best Golf Courses & Clubs',
  description: 'Explore the finest golf courses and country clubs across Nairobi for an unforgettable golfing experience.',
  keywords: ['Where to Golf in Nairobi', 'Nairobi Golf Courses', 'Best Golf Clubs Nairobi', 'Golfing in Nairobi', 'Nairobi Country Clubs'],
  alternates: {
    canonical: 'https://nairobi.life/golf',
  },
  openGraph: {
    title: 'Where to Golf in Nairobi | Best Golf Courses & Clubs',
    description: 'Explore the finest golf courses and country clubs across Nairobi for an unforgettable golfing experience.',
    url: 'https://nairobi.life/golf',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Where to Golf in Nairobi',
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
    title: 'Where to Golf in Nairobi | Finest Clubs & Resorts',
    description: 'Explore the finest golf courses and country clubs across Nairobi for an unforgettable golfing experience.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function GolfPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Golf',
    image: item.image,
    href: `/golf/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Where to Golf in Nairobi"}
      breadcrumb="Golf"
      description={data.description}
      items={items}
    />
  );
}
