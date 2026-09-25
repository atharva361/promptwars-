import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  MinusCircle,
  Camera,
  Image as ImageIcon,
  FileCheck,
  Download,
  Filter,
  Trash2,
  Edit3,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { ChecklistItem, EvidenceCategory } from '../types';

interface EvidenceChecklistProps {
  items: ChecklistItem[];
  onUpdateItemStatus: (id: string, newStatus: 'collected' | 'pending' | 'na') => void;
  onUpdateItemNotes: (id: string, notes: string) => void;
  onAttachItemPhoto: (id: string, photoDataUrl: string) => void;
  onRemoveItemPhoto: (id: string) => void;
  onOpenScoreModal?: () => void;
}

export const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  items,
  onUpdateItemStatus,
  onUpdateItemNotes,
  onAttachItemPhoto,
  onRemoveItemPhoto,
  onOpenScoreModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EvidenceCategory | 'all'>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);

  const categories: Array<{ id: EvidenceCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Evidence' },
    { id: 'identity-docs', label: 'Identity & RC' },
    { id: 'scene-photos', label: 'Scene Photos' },
    { id: 'other-party', label: 'Other Driver' },
    { id: 'official-police', label: 'Police & Towing' },
    { id: 'medical-records', label: 'Medical' },
  ];

  const filteredItems = items.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const collectedCount = items.filter((i) => i.status === 'collected').length;
  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const totalRelevant = items.filter((i) => i.status !== 'na').length;
  const completionPercentage = totalRelevant > 0 ? Math.round((collectedCount / totalRelevant) * 100) : 0;

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAttachItemPhoto(id, event.target.result as string);
          onUpdateItemStatus(id, 'collected');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Progress Counter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <span>Section 02</span>
              <span>·</span>
              <span>Evidence Preservation Vault</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Essential Documents & Photographic Evidence Checklist
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Insurance companies and accident claims tribunals strictly evaluate contemporaneously gathered physical evidence. Check off each item as you collect it.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrintDossier}
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export Dossier / Print
            </button>
            {onOpenScoreModal && (
              <button
                onClick={onOpenScoreModal}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                View Case Strength ({completionPercentage}%)
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
            <span>
              Evidence Collection Status: <strong className="text-slate-900">{collectedCount} of {totalRelevant}</strong> items secured
            </span>
            <span className="font-bold text-blue-600">{completionPercentage}% Ready</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                completionPercentage >= 80 ? 'bg-emerald-500' : completionPercentage >= 50 ? 'bg-blue-600' : 'bg-amber-500'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Collected ({collectedCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Pending Action ({pendingCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              Not Applicable ({items.filter((i) => i.status === 'na').length})
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Checklist items list */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isCollected = item.status === 'collected';
          const isPending = item.status === 'pending';
          const isNA = item.status === 'na';

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all p-4 md:p-5 bg-white ${
                isCollected
                  ? 'border-emerald-200 bg-emerald-50/15'
                  : isPending
                  ? 'border-slate-200 hover:border-slate-300'
                  : 'border-slate-100 bg-slate-50/60 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {/* Status Indicator / Check button */}
                  <button
                    onClick={() =>
                      onUpdateItemStatus(
                        item.id,
                        isCollected ? 'pending' : 'collected'
                      )
                    }
                    className="mt-0.5 shrink-0 text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer"
                    title={isCollected ? 'Mark as Pending' : 'Mark as Collected'}
                  >
                    {isCollected ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : isPending ? (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-emerald-500 transition-colors" />
                    ) : (
                      <MinusCircle className="w-6 h-6 text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-sm md:text-base font-bold text-slate-900 ${
                          isCollected ? 'line-through decoration-emerald-500/40' : ''
                        }`}
                      >
                        {item.title}
                      </h3>
                      {item.legalImportance === 'critical' && (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                          Legally Critical
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>

                    {/* Notes display or editor */}
                    {item.notes && editingNotesId !== item.id && (
                      <div className="mt-2 text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 flex items-start justify-between gap-2">
                        <span className="italic leading-relaxed">{item.notes}</span>
                        <button
                          onClick={() => {
                            setEditingNotesId(item.id);
                            setTempNotes(item.notes || '');
                          }}
                          className="text-slate-400 hover:text-slate-700 shrink-0"
                          title="Edit note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {editingNotesId === item.id && (
                      <div className="mt-2 space-y-1.5">
                        <textarea
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Type on-scene details (e.g., license numbers, witness phone, street names)..."
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={2}
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onUpdateItemNotes(item.id, tempNotes);
                              setEditingNotesId(null);
                            }}
                            className="px-2.5 py-1 bg-slate-900 text-white rounded-md text-xs font-medium"
                          >
                            Save Note
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Attached Photo Preview */}
                    {item.photoUrl && (
                      <div className="mt-3 flex items-center gap-3">
                        <div
                          onClick={() => setPreviewPhotoUrl(item.photoUrl || null)}
                          className="relative group cursor-pointer w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-2xs"
                        >
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                        <div className="text-xs text-slate-600 space-y-0.5">
                          <span className="font-medium text-slate-800 block">Evidence image attached</span>
                          <button
                            onClick={() => onRemoveItemPhoto(item.id)}
                            className="text-rose-600 hover:text-rose-800 text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                  {/* Status dropdown / segmented toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
                    <button
                      onClick={() => onUpdateItemStatus(item.id, 'collected')}
                      className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        isCollected ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Collected
                    </button>
                    <button
                      onClick={() => onUpdateItemStatus(item.id, 'pending')}
                      className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        isPending ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => onUpdateItemStatus(item.id, 'na')}
                      className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        isNA ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      N/A
                    </button>
                  </div>

                  {/* Add note button */}
                  {!item.notes && editingNotesId !== item.id && (
                    <button
                      onClick={() => {
                        setEditingNotesId(item.id);
                        setTempNotes('');
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                      title="Add notes"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Photo Upload label/input */}
                  <label
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                    title="Attach photo or document image"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => handleFileUpload(item.id, e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Photo Preview */}
      {previewPhotoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewPhotoUrl(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={previewPhotoUrl}
              alt="Evidence Full Preview"
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            <button
              onClick={() => setPreviewPhotoUrl(null)}
              className="absolute -top-3 -right-3 rounded-full bg-white p-1 text-slate-800 shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
