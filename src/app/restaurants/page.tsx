import React from 'react';
import { Metadata } from 'next';
import restaurantData from '@/data/restaurant-data.json';
import RestaurantsClientPage from './RestaurantsClientPage';

export const metadata: Metadata = {
  title: 'Restaurants in Nairobi | Places to Visit in Nairobi',
  description: 'Discover the best restaurants in Nairobi. Enjoy farm-to-table dining, scenic cafes, and unique culinary experiences in the tea highlands.',
  keywords: ['Restaurants in Nairobi', 'Places to eat Nairobi', 'Nairobi Cafes', 'Farm to Table Kenya', 'Nairobi Weekend Dining'],
  alternates: {
    canonical: 'https://nairobi.life/restaurants',
  },
  openGraph: {
    title: 'Restaurants in Nairobi | Best Dining & Farm-to-Table',
    description: 'Discover the best restaurants in Nairobi. Enjoy farm-to-table dining, scenic cafes, and unique culinary experiences.',
    url: 'https://nairobi.life/restaurants',
    type: 'website',
    images: [
      {
        url: 'v2/images/background.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dining in Nairobi',
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
    title: 'Restaurants in Nairobi | Places to Visit in Nairobi',
    description: 'Discover the best restaurants in Nairobi. Enjoy farm-to-table dining and scenic cafes.',
    images: ['v2/images/background.jpeg'],
  },
};

export default function RestaurantsPage() {
  const restaurants = restaurantData.items.map(item => ({
    title: item.name,
    subtitle: item.category || 'Restaurant',
    image: item.image,
    href: `/restaurants/${item.slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`
  }));

  return (
    <RestaurantsClientPage 
      heading={restaurantData.heading || "Restaurants in Nairobi"}
      description={restaurantData.description}
      restaurants={restaurants}
    />
  );
}
