'use client';

import React from 'react';
import { TimeSlot } from '@/lib/types';
import { Clock } from 'lucide-react';

interface TimeSlotPickerProps {
    slots: TimeSlot[];
    selectedTime: string | null;
    onChange: (time: string) => void;
    isLoading?: boolean;
    hasError?: boolean;
}

export default function TimeSlotPicker({ slots, selectedTime, onChange, isLoading = false, hasError = false }: TimeSlotPickerProps) {
    if (isLoading) {
        return (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-24 bg-gray-100 rounded-full animate-pulse shrink-0" />
                ))}
            </div>
        );
    }

    if (slots.length === 0) {
        return (
            <div className="text-gray-500 text-sm italic flex items-center gap-2">
                <Clock className="w-4 h-4" /> No slots available for this date.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {hasError && (
                <style>{`
                    @keyframes shake-slot {
                        0%, 100% { transform: translateX(0); }
                        15%  { transform: translateX(-6px); }
                        30%  { transform: translateX(6px); }
                        45%  { transform: translateX(-4px); }
                        60%  { transform: translateX(4px); }
                        75%  { transform: translateX(-2px); }
                        90%  { transform: translateX(2px); }
                    }
                    .slot-btn-shake {
                        animation: shake-slot 0.55s ease-in-out;
                    }
                `}</style>
            )}
            <span className="font-bold uppercase tracking-wider text-[#5B8563] font-sans">Select Time</span>
            <div className="flex flex-wrap gap-2 pt-5 justify-between">
                {slots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    const isSoldOut = slot.status === 'SOLD_OUT';
                    const showError = hasError && !isSelected && !isSoldOut;

                    return (
                        <button
                            key={slot.time}
                            onClick={() => !isSoldOut && onChange(slot.time)}
                            disabled={isSoldOut}
                            className={`
                px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center gap-2 font-sans
                ${showError ? 'slot-btn-shake' : ''}
                ${isSelected
                                    ? 'bg-[#37593E] text-[#FFFAD8] border-[#37593E] shadow-md transform scale-105 font-bold'
                                    : isSoldOut
                                        ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed line-through'
                                        : showError
                                            ? 'bg-red-50 text-red-600 border-red-300 ring-1 ring-red-300'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#5B8563] hover:text-[#37593E] hover:bg-[#FFFEF6]'
                                }
              `}
                        >
                            {slot.time} -<br className='md:hidden' /> {slot.remaining} Slots
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
