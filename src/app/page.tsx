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
  description: 'Discover Nairobi’s top experiences, from wildlife and culture to food tours, museums, and authentic local experiences.',
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nairobi.life/#organization",
        "name": "Life in Nairobi",
        "url": "https://nairobi.life/",
        "logo": "https://nairobi.life/favicon.ico",
        "description": "Official guide to Nairobi experiences including wildlife, culture, food tours, museums, and authentic local experiences.",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://nairobi.life/#website",
        "url": "https://nairobi.life/",
        "name": "Life in Nairobi",
        "description": "Discover Nairobi’s top experiences, from wildlife and culture to food tours, museums, and authentic local experiences.",
        "publisher": {
          "@id": "https://nairobi.life/#organization"
        },
        "inLanguage": "en"
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://nairobi.life/#destination",
        "name": "Nairobi",
        "url": "https://nairobi.life/",
        "description": "Discover Nairobi’s top experiences, from wildlife and culture to food tours, museums, and authentic local experiences.",
        "touristType": [
          "Nature Lovers",
          "Adventure Travelers",
          "Weekend Travelers",
          "Couples",
          "Groups"
        ],
        "containedInPlace": {
          "@type": "Place",
          "name": "Nairobi County, Kenya"
        },
        "mainEntityOfPage": {
          "@id": "https://nairobi.life/#website"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://nairobi.life/#experiences",
        "name": "Things to Do in Nairobi",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 5,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Best Things to Do in Nairobi",
            "url": "https://nairobi.life/best-things-to-do-in-nairobi/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Restaurants in Nairobi",
            "url": "https://nairobi.life/restaurants-in-nairobi/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Hotels in Nairobi",
            "url": "https://nairobi.life/hotels-in-nairobi/"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Golf Clubs in Nairobi",
            "url": "https://nairobi.life/golf-clubs-in-nairobi/"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Padel Courts in Nairobi",
            "url": "https://nairobi.life/padel-courts-in-nairobi/"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
