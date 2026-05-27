
import React from 'react';

interface ActivityPricingCardProps {
    details: any;
    className?: string;
}

const ActivityPricingCard: React.FC<ActivityPricingCardProps> = ({ details, className = '' }) => {
    if (!details.pricing) return null;

    return (
        <div className={`bg-background rounded-xl border border-background p-6 ${className}`}>
            <h4 className="text-sm font-bold uppercase tracking-widest block mb-1 text-primary">Pricing Tiers</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                    <span className="text-primary">Citizen Rate</span>
                    <span className="font-bold text-primary">Ksh {details.pricing.citizen?.toLocaleString()}</span>
                </li>
                <li className="flex justify-between">
                    <span className="text-primary">Resident Rate</span>
                    <span className="font-bold text-primary">Ksh {details.pricing.resident?.toLocaleString()}</span>
                </li>
                <li className="flex justify-between">
                    <span className="text-primary">Non-Resident Rate</span>
                    <span className="font-bold text-primary">Ksh {details.pricing.nonResident?.toLocaleString()}</span>
                </li>
            </ul>
        </div>
    );
};

export default ActivityPricingCard;
