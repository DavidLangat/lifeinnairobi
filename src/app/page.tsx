import React from 'react';
import { Metadata } from 'next';
import HomeClientPage from './HomeClientPage';
import favoriteDestinationsData from '@/data/favorite-destinations.json';
import otherDestinationsData from '@/data/other-destinations.json';
import restaurantData from '@/data/restaurant-data.json';
import eatData from '@/data/eat-data.json';
import golfData from '@/data/golf-data.json';
import padelData from '@/data/padel-data.json';
import shopData from '@/data/shop-data.json';
import stayData from '@/data/stay-data.json';
import partyData from '@/data/party-data.json';
import hotelData from '@/data/hotel-data.json';

export const metadata: Metadata = {
  title: 'Discover things to do in Nairobi | Visit Nairobi',
  description: 'Discover lush tea farms, scenic hiking and e-bike trails, farmhouse restaurants, and peaceful retreats just outside Nairobi.',
  keywords: ['Nairobi Kenya', 'Visit Nairobi', 'Things to do in Nairobi', 'Limuru Tea Farms', 'Weekend Getaway Nairobi', 'Hiking Nairobi', 'E-biking Nairobi', 'Cycling Nairobi', 'Restaurants in Nairobi'],
  alternates: {
    canonical: 'https://nairobi.life',
  },
  openGraph: {
    title: 'Discover things to do in Nairobi | Visit Nairobi',
    description: 'Experience the serenity of Nairobi with our curated guide to tea farms, hikes, e-bike trails, and hidden gems.',
    url: 'https://nairobi.life',
    siteName: 'Life in Nairobi',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Discover things to do in Nairobi | Visit Nairobi',
      },
    ],
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover things to do in Nairobi | Visit Nairobi',
    description: 'Experience the serenity of Nairobi with our curated guide to tea farms, hikes, e-bike trails, and hidden gems.',
    images: ['v2/images/background.jpeg'],
    creator: '', // Adjust if known
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
};

export default function Home() {
  return (
    <HomeClientPage 
      restaurantData={restaurantData}
      favoriteDestinationsData={favoriteDestinationsData}
      otherDestinationsData={otherDestinationsData}
      stayData={stayData}
      eatData={eatData}
      golfData={golfData}
      padelData={padelData}
      shopData={shopData}
      partyData={partyData}
      hotelData={hotelData}
    />
  );
}
