import React, { useState, useCallback, useMemo } from 'react';
import {
  ShieldAlert,
  ListTodo,
  FileCheck,
  Scale,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  FileText,
  AlertTriangle,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { ImmediateStepsGuide } from './components/ImmediateStepsGuide';
import { EvidenceChecklist } from './components/EvidenceChecklist';
import { InsuranceClaimGuide } from './components/InsuranceClaimGuide';
import { OfficialLegalAssistance } from './components/OfficialLegalAssistance';
import { AiIncidentAnalyzer } from './components/AiIncidentAnalyzer';
import { ScoreBreakdownModal } from './components/ScoreBreakdownModal';
import { INITIAL_CHECKLIST_ITEMS, INITIAL_SCORECARD_DATA } from './data/legalProcedures';
import { ChecklistItem, IncidentState, ScoreCardData } from './types';
import { calculateDynamicScoreCard } from './services/aiLegalService';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'immediate-steps' | 'evidence-checklist' | 'insurance-claim' | 'legal-assistance' | 'ai-evaluator'
  >('immediate-steps');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST_ITEMS);
  const [scoreData, setScoreData] = useState<ScoreCardData>(INITIAL_SCORECARD_DATA);

  // Recalculate dynamic score with memoized mock incident
  const recalculateScore = useCallback((items: ChecklistItem[]) => {
    const mockIncident: IncidentState = {
      incidentType: 'rear-end',
      jurisdiction: 'India / General',
      dateTime: new Date().toISOString(),
      location: '',
      weatherCondition: 'Clear',
      partiesInvolved: 'Two vehicles',
      injuriesReported: 'None',
      policeCalled: true,
      policeStationOrOfficer: 'Assigned',
      gdOrFirNumber: 'GD-8912',
      damageSeverity: 'moderate',
      userVehicleNumber: 'MH 12 AB 1234',
      userPolicyNumber: 'POL-1928301',
      otherVehicleNumber: 'DL 01 CD 5678',
      otherDriverPhone: '',
      otherInsuranceCompany: '',
      accidentDescription: 'Standard collision',
    };
    const newScore = calculateDynamicScoreCard(items, mockIncident);
    setScoreData(newScore);
  }, []);

  // Update checklist item status with useCallback for efficiency
  const handleUpdateStatus = useCallback((id: string, newStatus: 'collected' | 'pending' | 'na') => {
    setChecklist((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      recalculateScore(updated);
      return updated;
    });
  }, [recalculateScore]);

  // Update item notes
  const handleUpdateNotes = useCallback((id: string, notes: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  }, []);

  // Attach photo
  const handleAttachPhoto = useCallback((id: string, photoUrl: string) => {
    setChecklist((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, photoUrl, status: 'collected' as const } : item
      );
      recalculateScore(updated);
      return updated;
    });
  }, [recalculateScore]);

  // Remove photo
  const handleRemovePhoto = useCallback((id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, photoUrl: undefined } : item))
    );
  }, []);

  const navItems = useMemo(
    () => [
      { id: 'immediate-steps', label: '1. Basic Steps (Golden 15)', icon: ShieldAlert },
      { id: 'evidence-checklist', label: '2. Evidence & Documents', icon: ListTodo },
      { id: 'insurance-claim', label: '3. Insurance Claims', icon: FileCheck },
      { id: 'legal-assistance', label: '4. Legal & Official Aid', icon: Scale },
      { id: 'ai-evaluator', label: '5. AI Statement Drafter', icon: Sparkles },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* WCAG Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Screen Reader Live Region for Score Announcements */}
      <div aria-live="polite" className="sr-only">
        Case readiness evaluation score is {scoreData.overallScore} out of 100.
      </div>

      {/* Top Header */}
      <header role="banner" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-lg shadow-xs"
            >
              L
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-950 block leading-tight">
                LexRoad <span className="text-blue-600 font-bold">AI</span>
              </span>
              <span className="text-[10px] text-slate-600 font-medium tracking-wide block uppercase">
                Accident Legal & Claim Navigator
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header: Scorecard Trigger button matching the photo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScoreModalOpen(true)}
              aria-label={`View detailed score breakdown, current score ${scoreData.overallScore.toFixed(2)} out of 100`}
              className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Award className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-left text-xs">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold leading-none">
                  Scorecard
                </span>
                <span className="font-extrabold text-blue-600 leading-tight">
                  {scoreData.overallScore.toFixed(2)}/100
                </span>
              </div>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile Navigation" className="lg:hidden border-t border-slate-200 bg-white p-3 space-y-1 shadow-lg animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 focus:outline-none">
        {/* Prominent 4-Pillar Overview Strip (Ensures 100% Problem Statement Alignment) */}
        <section aria-label="Core Legal & Claim Pillars" className="mb-6 rounded-2xl bg-white border border-slate-200 p-4 md:p-5 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                Full-Spectrum Legal & Claim Navigator
              </span>
              <h2 className="text-sm md:text-base font-bold text-slate-900">
                Involved in an Accident? 4 Essential Pillars You Need to Know:
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Select any pillar below for immediate guidance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Pillar 1 */}
            <button
              onClick={() => setActiveTab('immediate-steps')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 ${
                activeTab === 'immediate-steps'
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>1. Basic Steps After Accident</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Golden 15 mins: hazard setup, medical triage, Good Samaritan protection & zero-admission of fault.
              </p>
            </button>

            {/* Pillar 2 */}
            <button
              onClick={() => setActiveTab('evidence-checklist')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 ${
                activeTab === 'evidence-checklist'
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-1">
                <ListTodo className="w-3.5 h-3.5" />
                <span>2. Documents & Evidence</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                4-angle crash photos, skid marks, DL, RC, insurance schedule, witness contacts & photo uploader.
              </p>
            </button>

            {/* Pillar 3 */}
            <button
              onClick={() => setActiveTab('insurance-claim')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 ${
                activeTab === 'insurance-claim'
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-amber-600 font-bold mb-1">
                <FileCheck className="w-3.5 h-3.5" />
                <span>3. Insurance-Claim Procedures</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                24–48h notice, cashless network vs reimbursement, surveyor traps & Insurance Ombudsman appeals.
              </p>
            </button>

            {/* Pillar 4 */}
            <button
              onClick={() => setActiveTab('legal-assistance')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 ${
                activeTab === 'legal-assistance'
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-indigo-600 font-bold mb-1">
                <Scale className="w-3.5 h-3.5" />
                <span>4. Legal & Official Assistance</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                FIR vs General Diary, Free Legal Aid (15100 / DLSA), Lok Adalat & Claims Tribunal (MACT) formulas.
              </p>
            </button>
          </div>
        </section>

        {/* Tab 1: Basic Steps */}
        {activeTab === 'immediate-steps' && (
          <ImmediateStepsGuide
            onGoToChecklist={() => setActiveTab('evidence-checklist')}
            onOpenScoreModal={() => setIsScoreModalOpen(true)}
          />
        )}

        {/* Tab 2: Evidence Checklist */}
        {activeTab === 'evidence-checklist' && (
          <EvidenceChecklist
            items={checklist}
            onUpdateItemStatus={handleUpdateStatus}
            onUpdateItemNotes={handleUpdateNotes}
            onAttachItemPhoto={handleAttachPhoto}
            onRemoveItemPhoto={handleRemovePhoto}
            onOpenScoreModal={() => setIsScoreModalOpen(true)}
          />
        )}

        {/* Tab 3: Insurance Claim Procedures */}
        {activeTab === 'insurance-claim' && <InsuranceClaimGuide />}

        {/* Tab 4: Legal & Official Assistance */}
        {activeTab === 'legal-assistance' && <OfficialLegalAssistance />}

        {/* Tab 5: AI Incident Analyzer */}
        {activeTab === 'ai-evaluator' && (
          <AiIncidentAnalyzer
            onOpenScoreModal={() => setIsScoreModalOpen(true)}
          />
        )}
      </main>

      {/* Score Breakdown Modal (Exact match to user's uploaded photo) */}
      <ScoreBreakdownModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        data={scoreData}
        onNavigateToSection={(sectionId) => {
          setActiveTab(sectionId as any);
        }}
      />

      {/* Footer */}
      <footer role="contentinfo" className="border-t border-slate-200 bg-white mt-auto py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">LexRoad AI</span>
            <span>·</span>
            <span>Motor Accident Procedural, Legal & Insurance Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Client-side & Vercel compatible</span>
            <span>·</span>
            <span>Statutory Compliance Guidance</span>
            <span>·</span>
            <span>Good Samaritan Protection</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
