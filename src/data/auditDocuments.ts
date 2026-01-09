// Mock document repository - In production, this would integrate with Google Drive API
// Using Google Drive API: https://developers.google.com/drive/api/v3/reference

export interface LegalDocument {
  id: string;
  companyId: string; // Links to FinancingRound company ID
  documentType: 'FF Investment' | 'Priced Round' | 'Shareholder Agreement' | 'Articles' | 'Cap Table' | 'Other';
  title: string;
  description?: string;
  fileName: string;
  fileSize: number; // in bytes
  uploadDate: string;
  roundType?: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Bridge';
  uploadedBy?: string;
  // Google Drive integration fields (for production)
  driveFileId?: string; // Google Drive file ID
  driveUrl?: string; // Google Drive file URL
  mimeType?: string; // e.g., 'application/pdf'
}

// Mock legal documents for portfolio companies
export const legalDocuments: LegalDocument[] = [
  // HealthTech Innovations (company-1) - Series A
  {
    id: 'doc-1',
    companyId: 'company-1',
    documentType: 'FF Investment',
    title: 'Founders Factory Investment Agreement - Pre-Seed',
    description: 'Initial investment agreement for £500K pre-seed round',
    fileName: 'FF_HealthTech_PreSeed_Investment_Agreement_2023.pdf',
    fileSize: 2458624, // ~2.4MB
    uploadDate: '2023-03-20',
    roundType: 'Pre-Seed',
    uploadedBy: 'Legal Team',
    driveUrl: '#', // Mock URL
  },
  {
    id: 'doc-2',
    companyId: 'company-1',
    documentType: 'Priced Round',
    title: 'Series A Investment Agreement - Aviva Ventures',
    description: '£3M Series A round led by Aviva Ventures at £15M valuation',
    fileName: 'HealthTech_SeriesA_Investment_Agreement_2024.pdf',
    fileSize: 3845120, // ~3.8MB
    uploadDate: '2024-11-20',
    roundType: 'Series A',
    uploadedBy: 'Aviva Legal',
    driveUrl: '#',
  },
  {
    id: 'doc-3',
    companyId: 'company-1',
    documentType: 'Shareholder Agreement',
    title: 'Updated Shareholder Agreement - Post Series A',
    description: 'Amended shareholder agreement following Series A',
    fileName: 'HealthTech_Shareholder_Agreement_v2_2024.pdf',
    fileSize: 1945600, // ~1.9MB
    uploadDate: '2024-11-22',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },
  {
    id: 'doc-4',
    companyId: 'company-1',
    documentType: 'Cap Table',
    title: 'Capitalization Table - November 2024',
    description: 'Current cap table showing all shareholder positions',
    fileName: 'HealthTech_Cap_Table_Nov_2024.xlsx',
    fileSize: 524288, // ~512KB
    uploadDate: '2024-11-25',
    uploadedBy: 'Finance Team',
    driveUrl: '#',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },

  // IoT Platform (company-2) - Seed
  {
    id: 'doc-5',
    companyId: 'company-2',
    documentType: 'FF Investment',
    title: 'Founders Factory Investment Agreement - Pre-Seed',
    description: 'Accelerator investment agreement',
    fileName: 'FF_IoTPlatform_PreSeed_Investment_Agreement_2024.pdf',
    fileSize: 2145728, // ~2.1MB
    uploadDate: '2024-04-15',
    roundType: 'Pre-Seed',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },
  {
    id: 'doc-6',
    companyId: 'company-2',
    documentType: 'Priced Round',
    title: 'Seed Round Investment Agreement - Fastweb Ventures',
    description: '£1.5M seed round led by Fastweb Ventures',
    fileName: 'IoTPlatform_Seed_Investment_Agreement_2024.pdf',
    fileSize: 3245056, // ~3.2MB
    uploadDate: '2024-12-22',
    roundType: 'Seed',
    uploadedBy: 'Fastweb Legal',
    driveUrl: '#',
  },

  // WealthManager AI (company-3) - Pre-Seed only
  {
    id: 'doc-7',
    companyId: 'company-3',
    documentType: 'FF Investment',
    title: 'Founders Factory Investment Agreement - Pre-Seed',
    description: 'Studio venture investment agreement with Mediobanca',
    fileName: 'FF_WealthManager_PreSeed_Investment_Agreement_2024.pdf',
    fileSize: 2654208, // ~2.6MB
    uploadDate: '2024-05-20',
    roundType: 'Pre-Seed',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },
  {
    id: 'doc-8',
    companyId: 'company-3',
    documentType: 'Articles',
    title: 'Articles of Association',
    description: 'Company articles of association (UK incorporation)',
    fileName: 'WealthManager_Articles_of_Association_2024.pdf',
    fileSize: 845824, // ~846KB
    uploadDate: '2024-05-18',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },
  {
    id: 'doc-9',
    companyId: 'company-3',
    documentType: 'Other',
    title: 'FCA Application Documents',
    description: 'Supporting documents for FCA regulatory approval',
    fileName: 'WealthManager_FCA_Application_Bundle_2024.pdf',
    fileSize: 5242880, // ~5MB
    uploadDate: '2024-06-10',
    uploadedBy: 'Compliance Team',
    driveUrl: '#',
  },

  // InsureTech Pro (company-4) - Series A
  {
    id: 'doc-10',
    companyId: 'company-4',
    documentType: 'FF Investment',
    title: 'Founders Factory Investment Agreement - Pre-Seed',
    description: 'Initial studio investment',
    fileName: 'FF_InsureTech_PreSeed_Investment_Agreement_2023.pdf',
    fileSize: 2358272, // ~2.3MB
    uploadDate: '2023-08-15',
    roundType: 'Pre-Seed',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },
  {
    id: 'doc-11',
    companyId: 'company-4',
    documentType: 'Priced Round',
    title: 'Seed Round Investment Agreement - Aviva Ventures',
    description: '£2M seed round',
    fileName: 'InsureTech_Seed_Investment_Agreement_2024.pdf',
    fileSize: 3145728, // ~3MB
    uploadDate: '2024-03-25',
    roundType: 'Seed',
    uploadedBy: 'Aviva Legal',
    driveUrl: '#',
  },
  {
    id: 'doc-12',
    companyId: 'company-4',
    documentType: 'Priced Round',
    title: 'Series A Investment Agreement - Insurtech Gateway',
    description: '£5M Series A at £30M valuation',
    fileName: 'InsureTech_SeriesA_Investment_Agreement_2024.pdf',
    fileSize: 4194304, // ~4MB
    uploadDate: '2024-11-05',
    roundType: 'Series A',
    uploadedBy: 'Insurtech Gateway Legal',
    driveUrl: '#',
  },
  {
    id: 'doc-13',
    companyId: 'company-4',
    documentType: 'Cap Table',
    title: 'Capitalization Table - Post Series A',
    description: 'Updated cap table with all investor positions',
    fileName: 'InsureTech_Cap_Table_Nov_2024.xlsx',
    fileSize: 614400, // ~600KB
    uploadDate: '2024-11-08',
    uploadedBy: 'Finance Team',
    driveUrl: '#',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },

  // 5G ConnectPro (company-5) - Pre-Seed only
  {
    id: 'doc-14',
    companyId: 'company-5',
    documentType: 'FF Investment',
    title: 'Founders Factory Investment Agreement - Pre-Seed',
    description: 'Accelerator investment agreement',
    fileName: 'FF_5GConnect_PreSeed_Investment_Agreement_2024.pdf',
    fileSize: 2048000, // ~2MB
    uploadDate: '2024-12-05',
    roundType: 'Pre-Seed',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },

  // FinTech Alpha (company-6) - Bridge round
  {
    id: 'doc-15',
    companyId: 'company-6',
    documentType: 'FF Investment',
    title: 'Founders Factory Investment Agreement - Pre-Seed',
    description: 'Initial studio investment with Mediobanca',
    fileName: 'FF_FinTech_PreSeed_Investment_Agreement_2023.pdf',
    fileSize: 2456576, // ~2.4MB
    uploadDate: '2023-06-15',
    roundType: 'Pre-Seed',
    uploadedBy: 'Legal Team',
    driveUrl: '#',
  },
  {
    id: 'doc-16',
    companyId: 'company-6',
    documentType: 'Priced Round',
    title: 'Seed Round Investment Agreement - Mediobanca Ventures',
    description: '£1.5M seed round',
    fileName: 'FinTech_Seed_Investment_Agreement_2024.pdf',
    fileSize: 3048576, // ~3MB
    uploadDate: '2024-02-20',
    roundType: 'Seed',
    uploadedBy: 'Mediobanca Legal',
    driveUrl: '#',
  },
  {
    id: 'doc-17',
    companyId: 'company-6',
    documentType: 'Priced Round',
    title: 'Bridge Round Convertible Note Agreement',
    description: '£800K bridge financing',
    fileName: 'FinTech_Bridge_Convertible_Note_2024.pdf',
    fileSize: 1845248, // ~1.8MB
    uploadDate: '2024-09-18',
    roundType: 'Bridge',
    uploadedBy: 'Mediobanca Legal',
    driveUrl: '#',
  },
];

// Helper function to get documents for a specific company
export const getDocumentsByCompanyId = (companyId: string): LegalDocument[] => {
  return legalDocuments
    .filter(doc => doc.companyId === companyId)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
};

// Helper function to get documents by type
export const getDocumentsByType = (documentType: LegalDocument['documentType']): LegalDocument[] => {
  return legalDocuments
    .filter(doc => doc.documentType === documentType)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
};

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed(1)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${bytes} bytes`;
};

// Helper function to get document icon based on file type
export const getDocumentIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'xlsx':
    case 'xls':
      return '📊';
    case 'docx':
    case 'doc':
      return '📝';
    default:
      return '📎';
  }
};
