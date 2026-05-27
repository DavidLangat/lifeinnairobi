'use client';

import React from 'react';
import { ResidencyStatus } from '@/lib/types';

interface ResidentSelectorProps {
    selected: ResidencyStatus;
    onChange: (status: ResidencyStatus) => void;
}

export default function ResidentSelector({ selected, onChange }: ResidentSelectorProps) {
    const options: { value: ResidencyStatus; label: string }[] = [
        { value: 'citizen', label: 'Citizen' },
        { value: 'resident', label: 'Resident' },
        { value: 'nonResident', label: 'Non-Res' },
    ];

    return (
        <div className="bg-gray-100 p-1 rounded-lg flex w-full">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${selected === option.value
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
