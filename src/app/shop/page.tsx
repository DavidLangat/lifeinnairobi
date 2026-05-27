import React from 'react';
import { Metadata } from 'next';
import data from '@/data/shop-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Where to Shop in Nairobi | Shopping Malls & Markets',
  description: 'Explore the best shopping spots in Nairobi, from modern malls with global brands to vibrant local artisan markets.',
  keywords: ['Where to Shop in Nairobi', 'Nairobi Malls', 'Artisan Markets Nairobi', 'Shopping in Nairobi', 'Nairobi Gift Shops'],
  alternates: {
    canonical: 'https://nairobi.life/shop',
  },
  openGraph: {
    title: 'Where to Shop in Nairobi | Shopping Malls & Markets',
    description: 'Explore the best shopping spots in Nairobi, from modern malls with global brands to vibrant local artisan markets.',
    url: 'https://nairobi.life/shop',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Where to Shop in Nairobi',
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
