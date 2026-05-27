import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import destinationsData from '@/data/favorite-destinations.json';
import AccommodationDetailClientPage from './AccommodationDetailClientPage';

interface DestinationItem {
    name: string;
    slug: string;
    image: string;
    category: string;
    isActive: boolean;
    contentHtml: string;
    contentHtml2?: string;
    gallery?: (string | { src: string; alt?: string; attribution?: string })[];
}

export async function generateStaticParams() {
    return destinationsData.items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = destinationsData.items.find((i) => i.slug === slug);

    if (!item) {
        return {
            title: 'Accommodation Not Found | Nairobi',
            description: 'The requested accommodation could not be found.',
        };
    }

    return {
        title: `${item.name === "Siri" || item.name === "Siri Mitini" ? item.seo : item.name} | Places to Visit in Nairobi`,
        description: `Stay at ${item.name} in Nairobi. ${item.category} offering comfort, scenic views, and exceptional hospitality.`,
        keywords: [item.name, 'Nairobi Accommodation', item.category, 'Limuru Stays', 'Vacation Rentals Kenya'],
        alternates: {
            canonical: `https://nairobi.life/accommodation/${slug}`,
        },
        openGraph: {
            title: `${item.name === "Siri" || item.name === "Siri Mitini" ? item.seo : item.name} | Places to Visit in Nairobi`,
            description: `Stay at ${item.name} in Nairobi.`,
            url: `https://nairobi.life/accommodation/${slug}`,
            type: 'website',
            images: [
                {
                    url: item.image,
                    width: 1200,
                    height: 630,
                    alt: item.name,
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
            title: item.name,
            description: `Stay at ${item.name} in Nairobi.`,
            images: [item.image],
        },
    };
}

export default async function AccommodationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const item = destinationsData.items.find((i) => i.slug === slug) as unknown as DestinationItem | undefined;

    if (!item) {
        return notFound();
    }

    // Use contentHtml if available, otherwise fallback
    const content = item.contentHtml;

    if (!content) {
        return notFound();
    }

    const relatedAccommodations = destinationsData.items
                        .filter(i => i.slug !== slug)
                        .slice(0, 4)
                        .map(i => ({
                            title: i.name,
                            image: i.image,
                            href: `/accommodation/${i.slug}`
                        }));

    return <AccommodationDetailClientPage item={item} relatedAccommodations={relatedAccommodations} />;
}
