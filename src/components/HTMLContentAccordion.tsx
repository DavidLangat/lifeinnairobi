'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HTMLContentAccordionProps {
    contentHtml: string;
}

interface Section {
    titleHtml: string;
    contentHtml: string;
}

const AccordionItem = ({ titleHtml, contentHtml, isOpen, onClick }: { titleHtml: string, contentHtml: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="mb-4 overflow-hidden border-b border-gray-100 last:border-0 transition-shadow duration-300">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between pb-4 text-left group"
            >
                {/* Render the title using dangerouslySetInnerHTML to preserve any specific formatting from the original H3 */}
                <div
                    className="prose prose-lg prose-headings:font-serif prose-headings:font-medium prose-headings:m-0 max-w-none group-hover:text-teal-700 transition-colors"
                    dangerouslySetInnerHTML={{ __html: titleHtml }}
                />

                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-background text-primary' : 'text-background group-hover:text-accent'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className="transition-all duration-300 ease-in-out">
                    <div
                        className="pb-6 prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>
            )}
        </div>
    );
};

export default function HTMLContentAccordion({ contentHtml }: HTMLContentAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [introHtml, setIntroHtml] = useState<string | null>(null);
    const [showFallback, setShowFallback] = useState<boolean>(false);

    useEffect(() => {
        if (!contentHtml) return;

        // Use DOMParser to parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHtml, 'text/html');

        // Find all H3 headers in the document
        // Using querySelectorAll gets them in document order, which is what we want.
        const headers = Array.from(doc.body.querySelectorAll('h3'));

        if (headers.length === 0) {
            setShowFallback(true);
            return;
        }

        // --- EXTRACT INTRO ---
        // Capture everything before the first H3
        const firstHeader = headers[0];
        const introRange = doc.createRange();
        // Start at start of body/root
        // Since doc.body contains our parsed nodes
        introRange.setStartBefore(doc.body.firstChild || doc.body);
        introRange.setEndBefore(firstHeader);

        const introFragment = introRange.cloneContents();
        const introDiv = document.createElement('div');
        introDiv.appendChild(introFragment);

        // Only set intro if it has meaningful content
        if (introDiv.textContent?.trim()) {
            setIntroHtml(introDiv.innerHTML);
        } else {
            setIntroHtml(null);
        }
        // ---------------------

        const calculatedSections: Section[] = headers.map((h3, index) => {
            // Use DOM Range to extract content between robustly, handling nesting.
            // Start of range: After the definition of this H3
            // End of range: Before the definition of the NEXT H3 (or end of body)

            const range = doc.createRange();
            range.setStartAfter(h3);

            const nextHeader = headers[index + 1];
            if (nextHeader) {
                range.setEndBefore(nextHeader);
            } else {
                range.setEndAfter(doc.body);
            }

            const fragment = range.cloneContents();

            // Serialize the fragment
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(fragment);

            const extractedContentHtml = tempDiv.innerHTML;

            return {
                titleHtml: h3.outerHTML,
                contentHtml: extractedContentHtml
            };
        });

        setSections(calculatedSections);
        setShowFallback(false);

    }, [contentHtml]);

    if (showFallback) {
        return (
            <div
                className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        );
    }

    if (sections.length === 0 && !introHtml) {
        return null;
    }

    return (
        <div className="space-y-4">
            {/* Render Intro Content (Non-collapsible) */}
            {introHtml && (
                <div
                    className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600 mb-6"
                    dangerouslySetInnerHTML={{ __html: introHtml }}
                />
            )}

            {/* Render Accordion Sections */}
            <div className="space-y-1">
                {sections.map((section, idx) => (
                    <AccordionItem
                        key={idx}
                        titleHtml={section.titleHtml}
                        contentHtml={section.contentHtml}
                        isOpen={openIndex === idx}
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    />
                ))}
            </div>
        </div>
    );
}
