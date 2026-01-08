import { useState, useEffect } from 'react';
import { activeStudioDeals, completedStudioDeals } from '../data/studioDeals';
import type { StudioDeal } from '../data/studioDeals';

interface StudioDealsViewProps {
  initialJVFilter?: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia';
}

export function StudioDealsView({ initialJVFilter = 'All' }: StudioDealsViewProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [jvFilter, setJvFilter] = useState<'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia'>(initialJVFilter);

  // Update filter when prop changes
  useEffect(() => {
    setJvFilter(initialJVFilter);
  }, [initialJVFilter]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(2)}M`;
    }
    return `£${(amount / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getSpinOutStatusColor = (status: string) => {
    switch (status) {
      case 'In Studio': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'IC Approved': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Legal Spin Out': return 'bg-green-100 text-green-700 border-green-300';
      case 'Fully Independent': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRowColor = (spinOutStatus: string) => {
    switch (spinOutStatus) {
      case 'In Studio': return 'bg-gray-50 border-l-4 border-gray-400';
      case 'IC Approved': return 'bg-blue-50 border-l-4 border-blue-500';
      case 'Legal Spin Out': return 'bg-green-50 border-l-4 border-green-500';
      case 'Fully Independent': return 'bg-purple-50 border-l-4 border-purple-500';
      default: return 'bg-white border-l-4 border-gray-300';
    }
  };

  const allDeals = showCompleted ? completedStudioDeals : activeStudioDeals;

  // Apply JV filter
  const deals = jvFilter === 'All'
    ? allDeals
    : allDeals.filter(deal => deal.partner === jvFilter);

  // Group deals by JV partner
  const dealsByPartner = deals.reduce((acc, deal) => {
    if (!acc[deal.partner]) {
      acc[deal.partner] = [];
    }
    acc[deal.partner].push(deal);
    return acc;
  }, {} as Record<string, StudioDeal[]>);

  const partners = Object.keys(dealsByPartner).sort();

  const totalInvestment = deals.reduce((sum, deal) => sum + deal.investmentAmount, 0);
  const totalValuation = deals.reduce((sum, deal) => sum + deal.currentValuation, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">
            {showCompleted ? 'Completed Studio Deals' : 'Active Studio Deals'}
          </h3>
          <p className="text-3xl font-bold text-black">{deals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Across {partners.length} JV partners</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Investment</h3>
          <p className="text-3xl font-bold text-black">{formatCurrency(totalInvestment)}</p>
          <p className="text-xs text-gray-500 mt-2">Capital deployed</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Portfolio Value</h3>
          <p className="text-3xl font-bold text-black">{formatCurrency(totalValuation)}</p>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Avg JV Equity</h3>
          <p className="text-3xl font-bold text-black">
            {(deals.reduce((sum, d) => sum + d.jvEquityStake, 0) / deals.length).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-2">Partner stake</p>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-black">
          {showCompleted ? 'Completed Studio Deals' : 'Active Studio Deals'}
        </h2>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          {showCompleted ? 'View Active Deals' : 'View Completed Deals'}
        </button>
      </div>

      {/* Deals by JV Partner */}
      {partners.map((partner) => (
        <div key={partner} className="bg-white rounded-lg shadow overflow-hidden">
          {/* Partner Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{partner}</h3>
              <div className="text-sm text-gray-300">
                {dealsByPartner[partner].length} deal{dealsByPartner[partner].length > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-gray-100 border-b border-gray-300">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-bold text-gray-700 uppercase tracking-wide">
              <div className="col-span-2">Company</div>
              <div className="col-span-1">Launch IC</div>
              <div className="col-span-2">Spin Out Status</div>
              <div className="col-span-1">Invested</div>
              <div className="col-span-1">JV Equity</div>
              <div className="col-span-2">Incorporation</div>
              <div className="col-span-2">Projected Close</div>
              <div className="col-span-1">Sector</div>
            </div>
          </div>

          {/* Deal Rows */}
          <div className="divide-y divide-gray-200">
            {dealsByPartner[partner].map((deal) => (
              <div
                key={deal.id}
                className={`grid grid-cols-12 gap-2 px-4 py-4 hover:bg-gray-50 transition-colors ${getRowColor(deal.spinOutStatus)}`}
              >
                {/* Company Name */}
                <div className="col-span-2">
                  <p className="font-semibold text-gray-900 text-sm">{deal.companyName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {deal.stage} • {deal.status}
                  </p>
                </div>

                {/* Launch IC Date */}
                <div className="col-span-1 flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatDate(deal.launchICDate)}</p>
                  </div>
                </div>

                {/* Spin Out Status */}
                <div className="col-span-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSpinOutStatusColor(deal.spinOutStatus)}`}>
                    {deal.spinOutStatus}
                  </span>
                </div>

                {/* Amount Invested */}
                <div className="col-span-1 flex items-center">
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(deal.investmentAmount)}</p>
                </div>

                {/* JV Equity */}
                <div className="col-span-1 flex items-center">
                  <p className="text-sm font-bold text-indigo-600">{deal.jvEquityStake}%</p>
                </div>

                {/* Incorporation Location */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-sm text-gray-700">{deal.incorporationLocation}</p>
                  </div>
                </div>

                {/* Projected Closing */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {deal.actualCompletion ? formatDate(deal.actualCompletion) : formatDate(deal.projectedClosingDate)}
                    </p>
                    {deal.actualCompletion && (
                      <p className="text-xs text-green-600 mt-0.5">✓ Completed</p>
                    )}
                  </div>
                </div>

                {/* Sector */}
                <div className="col-span-1 flex items-center">
                  <p className="text-xs text-gray-600">{deal.sector}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Summary */}
          <div className="bg-gray-50 px-6 py-3 border-t-2 border-gray-300">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-700">
                {partner} Totals:
              </span>
              <div className="flex gap-6">
                <span className="text-gray-600">
                  Investment: <span className="font-bold text-black">
                    {formatCurrency(dealsByPartner[partner].reduce((sum, d) => sum + d.investmentAmount, 0))}
                  </span>
                </span>
                <span className="text-gray-600">
                  Portfolio Value: <span className="font-bold text-black">
                    {formatCurrency(dealsByPartner[partner].reduce((sum, d) => sum + d.currentValuation, 0))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="font-bold text-sm mb-3 text-gray-900">Status Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-sm text-gray-700">In Studio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">IC Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Legal Spin Out</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700">Fully Independent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
