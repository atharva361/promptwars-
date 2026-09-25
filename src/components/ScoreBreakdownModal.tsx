import React, { useState } from 'react';
import { Flag, X, CheckCircle, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-2xl transition-all border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching exact photo */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {data.attemptLabel}
            </h2>
            <span className="text-sm text-slate-500">
              ({data.timeAgoLabel})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close score breakdown modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Score Display matching photo */}
        <div className="pt-1 pb-5">
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-extrabold text-[#1a56db] tracking-tight">
              {data.overallScore.toFixed(2)}
            </span>
            <span className="ml-2 text-xl font-medium text-slate-600">
              /100
            </span>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 tracking-wide">
            Detailed Score Breakdown
          </h3>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                activeTab === 'rubric' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Evaluation Rubric
            </button>
            <button
              onClick={() => setActiveTab('legal-mapping')}
              className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                activeTab === 'legal-mapping' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Legal & Claim Action
            </button>
          </div>
        </div>

        {/* Scrollable Metric Rows matching photo */}
        <div className="overflow-y-auto pr-1 space-y-4 flex-1">
          {data.items.map((item) => {
            const isOrange = item.score < 80;
            const barFillColor = isOrange ? 'bg-[#f97316]' : 'bg-[#22c55e]';
            const flagColor = isOrange ? 'text-orange-500' : 'text-emerald-600';

            return (
              <div
                key={item.key}
                className="group rounded-xl p-3 border border-slate-100 hover:border-slate-200 transition-colors bg-white hover:bg-slate-50/50"
              >
                {/* Metric Header: Flag + Name + Score */}
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Flag
                      className={`w-4 h-4 ${flagColor} fill-current/20 transition-transform group-hover:scale-110`}
                    />
                    <span className="font-semibold text-slate-800">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">
                    {item.score}
                  </span>
                </div>

                {/* Progress bar matching exact screenshot style */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-700 ${barFillColor}`}
                    style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                  />
                </div>

                {/* Extended Legal / Technical recommendation when toggled or expanded */}
                {activeTab === 'legal-mapping' && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600 flex items-start justify-between gap-2">
                    <p className="leading-relaxed">
                      <span className="font-medium text-slate-700">Recommendation:</span>{' '}
                      {item.recommendation}
                    </p>
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
                        className="shrink-0 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      >
                        Fix Now
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer with summary and export */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Passed 7/7 core legal verification checkpoints</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
