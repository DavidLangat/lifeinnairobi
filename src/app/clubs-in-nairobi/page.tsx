import React from 'react';
import { Metadata } from 'next';
import data from '@/data/party-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Clubs in Nairobi | Where to Party in Nairobi',
  description: 'Explore the best party spots in Nairobi, from clubs to bars and lounges.',
  keywords: ['Where to Party in Nairobi', 'Nairobi Clubs', 'Bars in Nairobi', 'Party in Nairobi', 'Nairobi Party Spots'],
  alternates: {
    canonical: 'https://nairobi.life/clubs-in-nairobi',
  },
  openGraph: {
    title: 'Clubs in Nairobi | Where to Party in Nairobi',
    description: 'Explore the best party spots in Nairobi, from clubs to bars and lounges.',
    url: 'https://nairobi.life/clubs-in-nairobi',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Where to Party in Nairobi',
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
    title: 'Clubs in Nairobi | Where to Party in Nairobi',
    description: 'Explore the best party spots in Nairobi, from clubs to bars and lounges.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function PartyPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Party',
    image: item.image,
    href: `/clubs-in-nairobi/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Where to Party in Nairobi"}
      breadcrumb="Clubs in Nairobi"
      description={data.description}
      items={items}
    />
  );
}
