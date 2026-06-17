import React from 'react';
import { Metadata } from 'next';
import aboutData from '@/data/about-data.json';
import AboutClientPage from './AboutClientPage';

export const metadata: Metadata = {
  title: 'About Nairobi | History, Tea Farms & Highland Charm',
  description: 'Learn about Nairobi, a lush highland region known for its tea estates, colonial history, and serene landscapes just outside Nairobi.',
  keywords: ['About Nairobi', 'History of Nairobi', 'Tea Farms Kenya', 'Nairobi Limuru', 'Highland Region Kenya'],
  alternates: {
    canonical: 'https://nairobi.life/about-nairobi',
  },
  openGraph: {
    title: 'About Nairobi | History, Tea Farms & Highland Charm',
    description: 'Learn about Nairobi, a lush highland region known for its tea estates, colonial history, and serene landscapes.',
    url: 'https://nairobi.life/about-nairobi',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'About Nairobi',
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
    title: 'About Nairobi | History, Tea Farms & Highland Charm',
    description: 'Learn about Nairobi, a lush highland region known for its tea estates, colonial history, and serene landscapes.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function AboutPage() {
  const { header } = aboutData;

  return (
    <AboutClientPage header={header} />
  );
}
