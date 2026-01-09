import { useState } from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'deadline' | 'reminder' | 'milestone' | 'alert';
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [filter, setFilter] = useState<'all' | 'high'>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'deadline',
      title: 'Aviva Investment Deadline',
      description: 'Complete 3 remaining studio deals by end of Q1 2024',
      date: '31 Mar 2024',
      priority: 'high',
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Mediobanca SHA Renewal',
      description: 'Shareholders Agreement renewal coming up in 6 months',
      date: '15 Sep 2024',
      priority: 'medium',
    },
    {
      id: '3',
      type: 'milestone',
      title: 'Vonovia Portfolio Milestone',
      description: 'Approaching 10 companies in Vonovia portfolio',
      date: 'Today',
      priority: 'low',
    },
    {
      id: '4',
      type: 'alert',
      title: 'Fastweb Subscription Payment',
      description: 'Annual subscription payment due next month',
      date: '01 Apr 2024',
      priority: 'high',
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Q1 Portfolio Review',
      description: 'Schedule quarterly portfolio review meetings with partners',
      date: '10 Apr 2024',
      priority: 'medium',
    },
  ];

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.priority === 'high');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deadline': return 'bg-red-100 text-red-600';
      case 'reminder': return 'bg-blue-100 text-blue-600';
      case 'milestone': return 'bg-teal-100 text-teal-600';
      case 'alert': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'reminder':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'milestone':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal - Mobile optimized with bottom sheet on small screens, centered on larger */}
      <div className="fixed inset-x-0 bottom-0 md:top-20 md:bottom-auto md:left-1/2 md:-translate-x-1/2 z-50 flex items-end md:items-start justify-center px-0 md:px-4 pointer-events-none">
        <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full md:max-w-lg pointer-events-auto border border-gray-200/50 overflow-hidden animate-slideUp md:animate-slideDown max-h-[85vh] md:max-h-[70vh] flex flex-col">
          {/* Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100 flex-shrink-0">
            {/* Mobile drag indicator */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />

            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Notifications</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Close notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('high')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  filter === 'high'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                High Priority
              </button>
            </div>
          </div>

          {/* Notifications List - Scrollable */}
          <div className="overflow-y-auto flex-1">
            {filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors ${
                  index !== filteredNotifications.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 leading-tight">{notification.title}</h3>
                      {notification.priority === 'high' && (
                        <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1" />
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 leading-relaxed">{notification.description}</p>
                    <p className="text-xs text-gray-400 font-medium">{notification.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer - Optional action area on mobile */}
          <div className="px-4 md:px-6 py-3 border-t border-gray-100 bg-gray-50 flex-shrink-0 md:hidden">
            <button
              onClick={onClose}
              className="w-full py-2.5 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
