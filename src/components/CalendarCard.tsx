'use client';

import React from 'react';
// import Image from 'next/image';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface CalendarCardProps {
    item: {
        name: string;
        date: string;
        location: string;
        price: number;
        image: string;
        shortDescription: string;
        slug: string;
        type?: string;
    };
}

export default function CalendarCard({ item }: CalendarCardProps) {
    const eventDate = new Date(item.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });
    const normalizedSlug = item.slug.replace(/-\d{4}-\d{2}-\d{2}$/, '');
    const eventHref = item.type === 'ebike-tours'
        ? '/activities/ebike-tours'
        : `/calendar/${normalizedSlug}?date=${encodeURIComponent(item.date)}`;

    return (
        <Link
            href={eventHref}
            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer block"
        >
            {/* Background Image */}
            <Image
                // 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300" />

            {/* Date Badge */}
            <div className="absolute top-3 left-3 z-20 flex flex-col opacity-90 ">
                <span className="text-[11px] font-serif font-bold leading-none w-[62.5px] bg-background text-primary text-center p-4 pt-3 pb-1.5 rounded-t-2xl">{month}</span>
                <span className="text-xl uppercase font-bold w-[62.5px] bg-primary text-background text-center p-5 pt-1.5 pb-1 rounded-b-2xl font-serif">{day}</span>
            </div>

            {/* Content Container */}
            <h3 className="text-primary font-serif text-3xl mb-2 tracking-wide text-shadow-sm absolute bottom-14 left-8 right-8 line-clamp-2">
                {item.name}
            </h3>

            <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pb-2 max-w-[85%]">
                    <div className="flex w-full items-start gap-2 text-primary/70 text-xs font-medium uppercase tracking-widest">
                        <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{item.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
