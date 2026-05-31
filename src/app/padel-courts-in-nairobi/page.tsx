import React from 'react';
import { Metadata } from 'next';
import data from '@/data/padel-data.json';
import CategoryListClientPage from '@/components/CategoryListClientPage';

export const metadata: Metadata = {
  title: 'Padel courts in Nairobi | Things to do in Nairobi',
  description: 'Discover the premier padel courts and clubs in Nairobi. Join the fastest growing sport with our curated venues.',
  keywords: ['Where to Play Padel in Nairobi', 'Nairobi Padel Courts', 'Best Padel Clubs Nairobi'],
  alternates: {
    canonical: 'https://nairobi.life/padel-courts-in-nairobi',
  },
  openGraph: {
    title: 'Padel courts in Nairobi | Things to do in Nairobi',
    description: 'Discover the premier padel courts and clubs in Nairobi. Join the fastest growing sport with our curated venues.',
    url: 'https://nairobi.life/padel-courts-in-nairobi',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Where to Play Padel in Nairobi',
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
    title: 'Where to Play Padel in Nairobi | Premier Courts & Clubs',
    description: 'Discover the premier padel courts and clubs in Nairobi. Join the fastest growing sport with our curated venues.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function PadelPage() {
  const items = data.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Padel',
    image: item.image,
    href: `/padel-courts-in-nairobi/${item.slug}`,
  }));

  return (
    <CategoryListClientPage
      heading={data.heading || "Where to Play Padel in Nairobi"}
      breadcrumb="Padel"
      description={data.description}
      items={items}
    />
  );
}
