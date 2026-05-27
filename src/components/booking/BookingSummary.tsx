'use client';

import React from 'react';
import { ResidencyStatus, BookingPriceConfig } from '@/lib/types';
import { Calendar, Clock, User, CheckCircle2 } from 'lucide-react';

interface BookingSummaryProps {
    date: string;
    time: string;
    guestCounts: Record<ResidencyStatus, number>;
    pricing: BookingPriceConfig; // Need pricing to calculate breakdown display
    total: number;
}

export default function BookingSummary({ date, time, guestCounts, pricing, total }: BookingSummaryProps) {
    // Format date nicely
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    const residencyLabel: Record<ResidencyStatus, string> = {
        citizen: 'Citizen',
        resident: 'Resident',
        nonResident: 'Non-Resident',
    };

    const totalGuests = Object.values(guestCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="bg-secondary rounded-xl p-5 space-y-4  shadow-lg shadow-background/5 relative overflow-hidden">
            {/* Decorative */}
            {/* <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full -mr-4 -mt-4"></div> */}

            <h4 className=" font-bold text-lg text-background flex items-center gap-2 relative z-10">
                {/* <CheckCircle2 className="w-5 h-5 text-accent" /> */}
                Booking Summary
            </h4>

            <div className="space-y-3 text-sm text-gray-600 relative z-10">
                <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-medium text-background font-sans">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-medium text-background font-sans">{time}</span>
                </div>

                <div className="pt-3 border-t border-background/10 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-accent" />
                        <span className="font-bold text-background font-sans">{totalGuests} Guests</span>
                    </div>

                    {/* Breakdown */}
                    {(Object.entries(guestCounts) as [ResidencyStatus, number][]).map(([type, count]) => {
                        if (count === 0) return null;
                        const subtotal = count * pricing[type];
                        return (
                            <div key={type} className="flex justify-between text-xs ml-6 font-sans">
                                <span className="text-gray-600">{count}x {residencyLabel[type]} <span className="text-gray-400">(@ {pricing[type].toLocaleString()})</span></span>
                                <span className="font-medium text-background">KSh {subtotal.toLocaleString()}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="pt-3 border-t border-background/10 flex justify-between items-end relative z-10">
                <div className="text-xl text-background capitalize tracking-wider font-bold">
                    Total Due
                </div>
                <div className="text-xl font-bold text-background ">
                    KSh {total.toLocaleString()}
                </div>
            </div>
        </div>
    );
}
