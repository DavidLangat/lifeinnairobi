import React from 'react';
import { Metadata } from 'next';
import CalendarClientPage from './CalendarClientPage';

export const metadata: Metadata = {
    title: 'Nairobi Events Calendar | Festivals, Hikes & Activities',
    description: 'Explore upcoming events in Nairobi: guided hikes, tea farm tours, festivals, and community gatherings. Plan your perfect weekend getaway in the Kenyan highlands.',
    keywords: ['Nairobi Events', 'Nairobi Calendar', 'Kenya Hiking', 'Tea Farm Tours', 'Nairobi Weekend Getaway', 'Nairobi Festivals', 'Community Events'],
    alternates: {
        canonical: 'https://nairobi.life/calendar',
    },
    openGraph: {
        title: 'Nairobi Events Calendar | Festivals, Hikes & Activities',
        description: 'Stay updated with the latest events, festivals, and community gatherings in the beautiful highlands of Nairobi.',
        url: 'https://nairobi.life/calendar',
        siteName: 'Life in Nairobi',
        images: [
            {
                url: 'v2/images/background.jpeg',
                width: 1200,
                height: 630,
                alt: 'Nairobi Events Calendar',
            },
        ],
        locale: 'en_US',
        type: 'website',
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
        title: 'Nairobi Events Calendar | Festivals, Hikes & Activities',
        description: 'Explore upcoming events in Nairobi: guided hikes, tea farm tours, and festivals.',
        images: ['v2/images/background.jpeg'],
    },
};

export default function CalendarPage() {
    return <CalendarClientPage />;
}
