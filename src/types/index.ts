export interface JointVenture {
  id: string;
  partnerName: string;
  shareholding: number; // percentage (0-100)
  investmentAmount: number;
  portfolioCompanies: number;
  portfolioValue: number;
  status: 'active' | 'inactive';
}

export interface Obligation {
  id: string;
  jvId: string;
  type: 'studio' | 'accelerator';
  target: number;
  current: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

export interface PortfolioCompany {
  id: string;
  name: string;
  jvId: string;
  sector: string;
  latestValuation: number;
  lastFundraisingDate: string;
  lastFundraisingAmount: number;
  equityStake: number; // percentage
  currentValue: number;
  valuationChange: number; // percentage change
}

export interface DashboardMetrics {
  totalJVs: number;
  totalPortfolioValue: number;
  totalInvestments: number;
  obligationsOnTrack: number;
  obligationsTotal: number;
}
