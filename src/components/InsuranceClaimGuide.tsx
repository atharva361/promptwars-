import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Wrench,
  AlertTriangle,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle,
  ArrowRight,
  Sparkles,
  DollarSign,
  Scale,
  Building2,
} from 'lucide-react';

export const InsuranceClaimGuide: React.FC = () => {
  const [claimTypeTab, setClaimTypeTab] = useState<'first-party' | 'third-party'>('first-party');
  const [selectedStage, setSelectedStage] = useState<number>(1);

  // Claim Route Decision Wizard State
  const [faultScenario, setFaultScenario] = useState<'not-my-fault' | 'partially-my-fault' | 'hit-and-run'>('not-my-fault');
  const [hasComprehensive, setHasComprehensive] = useState<boolean>(true);
  const [hasZeroDep, setHasZeroDep] = useState<boolean>(true);

  const claimStages = [
    {
      step: 1,
      title: 'Formal Intimation & Claim Reference ID',
      timeline: 'Within 24 – 48 Hours',
      description: 'Contact insurer via official mobile app, website, or toll-free claims hotline before authorizing any garage repairs.',
      actionItems: [
        'Quote Policy Number, Vehicle Number, Incident Date, Time, and exact spot location.',
        'Request an immediate Claim Registration Number (CRN) for all future tracking.',
        'Do not commit to admitting negligence over the recorded phone line.',
      ],
      warning: 'Intimating after 48 hours without a justifiable medical reason or police FIR gives insurers legal precedent to dispute liability.',
    },
    {
      step: 2,
      title: 'Vehicle Towing to Authorized Network Workshop',
      timeline: 'Day 1 – 2',
      description: 'Opt for an authorized "Cashless Network Garage" affiliated with your insurer to prevent paying massive repair bills upfront.',
      actionItems: [
        'Use insurer Roadside Assistance (RSA) or keep original crane towing invoices to claim towing allowance.',
        'Ensure the workshop creates an intake "Vehicle Condition Report" listing all pre-existing vs fresh damages.',
        'Remove all personal valuables, dashcam SD cards, and laptop/phone accessories before handing over keys.',
      ],
      warning: 'Never attempt to drive a car with a leaking radiator or oil pan. Engine seizure from coolant loss is excluded as "consequential damage".',
    },
    {
      step: 3,
      title: 'Surveyor / Loss Assessor Physical Inspection',
      timeline: 'Day 2 – 4',
      description: 'A licensed IRDAI / official independent surveyor inspects the vehicle to verify damages correspond to the described crash impact.',
      actionItems: [
        'The surveyor takes photographs of VIN number, odometer reading, and 360-degree impact damage.',
        'You must provide copies of: Driving License, Registration Certificate (RC), Insurance Policy, and FIR/Police Diary copy.',
        'Be present or available on the phone during the survey to clarify how specific panel damages occurred.',
      ],
      warning: 'Do not permit the mechanic to dismantle engine parts or bumper brackets before the surveyor completes the preliminary inspection.',
    },
    {
      step: 4,
      title: 'Work Order Approval & Supplementary Estimate',
      timeline: 'Day 4 – 7',
      description: 'Once external parts are removed, hidden mechanical/suspension damages are documented via a "Supplementary Survey".',
      actionItems: [
        'Ask the workshop manager for the surveyor-approved estimate vs the dealer initial quotation.',
        'Check whether parts are approved for "Replacement" or "Denting/Repair". Insurers prefer repair to minimize payouts.',
        'Verify zero-depreciation add-on is applied so plastic, rubber, fiber, and glass parts are reimbursed at 100%.',
      ],
      warning: 'Consumables like engine oil, coolant, nuts/bolts, and AC gas are excluded unless you have the "Consumables Cover" rider.',
    },
    {
      step: 5,
      title: 'Repairs, Final Inspection & Discharge Voucher',
      timeline: 'Day 7 – 14',
      description: 'After repairs are finished, the surveyor conducts re-inspection to confirm replacement parts match the approved work order.',
      actionItems: [
        'Inspect the car thoroughly in daylight before signing the satisfaction note.',
        'Verify panel gap alignment, paint shade match, headlight beam levels, and dashboard warning indicators.',
        'You will pay only the "Compulsory Deductible" (usually $15 - $30 / ₹1,000 - ₹2,000) plus non-covered consumables.',
      ],
      warning: 'Signing the "Discharge Voucher" without inspecting the car permanently forfeits your right to claim rectification for defective repair work.',
    },
    {
      step: 6,
      title: 'Settlement & No-Claim Bonus (NCB) Impact',
      timeline: 'Upon Delivery',
      description: 'Insurer releases payment directly to the cashless workshop. Your policy record is updated.',
      actionItems: [
        'Collect invoice copies, warranty cards on newly fitted OEM parts (e.g. suspension, battery, glass).',
        'Note that claiming under Own Damage will reset your No-Claim Bonus (NCB) at the next renewal unless you have an NCB-Protect rider.',
      ],
      warning: 'For minor scratches under $50 / ₹3,000, calculate whether losing your 20%-50% NCB renewal discount costs more than paying out of pocket.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <span>Section 03</span>
          <span>·</span>
          <span>Claims Mastery</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Motor Vehicle Insurance Claim Procedures & Protocols
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Understanding the differences between First-Party (Own Damage) and Third-Party (Liability) claims, cashless garage workflows, surveyor evaluation traps, and statutory appeal channels.
        </p>
      </div>

      {/* Interactive Claim Route Advisor */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Interactive Claim Strategy Wizard
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Answer 3 quick questions about your incident to identify the quickest, most protective claim pathway:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              1. What was the incident fault dynamic?
            </span>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'not-my-fault', label: 'Other driver was clearly at fault' },
                { id: 'partially-my-fault', label: 'Disputed or mutual fault' },
                { id: 'hit-and-run', label: 'Hit-and-Run / Unknown vehicle' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFaultScenario(opt.id as any)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                    faultScenario === opt.id
                      ? 'border-blue-600 bg-blue-50/70 font-semibold text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              2. Do you have Comprehensive (Own Damage) cover?
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setHasComprehensive(true)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                  hasComprehensive
                    ? 'border-blue-600 bg-blue-50/70 font-semibold text-blue-900'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Yes (Full Package)
              </button>
              <button
                onClick={() => setHasComprehensive(false)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                  !hasComprehensive
                    ? 'border-blue-600 bg-blue-50/70 font-semibold text-blue-900'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Third-Party Only
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block leading-relaxed">
              Third-party only policies do not pay for damage to your own vehicle.
            </span>
          </div>

          <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              3. Is "Zero-Depreciation" add-on active?
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setHasZeroDep(true)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                  hasZeroDep
                    ? 'border-blue-600 bg-blue-50/70 font-semibold text-blue-900'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Yes (Nil-Dep)
              </button>
              <button
                onClick={() => setHasZeroDep(false)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                  !hasZeroDep
                    ? 'border-blue-600 bg-blue-50/70 font-semibold text-blue-900'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                Standard Policy
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block leading-relaxed">
              Without Nil-Dep, expect to pay 50% on plastic/rubber and 0–40% on metal panels out of pocket.
            </span>
          </div>
        </div>

        {/* Dynamic Strategy Output */}
        <div className="rounded-xl bg-white p-4 border border-blue-200 text-xs text-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Recommended Claim Strategy:
          </div>
          {hasComprehensive ? (
            <p className="leading-relaxed">
              <strong>File under your own First-Party (Comprehensive) Insurance:</strong> Even if the other driver was at fault, claiming through their third-party insurer in tribunal takes 12–36 months. Claiming under your own comprehensive policy at a cashless network garage gets your car repaired in 5–10 days. If the other driver is clearly identified in the police report, your insurer will legally subrogate and recover costs from them.
            </p>
          ) : (
            <p className="leading-relaxed">
              <strong>Third-Party Liability Claim via Police FIR & Motor Claims Tribunal:</strong> Because you hold a Third-Party Only policy, your insurer will not pay for your vehicle's physical repairs. You must register an FIR against the other driver, obtain their insurer details, and file a petition before the Motor Accident Claims Tribunal (MACT) / small claims court for property damage compensation.
            </p>
          )}
        </div>
      </div>

      {/* Comparison: First-Party vs Third-Party Claim */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            First-Party (Own Damage) vs. Third-Party Claim
          </h2>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setClaimTypeTab('first-party')}
              className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                claimTypeTab === 'first-party' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              First-Party (Own Damage)
            </button>
            <button
              onClick={() => setClaimTypeTab('third-party')}
              className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                claimTypeTab === 'third-party' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Third-Party (Liability)
            </button>
          </div>
        </div>

        {claimTypeTab === 'first-party' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Key Advantages:
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li>• Cashless network garage settlement without paying thousands upfront.</li>
                <li>• Quick inspection and approval (usually within 48–72 hours).</li>
                <li>• Covers self-accidents (e.g. skidding on wet road, hitting road divider, tree branch fall).</li>
                <li>• Independent of whether other driver is insured or fled the scene.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Costs & Deductions:
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li>• Standard compulsory deductible: $15–$30 (₹1,000 for &le;1500cc, ₹2,000 for &gt;1500cc).</li>
                <li>• Depreciation on plastic, rubber, metal panels (unless Zero-Depreciation add-on opted).</li>
                <li>• Forfeiture of No-Claim Bonus (NCB) at renewal unless NCB-Protect cover purchased.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-600" />
                When to File Third-Party:
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li>• Serious personal bodily injury or permanent physical disability caused to you or passenger.</li>
                <li>• You hold only a Third-Party insurance policy and cannot claim Own Damage.</li>
                <li>• Total loss of vehicle where other driver was convicted of rash/negligent driving.</li>
                <li>• Compensation covers medical bills, loss of earnings, and pain/suffering.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-600" />
                Legal Requirements & Caveats:
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li>• Mandatory certified copy of Police FIR, Charge-sheet, and Site Inspection Map.</li>
                <li>• Requires filing before the Motor Accident Claims Tribunal (MACT) or Civil Court.</li>
                <li>• Takes substantially longer than own-damage claims (average 1 to 3 years for award).</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 6-Stage Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          The 6 Sequential Stages of an Own-Damage Insurance Claim
        </h2>

        {/* Stage step selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {claimStages.map((stage) => (
            <button
              key={stage.step}
              onClick={() => setSelectedStage(stage.step)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedStage === stage.step
                  ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="text-[11px] font-bold text-blue-600 mb-0.5">
                Stage 0{stage.step}
              </div>
              <div className="text-xs font-semibold text-slate-900 truncate">
                {stage.title}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {stage.timeline}
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Details Card */}
        {(() => {
          const current = claimStages.find((s) => s.step === selectedStage)!;
          return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-600">
                    STAGE 0{current.step} OF 06 · {current.timeline}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Mandatory Execution Steps:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {current.actionItems.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl p-3.5 bg-rose-50/70 border border-rose-100 text-xs text-rose-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Surveyor Trap / Repudiation Risk:
                </span>
                <p className="leading-relaxed text-rose-800">{current.warning}</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Resolving Disputes: Insurance Ombudsman */}
      <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <h2 className="text-base md:text-lg font-bold text-white">
            What if the Insurance Company Rejects or Under-Settles Your Claim?
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Insurers cannot arbitrarily reject valid claims. If your claim is denied unfairly on grounds of delayed intimation or minor paperwork technicalities, follow this 3-tier statutory escalation:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="rounded-xl bg-slate-800 p-3.5 border border-slate-700 space-y-1.5">
            <span className="font-bold text-amber-400 block">Level 1: Grievance Officer (GRO)</span>
            <p className="text-slate-300">
              Submit a formal written appeal to your insurance company’s internal Grievance Redressal Officer. Under insurance regulations, they must respond within 15 days.
            </p>
          </div>
          <div className="rounded-xl bg-slate-800 p-3.5 border border-slate-700 space-y-1.5">
            <span className="font-bold text-emerald-400 block">Level 2: Insurance Ombudsman</span>
            <p className="text-slate-300">
              Free, quasi-judicial consumer forum. Requires no lawyer fee. Awards up to $60,000 / ₹30 Lakhs are binding on the insurer within 30 days.
            </p>
          </div>
          <div className="rounded-xl bg-slate-800 p-3.5 border border-slate-700 space-y-1.5">
            <span className="font-bold text-blue-400 block">Level 3: Consumer Court (DCDRC)</span>
            <p className="text-slate-300">
              File a petition for deficiency of service. Consumer courts regularly award 9% interest plus mental harassment damages for bad-faith claim denials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
