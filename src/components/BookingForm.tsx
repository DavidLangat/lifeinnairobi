'use client';

import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, ChevronRight } from 'lucide-react';

interface BookingFormProps {
  price: number;
}

export default function BookingForm({ price }: BookingFormProps) {
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState('');

  const total = price * people;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('This is a demo booking form. Integration coming soon!');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
       
       {/* Header */}
       <div className="bg-[#0B0B0B] p-6 text-white">
          <h3 className="font-serif text-2xl mb-1">Book your spot</h3>
          <p className="text-white/60 text-sm">Secure your adventure today</p>
       </div>

       <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Price Summary */}
          <div className="flex items-end gap-2 pb-6 border-b border-gray-100">
              <span className="text-3xl font-bold text-gray-900">KSh {price.toLocaleString()}</span>
              <span className="text-gray-500 mb-1">/ person</span>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Select Date</label>
             <div className="relative">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input 
                    type="date" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B0B0B] text-gray-900"
                    onChange={(e) => setDate(e.target.value)}
                 />
             </div>
          </div>

          {/* People Count */}
          <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Travelers</label>
             <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <select 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B0B0B] text-gray-900 appearance-none"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                 >
                     {[1,2,3,4,5,6].map(num => (
                         <option key={num} value={num}>{num} Person{num > 1 ? 's' : ''}</option>
                     ))}
                 </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                 </div>
             </div>
          </div>

           {/* User Details (Optional for demo, but good for structure) */}
           {/* <div className="space-y-4 pt-4 border-t border-gray-100">
               <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                   <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]" />
               </div>
               <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                   <input type="tel" placeholder="Phone Number" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]" />
               </div>
           </div> */}

          {/* Total & Submit */}
          <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">KSh {total.toLocaleString()}</span>
              </div>
              
              <button 
                  type="submit"
                  className="w-full bg-[#0B0B0B] text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 group"
              >
                  Proceed to Book
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                  You won't be charged yet.
              </p>
          </div>

       </form>
    </div>
  );
}
