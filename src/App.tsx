import React, { useState } from 'react';
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

  // Update checklist item status
  const handleUpdateStatus = (id: string, newStatus: 'collected' | 'pending' | 'na') => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setChecklist(updated);
    recalculateScore(updated);
  };

  // Update item notes
  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, notes } : item
    );
    setChecklist(updated);
  };

  // Attach photo
  const handleAttachPhoto = (id: string, photoUrl: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, photoUrl, status: 'collected' as const } : item
    );
    setChecklist(updated);
    recalculateScore(updated);
  };

  // Remove photo
  const handleRemovePhoto = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, photoUrl: undefined } : item
    );
    setChecklist(updated);
  };

  const recalculateScore = (items: ChecklistItem[]) => {
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
  };

  const navItems = [
    { id: 'immediate-steps', label: '1. Golden 15 Mins', icon: ShieldAlert },
    { id: 'evidence-checklist', label: '2. Evidence Checklist', icon: ListTodo },
    { id: 'insurance-claim', label: '3. Insurance Claims', icon: FileCheck },
    { id: 'legal-assistance', label: '4. Legal & FIR Guide', icon: Scale },
    { id: 'ai-evaluator', label: '5. AI Statement Drafter', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-xs">
              L
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                LexRoad <span className="text-blue-600 font-bold">AI</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide block uppercase">
                Accident Legal & Claim Navigator
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
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
              className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs"
              title="Click to view full score breakdown rubric"
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
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-3 space-y-1 shadow-lg animate-fadeIn">
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
                  className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 ${
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
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'immediate-steps' && (
          <ImmediateStepsGuide
            onGoToChecklist={() => setActiveTab('evidence-checklist')}
            onOpenScoreModal={() => setIsScoreModalOpen(true)}
          />
        )}

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

        {activeTab === 'insurance-claim' && <InsuranceClaimGuide />}

        {activeTab === 'legal-assistance' && <OfficialLegalAssistance />}

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
      <footer className="border-t border-slate-200 bg-white mt-auto py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">LexRoad AI</span>
            <span>·</span>
            <span>Motor Accident Procedural, Legal & Insurance Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
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
