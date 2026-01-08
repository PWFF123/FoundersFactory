import { useState } from 'react';
import { portfolioCompanies } from '../data/financingRounds';
import type { FinancingRound } from '../data/financingRounds';
import { getNewsByCompanyId } from '../data/companyNews';
import type { NewsArticle } from '../data/companyNews';

export function FinancingRoundsView() {
  const [selectedCompany, setSelectedCompany] = useState<FinancingRound | null>(null);
  const [filterSource, setFilterSource] = useState<'All' | 'Studio' | 'Accelerator'>('All');
  const [filterJVPartner, setFilterJVPartner] = useState<'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia'>('All');

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

  const getSourceBadge = (source: string) => {
    return source === 'Studio'
      ? 'bg-blue-50 text-blue-700'
      : 'bg-blue-50 text-blue-700';
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

  const getJVPartnerBadge = (partner?: string) => {
    switch (partner) {
      case 'Aviva': return 'bg-blue-50 text-blue-700';
      case 'Mediobanca': return 'bg-purple-50 text-purple-700';
      case 'Fastweb': return 'bg-teal-50 text-teal-700';
      case 'Vonovia': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  // Check if company hasn't contacted us in over 6 months
  const isStaleContact = (lastContactDate?: string) => {
    if (!lastContactDate) return true;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return new Date(lastContactDate) < sixMonthsAgo;
  };

  const getNewsCategoryBadge = (category: NewsArticle['category']) => {
    switch (category) {
      case 'funding': return { bg: 'bg-teal-50', text: 'text-teal-700', icon: '💰', label: 'Funding' };
      case 'partnership': return { bg: 'bg-blue-50', text: 'text-blue-700', icon: '🤝', label: 'Partnership' };
      case 'product': return { bg: 'bg-purple-50', text: 'text-purple-700', icon: '🚀', label: 'Product' };
      case 'team': return { bg: 'bg-amber-50', text: 'text-amber-700', icon: '👥', label: 'Team' };
      case 'press': return { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '📰', label: 'Press' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', icon: '📌', label: 'News' };
    }
  };

  const companies = portfolioCompanies
    .filter(c => filterSource === 'All' || c.source === filterSource)
    .filter(c => filterJVPartner === 'All' || c.jvPartner === filterJVPartner);

  const totalInvested = portfolioCompanies.reduce((sum, c) => sum + c.ourTotalInvestment, 0);
  const totalCurrentValue = portfolioCompanies.reduce((sum, c) => sum + c.currentPositionValue, 0);
  const totalGain = totalCurrentValue - totalInvested;
  const totalMOIC = totalCurrentValue / totalInvested;

  return (
    <div className="space-y-6">
      {/* Header Stats - Clean Professional Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Portfolio Companies</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{portfolioCompanies.length}</div>
          <div className="text-sm text-gray-600">Companies with funding data</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Total Invested</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{formatCurrency(totalInvested)}</div>
          <div className="text-sm text-gray-600">Across all rounds</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Current Value</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{formatCurrency(totalCurrentValue)}</div>
          <div className="text-sm text-gray-600">Portfolio positions</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Total Gain</div>
          <div className={`text-3xl font-semibold mb-1 ${totalGain >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
            {formatCurrency(totalGain)}
          </div>
          <div className="text-sm text-gray-600">{totalMOIC.toFixed(2)}x MOIC</div>
        </div>
      </div>

      {/* Filters - Sophisticated Minimal Design */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-medium text-gray-900 tracking-tight">
            Portfolio Funding Activity
          </h2>
        </div>

        {/* Source Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-[13px] font-medium text-gray-500 tracking-wide">Source</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setFilterSource('All')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterSource === 'All'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterSource('Studio')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterSource === 'Studio'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => setFilterSource('Accelerator')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterSource === 'Accelerator'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Accelerator
            </button>
          </div>
        </div>

        {/* JV Partner Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-medium text-gray-500 tracking-wide">JV Partner</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterJVPartner('All')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterJVPartner === 'All'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterJVPartner('Aviva')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all relative ${
                filterJVPartner === 'Aviva'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-blue-50/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${filterJVPartner === 'Aviva' ? 'bg-blue-300' : 'bg-blue-400'}`}></span>
                Aviva
              </span>
            </button>
            <button
              onClick={() => setFilterJVPartner('Mediobanca')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterJVPartner === 'Mediobanca'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-purple-50/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${filterJVPartner === 'Mediobanca' ? 'bg-purple-300' : 'bg-purple-400'}`}></span>
                Mediobanca
              </span>
            </button>
            <button
              onClick={() => setFilterJVPartner('Fastweb')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterJVPartner === 'Fastweb'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-teal-50/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${filterJVPartner === 'Fastweb' ? 'bg-green-300' : 'bg-green-400'}`}></span>
                Fastweb
              </span>
            </button>
            <button
              onClick={() => setFilterJVPartner('Vonovia')}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                filterJVPartner === 'Vonovia'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-orange-50/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${filterJVPartner === 'Vonovia' ? 'bg-orange-300' : 'bg-orange-400'}`}></span>
                Vonovia
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Company Cards - Clean Professional Design */}
      <div className="space-y-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-gray-200"
            onClick={() => setSelectedCompany(company)}
          >
            <div className="p-5">
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-semibold text-gray-900">{company.companyName}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSourceBadge(company.source)}`}>
                      {company.source}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRoundTypeColor(company.latestRound.roundType)}`}>
                      {company.latestRound.roundType}
                    </span>
                    {company.jvPartner && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getJVPartnerBadge(company.jvPartner)}`}>
                        {company.jvPartner}
                      </span>
                    )}
                    {isStaleContact(company.lastContactDate) && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        ⚠️ No contact 6+ months
                      </span>
                    )}
                    {getNewsByCompanyId(company.id).length > 0 && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        📰 {getNewsByCompanyId(company.id).length} news update{getNewsByCompanyId(company.id).length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span>{company.sector}</span>
                    <span className="text-gray-300">|</span>
                    <span>Closed: {formatDate(company.latestRound.closeDate)}</span>
                    {company.latestRound.leadInvestor && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span>Lead: {company.latestRound.leadInvestor}</span>
                      </>
                    )}
                    {company.lastContactDate && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span>Last contact: {formatDate(company.lastContactDate)}</span>
                      </>
                    )}
                  </div>
                  {/* Founders */}
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {company.founders.map((founder, idx) => (
                      <span key={idx} className="text-xs text-gray-500">
                        {founder.name} ({founder.role}){idx < company.founders.length - 1 && ','}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    {formatCurrency(company.latestRound.amount)} @ {formatCurrency(company.latestRound.valuation)}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatPercent(company.ourEquityStake)} equity
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid - Compact */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Our Investment</p>
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(company.ourTotalInvestment)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Position Value</p>
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(company.currentPositionValue)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Revenue</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {company.keyMetrics.revenue ? formatCurrency(company.keyMetrics.revenue) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">MRR</p>
                  <p className="text-sm font-semibold text-teal-600">
                    {company.keyMetrics.mrr ? formatCurrency(company.keyMetrics.mrr) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Users</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {company.keyMetrics.users ? company.keyMetrics.users.toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Growth</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {company.keyMetrics.growthRate ? `${company.keyMetrics.growthRate}%` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCompany(null)}>
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Clean Professional Header */}
            <div className="relative bg-white border-b border-gray-200 px-8 py-6">
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="pr-12">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">{selectedCompany.companyName}</h2>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSourceBadge(selectedCompany.source)}`}>
                    {selectedCompany.source}
                  </span>
                  {selectedCompany.jvPartner && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getJVPartnerBadge(selectedCompany.jvPartner)}`}>
                      {selectedCompany.jvPartner} Portfolio
                    </span>
                  )}
                  {isStaleContact(selectedCompany.lastContactDate) && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      ⚠️ No contact 6+ months - Consider requesting information
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{selectedCompany.sector}</span>
                  {selectedCompany.lastContactDate && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span>Last contact: {formatDate(selectedCompany.lastContactDate)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 bg-gray-50">
              {/* Founders */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Founders</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCompany.founders.map((founder, idx) => (
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

              {/* Our Position */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Position</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Equity Stake</p>
                    <p className="text-xl font-semibold text-blue-600">{formatPercent(selectedCompany.ourEquityStake)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Invested</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedCompany.ourTotalInvestment)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Value</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedCompany.currentPositionValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Unrealized Gain</p>
                    <p className={`text-xl font-semibold ${selectedCompany.currentPositionValue >= selectedCompany.ourTotalInvestment ? 'text-teal-600' : 'text-red-600'}`}>
                      {formatCurrency(selectedCompany.currentPositionValue - selectedCompany.ourTotalInvestment)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Latest Round */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Funding Round</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Round Type</span>
                    <span className={`font-semibold ${getRoundTypeColor(selectedCompany.latestRound.roundType)}`}>
                      {selectedCompany.latestRound.roundType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Amount Raised</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(selectedCompany.latestRound.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Valuation</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(selectedCompany.latestRound.valuation)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Close Date</span>
                    <span className="font-semibold text-gray-900">{formatDate(selectedCompany.latestRound.closeDate)}</span>
                  </div>
                  {selectedCompany.latestRound.leadInvestor && (
                    <>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-sm text-gray-600">Lead Investor</span>
                        <span className="font-semibold text-gray-900">{selectedCompany.latestRound.leadInvestor}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Company Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Metrics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedCompany.keyMetrics.revenue && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Annual Revenue</p>
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedCompany.keyMetrics.revenue)}</p>
                    </div>
                  )}
                  {selectedCompany.keyMetrics.mrr && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">MRR</p>
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedCompany.keyMetrics.mrr)}</p>
                    </div>
                  )}
                  {selectedCompany.keyMetrics.users && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Users</p>
                      <p className="text-xl font-semibold text-gray-900">{selectedCompany.keyMetrics.users.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedCompany.keyMetrics.growthRate && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">MoM Growth</p>
                      <p className="text-xl font-semibold text-teal-600">{selectedCompany.keyMetrics.growthRate}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Funding History */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding History</h3>
                <div className="space-y-3">
                  {selectedCompany.fundingHistory.map((round, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 bg-gray-50 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold ${getRoundTypeColor(round.roundType)}`}>{round.roundType}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(round.date)}</p>
                          {round.leadInvestor && (
                            <p className="text-xs text-gray-600 mt-1">Lead: {round.leadInvestor}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(round.amount)}</p>
                          <p className="text-xs text-gray-500 mt-1">@ {formatCurrency(round.valuation)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* News & Updates */}
              {(() => {
                const companyNews = getNewsByCompanyId(selectedCompany.id);
                return companyNews.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">News & Updates</h3>
                        <p className="text-sm text-gray-500 mt-1">Recent mentions and developments</p>
                      </div>
                      <span className="text-xs text-gray-500">{companyNews.length} article{companyNews.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-4">
                      {companyNews.map((news) => {
                        const badge = getNewsCategoryBadge(news.category);
                        return (
                          <div key={news.id} className="border-l-4 border-blue-500 bg-gray-50 p-4 hover:bg-gray-100 transition-colors">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                                    {badge.icon} {badge.label}
                                  </span>
                                  <span className="text-xs text-gray-500">{formatDate(news.publishedDate)}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-600 font-medium">{news.source}</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-snug">{news.title}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{news.snippet}</p>
                              </div>
                              <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 text-blue-600 hover:text-blue-700 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 italic">
                        💡 News aggregated from public sources. In production, this would connect to NewsAPI, Bing News, or a custom news aggregation service.
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Notes */}
              {selectedCompany.notes && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                  <p className="text-sm text-gray-700">{selectedCompany.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
