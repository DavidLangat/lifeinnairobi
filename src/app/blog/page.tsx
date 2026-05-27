import React from 'react';
import type { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';

export const metadata: Metadata = {
  title: "Journal & Stories | Things to do in Nairobi",
  description: "Read our latest stories, travel tips, and hidden gems from the heart of Nairobi. Discover the best hiking trails, tea farm tours, and local experiences.",
  keywords: ["Nairobi Blog", "Nairobi Travel Stories", "Kenya Travel Guide", "Tea Farm Stories", "Limuru Hidden Gems"],
  alternates: {
    canonical: 'https://nairobi.life/blog',
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
  openGraph: {
    title: "Journal & Stories | Nairobi Guide",
    description: "Read our latest stories, travel tips, and hidden gems from the heart of Nairobi.",
    url: "https://nairobi.life/blog",
    images: ["https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/background.jpeg"],
  },
};

export default function BlogPage() {
  return <BlogClientPage />;
}
