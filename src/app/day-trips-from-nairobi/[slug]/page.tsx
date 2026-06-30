import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import featureData from '@/data/destination-feature-data.json';
import TripDetailClientPage from './TripDetailClientPage';

export const metadata: Metadata = {
    title: 'Trip Details | Nairobi Life',
    description: 'Discover more about this trip from Nairobi.',
};

export function generateStaticParams() {
    return featureData.map((trip: any) => ({
        slug: trip.slug,
    }));
}

export default async function TripDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = params.slug;
    const trip = featureData.find((t: any) => t.slug === slug);

    if (!trip) {
        notFound();
    }

    return <TripDetailClientPage trip={trip} />;
}
