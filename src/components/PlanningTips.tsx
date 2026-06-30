import React from 'react';

interface PlanningTipsProps {
  data: {
    title: string;
    tips: {
      heading: string;
      content: string;
    }[];
  };
}

export default function PlanningTips({ data }: PlanningTipsProps) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="bg-white/80 backdrop-blur-md border border-accent/20 rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-background mb-12 text-center">
          {data.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {data.tips.map((tip, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-background text-primary rounded-full flex items-center justify-center font-serif text-xl">
                {index + 1}
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-gray-900 font-sans mb-2">{tip.heading}</h3>
                <p className="text-gray-700 font-sans text-[15px] leading-relaxed">
                  {tip.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
