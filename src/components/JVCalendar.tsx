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

type ViewMode = 'year' | 'month' | 'day';
type JVFilter = 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia' | 'Pico';

export function JVCalendar({ isFullScreen = false, onToggleFullScreen }: JVCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [jvFilter, setJvFilter] = useState<JVFilter>('All');

  // Sample events - in production this would come from your data source
  const events: CalendarEvent[] = [
    // January
    {
      id: '1',
      date: new Date(2026, 0, 9),
      title: 'Aviva Accounting Reference',
      type: 'accounting',
      jvPartner: 'Aviva',
      description: 'Financial year end for Aviva JV',
      priority: 'high',
    },
    {
      id: '2',
      date: new Date(2026, 0, 15),
      title: 'Pico Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Pico',
      description: 'Allot and issue new shares to Pico',
      priority: 'medium',
    },
    // February
    {
      id: '3',
      date: new Date(2026, 1, 14),
      title: 'Mediobanca JV Anniversary',
      type: 'anniversary',
      jvPartner: 'Mediobanca',
      description: '2-year partnership anniversary',
      priority: 'low',
    },
    {
      id: '4',
      date: new Date(2026, 1, 28),
      title: 'Fastweb SHA Break Date',
      type: 'break-date',
      jvPartner: 'Fastweb',
      description: 'Last date to serve notice for SHA non-renewal',
      priority: 'high',
    },
    // March
    {
      id: '5',
      date: new Date(2026, 2, 15),
      title: 'Aviva SHA Break Date',
      type: 'break-date',
      jvPartner: 'Aviva',
      description: 'Last date to serve notice for SHA non-renewal',
      priority: 'high',
    },
    {
      id: '6',
      date: new Date(2026, 2, 31),
      title: 'Mediobanca Accounting Reference',
      type: 'accounting',
      jvPartner: 'Mediobanca',
      description: 'Financial year end for Mediobanca JV',
      priority: 'medium',
    },
    // April
    {
      id: '7',
      date: new Date(2026, 3, 1),
      title: 'Aviva Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Aviva',
      description: 'Allot and issue shares to Aviva',
      priority: 'high',
    },
    {
      id: '8',
      date: new Date(2026, 3, 15),
      title: 'Fastweb Subscription Renewal',
      type: 'renewal',
      jvPartner: 'Fastweb',
      description: 'Annual subscription agreement renewal',
      priority: 'medium',
    },
    // May
    {
      id: '9',
      date: new Date(2026, 4, 10),
      title: 'Vonovia Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Vonovia',
      description: 'Allot shares for Q1 performance',
      priority: 'medium',
    },
    {
      id: '10',
      date: new Date(2026, 4, 20),
      title: 'Vonovia JV Anniversary',
      type: 'anniversary',
      jvPartner: 'Vonovia',
      description: '3-year partnership anniversary',
      priority: 'low',
    },
    // June
    {
      id: '11',
      date: new Date(2026, 5, 5),
      title: 'Pico Subscription Renewal',
      type: 'renewal',
      jvPartner: 'Pico',
      description: 'Annual subscription agreement renewal',
      priority: 'medium',
    },
    {
      id: '12',
      date: new Date(2026, 5, 10),
      title: 'Pico Break Date Notice',
      type: 'break-date',
      jvPartner: 'Pico',
      description: 'Subscription agreement break date',
      priority: 'high',
    },
    {
      id: '13',
      date: new Date(2026, 5, 30),
      title: 'Vonovia Accounting Reference',
      type: 'accounting',
      jvPartner: 'Vonovia',
      description: 'Financial year end',
      priority: 'medium',
    },
    // July
    {
      id: '14',
      date: new Date(2026, 6, 1),
      title: 'Mediobanca Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Mediobanca',
      description: 'Allot shares for Q2 performance',
      priority: 'medium',
    },
    {
      id: '15',
      date: new Date(2026, 6, 15),
      title: 'Aviva Subscription Renewal',
      type: 'renewal',
      jvPartner: 'Aviva',
      description: 'Annual subscription agreement renewal',
      priority: 'high',
    },
    // August
    {
      id: '16',
      date: new Date(2026, 7, 8),
      title: 'Fastweb JV Anniversary',
      type: 'anniversary',
      jvPartner: 'Fastweb',
      description: '4-year partnership anniversary',
      priority: 'low',
    },
    {
      id: '17',
      date: new Date(2026, 7, 20),
      title: 'Mediobanca Break Date',
      type: 'break-date',
      jvPartner: 'Mediobanca',
      description: 'Last date to serve notice for SHA non-renewal',
      priority: 'high',
    },
    // September
    {
      id: '18',
      date: new Date(2026, 8, 12),
      title: 'Pico Accounting Reference',
      type: 'accounting',
      jvPartner: 'Pico',
      description: 'Financial year end',
      priority: 'medium',
    },
    {
      id: '19',
      date: new Date(2026, 8, 30),
      title: 'Fastweb Accounting Reference',
      type: 'accounting',
      jvPartner: 'Fastweb',
      description: 'Financial year end',
      priority: 'medium',
    },
    // October
    {
      id: '20',
      date: new Date(2026, 9, 1),
      title: 'Vonovia Subscription Renewal',
      type: 'renewal',
      jvPartner: 'Vonovia',
      description: 'Annual subscription agreement renewal',
      priority: 'medium',
    },
    {
      id: '21',
      date: new Date(2026, 9, 15),
      title: 'Fastweb Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Fastweb',
      description: 'Allot shares for Q3 performance',
      priority: 'medium',
    },
    // November
    {
      id: '22',
      date: new Date(2026, 10, 7),
      title: 'Pico JV Anniversary',
      type: 'anniversary',
      jvPartner: 'Pico',
      description: '1-year partnership anniversary',
      priority: 'low',
    },
    {
      id: '23',
      date: new Date(2026, 10, 20),
      title: 'Aviva Break Date Notice',
      type: 'break-date',
      jvPartner: 'Aviva',
      description: 'Subscription agreement break date',
      priority: 'high',
    },
    // December
    {
      id: '24',
      date: new Date(2026, 11, 10),
      title: 'Mediobanca Subscription Renewal',
      type: 'renewal',
      jvPartner: 'Mediobanca',
      description: 'Annual subscription agreement renewal',
      priority: 'medium',
    },
    {
      id: '25',
      date: new Date(2026, 11, 31),
      title: 'Vonovia Share Issuance',
      type: 'share-issuance',
      jvPartner: 'Vonovia',
      description: 'Year-end share allotment',
      priority: 'high',
    },
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredEvents = jvFilter === 'All'
    ? events
    : events.filter(event => event.jvPartner === jvFilter);

  const previousPeriod = () => {
    if (viewMode === 'year') {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()));
    } else if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    }
  };

  const nextPeriod = () => {
    if (viewMode === 'year') {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()));
    } else if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleMonthClick = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setViewMode('month');
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setCurrentDate(clickedDate);
    setViewMode('day');
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
    return filteredEvents.filter(event => {
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

  const renderYearView = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {monthNames.map((month, index) => {
          const daysInMonth = new Date(currentDate.getFullYear(), index + 1, 0).getDate();
          const firstDayOfMonth = new Date(currentDate.getFullYear(), index, 1).getDay();

          const miniDays = [];

          // Add empty cells for days before month starts
          for (let i = 0; i < firstDayOfMonth; i++) {
            miniDays.push(<div key={`empty-${i}`} className="aspect-square" />);
          }

          // Add all days of the month
          for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = filteredEvents.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.getDate() === day &&
                eventDate.getMonth() === index &&
                eventDate.getFullYear() === currentDate.getFullYear();
            });

            const isCurrentDay = (() => {
              const today = new Date();
              return day === today.getDate() &&
                index === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();
            })();

            miniDays.push(
              <div
                key={day}
                className="aspect-square flex items-center justify-center relative"
              >
                <span className={`text-[10px] ${isCurrentDay ? 'font-bold text-black' : 'text-gray-600'}`}>
                  {day}
                </span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-[1px]">
                    {dayEvents.slice(0, 1).map((event) => (
                      <div
                        key={event.id}
                        className={`w-1 h-1 rounded-full ${getEventTypeColor(event.type)}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={month}
              onClick={() => handleMonthClick(index)}
              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-3 group"
            >
              {/* Month name */}
              <div className="text-center mb-2">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{month}</h3>
              </div>

              {/* Mini day labels */}
              <div className="grid grid-cols-7 gap-[2px] mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-[8px] font-medium text-gray-400 uppercase">
                    {day}
                  </div>
                ))}
              </div>

              {/* Mini calendar grid */}
              <div className="grid grid-cols-7 gap-[2px]">
                {miniDays}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      days.push(
        <button
          key={day}
          onClick={() => handleDayClick(day)}
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

    return (
      <>
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
      </>
    );
  };

  const renderDayView = () => {
    const dayEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });

    return (
      <div>
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-gray-900 mb-2">
            {currentDate.getDate()}
          </h3>
          <p className="text-lg text-gray-600">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
        </div>

        <div className="space-y-4">
          {dayEvents.length > 0 ? (
            dayEvents.map(event => (
              <div
                key={event.id}
                className="group p-6 bg-white hover:bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-ffYellow transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${getEventTypeColor(event.type)} bg-opacity-10 flex items-center justify-center`}>
                    <div className={`${getEventTypeColor(event.type).replace('bg-', 'text-')}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-900 mb-2">{event.title}</p>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {event.jvPartner}
                      </span>
                      {event.priority === 'high' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
                          High Priority
                        </span>
                      )}
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border ${
                        event.type === 'break-date' ? 'bg-red-50 text-red-700 border-red-200' :
                        event.type === 'share-issuance' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        event.type === 'accounting' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        event.type === 'renewal' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-teal-50 text-teal-700 border-teal-200'
                      }`}>
                        {event.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-1">No events scheduled</p>
              <p className="text-sm text-gray-500">This day has no joint venture events</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getViewTitle = () => {
    if (viewMode === 'year') {
      return currentDate.getFullYear().toString();
    } else if (viewMode === 'month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : ''}`}>
      <div className={`${isFullScreen ? 'max-w-7xl mx-auto p-8' : ''}`}>
        <div className={`bg-white rounded-2xl ${isFullScreen ? 'shadow-2xl' : 'shadow-lg'} border border-gray-100 overflow-hidden`}>
          {/* Header */}
          <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {getViewTitle()}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Joint Venture Key Dates</p>
              </div>
              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="bg-white border border-gray-200 rounded-lg p-1 flex gap-1">
                  <button
                    onClick={() => setViewMode('year')}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                      viewMode === 'year'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Year
                  </button>
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                      viewMode === 'month'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                      viewMode === 'day'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Day
                  </button>
                </div>
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

            {/* JV Partner Filter */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter by JV:</span>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Aviva', 'Mediobanca', 'Fastweb', 'Vonovia', 'Pico'] as JVFilter[]).map(partner => (
                  <button
                    key={partner}
                    onClick={() => setJvFilter(partner)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      jvFilter === partner
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {partner}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={previousPeriod}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label={`Previous ${viewMode}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextPeriod}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label={`Next ${viewMode}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Render appropriate view */}
            {viewMode === 'year' && renderYearView()}
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'day' && renderDayView()}

            {/* Legend */}
            {viewMode !== 'day' && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Event Types</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
