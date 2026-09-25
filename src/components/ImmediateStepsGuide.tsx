import React, { useState } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  FileText,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { EMERGENCY_NUMBERS, SAFE_STATEMENT_SCRIPTS } from '../data/legalProcedures';

interface ImmediateStepsGuideProps {
  onGoToChecklist?: () => void;
  onOpenScoreModal?: () => void;
}

export const ImmediateStepsGuide: React.FC<ImmediateStepsGuideProps> = ({
  onGoToChecklist,
  onOpenScoreModal,
}) => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedRegion = EMERGENCY_NUMBERS[selectedRegionIndex];

  const handleCopySafeScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      id: 1,
      badge: 'Step 1',
      title: 'Stop, Turn on Hazards & Establish Road Safety',
      icon: AlertTriangle,
      urgency: 'First 60 seconds',
      color: 'amber',
      keyRules: [
        'Engage parking brake immediately and turn on hazard flashers.',
        'Never flee the scene under any circumstances — fleeing elevates a simple minor accident into a criminal hit-and-run felony.',
        'If on a highway or high-speed expressway, exit the vehicle safely through the passenger side (away from traffic) and step behind the steel crash guardrail.',
        'Place the reflective red warning triangle at least 45–50 meters behind your vehicle to alert oncoming drivers, especially in fog or at night.',
      ],
      legalNote: 'Under motor vehicle laws globally, leaving the scene of an accident without identifying yourself or rendering assistance carries license suspension and imprisonment penalties.',
    },
    {
      id: 2,
      badge: 'Step 2',
      title: 'Medical Triage & Emergency Services Call',
      icon: HeartPulse,
      urgency: 'Minute 2 - 5',
      color: 'rose',
      keyRules: [
        'Check yourself and all passengers for consciousness, breathing, chest trauma, or severe bleeding.',
        'CRITICAL MEDICAL-LEGAL RULE: Never remove a motorcyclist’s helmet unless their airway is blocked and CPR is required. Moving their neck can cause irreversible spinal cord transection.',
        'Do not move an unconscious or severely injured person unless there is an imminent threat of vehicle fire or submerged water hazard.',
        `Immediately dial emergency medical dispatch (${selectedRegion.ambulance} / ${selectedRegion.nationalEmergency}). Clearly state: Location, number of injured, and whether anyone is trapped.`,
      ],
      legalNote: 'Good Samaritan Laws in India (Supreme Court guidelines) and most jurisdictions protect anyone assisting accident victims from civil or criminal harassment by police or hospitals.',
    },
    {
      id: 3,
      badge: 'Step 3',
      title: 'Zero Admission of Fault — Legal Protection Protocol',
      icon: ShieldAlert,
      urgency: 'Minute 5 - 10',
      color: 'indigo',
      keyRules: [
        'NEVER say "I am so sorry", "I was distracted", or "I didn\'t see you". Shock and adrenaline cause people to apologize out of politeness, but courts and insurance adjusters treat this as an admission of legal liability.',
        'Remain calm, courteous, but strictly neutral. You cannot reliably determine mechanical or roadway causes in the initial moments of shock.',
        'Do not sign any handwritten notes or accept informal cash offers on the road. These waive your future medical or repair claims.',
        'Limit conversation with the other party strictly to confirming their physical safety and exchanging contact/insurance details.',
      ],
      legalNote: 'Civil and tort law relies heavily on contemporaneously recorded remarks. An apology can invalidate your comprehensive insurance coverage and force personal liability.',
    },
    {
      id: 4,
      badge: 'Step 4',
      title: 'Call the Police & Document Official Entry',
      icon: FileText,
      urgency: 'Minute 10 - 15',
      color: 'blue',
      keyRules: [
        `Call the jurisdictional Traffic Police Control Room (${selectedRegion.police} / ${selectedRegion.nationalEmergency}) immediately.`,
        'Inform them of: Exact street cross-section, landmark, whether road traffic is blocked, and vehicle registration numbers.',
        'When the officer arrives, note down their Name, Badge/Belt Number, Patrol Car Number, and Police Station jurisdiction.',
        'Ask the officer for the Station Diary (GD) entry number or when the First Information Report (FIR) / Traffic Collision Report can be collected.',
      ],
      legalNote: 'A police report or Station Diary (GD) extract is mandatory for insurance claims exceeding minor dent limits, and is indispensable if third-party injury or disputed liability arises.',
    },
    {
      id: 5,
      badge: 'Step 5',
      title: 'Systematic Information Exchange & Scene Evidence',
      icon: Users,
      urgency: 'Before clearing scene',
      color: 'emerald',
      keyRules: [
        'Exchange Name, Phone Number, Driver’s License Number, and Insurance Provider with the other driver.',
        'Photograph their registration plate, driver’s license, and insurance certificate (front and back).',
        'Take 360-degree photos of the entire intersection, road signs, skid marks, and damaged vehicle panels from multiple angles before vehicles are moved by tow trucks.',
        'Obtain names and phone numbers of at least 2 independent bystanders or shopkeepers who witnessed the impact.',
      ],
      legalNote: 'Photographs with GPS metadata and timestamp serve as primary physical evidence in the Motor Accident Claims Tribunal (MACT) or small claims civil proceedings.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner: Roadside Emergency Hotline Strip */}
      <div className="rounded-2xl bg-slate-900 text-white p-5 md:p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Emergency Post-Accident Navigator
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              The Golden 15 Minutes: What to Do Immediately
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Critical legal, medical, and procedural rules to protect your life, legal innocence, and insurance rights.
            </p>
          </div>

          {/* Region selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Jurisdiction:</span>
            <select
              value={selectedRegionIndex}
              onChange={(e) => setSelectedRegionIndex(Number(e.target.value))}
              aria-label="Select country jurisdiction"
              className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EMERGENCY_NUMBERS.map((reg, idx) => (
                <option key={reg.region} value={idx}>
                  {reg.region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick dial emergency numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-xs text-slate-400 block mb-1">Police Dispatch</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white tracking-wide">
                {selectedRegion.police}
              </span>
              <a
                href={`tel:${selectedRegion.police.split('/')[0].trim()}`}
                className="p-1.5 rounded-md bg-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                title="Call Police"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-xs text-slate-400 block mb-1">Ambulance / Medical</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-rose-400 tracking-wide">
                {selectedRegion.ambulance}
              </span>
              <a
                href={`tel:${selectedRegion.ambulance.split('/')[0].trim()}`}
                className="p-1.5 rounded-md bg-rose-600/30 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                title="Call Ambulance"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-xs text-slate-400 block mb-1">Highway Patrol / Tow</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-amber-400 tracking-wide">
                {selectedRegion.highwayHelp}
              </span>
              <a
                href={`tel:${selectedRegion.highwayHelp.replace(/[^0-9]/g, '')}`}
                className="p-1.5 rounded-md bg-amber-600/30 text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
                title="Call Highway Patrol"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-xs text-slate-400 block mb-1">Free Legal Aid Help</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-emerald-400 tracking-wide">
                {selectedRegion.legalAid}
              </span>
              <a
                href={`tel:${selectedRegion.legalAid.replace(/[^0-9]/g, '')}`}
                className="p-1.5 rounded-md bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                title="Call Legal Aid Helpline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Steps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            5 Sequential Action Steps After a Collision
          </h2>
          <span className="text-xs text-slate-500">
            Click any step to view legal rules & rationale
          </span>
        </div>

        <div className="space-y-3">
          {steps.map((step) => {
            const isOpen = activeStep === step.id;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="rounded-xl border border-slate-200 bg-white transition-all shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setActiveStep(isOpen ? null : step.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 md:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="rounded-xl p-2.5 bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-slate-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-0.5">
                        <span>{step.badge}</span>
                        <span>·</span>
                        <span className="text-blue-600 font-medium">{step.urgency}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-1 text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 animate-fadeIn">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Tactical Procedures & Execution:
                      </span>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {step.keyRules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                        Legal Significance & Statutory Precedent:
                      </span>
                      <p className="leading-relaxed text-slate-600">{step.legalNote}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Crucial Legal Feature: Safe vs Toxic Statement Flashcards */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            Liability Shield: Word-For-Word Scripts
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            What to Say vs. What NOT to Say at the Accident Scene
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Statements made immediately following a crash are admissible in criminal trials and insurance subrogation. Compare fatal traps with legally protected alternatives:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAFE_STATEMENT_SCRIPTS.map((script, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 p-4 space-y-3 bg-white hover:border-slate-300 transition-colors"
            >
              {/* Toxic / Dangerous Trap */}
              <div className="rounded-lg bg-rose-50/70 p-3 border border-rose-100 text-xs">
                <span className="font-bold text-rose-700 flex items-center gap-1 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  DO NOT SAY:
                </span>
                <p className="font-semibold text-rose-900 italic">
                  "{script.dangerous}"
                </p>
                <p className="text-rose-700/80 mt-1 text-[11px] leading-relaxed">
                  <span className="font-semibold">Why this is dangerous:</span> {script.whyDangerous}
                </p>
              </div>

              {/* Safe Alternative */}
              <div className="rounded-lg bg-emerald-50/70 p-3 border border-emerald-100 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    SAY THIS INSTEAD:
                  </span>
                  <button
                    onClick={() => handleCopySafeScript(script.safeAlternative, idx)}
                    className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 transition-colors text-[11px]"
                    title="Copy statement to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="font-semibold text-emerald-950">
                  "{script.safeAlternative}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="rounded-xl bg-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="text-slate-700 font-medium text-center sm:text-left">
          Scene stabilized? Next, gather all required physical documents & photos before evidence degrades.
        </div>
        <div className="flex items-center gap-2">
          {onOpenScoreModal && (
            <button
              onClick={onOpenScoreModal}
              className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium rounded-lg transition-colors cursor-pointer text-xs"
            >
              View Case Readiness Score
            </button>
          )}
          {onGoToChecklist && (
            <button
              onClick={onGoToChecklist}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer text-xs"
            >
              Open Evidence Checklist &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
