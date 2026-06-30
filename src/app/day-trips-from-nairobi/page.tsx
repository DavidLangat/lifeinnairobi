import { Metadata } from 'next';
import React from 'react';
import destinationsData from '@/data/bestthings-data.json';
import DayTripClientPage from './DayTripClientPage';

export const metadata: Metadata = {
    title: 'Day Trips from Nairobi | Things to do in Nairobi',
    description: 'Discover the best day trips from Nairobi, from safaris and tea farms to Naivasha, Amboseli, and Tigoni weekend getaways and tours.',
    keywords: ['Day Trips from Nairobi', 'Weekend Getaways Nairobi', 'Nairobi Safaris', 'Tea Farm Tours', 'Naivasha Day Trip', 'Amboseli Tours', 'Tigoni Getaways'],
    alternates: {
        canonical: 'https://nairobi.life/day-trips-from-nairobi',
    },
    openGraph: {
        title: 'Day Trips from Nairobi | Things to do in Nairobi',
        description: 'Discover the best day trips from Nairobi, from safaris and tea farms to Naivasha, Amboseli, and Tigoni weekend getaways and tours.',
        url: 'https://nairobi.life/day-trips-from-nairobi',
        type: 'website',
        images: [
            {
                url: 'v2/images/background.jpeg',
                width: 1200,
                height: 630,
                alt: 'Day Trips from Nairobi',
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
        title: 'Day Trips from Nairobi | Things to do in Nairobi',
        description: 'Discover the best day trips from Nairobi, from safaris and tea farms to Naivasha, Amboseli, and Tigoni weekend getaways and tours.',
        images: ['v2/images/background.jpeg'],
    },
};

export default function ActivitiesPage() {
    const activities = destinationsData.items.map(item => ({
        title: item.name,
        subtitle: item.shortDescription || 'Experience Nairobi',
        image: item.image,
        href: `/${(item as any).slug || item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`
    }));

    return (
       <DayTripClientPage 
            heading={destinationsData.heading || "Activities in Nairobi"} 
            description={destinationsData.description}
            activities={activities}
       />
    );
}
