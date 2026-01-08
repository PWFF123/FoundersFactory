import { useState } from 'react';
import { portfolioCompanies } from '../data/financingRounds';
import { legalDocuments, getDocumentsByCompanyId, formatFileSize, getDocumentIcon } from '../data/auditDocuments';
import type { LegalDocument } from '../data/auditDocuments';

export function AuditView() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | 'all'>('all');
  const [selectedDocType, setSelectedDocType] = useState<LegalDocument['documentType'] | 'All'>('All');
  const [selectedJVPartner, setSelectedJVPartner] = useState<'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDocTypeBadge = (docType: LegalDocument['documentType']) => {
    switch (docType) {
      case 'FF Investment': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'Priced Round': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'Shareholder Agreement': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
      case 'Articles': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'Cap Table': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  // Filter documents
  const filteredDocuments = legalDocuments
    .filter(doc => {
      if (selectedCompanyId !== 'all' && doc.companyId !== selectedCompanyId) return false;
      if (selectedDocType !== 'All' && doc.documentType !== selectedDocType) return false;

      // Filter by JV Partner
      if (selectedJVPartner !== 'All') {
        const company = portfolioCompanies.find(c => c.id === doc.companyId);
        if (!company || company.jvPartner !== selectedJVPartner) return false;
      }

      if (searchQuery && !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

  // Group documents by company
  const documentsByCompany = portfolioCompanies.map(company => ({
    company,
    documents: getDocumentsByCompanyId(company.id),
  })).filter(item => item.documents.length > 0);

  // Calculate stats
  const totalDocuments = legalDocuments.length;
  const totalSize = legalDocuments.reduce((sum, doc) => sum + doc.fileSize, 0);
  const documentTypes = Array.from(new Set(legalDocuments.map(doc => doc.documentType))).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Total Documents</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{totalDocuments}</div>
          <div className="text-sm text-gray-600">Legal files stored</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Portfolio Coverage</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{documentsByCompany.length}/{portfolioCompanies.length}</div>
          <div className="text-sm text-gray-600">Companies with documents</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Document Types</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{documentTypes}</div>
          <div className="text-sm text-gray-600">Categories tracked</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Total Storage</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{formatFileSize(totalSize)}</div>
          <div className="text-sm text-gray-600">Across all files</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Legal Document Repository</h2>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Company Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 mr-2">Company:</span>
          <button
            onClick={() => setSelectedCompanyId('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCompanyId === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Companies ({totalDocuments})
          </button>
          {portfolioCompanies.map((company) => {
            const docCount = getDocumentsByCompanyId(company.id).length;
            if (docCount === 0) return null;
            return (
              <button
                key={company.id}
                onClick={() => setSelectedCompanyId(company.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCompanyId === company.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {company.companyName} ({docCount})
              </button>
            );
          })}
        </div>

        {/* Document Type Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 mr-2">Type:</span>
          <button
            onClick={() => setSelectedDocType('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedDocType === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Types
          </button>
          {(['FF Investment', 'Priced Round', 'Shareholder Agreement', 'Articles', 'Cap Table', 'Other'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedDocType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDocType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* JV Partner Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 mr-2">JV Partner:</span>
          <button
            onClick={() => setSelectedJVPartner('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedJVPartner === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Partners
          </button>
          {(['Aviva', 'Mediobanca', 'Fastweb', 'Vonovia'] as const).map((partner) => (
            <button
              key={partner}
              onClick={() => setSelectedJVPartner(partner)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedJVPartner === partner
                  ? 'bg-yellow-500 text-black'
                  : 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100'
              }`}
            >
              {partner}
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No documents found</h3>
          <p className="mt-2 text-sm text-gray-600">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {filteredDocuments.map((doc) => {
            const company = portfolioCompanies.find(c => c.id === doc.companyId);
            const badge = getDocTypeBadge(doc.documentType);

            return (
              <div key={doc.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Document Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {getDocumentIcon(doc.fileName)}
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-base font-semibold text-gray-900">{doc.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {doc.documentType}
                        </span>
                        {doc.roundType && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {doc.roundType}
                          </span>
                        )}
                      </div>

                      {doc.description && (
                        <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                        <span className="font-medium text-gray-700">{company?.companyName}</span>
                        <span className="text-gray-300">•</span>
                        <span>{doc.fileName}</span>
                        <span className="text-gray-300">•</span>
                        <span>{formatFileSize(doc.fileSize)}</span>
                        <span className="text-gray-300">•</span>
                        <span>Uploaded {formatDate(doc.uploadDate)}</span>
                        {doc.uploadedBy && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span>by {doc.uploadedBy}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => window.open(doc.driveUrl, '_blank')}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => window.open(doc.driveUrl, '_blank')}
                      className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Integration Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Google Drive Integration</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              In production, this would connect directly to Google Drive API for real-time document access.
              Documents would be organized in a structured folder hierarchy (Company Name → Document Type → Files)
              and automatically sync with the dashboard. Features would include: automatic metadata extraction,
              version control, sharing permissions, and audit trails.
            </p>
            <a
              href="https://developers.google.com/drive/api/v3/about-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-700 hover:text-blue-800 underline mt-2 inline-block"
            >
              Learn about Google Drive API →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
