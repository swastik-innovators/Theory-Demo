import React, { useState, useMemo } from 'react';
import './onboarding.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExamDateScreen = ({ onNext, onBack }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    // pad start
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [currentMonth, currentYear]);

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const isPast = (day) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const handlePrev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const handleNext = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const formatSelected = () => {
    if (!selectedDate) return '';
    return `${selectedDate} ${monthNames[currentMonth]} ${currentYear}`;
  };

  return (
    <div className="ob-screen ob-date">
      <div className="ob-progress-bar">
        <div className="ob-progress-fill" style={{ width: '28%' }}></div>
      </div>

      <div className="ob-content">
        <div className="ob-header">
          <span className="ob-step-badge">Step 2 of 7</span>
          <h1 className="ob-title">When is your test?</h1>
          <p className="ob-subtitle">We'll build a personalised study plan for you</p>
        </div>

        <div className="calendar-card">
          {/* Month Nav */}
          <div className="cal-header">
            <button className="cal-nav-btn" onClick={handlePrev}><ChevronLeft size={20} /></button>
            <h3 className="cal-month">{monthNames[currentMonth]} {currentYear}</h3>
            <button className="cal-nav-btn" onClick={handleNext}><ChevronRight size={20} /></button>
          </div>

          {/* Day names row */}
          <div className="cal-days-header">
            {dayNames.map(d => <span key={d} className="cal-day-name">{d}</span>)}
          </div>

          {/* Calendar Grid */}
          <div className="cal-grid">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                className={`cal-day ${!day ? 'empty' : ''} ${selectedDate === day ? 'selected' : ''} ${isToday(day) ? 'today' : ''} ${isPast(day) ? 'past' : ''}`}
                disabled={!day || isPast(day)}
                onClick={() => day && !isPast(day) && setSelectedDate(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="date-helper-card animate-slide-up">
            <div className="date-helper-icon">📅</div>
            <div className="date-helper-text">
              <p className="date-helper-label">Your test date</p>
              <p className="date-helper-value">{formatSelected()}</p>
            </div>
          </div>
        )}

        <button className="ob-skip-text" onClick={() => onNext(null)}>
          I don't know yet
        </button>
      </div>

      <div className="ob-footer">
        <button className="ob-btn-back" onClick={onBack}>Back</button>
        <button
          className={`ob-btn-primary ${!selectedDate ? 'disabled' : ''}`}
          disabled={!selectedDate}
          onClick={() => onNext(selectedDate)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ExamDateScreen;
