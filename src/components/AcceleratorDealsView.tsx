import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { activeAcceleratorDeals, graduatedAcceleratorDeals } from '../data/acceleratorDeals';
import type { AcceleratorDeal } from '../data/acceleratorDeals';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AcceleratorDealsViewProps {
  initialJVFilter?: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia';
}

export function AcceleratorDealsView({ initialJVFilter = 'All' }: AcceleratorDealsViewProps) {
  const [selectedDeal, setSelectedDeal] = useState<AcceleratorDeal | null>(null);
  const [showGraduated, setShowGraduated] = useState(false);
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

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Application': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'Due Diligence': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Active Program': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Post-Program': return 'bg-teal-100 text-teal-700 border-green-300';
      case 'Follow-on': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Exited': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRowColor = (stage: string) => {
    switch (stage) {
      case 'Application': return 'bg-gray-50 border-l-4 border-gray-400';
      case 'Due Diligence': return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'Active Program': return 'bg-blue-50 border-l-4 border-blue-500';
      case 'Post-Program': return 'bg-teal-50 border-l-4 border-green-500';
      case 'Follow-on': return 'bg-purple-50 border-l-4 border-purple-500';
      case 'Exited': return 'bg-red-50 border-l-4 border-red-500';
      default: return 'bg-white border-l-4 border-gray-300';
    }
  };

  const calculateMOIC = (deal: AcceleratorDeal) => {
    if (!deal.initialValuation || deal.initialValuation === 0) return 0;
    const ourValue = (deal.currentValuation * deal.equityStake) / 100;
    return ourValue / deal.investmentAmount;
  };

  const calculateROI = (deal: AcceleratorDeal) => {
    const moic = calculateMOIC(deal);
    return ((moic - 1) * 100);
  };

  const allDeals = showGraduated ? graduatedAcceleratorDeals : activeAcceleratorDeals;

  // Apply JV filter
  const deals = jvFilter === 'All'
    ? allDeals
    : allDeals.filter(deal => deal.partner === jvFilter);

  // Group deals by partner
  const dealsByPartner = deals.reduce((acc, deal) => {
    if (!acc[deal.partner]) {
      acc[deal.partner] = [];
    }
    acc[deal.partner].push(deal);
    return acc;
  }, {} as Record<string, AcceleratorDeal[]>);

  const partners = Object.keys(dealsByPartner).sort();

  const totalInvestment = deals.reduce((sum, deal) => sum + deal.investmentAmount, 0);
  const totalPortfolioValue = deals.reduce((sum, deal) => sum + (deal.currentValuation * deal.equityStake / 100), 0);
  const avgMOIC = deals.length > 0 ? deals.reduce((sum, deal) => sum + calculateMOIC(deal), 0) / deals.length : 0;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">
            {showGraduated ? 'Graduated Companies' : 'Active Portfolio'}
          </h3>
          <p className="text-3xl font-bold text-black">{deals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Across {partners.length} accelerator partners</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Investment</h3>
          <p className="text-3xl font-bold text-black">{formatCurrency(totalInvestment)}</p>
          <p className="text-xs text-gray-500 mt-2">Capital deployed</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Portfolio Value</h3>
          <p className="text-3xl font-bold text-black">{formatCurrency(totalPortfolioValue)}</p>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Avg MOIC</h3>
          <p className="text-3xl font-bold text-black">{avgMOIC.toFixed(2)}x</p>
          <p className="text-xs text-gray-500 mt-2">Multiple on invested capital</p>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-black">
          {showGraduated ? 'Graduated Companies' : 'Active Portfolio'}
        </h2>
        <button
          onClick={() => setShowGraduated(!showGraduated)}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          {showGraduated ? 'View Active Portfolio' : 'View Graduated'}
        </button>
      </div>

      {/* Deals by Partner */}
      {partners.map((partner) => (
        <div key={partner} className="bg-white rounded-lg shadow overflow-hidden">
          {/* Partner Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{partner}</h3>
              <div className="text-sm text-gray-300">
                {dealsByPartner[partner].length} compan{dealsByPartner[partner].length > 1 ? 'ies' : 'y'}
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-gray-100 border-b border-gray-300">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-bold text-gray-700 uppercase tracking-wide">
              <div className="col-span-2">Company</div>
              <div className="col-span-2">Batch</div>
              <div className="col-span-2">Stage</div>
              <div className="col-span-1">Invested</div>
              <div className="col-span-1">Equity</div>
              <div className="col-span-2">Current Value</div>
              <div className="col-span-1">MOIC</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Deal Rows */}
          <div className="divide-y divide-gray-200">
            {dealsByPartner[partner].map((deal) => (
              <div
                key={deal.id}
                className={`grid grid-cols-12 gap-2 px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${getRowColor(deal.stage)}`}
                onClick={() => setSelectedDeal(deal)}
              >
                {/* Company Name */}
                <div className="col-span-2">
                  <p className="font-semibold text-gray-900 text-sm">{deal.companyName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{deal.sector}</p>
                </div>

                {/* Batch */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{deal.batch}</p>
                    {deal.programWeek && (
                      <p className="text-xs text-gray-500 mt-0.5">Week {deal.programWeek}/12</p>
                    )}
                  </div>
                </div>

                {/* Stage */}
                <div className="col-span-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStageColor(deal.stage)}`}>
                    {deal.stage}
                  </span>
                </div>

                {/* Investment */}
                <div className="col-span-1 flex items-center">
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(deal.investmentAmount)}</p>
                </div>

                {/* Equity */}
                <div className="col-span-1 flex items-center">
                  <p className="text-sm font-bold text-indigo-600">{deal.equityStake}%</p>
                </div>

                {/* Current Value */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(deal.currentValuation * deal.equityStake / 100)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Valuation: {formatCurrency(deal.currentValuation)}</p>
                  </div>
                </div>

                {/* MOIC */}
                <div className="col-span-1 flex items-center">
                  <p className={`text-sm font-bold ${calculateMOIC(deal) >= 1 ? 'text-teal-600' : 'text-red-600'}`}>
                    {calculateMOIC(deal).toFixed(2)}x
                  </p>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDeal(deal);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                  >
                    Details →
                  </button>
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
                    {formatCurrency(dealsByPartner[partner].reduce((sum, d) => sum + (d.currentValuation * d.equityStake / 100), 0))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="font-bold text-sm mb-3 text-gray-900">Stage Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-sm text-gray-700">Application</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Due Diligence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Active Program</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-teal-500 rounded"></div>
            <span className="text-sm text-gray-700">Post-Program</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700">Follow-on</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Exited</span>
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedDeal && (
        <CompanyDetailModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          calculateMOIC={calculateMOIC}
          calculateROI={calculateROI}
        />
      )}
    </div>
  );
}

interface CompanyDetailModalProps {
  deal: AcceleratorDeal;
  onClose: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
  calculateMOIC: (deal: AcceleratorDeal) => number;
  calculateROI: (deal: AcceleratorDeal) => number;
}

function CompanyDetailModal({ deal, onClose, formatCurrency, formatDate, calculateMOIC, calculateROI }: CompanyDetailModalProps) {
  // Professional chart data - refined colors
  const valuationChartData = {
    labels: deal.valuationHistory?.map(v => formatDate(v.date)) || [],
    datasets: [
      {
        label: 'Valuation',
        data: deal.valuationHistory?.map(v => v.valuation) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
      },
    ],
  };

  // Elegant doughnut chart
  const equityChartData = {
    labels: ['Founders Factory', 'Other Shareholders'],
    datasets: [
      {
        data: [deal.equityStake, 100 - deal.equityStake],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(226, 232, 240)',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const moic = calculateMOIC(deal);
  const roi = calculateROI(deal);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Professional Header */}
        <div className="relative bg-white border-b border-gray-200 px-8 py-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="pr-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">{deal.companyName}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{deal.sector}</span>
              <span className="text-gray-300">|</span>
              <span>{deal.batch}</span>
              <span className="text-gray-300">|</span>
              <span>{deal.partner}</span>
              <span className="text-gray-300">|</span>
              <span className={`font-medium ${
                deal.status === 'On Track' ? 'text-teal-600' :
                deal.status === 'At Risk' ? 'text-amber-600' : 'text-gray-600'
              }`}>
                {deal.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 bg-gray-50">
          {/* Key Metrics - Clean & Professional */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Investment</div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">{formatCurrency(deal.investmentAmount)}</div>
              <div className="text-sm text-gray-600">{deal.equityStake}% equity</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Current Value</div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">{formatCurrency(deal.currentValuation * deal.equityStake / 100)}</div>
              <div className="text-sm text-gray-600">Our position</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">MOIC</div>
              <div className={`text-2xl font-semibold mb-1 ${moic >= 1 ? 'text-teal-600' : 'text-red-600'}`}>{moic.toFixed(2)}x</div>
              <div className="text-sm text-gray-600">Multiple on capital</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">ROI</div>
              <div className={`text-2xl font-semibold mb-1 ${roi >= 0 ? 'text-teal-600' : 'text-red-600'}`}>{roi.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Return on investment</div>
            </div>
          </div>

          {/* Professional Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valuation Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Valuation Growth</h3>
                <p className="text-sm text-gray-500 mt-1">Historical valuation trajectory</p>
              </div>
              {deal.valuationHistory && deal.valuationHistory.length > 0 ? (
                <div className="h-64">
                  <Line
                    data={valuationChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: {
                        duration: 1500,
                        easing: 'easeInOutCubic',
                      },
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: 'rgb(255, 255, 255)',
                          titleColor: 'rgb(17, 24, 39)',
                          bodyColor: 'rgb(75, 85, 99)',
                          borderColor: 'rgb(209, 213, 219)',
                          borderWidth: 1,
                          padding: 12,
                          displayColors: false,
                          titleFont: { size: 13, weight: 600 },
                          bodyFont: { size: 14, weight: 500 },
                          callbacks: {
                            label: (context) => formatCurrency(context.parsed.y as number),
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: 'rgb(243, 244, 246)',
                          },
                          ticks: {
                            color: 'rgb(107, 114, 128)',
                            font: { size: 11 },
                          },
                        },
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgb(243, 244, 246)',
                          },
                          ticks: {
                            color: 'rgb(107, 114, 128)',
                            font: { size: 11 },
                            callback: (value) => formatCurrency(value as number),
                          },
                        },
                      },
                      interaction: {
                        mode: 'index',
                        intersect: false,
                      },
                    }}
                  />
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No valuation data available</p>
              )}
            </div>

            {/* Equity Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Equity Structure</h3>
                <p className="text-sm text-gray-500 mt-1">{deal.equityStake}% ownership stake</p>
              </div>
              <div className="h-64 flex items-center justify-center">
                <Pie
                  data={equityChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      animateRotate: true,
                      animateScale: true,
                      duration: 1500,
                      easing: 'easeInOutCubic',
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'rgb(75, 85, 99)',
                          font: { size: 12 },
                          padding: 16,
                          usePointStyle: true,
                        },
                      },
                      tooltip: {
                        backgroundColor: 'rgb(255, 255, 255)',
                        titleColor: 'rgb(17, 24, 39)',
                        bodyColor: 'rgb(75, 85, 99)',
                        borderColor: 'rgb(209, 213, 219)',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                          label: (context) => `${context.label}: ${context.parsed}%`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fundraising Rounds */}
            {deal.fundraisingRounds && deal.fundraisingRounds.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Funding Rounds</h3>
                  <p className="text-sm text-gray-500 mt-1">Investment history</p>
                </div>
                <div className="space-y-3">
                  {deal.fundraisingRounds.map((round, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 bg-gray-50 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{round.roundName}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(round.date)}</p>
                          {round.leadInvestor && (
                            <p className="text-xs text-gray-600 mt-1">Lead: {round.leadInvestor}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(round.amountRaised)}</p>
                          <p className="text-xs text-gray-500 mt-1">@ {formatCurrency(round.valuation)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Metrics */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                <p className="text-sm text-gray-500 mt-1">Current company metrics</p>
              </div>
              <div className="space-y-3">
                {deal.keyMetrics.revenue !== undefined && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(deal.keyMetrics.revenue)}</span>
                  </div>
                )}
                {deal.keyMetrics.mrr !== undefined && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">MRR</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(deal.keyMetrics.mrr)}</span>
                  </div>
                )}
                {deal.keyMetrics.users !== undefined && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Total Users</span>
                    <span className="font-semibold text-gray-900">{deal.keyMetrics.users.toLocaleString()}</span>
                  </div>
                )}
                {deal.keyMetrics.growth !== undefined && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Growth (MoM)</span>
                    <span className="font-semibold text-teal-600">+{deal.keyMetrics.growth}%</span>
                  </div>
                )}
                {deal.pricePerShare && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Price per Share</span>
                    <span className="font-semibold text-gray-900">£{deal.pricePerShare.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Leadership Team</h3>
              <p className="text-sm text-gray-500 mt-1">Company founders</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deal.founders.map((founder, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">{founder.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{founder.name}</p>
                    <p className="text-xs text-gray-500">{founder.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
