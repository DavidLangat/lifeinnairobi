'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface ActivityFAQProps {
    faqs: FAQItem[];
}

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border border-gray-100 rounded-xl mb-4 overflow-hidden bg-accent shadow-xs hover:shadow-md transition-shadow duration-300">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-5 text-left bg-accent"
            >
                <span className="font-serif text-primary font-medium text-lg pr-4">{question}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-accent text-primary border-accent' : 'text-gray-400'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className="transition-all duration-300 ease-in-out">
                    <div className="px-5 pb-5 text-primary leading-relaxed text-sm">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ActivityFAQ({ faqs }: ActivityFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-10">
            <h2 className="text-2xl font-serif text-accent font-medium mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2">
                {faqs.map((faq, idx) => (
                    <AccordionItem
                        key={idx}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === idx}
                        onClick={() => handleToggle(idx)}
                    />
                ))}
            </div>
        </section>
    );
}
