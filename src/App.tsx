import { useState } from 'react';
import { DealGeographyGlobe } from './components/DealGeographyGlobe';

function App() {
  const [activeTab, setActiveTab] = useState<'active' | 'pipeline' | 'renewals' | 'geography'>('active');
  const [expandedJV, setExpandedJV] = useState<string | null>(null);
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
      {/* Header */}
      <header className="bg-black text-white py-6 px-8 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Founders Factory</h1>
          <p className="text-sm text-gray-400 mt-1">
            Corporate Partnerships & Portfolio Dashboard
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'active'
                  ? 'text-black border-b-2 border-yellow-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Joint Ventures
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'pipeline'
                  ? 'text-black border-b-2 border-yellow-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveTab('renewals')}
              className={`px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'renewals'
                  ? 'text-black border-b-2 border-yellow-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Renewals & Notices
            </button>
            <button
              onClick={() => setActiveTab('geography')}
              className={`px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'geography'
                  ? 'text-black border-b-2 border-yellow-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Deal Geography
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'active' && (
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

                        {/* Right Column - Equity Split & Share Issuance */}
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

                          {/* Accelerator Performance */}
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
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
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-sm text-black">Aviva</h4>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">ON TRACK</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Studio Investments · Deadline: 31 Dec 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-black">8 / 10</p>
                  <p className="text-xs text-gray-500">80% complete</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-sm text-black">Mediobanca</h4>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">AT RISK</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Studio Investments · Deadline: 30 Jun 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-black">5 / 8</p>
                  <p className="text-xs text-gray-500">63% complete</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: '63%'}}></div>
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
                          className="text-xs flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
                          className="text-xs flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
                          className="text-xs flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
                          className="text-xs flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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

        {activeTab === 'geography' && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Global Deal Network</h2>
                  <p className="text-slate-300 text-sm">Real-time visualization of corporate partnerships across 7 markets</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">7</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Markets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">11</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Active Deals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">£120M</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Total Value</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Globe Visualization */}
            <DealGeographyGlobe />

            {/* Market Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                  <h3 className="text-white font-bold">Primary Hub</h3>
                </div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">UK</div>
                <div className="text-slate-300 text-sm mb-4">Central command for EMEA operations</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Deal Value:</span>
                    <span className="text-white font-semibold">£35M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Active Deals:</span>
                    <span className="text-white font-semibold">3</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                  <h3 className="text-white font-bold">Asia-Pacific Lead</h3>
                </div>
                <div className="text-4xl font-bold text-purple-400 mb-2">Japan</div>
                <div className="text-slate-300 text-sm mb-4">Fastest growing APAC market</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Deal Value:</span>
                    <span className="text-white font-semibold">£22M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Active Deals:</span>
                    <span className="text-white font-semibold">2</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <h3 className="text-white font-bold">Emerging Market</h3>
                </div>
                <div className="text-4xl font-bold text-green-400 mb-2">Germany</div>
                <div className="text-slate-300 text-sm mb-4">Strategic European expansion</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Deal Value:</span>
                    <span className="text-white font-semibold">£18M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Active Deals:</span>
                    <span className="text-white font-semibold">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-black mb-6">Regional Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">EMEA</span>
                    <span className="text-sm font-bold text-black">£68M (57%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '57%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Asia-Pacific</span>
                    <span className="text-sm font-bold text-black">£52M (43%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-400 h-3 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  <span className="font-bold text-black">Live Network Visualization</span> ·
                  Powered by real-time deal flow data across 7 global markets.
                  Network connections show active partnerships and capital flows.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
