export interface StudioDeal {
  id: string;
  companyName: string;
  sector: string;
  partner: string; // Which JV partner
  stage: 'Inception' | 'Build' | 'Scale' | 'Exit';
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  investmentAmount: number;
  currentValuation: number;
  keyMetrics: {
    revenue?: number;
    users?: number;
    mrr?: number;
  };
  milestones: {
    name: string;
    status: 'Completed' | 'In Progress' | 'Upcoming' | 'Blocked';
    dueDate: string;
    completedDate?: string;
  }[];
  team: {
    ceo: string;
    cto?: string;
    headCount: number;
  };
  nextSteps: string[];
}

export const activeStudioDeals: StudioDeal[] = [
  {
    id: 'studio-1',
    companyName: 'HealthTech Innovations',
    sector: 'HealthTech',
    partner: 'Aviva',
    stage: 'Build',
    status: 'On Track',
    startDate: '2024-03-15',
    expectedCompletion: '2025-09-30',
    investmentAmount: 500000,
    currentValuation: 2500000,
    keyMetrics: {
      revenue: 45000,
      users: 1200,
      mrr: 15000,
    },
    milestones: [
      {
        name: 'MVP Launch',
        status: 'Completed',
        dueDate: '2024-06-30',
        completedDate: '2024-06-28',
      },
      {
        name: 'First 1000 Users',
        status: 'Completed',
        dueDate: '2024-09-30',
        completedDate: '2024-10-15',
      },
      {
        name: 'Series A Preparation',
        status: 'In Progress',
        dueDate: '2025-03-31',
      },
      {
        name: 'Break-even',
        status: 'Upcoming',
        dueDate: '2025-06-30',
      },
    ],
    team: {
      ceo: 'Sarah Johnson',
      cto: 'Mike Chen',
      headCount: 8,
    },
    nextSteps: [
      'Complete product roadmap for Q1 2025',
      'Hire 2 additional engineers',
      'Prepare investor deck for Series A',
    ],
  },
  {
    id: 'studio-2',
    companyName: 'InsureTech Pro',
    sector: 'InsurTech',
    partner: 'Aviva',
    stage: 'Scale',
    status: 'On Track',
    startDate: '2023-08-01',
    expectedCompletion: '2025-12-31',
    investmentAmount: 750000,
    currentValuation: 6500000,
    keyMetrics: {
      revenue: 180000,
      users: 3500,
      mrr: 60000,
    },
    milestones: [
      {
        name: 'Beta Launch',
        status: 'Completed',
        dueDate: '2023-11-30',
        completedDate: '2023-11-20',
      },
      {
        name: 'Product-Market Fit',
        status: 'Completed',
        dueDate: '2024-03-31',
        completedDate: '2024-03-15',
      },
      {
        name: 'Series A Close',
        status: 'Completed',
        dueDate: '2024-08-31',
        completedDate: '2024-08-22',
      },
      {
        name: 'International Expansion',
        status: 'In Progress',
        dueDate: '2025-06-30',
      },
    ],
    team: {
      ceo: 'David Williams',
      cto: 'Anna Schmidt',
      headCount: 22,
    },
    nextSteps: [
      'Launch in Germany market',
      'Close partnership with 3 major insurers',
      'Hire VP of Sales',
    ],
  },
  {
    id: 'studio-3',
    companyName: 'WealthManager AI',
    sector: 'WealthTech',
    partner: 'Mediobanca',
    stage: 'Build',
    status: 'At Risk',
    startDate: '2024-05-01',
    expectedCompletion: '2025-11-30',
    investmentAmount: 600000,
    currentValuation: 1800000,
    keyMetrics: {
      revenue: 12000,
      users: 450,
      mrr: 4000,
    },
    milestones: [
      {
        name: 'Technical Architecture',
        status: 'Completed',
        dueDate: '2024-07-31',
        completedDate: '2024-08-10',
      },
      {
        name: 'MVP Development',
        status: 'In Progress',
        dueDate: '2024-11-30',
      },
      {
        name: 'Pilot Program',
        status: 'Blocked',
        dueDate: '2025-01-31',
      },
      {
        name: 'Commercial Launch',
        status: 'Upcoming',
        dueDate: '2025-04-30',
      },
    ],
    team: {
      ceo: 'Marco Rossi',
      cto: 'Lisa Zhang',
      headCount: 6,
    },
    nextSteps: [
      'Resolve technical blockers in AI model',
      'Secure regulatory approval',
      'Recruit 2 ML engineers',
    ],
  },
  {
    id: 'studio-4',
    companyName: 'PropTech Solutions',
    sector: 'PropTech',
    partner: 'Vonovia',
    stage: 'Inception',
    status: 'On Track',
    startDate: '2024-11-01',
    expectedCompletion: '2026-05-31',
    investmentAmount: 400000,
    currentValuation: 800000,
    keyMetrics: {
      users: 50,
    },
    milestones: [
      {
        name: 'Market Research',
        status: 'Completed',
        dueDate: '2024-12-15',
        completedDate: '2024-12-10',
      },
      {
        name: 'Team Formation',
        status: 'In Progress',
        dueDate: '2025-01-31',
      },
      {
        name: 'Product Spec',
        status: 'Upcoming',
        dueDate: '2025-03-31',
      },
      {
        name: 'MVP Development',
        status: 'Upcoming',
        dueDate: '2025-07-31',
      },
    ],
    team: {
      ceo: 'Thomas Mueller',
      headCount: 3,
    },
    nextSteps: [
      'Hire CTO',
      'Finalize product specifications',
      'Set up development infrastructure',
    ],
  },
  {
    id: 'studio-5',
    companyName: 'FinTech Alpha',
    sector: 'FinTech',
    partner: 'Mediobanca',
    stage: 'Scale',
    status: 'Delayed',
    startDate: '2023-06-01',
    expectedCompletion: '2025-06-30',
    investmentAmount: 850000,
    currentValuation: 5200000,
    keyMetrics: {
      revenue: 95000,
      users: 2100,
      mrr: 32000,
    },
    milestones: [
      {
        name: 'MVP Launch',
        status: 'Completed',
        dueDate: '2023-10-31',
        completedDate: '2023-11-15',
      },
      {
        name: 'Regulatory Approval',
        status: 'Completed',
        dueDate: '2024-02-28',
        completedDate: '2024-04-10',
      },
      {
        name: 'Series A',
        status: 'In Progress',
        dueDate: '2024-10-31',
      },
      {
        name: 'Profitability',
        status: 'Upcoming',
        dueDate: '2025-06-30',
      },
    ],
    team: {
      ceo: 'Emma Thompson',
      cto: 'Raj Patel',
      headCount: 15,
    },
    nextSteps: [
      'Complete Series A fundraising (delayed)',
      'Optimize unit economics',
      'Launch new product features',
    ],
  },
];

export const completedStudioDeals: StudioDeal[] = [
  {
    id: 'studio-comp-1',
    companyName: 'PaymentFlow',
    sector: 'FinTech',
    partner: 'Aviva',
    stage: 'Exit',
    status: 'Completed',
    startDate: '2022-03-01',
    expectedCompletion: '2024-03-31',
    actualCompletion: '2024-02-15',
    investmentAmount: 650000,
    currentValuation: 8500000,
    keyMetrics: {
      revenue: 420000,
      users: 12000,
      mrr: 140000,
    },
    milestones: [
      {
        name: 'MVP Launch',
        status: 'Completed',
        dueDate: '2022-07-31',
        completedDate: '2022-07-20',
      },
      {
        name: 'Series A',
        status: 'Completed',
        dueDate: '2023-06-30',
        completedDate: '2023-05-15',
      },
      {
        name: 'Acquisition',
        status: 'Completed',
        dueDate: '2024-03-31',
        completedDate: '2024-02-15',
      },
    ],
    team: {
      ceo: 'James Brown',
      cto: 'Sofia Garcia',
      headCount: 28,
    },
    nextSteps: [],
  },
  {
    id: 'studio-comp-2',
    companyName: 'SmartProperty',
    sector: 'PropTech',
    partner: 'Vonovia',
    stage: 'Exit',
    status: 'Completed',
    startDate: '2021-09-01',
    expectedCompletion: '2023-12-31',
    actualCompletion: '2023-11-30',
    investmentAmount: 500000,
    currentValuation: 4200000,
    keyMetrics: {
      revenue: 280000,
      users: 5500,
      mrr: 93000,
    },
    milestones: [
      {
        name: 'MVP Launch',
        status: 'Completed',
        dueDate: '2022-01-31',
        completedDate: '2022-01-28',
      },
      {
        name: 'Break-even',
        status: 'Completed',
        dueDate: '2023-06-30',
        completedDate: '2023-05-20',
      },
      {
        name: 'Strategic Exit',
        status: 'Completed',
        dueDate: '2023-12-31',
        completedDate: '2023-11-30',
      },
    ],
    team: {
      ceo: 'Klaus Werner',
      cto: 'Yuki Tanaka',
      headCount: 18,
    },
    nextSteps: [],
  },
];
