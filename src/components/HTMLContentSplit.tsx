'use client';

import React, { useState, useEffect } from 'react';

interface HTMLContentProps {
    contentHtml: string;
    className?: string;
}

/**
 * Helper to split content based on H3 or P tags.
 * Priority:
 * 1. Split by first <h3> (Intro vs Rest of sections)
 * 2. Split by first <p> (First Paragraph vs Rest of text)
 */
function splitContent(html: string): { first: string | null, rest: string | null } {
    if (!html) return { first: null, rest: null };

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Strategy 1: Split by H3 (Accordion style)
    const headers = doc.querySelectorAll('h3');
    if (headers.length > 0) {
        const firstHeader = headers[0];
        const rangeFirst = doc.createRange();

        // "First" is everything BEFORE the first header
        if (doc.body.firstChild) {
            rangeFirst.setStartBefore(doc.body.firstChild);
            rangeFirst.setEndBefore(firstHeader);
        }

        const firstFragment = rangeFirst.cloneContents();
        const firstDiv = document.createElement('div');
        firstDiv.appendChild(firstFragment);

        const rangeRest = doc.createRange();
        // "Rest" is everything STARTING FROM the first header
        rangeRest.setStartBefore(firstHeader);
        rangeRest.setEndAfter(doc.body.lastChild || doc.body);

        const restFragment = rangeRest.cloneContents();
        const restDiv = document.createElement('div');
        restDiv.appendChild(restFragment);

        return {
            first: firstDiv.innerHTML || null,
            rest: restDiv.innerHTML || null
        };
    }

    // Strategy 2: Split by first <p> (Text style)
    const firstP = doc.querySelector('p');
    if (firstP) {
        // "First" is strictly the first paragraph
        const firstContent = firstP.outerHTML;

        // "Rest" is everything else (remove P from DOM)
        firstP.remove();
        const restContent = doc.body.innerHTML;

        return {
            first: firstContent,
            rest: restContent
        };
    }

    // Strategy 3: No split possible
    return { first: html, rest: null };
}

/**
 * Extracts and renders the "Intro" content (everything before the first <h3> tag).
 * If no <h3> is found, renders the entire content.
 */
export function HTMLContentFirstParagraph({ contentHtml, className }: HTMLContentProps) {
    const [html, setHtml] = useState<string | null>(null);

    useEffect(() => {
        const { first } = splitContent(contentHtml);
        setHtml(first);
    }, [contentHtml]);

    if (!html) return null;

    return (
        <div
            className={`prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600 ${className || ''}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

/**
 * Renders the rest of the HTML content, STARTING from the first <h3> tag.
 * If no <h3> is found, renders nothing (as everything is covered by FirstParagraph).
 */
export function HTMLContentRest({ contentHtml, className }: HTMLContentProps) {
    const [html, setHtml] = useState<string | null>(null);

    useEffect(() => {
        const { rest } = splitContent(contentHtml);
        setHtml(rest);
    }, [contentHtml]);

    if (!html) return null;

    return (
        <div
            className={`prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:font-medium prose-a:text-teal-600 ${className || ''}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
