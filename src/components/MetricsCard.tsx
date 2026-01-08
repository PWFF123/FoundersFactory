import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue
}) => {
  const getTrendColor = () => {
    if (!trend) return '';
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-ffMidGrey';
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-ffLightGrey hover:border-ffYellow transition-all duration-300">
      <h3 className="text-sm font-light text-ffMidGrey uppercase tracking-wide mb-2">
        {title}
      </h3>
      <div className="flex items-baseline gap-3">
        <p className="text-3xl font-bold text-ffBlack">{value}</p>
        {trendValue && (
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-ffMidGrey mt-2">{subtitle}</p>
      )}
    </div>
  );
};
