import React, { useState } from 'react';
import type { Obligation, JointVenture } from '../types';

interface ObligationsTrackerProps {
  obligations: Obligation[];
  jointVentures: JointVenture[];
}

export const ObligationsTracker: React.FC<ObligationsTrackerProps> = ({
  obligations,
  jointVentures
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getJVName = (jvId: string) => {
    return jointVentures.find(jv => jv.id === jvId)?.partnerName || 'Unknown';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 relative overflow-hidden mb-8">
      {/* Animated isometric grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(30deg, transparent 48%, rgba(0,0,0,0.8) 49%, rgba(0,0,0,0.8) 51%, transparent 52%),
          linear-gradient(150deg, transparent 48%, rgba(0,0,0,0.8) 49%, rgba(0,0,0,0.8) 51%, transparent 52%)
        `,
        backgroundSize: '60px 60px',
        animation: 'isometric-drift 20s linear infinite'
      }}></div>

      <style>
        {`
          @keyframes isometric-drift {
            from { background-position: 0 0, 0 0; }
            to { background-position: 60px 60px, -60px -60px; }
          }
          @keyframes float-up {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(-10px) scale(1.05); opacity: 0.8; }
          }
        `}
      </style>

      {/* Header */}
      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-bold text-black">
          Investment Obligations Tracker
        </h3>
      </div>

      <div className="space-y-4 relative z-10">
        {obligations.map((obligation, index) => {
          const progress = (obligation.current / obligation.target) * 100;
          const isHovered = hoveredId === obligation.id;

          return (
            <div
              key={obligation.id}
              onMouseEnter={() => setHoveredId(obligation.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 relative group"
              style={{
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Isometric decorative elements */}
              <div className="absolute top-2 right-2 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animation: 'float-up 2s ease-in-out infinite' }}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id={`grad-${obligation.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={obligation.status === 'on-track' ? '#10b981' : obligation.status === 'at-risk' ? '#f59e0b' : '#3b82f6'} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={obligation.status === 'on-track' ? '#10b981' : obligation.status === 'at-risk' ? '#f59e0b' : '#3b82f6'} stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  {/* Isometric cube */}
                  <path d="M50,20 L80,35 L80,65 L50,80 L20,65 L20,35 Z" fill={`url(#grad-${obligation.id})`} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <path d="M50,20 L80,35 L50,50 L20,35 Z" fill={`url(#grad-${obligation.id})`} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                  <path d="M50,50 L50,80 L80,65 L80,35 Z" fill={`url(#grad-${obligation.id})`} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                </svg>
              </div>

              {/* Header Row */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h4 className="font-bold text-base text-black">
                      {getJVName(obligation.jvId)}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      obligation.status === 'on-track' ? 'bg-green-100 text-green-800' :
                      obligation.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {obligation.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Meta info - Refined and elegant */}
                  <div className="flex items-center gap-3 text-xs font-normal text-gray-500">
                    <span className="font-medium text-gray-600">
                      {obligation.type === 'studio' ? 'Studio Deals' : 'Accelerator Investments'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>
                      Deadline: {new Date(obligation.deadline).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="text-right relative">
                  <div className="text-sm font-bold text-black">
                    {obligation.current} / {obligation.target} committed
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(progress)}% complete
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ease-out ${
                      obligation.status === 'on-track' ? 'bg-green-500' :
                      obligation.status === 'at-risk' ? 'bg-yellow-400' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 relative z-10">
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">On Track</div>
          <div className="text-2xl font-bold text-green-600">
            {obligations.filter(o => o.status === 'on-track').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">At Risk</div>
          <div className="text-2xl font-bold text-yellow-600">
            {obligations.filter(o => o.status === 'at-risk').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {obligations.filter(o => o.status === 'completed').length}
          </div>
        </div>
      </div>
    </div>
  );
};
