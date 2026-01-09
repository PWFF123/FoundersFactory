import { useState } from 'react';

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'break-date' | 'share-issuance' | 'accounting' | 'renewal' | 'anniversary';
  jvPartner: 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia' | 'Pico';
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface JVCalendarProps {
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

export function JVCalendar({ isFullScreen = false, onToggleFullScreen }: JVCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample events - in production this would come from your data source
  const events: CalendarEvent[] = [
    {
      id: '1',
      date: new Date(2024, 2, 15),
      title: 'Aviva SHA Break Date',
      type: 'break-date',
      jvPartner: 'Aviva',
      description: 'Last date to serve notice for SHA non-renewal',
      priority: 'high',
    },
    {
      id: '2',
      date: new Date(2024, 2, 31),
      title: 'Mediobanca Accounting Reference',
      type: 'accounting',
      jvPartner: 'Mediobanca',
      description: 'Financial year end for Mediobanca JV',
      priority: 'medium',
    },
    {
      id: '3',
      date: new Date(2024, 3, 1),
      title: 'Aviva Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Aviva',
      description: 'Allot and issue shares to Aviva',
      priority: 'high',
    },
    {
      id: '4',
      date: new Date(2024, 3, 15),
      title: 'Fastweb Subscription Renewal',
      type: 'renewal',
      jvPartner: 'Fastweb',
      description: 'Annual subscription agreement renewal',
      priority: 'medium',
    },
    {
      id: '5',
      date: new Date(2024, 4, 20),
      title: 'Vonovia JV Anniversary',
      type: 'anniversary',
      jvPartner: 'Vonovia',
      description: '3-year partnership anniversary',
      priority: 'low',
    },
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'break-date': return 'bg-red-500';
      case 'share-issuance': return 'bg-purple-500';
      case 'accounting': return 'bg-blue-500';
      case 'renewal': return 'bg-amber-500';
      case 'anniversary': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'break-date':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'share-issuance':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'accounting':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'renewal':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'anniversary':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        className={`aspect-square p-1.5 rounded-xl transition-all duration-200 relative group ${
          isToday(day)
            ? 'bg-black text-white font-semibold shadow-lg'
            : isSelected(day)
            ? 'bg-ffYellow/20 ring-2 ring-ffYellow'
            : 'hover:bg-gray-50'
        }`}
      >
        <span className={`text-sm block ${isToday(day) ? 'text-white' : 'text-gray-900'}`}>{day}</span>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`w-1 h-1 rounded-full ${getEventTypeColor(event.type)}`}
              />
            ))}
          </div>
        )}
      </button>
    );
  }

  const selectedDateEvents = selectedDate ? events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear();
  }) : [];

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : ''}`}>
      <div className={`${isFullScreen ? 'max-w-7xl mx-auto p-8' : ''}`}>
        <div className={`bg-white rounded-2xl ${isFullScreen ? 'shadow-2xl' : 'shadow-lg'} border border-gray-100 overflow-hidden`}>
          {/* Header */}
          <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Joint Venture Key Dates</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Today
                </button>
                {onToggleFullScreen && (
                  <button
                    onClick={onToggleFullScreen}
                    className="p-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
                  >
                    {isFullScreen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={previousMonth}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Previous month"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextMonth}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Next month"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className={`${isFullScreen ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : ''} p-6`}>
            {/* Calendar Grid */}
            <div className={isFullScreen ? 'lg:col-span-2' : ''}>
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {days}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Event Types</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-600">Break Dates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-xs text-gray-600">Share Issuance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-600">Accounting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-gray-600">Renewals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500" />
                    <span className="text-xs text-gray-600">Anniversaries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Sidebar */}
            {(isFullScreen || selectedDate) && (
              <div className={`${isFullScreen ? '' : 'mt-6 pt-6 border-t border-gray-100'}`}>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  {selectedDate
                    ? `Events on ${selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
                    : 'Upcoming Events'}
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map(event => (
                      <div
                        key={event.id}
                        className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${getEventTypeColor(event.type)} bg-opacity-10 flex items-center justify-center`}>
                            <div className={`${getEventTypeColor(event.type).replace('bg-', 'text-')}`}>
                              {getEventTypeIcon(event.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 mb-1">{event.title}</p>
                            <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white text-gray-700 border border-gray-200">
                                {event.jvPartner}
                              </span>
                              {event.priority === 'high' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                  High Priority
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No events scheduled for this date</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
