import { useState } from 'react';
import {
  companiesHouseAlerts,
  getAlertsByEntity,
  getActionRequiredAlerts,
} from '../data/companiesHouseMonitoring';

export function CompaniesHouseAlerts() {
  const [filterEntity, setFilterEntity] = useState<'all' | 'jv' | 'portfolio'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [showOnlyUnacknowledged, setShowOnlyUnacknowledged] = useState(true);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const filteredAlerts = companiesHouseAlerts
    .filter(alert => {
      if (filterEntity !== 'all' && alert.relatedEntity !== filterEntity) return false;
      if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
      if (showOnlyUnacknowledged && alert.acknowledged) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by severity first
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;

      // Then by date (newest first)
      return new Date(b.detectedDate).getTime() - new Date(a.detectedDate).getTime();
    });

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical': return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-800',
        icon: 'text-red-600'
      };
      case 'high': return {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        badge: 'bg-orange-100 text-orange-800',
        icon: 'text-orange-600'
      };
      case 'medium': return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800',
        icon: 'text-yellow-600'
      };
      case 'low': return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800',
        icon: 'text-blue-600'
      };
      default: return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-800',
        icon: 'text-gray-600'
      };
    }
  };

  const getAlertTypeIcon = (alertType: string) => {
    switch (alertType) {
      case 'strike-off-notice':
      case 'dissolution':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'filing-overdue':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'filing-reminder':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'insolvency':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      case 'director-change':
      case 'officer-change':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const criticalAlerts = companiesHouseAlerts.filter(a => a.severity === 'critical' && !a.acknowledged).length;
  const actionRequiredCount = getActionRequiredAlerts().length;
  const jvAlertsCount = getAlertsByEntity('jv').filter(a => !a.acknowledged).length;
  const portfolioAlertsCount = getAlertsByEntity('portfolio').filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Total Alerts</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{companiesHouseAlerts.length}</div>
          <div className="text-sm text-gray-600">All time</div>
        </div>

        <div className="bg-white border border-red-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Critical Alerts</div>
          <div className="text-3xl font-semibold text-red-600 mb-1">{criticalAlerts}</div>
          <div className="text-sm text-gray-600">Require immediate action</div>
        </div>

        <div className="bg-white border border-orange-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Action Required</div>
          <div className="text-3xl font-semibold text-orange-600 mb-1">{actionRequiredCount}</div>
          <div className="text-sm text-gray-600">Pending response</div>
        </div>

        <div className="bg-white border border-blue-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">JV Entities</div>
          <div className="text-3xl font-semibold text-blue-600 mb-1">{jvAlertsCount}</div>
          <div className="text-sm text-gray-600">Joint venture alerts</div>
        </div>

        <div className="bg-white border border-purple-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Portfolio</div>
          <div className="text-3xl font-semibold text-purple-600 mb-1">{portfolioAlertsCount}</div>
          <div className="text-sm text-gray-600">Portfolio company alerts</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Companies House Monitoring</h2>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showOnlyUnacknowledged}
                onChange={(e) => setShowOnlyUnacknowledged(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700 font-medium">Show only unacknowledged</span>
            </label>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {/* Entity Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600 mr-2">Entity Type:</span>
            <button
              onClick={() => setFilterEntity('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterEntity === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterEntity('jv')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterEntity === 'jv'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              JV Entities ({jvAlertsCount})
            </button>
            <button
              onClick={() => setFilterEntity('portfolio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterEntity === 'portfolio'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              Portfolio Companies ({portfolioAlertsCount})
            </button>
          </div>

          {/* Severity Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600 mr-2">Severity:</span>
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterSeverity === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterSeverity === 'critical'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterSeverity('high')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterSeverity === 'high'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
            >
              High
            </button>
            <button
              onClick={() => setFilterSeverity('medium')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterSeverity === 'medium'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilterSeverity('low')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterSeverity === 'low'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              Low
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No alerts found</h3>
          <p className="mt-2 text-sm text-gray-600">All Companies House monitoring alerts are acknowledged or filtered out</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            const isExpanded = expandedAlert === alert.id;

            return (
              <div
                key={alert.id}
                className={`border ${style.border} ${style.bg} rounded-lg overflow-hidden hover:shadow-md transition-shadow`}
              >
                {/* Alert Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center ${style.icon}`}>
                      {getAlertTypeIcon(alert.alertType)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-base font-bold ${style.text}`}>{alert.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${style.badge}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          {alert.actionRequired && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                              ACTION REQUIRED
                            </span>
                          )}
                          {alert.relatedEntity === 'jv' && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              JV Entity
                            </span>
                          )}
                          {alert.relatedEntity === 'portfolio' && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Portfolio
                            </span>
                          )}
                        </div>

                        <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                          <svg
                            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-sm text-gray-700 mb-2">{alert.description}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
                        <span className="font-medium">{alert.companyName}</span>
                        <span className="text-gray-400">•</span>
                        <span>Co. {alert.companyNumber}</span>
                        <span className="text-gray-400">•</span>
                        <span>Detected: {formatDate(alert.detectedDate)}</span>
                        {alert.jvPartner && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="font-medium">{alert.jvPartner}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200/50 pt-4 bg-white/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {alert.actionDeadline && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Action Deadline</p>
                          <p className="text-sm font-bold text-gray-900">{formatDate(alert.actionDeadline)}</p>
                        </div>
                      )}
                      {alert.companyStatus && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Company Status</p>
                          <p className="text-sm font-bold text-gray-900 capitalize">{alert.companyStatus}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      {alert.filingUrl && (
                        <a
                          href={alert.filingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View on Companies House
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert.acknowledged = true;
                          setExpandedAlert(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as Acknowledged
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Integration Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Real-Time Monitoring System</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              This automated monitoring system would integrate with Companies House Streaming API to receive instant notifications
              about any changes to your JV entities and portfolio companies. Alerts are automatically generated for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Filing deadlines & overdue accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Strike-off & dissolution notices</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Insolvency proceedings</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Director & officer changes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Charges & mortgages registered</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Status & address changes</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Multi-channel notifications:</span> Email, Slack, and in-dashboard alerts ensure you never miss critical updates.
              </p>
              <a
                href="https://developer-specs.company-information.service.gov.uk/streaming-api/guides/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-700 hover:text-blue-800 underline inline-flex items-center gap-1"
              >
                Learn about Companies House Streaming API
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
