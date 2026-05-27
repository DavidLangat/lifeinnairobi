'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { ResidencyStatus, BookingPriceConfig, TimeSlot, BookingPayload } from '@/lib/types';
import { getAvailability, createBooking } from '@/app/actions/booking';
import GroupCompositionSelector from './GroupCompositionSelector';
import BookingCalendar from './BookingCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import BookingSummary from './BookingSummary';
import { ChevronRight, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';

interface ActivityBookingWidgetProps {
    activitySlug: string;
    activityName: string;
    basePrice: number;
    pricing: BookingPriceConfig;
    className?: string;
}

export default function ActivityBookingWidget({
    activitySlug,
    activityName,
    basePrice,
    pricing,
    className = '',
}: ActivityBookingWidgetProps) {


    // State
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ensure portal only runs on the client
    useEffect(() => { setMounted(true); }, []);
    const [step, setStep] = useState<'details' | 'summary' | 'payment'>('details');

    // Mixed Group State
    const [guestCounts, setGuestCounts] = useState<Record<ResidencyStatus, number>>({
        citizen: 0,
        resident: 0,
        nonResident: 0
    });

    const [date, setDate] = useState('');
    const [time, setTime] = useState<string | null>(null);

    // Customer Info State
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Data State
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [slotError, setSlotError] = useState(false);
    const [shakeSlots, setShakeSlots] = useState(false);

    // Derived State
    const totalGuests = Object.values(guestCounts).reduce((a, b) => a + b, 0);
    const total = pricing ? (
        (guestCounts.citizen * pricing.citizen) +
        (guestCounts.resident * pricing.resident) +
        (guestCounts.nonResident * pricing.nonResident)
    ) : (basePrice * totalGuests);

    // Check if form is valid
    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const isEmailValid = validateEmail(customerEmail);
    const isFormValid = customerName.trim() !== '' && isEmailValid && customerPhone.trim() !== '';

    const triggerSlotError = () => {
        setSlotError(true);
        setShakeSlots(true);
        setTimeout(() => setShakeSlots(false), 600);
    };

    // Fetch availability when date changes
    useEffect(() => {
        if (!date) return;

        async function fetchSlots() {
            setIsLoadingSlots(true);
            setTime(null); // Reset time selection
            try {
                const result = await getAvailability(activitySlug, date);
                let availableSlots = result.timeSlots;

                // Filter out past slots if date is today
                const todayStr = new Date().toISOString().split('T')[0];
                if (date === todayStr) {
                    const now = new Date();
                    availableSlots = availableSlots.filter(slot => {
                        // Parse "9:00 AM" or "3:00 PM"
                        const match = slot.time.match(/(\d+):(\d+)\s?(AM|PM)/i);
                        if (!match) return true;
                        
                        let hours = parseInt(match[1]);
                        const minutes = parseInt(match[2]);
                        const ampm = match[3].toUpperCase();
                        
                        if (ampm === 'PM' && hours < 12) hours += 12;
                        if (ampm === 'AM' && hours === 12) hours = 0;
                        
                        const slotDate = new Date();
                        slotDate.setHours(hours, minutes, 0, 0);
                        
                        // Buffer: don't allow booking if session starts in less than 30 mins (optional, but good)
                        // For now, just "is it in the past"
                        return slotDate > now;
                    });
                }

                setTimeSlots(availableSlots);
            } catch (err) {
                console.error("Failed to load slots", err);
            } finally {
                setIsLoadingSlots(false);
            }
        }

        fetchSlots();
    }, [date, activitySlug]);

    const handleBookNow = async () => {
        if (totalGuests === 0) {
            setError("Please add at least 1 guest.");
            return;
        }

        if (!date || !time) {
            if (date && !time) triggerSlotError();
            setError("Please select a date and time.");
            return;
        }

        // Capacity check
        const selectedSlot = timeSlots.find(s => s.time === time);
        if (selectedSlot && totalGuests > selectedSlot.remaining) {
            setError(`Only ${selectedSlot.remaining} spots left for this time. Please reduce guest count.`);
            return;
        }

        setStep('summary');
        setError(null);
    };

    const handleConfirmPayment = async () => {
        if (!isFormValid) {
            setError("Please fill in all details.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        const payload: BookingPayload = {
            activitySlug,
            activityName,
            date,
            time: time!,
            guestCounts,
            totalAmount: total,
            customerName,
            customerEmail,
            customerPhone
        };

        try {
            const response = await createBooking(payload);
            if (response.status === 'confirmed' || response.status === 'pending_payment') {
                if (response.paymentUrl) {
                    // Redirect to Paystack
                    window.location.href = response.paymentUrl;
                    return;
                }
                setBookingSuccess(true);
                setStep('payment');
            } else {
                setError(response.message || "Booking failed.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            // Optional delay to not jar user while fading out
            const timer = setTimeout(() => {
                setStep('details');
                setBookingSuccess(false);
                setError(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <>
            <a
                onClick={() => setIsOpen(true)}
                className="w-full bg-background hover:bg-accent text-primary text-center py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-5 -mb-8"
            >
                <span>Book Now</span>
            </a>

            {mounted && isOpen && createPortal(
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[9999] bg-background/40 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                        <div
                            className="bg-primary rounded-3xl shadow-2xl w-full max-w-[38rem] pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col "
                        >
                                {/* Header */}
                                <div className="bg-background p-6 text-secondary flex justify-between items-start shrink-0 relative overflow-hidden">
                                    {/* Decorative Circle */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5B8563]/20 rounded-full blur-2xl"></div>

                                    <div className="relative z-10">
                                        <h3 className="text-xl md:text-3xl mb-1 text-[#FFFAD8]">
                                            {bookingSuccess ? 'Confirmed' : step === 'details' ? 'Book your spot' : 'Review Booking'}
                                        </h3>
                                        <p className="text-[#FFFAD8]/70 text-sm ">
                                            {bookingSuccess ? 'See you soon!' : step === 'details' ? 'Instant confirmation' : 'One last step'}
                                        </p>
                                    </div>
                                    <div className="text-right flex items-center relative z-10">
                                        {!bookingSuccess && (
                                            <>
                                                <span className="block md:text-2xl text-xl font-bold text-secondary">KSh {total.toLocaleString()}</span>
                                                <span className="text-xs text-[#FFFAD8]/60 lowercase ml-1 ">total</span>
                                            </>
                                        )}
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="ml-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-[#FFFAD8]"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Scrollable Content */}
                                <div className="p-6 overflow-y-auto">

                                    {bookingSuccess ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-[#5B8563]/10 text-[#5B8563] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-background mb-2">Booking Confirmed!</h3>
                                            <p className="text-gray-600 mb-6 ">Your adventure awaits. Check your email for details.</p>
                                            <button
                                                onClick={() => { setIsOpen(false); }}
                                                className="text-sm font-bold underline underline-offset-4 text-background hover:text-[#5B8563] tracking-wide"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    ) : (
                                        <div>

                                            {/* Step 1: Details */}
                                            {step === 'details' && (
                                                <div
                                                    className="space-y-6"
                                                >
                                                    {/* Date */}
                                                    <div>
                                                        {!date ? (
                                                            <div
                                                                className="space-y-3"
                                                            >
                                                                <label className="text-xs font-bold uppercase tracking-wider text-[#5B8563] ">Select Date</label>
                                                                <BookingCalendar
                                                                    // className='h-120'
                                                                    activitySlug={activitySlug}

                                                                    selectedDate={date ? new Date(date) : undefined}
                                                                    onSelect={(d) => {
                                                                        if (d) {
                                                                            const offset = d.getTimezoneOffset();
                                                                            const localDate = new Date(d.getTime() - (offset * 60 * 1000));
                                                                            setDate(localDate.toISOString().split('T')[0]);
                                                                        } else {
                                                                            setDate('');
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="space-y-4"
                                                            >
                                                                <div className="space-y-3 ">
                                                                    {/* back arrow */}
                                                                    <button
                                                                        onClick={() => setDate('')}
                                                                        className="text-primary  flex items-center justify-start flex-row hover:cursor-pointer group border border-background bg-background  px-4 py-2 rounded-xl"
                                                                    >
                                                                        <ChevronLeft size={24} className=" group-hover:-translate-x-1 transition-transform" />
                                                                        <p className="h-6 text-lg font-bold tracking-wider p text-primary uppercase ">
                                                                            {format(new Date(date), 'd MMMM yyyy')}
                                                                        </p>
                                                                    </button>

                                                                    <TimeSlotPicker
                                                                        slots={timeSlots}
                                                                        selectedTime={time}
                                                                        onChange={(t) => { setTime(t); setSlotError(false); }}
                                                                        isLoading={isLoadingSlots}
                                                                        hasError={slotError && shakeSlots}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Guest Selection (Mixed Groups) */}
                                                    <div className="space-y-3">
                                                        <label className=" font-bold uppercase tracking-wider text-[#5B8563] ">Guests</label>
                                                        {pricing && (
                                                            <GroupCompositionSelector
                                                                counts={guestCounts}
                                                                onChange={(newCounts) => {
                                                                    if (date && !time) { triggerSlotError(); return; }
                                                                    setGuestCounts(newCounts);
                                                                }}
                                                                pricing={pricing}
                                                                maxTotal={timeSlots.find(s => s.time === time)?.remaining || 20}
                                                            />
                                                        )}
                                                    </div>



                                                    {/* Error Message */}
                                                    {error && (
                                                        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-start gap-2 border border-red-100">
                                                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                                            {error}
                                                        </div>
                                                    )}

                                                    {/* Total & Action */}
                                                    <div className="pt-6 border-t border-gray-200/60">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="font-medium text-gray-600 ">Total Amount</span>
                                                            <span className="text-3xl font-bold text-background font-serif">KSh {total.toLocaleString()}</span>
                                                        </div>

                                                        <button
                                                            onClick={handleBookNow}
                                                            disabled={!date || !time || totalGuests === 0}
                                                            className="w-full bg-background text-white font-bold py-4 rounded-xl hover:bg-[#2A4430] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group  shadow-lg hover:shadow-xl"
                                                        >
                                                            continue to summary
                                                            <ChevronRight className="w-5 h-5 group-enabled:group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>

                                                </div>
                                            )}

                                            {/* Step 2: Summary */}
                                            {step === 'summary' && (
                                                <div
                                                    className="space-y-6"
                                                >
                                                    <BookingSummary
                                                        date={date}
                                                        time={time!}
                                                        guestCounts={guestCounts}
                                                        pricing={pricing}
                                                        total={total}
                                                    />

                                                    {/* Customer Details Form */}
                                                    <div className="space-y-4 bg-secondary p-4 rounded-xl shadow-lg shadow-background/5">
                                                        <h4 className="font-bold text-background text-lg">Your Details</h4>

                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-background mb-1 ">Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    value={customerName}
                                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                                    className="w-full bg-secondary border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-background/20 focus:border-background transition-all "
                                                                    placeholder="John Doe"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-background mb-1 ">Email Address</label>
                                                                <input
                                                                    type="email"
                                                                    value={customerEmail}
                                                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                                                    className="w-full bg-secondary border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-background/20 focus:border-background transition-all "
                                                                    placeholder="john@example.com"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-background mb-1 ">Phone Number</label>
                                                                <input
                                                                    type="tel"
                                                                    value={customerPhone}
                                                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                                                    className="w-full bg-secondary border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-background/20 focus:border-background transition-all "
                                                                    placeholder="07XX XXX XXX"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        {/* Terms & Conditions Checkbox */}
                                                        <div className="flex items-start gap-3 p-1">
                                                            <div className="flex items-center h-5">
                                                                <input
                                                                    id="terms"
                                                                    type="checkbox"
                                                                    checked={termsAccepted}
                                                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#5B8563]/20"
                                                                />
                                                            </div>
                                                            <label htmlFor="terms" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                                                                I accept the <a href="/cancel-policy" target="_blank" className="font-bold text-background hover:underline">cancellation policy</a> and <a href="#" className="font-bold text-background hover:underline">terms and conditions</a>
                                                            </label>
                                                        </div>

                                                        <button
                                                            onClick={handleConfirmPayment}
                                                            disabled={isProcessing || !isFormValid || !termsAccepted}
                                                            className="w-full bg-background text-secondary font-bold py-4 rounded-xl hover:bg-accent active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                                        >
                                                            {isProcessing ? (
                                                                <>
                                                                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                                                </>
                                                            ) : (
                                                                <>Confirm & Pay</>
                                                            )}
                                                        </button>

                                                        <button
                                                            onClick={() => setStep('details')}
                                                            disabled={isProcessing}
                                                            className="w-full py-3 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                                                        >
                                                            Back to details
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>
                </>
            , document.body)}
        </>
    );
}
