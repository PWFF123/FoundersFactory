import React from 'react';
import type { Obligation, JointVenture } from '../types';

interface ObligationsTrackerProps {
  obligations: Obligation[];
  jointVentures: JointVenture[];
}

export const ObligationsTracker: React.FC<ObligationsTrackerProps> = ({
  obligations,
  jointVentures
}) => {
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700/50 shadow-2xl">
      {/* Header - Bloomberg style with Apple typography */}
      <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-gray-700/50">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">
            Investment Obligations
          </h3>
          <p className="text-xs font-normal text-gray-400 mt-0.5 tracking-tight">
            Real-time commitment tracking
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          LIVE
        </div>
      </div>

      <div className="space-y-4">
        {obligations.map((obligation) => {
          const progress = (obligation.current / obligation.target) * 100;
          const badge = getStatusBadge(obligation.status);
          const daysUntilDeadline = Math.ceil(
            (new Date(obligation.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={obligation.id}
              className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200"
            >
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

                  {/* Meta info - Bloomberg dense info style */}
                  <div className="flex items-center gap-3 text-2xs font-normal text-gray-400">
                    <span className="font-mono">
                      {obligation.type === 'studio' ? 'STU' : 'ACC'}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="tracking-tight">
                      {new Date(obligation.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }).toUpperCase()}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className={daysUntilDeadline < 30 ? 'text-amber-400' : 'text-gray-400'}>
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline}D` : 'OVERDUE'}
                    </span>
                  </div>
                </div>

                {/* Metrics - Bloomberg terminal style */}
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-white tracking-tight">
                    {obligation.current}<span className="text-gray-500 mx-1">/</span>{obligation.target}
                  </div>
                  <div className={`text-xs font-mono font-medium tracking-tight ${getStatusTextColor(obligation.status)}`}>
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar - Refined with subtle shadow */}
              <div className="relative w-full bg-gray-900/50 rounded-full h-1.5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ease-out relative ${getStatusColor(obligation.status)}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex justify-between mt-2 text-2xs font-mono text-gray-600">
                <span>0</span>
                <span className="text-gray-500">{obligation.target / 2}</span>
                <span>{obligation.target}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer stats - Bloomberg data summary */}
      <div className="mt-6 pt-4 border-t border-gray-700/30 grid grid-cols-3 gap-4">
        <div>
          <div className="text-2xs font-normal text-gray-500 mb-1 tracking-tight">ON TRACK</div>
          <div className="text-sm font-semibold text-emerald-400 font-mono">
            {obligations.filter(o => o.status === 'on-track').length}
          </div>
        </div>
        <div>
          <div className="text-2xs font-normal text-gray-500 mb-1 tracking-tight">AT RISK</div>
          <div className="text-sm font-semibold text-amber-400 font-mono">
            {obligations.filter(o => o.status === 'at-risk').length}
          </div>
        </div>
        <div>
          <div className="text-2xs font-normal text-gray-500 mb-1 tracking-tight">COMPLETED</div>
          <div className="text-sm font-semibold text-blue-400 font-mono">
            {obligations.filter(o => o.status === 'completed').length}
          </div>
        </div>
      </div>
    </div>
  );
};
