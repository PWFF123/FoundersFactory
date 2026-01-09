import React from 'react';
import type { JointVenture } from '../types';

interface JVDetailTableProps {
  jointVentures: JointVenture[];
}

export const JVDetailTable: React.FC<JVDetailTableProps> = ({ jointVentures }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-ffLightGrey">
      <h3 className="text-lg font-bold text-ffBlack mb-6">Joint Venture Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-ffBlack">
              <th className="text-left py-3 px-4 text-xs font-bold text-ffBlack uppercase tracking-wide">
                Partner
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-ffBlack uppercase tracking-wide">
                FF Stake
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-ffBlack uppercase tracking-wide">
                Investment
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-ffBlack uppercase tracking-wide">
                Portfolio Co's
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-ffBlack uppercase tracking-wide">
                Portfolio Value
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-ffBlack uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jointVentures.map((jv, index) => (
              <tr
                key={jv.id}
                className={`border-b border-ffLightGrey hover:bg-ffYellow/10 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-ffLightGrey/30'
                }`}
              >
                <td className="py-4 px-4">
                  <p className="font-semibold text-sm text-ffBlack">{jv.partnerName}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-ffLightGrey rounded-full h-2">
                      <div
                        className="bg-ffYellow h-2 rounded-full transition-all duration-500"
                        style={{ width: `${jv.shareholding}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-ffBlack">{jv.shareholding}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold text-ffBlack">{formatCurrency(jv.investmentAmount)}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold text-ffBlack text-center">{jv.portfolioCompanies}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-bold text-ffGreen">{formatCurrency(jv.portfolioValue)}</p>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      jv.status === 'active'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {jv.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
