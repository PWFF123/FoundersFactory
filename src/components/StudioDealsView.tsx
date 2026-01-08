import { useState } from 'react';
import { activeStudioDeals, completedStudioDeals } from '../data/studioDeals';
import type { StudioDeal } from '../data/studioDeals';

export function StudioDealsView() {
  const [selectedDeal, setSelectedDeal] = useState<StudioDeal | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

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
      case 'Inception': return 'bg-blue-100 text-blue-800';
      case 'Build': return 'bg-purple-100 text-purple-800';
      case 'Scale': return 'bg-green-100 text-green-800';
      case 'Exit': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Upcoming': return 'bg-gray-300';
      case 'Blocked': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const deals = showCompleted ? completedStudioDeals : activeStudioDeals;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Active Studio Deals</h3>
          <p className="text-3xl font-bold text-black">{activeStudioDeals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Currently in progress</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Investment</h3>
          <p className="text-3xl font-bold text-black">
            {formatCurrency(activeStudioDeals.reduce((sum, deal) => sum + deal.investmentAmount, 0))}
          </p>
          <p className="text-xs text-gray-500 mt-2">Across active deals</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Portfolio Value</h3>
          <p className="text-3xl font-bold text-black">
            {formatCurrency(activeStudioDeals.reduce((sum, deal) => sum + deal.currentValuation, 0))}
          </p>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Completed Exits</h3>
          <p className="text-3xl font-bold text-black">{completedStudioDeals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Successful graduations</p>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">
          {showCompleted ? 'Completed Studio Deals' : 'Active Studio Deals'}
        </h2>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {showCompleted ? 'View Active Deals' : 'View Completed Deals'}
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

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Investment</p>
                  <p className="text-lg font-bold text-black">{formatCurrency(deal.investmentAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valuation</p>
                  <p className="text-lg font-bold text-black">{formatCurrency(deal.currentValuation)}</p>
                </div>
              </div>

              {deal.keyMetrics.mrr && (
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded">
                  {deal.keyMetrics.revenue && (
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-sm font-semibold text-black">{formatCurrency(deal.keyMetrics.revenue)}</p>
                    </div>
                  )}
                  {deal.keyMetrics.users && (
                    <div>
                      <p className="text-xs text-gray-500">Users</p>
                      <p className="text-sm font-semibold text-black">{deal.keyMetrics.users.toLocaleString()}</p>
                    </div>
                  )}
                  {deal.keyMetrics.mrr && (
                    <div>
                      <p className="text-xs text-gray-500">MRR</p>
                      <p className="text-sm font-semibold text-black">{formatCurrency(deal.keyMetrics.mrr)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Milestone Progress */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Milestone Progress</p>
                <div className="flex gap-1">
                  {deal.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded ${getMilestoneStatusColor(milestone.status)}`}
                      title={`${milestone.name}: ${milestone.status}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {deal.milestones.filter(m => m.status === 'Completed').length} of {deal.milestones.length} milestones completed
                </p>
              </div>

              <div className="text-xs text-gray-500">
                <p>CEO: {deal.team.ceo} • Team: {deal.team.headCount} people</p>
                {deal.actualCompletion ? (
                  <p className="mt-1">Completed: {formatDate(deal.actualCompletion)}</p>
                ) : (
                  <p className="mt-1">Expected: {formatDate(deal.expectedCompletion)}</p>
                )}
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
                        <span className="text-gray-600">Valuation:</span>
                        <span className="font-semibold">{formatCurrency(selectedDeal.currentValuation)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Started:</span>
                        <span>{formatDate(selectedDeal.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected End:</span>
                        <span>{formatDate(selectedDeal.expectedCompletion)}</span>
                      </div>
                      {selectedDeal.actualCompletion && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Actual Completion:</span>
                          <span className="font-semibold text-green-600">{formatDate(selectedDeal.actualCompletion)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3">Team</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CEO:</span>
                        <span className="font-semibold">{selectedDeal.team.ceo}</span>
                      </div>
                      {selectedDeal.team.cto && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">CTO:</span>
                          <span className="font-semibold">{selectedDeal.team.cto}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Team Size:</span>
                        <span className="font-semibold">{selectedDeal.team.headCount} people</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedDeal.keyMetrics.revenue && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-600">Revenue</p>
                          <p className="text-2xl font-bold text-black">{formatCurrency(selectedDeal.keyMetrics.revenue)}</p>
                        </div>
                      )}
                      {selectedDeal.keyMetrics.users && (
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
                    </div>
                  </div>

                  {selectedDeal.nextSteps.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg mb-3">Next Steps</h3>
                      <ul className="space-y-2">
                        {selectedDeal.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">▸</span>
                            <span className="text-sm text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Milestones</h3>
                <div className="space-y-3">
                  {selectedDeal.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${getMilestoneStatusColor(milestone.status)}`} />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{milestone.name}</p>
                        <p className="text-xs text-gray-500">Due: {formatDate(milestone.dueDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium">{milestone.status}</p>
                        {milestone.completedDate && (
                          <p className="text-xs text-green-600">✓ {formatDate(milestone.completedDate)}</p>
                        )}
                      </div>
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
