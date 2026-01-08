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
      case 'on-track': return 'bg-green-500';
      case 'at-risk': return 'bg-ffYellow';
      case 'completed': return 'bg-ffGreen';
      default: return 'bg-ffMidGrey';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-ffGreen text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-ffLightGrey">
      <h3 className="text-lg font-bold text-ffBlack mb-6">Investment Obligations Tracker</h3>
      <div className="space-y-6">
        {obligations.map((obligation) => {
          const progress = (obligation.current / obligation.target) * 100;

          return (
            <div key={obligation.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-sm text-ffBlack">
                      {getJVName(obligation.jvId)}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(obligation.status)}`}>
                      {obligation.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-ffMidGrey mt-1">
                    {obligation.type === 'studio' ? 'Studio Investments' : 'Accelerator Investments'} ·
                    Deadline: {new Date(obligation.deadline).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ffBlack">
                    {obligation.current} / {obligation.target}
                  </p>
                  <p className="text-xs text-ffMidGrey">{Math.round(progress)}% complete</p>
                </div>
              </div>

              <div className="w-full bg-ffLightGrey rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${getStatusColor(obligation.status)}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
