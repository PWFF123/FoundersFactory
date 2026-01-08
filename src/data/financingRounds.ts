export interface FinancingRound {
  id: string;
  companyName: string;
  sector: string;
  source: 'Studio' | 'Accelerator';
  roundType: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Bridge';
  roundStatus: 'Planning' | 'Active' | 'Due Diligence' | 'Term Sheet' | 'Closing' | 'Closed';
  targetRaise: number;
  raisedToDate: number;
  preMoneyValuation: number;
  postMoneyValuation: number;
  ourEquityPre: number; // % before this round
  ourEquityPost: number; // % after this round (with dilution)
  ourInvestmentToDate: number;
  leadInvestor?: string;
  expectedClose: string;
  actualClose?: string;
  keyMetrics: {
    revenue?: number;
    mrr?: number;
    users?: number;
    growthRate?: number;
  };
  investors: {
    name: string;
    amount?: number;
    status: 'Committed' | 'In Discussion' | 'Passed';
  }[];
  milestones: string[];
  risks: string[];
  nextSteps: string[];
}

export const activeFinancingRounds: FinancingRound[] = [
  {
    id: 'round-1',
    companyName: 'HealthTech Innovations',
    sector: 'HealthTech',
    source: 'Studio',
    roundType: 'Series A',
    roundStatus: 'Active',
    targetRaise: 3000000,
    raisedToDate: 1800000,
    preMoneyValuation: 12000000,
    postMoneyValuation: 15000000,
    ourEquityPre: 20,
    ourEquityPost: 16.7,
    ourInvestmentToDate: 500000,
    leadInvestor: 'Aviva Ventures',
    expectedClose: '2025-03-31',
    keyMetrics: {
      revenue: 450000,
      mrr: 45000,
      users: 1200,
      growthRate: 25,
    },
    investors: [
      { name: 'Aviva Ventures', amount: 1500000, status: 'Committed' },
      { name: 'HealthTech Capital', amount: 800000, status: 'Committed' },
      { name: 'Index Ventures', status: 'In Discussion' },
      { name: 'LocalGlobe', status: 'In Discussion' },
    ],
    milestones: [
      'Product-market fit achieved',
      '£45K MRR with 25% MoM growth',
      'Signed 3 NHS trusts as customers',
      'Team scaled to 12 people',
    ],
    risks: [
      'Regulatory approval timeline uncertainty',
      'Key hire for VP Sales still open',
    ],
    nextSteps: [
      'Close remaining £500K by end of Q1',
      'Finalize terms with Index Ventures',
      'Complete legal documentation',
    ],
  },
  {
    id: 'round-2',
    companyName: 'IoT Platform',
    sector: 'IoT',
    source: 'Accelerator',
    roundType: 'Seed',
    roundStatus: 'Term Sheet',
    targetRaise: 1500000,
    raisedToDate: 1500000,
    preMoneyValuation: 4500000,
    postMoneyValuation: 6000000,
    ourEquityPre: 7,
    ourEquityPost: 5.8,
    ourInvestmentToDate: 100000,
    leadInvestor: 'Fastweb Ventures',
    expectedClose: '2025-02-15',
    keyMetrics: {
      revenue: 540000,
      mrr: 45000,
      users: 850,
      growthRate: 52,
    },
    investors: [
      { name: 'Fastweb Ventures', amount: 1000000, status: 'Committed' },
      { name: 'Connect Ventures', amount: 500000, status: 'Committed' },
      { name: 'Speedinvest', status: 'Passed' },
    ],
    milestones: [
      'Graduated from FF Accelerator Batch 1',
      '52% month-over-month growth',
      'Expanded to 3 European markets',
      'Secured major partnership with Fastweb',
    ],
    risks: [
      'Competitive market with large incumbents',
    ],
    nextSteps: [
      'Sign term sheet',
      'Complete due diligence',
      'Close round by mid-February',
    ],
  },
  {
    id: 'round-3',
    companyName: 'WealthManager AI',
    sector: 'WealthTech',
    source: 'Studio',
    roundType: 'Seed',
    roundStatus: 'Planning',
    targetRaise: 2000000,
    raisedToDate: 0,
    preMoneyValuation: 6000000,
    postMoneyValuation: 8000000,
    ourEquityPre: 33.3,
    ourEquityPost: 25,
    ourInvestmentToDate: 600000,
    expectedClose: '2025-06-30',
    keyMetrics: {
      revenue: 144000,
      mrr: 12000,
      users: 450,
      growthRate: 18,
    },
    investors: [
      { name: 'Mediobanca Ventures', status: 'In Discussion' },
      { name: 'Episode 1', status: 'In Discussion' },
      { name: 'Backed VC', status: 'In Discussion' },
    ],
    milestones: [
      'MVP launched with 450+ users',
      'Strategic partnership with Mediobanca',
      'FCA regulatory approval in progress',
    ],
    risks: [
      'Technical blockers in AI model training',
      'Regulatory approval delayed',
      'Lower growth rate than target',
    ],
    nextSteps: [
      'Resolve AI model technical issues',
      'Secure FCA approval',
      'Improve growth metrics before roadshow',
      'Prepare investor deck and data room',
    ],
  },
  {
    id: 'round-4',
    companyName: 'InsureTech Pro',
    sector: 'InsurTech',
    source: 'Studio',
    roundType: 'Series A',
    roundStatus: 'Due Diligence',
    targetRaise: 5000000,
    raisedToDate: 3500000,
    preMoneyValuation: 25000000,
    postMoneyValuation: 30000000,
    ourEquityPre: 11.5,
    ourEquityPost: 9.6,
    ourInvestmentToDate: 750000,
    leadInvestor: 'Insurtech Gateway',
    expectedClose: '2025-02-28',
    keyMetrics: {
      revenue: 2160000,
      mrr: 180000,
      users: 3500,
      growthRate: 35,
    },
    investors: [
      { name: 'Insurtech Gateway', amount: 3000000, status: 'Committed' },
      { name: 'Aviva Ventures', amount: 1500000, status: 'Committed' },
      { name: 'Balderton Capital', amount: 500000, status: 'In Discussion' },
    ],
    milestones: [
      'Achieved £180K MRR with strong unit economics',
      'Expanded to Germany market successfully',
      'Partnerships with 5 major insurance carriers',
      'Team scaled to 22 people',
    ],
    risks: [],
    nextSteps: [
      'Complete financial due diligence',
      'Finalize closing documents',
      'Close remaining £500K',
    ],
  },
  {
    id: 'round-5',
    companyName: '5G ConnectPro',
    sector: '5G/Connectivity',
    source: 'Accelerator',
    roundType: 'Pre-Seed',
    roundStatus: 'Active',
    targetRaise: 500000,
    raisedToDate: 200000,
    preMoneyValuation: 2000000,
    postMoneyValuation: 2500000,
    ourEquityPre: 7,
    ourEquityPost: 5.6,
    ourInvestmentToDate: 100000,
    leadInvestor: 'Fastweb Ventures',
    expectedClose: '2025-04-30',
    keyMetrics: {
      revenue: 96000,
      mrr: 8000,
      users: 250,
      growthRate: 35,
    },
    investors: [
      { name: 'Fastweb Ventures', amount: 200000, status: 'Committed' },
      { name: 'Connect Ventures', status: 'In Discussion' },
      { name: 'Seedcamp', status: 'In Discussion' },
    ],
    milestones: [
      'Currently in Week 8 of FF Accelerator',
      '35% month-over-month growth',
      'Secured 2 pilot customers',
    ],
    risks: [
      'Early stage - limited traction',
      'Competitive 5G market',
    ],
    nextSteps: [
      'Complete accelerator program',
      'Demo Day presentation on Dec 20',
      'Close remaining £300K post Demo Day',
    ],
  },
  {
    id: 'round-6',
    companyName: 'FinTech Alpha',
    sector: 'FinTech',
    source: 'Studio',
    roundType: 'Bridge',
    roundStatus: 'Closing',
    targetRaise: 800000,
    raisedToDate: 800000,
    preMoneyValuation: 5200000,
    postMoneyValuation: 6000000,
    ourEquityPre: 16.3,
    ourEquityPost: 14.9,
    ourInvestmentToDate: 850000,
    leadInvestor: 'Mediobanca Ventures',
    expectedClose: '2025-01-31',
    actualClose: '2025-01-15',
    keyMetrics: {
      revenue: 1140000,
      mrr: 95000,
      users: 2100,
      growthRate: 22,
    },
    investors: [
      { name: 'Mediobanca Ventures', amount: 500000, status: 'Committed' },
      { name: 'Existing Investors', amount: 300000, status: 'Committed' },
    ],
    milestones: [
      'Bridge round to extend runway for Series A',
      'Regulatory approval achieved',
      'Strong revenue metrics',
    ],
    risks: [
      'Delayed Series A timeline',
    ],
    nextSteps: [
      'Finalize legal closing',
      'Prepare for Series A in Q2 2025',
    ],
  },
];

export const closedFinancingRounds: FinancingRound[] = [
  {
    id: 'round-closed-1',
    companyName: 'PaymentFlow',
    sector: 'FinTech',
    source: 'Studio',
    roundType: 'Series A',
    roundStatus: 'Closed',
    targetRaise: 4500000,
    raisedToDate: 4500000,
    preMoneyValuation: 20000000,
    postMoneyValuation: 24500000,
    ourEquityPre: 13.3,
    ourEquityPost: 10.9,
    ourInvestmentToDate: 650000,
    leadInvestor: 'Fintech Ventures',
    expectedClose: '2023-06-30',
    actualClose: '2023-05-15',
    keyMetrics: {
      revenue: 5040000,
      mrr: 420000,
      users: 12000,
      growthRate: 45,
    },
    investors: [
      { name: 'Fintech Ventures', amount: 3000000, status: 'Committed' },
      { name: 'Aviva Ventures', amount: 1000000, status: 'Committed' },
      { name: 'Strategic Angels', amount: 500000, status: 'Committed' },
    ],
    milestones: [
      'Closed early at attractive valuation',
      'Strong revenue and growth metrics',
      'Subsequently acquired in Feb 2024',
    ],
    risks: [],
    nextSteps: [],
  },
  {
    id: 'round-closed-2',
    companyName: 'Network Optimizer',
    sector: '5G/Connectivity',
    source: 'Accelerator',
    roundType: 'Seed',
    roundStatus: 'Closed',
    targetRaise: 800000,
    raisedToDate: 800000,
    preMoneyValuation: 3200000,
    postMoneyValuation: 4000000,
    ourEquityPre: 8,
    ourEquityPost: 6.4,
    ourInvestmentToDate: 100000,
    leadInvestor: 'Connect Capital',
    expectedClose: '2024-08-31',
    actualClose: '2024-08-15',
    keyMetrics: {
      revenue: 336000,
      mrr: 28000,
      users: 420,
      growthRate: 38,
    },
    investors: [
      { name: 'Connect Capital', amount: 600000, status: 'Committed' },
      { name: 'Fastweb Ventures', amount: 200000, status: 'Committed' },
    ],
    milestones: [
      'Graduated from FF Accelerator Batch 1',
      'Chose to bootstrap after initial seed',
      'Strong organic growth',
    ],
    risks: [],
    nextSteps: [],
  },
];
