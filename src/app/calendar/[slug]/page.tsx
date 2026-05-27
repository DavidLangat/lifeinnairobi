import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventClientPage from './EventClientPage';
import calendarData from '@/data/calendar-data.json';

type CalendarEvent = (typeof calendarData.items)[number];
type CalendarEventForPage = Omit<CalendarEvent, 'short_description' | 'full_description' | 'key_details'> & {
    shortDescription: string;
    fullDescription: string;
    keyDetails: CalendarEvent['key_details'];
};

export const dynamicParams = false;

function normalizeCalendarSlug(slug: string) {
    return slug.replace(/-\d{4}-\d{2}-\d{2}$/, '');
}

// Force static generation for all known slugs
export async function generateStaticParams() {
    const uniqueSlugs = Array.from(
        new Set((calendarData.items || []).map((item) => normalizeCalendarSlug(item.slug)))
    );

    return uniqueSlugs.map((slug) => ({ slug }));
}

async function getEvent(slug: string) {
    const event = (calendarData.items || []).find(
        (item) => normalizeCalendarSlug(item.slug) === slug
    );
    if (!event) return null;
    return {
        ...event,
        shortDescription: event.short_description,
        fullDescription: event.full_description,
        keyDetails: event.key_details,
    } as CalendarEventForPage;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) {
        return {
            title: 'Event Not Found | Nairobi',
            description: 'The requested event could not be found.',
        };
    }

    return {
        title: `${event.name} | Nairobi Events`,
        description: event.shortDescription,
        keywords: [event.name, 'Nairobi Events', 'Hiking in Kenya', 'Nairobi Activities', 'Tea Farm Tours'],
        alternates: {
            canonical: `https://nairobi.life/calendar/${slug}`,
        },
        openGraph: {
            title: `${event.name} | Nairobi Events`,
            description: event.shortDescription,
            url: `https://nairobi.life/calendar/${slug}`,
            images: [
                {
                    url: event.image,
                    width: 1200,
                    height: 630,
                    alt: event.name,
                },
            ],
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
            title: event.name,
            description: event.shortDescription,
            images: [event.image],
        },
    };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) {
        notFound();
    }

    return <EventClientPage event={event} />;
}
