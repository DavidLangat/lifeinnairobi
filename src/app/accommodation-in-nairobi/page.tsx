import React from 'react';
import { Metadata } from 'next';
import data from '@/data/stay-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Accommodation in Nairobi | Places to stay in Nairobi',
  description: 'Discover top-rated accommodations offering comfort, style, and exceptional hospitality for your next trip to Nairobi. Find your perfect getaway.',
  keywords: ['Where to Stay in Nairobi', 'Nairobi Hotels', 'Cottages Nairobi', 'Nairobi Retreats', 'Vacation Rentals Limuru'],
  alternates: {
    canonical: 'https://nairobi.life/accommodation-in-nairobi',
  },
  openGraph: {
    title: 'Accommodation in Nairobi | Places to stay in Nairobi',
    description: 'Discover top-rated accommodations offering comfort, style, and exceptional hospitality for your next trip to Nairobi.',
    url: 'https://nairobi.life/accommodation-in-nairobi',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Where to Stay in Nairobi',
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
    title: 'Accommodation in Nairobi | Places to stay in Nairobi',
    description: 'Discover top-rated accommodations offering comfort, style, and exceptional hospitality for your next trip to Nairobi.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function StayPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Stays',
    image: item.image,
    href: `/accommodation-in-nairobi/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Accommodation in Nairobi"}
      breadcrumb="Accommodation in Nairobi"
      description={data.description}
      items={items}
    />
  );
}
