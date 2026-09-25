import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  FileText,
  Send,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Loader2,
  Download,
} from 'lucide-react';
import { AiAnalysisResult, IncidentState, IncidentType, DamageSeverity } from '../types';
import { analyzeIncidentWithAI } from '../services/aiLegalService';

interface AiIncidentAnalyzerProps {
  onAnalysisComplete?: (result: AiAnalysisResult, incident: IncidentState) => void;
  onOpenScoreModal?: () => void;
}

export const AiIncidentAnalyzer: React.FC<AiIncidentAnalyzerProps> = ({
  onAnalysisComplete,
  onOpenScoreModal,
}) => {
  const [incident, setIncident] = useState<IncidentState>({
    incidentType: 'rear-end',
    jurisdiction: 'India / General',
    dateTime: new Date().toISOString().slice(0, 16),
    location: '',
    weatherCondition: 'Clear daylight',
    partiesInvolved: 'Two vehicles (My car & opponent vehicle)',
    injuriesReported: 'None reported',
    policeCalled: true,
    policeStationOrOfficer: '',
    gdOrFirNumber: '',
    damageSeverity: 'moderate',
    userVehicleNumber: '',
    userPolicyNumber: '',
    otherVehicleNumber: '',
    otherDriverPhone: '',
    otherInsuranceCompany: '',
    accidentDescription:
      'I was slowing down at an intersection for an amber traffic light when another vehicle struck my car from behind. The rear bumper, tailgate, and tail-light assembly suffered structural damage. Both drivers pulled to the curb safely.',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AiAnalysisResult | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<'action-plan' | 'police-draft' | 'insurance-draft' | 'evidence'>('action-plan');
  const [copiedDraft, setCopiedDraft] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(label);
    setTimeout(() => setCopiedDraft(null), 2500);
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await analyzeIncidentWithAI(incident);
      setAnalysisResult(result);
      if (onAnalysisComplete) {
        onAnalysisComplete(result, incident);
      }
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    const content = `========================================================
LEXROAD AI - ROAD ACCIDENT LEGAL & INSURANCE INCIDENT DOSSIER
Generated: ${new Date().toLocaleString()}
========================================================

1. INCIDENT PARTICULARS
- Type: ${incident.incidentType}
- Date & Time: ${incident.dateTime}
- Location: ${incident.location || 'Not specified'}
- Severity: ${incident.damageSeverity}
- Your Vehicle Number: ${incident.userVehicleNumber || 'Not specified'}
- Opponent Vehicle: ${incident.otherVehicleNumber || 'Not specified'}
- Policy Number: ${incident.userPolicyNumber || 'Not specified'}
- Police Status: ${incident.policeCalled ? 'Notified' : 'Pending'}

2. IMMEDIATE SAFETY & FAULT SHIELD
${analysisResult.faultShieldAdvice}

3. SEQUENTIAL ACTION STEPS
${analysisResult.immediateActionSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

4. CRITICAL DOCUMENTS REQUIRED
${analysisResult.criticalDocuments.map((d) => `- ${d}`).join('\n')}

5. INSURANCE CLAIM STRATEGY
- Recommended Route: ${analysisResult.insuranceStrategy.recommendedClaimType}
- Deadline Notice: ${analysisResult.insuranceStrategy.deadlines}
- Surveyor Inspection Advice:
  ${analysisResult.insuranceStrategy.surveyorTips.map((t) => `* ${t}`).join('\n')}

6. OFFICIAL POLICE / FIR STATEMENT DRAFT
--------------------------------------------------------
${analysisResult.officialStatements.policeDraft}
--------------------------------------------------------

7. FORMAL INSURANCE CLAIM INTIMATION DRAFT
--------------------------------------------------------
${analysisResult.officialStatements.insuranceIntimationDraft}
--------------------------------------------------------
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Incident-Legal-Dossier-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Section 05</span>
              <span>·</span>
              <span>AI Legal & Claim Counsel</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              AI Incident Intake & Legal Statement Drafter
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Describe what happened. LexRoad AI synthesizes statutory motor accident legal rules to generate a personalized priority plan, a non-incriminating police statement, and a formal insurance claim intimation.
            </p>
          </div>

          {onOpenScoreModal && (
            <button
              onClick={onOpenScoreModal}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto shrink-0"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              View Scorecard (91.43/100)
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Form on Left, Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Intake Form */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Incident Particulars
            </h2>
            <span className="text-xs text-slate-500">Confidential / Local</span>
          </div>

          <form onSubmit={handleRunAnalysis} className="space-y-4 text-xs">
            {/* Collision Type */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Collision Category:
              </label>
              <select
                value={incident.incidentType}
                onChange={(e) =>
                  setIncident({ ...incident, incidentType: e.target.value as IncidentType })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="rear-end">Rear-End Collision (Struck from behind)</option>
                <option value="intersection-t-bone">Intersection / T-Bone Impact</option>
                <option value="head-on">Head-On Collision</option>
                <option value="sideswipe">Sideswipe / Lane Change Merge</option>
                <option value="hit-and-run">Hit-and-Run (Other driver fled)</option>
                <option value="pedestrian-cyclist">Pedestrian or Cyclist Involved</option>
                <option value="single-vehicle-barrier">Single Vehicle (Skid / Road Divider / Tree)</option>
                <option value="parking-lot-scrape">Parking Lot Scrape / Low Speed</option>
                <option value="other">Other Unique Collision</option>
              </select>
            </div>

            {/* Severity & Police */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Damage Severity:
                </label>
                <select
                  value={incident.damageSeverity}
                  onChange={(e) =>
                    setIncident({ ...incident, damageSeverity: e.target.value as DamageSeverity })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="minor">Minor (Scratches, drivable)</option>
                  <option value="moderate">Moderate (Dented panels, tow optional)</option>
                  <option value="severe">Severe (Airbags deployed, towed)</option>
                  <option value="total-loss">Total Loss / Roll-over</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Police Notified?
                </label>
                <select
                  value={incident.policeCalled ? 'yes' : 'no'}
                  onChange={(e) =>
                    setIncident({ ...incident, policeCalled: e.target.value === 'yes' })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="yes">Yes, Police Dialed / At Scene</option>
                  <option value="no">Not Yet Dialed</option>
                </select>
              </div>
            </div>

            {/* Injuries */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Bodily Injuries Reported:
              </label>
              <select
                value={incident.injuriesReported}
                onChange={(e) =>
                  setIncident({ ...incident, injuriesReported: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="None reported">None Reported / Passengers Uninjured</option>
                <option value="Minor whiplash or bruises">Minor Bruising / Neck Whiplash</option>
                <option value="Hospitalization / Emergency trauma">Severe / Hospitalization Trauma</option>
              </select>
            </div>

            {/* Vehicle & Policy numbers (optional for generating ready-to-copy drafts) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-slate-600 block mb-1">
                  Your Vehicle Plate # (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH 12 AB 1234 / CA 7XYZ123"
                  value={incident.userVehicleNumber}
                  onChange={(e) => setIncident({ ...incident, userVehicleNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">
                  Your Insurance Policy # (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. POL-892301923"
                  value={incident.userPolicyNumber}
                  onChange={(e) => setIncident({ ...incident, userPolicyNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  What Happened? (Brief Account):
                </label>
                <span className="text-[11px] text-slate-400">Describe sequence neutrally</span>
              </div>
              <textarea
                rows={4}
                value={incident.accidentDescription}
                onChange={(e) => setIncident({ ...incident, accidentDescription: e.target.value })}
                placeholder="State road position, weather, impact point, and opponent vehicle actions..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Legal & Claims Analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Action Plan & Statement Drafts
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output View */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs flex flex-col min-h-[500px]">
          {analysisResult ? (
            <div className="space-y-4 flex-1 flex flex-col animate-fadeIn">
              {/* Output Sub-navigation */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
                  <button
                    onClick={() => setActiveOutputTab('action-plan')}
                    className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      activeOutputTab === 'action-plan'
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    1. Action Plan
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('police-draft')}
                    className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      activeOutputTab === 'police-draft'
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    2. Police Draft
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('insurance-draft')}
                    className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      activeOutputTab === 'insurance-draft'
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3. Insurance Notice
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('evidence')}
                    className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      activeOutputTab === 'evidence'
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4. Evidence Needed
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadReport}
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer"
                    title="Download complete text report"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Dossier
                  </button>
                </div>
              </div>

              {/* Sub-tab 1: Action Plan */}
              {activeOutputTab === 'action-plan' && (
                <div className="space-y-4 text-xs flex-1 animate-fadeIn">
                  {/* Fault Shield Warning */}
                  <div className="rounded-xl p-3.5 bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-800">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      Immediate Liability Shield Advice:
                    </span>
                    <p className="leading-relaxed text-amber-900">{analysisResult.faultShieldAdvice}</p>
                  </div>

                  {/* Sequential Action Steps */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 text-sm block">
                      Prioritized Immediate Steps:
                    </span>
                    <div className="space-y-2">
                      {analysisResult.immediateActionSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="text-slate-800 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insurance Strategy Quick summary */}
                  <div className="rounded-xl p-3.5 bg-blue-50/60 border border-blue-100 space-y-1.5">
                    <span className="font-bold text-blue-900 block">
                      Insurance Strategy ({analysisResult.insuranceStrategy.recommendedClaimType}):
                    </span>
                    <p className="text-slate-700">
                      <strong>Mandatory Notice:</strong> {analysisResult.insuranceStrategy.deadlines}
                    </p>
                    <ul className="text-slate-600 space-y-0.5 list-disc list-inside">
                      {analysisResult.insuranceStrategy.surveyorTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Police Statement Draft */}
              {activeOutputTab === 'police-draft' && (
                <div className="space-y-3 text-xs flex-1 flex flex-col animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        Legally Protected Police / FIR Statement
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Neutral, objective facts without inadvertent admission of liability.
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyText(
                          analysisResult.officialStatements.policeDraft,
                          'police'
                        )
                      }
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                    >
                      {copiedDraft === 'police' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Statement
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative flex-1">
                    <textarea
                      readOnly
                      rows={12}
                      value={analysisResult.officialStatements.policeDraft}
                      className="w-full h-full min-h-[250px] p-3.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px] text-slate-800 focus:outline-none leading-relaxed resize-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Review and customize placeholder brackets like [Your Name] and [Contact] before handing to the investigating officer.
                  </p>
                </div>
              )}

              {/* Sub-tab 3: Insurance Notice Draft */}
              {activeOutputTab === 'insurance-draft' && (
                <div className="space-y-3 text-xs flex-1 flex flex-col animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        Formal Insurance Intimation Notice
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Satisfies the policy condition requiring notice within 24–48 hours.
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyText(
                          analysisResult.officialStatements.insuranceIntimationDraft,
                          'insurance'
                        )
                      }
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                    >
                      {copiedDraft === 'insurance' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Intimation
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative flex-1">
                    <textarea
                      readOnly
                      rows={12}
                      value={analysisResult.officialStatements.insuranceIntimationDraft}
                      className="w-full h-full min-h-[250px] p-3.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px] text-slate-800 focus:outline-none leading-relaxed resize-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Send via your registered policyholder email or submit through your insurer's official claims web portal immediately.
                  </p>
                </div>
              )}

              {/* Sub-tab 4: Evidence Needed */}
              {activeOutputTab === 'evidence' && (
                <div className="space-y-3 text-xs flex-1 animate-fadeIn">
                  <span className="font-bold text-slate-900 text-sm block">
                    Custom Evidence Required for this Collision:
                  </span>
                  <div className="space-y-2">
                    {analysisResult.evidenceChecklist.map((ev, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-slate-200 bg-white space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{ev.item}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              ev.importance === 'essential'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {ev.importance.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-slate-600">{ev.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-bold text-slate-800">
                  Ready for Incident Legal Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in the incident details on the left and click "Generate Action Plan" to produce tailored police statements, insurance notices, and legal strategies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
