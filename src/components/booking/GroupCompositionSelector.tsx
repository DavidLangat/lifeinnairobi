'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { BookingPriceConfig, ResidencyStatus } from '@/lib/types';

interface GroupCompositionSelectorProps {
    counts: Record<ResidencyStatus, number>;
    onChange: (counts: Record<ResidencyStatus, number>) => void;
    pricing: BookingPriceConfig;
    maxTotal?: number;
}

export default function GroupCompositionSelector({ counts, onChange, pricing, maxTotal = 20 }: GroupCompositionSelectorProps) {
    const totalPeople = Object.values(counts).reduce((a, b) => a + b, 0);

    const handleIncrement = (type: ResidencyStatus) => {
        if (totalPeople < maxTotal) {
            onChange({
                ...counts,
                [type]: counts[type] + 1
            });
        }
    };

    const handleDecrement = (type: ResidencyStatus) => {
        if (counts[type] > 0) {
            onChange({
                ...counts,
                [type]: counts[type] - 1
            });
        }
    };

    const residencyLabels: Record<ResidencyStatus, string> = {
        citizen: 'Citizen',
        resident: 'Resident',
        nonResident: 'Non-Resident'
    };

    return (
        <div className="space-y-4">
            {(Object.keys(pricing) as ResidencyStatus[]).map((type) => (
                <div key={type} className="flex items-center justify-between bg-secondary  rounded-xl p-3 px-4 shadow-sm shadow-secondary">
                    <div
                        className="flex items-center gap-2"
                    >
                        <span className="block text-sm font-bold text-background font-serif tracking-wide">{residencyLabels[type]}</span>
                        <span className="text-xs text-accent font-medium">KSh {pricing[type].toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleDecrement(type)}
                            disabled={counts[type] <= 0}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary border border-primary text-background hover:bg-accent hover:border-background/20 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label={`Decrease ${residencyLabels[type]} count`}
                        >
                            <Minus className="w-4 h-4" />
                        </button>

                        <span className="w-6 text-center font-bold text-gray-900 text-lg tabular-nums font-serif">{counts[type]}</span>

                        <button
                            onClick={() => handleIncrement(type)}
                            disabled={totalPeople >= maxTotal}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-background text-white hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            aria-label={`Increase ${residencyLabels[type]} count`}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}

            {totalPeople >= maxTotal && (
                <p className="text-xs text-amber-600 text-center mt-2">Maximum group size reached.</p>
            )}
        </div>
    );
}
