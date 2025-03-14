import React, { useState } from 'react';
import { Box, Text, Button, Icon, Input } from 'zmp-ui';

const CustomCalendar = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateInput, setDateInput] = useState('');
  const [dateInputError, setDateInputError] = useState('');
  
  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  // Check if year is leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Get days in month (handling February in leap years)
  const getDaysInMonth = (year, month) => {
    if (month === 1) { // February (0-indexed)
      return isLeapYear(year) ? 29 : 28;
    }
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Navigate to today
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    if (onSelectDate) {
      onSelectDate(today);
    }
  };

  // Handle date input change
  const handleDateInputChange = (e) => {
    setDateInput(e.target.value);
    setDateInputError('');
  };

  // Navigate to specific date
  const goToSpecificDate = () => {
    // Validate input format (DD/MM/YYYY)
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dateInput.match(datePattern);
    
    if (!match) {
      setDateInputError('Định dạng phải là DD/MM/YYYY');
      return;
    }
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // 0-indexed month
    const year = parseInt(match[3], 10);
    
    // Validate date values
    if (month < 0 || month > 11) {
      setDateInputError('Tháng phải từ 1-12');
      return;
    }
    
    const maxDays = getDaysInMonth(year, month);
    if (day < 1 || day > maxDays) {
      setDateInputError(`Ngày phải từ 1-${maxDays} cho tháng này`);
      return;
    }
    
    // Valid date, navigate to it
    const newDate = new Date(year, month, day);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
    setDateInput('');
    
    if (onSelectDate) {
      onSelectDate(newDate);
    }
  };

  // Handle date selection
  const handleDateClick = (day) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
    
    if (onSelectDate) {
      onSelectDate(newSelectedDate);
    }
  };

  // Check if a date is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day) => {
    if (!selectedDate) return false;
    
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Generate calendar days
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center rounded-full cursor-pointer text-sm transition-colors
            ${isToday(day) ? 'bg-blue-100 font-bold' : ''}
            ${isSelected(day) ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
      {/* Date input section */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <Input 
            placeholder="DD/MM/YYYY" 
            value={dateInput}
            onChange={handleDateInputChange}
            className="flex-grow"
          />
          <Button 
            onClick={goToSpecificDate}
            size="small"
            className="bg-blue-500 text-white"
          >
            Đi đến
          </Button>
          <Button 
            onClick={goToToday}
            size="small"
            className="bg-green-500 text-white"
            icon={<Icon icon="zi-calendar" />}
          >
            Hôm nay
          </Button>
        </div>
        {dateInputError && (
          <Text size="xSmall" className="text-red-500 mt-1">
            {dateInputError}
          </Text>
        )}
      </div>

      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          className="bg-transparent border-none" 
          onClick={prevMonth}
          icon={<Icon icon="zi-arrow-left" />}
          size="small"
        />
        <Text size="large" bold className="text-center">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          {currentDate.getMonth() === 1 && (
            <span className="text-xs ml-2 text-gray-500">
              {isLeapYear(currentDate.getFullYear()) ? '(29 ngày)' : '(28 ngày)'}
            </span>
          )}
        </Text>
        <Button 
          className="bg-transparent border-none" 
          onClick={nextMonth}
          icon={<Icon icon="zi-arrow-right" />}
          size="small"
        />
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center py-2 text-gray-600 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      
      {/* Selected date display */}
      {selectedDate && (
        <Box className="mt-4 text-center p-2 bg-gray-50 rounded">
          <Text size="small">
            Ngày đã chọn: {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default CustomCalendar;