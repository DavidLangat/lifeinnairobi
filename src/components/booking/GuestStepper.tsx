'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface GuestStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export default function GuestStepper({ value, onChange, min = 1, max = 20 }: GuestStepperProps) {
    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    return (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2 px-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Guests</span>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleDecrement}
                    disabled={value <= min}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Minus className="w-4 h-4" />
                </button>

                <span className="w-4 text-center font-bold text-gray-900 text-lg">{value}</span>

                <button
                    onClick={handleIncrement}
                    disabled={value >= max}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0B0B0B] text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
