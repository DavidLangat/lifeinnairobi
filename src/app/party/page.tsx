import React from 'react';
import { Metadata } from 'next';
import data from '@/data/party-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Where to Party in Nairobi | Party Spots in Nairobi',
  description: 'Explore the best party spots in Nairobi, from clubs to bars and lounges.',
  keywords: ['Where to Party in Nairobi', 'Nairobi Clubs', 'Bars in Nairobi', 'Party in Nairobi', 'Nairobi Party Spots'],
  alternates: {
    canonical: 'https://nairobi.life/party',
  },
  openGraph: {
    title: 'Where to Party in Nairobi | Party Spots in Nairobi',
    description: 'Explore the best party spots in Nairobi, from clubs to bars and lounges.',
    url: 'https://nairobi.life/party',
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
    title: 'Where to Shop in Nairobi | Best Malls & Markets',
    description: 'Explore the best shopping spots in Nairobi, from modern malls with global brands to vibrant local artisan markets.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function ShopPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Shopping',
    image: item.image,
    href: `/shop/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Where to Shop in Nairobi"}
      breadcrumb="Shop"
      description={data.description}
      items={items}
    />
  );
}
