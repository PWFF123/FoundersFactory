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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-emerald-500';
      case 'at-risk': return 'bg-amber-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-emerald-400';
      case 'at-risk': return 'text-amber-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' };
      case 'at-risk': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' };
      case 'completed': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
      default: return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' };
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
      {/* Animated isometric grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(30deg, transparent 48%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,0.8) 51%, transparent 52%),
          linear-gradient(150deg, transparent 48%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,0.8) 51%, transparent 52%)
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

      {/* Header - Elegant and refined */}
      <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-gray-700/50 relative z-10">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">
            Investment Obligations
          </h3>
          <p className="text-xs font-normal text-gray-400 mt-0.5 tracking-tight">
            Commitment tracking overview
          </p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {obligations.map((obligation, index) => {
          const progress = (obligation.current / obligation.target) * 100;
          const badge = getStatusBadge(obligation.status);
          const daysUntilDeadline = Math.ceil(
            (new Date(obligation.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          const isHovered = hoveredId === obligation.id;

          return (
            <div
              key={obligation.id}
              onMouseEnter={() => setHoveredId(obligation.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 relative group"
              style={{
                transform: isHovered ? 'translateY(-2px) rotateX(2deg)' : 'translateY(0)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
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
                    <h4 className="font-semibold text-sm text-white tracking-tight">
                      {getJVName(obligation.jvId)}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-2xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {obligation.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Meta info - Refined and elegant */}
                  <div className="flex items-center gap-3 text-xs font-normal text-gray-400">
                    <span className="px-2 py-0.5 bg-gray-700/30 rounded text-2xs">
                      {obligation.type === 'studio' ? 'Studio' : 'Accelerator'}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="tracking-tight">
                      {new Date(obligation.deadline).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className={daysUntilDeadline < 30 ? 'text-amber-400' : 'text-gray-400'}>
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} days remaining` : 'Overdue'}
                    </span>
                  </div>
                </div>

                {/* Metrics - Elegant and refined */}
                <div className="text-right relative">
                  <div className="text-sm font-semibold text-white tracking-tight">
                    {obligation.current}<span className="text-gray-500 mx-1">/</span>{obligation.target}
                  </div>
                  <div className={`text-xs font-medium tracking-tight ${getStatusTextColor(obligation.status)}`}>
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar - Refined with isometric depth effect */}
              <div className="relative w-full bg-gray-900/50 rounded-full h-2 overflow-visible mb-1">
                {/* Isometric shadow layer */}
                <div className="absolute inset-0 rounded-full" style={{
                  transform: 'translateY(2px) scaleY(0.3)',
                  background: 'rgba(0,0,0,0.3)',
                  filter: 'blur(2px)'
                }}></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full"></div>
                <div
                  className={`h-2 rounded-full transition-all duration-700 ease-out relative ${getStatusColor(obligation.status)}`}
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.2)',
                    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                  {/* Isometric top edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 rounded-full"></div>
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex justify-between mt-2 text-2xs text-gray-600">
                <span>0</span>
                <span className="text-gray-500">{obligation.target / 2}</span>
                <span>{obligation.target}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer stats - Elegant summary with isometric cards */}
      <div className="mt-6 pt-4 border-t border-gray-700/30 grid grid-cols-3 gap-4 relative z-10">
        {[
          { label: 'On Track', status: 'on-track', color: 'emerald', count: obligations.filter(o => o.status === 'on-track').length },
          { label: 'At Risk', status: 'at-risk', color: 'amber', count: obligations.filter(o => o.status === 'at-risk').length },
          { label: 'Completed', status: 'completed', color: 'blue', count: obligations.filter(o => o.status === 'completed').length }
        ].map((stat, idx) => (
          <div
            key={stat.status}
            className="relative group cursor-default"
            style={{
              animation: `float-up 3s ease-in-out infinite`,
              animationDelay: `${idx * 0.2}s`
            }}
          >
            {/* Isometric card effect */}
            <div className="absolute inset-0 bg-gray-700/20 rounded-lg transform translate-x-1 translate-y-1"></div>
            <div className="relative bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-300"
              style={{
                transform: 'translateZ(0)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <div className="text-xs font-normal text-gray-500 mb-1 tracking-tight">{stat.label}</div>
              <div className={`text-lg font-semibold text-${stat.color}-400 flex items-center gap-2`}>
                {stat.count}
                {/* Small isometric indicator */}
                <svg width="12" height="12" viewBox="0 0 20 20" className="opacity-50">
                  <path d="M10,2 L18,6 L18,14 L10,18 L2,14 L2,6 Z"
                    fill="currentColor"
                    opacity="0.2"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
