import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import data from '@/data/padel-data.json';
import CategoryClientPage from '@/components/CategoryClientPage';

interface ItemType {
    name: string;
    slug: string;
    image: string;
    category: string;
    isActive?: boolean;
    contentHtml: string;
    seo?: string;
}

export async function generateStaticParams() {
    return data.items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = data.items.find((i) => i.slug === slug);

    if (!item) {
        return {
            title: 'Not Found | Nairobi',
            description: 'The requested page could not be found.',
        };
    }

    const titleStr = item.seo ? item.seo : item.name;

    return {
        title: `${titleStr} | Places to Visit in Nairobi`,
        description: `Experience ${item.name} in Nairobi. ${item.category}`,
        keywords: [item.name, 'Nairobi', item.category, 'Limuru'],
        alternates: {
            canonical: `https://nairobi.life/padel/${slug}`,
        },
        openGraph: {
            title: `${titleStr} | Places to Visit in Nairobi`,
            description: `Experience ${item.name} in Nairobi.`,
            url: `https://nairobi.life/padel/${slug}`,
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
            description: `Experience ${item.name} in Nairobi.`,
            images: [item.image],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const item = data.items.find((i) => i.slug === slug) as unknown as ItemType | undefined;

    if (!item) {
        return notFound();
    }

    const content = item.contentHtml;

    if (!content) {
        return notFound();
    }

    const relatedItems = data.items
                        .filter(i => i.slug !== slug)
                        .slice(0, 4)
                        .map(i => ({
                            title: i.name,
                            image: i.image,
                            href: `/padel/${i.slug}`
                        }));

    return <CategoryClientPage 
              item={item} 
              relatedItems={relatedItems} 
              basePath="/padel" 
              categoryName="Padel" 
           />;
}
