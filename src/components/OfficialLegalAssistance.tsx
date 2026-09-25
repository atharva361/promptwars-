import React, { useState } from 'react';
import {
  Scale,
  Shield,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Phone,
  Landmark,
  UserCheck,
  CheckCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const OfficialLegalAssistance: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'fir-vs-gd' | 'free-legal-aid' | 'when-need-lawyer' | 'mact-tribunal'>('fir-vs-gd');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <span>Section 04</span>
          <span>·</span>
          <span>Official Legal Navigation</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Guide to Official Legal Assistance, Police Reporting & Claims Tribunals
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Navigating police station procedures, registering an FIR without harassment, accessing government-funded Free Legal Aid, and enforcing compensation rights before Motor Accident Claims Tribunals.
        </p>
      </div>

      {/* Topic Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'fir-vs-gd', label: '1. Police FIR vs. General Diary (GD)' },
          { id: 'free-legal-aid', label: '2. Free Legal Aid & Lok Adalat' },
          { id: 'when-need-lawyer', label: '3. When Do You Need a Lawyer?' },
          { id: 'mact-tribunal', label: '4. Motor Claims Tribunal (MACT)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTopic(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedTopic === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TOPIC 1: FIR vs General Diary */}
      {selectedTopic === 'fir-vs-gd' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-blue-200 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  First Information Report (FIR)
                </h3>
              </div>
              <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-semibold inline-block">
                Cognizable Offense / Mandatory Criminal Record
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                An FIR sets criminal law into motion. It is filed when there is bodily injury, loss of life, severe rash driving, drunk driving, or hit-and-run fleeing.
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                <span className="font-bold text-slate-800">When it is strictly required:</span>
                <ul className="text-slate-600 space-y-1">
                  <li>• Any hospital admission or emergency room Medico-Legal Case (MLC).</li>
                  <li>• Filing for third-party injury compensation in the Claims Tribunal.</li>
                  <li>• When criminal negligence charges are pressed against the other driver.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-slate-700" />
                <h3 className="text-base font-bold text-slate-900">
                  General Diary (GD) / Station Diary Entry
                </h3>
              </div>
              <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-semibold inline-block">
                Non-Cognizable / Record of Event
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                A factual log recorded by the duty officer in the Police Station Diary. It acknowledges the incident took place without registering criminal prosecution charges.
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                <span className="font-bold text-slate-800">When it is sufficient:</span>
                <ul className="text-slate-600 space-y-1">
                  <li>• Purely minor bumper/dent property damage without physical injuries.</li>
                  <li>• Both drivers agree to settle repair costs via their own insurance policies.</li>
                  <li>• Sufficient for insurance surveyors for comprehensive claims in many jurisdictions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step-by-step: How to get FIR copy & Police refusal rights */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Your Legal Rights at the Police Station:
            </h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Right to a Free Certified Copy:</strong>
                  Under criminal procedural law (Section 154 CrPC in India and global statutory rights), the informant or accident victim is entitled to a certified copy of the registered FIR completely free of cost immediately.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 block mb-0.5">What if the Police Station refuses to register an FIR?</strong>
                  If the local police station refuses or delays, you can submit a written complaint by registered post to the Superintendent of Police (SP) or Commissioner. Under Section 156(3) CrPC, a Judicial Magistrate can also directly direct the police to register the FIR and investigate.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Good Samaritan Immunity:</strong>
                  If you are assisting another injured person, hospitals and police officers cannot force you to register as a witness or bear medical expenses without your voluntary consent.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 2: Free Legal Aid & Lok Adalat */}
      {selectedTopic === 'free-legal-aid' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/20 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                Statutory Free Legal Aid (Legal Services Authorities)
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Under statutory legal aid acts (such as the Legal Services Authorities Act, 1987 in India, and Legal Aid Schemes in UK/US), every accident victim from eligible categories is entitled to free legal counseling, court representation, and documentation through appointed panel advocates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-white p-3.5 border border-emerald-200 space-y-1">
                <strong className="text-emerald-950 block">Who is Eligible for Free Legal Aid?</strong>
                <ul className="text-slate-600 space-y-1">
                  <li>• Women and minor children</li>
                  <li>• Persons with disabilities or hospitalization trauma</li>
                  <li>• Victims of mass road accidents / transport tragedies</li>
                  <li>• Low-income individuals (annual income under statutory limit)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-emerald-200 space-y-1">
                <strong className="text-emerald-950 block">How to Apply:</strong>
                <ul className="text-slate-600 space-y-1">
                  <li>• Call National Legal Aid Helpline: <strong>15100</strong> (Toll-Free, 24x7)</li>
                  <li>• Visit the District Legal Services Authority (DLSA) at your district court complex</li>
                  <li>• Online portal: nalsa.gov.in (India) / local legal services commission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lok Adalat Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              Lok Adalat (People’s Court) — Fast-Track Settlement
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lok Adalats are organized periodically by District Courts specifically to resolve motor accident claims out of court. Both parties and the insurance company’s legal counsel sit with retired judges to negotiate a mutually agreed settlement check.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Zero Court Fees:</strong>
                No court fees are levied, and existing court fees already paid are refunded in full upon settlement.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Final & Binding Award:</strong>
                The award has the force of a civil court decree. No appeal lies against a Lok Adalat award.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Direct Bank Payout:</strong>
                Insurance companies deposit the settled compensation directly into the victim's verified bank account within 30 to 45 days.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 3: When Do You Need a Lawyer */}
      {selectedTopic === 'when-need-lawyer' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Decision Matrix: Do You Need an Attorney or Can You Handle it Yourself?
            </h3>
            <p className="text-xs text-slate-600">
              Lawyer legal fees can be significant. Review this realistic assessment to determine whether legal representation is necessary for your situation:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-200 bg-rose-50/20 p-4 space-y-2 text-xs">
                <span className="font-bold text-rose-800 text-sm flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-rose-600" />
                  You STRICTLY Need a Lawyer When:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• <strong>Severe or permanent bodily injury:</strong> Fractures, spinal trauma, loss of limb, or head injury requiring lifelong care.</li>
                  <li>• <strong>Fatal accident / Death of an occupant:</strong> Requires complex dependency compensation calculations.</li>
                  <li>• <strong>Disputed liability / Contested Fault:</strong> The other driver falsely accuses you or the police report is prejudiced.</li>
                  <li>• <strong>Commercial Truck / Bus / Fleet involved:</strong> Transport companies have aggressive corporate legal teams.</li>
                  <li>• <strong>Hit-and-Run / Uninsured motorist:</strong> Involves government special compensation schemes.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/20 p-4 space-y-2 text-xs">
                <span className="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  You Can Usually Self-Handle When:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• <strong>Vehicle Property Damage Only:</strong> No injuries to anyone involved.</li>
                  <li>• <strong>You hold Comprehensive Insurance:</strong> Cashless network workshop will coordinate with surveyor directly.</li>
                  <li>• <strong>Both parties agree on facts:</strong> Information was exchanged cleanly and police logged standard entry.</li>
                  <li>• <strong>Repair cost is within policy limits:</strong> Zero dispute over identity of the vehicle.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 4: Motor Accident Claims Tribunal (MACT) */}
      {selectedTopic === 'mact-tribunal' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Motor Accident Claims Tribunal (MACT) Procedures
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The MACT is a specialized court established under the Motor Vehicles Act to adjudicate compensation for victims of road collisions. It does not punish criminal acts (that is done in Magistrate court); its sole purpose is awarding financial restitution.
            </p>

            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                How Compensation is Legally Calculated:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Pecuniary (Direct Financial) Damages:</strong>
                  <ul className="text-slate-600 space-y-1 mt-1">
                    <li>• Actual medical hospitalization & pharmacy bills</li>
                    <li>• Loss of income during recovery period</li>
                    <li>• Future loss of earning capacity based on multiplier formula</li>
                    <li>• Cost of caregiver, physiotherapy, and transportation</li>
                  </ul>
                </div>
                <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Non-Pecuniary (General) Damages:</strong>
                  <ul className="text-slate-600 space-y-1 mt-1">
                    <li>• Pain, suffering, and emotional trauma</li>
                    <li>• Loss of amenities of life and recreational enjoyment</li>
                    <li>• Loss of consortium (for spouse/children)</li>
                    <li>• Shortening of life expectancy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-1">
              <span className="font-bold block">Limitation Period (Filing Deadline):</span>
              <p className="leading-relaxed">
                Under the amended Motor Vehicles Act, an application for compensation before the Claims Tribunal must be filed within <strong>6 months</strong> from the date of occurrence of the accident. Do not allow your claim to lapse past this statutory limitation window.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
