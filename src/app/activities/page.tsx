import { Metadata } from 'next';
import React from 'react';
import destinationsData from '@/data/destinations-data.json';
import ActivitiesClientPage from './ActivitiesClientPage';

export const metadata: Metadata = {
    title: 'Activities in Nairobi | Things to do in Nairobi',
    description: 'Discover the best activities in Nairobi, from tea farm tours and e-bike rides to hikes and custom experiences. Plan your perfect Nairobi escape.',
    keywords: ['Activities in Nairobi', 'Nairobi Experiences', 'Hiking in Nairobi', 'Tea Farm Tours', 'E-bike Tours Kenya', 'Day Trips from Nairobi'],
    alternates: {
        canonical: 'https://nairobi.life/activities',
    },
    openGraph: {
        title: 'Activities in Nairobi | Things to do in Nairobi',
        description: 'Discover the best activities in Nairobi, from tea farm tours and e-bike rides to hikes and custom experiences.',
        url: 'https://nairobi.life/activities',
        type: 'website',
        images: [
            {
                url: 'v2/images/background.jpeg',
                width: 1200,
                height: 630,
                alt: 'Activities in Nairobi',
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
        title: 'Activities in Nairobi | Best Things to Do & Experiences',
        description: 'Discover the best activities in Nairobi, from tea farm tours and e-bike rides to hikes and custom experiences.',
        images: ['v2/images/background.jpeg'],
    },
};

export default function ActivitiesPage() {
    const activities = destinationsData.items.map(item => ({
        title: item.name,
        subtitle: item.shortDescription || 'Experience Nairobi',
        image: item.image,
        href: `/activities/${(item as any).slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`
    }));

    return (
       <ActivitiesClientPage 
            heading={destinationsData.heading || "Activities in Nairobi"} 
            description={destinationsData.description}
            activities={activities}
       />
    );
}
