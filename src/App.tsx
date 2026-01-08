import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState<'active' | 'pipeline'>('active');
  const [expandedJV, setExpandedJV] = useState<string | null>(null);
  const [shareIssuances, setShareIssuances] = useState<{[key: string]: boolean}>({
    'aviva-2026-06': false,
    'mediobanca-2026-09': false,
    'vonovia-2026-12': false,
  });

  const toggleJV = (jvId: string) => {
    setExpandedJV(expandedJV === jvId ? null : jvId);
  };

  const toggleShareIssuance = (key: string) => {
    setShareIssuances(prev => ({...prev, [key]: !prev[key]}));
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
                  <tr className="bg-gray-50"><td colSpan={6} className="p-6"><p className="text-sm text-gray-600">Detailed view for Mediobanca - Contract: 5 years, Remaining: 3.2 years, Equity: FF 55% / Mediobanca 45%</p></td></tr>
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
                  <tr className="bg-gray-50"><td colSpan={6} className="p-6"><p className="text-sm text-gray-600">Detailed view for Vonovia - Contract: 6 years, Remaining: 4.5 years, Equity: FF 50% / Vonovia 50%</p></td></tr>
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
                  <tr className="bg-gray-50"><td colSpan={6} className="p-6"><p className="text-sm text-gray-600">Detailed view for Pico - Contract: 4 years, Remaining: 2.8 years, Equity: FF 55% / Pico 45%</p></td></tr>
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
                  <tr className="bg-gray-50"><td colSpan={6} className="p-6"><p className="text-sm text-gray-600">Detailed view for Fastweb - Contract: 5 years, Remaining: 3.7 years, Equity: FF 60% / Fastweb 40%</p></td></tr>
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
      </main>
    </div>
  );
}

export default App;
