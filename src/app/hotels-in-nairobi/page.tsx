import React from 'react';
import { Metadata } from 'next';
import data from '@/data/hotel-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Hotels in Nairobi | Places to stay in Nairobi',
  description: 'Explore the best hotels and accommodation options in Nairobi, from luxury hotels to budget-friendly stays.',
  keywords: ['Where to Stay in Nairobi', 'Nairobi Hotels', 'Accommodation Nairobi', 'Hotels in Nairobi', 'Nairobi Accommodation'],
  alternates: {
    canonical: 'https://nairobi.life/hotel',
  },
  openGraph: {
    title: 'Hotels in Nairobi | Places to stay in Nairobi',
    description: 'Explore the best hotels and accommodation options in Nairobi, from luxury hotels to budget-friendly stays.',
    url: 'https://nairobi.life/hotel',
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
    title: 'Hotels in Nairobi | Places to stay in Nairobi',
    description: 'Explore the best hotels and accommodation options in Nairobi, from luxury hotels to budget-friendly stays.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function HotelPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Hotel',
    image: item.image,
    href: `/hotels-in-nairobi/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Hotels in Nairobi"}
      breadcrumb="Hotels in Nairobi"
      description={data.description}
      items={items}
    />
  );
}
