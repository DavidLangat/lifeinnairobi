import React from 'react';
import { Metadata } from 'next';
import data from '@/data/eat-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Restaurants in Nairobi | Places to eat in Nairobi',
  description: 'Discover the best restaurants and culinary experiences in Nairobi, from fine dining to vibrant local eateries.',
  keywords: ['Where to Eat in Nairobi', 'Nairobi Restaurants', 'Best Dining Nairobi', 'Nairobi Food Guide', 'Restaurants in Westlands'],
  alternates: {
    canonical: 'https://nairobi.life/restaurants-in-nairobi',
  },
  openGraph: {
    title: 'Restaurants in Nairobi | Places to eat in Nairobi',
    description: 'Discover the best restaurants and culinary experiences in Nairobi, from fine dining to vibrant local eateries.',
    url: 'https://nairobi.life/restaurants-in-nairobi',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Where to Eat in Nairobi',
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
    title: 'Where to Eat in Nairobi | Top Restaurants & Cafes',
    description: 'Discover the best restaurants and culinary experiences in Nairobi, from fine dining to vibrant local eateries.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function EatPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Dining',
    image: item.image,
    href: `/restaurants-in-nairobi/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Where to Eat in Nairobi"}
      breadcrumb="Restaurants in Nairobi"
      description={data.description}
      items={items}
    />
  );
}
