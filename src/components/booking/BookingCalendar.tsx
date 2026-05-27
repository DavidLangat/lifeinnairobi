import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';

interface CalendarProps {
  activitySlug?: string;
  selectedDate?: Date;
  onSelect?: (date: Date | undefined) => void;
  fullyBookedDates?: string[];
  prices?: Record<string, number>;
  minDate?: Date;
  className?: string;
  onMonthChange?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelect,
  fullyBookedDates = [],
  prices = {},
  minDate,
  className = '',
  onMonthChange,
}) => {
  // Default minDate to today if not provided
  const effectiveMinDate = useMemo(() => {
    const d = minDate ? new Date(minDate) : new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, [minDate]);

  // After 3:30 PM today, today's date is no longer bookable
  const isTodayCutoffPassed = useMemo(() => {
    const now = new Date();
    return now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() >= 30);
  }, []);

  // Initialize current view to selectedDate if valid, otherwise effectiveMinDate
  const [currentDate, setCurrentDate] = useState(() => {
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    const d = new Date(effectiveMinDate);
    d.setDate(1);
    return d;
  });

  const [view, setView] = useState<'days' | 'months'>('days');

  // Notify parent of month change
  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentDate);
    }
  }, [currentDate, onMonthChange]);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  // Determines if we can go back further
  const canGoBack = useMemo(() => {
    if (view === 'months') {
      return currentDate.getFullYear() > effectiveMinDate.getFullYear();
    } else {
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const minMonthDate = new Date(effectiveMinDate.getFullYear(), effectiveMinDate.getMonth(), 1);
      return prevMonthDate >= minMonthDate;
    }
  }, [currentDate, view, effectiveMinDate]);

  const handlePrev = () => {
    if (!canGoBack) return;

    if (view === 'months') {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const handleNext = () => {
    if (view === 'months') {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  const toggleView = () => {
    setView(prev => prev === 'days' ? 'months' : 'days');
  };

  const handleMonthSelect = (monthIndex: number) => {
    // Prevent selecting past months
    const targetDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    const minMonthDate = new Date(effectiveMinDate.getFullYear(), effectiveMinDate.getMonth(), 1);
    
    if (targetDate < minMonthDate) {
      return;
    }
    
    setCurrentDate(targetDate);
    setView('days');
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
    
    // Check if date is in the past
    if (newDate < effectiveMinDate) {
      return;
    }

    if (fullyBookedDates.includes(dateKey)) {
      return;
    }

    if (onSelect) {
      // Check if clicking currently selected date to toggle off
      const isSelected = selectedDate && 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
        
      onSelect(isSelected ? undefined : newDate);
    }
  };

  const renderHeader = () => {
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const label = view === 'months' ? `${year}` : `${monthName} ${year}`;

    return (
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrev}
          disabled={!canGoBack}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-secondary
            ${!canGoBack 
              ? 'border-secondary text-secondary cursor-not-allowed' 
              : 'border-background text-background hover:bg-secondary cursor-pointer'
            }
          `}
          aria-label={view === 'months' ? "Previous year" : "Previous month"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <button 
          onClick={toggleView}
          className="flex items-center gap-2 cursor-pointer group focus:outline-none px-2 py-1 rounded-md "
        >
          <span className="text-lg font-bold text-background group-hover:text-accent transition-colors select-none">
            {label}
        </span>
          <ChevronDown className={`w-6 h-6 text-accent font-bold transition-transform duration-200 ${view === 'months' ? 'rotate-180' : ''}`} />
        </button>

        <button 
          onClick={handleNext}
          className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary hover:bg-accent shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label={view === 'months' ? "Next year" : "Next month"}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderMonthPicker = () => {
    return (
      <div className="grid grid-cols-3 gap-3 py-4 animate-in fade-in duration-200">
        {months.map((m, index) => {
          const isCurrentMonth = new Date().getMonth() === index && new Date().getFullYear() === currentDate.getFullYear();
          const isSelectedMonth = selectedDate?.getMonth() === index && selectedDate?.getFullYear() === currentDate.getFullYear();
          
          const targetDate = new Date(currentDate.getFullYear(), index, 1);
          const minMonthDate = new Date(effectiveMinDate.getFullYear(), effectiveMinDate.getMonth(), 1);
          const isUnavailable = targetDate < minMonthDate;

          return (
            <button
              key={m}
              onClick={() => !isUnavailable && handleMonthSelect(index)}
              disabled={isUnavailable}
              className={`
                p-2 rounded-lg text-sm font-medium transition-all
                ${isUnavailable
                  ? 'text-background cursor-not-allowed bg-transparent'
                  : isSelectedMonth 
                    ? 'bg-background text-white shadow-md' 
                    : isCurrentMonth 
                      ? 'bg-background text-primary border border-blue-200'
                      : 'text-background hover:bg-secondary'
                }
              `}
            >
              {m}
            </button>
          );
        })}
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate);
    
    // Empty cells
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[3rem]" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = `${currentDayDate.getFullYear()}-${String(currentDayDate.getMonth() + 1).padStart(2, '0')}-${String(currentDayDate.getDate()).padStart(2, '0')}`;
      
      const price = prices[dateKey];
      const isFullyBooked = fullyBookedDates.includes(dateKey);
      const isPastDay = currentDayDate < effectiveMinDate;

      // Disable today if it's past the 3:30 PM booking cutoff
      const today = new Date();
      const isToday =
        currentDayDate.getFullYear() === today.getFullYear() &&
        currentDayDate.getMonth() === today.getMonth() &&
        currentDayDate.getDate() === today.getDate();
      const isCutoffDisabled = isToday && isTodayCutoffPassed;
      
      const isSelected = selectedDate && 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      
      const isHighlighted = price == undefined && !isFullyBooked && !isPastDay && !isCutoffDisabled;
      const isDisabled = isFullyBooked || isPastDay || isCutoffDisabled;

      days.push(
        <div 
          key={dateKey} 
          onClick={() => !isDisabled && handleDateClick(day)}
          className={`
            relative flex flex-col items-center pt-2 group rounded-lg transition-all duration-200
            min-h-[3.25rem] md:min-h-[3.75rem] w-full
            ${isDisabled 
              ? 'cursor-not-allowed opacity-50 bg-secondary' 
              : 'cursor-pointer'
            }
            ${isSelected && !isDisabled
              ? 'bg-background shadow-md transform scale-[1.02] z-10' 
              : !isDisabled && 'hover:bg-secondary'
            }
          `}
        >
          {/* Indicators */}
          {isHighlighted && !isSelected && (
            <div className="absolute top-1 right-1 w-2 h-2">
               <svg viewBox="0 0 10 10" className="w-full h-full text-accent fill-current">
                 <path d="M10 0 L10 10 L0 0 Z" />
               </svg>
            </div>
          )}

          {isHighlighted && isSelected && (
            <div className="absolute top-1 right-1 w-2 h-2">
               <svg viewBox="0 0 10 10" className="w-full h-full text-white/50 fill-current">
                 <path d="M10 0 L10 10 L0 0 Z" />
               </svg>
            </div>
          )}

          <span 
            className={`text-sm md:text-base mb-0.5 leading-none ${
              isSelected 
                ? 'font-bold text-white' 
                : isHighlighted 
                  ? 'font-bold text-slate-900' 
                  : isDisabled && !isPastDay 
                    ? 'font-normal text-slate-300 line-through'
                    : 'font-normal text-slate-400'
            }`}
          >
            {day}
          </span>
          
          {isHighlighted && (
            <span 
              className={`text-[10px] font-medium mt-auto mb-1 ${
                isSelected ? 'text-blue-100' : 'text-slate-600'
              }`}
            >
              {/* ${price.toFixed(2)} */}
            </span>
          )}
          
          {isFullyBooked && !isPastDay && (
             <span className="text-[10px] font-medium text-red-300 mt-auto mb-1">
               Full
             </span>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`w-full select-none ${className}`}>
      {renderHeader()}
      
      {view === 'days' ? (
        <>
          <div className="grid grid-cols-7 mb-2 border-b border-secondary pb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-background">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>
        </>
      ) : (
        renderMonthPicker()
      )}
    </div>
  );
};

export default Calendar;