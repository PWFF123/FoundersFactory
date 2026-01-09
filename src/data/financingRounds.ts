export interface FundingRoundHistory {
  roundType: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Bridge';
  amount: number;
  valuation: number;
  date: string;
  leadInvestor?: string;
}

export interface FinancingRound {
  id: string;
  companyName: string;
  sector: string;
  source: 'Studio' | 'Accelerator';
  jvPartner?: 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia'; // JV partner associated with this company
  founders: {
    name: string;
    role: string;
  }[];

  // Latest Round Info
  latestRound: {
    roundType: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Bridge';
    amount: number;
    valuation: number;
    closeDate: string;
    leadInvestor?: string;
  };

  // Our Position
  ourEquityStake: number; // Current % ownership
  ourTotalInvestment: number; // Total invested across all rounds
  currentPositionValue: number; // Current valuation * our equity

  // Company Metrics
  keyMetrics: {
    revenue?: number;
    mrr?: number;
    users?: number;
    growthRate?: number;
  };

  // Funding History
  fundingHistory: FundingRoundHistory[];

  // Communication Tracking
  lastContactDate?: string; // Last time we received information from the company

  // Optional Notes
  notes?: string;
}

export const portfolioCompanies: FinancingRound[] = [
  {
    id: 'company-1',
    companyName: 'HealthTech Innovations',
    sector: 'HealthTech',
    source: 'Studio',
    jvPartner: 'Aviva',
    founders: [
      { name: 'Sarah Chen', role: 'CEO' },
      { name: 'Dr. James Wilson', role: 'CTO' },
    ],
    latestRound: {
      roundType: 'Series A',
      amount: 3000000,
      valuation: 15000000,
      closeDate: '2024-11-15',
      leadInvestor: 'Aviva Ventures',
    },
    ourEquityStake: 16.7,
    ourTotalInvestment: 500000,
    currentPositionValue: 2505000,
    keyMetrics: {
      revenue: 450000,
      mrr: 45000,
      users: 1200,
      growthRate: 25,
    },
    fundingHistory: [
      {
        roundType: 'Pre-Seed',
        amount: 500000,
        valuation: 2500000,
        date: '2023-03-15',
        leadInvestor: 'Founders Factory',
      },
      {
        roundType: 'Seed',
        amount: 1500000,
        valuation: 8000000,
        date: '2023-10-20',
        leadInvestor: 'Aviva Ventures',
      },
      {
        roundType: 'Series A',
        amount: 3000000,
        valuation: 15000000,
        date: '2024-11-15',
        leadInvestor: 'Aviva Ventures',
      },
    ],
    lastContactDate: '2024-12-15',
    notes: 'Strong product-market fit. Signed 3 NHS trusts as customers.',
  },
  {
    id: 'company-2',
    companyName: 'IoT Platform',
    sector: 'IoT',
    source: 'Accelerator',
    jvPartner: 'Fastweb',
    founders: [
      { name: 'Marcus Thompson', role: 'CEO' },
      { name: 'Lisa Park', role: 'CPO' },
    ],
    latestRound: {
      roundType: 'Seed',
      amount: 1500000,
      valuation: 6000000,
      closeDate: '2024-12-20',
      leadInvestor: 'Fastweb Ventures',
    },
    ourEquityStake: 5.8,
    ourTotalInvestment: 100000,
    currentPositionValue: 348000,
    keyMetrics: {
      revenue: 540000,
      mrr: 45000,
      users: 850,
      growthRate: 52,
    },
    fundingHistory: [
      {
        roundType: 'Pre-Seed',
        amount: 250000,
        valuation: 1500000,
        date: '2024-04-10',
        leadInvestor: 'Founders Factory',
      },
      {
        roundType: 'Seed',
        amount: 1500000,
        valuation: 6000000,
        date: '2024-12-20',
        leadInvestor: 'Fastweb Ventures',
      },
    ],
    lastContactDate: '2024-12-18',
    notes: 'Graduated from FF Accelerator Batch 1. 52% MoM growth.',
  },
  {
    id: 'company-3',
    companyName: 'WealthManager AI',
    sector: 'WealthTech',
    source: 'Studio',
    jvPartner: 'Mediobanca',
    founders: [
      { name: 'Alessandro Rossi', role: 'CEO' },
      { name: 'Maria Bianchi', role: 'CTO' },
    ],
    latestRound: {
      roundType: 'Pre-Seed',
      amount: 600000,
      valuation: 2000000,
      closeDate: '2024-05-15',
      leadInvestor: 'Mediobanca Ventures',
    },
    ourEquityStake: 33.3,
    ourTotalInvestment: 600000,
    currentPositionValue: 666000,
    keyMetrics: {
      revenue: 144000,
      mrr: 12000,
      users: 450,
      growthRate: 18,
    },
    fundingHistory: [
      {
        roundType: 'Pre-Seed',
        amount: 600000,
        valuation: 2000000,
        date: '2024-05-15',
        leadInvestor: 'Mediobanca Ventures',
      },
    ],
    lastContactDate: '2024-05-20',
    notes: 'FCA regulatory approval in progress. Strategic partnership with Mediobanca.',
  },
  {
    id: 'company-4',
    companyName: 'InsureTech Pro',
    sector: 'InsurTech',
    source: 'Studio',
    jvPartner: 'Aviva',
    founders: [
      { name: 'Emma Watson', role: 'CEO' },
      { name: 'David Brown', role: 'CTO' },
      { name: 'Sophie Martin', role: 'COO' },
    ],
    latestRound: {
      roundType: 'Series A',
      amount: 5000000,
      valuation: 30000000,
      closeDate: '2024-10-30',
      leadInvestor: 'Insurtech Gateway',
    },
    ourEquityStake: 9.6,
    ourTotalInvestment: 750000,
    currentPositionValue: 2880000,
    keyMetrics: {
      revenue: 2160000,
      mrr: 180000,
      users: 3500,
      growthRate: 35,
    },
    fundingHistory: [
      {
        roundType: 'Pre-Seed',
        amount: 750000,
        valuation: 3000000,
        date: '2023-08-10',
        leadInvestor: 'Founders Factory',
      },
      {
        roundType: 'Seed',
        amount: 2000000,
        valuation: 12000000,
        date: '2024-03-20',
        leadInvestor: 'Aviva Ventures',
      },
      {
        roundType: 'Series A',
        amount: 5000000,
        valuation: 30000000,
        date: '2024-10-30',
        leadInvestor: 'Insurtech Gateway',
      },
    ],
    lastContactDate: '2024-11-05',
    notes: 'Strong unit economics. Expanded to Germany. Partnerships with 5 major carriers.',
  },
  {
    id: 'company-5',
    companyName: '5G ConnectPro',
    sector: '5G/Connectivity',
    source: 'Accelerator',
    jvPartner: 'Fastweb',
    founders: [
      { name: 'Rachel Green', role: 'CEO' },
      { name: 'Tom Anderson', role: 'CTO' },
    ],
    latestRound: {
      roundType: 'Pre-Seed',
      amount: 200000,
      valuation: 2500000,
      closeDate: '2024-12-01',
      leadInvestor: 'Fastweb Ventures',
    },
    ourEquityStake: 5.6,
    ourTotalInvestment: 100000,
    currentPositionValue: 140000,
    keyMetrics: {
      revenue: 96000,
      mrr: 8000,
      users: 250,
      growthRate: 35,
    },
    fundingHistory: [
      {
        roundType: 'Pre-Seed',
        amount: 200000,
        valuation: 2500000,
        date: '2024-12-01',
        leadInvestor: 'Fastweb Ventures',
      },
    ],
    lastContactDate: '2024-12-10',
    notes: 'Currently in Week 8 of FF Accelerator. Demo Day on Dec 20, 2024.',
  },
  {
    id: 'company-6',
    companyName: 'FinTech Alpha',
    sector: 'FinTech',
    source: 'Studio',
    jvPartner: 'Mediobanca',
    founders: [
      { name: 'Luca Ferrari', role: 'CEO' },
      { name: 'Giulia Romano', role: 'CFO' },
    ],
    latestRound: {
      roundType: 'Bridge',
      amount: 800000,
      valuation: 6000000,
      closeDate: '2024-09-15',
      leadInvestor: 'Mediobanca Ventures',
    },
    ourEquityStake: 14.9,
    ourTotalInvestment: 850000,
    currentPositionValue: 894000,
    keyMetrics: {
      revenue: 1140000,
      mrr: 95000,
      users: 2100,
      growthRate: 22,
    },
    fundingHistory: [
      {
        roundType: 'Pre-Seed',
        amount: 500000,
        valuation: 2500000,
        date: '2023-06-10',
        leadInvestor: 'Founders Factory',
      },
      {
        roundType: 'Seed',
        amount: 1500000,
        valuation: 7000000,
        date: '2024-02-15',
        leadInvestor: 'Mediobanca Ventures',
      },
      {
        roundType: 'Bridge',
        amount: 800000,
        valuation: 6000000,
        date: '2024-09-15',
        leadInvestor: 'Mediobanca Ventures',
      },
    ],
    lastContactDate: '2024-03-10',
    notes: 'Bridge round to extend runway for Series A. Regulatory approval achieved.',
  },
];

// For backwards compatibility
export const activeFinancingRounds = portfolioCompanies;
export const closedFinancingRounds: FinancingRound[] = [];
