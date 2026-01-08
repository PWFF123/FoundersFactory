import { useState } from 'react';
import { activeAcceleratorDeals, graduatedAcceleratorDeals } from '../data/acceleratorDeals';
import type { AcceleratorDeal } from '../data/acceleratorDeals';

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
      case 'Application': return 'bg-gray-100 text-gray-800';
      case 'Due Diligence': return 'bg-blue-100 text-blue-800';
      case 'Active Program': return 'bg-purple-100 text-purple-800';
      case 'Post-Program': return 'bg-green-100 text-green-800';
      case 'Follow-on': return 'bg-yellow-100 text-yellow-800';
      case 'Exited': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Graduated': return 'bg-blue-100 text-blue-800';
      case 'Pivoted': return 'bg-orange-100 text-orange-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFollowOnColor = (potential: string) => {
    switch (potential) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-orange-600';
      case 'None': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const deals = showGraduated ? graduatedAcceleratorDeals : activeAcceleratorDeals;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Active Cohort</h3>
          <p className="text-3xl font-bold text-black">
            {activeAcceleratorDeals.filter(d => d.stage === 'Active Program').length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Companies in program</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Invested</h3>
          <p className="text-3xl font-bold text-black">
            {formatCurrency(activeAcceleratorDeals.reduce((sum, deal) => sum + deal.investmentAmount, 0))}
          </p>
          <p className="text-xs text-gray-500 mt-2">Across all cohorts</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Graduates</h3>
          <p className="text-3xl font-bold text-black">{graduatedAcceleratorDeals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Completed programs</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Follow-on Ready</h3>
          <p className="text-3xl font-bold text-black">
            {graduatedAcceleratorDeals.filter(d => d.followOnPotential === 'High').length}
          </p>
          <p className="text-xs text-gray-500 mt-2">High potential</p>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">
          {showGraduated ? 'Graduated Cohorts' : 'Active Accelerator Deals'}
        </h2>
        <button
          onClick={() => setShowGraduated(!showGraduated)}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {showGraduated ? 'View Active Deals' : 'View Graduates'}
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            onClick={() => setSelectedDeal(deal)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-black">{deal.companyName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{deal.sector} • {deal.partner}</p>
                  <p className="text-xs text-gray-500 mt-1">{deal.batch}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                    {deal.stage}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                    {deal.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Investment</p>
                  <p className="text-sm font-bold text-black">{formatCurrency(deal.investmentAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Equity</p>
                  <p className="text-sm font-bold text-black">{deal.equityStake}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valuation</p>
                  <p className="text-sm font-bold text-black">{formatCurrency(deal.currentValuation)}</p>
                </div>
              </div>

              {deal.keyMetrics.mrr && (
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded">
                  {deal.keyMetrics.mrr && (
                    <div>
                      <p className="text-xs text-gray-500">MRR</p>
                      <p className="text-sm font-semibold text-black">{formatCurrency(deal.keyMetrics.mrr)}</p>
                    </div>
                  )}
                  {deal.keyMetrics.users !== undefined && deal.keyMetrics.users > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Users</p>
                      <p className="text-sm font-semibold text-black">{deal.keyMetrics.users.toLocaleString()}</p>
                    </div>
                  )}
                  {deal.keyMetrics.growth && (
                    <div>
                      <p className="text-xs text-gray-500">Growth</p>
                      <p className="text-sm font-semibold text-green-600">+{deal.keyMetrics.growth}%</p>
                    </div>
                  )}
                </div>
              )}

              {/* Program Progress */}
              {deal.programWeek && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Program Progress (Week {deal.programWeek}/12)</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(deal.programWeek / 12) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-500">
                  <p>Founders: {deal.founders.map(f => f.name).join(', ')}</p>
                  {deal.demoDay && <p className="mt-1">Demo Day: {formatDate(deal.demoDay)}</p>}
                </div>
                <div className={`font-bold ${getFollowOnColor(deal.followOnPotential)}`}>
                  {deal.followOnPotential} Follow-on
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedDeal(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-black">{selectedDeal.companyName}</h2>
                  <p className="text-gray-600 mt-1">{selectedDeal.sector} • {selectedDeal.partner}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedDeal.batch}</p>
                </div>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-3">Deal Overview</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stage:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(selectedDeal.stage)}`}>
                          {selectedDeal.stage}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDeal.status)}`}>
                          {selectedDeal.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment:</span>
                        <span className="font-semibold">{formatCurrency(selectedDeal.investmentAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equity Stake:</span>
                        <span className="font-semibold">{selectedDeal.equityStake}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valuation:</span>
                        <span className="font-semibold">{formatCurrency(selectedDeal.currentValuation)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cohort Start:</span>
                        <span>{formatDate(selectedDeal.cohortStartDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cohort End:</span>
                        <span>{formatDate(selectedDeal.cohortEndDate)}</span>
                      </div>
                      {selectedDeal.demoDay && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Demo Day:</span>
                          <span className="font-semibold text-purple-600">{formatDate(selectedDeal.demoDay)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Follow-on Potential:</span>
                        <span className={`font-semibold ${getFollowOnColor(selectedDeal.followOnPotential)}`}>
                          {selectedDeal.followOnPotential}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3">Founders</h3>
                    <div className="space-y-2">
                      {selectedDeal.founders.map((founder, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="font-semibold">{founder.name}</span>
                          <span className="text-gray-600">{founder.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedDeal.keyMetrics.revenue !== undefined && selectedDeal.keyMetrics.revenue > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-600">Revenue</p>
                          <p className="text-2xl font-bold text-black">{formatCurrency(selectedDeal.keyMetrics.revenue)}</p>
                        </div>
                      )}
                      {selectedDeal.keyMetrics.users !== undefined && selectedDeal.keyMetrics.users > 0 && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-600">Users</p>
                          <p className="text-2xl font-bold text-black">{selectedDeal.keyMetrics.users.toLocaleString()}</p>
                        </div>
                      )}
                      {selectedDeal.keyMetrics.mrr && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-600">MRR</p>
                          <p className="text-2xl font-bold text-black">{formatCurrency(selectedDeal.keyMetrics.mrr)}</p>
                        </div>
                      )}
                      {selectedDeal.keyMetrics.growth && (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-600">MoM Growth</p>
                          <p className="text-2xl font-bold text-green-600">+{selectedDeal.keyMetrics.growth}%</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDeal.programWeek && (
                    <div>
                      <h3 className="font-bold text-lg mb-3">Program Progress</h3>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Week {selectedDeal.programWeek} of 12</p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-500 h-3 rounded-full"
                            style={{ width: `${(selectedDeal.programWeek / 12) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {Math.round((selectedDeal.programWeek / 12) * 100)}% complete
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">12-Week Program Milestones</h3>
                <div className="grid grid-cols-3 gap-3">
                  {selectedDeal.weeklyProgress.map((progress) => (
                    <div
                      key={progress.week}
                      className={`p-3 rounded-lg border-2 ${
                        progress.status === 'Completed'
                          ? 'bg-green-50 border-green-300'
                          : progress.status === 'In Progress'
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-700">Week {progress.week}</span>
                        {progress.status === 'Completed' && <span className="text-green-600">✓</span>}
                        {progress.status === 'In Progress' && <span className="text-blue-600">⟳</span>}
                      </div>
                      <p className="text-xs font-medium text-gray-800">{progress.milestone}</p>
                      {progress.notes && (
                        <p className="text-xs text-gray-600 mt-1 italic">{progress.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
