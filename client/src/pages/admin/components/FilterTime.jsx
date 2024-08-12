import { useState, useEffect } from 'react';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangeFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedRange({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        key: 'selection'
      });
    }
  }, [startDate, endDate]);

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    const newStartDate = selection.startDate ? selection.startDate.toISOString().split('T')[0] : startDate;
    const newEndDate = selection.endDate ? selection.endDate.toISOString().split('T')[0] : endDate;

    if (!startDate && newStartDate) {
      setStartDate(newStartDate);
    }
    if (startDate && !endDate && newEndDate) {
      setEndDate(newEndDate);
    }

    setSelectedRange(selection);

    if (startDate && !endDate && newEndDate) {
      setShowCalendar(false);
    }
  };

  const handleClear = (event) => {
    event.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setSelectedRange({ startDate: new Date(), endDate: new Date(), key: 'selection' });
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="w-full relative top-1">
      <div
        className="h-10 relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        onClick={handleCalendarToggle}
      >
        <span className="absolute flex justify-center px-1 text-xs bg-white top-0 translate-x-0 -translate-y-2 z-10 text-gray-500">ช่วงเวลา</span>
        <span className="block truncate">
          {startDate && endDate ? `${startDate} - ${endDate}` : 'ไม่ได้ระบุ'}
        </span>
        {(startDate && endDate) && (
          <span onClick={handleClear} className="absolute inset-y-0 right-6 flex items-center pr-2 cursor-pointer">
            <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        )}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </div>

      {showCalendar && (
        <div className="absolute mt-1 w-full z-10">
          <DateRange
            ranges={[selectedRange]}
            onChange={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
