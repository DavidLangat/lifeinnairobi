import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import restaurantData from '@/data/restaurant-data.json';
import RestaurantClientPage from './RestaurantClientPage';

interface RestaurantItem {
    name: string;
    slug: string;
    image: string;
    category: string;
    isActive: boolean;
    contentHtml: string;
}

export async function generateStaticParams() {
    return restaurantData.items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = restaurantData.items.find((i) => i.slug === slug);

    if (!item) {
        return {
            title: 'Restaurant Not Found | Nairobi',
            description: 'The requested restaurant could not be found.',
        };
    }

    return {
        title: `${item.name === "Como" || item.name === "Anza Nairobi" ? item.seo : item.name} | Places to Visit in Nairobi`,
        description: `Experience dining at ${item.name} in Nairobi. ${item.category} offering unique flavors and ambience.`,
        keywords: [item.name, 'Nairobi Restaurants', item.category, 'Dining in Limuru', 'Places to eat Nairobi'],
        alternates: {
            canonical: `https://nairobi.life/restaurants/${slug}`,
        },
        openGraph: {
            title: `${item.name === "Como" || item.name === "Anza Nairobi" ? item.seo : item.name} | Places to Visit in Nairobi`,
            description: `Experience dining at ${item.name} in Nairobi.`,
            url: `https://nairobi.life/restaurants/${slug}`,
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
            description: `Experience dining at ${item.name} in Nairobi.`,
            images: [item.image],
        },
    };
}

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Find item by slug or fallback logical match if data structure differs slightly
    const item = restaurantData.items.find((i) => i.slug === slug) as unknown as RestaurantItem | undefined;

    if (!item) {
        return notFound();
    }

    // Use contentHtml if available, otherwise fallback
    const content = item.contentHtml;

    if (!content) {
        return notFound();
    }

    const relatedRestaurants = restaurantData.items
                        .filter(i => i.slug !== slug)
                        .slice(0, 4)
                        .map(i => ({
                            title: i.name,
                            image: i.image,
                            href: `/restaurants/${i.slug}`
                        }));

    return <RestaurantClientPage item={item} relatedRestaurants={relatedRestaurants} />;
}
