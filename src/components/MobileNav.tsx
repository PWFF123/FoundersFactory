import { useState } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'active' | 'pipeline' | 'renewals' | 'studio' | 'accelerator' | 'financing' | 'audit';
  setActiveTab: (tab: 'active' | 'pipeline' | 'renewals' | 'studio' | 'accelerator' | 'financing' | 'audit') => void;
  studioJVFilter: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia';
  setStudioJVFilter: (filter: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia') => void;
  acceleratorJVFilter: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia';
  setAcceleratorJVFilter: (filter: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia') => void;
}

export function MobileNav({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  studioJVFilter,
  setStudioJVFilter,
  acceleratorJVFilter,
  setAcceleratorJVFilter,
}: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<'studio' | 'accelerator' | null>(null);

  const handleTabClick = (tab: 'active' | 'pipeline' | 'renewals' | 'studio' | 'accelerator' | 'financing' | 'audit') => {
    setActiveTab(tab);
    if (tab !== 'studio' && tab !== 'accelerator') {
      onClose();
    }
  };

  const handleStudioFilterClick = (filter: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia') => {
    setActiveTab('studio');
    setStudioJVFilter(filter);
    onClose();
  };

  const handleAcceleratorFilterClick = (filter: 'All' | 'Aviva' | 'Mediobanca' | 'Fastweb' | 'Vonovia') => {
    setActiveTab('accelerator');
    setAcceleratorJVFilter(filter);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-out Menu */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 md:hidden shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-yellow-400">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="py-2">
          {/* Active Joint Ventures */}
          <button
            onClick={() => handleTabClick('active')}
            className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 ${
              activeTab === 'active'
                ? 'bg-yellow-50 border-yellow-400 text-black'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Corporate Development
          </button>

          {/* Pipeline */}
          <button
            onClick={() => handleTabClick('pipeline')}
            className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 ${
              activeTab === 'pipeline'
                ? 'bg-yellow-50 border-yellow-400 text-black'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Pipeline
          </button>

          {/* Renewals & Notices */}
          <button
            onClick={() => handleTabClick('renewals')}
            className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 ${
              activeTab === 'renewals'
                ? 'bg-yellow-50 border-yellow-400 text-black'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Renewals & Notices
          </button>

          {/* Studio Deals - Expandable */}
          <div>
            <button
              onClick={() => setExpandedSection(expandedSection === 'studio' ? null : 'studio')}
              className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 flex items-center justify-between ${
                activeTab === 'studio'
                  ? 'bg-yellow-50 border-yellow-400 text-black'
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>Studio Deals</span>
              <svg
                className={`w-5 h-5 transition-transform ${expandedSection === 'studio' ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Studio Submenu */}
            {expandedSection === 'studio' && (
              <div className="bg-gray-50 border-l-4 border-yellow-400/30">
                <button
                  onClick={() => handleStudioFilterClick('All')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'studio' && studioJVFilter === 'All'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleStudioFilterClick('Aviva')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'studio' && studioJVFilter === 'Aviva'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Aviva
                </button>
                <button
                  onClick={() => handleStudioFilterClick('Mediobanca')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'studio' && studioJVFilter === 'Mediobanca'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Mediobanca
                </button>
                <button
                  onClick={() => handleStudioFilterClick('Fastweb')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'studio' && studioJVFilter === 'Fastweb'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Fastweb
                </button>
                <button
                  onClick={() => handleStudioFilterClick('Vonovia')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'studio' && studioJVFilter === 'Vonovia'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vonovia
                </button>
              </div>
            )}
          </div>

          {/* Accelerator Investments - Expandable */}
          <div>
            <button
              onClick={() => setExpandedSection(expandedSection === 'accelerator' ? null : 'accelerator')}
              className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 flex items-center justify-between ${
                activeTab === 'accelerator'
                  ? 'bg-yellow-50 border-yellow-400 text-black'
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>Accelerator</span>
              <svg
                className={`w-5 h-5 transition-transform ${expandedSection === 'accelerator' ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Accelerator Submenu */}
            {expandedSection === 'accelerator' && (
              <div className="bg-gray-50 border-l-4 border-yellow-400/30">
                <button
                  onClick={() => handleAcceleratorFilterClick('All')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'accelerator' && acceleratorJVFilter === 'All'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleAcceleratorFilterClick('Aviva')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'accelerator' && acceleratorJVFilter === 'Aviva'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Aviva
                </button>
                <button
                  onClick={() => handleAcceleratorFilterClick('Mediobanca')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'accelerator' && acceleratorJVFilter === 'Mediobanca'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Mediobanca
                </button>
                <button
                  onClick={() => handleAcceleratorFilterClick('Fastweb')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'accelerator' && acceleratorJVFilter === 'Fastweb'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Fastweb
                </button>
                <button
                  onClick={() => handleAcceleratorFilterClick('Vonovia')}
                  className={`w-full text-left px-12 py-3 text-sm transition-colors ${
                    activeTab === 'accelerator' && acceleratorJVFilter === 'Vonovia'
                      ? 'text-black font-semibold bg-yellow-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vonovia
                </button>
              </div>
            )}
          </div>

          {/* Financing Rounds */}
          <button
            onClick={() => handleTabClick('financing')}
            className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 ${
              activeTab === 'financing'
                ? 'bg-yellow-50 border-yellow-400 text-black'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Financing
          </button>

          {/* Audit & Documents */}
          <button
            onClick={() => handleTabClick('audit')}
            className={`w-full text-left px-6 py-4 font-semibold text-sm transition-colors border-l-4 ${
              activeTab === 'audit'
                ? 'bg-yellow-50 border-yellow-400 text-black'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Audit
          </button>
        </div>
      </div>
    </>
  );
}
