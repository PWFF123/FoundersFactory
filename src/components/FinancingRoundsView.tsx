import { useState } from 'react';
import { activeFinancingRounds, closedFinancingRounds } from '../data/financingRounds';
import type { FinancingRound } from '../data/financingRounds';

export function FinancingRoundsView() {
  const [selectedRound, setSelectedRound] = useState<FinancingRound | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const [filterSource, setFilterSource] = useState<'All' | 'Studio' | 'Accelerator'>('All');

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(2)}M`;
    }
    return `£${(amount / 1000).toFixed(0)}K`;
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Closing': return 'bg-green-100 text-green-800 border-green-300';
      case 'Term Sheet': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Due Diligence': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Active': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Planning': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSourceBadge = (source: string) => {
    return source === 'Studio'
      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
      : 'bg-teal-50 text-teal-700 border-teal-200';
  };

  const getRoundTypeColor = (type: string) => {
    switch (type) {
      case 'Pre-Seed': return 'text-gray-600';
      case 'Seed': return 'text-blue-600';
      case 'Series A': return 'text-purple-600';
      case 'Series B': return 'text-pink-600';
      case 'Series C': return 'text-red-600';
      case 'Bridge': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const rounds = showClosed ? closedFinancingRounds : activeFinancingRounds;
  const filteredRounds = filterSource === 'All'
    ? rounds
    : rounds.filter(r => r.source === filterSource);

  const totalRaising = activeFinancingRounds.reduce((sum, r) => sum + r.targetRaise, 0);
  const totalRaised = activeFinancingRounds.reduce((sum, r) => sum + r.raisedToDate, 0);
  const totalPortfolioValue = activeFinancingRounds.reduce((sum, r) => sum + r.postMoneyValuation * (r.ourEquityPost / 100), 0);
  const avgEquity = activeFinancingRounds.reduce((sum, r) => sum + r.ourEquityPost, 0) / activeFinancingRounds.length;

  return (
    <div className="space-y-6">
      {/* Header Stats - Premium Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg border border-blue-400">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-light text-blue-100 uppercase tracking-wide">Active Rounds</h3>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{activeFinancingRounds.length}</p>
          <p className="text-xs text-blue-100 mt-2">Companies raising capital</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg border border-green-400">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-light text-green-100 uppercase tracking-wide">Capital Raising</h3>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{formatCurrency(totalRaising)}</p>
          <p className="text-xs text-green-100 mt-2">Target across all rounds</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg border border-purple-400">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-light text-purple-100 uppercase tracking-wide">Raised to Date</h3>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{formatCurrency(totalRaised)}</p>
          <p className="text-xs text-purple-100 mt-2">{formatPercent(getProgressPercentage(totalRaised, totalRaising))} of target</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg border border-yellow-400">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-light text-yellow-100 uppercase tracking-wide">Portfolio Value</h3>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{formatCurrency(totalPortfolioValue)}</p>
          <p className="text-xs text-yellow-100 mt-2">Avg {formatPercent(avgEquity)} equity stake</p>
        </div>
      </div>

      {/* Filters and Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-black">
            {showClosed ? 'Closed Financing Rounds' : 'Active Financing Rounds'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterSource('All')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filterSource === 'All'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterSource('Studio')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filterSource === 'Studio'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => setFilterSource('Accelerator')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filterSource === 'Accelerator'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
              }`}
            >
              Accelerator
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowClosed(!showClosed)}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          {showClosed ? 'View Active Rounds' : 'View Closed Rounds'}
        </button>
      </div>

      {/* Financing Rounds Table - Premium Card Design */}
      <div className="space-y-4">
        {filteredRounds.map((round) => (
          <div
            key={round.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 overflow-hidden"
            onClick={() => setSelectedRound(round)}
          >
            <div className="p-6">
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-black">{round.companyName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSourceBadge(round.source)}`}>
                      {round.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {round.sector}
                    </span>
                    {round.leadInvestor && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Lead: {round.leadInvestor}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getRoundTypeColor(round.roundType)}`}>
                      {round.roundType}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Close: {round.actualClose ? formatDate(round.actualClose) : formatDate(round.expectedClose)}
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(round.roundStatus)}`}>
                    {round.roundStatus}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(round.raisedToDate)} raised of {formatCurrency(round.targetRaise)} target
                  </span>
                  <span className="font-bold text-gray-900">
                    {formatPercent(getProgressPercentage(round.raisedToDate, round.targetRaise))}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-inner"
                    style={{ width: `${getProgressPercentage(round.raisedToDate, round.targetRaise)}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Pre-Money</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(round.preMoneyValuation)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Post-Money</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(round.postMoneyValuation)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Our Equity</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {formatPercent(round.ourEquityPre)} → {formatPercent(round.ourEquityPost)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Our Investment</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(round.ourInvestmentToDate)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">MRR</p>
                  <p className="text-lg font-bold text-green-600">
                    {round.keyMetrics.mrr ? formatCurrency(round.keyMetrics.mrr) : 'N/A'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Growth</p>
                  <p className="text-lg font-bold text-purple-600">
                    {round.keyMetrics.growthRate ? `${round.keyMetrics.growthRate}%` : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Investor Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {round.investors.slice(0, 4).map((investor, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${
                      investor.status === 'Committed'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : investor.status === 'In Discussion'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      investor.status === 'Committed' ? 'bg-green-500' :
                      investor.status === 'In Discussion' ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                    {investor.name}
                    {investor.amount && ` (${formatCurrency(investor.amount)})`}
                  </div>
                ))}
                {round.investors.length > 4 && (
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    +{round.investors.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRound && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRound(null)}>
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-2xl z-10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-bold">{selectedRound.companyName}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSourceBadge(selectedRound.source)}`}>
                      {selectedRound.source}
                    </span>
                  </div>
                  <p className="text-gray-300 flex items-center gap-4">
                    <span>{selectedRound.sector}</span>
                    <span>•</span>
                    <span className={`font-bold ${getRoundTypeColor(selectedRound.roundType)}`}>{selectedRound.roundType}</span>
                    <span>•</span>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(selectedRound.roundStatus)}`}>
                      {selectedRound.roundStatus}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRound(null)}
                  className="text-gray-400 hover:text-white text-3xl transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Fundraising Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg mb-4 text-blue-900">Fundraising Progress</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Target Raise:</span>
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(selectedRound.targetRaise)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Raised to Date:</span>
                      <span className="text-2xl font-bold text-green-600">{formatCurrency(selectedRound.raisedToDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Remaining:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatCurrency(selectedRound.targetRaise - selectedRound.raisedToDate)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full"
                        style={{ width: `${getProgressPercentage(selectedRound.raisedToDate, selectedRound.targetRaise)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-lg mb-4 text-purple-900">Valuation & Ownership</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Pre-Money:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(selectedRound.preMoneyValuation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Post-Money:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(selectedRound.postMoneyValuation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Our Equity (Pre):</span>
                      <span className="font-bold text-indigo-600">{formatPercent(selectedRound.ourEquityPre)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Our Equity (Post):</span>
                      <span className="font-bold text-indigo-600">{formatPercent(selectedRound.ourEquityPost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Our Investment:</span>
                      <span className="font-bold text-green-600">{formatCurrency(selectedRound.ourInvestmentToDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Our Position Value:</span>
                      <span className="font-bold text-purple-600">
                        {formatCurrency(selectedRound.postMoneyValuation * (selectedRound.ourEquityPost / 100))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h3 className="font-bold text-lg mb-4">Company Metrics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedRound.keyMetrics.revenue && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Annual Revenue</p>
                      <p className="text-2xl font-bold text-green-700">{formatCurrency(selectedRound.keyMetrics.revenue)}</p>
                    </div>
                  )}
                  {selectedRound.keyMetrics.mrr && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">MRR</p>
                      <p className="text-2xl font-bold text-blue-700">{formatCurrency(selectedRound.keyMetrics.mrr)}</p>
                    </div>
                  )}
                  {selectedRound.keyMetrics.users && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Users</p>
                      <p className="text-2xl font-bold text-purple-700">{selectedRound.keyMetrics.users.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedRound.keyMetrics.growthRate && (
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">MoM Growth</p>
                      <p className="text-2xl font-bold text-orange-700">{selectedRound.keyMetrics.growthRate}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Investors */}
              <div>
                <h3 className="font-bold text-lg mb-4">Investor Syndicate</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {selectedRound.investors.map((investor, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border flex justify-between items-center ${
                        investor.status === 'Committed'
                          ? 'bg-green-50 border-green-200'
                          : investor.status === 'In Discussion'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{investor.name}</p>
                        <p className={`text-xs mt-1 ${
                          investor.status === 'Committed' ? 'text-green-700' :
                          investor.status === 'In Discussion' ? 'text-blue-700' : 'text-gray-500'
                        }`}>
                          {investor.status}
                        </p>
                      </div>
                      {investor.amount && (
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(investor.amount)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              {selectedRound.milestones.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4">Key Milestones</h3>
                  <div className="space-y-2">
                    {selectedRound.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Risks */}
              {selectedRound.risks.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4">Risks & Concerns</h3>
                  <div className="space-y-2">
                    {selectedRound.risks.map((risk, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps */}
              {selectedRound.nextSteps.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4">Next Steps</h3>
                  <div className="space-y-2">
                    {selectedRound.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
