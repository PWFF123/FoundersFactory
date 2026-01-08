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
  // NASA-grade technical chart data
  const valuationChartData = {
    labels: deal.valuationHistory?.map(v => formatDate(v.date)) || [],
    datasets: [
      {
        label: 'Company Valuation',
        data: deal.valuationHistory?.map(v => v.valuation) || [],
        borderColor: 'rgb(14, 165, 233)', // Sky blue
        backgroundColor: 'rgba(14, 165, 233, 0.08)',
        borderWidth: 2,
        tension: 0, // Straight lines for technical look
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(14, 165, 233)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'rgb(239, 68, 68)',
        pointHoverBorderColor: 'rgb(255, 255, 255)',
      },
    ],
  };

  // Technical doughnut chart
  const equityChartData = {
    labels: ['Founders Factory', 'Other Shareholders'],
    datasets: [
      {
        data: [deal.equityStake, 100 - deal.equityStake],
        backgroundColor: [
          'rgb(14, 165, 233)', // Sky blue
          'rgb(226, 232, 240)', // Light gray
        ],
        borderWidth: 3,
        borderColor: 'rgb(255, 255, 255)',
        hoverOffset: 12,
        hoverBorderWidth: 4,
      },
    ],
  };

  const moic = calculateMOIC(deal);
  const roi = calculateROI(deal);

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-none shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto border-4 border-black"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(226, 232, 240) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(226, 232, 240) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* NASA-Grade Technical Header */}
        <div className="relative bg-gradient-to-r from-slate-50 to-gray-100 border-b-4 border-black p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-black hover:text-red-600 font-mono text-2xl font-bold w-12 h-12 border-2 border-black hover:border-red-600 flex items-center justify-center transition-all bg-white"
          >
            ×
          </button>

          {/* Technical header grid */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 animate-pulse border border-black"></div>
                <span className="text-black text-[10px] font-mono uppercase tracking-[0.2em] font-bold">SYSTEM ONLINE</span>
                <span className="text-gray-400 text-[10px] font-mono">|</span>
                <span className="text-gray-600 text-[10px] font-mono">{new Date().toISOString()}</span>
              </div>
              <h2 className="text-5xl font-black text-black mb-2 tracking-tight uppercase">{deal.companyName}</h2>
              <div className="flex gap-3 text-xs font-mono font-bold">
                <span className="bg-black text-white px-3 py-1.5 uppercase tracking-wider">{deal.sector}</span>
                <span className="border-2 border-black px-3 py-1.5 uppercase tracking-wider">{deal.batch}</span>
                <span className="bg-sky-500 text-white px-3 py-1.5 uppercase tracking-wider">{deal.partner}</span>
              </div>
            </div>
            <div className="col-span-4 border-l-4 border-black pl-6">
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2 font-bold">CURRENT STATUS</div>
                <div className={`text-4xl font-black uppercase tracking-tight ${
                  deal.status === 'On Track' ? 'text-green-600' :
                  deal.status === 'At Risk' ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {deal.status}
                </div>
                <div className="mt-2 h-2 bg-gray-200 border border-black">
                  <div
                    className={`h-full ${
                      deal.status === 'On Track' ? 'bg-green-500' :
                      deal.status === 'At Risk' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                    style={{ width: deal.status === 'On Track' ? '100%' : deal.status === 'At Risk' ? '60%' : '30%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 bg-white">
          {/* NASA-Grade Technical Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-4 border-black bg-gradient-to-b from-white to-gray-50 p-6 hover:shadow-2xl transition-all relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3 font-bold">INVESTMENT</div>
              <div className="text-4xl font-black text-black mb-2">{formatCurrency(deal.investmentAmount)}</div>
              <div className="text-xs font-mono text-gray-600 uppercase tracking-wider">{deal.equityStake}% EQUITY STAKE</div>
              <div className="mt-3 h-1 bg-gray-200">
                <div className="h-full bg-sky-500 transition-all group-hover:w-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div className="border-4 border-black bg-gradient-to-b from-white to-gray-50 p-6 hover:shadow-2xl transition-all relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3 font-bold">CURRENT VALUE</div>
              <div className="text-4xl font-black text-black mb-2">{formatCurrency(deal.currentValuation * deal.equityStake / 100)}</div>
              <div className="text-xs font-mono text-gray-600 uppercase tracking-wider">OUR POSITION</div>
              <div className="mt-3 h-1 bg-gray-200">
                <div className="h-full bg-purple-500 transition-all group-hover:w-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="border-4 border-black bg-gradient-to-b from-white to-gray-50 p-6 hover:shadow-2xl transition-all relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3 font-bold">MOIC</div>
              <div className={`text-4xl font-black mb-2 ${moic >= 1 ? 'text-green-600' : 'text-red-600'}`}>{moic.toFixed(2)}x</div>
              <div className="text-xs font-mono text-gray-600 uppercase tracking-wider">MULTIPLE ON CAPITAL</div>
              <div className="mt-3 h-1 bg-gray-200">
                <div className={`h-full transition-all group-hover:w-full ${moic >= 1 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min(moic * 50, 100)}%` }}></div>
              </div>
            </div>

            <div className="border-4 border-black bg-gradient-to-b from-white to-gray-50 p-6 hover:shadow-2xl transition-all relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3 font-bold">ROI</div>
              <div className={`text-4xl font-black mb-2 ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>{roi.toFixed(1)}%</div>
              <div className="text-xs font-mono text-gray-600 uppercase tracking-wider">RETURN ON INVESTMENT</div>
              <div className="mt-3 h-1 bg-gray-200">
                <div className={`h-full transition-all group-hover:w-full ${roi >= 0 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${Math.min(Math.abs(roi), 100)}%` }}></div>
              </div>
            </div>
          </div>

          {/* NASA-Grade Technical Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Valuation Timeline - Technical Readout */}
            <div className="border-4 border-black bg-white p-6 relative group hover:shadow-2xl transition-all">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-500 to-blue-600"></div>
              <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
                <div>
                  <h3 className="font-black text-2xl text-black mb-1 uppercase tracking-tight">Valuation Growth</h3>
                  <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">Historical Timeline</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-sky-500 border-2 border-black"></div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">VALUATION</span>
                </div>
              </div>
              {deal.valuationHistory && deal.valuationHistory.length > 0 ? (
                <div className="h-72">
                  <Line
                    data={valuationChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart',
                      },
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: 'rgb(0, 0, 0)',
                          titleColor: 'rgb(14, 165, 233)',
                          bodyColor: 'rgb(255, 255, 255)',
                          borderColor: 'rgb(14, 165, 233)',
                          borderWidth: 2,
                          padding: 16,
                          displayColors: false,
                          titleFont: { family: 'monospace', size: 12, weight: 'bold' },
                          bodyFont: { family: 'monospace', size: 14, weight: 'bold' },
                          callbacks: {
                            label: (context) => `VAL: ${formatCurrency(context.parsed.y as number)}`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            lineWidth: 1,
                          },
                          ticks: {
                            color: 'rgb(0, 0, 0)',
                            font: { family: 'monospace', size: 10, weight: 'bold' },
                          },
                        },
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            lineWidth: 1,
                          },
                          ticks: {
                            color: 'rgb(0, 0, 0)',
                            font: { family: 'monospace', size: 10, weight: 'bold' },
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
                <p className="text-gray-500 text-sm font-mono uppercase">No valuation data available</p>
              )}
            </div>

            {/* Equity Breakdown - Technical Doughnut */}
            <div className="border-4 border-black bg-white p-6 relative group hover:shadow-2xl transition-all">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
                <div>
                  <h3 className="font-black text-2xl text-black mb-1 uppercase tracking-tight">Equity Structure</h3>
                  <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">Ownership Breakdown</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-sky-500">{deal.equityStake}%</div>
                  <div className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">OUR STAKE</div>
                </div>
              </div>
              <div className="h-72 flex items-center justify-center">
                <Pie
                  data={equityChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      animateRotate: true,
                      animateScale: true,
                      duration: 2000,
                      easing: 'easeInOutQuart',
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'rgb(0, 0, 0)',
                          font: { family: 'monospace', size: 11, weight: 'bold' },
                          padding: 20,
                          usePointStyle: true,
                          pointStyle: 'rectRounded',
                        },
                      },
                      tooltip: {
                        backgroundColor: 'rgb(0, 0, 0)',
                        titleColor: 'rgb(168, 85, 247)',
                        bodyColor: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 2,
                        padding: 16,
                        titleFont: { family: 'monospace', size: 12, weight: 'bold' },
                        bodyFont: { family: 'monospace', size: 14, weight: 'bold' },
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

          {/* NASA-Grade Data Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fundraising Rounds - Technical Readout */}
            {deal.fundraisingRounds && deal.fundraisingRounds.length > 0 && (
              <div className="border-4 border-black bg-white p-6 relative hover:shadow-2xl transition-all">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-200 pb-4">
                  <h3 className="font-black text-2xl text-black uppercase tracking-tight">Funding Rounds</h3>
                </div>
                <div className="space-y-3">
                  {deal.fundraisingRounds.map((round, idx) => (
                    <div key={idx} className="border-l-4 border-sky-500 bg-gradient-to-r from-gray-50 to-white p-4 hover:shadow-lg transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-black text-black text-sm uppercase">{round.roundName}</p>
                          <p className="text-[10px] text-gray-600 font-mono tracking-wider">{formatDate(round.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-sky-600 text-xl">{formatCurrency(round.amountRaised)}</p>
                          <p className="text-[10px] text-gray-600 font-mono">@ {formatCurrency(round.valuation)}</p>
                        </div>
                      </div>
                      {round.leadInvestor && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">Lead Investor</p>
                          <p className="text-xs text-black font-bold">{round.leadInvestor}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Metrics - Technical Dashboard */}
            <div className="border-4 border-black bg-white p-6 relative hover:shadow-2xl transition-all">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-200 pb-4">
                <h3 className="font-black text-2xl text-black uppercase tracking-tight">Performance</h3>
              </div>
              <div className="space-y-3">
                {deal.keyMetrics.revenue !== undefined && (
                  <div className="border-2 border-gray-300 bg-gradient-to-r from-white to-gray-50 p-4 hover:border-green-500 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">Revenue</span>
                      <span className="font-black text-black text-2xl">{formatCurrency(deal.keyMetrics.revenue)}</span>
                    </div>
                  </div>
                )}
                {deal.keyMetrics.mrr !== undefined && (
                  <div className="border-2 border-gray-300 bg-gradient-to-r from-white to-gray-50 p-4 hover:border-green-500 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">MRR</span>
                      <span className="font-black text-black text-2xl">{formatCurrency(deal.keyMetrics.mrr)}</span>
                    </div>
                  </div>
                )}
                {deal.keyMetrics.users !== undefined && (
                  <div className="border-2 border-gray-300 bg-gradient-to-r from-white to-gray-50 p-4 hover:border-green-500 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">Total Users</span>
                      <span className="font-black text-black text-2xl">{deal.keyMetrics.users.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                {deal.keyMetrics.growth !== undefined && (
                  <div className="border-2 border-gray-300 bg-gradient-to-r from-white to-gray-50 p-4 hover:border-green-500 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">Growth (MoM)</span>
                      <span className="font-black text-green-600 text-2xl">+{deal.keyMetrics.growth}%</span>
                    </div>
                  </div>
                )}
                {deal.pricePerShare && (
                  <div className="border-2 border-gray-300 bg-gradient-to-r from-white to-gray-50 p-4 hover:border-green-500 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-bold">Price / Share</span>
                      <span className="font-black text-black text-2xl">£{deal.pricePerShare.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leadership Team - Technical Roster */}
          <div className="border-4 border-black bg-white p-6 relative hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-200 pb-4">
              <h3 className="font-black text-2xl text-black uppercase tracking-tight">Leadership Team</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deal.founders.map((founder, idx) => (
                <div key={idx} className="border-2 border-gray-300 bg-gradient-to-br from-white to-gray-50 p-4 hover:border-orange-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 border-4 border-black bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <span className="text-white font-black text-xl">{founder.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-black text-black text-sm uppercase">{founder.name}</p>
                      <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">{founder.role}</p>
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
