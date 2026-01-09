import { useState } from 'react';

interface CompaniesHouseEntity {
  id: string;
  entityName: string;
  jvPartner: 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia' | 'Pico';
  companyNumber: string;
  incorporationDate: string;
  accountingReferenceDate: string;
  lastAccountsFiled: string;
  nextAccountsDue: string;
  confirmationStatementDate: string;
  nextConfirmationDue: string;
  registeredOffice: string;
  status: 'active' | 'dormant';
}

export function CompaniesHouseView() {
  const [selectedJV, setSelectedJV] = useState<'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia' | 'Pico'>('All');
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  const companiesHouseEntities: CompaniesHouseEntity[] = [
    {
      id: 'aviva-jv',
      entityName: 'Founders Factory Aviva Limited',
      jvPartner: 'Aviva',
      companyNumber: '10234567',
      incorporationDate: '2022-01-15',
      accountingReferenceDate: '31 December',
      lastAccountsFiled: '2024-09-30',
      nextAccountsDue: '2025-09-30',
      confirmationStatementDate: '2024-01-15',
      nextConfirmationDue: '2025-02-12',
      registeredOffice: '15 Clerkenwell Close, London, EC1R 0AA',
      status: 'active',
    },
    {
      id: 'mediobanca-jv',
      entityName: 'Founders Factory Mediobanca Limited',
      jvPartner: 'Mediobanca',
      companyNumber: '10345678',
      incorporationDate: '2022-03-20',
      accountingReferenceDate: '31 March',
      lastAccountsFiled: '2024-06-30',
      nextAccountsDue: '2025-06-30',
      confirmationStatementDate: '2024-03-20',
      nextConfirmationDue: '2025-04-17',
      registeredOffice: '15 Clerkenwell Close, London, EC1R 0AA',
      status: 'active',
    },
    {
      id: 'fastweb-jv',
      entityName: 'Founders Factory Fastweb Limited',
      jvPartner: 'Fastweb',
      companyNumber: '11456789',
      incorporationDate: '2023-06-10',
      accountingReferenceDate: '30 June',
      lastAccountsFiled: '2024-12-31',
      nextAccountsDue: '2025-12-31',
      confirmationStatementDate: '2024-06-10',
      nextConfirmationDue: '2025-07-08',
      registeredOffice: '15 Clerkenwell Close, London, EC1R 0AA',
      status: 'active',
    },
    {
      id: 'vonovia-jv',
      entityName: 'Founders Factory Vonovia Limited',
      jvPartner: 'Vonovia',
      companyNumber: '11567890',
      incorporationDate: '2023-09-01',
      accountingReferenceDate: '30 September',
      lastAccountsFiled: '2024-03-31',
      nextAccountsDue: '2025-03-31',
      confirmationStatementDate: '2024-09-01',
      nextConfirmationDue: '2025-09-29',
      registeredOffice: '15 Clerkenwell Close, London, EC1R 0AA',
      status: 'active',
    },
    {
      id: 'pico-jv',
      entityName: 'Founders Factory Pico Limited',
      jvPartner: 'Pico',
      companyNumber: '09876543',
      incorporationDate: '2021-11-05',
      accountingReferenceDate: '31 October',
      lastAccountsFiled: '2024-04-30',
      nextAccountsDue: '2025-04-30',
      confirmationStatementDate: '2024-11-05',
      nextConfirmationDue: '2025-12-03',
      registeredOffice: '15 Clerkenwell Close, London, EC1R 0AA',
      status: 'active',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntil = (dateString: string) => {
    const now = new Date();
    const target = new Date(dateString);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil < 0) return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100 text-red-800' };
    if (daysUntil <= 30) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' };
    if (daysUntil <= 60) return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800' };
    return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-800' };
  };

  const getJVColor = (jv: string) => {
    switch (jv) {
      case 'Aviva': return 'bg-blue-100 text-blue-800';
      case 'Mediobanca': return 'bg-purple-100 text-purple-800';
      case 'Fastweb': return 'bg-indigo-100 text-indigo-800';
      case 'Vonovia': return 'bg-pink-100 text-pink-800';
      case 'Pico': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEntities = selectedJV === 'All'
    ? companiesHouseEntities
    : companiesHouseEntities.filter(entity => entity.jvPartner === selectedJV);

  // Calculate summary stats
  const upcomingDeadlines = companiesHouseEntities.filter(entity => {
    const accountsDays = getDaysUntil(entity.nextAccountsDue);
    const confirmationDays = getDaysUntil(entity.nextConfirmationDue);
    return accountsDays <= 60 || confirmationDays <= 60;
  }).length;

  const overdueItems = companiesHouseEntities.filter(entity => {
    const accountsDays = getDaysUntil(entity.nextAccountsDue);
    const confirmationDays = getDaysUntil(entity.nextConfirmationDue);
    return accountsDays < 0 || confirmationDays < 0;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Total Entities</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{companiesHouseEntities.length}</div>
          <div className="text-sm text-gray-600">JV companies registered</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Active Entities</div>
          <div className="text-3xl font-semibold text-teal-600 mb-1">
            {companiesHouseEntities.filter(e => e.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Currently trading</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Upcoming Deadlines</div>
          <div className="text-3xl font-semibold text-yellow-600 mb-1">{upcomingDeadlines}</div>
          <div className="text-sm text-gray-600">Within 60 days</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Overdue Items</div>
          <div className="text-3xl font-semibold text-red-600 mb-1">{overdueItems}</div>
          <div className="text-sm text-gray-600">Require attention</div>
        </div>
      </div>

      {/* JV Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 mr-2">Filter by JV Partner:</span>
          <button
            onClick={() => setSelectedJV('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedJV === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Partners ({companiesHouseEntities.length})
          </button>
          {(['Aviva', 'Mediobanca', 'Fastweb', 'Vonovia', 'Pico'] as const).map((partner) => (
            <button
              key={partner}
              onClick={() => setSelectedJV(partner)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedJV === partner
                  ? 'bg-yellow-500 text-black'
                  : 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100'
              }`}
            >
              {partner}
            </button>
          ))}
        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filteredEntities.map((entity) => {
          const accountsDaysUntil = getDaysUntil(entity.nextAccountsDue);
          const confirmationDaysUntil = getDaysUntil(entity.nextConfirmationDue);
          const accountsUrgency = getUrgencyColor(accountsDaysUntil);
          const confirmationUrgency = getUrgencyColor(confirmationDaysUntil);
          const isHovered = hoveredEntity === entity.id;

          return (
            <div
              key={entity.id}
              onMouseEnter={() => setHoveredEntity(entity.id)}
              onMouseLeave={() => setHoveredEntity(null)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              style={{
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-900">{entity.entityName}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getJVColor(entity.jvPartner)}`}>
                      {entity.jvPartner}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-teal-100 text-teal-800">
                      {entity.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span className="font-medium">Co. No: {entity.companyNumber}</span>
                    <span className="text-gray-300">•</span>
                    <span>Incorporated: {formatDate(entity.incorporationDate)}</span>
                  </div>
                </div>

                {/* Companies House Badge */}
                <a
                  href={`https://find-and-update.company-information.service.gov.uk/company/${entity.companyNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Companies House
                </a>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* Accounting Reference Date */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Accounting Period</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Year End: {entity.accountingReferenceDate}</p>
                  <p className="text-xs text-gray-500">Last Filed: {formatDate(entity.lastAccountsFiled)}</p>
                </div>

                {/* Registered Office */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Registered Office</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{entity.registeredOffice}</p>
                </div>
              </div>

              {/* Compliance Trackers */}
              <div className="space-y-3">
                {/* Accounts Due Tracker */}
                <div className={`rounded-lg p-4 border ${accountsUrgency.bg} ${accountsUrgency.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${accountsUrgency.badge} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${accountsUrgency.text}`}>Annual Accounts Due</h4>
                        <p className="text-xs text-gray-600">Next filing deadline</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${accountsUrgency.text}`}>
                        {accountsDaysUntil < 0 ? 'OVERDUE' : `${accountsDaysUntil}d`}
                      </p>
                      <p className="text-xs text-gray-600">{formatDate(entity.nextAccountsDue)}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        accountsDaysUntil < 0 ? 'bg-red-500' :
                        accountsDaysUntil <= 30 ? 'bg-amber-500' :
                        accountsDaysUntil <= 60 ? 'bg-yellow-400' :
                        'bg-teal-500'
                      }`}
                      style={{
                        width: accountsDaysUntil < 0 ? '100%' : `${Math.max(0, Math.min(100, 100 - (accountsDaysUntil / 365) * 100))}%`
                      }}
                    />
                  </div>
                </div>

                {/* Confirmation Statement Tracker */}
                <div className={`rounded-lg p-4 border ${confirmationUrgency.bg} ${confirmationUrgency.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${confirmationUrgency.badge} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${confirmationUrgency.text}`}>Confirmation Statement Due</h4>
                        <p className="text-xs text-gray-600">Next filing deadline</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${confirmationUrgency.text}`}>
                        {confirmationDaysUntil < 0 ? 'OVERDUE' : `${confirmationDaysUntil}d`}
                      </p>
                      <p className="text-xs text-gray-600">{formatDate(entity.nextConfirmationDue)}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        confirmationDaysUntil < 0 ? 'bg-red-500' :
                        confirmationDaysUntil <= 30 ? 'bg-amber-500' :
                        confirmationDaysUntil <= 60 ? 'bg-yellow-400' :
                        'bg-teal-500'
                      }`}
                      style={{
                        width: confirmationDaysUntil < 0 ? '100%' : `${Math.max(0, Math.min(100, 100 - (confirmationDaysUntil / 365) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Companies House API Integration</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              In production, this would connect to the Companies House API for real-time data updates.
              Automatic notifications would be sent 90, 60, and 30 days before filing deadlines.
              The system would also track director appointments, share capital changes, and filing history.
            </p>
            <a
              href="https://developer-specs.company-information.service.gov.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-700 hover:text-blue-800 underline mt-2 inline-block"
            >
              Learn about Companies House API →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
