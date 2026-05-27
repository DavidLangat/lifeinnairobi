'use client';

import React from 'react';
import Script from 'next/script';

interface BokunWidgetProps {
    bookingChannelUUID?: string;
    activityId?: string;
    className?: string;
}

export default function BokunWidget({
    bookingChannelUUID = '8214fc81-95a9-4933-9663-8bb21dcff7e5',
    activityId = '1144958',
    className
}: BokunWidgetProps) {
    const srcDict = `https://widgets.bokun.io/online-sales/${bookingChannelUUID}/experience-calendar/${activityId}`;
    const scriptSrc = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bookingChannelUUID}`;

    return (
        <div className={`my-8 ${className || ''}`}>
            <Script
                src={scriptSrc}
                strategy="lazyOnload"
            />
            <div
                className="bokunWidget"
                data-src={srcDict}
            />
            <noscript>Please enable javascript in your browser to book</noscript>
        </div>
    );
}
