import { useState } from 'react';
import { DealGeographyGlobe } from './components/DealGeographyGlobe';
import { StudioDealsView } from './components/StudioDealsView';
import { AcceleratorDealsView } from './components/AcceleratorDealsView';
import { FinancingRoundsView } from './components/FinancingRoundsView';
import { AuditView } from './components/AuditView';

function App() {
  const [activeTab, setActiveTab] = useState<'active' | 'pipeline' | 'renewals' | 'studio' | 'accelerator' | 'financing' | 'audit'>('active');
  const [jvSubTab, setJvSubTab] = useState<'overview' | 'geography'>('overview');
  const [expandedJV, setExpandedJV] = useState<string | null>(null);
  const [studioJVFilter, setStudioJVFilter] = useState<'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia'>('All');
  const [acceleratorJVFilter, setAcceleratorJVFilter] = useState<'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia'>('All');
  const [shareIssuances, setShareIssuances] = useState<{[key: string]: boolean}>({
    'aviva-2026-06': false,
    'mediobanca-2026-09': false,
    'vonovia-2026-12': false,
  });
  const [renewalReminders, setRenewalReminders] = useState<{[key: string]: boolean}>({
    'aviva-sub': false,
    'aviva-sha': false,
    'mediobanca-sub': false,
    'mediobanca-sha': false,
    'vonovia-sub': false,
    'vonovia-sha': false,
    'pico-sub': false,
    'pico-sha': false,
    'fastweb-sub': false,
    'fastweb-sha': false,
  });

  const toggleJV = (jvId: string) => {
    setExpandedJV(expandedJV === jvId ? null : jvId);
  };

  const toggleShareIssuance = (key: string) => {
    setShareIssuances(prev => ({...prev, [key]: !prev[key]}));
  };

  const toggleRenewalReminder = (key: string) => {
    setRenewalReminders(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Stripe-inspired clean design */}
      <header className="bg-black text-white py-6 px-8 border-b border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}founders-factory-logo.png`}
              alt="Founders Factory"
              className="h-9 brightness-0 invert"
            />
          </div>
          <p className="text-sm text-gray-400 font-medium tracking-tight">
            Corporate Partnerships & Portfolio Dashboard
          </p>
        </div>
      </header>

      {/* Tab Navigation - Stripe-inspired refined navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeTab === 'active'
                  ? 'text-black border-b-2 border-ffYellow'
                  : 'text-gray-500 hover:text-black border-b-2 border-transparent'
              }`}
            >
              Active Joint Ventures
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeTab === 'pipeline'
                  ? 'text-black border-b-2 border-ffYellow'
                  : 'text-gray-500 hover:text-black border-b-2 border-transparent'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveTab('renewals')}
              className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeTab === 'renewals'
                  ? 'text-black border-b-2 border-ffYellow'
                  : 'text-gray-500 hover:text-black border-b-2 border-transparent'
              }`}
            >
              Renewals & Notices
            </button>

            {/* Studio Deals with Dropdown */}
            <div className="relative group">
              <button
                onClick={() => {
                  setActiveTab('studio');
                  setStudioJVFilter('All');
                }}
                className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'studio'
                    ? 'text-black border-b-2 border-ffYellow'
                    : 'text-gray-500 hover:text-black border-b-2 border-transparent'
                }`}
              >
                Studio Deals
              </button>

              {/* Dropdown Menu - Apple-esque minimal design */}
              <div className="absolute top-full left-0 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100/50 py-2 mt-2 min-w-[140px]">
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setStudioJVFilter('All');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'studio' && studioJVFilter === 'All'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setStudioJVFilter('Aviva');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'studio' && studioJVFilter === 'Aviva'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Aviva
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setStudioJVFilter('Mediobanca');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'studio' && studioJVFilter === 'Mediobanca'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Mediobanca
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setStudioJVFilter('Fastweb');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'studio' && studioJVFilter === 'Fastweb'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Fastweb
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setStudioJVFilter('Vonovia');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'studio' && studioJVFilter === 'Vonovia'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Vonovia
                  </button>
                </div>
              </div>
            </div>

            {/* Accelerator Investments with Dropdown */}
            <div className="relative group">
              <button
                onClick={() => {
                  setActiveTab('accelerator');
                  setAcceleratorJVFilter('All');
                }}
                className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'accelerator'
                    ? 'text-black border-b-2 border-ffYellow'
                    : 'text-gray-500 hover:text-black border-b-2 border-transparent'
                }`}
              >
                Accelerator Investments
              </button>

              {/* Dropdown Menu - Apple-esque minimal design */}
              <div className="absolute top-full left-0 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100/50 py-2 mt-2 min-w-[140px]">
                  <button
                    onClick={() => {
                      setActiveTab('accelerator');
                      setAcceleratorJVFilter('All');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                      activeTab === 'accelerator' && acceleratorJVFilter === 'All'
                        ? 'text-black bg-gray-100'
                        : 'text-gray-500 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('accelerator');
                      setAcceleratorJVFilter('Aviva');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'accelerator' && acceleratorJVFilter === 'Aviva'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Aviva
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('accelerator');
                      setAcceleratorJVFilter('Mediobanca');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'accelerator' && acceleratorJVFilter === 'Mediobanca'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Mediobanca
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('accelerator');
                      setAcceleratorJVFilter('Fastweb');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'accelerator' && acceleratorJVFilter === 'Fastweb'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Fastweb
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('accelerator');
                      setAcceleratorJVFilter('Vonovia');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-tight transition-all duration-150 border-b border-yellow-400/0 hover:border-yellow-400/30 ${
                      activeTab === 'accelerator' && acceleratorJVFilter === 'Vonovia'
                        ? 'text-black font-medium bg-gray-50/80 !border-yellow-400/60'
                        : 'text-gray-600 font-normal hover:text-black hover:bg-gray-50/50'
                    }`}
                  >
                    Vonovia
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('financing')}
              className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeTab === 'financing'
                  ? 'text-black border-b-2 border-ffYellow'
                  : 'text-gray-500 hover:text-black border-b-2 border-transparent'
              }`}
            >
              Financing Rounds
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'text-black border-b-2 border-ffYellow'
                  : 'text-gray-500 hover:text-black border-b-2 border-transparent'
              }`}
            >
              Audit & Documents
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'active' && (
          <div>
            {/* JV Subtab Navigation */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setJvSubTab('overview')}
                className={`px-6 py-3 font-semibold text-sm rounded-md transition-all ${
                  jvSubTab === 'overview'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setJvSubTab('geography')}
                className={`px-6 py-3 font-semibold text-sm rounded-md transition-all ${
                  jvSubTab === 'geography'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                Deal Geography
              </button>
            </div>

            {jvSubTab === 'overview' && (
              <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Active Joint Ventures</h3>
            <p className="text-3xl font-bold text-black">5</p>
            <p className="text-xs text-gray-500 mt-2">Corporate partnerships</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Portfolio Value</h3>
            <p className="text-3xl font-bold text-black">£103M</p>
            <p className="text-xs text-gray-500 mt-2">Across all JVs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Investments</h3>
            <p className="text-3xl font-bold text-black">£38M</p>
            <p className="text-xs text-gray-500 mt-2">Capital deployed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Obligations Status</h3>
            <p className="text-3xl font-bold text-black">5/6</p>
            <p className="text-xs text-gray-500 mt-2">On track</p>
          </div>
        </div>

        {/* JV Table */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-bold text-black mb-6">Joint Venture Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-3 px-4 text-xs font-bold text-black uppercase">Partner</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-black uppercase">FF Stake</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-black uppercase">Investment</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-black uppercase">Portfolio Co's</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-black uppercase">Portfolio Value</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-black uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Aviva Row */}
                <>
                <tr
                  className="border-b border-gray-200 hover:bg-yellow-50 cursor-pointer"
                  onClick={() => toggleJV('aviva')}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedJV === 'aviva' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="font-semibold text-sm">Aviva</p>
                    </div>
                  </td>
                  <td className="py-4 px-4"><span className="text-sm font-bold">60%</span></td>
                  <td className="py-4 px-4"><p className="text-sm font-semibold">£15M</p></td>
                  <td className="py-4 px-4 text-center"><p className="text-sm font-semibold">12</p></td>
                  <td className="py-4 px-4"><p className="text-sm font-bold text-green-600">£45M</p></td>
                  <td className="py-4 px-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span></td>
                </tr>
                {expandedJV === 'aviva' && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Contract Details */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Contract Details</h4>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                              <p className="text-2xl font-bold text-black">7 years</p>
                              <p className="text-xs text-gray-500 mt-1">Started: Jan 2022</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Remaining Term</p>
                              <p className="text-2xl font-bold text-orange-600">4.9 years</p>
                              <p className="text-xs text-gray-500 mt-1">Ends: Dec 2028</p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-xs text-gray-500 uppercase mb-1">Remaining Cash to Deploy</p>
                            <p className="text-2xl font-bold text-black">£6.5M</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '57%'}}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">£8.5M deployed of £15M total</p>
                          </div>

                          {/* Equity Values */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-yellow-400">
                              <p className="text-xs text-gray-500 uppercase mb-1">FF Equity Value</p>
                              <p className="text-2xl font-bold text-black">£27M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +35% since inception</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Aviva Equity Value</p>
                              <p className="text-2xl font-bold text-black">£18M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +20% since inception</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Equity Split & IC Requirements */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Real-Time Equity Split</h4>

                          {/* Equity Visualization */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm font-semibold">Founders Factory</p>
                                <p className="text-2xl font-bold text-black">60%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">Aviva</p>
                                <p className="text-2xl font-bold text-black">40%</p>
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                              <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{width: '60%'}}></div>
                              <div className="absolute right-0 top-0 h-full bg-blue-500" style={{width: '40%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>27M shares</span>
                              <span>18M shares</span>
                            </div>
                          </div>

                          {/* Investment Committee Requirements */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              Investment Committee (2025)
                            </h5>

                            <div className="space-y-3">
                              <div className="p-3 bg-purple-50 rounded border border-purple-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-purple-900">Studio Deals</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">2/3 Approved</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">Required IC approvals this year</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '67%'}}></div>
                                </div>
                              </div>

                              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-blue-900">Accelerator Investments</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">N/A</span>
                                </div>
                                <p className="text-xs text-gray-600">Not applicable for this JV</p>
                              </div>

                              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                <p className="text-xs font-semibold text-yellow-900 mb-1">Next IC Scheduled</p>
                                <p className="text-sm font-bold text-black">15 Feb 2025</p>
                                <p className="text-xs text-gray-600 mt-1">3 deals on agenda for review</p>
                              </div>
                            </div>
                          </div>

                          {/* Share Issuance Reminders */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Share Issuance Reminders
                            </h5>

                            <div className="space-y-3">
                              <div className="flex items-start justify-between p-3 bg-orange-50 rounded">
                                <div className="flex-1">
                                  <p className="text-sm font-semibold">Q2 2026 Share Allotment</p>
                                  <p className="text-xs text-gray-600 mt-1">Due: 30 Jun 2026 • 2.5M shares to Aviva</p>
                                  <p className="text-xs text-gray-500 mt-1">Per Subscription Agreement Clause 4.2</p>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={shareIssuances['aviva-2026-06']}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      toggleShareIssuance('aviva-2026-06');
                                    }}
                                    className="w-5 h-5 text-green-600 rounded"
                                  />
                                  <span className="text-xs text-gray-600">Done</span>
                                </label>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert('Google Calendar integration: Add reminder to calendar');
                                }}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add to Google Calendar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                </>
                {/* Mediobanca - Simplified */}
                <tr className="border-b border-gray-200 hover:bg-yellow-50 bg-gray-50 cursor-pointer" onClick={() => toggleJV('mediobanca')}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedJV === 'mediobanca' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="font-semibold text-sm">Mediobanca</p>
                    </div>
                  </td>
                  <td className="py-4 px-4"><span className="text-sm font-bold">55%</span></td>
                  <td className="py-4 px-4"><p className="text-sm font-semibold">£10M</p></td>
                  <td className="py-4 px-4 text-center"><p className="text-sm font-semibold">8</p></td>
                  <td className="py-4 px-4"><p className="text-sm font-bold text-green-600">£28M</p></td>
                  <td className="py-4 px-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span></td>
                </tr>
                {expandedJV === 'mediobanca' && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Contract Details */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Contract Details</h4>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                              <p className="text-2xl font-bold text-black">5 years</p>
                              <p className="text-xs text-gray-500 mt-1">Started: Mar 2022</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Remaining Term</p>
                              <p className="text-2xl font-bold text-orange-600">3.2 years</p>
                              <p className="text-xs text-gray-500 mt-1">Ends: Jun 2027</p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-xs text-gray-500 uppercase mb-1">Remaining Cash to Deploy</p>
                            <p className="text-2xl font-bold text-black">£3.2M</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">£6.8M deployed of £10M total</p>
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-yellow-400">
                              <p className="text-xs text-gray-500 uppercase mb-1">FF Equity Value</p>
                              <p className="text-2xl font-bold text-black">£15.4M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +28% since inception</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Mediobanca Value</p>
                              <p className="text-2xl font-bold text-black">£12.6M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +26% since inception</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Portfolio Performance */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Portfolio Performance</h4>

                          {/* Equity Visualization */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm font-semibold">Founders Factory</p>
                                <p className="text-2xl font-bold text-black">55%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">Mediobanca</p>
                                <p className="text-2xl font-bold text-black">45%</p>
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                              <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{width: '55%'}}></div>
                              <div className="absolute right-0 top-0 h-full bg-purple-500" style={{width: '45%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>15.4M shares</span>
                              <span>12.6M shares</span>
                            </div>
                          </div>

                          {/* Investment Committee Requirements */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              Investment Committee (2025)
                            </h5>

                            <div className="space-y-3">
                              <div className="p-3 bg-purple-50 rounded border border-purple-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-purple-900">Studio Deals</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">3/5 Approved</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">Required IC approvals this year</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-yellow-400 h-2 rounded-full" style={{width: '60%'}}></div>
                                </div>
                              </div>

                              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-blue-900">Accelerator Investments</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">N/A</span>
                                </div>
                                <p className="text-xs text-gray-600">Not applicable for this JV</p>
                              </div>

                              <div className="p-3 bg-red-50 rounded border border-red-200">
                                <p className="text-xs font-semibold text-red-900 mb-1">Next IC Scheduled</p>
                                <p className="text-sm font-bold text-black">28 Feb 2025</p>
                                <p className="text-xs text-gray-600 mt-1">2 deals pending approval (urgent)</p>
                              </div>
                            </div>
                          </div>

                          {/* Top Portfolio Companies */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                            <h5 className="font-bold text-sm mb-3">Top Portfolio Companies</h5>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-semibold">FinTech Alpha</p>
                                  <p className="text-xs text-gray-500">Series A · FinTech</p>
                                </div>
                                <p className="text-sm font-bold text-green-600">£8.2M</p>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-semibold">InsureTech Pro</p>
                                  <p className="text-xs text-gray-500">Seed · InsurTech</p>
                                </div>
                                <p className="text-sm font-bold text-green-600">£6.5M</p>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-semibold">WealthManager AI</p>
                                  <p className="text-xs text-gray-500">Series A · WealthTech</p>
                                </div>
                                <p className="text-sm font-bold text-green-600">£5.8M</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Vonovia - Simplified */}
                <tr className="border-b border-gray-200 hover:bg-yellow-50 cursor-pointer" onClick={() => toggleJV('vonovia')}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedJV === 'vonovia' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="font-semibold text-sm">Vonovia</p>
                    </div>
                  </td>
                  <td className="py-4 px-4"><span className="text-sm font-bold">50%</span></td>
                  <td className="py-4 px-4"><p className="text-sm font-semibold">£8M</p></td>
                  <td className="py-4 px-4 text-center"><p className="text-sm font-semibold">6</p></td>
                  <td className="py-4 px-4"><p className="text-sm font-bold text-green-600">£18M</p></td>
                  <td className="py-4 px-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span></td>
                </tr>
                {expandedJV === 'vonovia' && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Contract Details */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Contract Details</h4>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                              <p className="text-2xl font-bold text-black">6 years</p>
                              <p className="text-xs text-gray-500 mt-1">Started: Jun 2021</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Remaining Term</p>
                              <p className="text-2xl font-bold text-green-600">4.5 years</p>
                              <p className="text-xs text-gray-500 mt-1">Ends: Dec 2027</p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-xs text-gray-500 uppercase mb-1">Remaining Cash to Deploy</p>
                            <p className="text-2xl font-bold text-black">£2.8M</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">£5.2M deployed of £8M total</p>
                          </div>

                          {/* Equity Values - 50/50 Split */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-yellow-400">
                              <p className="text-xs text-gray-500 uppercase mb-1">FF Equity Value</p>
                              <p className="text-2xl font-bold text-black">£9.0M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +12.5% since inception</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Vonovia Equity Value</p>
                              <p className="text-2xl font-bold text-black">£9.0M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +12.5% since inception</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Investment Focus */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Equal Partnership Split</h4>

                          {/* 50/50 Equity Visualization */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm font-semibold">Founders Factory</p>
                                <p className="text-2xl font-bold text-black">50%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">Vonovia</p>
                                <p className="text-2xl font-bold text-black">50%</p>
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                              <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{width: '50%'}}></div>
                              <div className="absolute right-0 top-0 h-full bg-teal-500" style={{width: '50%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>9M shares</span>
                              <span>9M shares</span>
                            </div>
                          </div>

                          {/* PropTech Focus */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              PropTech Investment Focus
                            </h5>
                            <div className="space-y-3">
                              <div className="p-3 bg-green-50 rounded">
                                <p className="text-sm font-semibold">Smart Building Solutions</p>
                                <p className="text-xs text-gray-600 mt-1">2 portfolio companies · £6.2M total value</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded">
                                <p className="text-sm font-semibold">Tenant Experience Platforms</p>
                                <p className="text-xs text-gray-600 mt-1">2 portfolio companies · £5.8M total value</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded">
                                <p className="text-sm font-semibold">Energy Management</p>
                                <p className="text-xs text-gray-600 mt-1">2 portfolio companies · £6.0M total value</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Pico - Simplified */}
                <tr className="border-b border-gray-200 hover:bg-yellow-50 bg-gray-50 cursor-pointer" onClick={() => toggleJV('pico')}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedJV === 'pico' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="font-semibold text-sm">Pico</p>
                    </div>
                  </td>
                  <td className="py-4 px-4"><span className="text-sm font-bold">45%</span></td>
                  <td className="py-4 px-4"><p className="text-sm font-semibold">£5M</p></td>
                  <td className="py-4 px-4 text-center"><p className="text-sm font-semibold">4</p></td>
                  <td className="py-4 px-4"><p className="text-sm font-bold text-green-600">£12M</p></td>
                  <td className="py-4 px-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span></td>
                </tr>
                {expandedJV === 'pico' && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Contract Details */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Contract Details</h4>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                              <p className="text-2xl font-bold text-black">4 years</p>
                              <p className="text-xs text-gray-500 mt-1">Started: Sep 2022</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Remaining Term</p>
                              <p className="text-2xl font-bold text-orange-600">2.8 years</p>
                              <p className="text-xs text-gray-500 mt-1">Ends: Jun 2026</p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-xs text-gray-500 uppercase mb-1">Remaining Cash to Deploy</p>
                            <p className="text-2xl font-bold text-black">£1.5M</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">£3.5M deployed of £5M total</p>
                          </div>

                          {/* ROI Metrics */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-yellow-400">
                              <p className="text-xs text-gray-500 uppercase mb-1">FF Equity Value</p>
                              <p className="text-2xl font-bold text-black">£6.6M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +45% since inception</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Pico Equity Value</p>
                              <p className="text-2xl font-bold text-black">£5.4M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +35% since inception</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Fast Growth Metrics */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">High Growth Portfolio</h4>

                          {/* Equity Visualization */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm font-semibold">Founders Factory</p>
                                <p className="text-2xl font-bold text-black">55%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">Pico</p>
                                <p className="text-2xl font-bold text-black">45%</p>
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                              <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{width: '55%'}}></div>
                              <div className="absolute right-0 top-0 h-full bg-indigo-500" style={{width: '45%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>6.6M shares</span>
                              <span>5.4M shares</span>
                            </div>
                          </div>

                          {/* Investment Committee Requirements */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              Investment Committee (2025)
                            </h5>

                            <div className="space-y-3">
                              <div className="p-3 bg-purple-50 rounded border border-purple-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-purple-900">Studio Deals</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">1/2 Approved</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">Required IC approvals this year</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '50%'}}></div>
                                </div>
                              </div>

                              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-blue-900">Accelerator Investments</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">2/2 Approved</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">Batch 3 cohort approvals</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                                </div>
                              </div>

                              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                <p className="text-xs font-semibold text-yellow-900 mb-1">Next IC Scheduled</p>
                                <p className="text-sm font-bold text-black">20 Mar 2025</p>
                                <p className="text-xs text-gray-600 mt-1">1 studio deal + Batch 4 review</p>
                              </div>
                            </div>
                          </div>

                          {/* Accelerator Performance */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              Strong Accelerator Pipeline
                            </h5>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                                <div>
                                  <p className="text-sm font-semibold">Batch 1 (Complete)</p>
                                  <p className="text-xs text-gray-600">2 companies graduated</p>
                                </div>
                                <p className="text-lg font-bold text-green-600">+52%</p>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                                <div>
                                  <p className="text-sm font-semibold">Batch 2 (Active)</p>
                                  <p className="text-xs text-gray-600">2 companies in progress</p>
                                </div>
                                <p className="text-lg font-bold text-blue-600">+38%</p>
                              </div>
                              <div className="p-3 bg-gray-100 rounded border-2 border-dashed border-gray-300">
                                <p className="text-sm font-semibold text-gray-600">Next Batch Planning</p>
                                <p className="text-xs text-gray-500">Q2 2026 target</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Fastweb - Simplified */}
                <tr className="border-b border-gray-200 hover:bg-yellow-50 bg-gray-50 cursor-pointer" onClick={() => toggleJV('fastweb')}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedJV === 'fastweb' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="font-semibold text-sm">Fastweb</p>
                    </div>
                  </td>
                  <td className="py-4 px-4"><span className="text-sm font-bold">40%</span></td>
                  <td className="py-4 px-4"><p className="text-sm font-semibold">£4M</p></td>
                  <td className="py-4 px-4 text-center"><p className="text-sm font-semibold">3</p></td>
                  <td className="py-4 px-4"><p className="text-sm font-bold text-green-600">£10M</p></td>
                  <td className="py-4 px-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span></td>
                </tr>
                {expandedJV === 'fastweb' && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Contract Details */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Contract Details</h4>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                              <p className="text-2xl font-bold text-black">5 years</p>
                              <p className="text-xs text-gray-500 mt-1">Started: Apr 2022</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Remaining Term</p>
                              <p className="text-2xl font-bold text-green-600">3.7 years</p>
                              <p className="text-xs text-gray-500 mt-1">Ends: Jan 2028</p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-xs text-gray-500 uppercase mb-1">Remaining Cash to Deploy</p>
                            <p className="text-2xl font-bold text-black">£1.2M</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">£2.8M deployed of £4M total</p>
                          </div>

                          {/* Equity Values */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-yellow-400">
                              <p className="text-xs text-gray-500 uppercase mb-1">FF Equity Value</p>
                              <p className="text-2xl font-bold text-black">£6.0M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +50% since inception</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-xs text-gray-500 uppercase mb-1">Fastweb Equity Value</p>
                              <p className="text-2xl font-bold text-black">£4.0M</p>
                              <p className="text-xs text-green-600 mt-1">↑ +33% since inception</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Connectivity Focus */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg mb-4">Digital Infrastructure Focus</h4>

                          {/* Equity Visualization */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm font-semibold">Founders Factory</p>
                                <p className="text-2xl font-bold text-black">60%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">Fastweb</p>
                                <p className="text-2xl font-bold text-black">40%</p>
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                              <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{width: '60%'}}></div>
                              <div className="absolute right-0 top-0 h-full bg-red-500" style={{width: '40%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>6M shares</span>
                              <span>4M shares</span>
                            </div>
                          </div>

                          {/* Investment Committee Requirements */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              Investment Committee (2025)
                            </h5>

                            <div className="space-y-3">
                              <div className="p-3 bg-purple-50 rounded border border-purple-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-purple-900">Studio Deals</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">N/A</span>
                                </div>
                                <p className="text-xs text-gray-600">No studio program for this JV</p>
                              </div>

                              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm font-semibold text-blue-900">Accelerator Investments</p>
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">2/2 Approved</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">Batch 2 cohort fully approved</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                                </div>
                              </div>

                              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                <p className="text-xs font-semibold text-yellow-900 mb-1">Next IC Scheduled</p>
                                <p className="text-sm font-bold text-black">10 Apr 2025</p>
                                <p className="text-xs text-gray-600 mt-1">Batch 3 cohort review (4 companies)</p>
                              </div>
                            </div>
                          </div>

                          {/* Connectivity Innovation */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                            <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                              </svg>
                              Connectivity & 5G Ventures
                            </h5>
                            <div className="space-y-3">
                              <div className="p-3 bg-red-50 rounded">
                                <p className="text-sm font-semibold">5G Network Solutions</p>
                                <p className="text-xs text-gray-600 mt-1">1 portfolio company · £4.2M value</p>
                                <p className="text-xs text-green-600 mt-1">Series A raised £3M</p>
                              </div>
                              <div className="p-3 bg-red-50 rounded">
                                <p className="text-sm font-semibold">IoT Connectivity Platform</p>
                                <p className="text-xs text-gray-600 mt-1">1 portfolio company · £3.5M value</p>
                                <p className="text-xs text-green-600 mt-1">Seed stage · Growing fast</p>
                              </div>
                              <div className="p-3 bg-red-50 rounded">
                                <p className="text-sm font-semibold">Edge Computing Startup</p>
                                <p className="text-xs text-gray-600 mt-1">1 portfolio company · £2.3M value</p>
                                <p className="text-xs text-blue-600 mt-1">Pre-seed · Early stage</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Obligations Tracker */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-bold text-black mb-6">Investment Obligations Tracker</h3>
          <div className="space-y-6">
            {/* Aviva - Studio Only */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-base text-black">Aviva</h4>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">ON TRACK</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next IC: 15 Feb 2025</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-600 font-medium">Studio Deals (Deadline: 31 Dec 2026)</p>
                    <p className="text-sm font-bold text-black">8 / 10 committed</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>IC Approvals: 2/3 for 2025</span>
                    <span>80% complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mediobanca - Studio Only */}
            <div className="border border-yellow-300 rounded-lg p-4 bg-yellow-50">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-base text-black">Mediobanca</h4>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">AT RISK</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-red-600 font-medium">Next IC: 28 Feb 2025 (urgent)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-600 font-medium">Studio Deals (Deadline: 30 Jun 2026)</p>
                    <p className="text-sm font-bold text-black">5 / 8 committed</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '63%'}}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>IC Approvals: 3/5 for 2025 (2 pending)</span>
                    <span>63% complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pico - Studio + Accelerator */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-base text-black">Pico</h4>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">ON TRACK</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next IC: 20 Mar 2025</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600 font-medium">Studio Deals (Deadline: 30 Jun 2026)</p>
                      <p className="text-sm font-bold text-black">3 / 5 committed</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>IC Approvals: 1/2 for 2025</span>
                      <span>60% complete</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-blue-600 font-medium">Accelerator Investments (Batch 3)</p>
                      <p className="text-sm font-bold text-black">2 / 2 committed</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>IC Approvals: 2/2 approved</span>
                      <span>100% complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fastweb - Accelerator Only */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-base text-black">Fastweb</h4>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">ON TRACK</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next IC: 10 Apr 2025</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-blue-600 font-medium">Accelerator Investments (Batch 2)</p>
                    <p className="text-sm font-bold text-black">2 / 2 committed</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>IC Approvals: 2/2 approved (Batch 3 pending)</span>
                    <span>100% complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 text-center">
            <span className="font-bold text-black">Mock Dashboard</span> ·
            This dashboard displays sample data for demonstration purposes.
            Real-time data integration will be implemented in the next phase.
          </p>
        </div>
              </div>
            )}

            {jvSubTab === 'geography' && (
              <div className="space-y-6">
                {/* Isometric Header */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  {/* Isometric grid background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="isometric-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                          <path d="M 0 0 L 40 0 L 40 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#isometric-grid)" />
                    </svg>
                  </div>

                  <div className="relative p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                          Global Deal Network
                        </h2>
                        <p className="text-slate-300 text-sm">
                          Real-time visualization of corporate partnerships across 7 markets
                        </p>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-center bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyan-500/30">
                          <div className="text-3xl font-bold text-cyan-400">7</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Markets</div>
                        </div>
                        <div className="text-center bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-yellow-500/30">
                          <div className="text-3xl font-bold text-yellow-400">£120M</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Deal Value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Globe Container */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-b-4 border-yellow-400 overflow-hidden">
                  <DealGeographyGlobe />
                </div>

                {/* Market Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { name: 'UK', value: '£35M', deals: 3, color: 'from-yellow-500 to-yellow-600' },
                    { name: 'Germany', value: '£18M', deals: 2, color: 'from-green-500 to-green-600' },
                    { name: 'Japan', value: '£22M', deals: 2, color: 'from-purple-500 to-purple-600' },
                    { name: 'Saudi Arabia', value: '£15M', deals: 1, color: 'from-orange-500 to-orange-600' },
                    { name: 'Australia', value: '£12M', deals: 1, color: 'from-blue-500 to-blue-600' },
                    { name: 'Singapore', value: '£10M', deals: 1, color: 'from-teal-500 to-teal-600' },
                    { name: 'Thailand', value: '£8M', deals: 1, color: 'from-pink-500 to-pink-600' },
                  ].map((market) => (
                    <div key={market.name} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow border border-gray-200">
                      <div className={`w-full h-2 bg-gradient-to-r ${market.color} rounded-full mb-3`}></div>
                      <div className="text-sm font-bold text-gray-900">{market.name}</div>
                      <div className="text-2xl font-bold text-black mt-2">{market.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{market.deals} deal{market.deals > 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-bold text-sm mb-4 text-gray-900">Market Connections</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <span className="text-sm text-gray-700">UK Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-sm text-gray-700">Active Partnerships</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                      <span className="text-sm text-gray-700">Deal Flow</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div>
            {/* Pipeline Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Prospect Deals</h3>
                <p className="text-3xl font-bold text-black">4</p>
                <p className="text-xs text-gray-500 mt-2">Active negotiations</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Total Pipeline Value</h3>
                <p className="text-3xl font-bold text-black">£62M</p>
                <p className="text-xs text-gray-500 mt-2">Potential investment</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Avg Contract Term</h3>
                <p className="text-3xl font-bold text-black">5.5 yrs</p>
                <p className="text-xs text-gray-500 mt-2">Across pipeline</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Investment Committees</h3>
                <p className="text-3xl font-bold text-black">3</p>
                <p className="text-xs text-gray-500 mt-2">Pending approval</p>
              </div>
            </div>

            {/* Pipeline Deals Table */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-bold text-black mb-6">Pipeline Deals</h3>
              <div className="space-y-4">
                {/* MSWA Deal */}
                <div className="border border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black">MSWA</h4>
                      <p className="text-sm text-gray-500 mt-1">Financial Services • Stage: Due Diligence</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">IN PROGRESS</span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Deal Value</p>
                      <p className="text-lg font-bold text-black">£18M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                      <p className="text-lg font-bold text-black">7 years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">FF Stake</p>
                      <p className="text-lg font-bold text-black">55%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">IC Status</p>
                      <p className="text-sm font-semibold text-orange-600">Pending</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Structure Flow diagram ready for upload</span>
                  </div>
                </div>

                {/* Bosch Deal */}
                <div className="border border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black">Bosch</h4>
                      <p className="text-sm text-gray-500 mt-1">Manufacturing & IoT • Stage: Term Sheet</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ADVANCED</span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Deal Value</p>
                      <p className="text-lg font-bold text-black">£22M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                      <p className="text-lg font-bold text-black">5 years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">FF Stake</p>
                      <p className="text-lg font-bold text-black">50%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">IC Status</p>
                      <p className="text-sm font-semibold text-green-600">Approved</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Structure Flow diagram ready for upload</span>
                  </div>
                </div>

                {/* NWM Deal */}
                <div className="border border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black">NWM</h4>
                      <p className="text-sm text-gray-500 mt-1">Wealth Management • Stage: Initial Discussions</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">EARLY STAGE</span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Deal Value</p>
                      <p className="text-lg font-bold text-black">£12M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                      <p className="text-lg font-bold text-black">4 years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">FF Stake</p>
                      <p className="text-lg font-bold text-black">60%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">IC Status</p>
                      <p className="text-sm font-semibold text-gray-500">Not Submitted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Structure Flow diagram ready for upload</span>
                  </div>
                </div>

                {/* HSBC Deal */}
                <div className="border border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black">HSBC</h4>
                      <p className="text-sm text-gray-500 mt-1">Banking & Financial Services • Stage: Negotiations</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">IN PROGRESS</span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Deal Value</p>
                      <p className="text-lg font-bold text-black">£10M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Contract Term</p>
                      <p className="text-lg font-bold text-black">6 years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">FF Stake</p>
                      <p className="text-lg font-bold text-black">45%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">IC Status</p>
                      <p className="text-sm font-semibold text-orange-600">Under Review</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Structure Flow diagram ready for upload</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-500 text-center">
                <span className="font-bold text-black">Pipeline Dashboard</span> ·
                Upload Structure Flow diagrams for each deal to visualize legal structures.
                IC = Investment Committee
              </p>
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div>
            {/* Renewals Alert Banner */}
            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-8 rounded-r-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-bold text-orange-800">Critical: Renewal Notice Periods</p>
                  <p className="text-sm text-orange-700 mt-1">Track notice periods for subscription agreements and shareholders' agreements to ensure timely renewal decisions and protect cash flow.</p>
                </div>
              </div>
            </div>

            {/* Renewals Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Notice Due Soon</h3>
                <p className="text-3xl font-bold text-red-600">2</p>
                <p className="text-xs text-gray-500 mt-2">Within 90 days</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Upcoming Notices</h3>
                <p className="text-3xl font-bold text-yellow-600">3</p>
                <p className="text-xs text-gray-500 mt-2">Within 6 months</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <h3 className="text-sm font-light text-gray-500 uppercase mb-2">Future Renewals</h3>
                <p className="text-3xl font-bold text-green-600">5</p>
                <p className="text-xs text-gray-500 mt-2">Beyond 6 months</p>
              </div>
            </div>

            {/* Renewals Table */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-black mb-6">Contract Renewal Notice Tracker</h3>
              <div className="space-y-6">

                {/* Aviva Renewals */}
                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black flex items-center gap-3">
                        Aviva
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span>
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">7-year term • Started Jan 2022 • Ends Dec 2028</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Subscription Agreement */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-orange-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h5 className="font-bold text-sm">Subscription Agreement</h5>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-orange-100 text-orange-800">CRITICAL</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Period:</span>
                          <span className="font-bold">12 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Due By:</span>
                          <span className="font-bold text-orange-600">31 Dec 2027</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Days Until Notice:</span>
                          <span className="font-bold text-orange-600">722 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cash Flow Impact:</span>
                          <span className="font-bold text-red-600">£6.5M remaining</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={renewalReminders['aviva-sub']}
                            onChange={() => toggleRenewalReminder('aviva-sub')}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                          <span className="text-xs font-medium text-gray-700">Calendar Set</span>
                        </label>
                        <button
                          onClick={() => alert('Add Subscription Agreement renewal notice to Google Calendar')}
                          className="text-xs flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                      </div>
                    </div>

                    {/* Shareholders' Agreement */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-yellow-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h5 className="font-bold text-sm">Shareholders' Agreement</h5>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800">IMPORTANT</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Period:</span>
                          <span className="font-bold">6 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Due By:</span>
                          <span className="font-bold text-yellow-600">30 Jun 2028</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Days Until Notice:</span>
                          <span className="font-bold text-yellow-600">903 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Equity at Risk:</span>
                          <span className="font-bold text-red-600">£27M (60%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={renewalReminders['aviva-sha']}
                            onChange={() => toggleRenewalReminder('aviva-sha')}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                          <span className="text-xs font-medium text-gray-700">Calendar Set</span>
                        </label>
                        <button
                          onClick={() => alert('Add SHA renewal notice to Google Calendar')}
                          className="text-xs flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mediobanca Renewals */}
                <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-black flex items-center gap-3">
                        Mediobanca
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span>
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">5-year term • Started Mar 2022 • Ends Jun 2027</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-red-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h5 className="font-bold text-sm">Subscription Agreement</h5>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-800">URGENT</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Period:</span>
                          <span className="font-bold">9 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Due By:</span>
                          <span className="font-bold text-red-600">30 Sep 2026</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Days Until Notice:</span>
                          <span className="font-bold text-red-600">265 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cash Flow Impact:</span>
                          <span className="font-bold text-red-600">£3.2M remaining</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={renewalReminders['mediobanca-sub']}
                            onChange={() => toggleRenewalReminder('mediobanca-sub')}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                          <span className="text-xs font-medium text-gray-700">Calendar Set</span>
                        </label>
                        <button
                          onClick={() => alert('Add Subscription Agreement renewal notice to Google Calendar')}
                          className="text-xs flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-orange-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h5 className="font-bold text-sm">Shareholders' Agreement</h5>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-orange-100 text-orange-800">CRITICAL</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Period:</span>
                          <span className="font-bold">6 months</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Notice Due By:</span>
                          <span className="font-bold text-orange-600">31 Dec 2026</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Days Until Notice:</span>
                          <span className="font-bold text-orange-600">357 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Equity at Risk:</span>
                          <span className="font-bold text-red-600">£15.4M (55%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={renewalReminders['mediobanca-sha']}
                            onChange={() => toggleRenewalReminder('mediobanca-sha')}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                          <span className="text-xs font-medium text-gray-700">Calendar Set</span>
                        </label>
                        <button
                          onClick={() => alert('Add SHA renewal notice to Google Calendar')}
                          className="text-xs flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vonovia, Pico, Fastweb - Simplified Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Vonovia */}
                  <div className="border-l-4 border-teal-500 pl-4 py-3 bg-teal-50 rounded-r-lg">
                    <h4 className="text-sm font-bold text-black mb-2">Vonovia</h4>
                    <p className="text-xs text-gray-600 mb-3">6-year term • Ends Dec 2027</p>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="text-gray-600">Sub Agreement:</span>
                        <span className="font-bold text-green-600 ml-2">Jun 2027</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">SHA:</span>
                        <span className="font-bold text-green-600 ml-2">Dec 2027</span>
                      </div>
                    </div>
                  </div>

                  {/* Pico */}
                  <div className="border-l-4 border-indigo-500 pl-4 py-3 bg-indigo-50 rounded-r-lg">
                    <h4 className="text-sm font-bold text-black mb-2">Pico</h4>
                    <p className="text-xs text-gray-600 mb-3">4-year term • Ends Jun 2026</p>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="text-gray-600">Sub Agreement:</span>
                        <span className="font-bold text-red-600 ml-2">Dec 2025</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">SHA:</span>
                        <span className="font-bold text-orange-600 ml-2">Mar 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Fastweb */}
                  <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                    <h4 className="text-sm font-bold text-black mb-2">Fastweb</h4>
                    <p className="text-xs text-gray-600 mb-3">5-year term • Ends Jan 2028</p>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="text-gray-600">Sub Agreement:</span>
                        <span className="font-bold text-green-600 ml-2">Jul 2027</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">SHA:</span>
                        <span className="font-bold text-green-600 ml-2">Jan 2028</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mt-8">
              <p className="text-sm text-gray-500 text-center">
                <span className="font-bold text-black">Renewal Notice Tracker</span> ·
                Critical dates for serving notice on subscription agreements and shareholders' agreements.
                Missing these deadlines can have significant cash flow and equity implications.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'studio' && (
          <StudioDealsView initialJVFilter={studioJVFilter} />
        )}

        {activeTab === 'accelerator' && (
          <AcceleratorDealsView initialJVFilter={acceleratorJVFilter} />
        )}

        {activeTab === 'financing' && (
          <FinancingRoundsView />
        )}

        {activeTab === 'audit' && (
          <AuditView />
        )}
      </main>
    </div>
  );
}

export default App;
