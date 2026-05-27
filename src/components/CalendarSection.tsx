'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import CalendarCard from './CalendarCard';
import calendarData from '@/data/calendar-data.json';

type CalendarEvent = (typeof calendarData.items)[number] & {
    id: string;
    shortDescription: string;
};

const EBIKE_TOUR_TEMPLATE = {
    name: "E-bike Tour",
    location: "Ravenswood Escapes, Nairobi",
    price: 4500,
    image: "https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/activities/Nairobi%20E-bike%20Tours.jpeg",
    type: "ebike-tours",
    shortDescription: "Explore the Nairobi highlands on an electric bike. Scenic views and fresh air guaranteed.",
    fullDescription: "Join our guided e-bike tours through the stunning tea plantations of Nairobi. Our powerful e-bikes make the hills a breeze, allowing you to enjoy the scenery without the struggle. Suitable for all fitness levels.",
    highlights: [
        "Panoramic views of tea fields",
        "Guided ride with local experts",
        "Professional photography included"
    ],
    itinerary: [
        { title: "Briefing", description: "Safety talk and e-bike orientation." },
        { title: "The Ride", description: "Guided loop through the most scenic routes." },
        { title: "Refreshments", description: "Relaxation with tea and snacks after the ride." }
    ],
    pricing: {
        citizen: 4500,
        resident: 5500,
        nonResident: 6500
    },
    keyDetails: {
        duration: "3 Hours",
        startTime: ["9:00 AM", "3:00 PM"],
        location: "Ravenswood Escapes, Nairobi"
    },
    gallery: [
        "https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/images/IMG_5922-2.jpg",
        "https://ik.imagekit.io/kggumm8iz/Nairobilife/v2/activities/Nairobi%20E-bike%20Tours.jpeg"
    ]
};

const CalendarSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="relative h-[450px] rounded-3xl overflow-hidden bg-background/5">
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-40" />

                {/* Date Badge Skeleton */}
                <div className="absolute top-3 left-3 z-20 flex flex-col w-16">
                    <div className="h-14 bg-background/10 rounded-t-2xl mb-0.5 animate-pulse" />
                    <div className="h-14 bg-background/20 rounded-b-2xl animate-pulse" />
                </div>

                {/* Content Skeletons */}
                <div className="absolute bottom-18 left-8 right-8 space-y-2">
                    <div className="h-8 bg-background/20 rounded-lg w-3/4 animate-pulse" />
                    <div className="h-8 bg-background/20 rounded-lg w-1/2 animate-pulse" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">
                    <div className="w-1/3 h-4 bg-background/10 rounded animate-pulse" />
                    <div className="w-1/4 h-10 bg-background/20 rounded-lg animate-pulse" />
                </div>
            </div>
        ))}
    </div>
);

export default function CalendarSection() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchEvents() {
        setLoading(true);
        try {
            const items = (calendarData.items || []).map((item: (typeof calendarData.items)[number], index: number) => ({
                ...item,
                id: (item as { id?: string }).id || item.slug || `calendar-event-${index}`,
                shortDescription: item.short_description,
            }));
            setEvents(items as CalendarEvent[]);
        } catch (err) {
            console.error('Error loading calendar JSON data:', err);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [viewMode, setViewModeState] = useState<'monthly' | 'weekly'>(() => {
        const view = searchParams.get('view');
        return view === 'weekly' ? 'weekly' : 'monthly';
    });



    // Sync state with URL changes
    useEffect(() => {
        const view = searchParams.get('view');
        if (view === 'weekly' || view === 'monthly') {
            setViewModeState(view);
        }

        const dateParam = searchParams.get('date');
        if (dateParam) {
            const parsed = new Date(dateParam);
            if (!isNaN(parsed.getTime())) {
                // Update monthly anchor
                setCurrentMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));

                // Update weekly anchor
                const day = parsed.getDay();
                const diff = parsed.getDate() - (day === 0 ? 6 : day - 1); // adjust to Monday
                const newWeekStart = new Date(parsed);
                newWeekStart.setDate(diff);
                setCurrentWeekStart(newWeekStart);
            }
        }
    }, [searchParams]);

    // Helper to update URL without refreshing
    const updateUrl = (mode: 'monthly' | 'weekly', date: Date) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', mode);

        // Format date as YYYY-MM-DD for URL
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        params.set('date', `${year}-${month}-${day}`);

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const setViewMode = (mode: 'monthly' | 'weekly') => {
        setViewModeState(mode);
        // When switching modes, we want to maintain the "current" focused time
        // If switching to weekly, use the currentMonth's start or today if typical
        // If switching to monthly, use the currentWeekStart
        let targetDate = new Date();

        if (mode === 'weekly') {
            // switching to weekly
            // If we are in a specific month, try to jump to the first week of that month
            // unless that month is "current month", then jump to "today"
            const now = new Date();
            if (currentMonth.getMonth() === now.getMonth() && currentMonth.getFullYear() === now.getFullYear()) {
                targetDate = now;
            } else {
                targetDate = currentMonth;
            }
        } else {
            // switching to monthly
            targetDate = currentWeekStart;
        }

        updateUrl(mode, targetDate);
    };

    // Weekly View State
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const dateParam = searchParams.get('date');
        let baseDate = new Date();

        if (dateParam) {
            const parsed = new Date(dateParam);
            if (!isNaN(parsed.getTime())) {
                baseDate = parsed;
            }
        }

        const day = baseDate.getDay(); // 0 is Sunday
        const diff = baseDate.getDate() - (day === 0 ? 6 : day - 1); // adjust to Monday
        return new Date(baseDate.setDate(diff));
    });

    const addWeeks = (date: Date, weeks: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + weeks * 7);
        return newDate;
    };

    const handlePrevWeek = () => {
        const newDate = addWeeks(currentWeekStart, -1);
        setCurrentWeekStart(newDate);
        updateUrl('weekly', newDate);
    };

    const handleNextWeek = () => {
        const newDate = addWeeks(currentWeekStart, 1);
        setCurrentWeekStart(newDate);
        updateUrl('weekly', newDate);
    };

    const weekRangeLabel = React.useMemo(() => {
        const start = currentWeekStart;
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }, [currentWeekStart]);

    // Monthly View State
    const [currentMonth, setCurrentMonth] = useState(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            const parsed = new Date(dateParam);
            if (!isNaN(parsed.getTime())) {
                return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
            }
        }
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const addMonths = (date: Date, months: number) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
    };

    const handlePrevMonth = () => {
        const newDate = addMonths(currentMonth, -1);
        setCurrentMonth(newDate);
        updateUrl('monthly', newDate);
    };

    const handleNextMonth = () => {
        const newDate = addMonths(currentMonth, 1);
        setCurrentMonth(newDate);
        updateUrl('monthly', newDate);
    };

    const monthLabel = React.useMemo(() => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if (currentMonth.getFullYear() === nextMonth.getFullYear()) {
            return `${currentMonth.toLocaleDateString('en-US', { month: 'long' })} - ${nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
        } else {
            return `${currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
        }
    }, [currentMonth]);


    const filteredEvents = React.useMemo(() => {
        if (events.length === 0) return [];

        const rangeStart = viewMode === 'weekly'
            ? new Date(currentWeekStart)
            : new Date(currentMonth);
        const rangeEnd = viewMode === 'weekly'
            ? new Date(currentWeekStart)
            : new Date(currentMonth);

        if (viewMode === 'weekly') {
            rangeEnd.setDate(rangeEnd.getDate() + 7);
        } else {
            rangeEnd.setMonth(rangeEnd.getMonth() + 1);
        }

        // Fixed anchor makes the event sequence deterministic across all weeks/months.
        const anchorSaturday = new Date(2020, 0, 4); // Saturday
        const msPerDay = 24 * 60 * 60 * 1000;
        const generated: Array<CalendarEvent & { date: string }> = [];

        for (let d = new Date(rangeStart); d < rangeEnd; d.setDate(d.getDate() + 1)) {
            const day = d.getDay();
            if (day !== 6 && day !== 0) continue; // Saturday or Sunday only

            const weekendSaturday = new Date(d);
            if (day === 0) {
                weekendSaturday.setDate(weekendSaturday.getDate() - 1);
            }

            const weekendIndex = Math.floor((weekendSaturday.getTime() - anchorSaturday.getTime()) / (7 * msPerDay));
            const weekendDayOffset = day === 6 ? 0 : 1; // Saturday first, Sunday second
            const slotIndex = weekendIndex * 2 + weekendDayOffset;
            const normalizedSlot = ((slotIndex % events.length) + events.length) % events.length;
            const template = events[normalizedSlot];

            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const date = String(d.getDate()).padStart(2, '0');

            generated.push({
                ...template,
                id: `${template.id}-${year}${month}${date}`,
                date: `${year}-${month}-${date}`,
            });
        }

        return generated;
    }, [events, viewMode, currentWeekStart, currentMonth]);

    return (
        <section className="py-10 lg:py-12 text-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div className="space-y-2">
                        <h2
                            className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-background"
                        >
                            {calendarData.heading}
                        </h2>
                        <p
                            className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl"
                        >
                            {calendarData.description}
                        </p>
                    </div>


                </div>

                <div>
                    {loading ? (
                        <div>
                            <CalendarSkeleton />
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div
                            className="text-center py-20 bg-background/5 rounded-3xl"
                        >
                            <p className="text-gray-500 font-serif text-xl">No upcoming events scheduled for this period.</p>
                            <p className="text-sm text-gray-400 mt-2">
                                {viewMode === 'weekly' ? "Try navigating to next week" : "Try navigating to next month"}
                            </p>
                        </div>
                    ) : (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {filteredEvents.map((item) => (
                                <div
                                    key={item.id}
                                >
                                    <CalendarCard item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
