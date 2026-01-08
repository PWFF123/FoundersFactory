import React from 'react';
import type { PortfolioCompany } from '../types';

interface PortfolioValueCardProps {
  companies: PortfolioCompany[];
}

export const PortfolioValueCard: React.FC<PortfolioValueCardProps> = ({ companies }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(2)}M`;
    }
    return `£${(amount / 1000).toFixed(0)}K`;
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-ffLightGrey">
      <h3 className="text-lg font-bold text-ffBlack mb-6">Portfolio Companies</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {companies.map((company) => (
          <div
            key={company.id}
            className="p-4 bg-ffLightGrey rounded-lg hover:bg-ffYellow/10 hover:border hover:border-ffYellow transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-bold text-sm text-ffBlack">{company.name}</h4>
                <p className="text-xs text-ffMidGrey mt-1">{company.sector}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-ffBlack">
                  {formatCurrency(company.latestValuation)}
                </p>
                <span
                  className={`text-xs font-medium ${
                    company.valuationChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {company.valuationChange >= 0 ? '↑' : '↓'} {formatPercentage(company.valuationChange)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-ffMidGrey/20">
              <div>
                <p className="text-xs text-ffMidGrey">Equity Stake</p>
                <p className="text-sm font-semibold text-ffBlack">{company.equityStake}%</p>
              </div>
              <div>
                <p className="text-xs text-ffMidGrey">Current Value</p>
                <p className="text-sm font-semibold text-ffBlack">
                  {formatCurrency(company.currentValue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-ffMidGrey">Last Round</p>
                <p className="text-sm font-semibold text-ffBlack">
                  {formatCurrency(company.lastFundraisingAmount)}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-xs text-ffMidGrey">
                Last fundraising: {new Date(company.lastFundraisingDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
