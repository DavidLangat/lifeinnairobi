
import React from 'react';
import Link from 'next/link';

interface ActivityBookingCardProps {
    activity: any;
    details: any;
    className?: string;
}

const ActivityBookingCard: React.FC<ActivityBookingCardProps & { children?: React.ReactNode }> = ({ activity, details, className = '', children }) => {
    return (
        <div className={`bg-secondary rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 md:p-8 ${className}`}>
            <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-1">Starting from</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-background">Ksh {activity.price?.toLocaleString()}</span>
                    <span className="text-gray-500 font-medium">/ person</span>
                </div>
                    {activity.name != "Hiking Tours" && activity.name != "Custom Experience" && (
                    <div>
                        {children ? <span>{children}</span> : null}
                    </div>
                    )}
                    
            </div>

            {activity.name === "Hiking Tours" ? (
                <Link
                    href={`/calendar`}
                    className="w-full bg-accent hover:bg-background text-primary text-center py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl mb-6 flex items-center justify-center gap-2"
                >
                    <span>Check Calendar</span>
                </Link>
            ):activity.name === "Custom Experience" ? (
                
                <a
                    href={`https://wa.me/254740726783?text=Hello%2C%20I%20would%20like%20to%20book%20${encodeURIComponent(activity.name)}`}
                    target="_blank"
                    className="w-full bg-accent hover:bg-background text-primary text-center py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl mb-6 flex items-center justify-center gap-2"
                >
                    <span>Enquire More</span> 
                </a>
            ) :    <a
                    href={`https://wa.me/254740726783?text=Hello%2C%20I%20would%20like%20to%20book%20${encodeURIComponent(activity.name)}`}
                    target="_blank"
                    className="w-full bg-accent hover:bg-background text-primary text-center py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl mb-6 flex items-center justify-center gap-2"
                >
                    <span>WhatsApp</span> 
                </a>}
       
            {/* Key Details List */}
            <div className="space-y-4 text-gray-600">
                {details.keyDetails && (
                    <>
                        <div className="flex items-start gap-3">
                            <div className="bg-[#5B8563]/10 p-2 rounded-lg text-[#37593E] shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-[#37593E] font-serif">Duration</span>
                                <span className="text-sm font-sans">{details.keyDetails.duration}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-[#5B8563]/10 p-2 rounded-lg text-[#37593E] shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 10" /></svg>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-[#37593E] font-serif">Start Times</span>
                                <span className="text-sm font-sans">{details.keyDetails.startTime?.join(', ') || 'Flexible'}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-[#5B8563]/10 p-2 rounded-lg text-[#37593E] shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Meeting Point</span>
                                <span className="text-sm">{details.keyDetails.location}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActivityBookingCard;
