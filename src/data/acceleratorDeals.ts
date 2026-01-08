export interface AcceleratorDeal {
  id: string;
  companyName: string;
  sector: string;
  partner: string;
  batch: string;
  stage: 'Application' | 'Due Diligence' | 'Active Program' | 'Post-Program' | 'Follow-on' | 'Exited';
  status: 'On Track' | 'At Risk' | 'Graduated' | 'Pivoted' | 'Closed';
  cohortStartDate: string;
  cohortEndDate: string;
  investmentAmount: number;
  equityStake: number;
  currentValuation: number;
  initialValuation: number; // Valuation at investment
  pricePerShare: number; // Current price per share
  sharesOwned: number; // Number of shares we own
  keyMetrics: {
    revenue?: number;
    users?: number;
    mrr?: number;
    growth?: number; // Month-over-month %
  };
  valuationHistory: {
    date: string;
    valuation: number;
    event: string; // e.g., "Initial Investment", "Post-Program", "Seed Round"
  }[];
  fundraisingRounds?: {
    roundName: string;
    date: string;
    amountRaised: number;
    valuation: number;
    leadInvestor?: string;
  }[];
  programWeek?: number; // Current week in 12-week program
  weeklyProgress: {
    week: number;
    milestone: string;
    status: 'Completed' | 'In Progress' | 'Upcoming';
    notes?: string;
  }[];
  founders: {
    name: string;
    role: string;
  }[];
  followOnPotential: 'High' | 'Medium' | 'Low' | 'None';
  demoDay?: string;
}

export const activeAcceleratorDeals: AcceleratorDeal[] = [
  {
    id: 'accel-1',
    companyName: '5G ConnectPro',
    sector: '5G/Connectivity',
    partner: 'Fastweb',
    batch: 'Batch 2 - Q4 2024',
    stage: 'Active Program',
    status: 'On Track',
    cohortStartDate: '2024-10-01',
    cohortEndDate: '2024-12-20',
    investmentAmount: 100000,
    equityStake: 7,
    currentValuation: 1400000,
    initialValuation: 1000000,
    pricePerShare: 1.40,
    sharesOwned: 70000,
    keyMetrics: {
      revenue: 8000,
      users: 250,
      mrr: 8000,
      growth: 35,
    },
    valuationHistory: [
      { date: '2024-10-01', valuation: 1000000, event: 'Initial Investment' },
      { date: '2024-11-01', valuation: 1150000, event: 'Week 4 Milestone' },
      { date: '2024-12-01', valuation: 1400000, event: 'Week 8 Progress' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2024-10-01', amountRaised: 200000, valuation: 1000000, leadInvestor: 'Founders Factory' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Completed' },
      { week: 2, milestone: 'Customer interviews', status: 'Completed' },
      { week: 3, milestone: 'MVP scoping', status: 'Completed' },
      { week: 4, milestone: 'Technical architecture', status: 'Completed' },
      { week: 5, milestone: 'First pilot customer', status: 'Completed', notes: 'Secured 2 pilots' },
      { week: 6, milestone: 'Product iteration', status: 'Completed' },
      { week: 7, milestone: 'Pricing model', status: 'Completed' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'In Progress' },
      { week: 9, milestone: 'Fundraising prep', status: 'Upcoming' },
      { week: 10, milestone: 'Pitch practice', status: 'Upcoming' },
      { week: 11, milestone: 'Demo Day prep', status: 'Upcoming' },
      { week: 12, milestone: 'Demo Day', status: 'Upcoming' },
    ],
    founders: [
      { name: 'Roberto Bianchi', role: 'CEO' },
      { name: 'Laura Conti', role: 'CTO' },
    ],
    followOnPotential: 'High',
    demoDay: '2024-12-20',
  },
  {
    id: 'accel-2',
    companyName: 'EdgeAI Systems',
    sector: 'Edge Computing',
    partner: 'Fastweb',
    batch: 'Batch 2 - Q4 2024',
    stage: 'Active Program',
    status: 'On Track',
    cohortStartDate: '2024-10-01',
    cohortEndDate: '2024-12-20',
    investmentAmount: 100000,
    equityStake: 8,
    currentValuation: 1250000,
    initialValuation: 1000000,
    pricePerShare: 1.25,
    sharesOwned: 80000,
    keyMetrics: {
      revenue: 5000,
      users: 120,
      mrr: 5000,
      growth: 28,
    },
    valuationHistory: [
      { date: '2024-10-01', valuation: 1000000, event: 'Initial Investment' },
      { date: '2024-11-01', valuation: 1100000, event: 'Week 4 Milestone' },
      { date: '2024-12-01', valuation: 1250000, event: 'Week 8 Progress' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2024-10-01', amountRaised: 180000, valuation: 1000000, leadInvestor: 'Founders Factory' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Completed' },
      { week: 2, milestone: 'Customer interviews', status: 'Completed' },
      { week: 3, milestone: 'MVP scoping', status: 'Completed' },
      { week: 4, milestone: 'Technical architecture', status: 'Completed' },
      { week: 5, milestone: 'First pilot customer', status: 'Completed' },
      { week: 6, milestone: 'Product iteration', status: 'Completed' },
      { week: 7, milestone: 'Pricing model', status: 'Completed' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'In Progress' },
      { week: 9, milestone: 'Fundraising prep', status: 'Upcoming' },
      { week: 10, milestone: 'Pitch practice', status: 'Upcoming' },
      { week: 11, milestone: 'Demo Day prep', status: 'Upcoming' },
      { week: 12, milestone: 'Demo Day', status: 'Upcoming' },
    ],
    founders: [
      { name: 'Alessandro Rossi', role: 'CEO' },
      { name: 'Francesca Marino', role: 'CPO' },
    ],
    followOnPotential: 'Medium',
    demoDay: '2024-12-20',
  },
  {
    id: 'accel-3',
    companyName: 'ClimateTech Ventures',
    sector: 'Climate Tech',
    partner: 'Pico',
    batch: 'Batch 3 - Q1 2025',
    stage: 'Due Diligence',
    status: 'On Track',
    cohortStartDate: '2025-01-15',
    cohortEndDate: '2025-04-10',
    investmentAmount: 125000,
    equityStake: 7.5,
    currentValuation: 1666667,
    initialValuation: 1666667,
    pricePerShare: 1.00,
    sharesOwned: 125000,
    keyMetrics: {
      users: 0,
    },
    valuationHistory: [
      { date: '2025-01-15', valuation: 1666667, event: 'Initial Investment' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2025-01-15', amountRaised: 250000, valuation: 1666667, leadInvestor: 'Founders Factory' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Upcoming' },
      { week: 2, milestone: 'Customer interviews', status: 'Upcoming' },
      { week: 3, milestone: 'MVP scoping', status: 'Upcoming' },
      { week: 4, milestone: 'Technical architecture', status: 'Upcoming' },
      { week: 5, milestone: 'First pilot customer', status: 'Upcoming' },
      { week: 6, milestone: 'Product iteration', status: 'Upcoming' },
      { week: 7, milestone: 'Pricing model', status: 'Upcoming' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'Upcoming' },
      { week: 9, milestone: 'Fundraising prep', status: 'Upcoming' },
      { week: 10, milestone: 'Pitch practice', status: 'Upcoming' },
      { week: 11, milestone: 'Demo Day prep', status: 'Upcoming' },
      { week: 12, milestone: 'Demo Day', status: 'Upcoming' },
    ],
    founders: [
      { name: 'Sarah Lee', role: 'CEO' },
      { name: 'Tom Anderson', role: 'CTO' },
    ],
    followOnPotential: 'High',
    demoDay: '2025-04-10',
  },
  {
    id: 'accel-4',
    companyName: 'MedTech Diagnostics',
    sector: 'HealthTech',
    partner: 'Pico',
    batch: 'Batch 3 - Q1 2025',
    stage: 'Application',
    status: 'On Track',
    cohortStartDate: '2025-01-15',
    cohortEndDate: '2025-04-10',
    investmentAmount: 125000,
    equityStake: 8,
    currentValuation: 1562500,
    initialValuation: 1562500,
    pricePerShare: 1.00,
    sharesOwned: 125000,
    keyMetrics: {},
    valuationHistory: [
      { date: '2025-01-15', valuation: 1562500, event: 'Initial Investment' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2025-01-15', amountRaised: 220000, valuation: 1562500, leadInvestor: 'Founders Factory' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Upcoming' },
      { week: 2, milestone: 'Customer interviews', status: 'Upcoming' },
      { week: 3, milestone: 'MVP scoping', status: 'Upcoming' },
      { week: 4, milestone: 'Technical architecture', status: 'Upcoming' },
      { week: 5, milestone: 'First pilot customer', status: 'Upcoming' },
      { week: 6, milestone: 'Product iteration', status: 'Upcoming' },
      { week: 7, milestone: 'Pricing model', status: 'Upcoming' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'Upcoming' },
      { week: 9, milestone: 'Fundraising prep', status: 'Upcoming' },
      { week: 10, milestone: 'Pitch practice', status: 'Upcoming' },
      { week: 11, milestone: 'Demo Day prep', status: 'Upcoming' },
      { week: 12, milestone: 'Demo Day', status: 'Upcoming' },
    ],
    founders: [
      { name: 'Dr. Maya Patel', role: 'CEO' },
      { name: 'Kevin Wong', role: 'COO' },
    ],
    followOnPotential: 'Medium',
    demoDay: '2025-04-10',
  },
];

export const graduatedAcceleratorDeals: AcceleratorDeal[] = [
  {
    id: 'accel-grad-1',
    companyName: 'IoT Platform',
    sector: 'IoT',
    partner: 'Fastweb',
    batch: 'Batch 1 - Q2 2024',
    stage: 'Follow-on',
    status: 'Graduated',
    cohortStartDate: '2024-04-01',
    cohortEndDate: '2024-06-21',
    investmentAmount: 100000,
    equityStake: 7,
    currentValuation: 3500000,
    initialValuation: 1000000,
    pricePerShare: 3.50,
    sharesOwned: 70000,
    keyMetrics: {
      revenue: 45000,
      users: 850,
      mrr: 45000,
      growth: 52,
    },
    valuationHistory: [
      { date: '2024-04-01', valuation: 1000000, event: 'Initial Investment' },
      { date: '2024-06-21', valuation: 1800000, event: 'Demo Day' },
      { date: '2024-08-15', valuation: 3500000, event: 'Seed Round Close' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2024-04-01', amountRaised: 180000, valuation: 1000000, leadInvestor: 'Founders Factory' },
      { roundName: 'Seed', date: '2024-08-15', amountRaised: 1200000, valuation: 3500000, leadInvestor: 'Connect Ventures' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Completed' },
      { week: 2, milestone: 'Customer interviews', status: 'Completed' },
      { week: 3, milestone: 'MVP scoping', status: 'Completed' },
      { week: 4, milestone: 'Technical architecture', status: 'Completed' },
      { week: 5, milestone: 'First pilot customer', status: 'Completed' },
      { week: 6, milestone: 'Product iteration', status: 'Completed' },
      { week: 7, milestone: 'Pricing model', status: 'Completed' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'Completed' },
      { week: 9, milestone: 'Fundraising prep', status: 'Completed' },
      { week: 10, milestone: 'Pitch practice', status: 'Completed' },
      { week: 11, milestone: 'Demo Day prep', status: 'Completed' },
      { week: 12, milestone: 'Demo Day', status: 'Completed', notes: 'Raised £1.2M seed' },
    ],
    founders: [
      { name: 'Giovanni Ferrari', role: 'CEO' },
      { name: 'Elena Russo', role: 'CTO' },
    ],
    followOnPotential: 'High',
    demoDay: '2024-06-21',
  },
  {
    id: 'accel-grad-2',
    companyName: 'Network Optimizer',
    sector: '5G/Connectivity',
    partner: 'Fastweb',
    batch: 'Batch 1 - Q2 2024',
    stage: 'Post-Program',
    status: 'Graduated',
    cohortStartDate: '2024-04-01',
    cohortEndDate: '2024-06-21',
    investmentAmount: 100000,
    equityStake: 8,
    currentValuation: 2100000,
    initialValuation: 1000000,
    pricePerShare: 2.10,
    sharesOwned: 80000,
    keyMetrics: {
      revenue: 28000,
      users: 420,
      mrr: 28000,
      growth: 38,
    },
    valuationHistory: [
      { date: '2024-04-01', valuation: 1000000, event: 'Initial Investment' },
      { date: '2024-06-21', valuation: 1500000, event: 'Demo Day' },
      { date: '2024-09-01', valuation: 2100000, event: 'Post-Program Update' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2024-04-01', amountRaised: 180000, valuation: 1000000, leadInvestor: 'Founders Factory' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Completed' },
      { week: 2, milestone: 'Customer interviews', status: 'Completed' },
      { week: 3, milestone: 'MVP scoping', status: 'Completed' },
      { week: 4, milestone: 'Technical architecture', status: 'Completed' },
      { week: 5, milestone: 'First pilot customer', status: 'Completed' },
      { week: 6, milestone: 'Product iteration', status: 'Completed' },
      { week: 7, milestone: 'Pricing model', status: 'Completed' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'Completed' },
      { week: 9, milestone: 'Fundraising prep', status: 'Completed' },
      { week: 10, milestone: 'Pitch practice', status: 'Completed' },
      { week: 11, milestone: 'Demo Day prep', status: 'Completed' },
      { week: 12, milestone: 'Demo Day', status: 'Completed', notes: 'Bootstrapping' },
    ],
    founders: [
      { name: 'Marco Esposito', role: 'CEO' },
    ],
    followOnPotential: 'Low',
    demoDay: '2024-06-21',
  },
  {
    id: 'accel-grad-3',
    companyName: 'DataFlow Analytics',
    sector: 'Data/AI',
    partner: 'Pico',
    batch: 'Batch 2 - Q3 2024',
    stage: 'Exited',
    status: 'Closed',
    cohortStartDate: '2024-07-01',
    cohortEndDate: '2024-09-20',
    investmentAmount: 125000,
    equityStake: 7.5,
    currentValuation: 0,
    initialValuation: 1666667,
    pricePerShare: 0,
    sharesOwned: 125000,
    keyMetrics: {
      revenue: 0,
      users: 0,
    },
    valuationHistory: [
      { date: '2024-07-01', valuation: 1666667, event: 'Initial Investment' },
      { date: '2024-09-20', valuation: 0, event: 'Company Wound Down' },
    ],
    fundraisingRounds: [
      { roundName: 'Pre-Seed', date: '2024-07-01', amountRaised: 250000, valuation: 1666667, leadInvestor: 'Founders Factory' },
    ],
    weeklyProgress: [
      { week: 1, milestone: 'Problem validation', status: 'Completed' },
      { week: 2, milestone: 'Customer interviews', status: 'Completed' },
      { week: 3, milestone: 'MVP scoping', status: 'Completed' },
      { week: 4, milestone: 'Technical architecture', status: 'Completed' },
      { week: 5, milestone: 'First pilot customer', status: 'Completed' },
      { week: 6, milestone: 'Product iteration', status: 'Completed', notes: 'Pivoted' },
      { week: 7, milestone: 'Pricing model', status: 'Completed' },
      { week: 8, milestone: 'Go-to-market strategy', status: 'Completed' },
      { week: 9, milestone: 'Fundraising prep', status: 'Completed' },
      { week: 10, milestone: 'Pitch practice', status: 'Completed' },
      { week: 11, milestone: 'Demo Day prep', status: 'Completed' },
      { week: 12, milestone: 'Demo Day', status: 'Completed', notes: 'Company wound down post-program' },
    ],
    founders: [
      { name: 'Alex Martinez', role: 'CEO' },
    ],
    followOnPotential: 'None',
    demoDay: '2024-09-20',
  },
];
