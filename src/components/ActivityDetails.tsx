'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle, XCircle, Info } from 'lucide-react';

interface ItineraryItem {
  title: string;
  description: string;
}

interface PracticalInfoItem {
  title: string;
  content: string;
}

interface ActivityDetailsProps {
  fullDescription: string;
  highlights?: string[];
  itinerary?: ItineraryItem[];
  inclusions?: string[];
  exclusions?: string[];
  practicalInfo?: PracticalInfoItem[];
}

export default function ActivityDetails({
  fullDescription,
  highlights,
  itinerary,
  inclusions,
  exclusions,
  practicalInfo
}: ActivityDetailsProps) {
  
  // Helper to format text with line breaks
  const formatText = (text: string) => {
      return text.split('\n').map((line, i) => (
          <span key={i} className="block mb-2">{line}</span>
      ));
  };

  return (
    <div className="space-y-12">
      
      {/* Description Section */}
      <section className="prose prose-lg max-w-none text-gray-600">
         <h2 className="font-serif text-3xl text-gray-900 mb-6">About this Activity</h2>
         <div className="leading-relaxed">
            {formatText(fullDescription)}
         </div>
      </section>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
         <section>
             <h3 className="font-serif text-2xl text-gray-900 mb-6">Highlights</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {highlights.map((item, idx) => (
                     <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                         <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                         <span className="text-gray-700">{item}</span>
                     </div>
                 ))}
             </div>
         </section>
      )}

      {/* Accordion Sections */}
      <section className="space-y-4">
          
          {/* Itinerary */}
          {itinerary && itinerary.length > 0 && (
             <AccordionItem title="Itinerary" defaultOpen={true}>
                 <div className="space-y-6">
                     {itinerary.map((item, idx) => (
                         <div key={idx} className="relative pl-8 border-l-2 border-gray-200 last:border-0 pb-6 last:pb-0">
                             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></div>
                             <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                             <div className="text-gray-600 text-sm whitespace-pre-line">{item.description}</div>
                         </div>
                     ))}
                 </div>
             </AccordionItem>
          )}

          {/* Inclusions & Exclusions */}
          {(inclusions || exclusions) && (
              <AccordionItem title="Inclusions & Exclusions">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {inclusions && (
                          <div>
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                  What's Included
                              </h4>
                              <ul className="space-y-2">
                                  {inclusions.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}
                      
                      {exclusions && (
                          <div>
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                  What's Not Included
                              </h4>
                              <ul className="space-y-2">
                                  {exclusions.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}
                  </div>
              </AccordionItem>
          )}

          {/* Practical Info (Mapping user's HTML sections like "Where to meet", "Know before you go", "Cancellation") */}
          {practicalInfo && practicalInfo.map((info, idx) => (
              <AccordionItem key={idx} title={info.title}>
                  <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {info.content}
                  </div>
              </AccordionItem>
          ))}

      </section>

    </div>
  );
}

// Internal Accordion Component
function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode, defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-serif text-lg font-medium text-gray-900">{title}</span>
                <div 
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
            </button>
            {isOpen && (
                <div>
                    <div className="p-6 pt-0 border-t border-gray-100">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
