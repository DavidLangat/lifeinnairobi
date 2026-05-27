'use client';

import React, { useState } from 'react';

export default function ActivityNavigation() {
    const links = [
        { name: 'Overview', href: '#overview' },
        { name: 'Details', href: '#details' },
        { name: 'Itinerary', href: '#itinerary' },
    ];

    // ✅ Overview active by default
    const [active, setActive] = useState('#overview');

    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        setActive(href);

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav className="mb-8 bg-primary z-40">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4 font-sans text-sm font-medium tracking-wide">
                {links.map((link) => {
                    const isActive = active === link.href;

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className={`
                                whitespace-nowrap pb-1 text-sm font-medium uppercase tracking-widest transition-colors
                                ${
                                    isActive
                                        ? 'text-background  border-b-2 border-background'
                                        : 'text-gray-500 hover:text-background  hover:border-b-2 hover:border-background'
                                }
                            `}
                        >
                            {link.name}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}