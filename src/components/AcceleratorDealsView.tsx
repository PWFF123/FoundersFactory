import { useState } from 'react';
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

export function AcceleratorDealsView() {
  const [selectedDeal, setSelectedDeal] = useState<AcceleratorDeal | null>(null);
  const [showGraduated, setShowGraduated] = useState(false);

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
      case 'Post-Program': return 'bg-green-100 text-green-700 border-green-300';
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
      case 'Post-Program': return 'bg-green-50 border-l-4 border-green-500';
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

  const deals = showGraduated ? graduatedAcceleratorDeals : activeAcceleratorDeals;

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
                  <p className={`text-sm font-bold ${calculateMOIC(deal) >= 1 ? 'text-green-600' : 'text-red-600'}`}>
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
            <div className="w-4 h-4 bg-green-500 rounded"></div>
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
  // Valuation chart data with Bloomberg-style aesthetics
  const valuationChartData = {
    labels: deal.valuationHistory?.map(v => formatDate(v.date)) || [],
    datasets: [
      {
        label: 'Company Valuation',
        data: deal.valuationHistory?.map(v => v.valuation) || [],
        borderColor: 'rgb(6, 182, 212)', // Cyan for Bloomberg feel
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        borderWidth: 3,
        tension: 0.1, // Less curved, more professional
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(6, 182, 212)',
        pointBorderColor: 'rgb(15, 23, 42)',
        pointBorderWidth: 2,
      },
    ],
  };

  // Equity doughnut chart data with professional colors
  const equityChartData = {
    labels: ['Founders Factory', 'Other Shareholders'],
    datasets: [
      {
        data: [deal.equityStake, 100 - deal.equityStake],
        backgroundColor: [
          'rgb(6, 182, 212)', // Cyan
          'rgb(30, 41, 59)', // Slate
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const moic = calculateMOIC(deal);
  const roi = calculateROI(deal);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto border border-cyan-500/20"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.05) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Bloomberg-style Header */}
        <div className="relative bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 p-8 border-b-4 border-cyan-400">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white bg-black/20 hover:bg-black/30 w-10 h-10 rounded-lg flex items-center justify-center text-2xl font-bold transition-all"
          >
            ×
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-white/80 text-xs font-mono uppercase tracking-widest">Live Data</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">{deal.companyName}</h2>
              <div className="flex gap-4 text-sm text-white/90 font-mono">
                <span className="bg-black/20 px-3 py-1 rounded">{deal.sector}</span>
                <span className="bg-black/20 px-3 py-1 rounded">{deal.batch}</span>
                <span className="bg-black/20 px-3 py-1 rounded">{deal.partner}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-xs font-mono uppercase tracking-wider mb-1">Status</div>
              <div className={`text-2xl font-bold ${
                deal.status === 'On Track' ? 'text-green-400' :
                deal.status === 'At Risk' ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {deal.status}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Bloomberg-style Terminal Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-5 hover:border-cyan-400/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-cyan-400 rounded-full"></div>
                <div className="text-xs text-cyan-400 font-mono uppercase tracking-widest">Investment</div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{formatCurrency(deal.investmentAmount)}</div>
              <div className="text-xs text-slate-400 font-mono">{deal.equityStake}% equity stake</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-5 hover:border-purple-400/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-purple-400 rounded-full"></div>
                <div className="text-xs text-purple-400 font-mono uppercase tracking-widest">Current Value</div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{formatCurrency(deal.currentValuation * deal.equityStake / 100)}</div>
              <div className="text-xs text-slate-400 font-mono">Our position</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-5 hover:border-green-400/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-green-400 rounded-full"></div>
                <div className="text-xs text-green-400 font-mono uppercase tracking-widest">MOIC</div>
              </div>
              <div className={`text-3xl font-bold mb-1 ${moic >= 1 ? 'text-green-400' : 'text-red-400'}`}>{moic.toFixed(2)}x</div>
              <div className="text-xs text-slate-400 font-mono">Multiple on invested capital</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-5 hover:border-yellow-400/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
                <div className="text-xs text-yellow-400 font-mono uppercase tracking-widest">ROI</div>
              </div>
              <div className={`text-3xl font-bold mb-1 ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>{roi.toFixed(1)}%</div>
              <div className="text-xs text-slate-400 font-mono">Return on investment</div>
            </div>
          </div>

          {/* Professional Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valuation Timeline - Bloomberg Terminal Style */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">Valuation Growth</h3>
                  <p className="text-xs text-slate-400 font-mono">Historical company valuation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-xs text-slate-400 font-mono">VALUATION</span>
                </div>
              </div>
              {deal.valuationHistory && deal.valuationHistory.length > 0 ? (
                <div className="h-64">
                  <Line
                    data={valuationChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: 'rgb(15, 23, 42)',
                          titleColor: 'rgb(6, 182, 212)',
                          bodyColor: 'rgb(255, 255, 255)',
                          borderColor: 'rgb(6, 182, 212)',
                          borderWidth: 1,
                          padding: 12,
                          displayColors: false,
                          callbacks: {
                            label: (context) => `Valuation: ${formatCurrency(context.parsed.y as number)}`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                          },
                          ticks: {
                            color: 'rgb(148, 163, 184)',
                            font: { family: 'monospace', size: 11 },
                          },
                        },
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                          },
                          ticks: {
                            color: 'rgb(148, 163, 184)',
                            font: { family: 'monospace', size: 11 },
                            callback: (value) => formatCurrency(value as number),
                          },
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <p className="text-slate-500 text-sm font-mono">No valuation data available</p>
              )}
            </div>

            {/* Equity Breakdown - Bloomberg Doughnut */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">Equity Structure</h3>
                  <p className="text-xs text-slate-400 font-mono">Ownership breakdown</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">{deal.equityStake}%</div>
                  <div className="text-xs text-slate-400 font-mono">Our Stake</div>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <Pie
                  data={equityChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'rgb(226, 232, 240)',
                          font: { family: 'monospace', size: 12 },
                          padding: 15,
                          usePointStyle: true,
                        },
                      },
                      tooltip: {
                        backgroundColor: 'rgb(15, 23, 42)',
                        titleColor: 'rgb(168, 85, 247)',
                        bodyColor: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(168, 85, 247)',
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

          {/* Additional Terminal Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fundraising Rounds - Terminal Style */}
            {deal.fundraisingRounds && deal.fundraisingRounds.length > 0 && (
              <div className="bg-slate-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
                  <h3 className="font-bold text-xl text-white">Funding Rounds</h3>
                </div>
                <div className="space-y-4">
                  {deal.fundraisingRounds.map((round, idx) => (
                    <div key={idx} className="bg-slate-800/40 border border-blue-500/10 rounded-lg p-4 hover:border-blue-400/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-white mb-1">{round.roundName}</p>
                          <p className="text-xs text-slate-400 font-mono">{formatDate(round.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-cyan-400 text-lg">{formatCurrency(round.amountRaised)}</p>
                          <p className="text-xs text-slate-400 font-mono">@ {formatCurrency(round.valuation)}</p>
                        </div>
                      </div>
                      {round.leadInvestor && (
                        <div className="mt-2 pt-2 border-t border-slate-700/50">
                          <p className="text-xs text-slate-500 font-mono">Lead Investor</p>
                          <p className="text-sm text-white font-medium">{round.leadInvestor}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Metrics - Terminal Dashboard */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-green-400 rounded-full"></div>
                <h3 className="font-bold text-xl text-white">Performance Metrics</h3>
              </div>
              <div className="space-y-4">
                {deal.keyMetrics.revenue !== undefined && (
                  <div className="bg-slate-800/40 border border-green-500/10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400 font-mono uppercase tracking-wider">Revenue</span>
                      <span className="font-bold text-white text-xl">{formatCurrency(deal.keyMetrics.revenue)}</span>
                    </div>
                  </div>
                )}
                {deal.keyMetrics.mrr !== undefined && (
                  <div className="bg-slate-800/40 border border-green-500/10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400 font-mono uppercase tracking-wider">MRR</span>
                      <span className="font-bold text-white text-xl">{formatCurrency(deal.keyMetrics.mrr)}</span>
                    </div>
                  </div>
                )}
                {deal.keyMetrics.users !== undefined && (
                  <div className="bg-slate-800/40 border border-green-500/10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400 font-mono uppercase tracking-wider">Total Users</span>
                      <span className="font-bold text-white text-xl">{deal.keyMetrics.users.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                {deal.keyMetrics.growth !== undefined && (
                  <div className="bg-slate-800/40 border border-green-500/10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400 font-mono uppercase tracking-wider">Growth (MoM)</span>
                      <span className="font-bold text-green-400 text-xl">+{deal.keyMetrics.growth}%</span>
                    </div>
                  </div>
                )}
                {deal.pricePerShare && (
                  <div className="bg-slate-800/40 border border-green-500/10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400 font-mono uppercase tracking-wider">Price / Share</span>
                      <span className="font-bold text-white text-xl">£{deal.pricePerShare.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leadership Team - Terminal Style */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-orange-400 rounded-full"></div>
              <h3 className="font-bold text-xl text-white">Leadership Team</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deal.founders.map((founder, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-orange-500/10 rounded-lg p-4 hover:border-orange-400/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{founder.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{founder.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{founder.role}</p>
                    </div>
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
