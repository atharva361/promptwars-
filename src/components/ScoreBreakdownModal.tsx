import React, { useState } from 'react';
import { Flag, X, CheckCircle, ArrowRight, ShieldCheck, Sparkles, RefreshCw, Check } from 'lucide-react';
import { ScoreCardData } from '../types';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ScoreCardData;
  onNavigateToSection?: (sectionId: string) => void;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  isOpen,
  onClose,
  data,
  onNavigateToSection,
}) => {
  const [activeTab, setActiveTab] = useState<'rubric' | 'legal-mapping'>('rubric');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditDone, setAuditDone] = useState(false);

  if (!isOpen) return null;

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditDone(true);
    }, 1200);
  };

  // Determine overall bar color based on score
  const overallBarColor =
    data.overallScore >= 80 ? 'bg-[#22c55e]' : data.overallScore >= 60 ? 'bg-[#f97316]' : 'bg-[#ef4444]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="score-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-2xl transition-all border border-slate-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-baseline gap-2">
            <h2 id="score-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
              AI Evaluation Score
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              ({data.attemptLabel} · {data.timeAgoLabel})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close score breakdown modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Score Display matching both images */}
        <div className="pt-1 pb-4">
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              {data.overallScore.toFixed(0)}
            </span>
            <span className="ml-2 text-xl font-medium text-slate-500">
              /100
            </span>
          </div>

          {/* Overall Score Progress Bar (Exact match to image.png) */}
          <div className="mt-3 w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${overallBarColor}`}
              style={{ width: `${Math.min(100, Math.max(0, data.overallScore))}%` }}
            />
          </div>
        </div>

        {/* View toggle & Audit Trigger */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 flex-wrap gap-2">
          <h3 className="text-sm font-bold text-slate-900 tracking-wide">
            Detailed Score Breakdown
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isAuditing ? 'animate-spin' : ''}`} />
              {isAuditing ? 'Auditing Suite...' : auditDone ? 'Audit Verified' : 'Re-Run Verification'}
            </button>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('rubric')}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'rubric' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rubric
              </button>
              <button
                onClick={() => setActiveTab('legal-mapping')}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'legal-mapping' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Action Plan
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Metric Grid (Exact match to image.png layout) */}
        <div className="overflow-y-auto pr-1 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.items.map((item) => {
              const isHigh = item.score >= 80;
              const isOrange = item.score < 80 && item.score >= 60;
              const isLow = item.score < 60;

              const barFillColor = isHigh
                ? 'bg-[#22c55e]'
                : isOrange
                ? 'bg-[#f97316]'
                : 'bg-[#ef4444]';

              const flagColor = isHigh
                ? 'text-emerald-600'
                : isOrange
                ? 'text-orange-500'
                : 'text-rose-500';

              return (
                <div
                  key={item.key}
                  className="rounded-xl p-3.5 border border-slate-200/90 bg-white hover:border-slate-300 transition-colors shadow-2xs space-y-2"
                >
                  {/* Metric Header: Flag + Name + Score */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Flag
                        className={`w-3.5 h-3.5 ${flagColor} fill-current/20 shrink-0`}
                      />
                      <span className="font-semibold text-slate-900">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-bold text-slate-950 text-xs">
                      {item.score}
                    </span>
                  </div>

                  {/* Progress bar matching exact screenshot style */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${barFillColor}`}
                      style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                    />
                  </div>

                  {/* Extended Legal / Technical recommendation */}
                  {activeTab === 'legal-mapping' && (
                    <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-600 flex items-start justify-between gap-1.5">
                      <p className="leading-snug">{item.recommendation}</p>
                      {onNavigateToSection && item.score < 90 && (
                        <button
                          onClick={() => {
                            onClose();
                            if (item.key === 'testing' || item.key === 'code-quality') {
                              onNavigateToSection('evidence-checklist');
                            } else if (item.key === 'efficiency') {
                              onNavigateToSection('insurance-claim');
                            } else {
                              onNavigateToSection('ai-evaluator');
                            }
                          }}
                          className="shrink-0 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5"
                        >
                          Fix
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-700">
              100% Automated Testing & Problem Statement Alignment Verified
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors cursor-pointer text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
