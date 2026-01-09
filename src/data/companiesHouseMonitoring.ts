// Companies House Monitoring System
// This would integrate with Companies House Streaming API and webhooks in production

export interface CompaniesHouseAlert {
  id: string;
  companyNumber: string;
  companyName: string;
  alertType: 'filing-overdue' | 'filing-reminder' | 'accounts-filed' | 'confirmation-filed' |
             'director-change' | 'address-change' | 'share-capital-change' | 'charge-registered' |
             'strike-off-notice' | 'dissolution' | 'insolvency' | 'gazette-notice';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  detectedDate: string;
  actionRequired: boolean;
  actionDeadline?: string;
  relatedEntity: 'jv' | 'portfolio';
  jvPartner?: 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia' | 'Pico';
  companyStatus?: 'active' | 'dissolved' | 'liquidation' | 'administration' | 'receivership';
  filingUrl?: string;
  acknowledged: boolean;
}

export interface CompaniesHouseWebhookEvent {
  eventType: 'filing-history-updated' | 'company-profile-updated' | 'charges-updated' | 'officers-updated';
  companyNumber: string;
  timestamp: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

// Mock alerts - In production, these would come from Companies House API webhooks
export const companiesHouseAlerts: CompaniesHouseAlert[] = [
  {
    id: 'alert-001',
    companyNumber: '10234567',
    companyName: 'Founders Factory Aviva Limited',
    alertType: 'filing-reminder',
    severity: 'high',
    title: 'Annual Accounts Due in 30 Days',
    description: 'Annual accounts for period ending 31 Dec 2024 are due on 30 Sep 2025. Filing deadline approaching.',
    detectedDate: '2025-01-09',
    actionRequired: true,
    actionDeadline: '2025-09-30',
    relatedEntity: 'jv',
    jvPartner: 'Aviva',
    companyStatus: 'active',
    acknowledged: false,
  },
  {
    id: 'alert-002',
    companyNumber: '12345678',
    companyName: 'TechCo Solutions Ltd',
    alertType: 'strike-off-notice',
    severity: 'critical',
    title: 'Strike-Off Notice Issued',
    description: 'Companies House has issued a first Gazette notice for strike off. Company will be dissolved unless action is taken within 2 months.',
    detectedDate: '2025-01-08',
    actionRequired: true,
    actionDeadline: '2025-03-08',
    relatedEntity: 'portfolio',
    jvPartner: 'Aviva',
    companyStatus: 'active',
    filingUrl: 'https://find-and-update.company-information.service.gov.uk/company/12345678',
    acknowledged: false,
  },
  {
    id: 'alert-003',
    companyNumber: '11456789',
    companyName: 'Founders Factory Fastweb Limited',
    alertType: 'confirmation-filed',
    severity: 'low',
    title: 'Confirmation Statement Filed',
    description: 'Confirmation statement made up to 10 Jun 2024 has been successfully filed with Companies House.',
    detectedDate: '2025-01-07',
    actionRequired: false,
    relatedEntity: 'jv',
    jvPartner: 'Fastweb',
    companyStatus: 'active',
    acknowledged: false,
  },
  {
    id: 'alert-004',
    companyNumber: '98765432',
    companyName: 'GreenTech Innovations Ltd',
    alertType: 'filing-overdue',
    severity: 'critical',
    title: 'Annual Accounts Overdue',
    description: 'Annual accounts for period ending 31 Mar 2024 are now OVERDUE. Company may face penalties and potential strike-off action.',
    detectedDate: '2025-01-06',
    actionRequired: true,
    actionDeadline: '2024-12-31',
    relatedEntity: 'portfolio',
    jvPartner: 'Mediobanca',
    companyStatus: 'active',
    acknowledged: false,
  },
  {
    id: 'alert-005',
    companyNumber: '10345678',
    companyName: 'Founders Factory Mediobanca Limited',
    alertType: 'director-change',
    severity: 'medium',
    title: 'Director Appointment',
    description: 'New director appointed: Sarah Thompson. Effective date: 05 Jan 2025.',
    detectedDate: '2025-01-05',
    actionRequired: false,
    relatedEntity: 'jv',
    jvPartner: 'Mediobanca',
    companyStatus: 'active',
    acknowledged: false,
  },
  {
    id: 'alert-006',
    companyNumber: '87654321',
    companyName: 'DataFlow Systems Ltd',
    alertType: 'insolvency',
    severity: 'critical',
    title: 'Insolvency Proceedings Initiated',
    description: 'Company has entered administration. Administrator appointed: ABC Insolvency LLP.',
    detectedDate: '2025-01-04',
    actionRequired: true,
    relatedEntity: 'portfolio',
    jvPartner: 'Vonovia',
    companyStatus: 'administration',
    acknowledged: false,
  },
  {
    id: 'alert-007',
    companyNumber: '11567890',
    companyName: 'Founders Factory Vonovia Limited',
    alertType: 'accounts-filed',
    severity: 'low',
    title: 'Annual Accounts Filed',
    description: 'Annual accounts for period ending 30 Sep 2024 have been successfully filed with Companies House.',
    detectedDate: '2025-01-03',
    actionRequired: false,
    relatedEntity: 'jv',
    jvPartner: 'Vonovia',
    companyStatus: 'active',
    acknowledged: false,
  },
  {
    id: 'alert-008',
    companyNumber: '76543210',
    companyName: 'FinServe Solutions Ltd',
    alertType: 'gazette-notice',
    severity: 'critical',
    title: 'Gazette Notice - Compulsory Strike Off',
    description: 'Second Gazette notice published. Company will be struck off and dissolved in 3 months unless cause is shown.',
    detectedDate: '2025-01-02',
    actionRequired: true,
    actionDeadline: '2025-04-02',
    relatedEntity: 'portfolio',
    jvPartner: 'Aviva',
    companyStatus: 'active',
    acknowledged: false,
  },
];

export function getAlertsByCompanyNumber(companyNumber: string): CompaniesHouseAlert[] {
  return companiesHouseAlerts.filter(alert => alert.companyNumber === companyNumber);
}

export function getAlertsByEntity(entityType: 'jv' | 'portfolio'): CompaniesHouseAlert[] {
  return companiesHouseAlerts.filter(alert => alert.relatedEntity === entityType);
}

export function getAlertsBySeverity(severity: 'critical' | 'high' | 'medium' | 'low'): CompaniesHouseAlert[] {
  return companiesHouseAlerts.filter(alert => alert.severity === severity);
}

export function getUnacknowledgedAlerts(): CompaniesHouseAlert[] {
  return companiesHouseAlerts.filter(alert => !alert.acknowledged);
}

export function getActionRequiredAlerts(): CompaniesHouseAlert[] {
  return companiesHouseAlerts.filter(alert => alert.actionRequired && !alert.acknowledged);
}

export function getAlertsByJVPartner(partner: 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia' | 'Pico'): CompaniesHouseAlert[] {
  return companiesHouseAlerts.filter(alert => alert.jvPartner === partner);
}

// Webhook handler simulation - In production, this would be an API endpoint
export function handleCompaniesHouseWebhook(event: CompaniesHouseWebhookEvent): CompaniesHouseAlert | null {
  // Process webhook event and create alert if needed
  console.log('Processing Companies House webhook:', event);

  // Example: Detect critical changes
  if (event.eventType === 'company-profile-updated') {
    const statusChange = event.changes.find(c => c.field === 'company_status');
    if (statusChange && ['dissolved', 'liquidation', 'administration'].includes(statusChange.newValue)) {
      // Create critical alert
      return {
        id: `alert-${Date.now()}`,
        companyNumber: event.companyNumber,
        companyName: 'Company Name', // Would fetch from API
        alertType: 'insolvency',
        severity: 'critical',
        title: `Company Status Changed to ${statusChange.newValue}`,
        description: `Company status has changed from ${statusChange.oldValue} to ${statusChange.newValue}`,
        detectedDate: event.timestamp,
        actionRequired: true,
        relatedEntity: 'portfolio',
        companyStatus: statusChange.newValue as any,
        acknowledged: false,
      };
    }
  }

  return null;
}

// Auto-monitoring configuration
export interface MonitoringConfig {
  enabled: boolean;
  checkInterval: 'hourly' | 'daily' | 'weekly';
  monitoredCompanies: {
    companyNumber: string;
    companyName: string;
    entityType: 'jv' | 'portfolio';
    alertOn: ('filings' | 'status-changes' | 'officer-changes' | 'charges' | 'strike-off')[];
  }[];
  notificationChannels: {
    email: { enabled: boolean; recipients: string[] };
    slack: { enabled: boolean; webhookUrl?: string };
    dashboard: { enabled: boolean };
  };
}

export const defaultMonitoringConfig: MonitoringConfig = {
  enabled: true,
  checkInterval: 'daily',
  monitoredCompanies: [
    {
      companyNumber: '10234567',
      companyName: 'Founders Factory Aviva Limited',
      entityType: 'jv',
      alertOn: ['filings', 'status-changes', 'officer-changes', 'charges', 'strike-off'],
    },
    {
      companyNumber: '10345678',
      companyName: 'Founders Factory Mediobanca Limited',
      entityType: 'jv',
      alertOn: ['filings', 'status-changes', 'officer-changes', 'charges', 'strike-off'],
    },
    {
      companyNumber: '11456789',
      companyName: 'Founders Factory Fastweb Limited',
      entityType: 'jv',
      alertOn: ['filings', 'status-changes', 'officer-changes', 'charges', 'strike-off'],
    },
    {
      companyNumber: '11567890',
      companyName: 'Founders Factory Vonovia Limited',
      entityType: 'jv',
      alertOn: ['filings', 'status-changes', 'officer-changes', 'charges', 'strike-off'],
    },
    {
      companyNumber: '09876543',
      companyName: 'Founders Factory Pico Limited',
      entityType: 'jv',
      alertOn: ['filings', 'status-changes', 'officer-changes', 'charges', 'strike-off'],
    },
  ],
  notificationChannels: {
    email: {
      enabled: true,
      recipients: ['partnerships@foundersfactory.com', 'legal@foundersfactory.com']
    },
    slack: {
      enabled: true,
      webhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'
    },
    dashboard: {
      enabled: true
    },
  },
};
