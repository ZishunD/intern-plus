import { useState } from "react";

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function Calendar({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const formatDateLong = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("default", {
      weekday: "short", // Mon
      day: "2-digit", // 25
      month: "short", // Nov
      year: "numeric", // 2024
    });
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1); // move to January of next year
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isStartOrEnd = (date: Date) =>
    (startDate && date.toDateString() === startDate.toDateString()) ||
    (endDate && date.toDateString() === endDate.toDateString());

  const isInRange = (date: Date) =>
    startDate && endDate && date > startDate && date < endDate;

  const isPast = (date: Date) => {
    const today = new Date();
    // Compare only year/month/day, ignore time
    const todayWithoutTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < todayWithoutTime;
  };

  return (
    <div className='max-w-md mx-auto p-4 bg-[#F3F5FC] border border-[#B1BBE7] rounded-[2px] shadow-[0_1px_20px_rgb(180,180,180)]'>
      {/* Header */}
      <div className='flex justify-between items-center mb-2'>
        {/* 左边：月份文字 + 年份下拉 */}
        <div className='flex items-center pb-3'>
          <span className='font-semibold pl-3'>
            {new Date(currentYear, currentMonth).toLocaleString("defualt", {
              month: "long",
            })}
          </span>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className='px-2 py-1 cursor-pointer font-bold'>
            {Array.from(
              { length: 20 },
              (_, i) => today.getFullYear() - 10 + i
            ).map((year) => (
              <option
                key={year}
                value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* 右边：月份翻页按钮 */}
        <div className='flex items-center gap-2 pb-3'>
          <button
            type='button'
            onClick={() => setCurrentMonth((m) => (m === 0 ? 11 : m - 1))}
            className='px-2 py-1 hover:bg-gray-200'>
            &lt;
          </button>
          <button
            type='button'
            onClick={() => handleNextMonth()}
            className='px-2 py-1 hover:bg-gray-200'>
            &gt;
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className='grid grid-cols-7 text-center mb-1 text-[#697077]'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className='grid grid-cols-7 font-bold gap-1'>
        {Array(daysInMonth[0].getDay())
          .fill(null)
          .map((_, i) => (
            <div key={"empty-" + i}></div>
          ))}
        {daysInMonth.map((date) => (
          <div
            key={date.toDateString()}
            className={`p-2 rounded-md cursor-pointer text-center
              ${isStartOrEnd(date) ? "bg-indigo-600 text-white" : ""}
              ${isInRange(date) ? "bg-indigo-300 text-white" : ""}
              ${isPast(date) ? "text-[#697077] cursor-not-allowed" : ""}`}
            onClick={() => !isPast(date) && handleDateClick(date)}>
            {date.getDate()}
          </div>
        ))}
      </div>

      {/* Inputs */}
      <div className='flex mt-4 w-full justify-center gap-4 p-2'>
        <div className='start flex flex-col bg-[#D1D2F0] px-5 py-3 rounded-[2px] w-1/2'>
          <div className='title capitalize font-bold text-sm'>start date</div>
          <div className='date text-sm pt-2'>{formatDateLong(startDate)}</div>
        </div>
        <div
          className={`end flex flex-col px-5 py-3 rounded-[2px] w-1/2 ${
            endDate ? "bg-[#D1D2F0]" : "border bg-white "
          }`}>
          <div className='title capitalize font-bold text-sm'>end date</div>
          <div
            className={`date pt-2 text-sm ${endDate ? "" : "text-[#697077]"}`}>
            {formatDateLong(endDate) ? formatDateLong(endDate) : "Select date"}
          </div>
        </div>
      </div>
    </div>
  );
}
