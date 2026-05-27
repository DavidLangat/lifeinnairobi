'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ItineraryItem {
    title: string;
    description: string;
}

interface ItineraryAccordionProps {
    itinerary: ItineraryItem[];
}

export default function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!itinerary || itinerary.length === 0) return null;

    return (
        <div className="mb-4 overflow-hidden last:border-0 transition-shadow duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between pb-4 text-left group"
            >
                {/* Match style with HTMLContentAccordion header */}
                <h3 className="text-2xl font-serif text-background font-medium m-0 transition-colors">
                    Itinerary
                </h3>

                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-background text-primary' : 'text-background group-hover:text-accent'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className="transition-all duration-300 ease-in-out">
                    <div className="pb-6 pt-2">
                        <div className="space-y-6 relative border-l-2 border-background ml-3 pl-8">
                            {itinerary.map((item, idx) => (
                                <div key={idx} className="relative">
                                    <span className="absolute -left-[41px] top-0 bg-background text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white">
                                        {idx + 1}
                                    </span>
                                    <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                                    <p className="text-gray-600 whitespace-pre-line ">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
