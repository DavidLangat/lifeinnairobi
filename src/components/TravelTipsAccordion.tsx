'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import guideData from '@/data/travel-guide-data.json';

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border border-gray-100 rounded-xl mb-4 overflow-hidden bg-white shadow-xs hover:shadow-md transition-shadow duration-300">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left bg-white"
      >
        <span className="font-serif text-gray-800 font-medium text-lg pr-4">{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-black text-white border-black' : 'text-gray-400'}`}>
           <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isOpen && (
        <div
            className="transition-all duration-300 ease-in-out"
        >
          <div className="px-5 pb-5 text-gray-500 leading-relaxed text-sm">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default function TravelTipsAccordion() {
  const { tips } = guideData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const midPoint = Math.ceil(tips.length / 2);
  const leftTips = tips.slice(0, midPoint);
  const rightTips = tips.slice(midPoint);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column */}
            <div>
               {leftTips.map((tip, idx) => (
                 <AccordionItem 
                    key={idx} 
                    question={tip.question} 
                    answer={tip.answer} 
                    isOpen={openIndex === idx} // Use global index check
                    onClick={() => handleToggle(idx)} 
                 />
               ))}
            </div>

            {/* Right Column */}
            <div>
               {rightTips.map((tip, idx) => {
                 const realIndex = idx + midPoint;
                 return (
                    <AccordionItem 
                        key={realIndex} 
                        question={tip.question} 
                        answer={tip.answer} 
                        isOpen={openIndex === realIndex} 
                        onClick={() => handleToggle(realIndex)} 
                    />
                 );
               })}
            </div>

        </div>
      </div>
    </section>
  );
}
