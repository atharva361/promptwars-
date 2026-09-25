export type IncidentType =
  | 'rear-end'
  | 'intersection-t-bone'
  | 'head-on'
  | 'sideswipe'
  | 'pedestrian-cyclist'
  | 'hit-and-run'
  | 'single-vehicle-barrier'
  | 'parking-lot-scrape'
  | 'other';

export type DamageSeverity = 'minor' | 'moderate' | 'severe' | 'total-loss';

export interface IncidentState {
  incidentType: IncidentType;
  jurisdiction: string;
  dateTime: string;
  location: string;
  weatherCondition: string;
  partiesInvolved: string;
  injuriesReported: string;
  policeCalled: boolean;
  policeStationOrOfficer: string;
  gdOrFirNumber: string;
  damageSeverity: DamageSeverity;
  userVehicleNumber: string;
  userPolicyNumber: string;
  otherVehicleNumber: string;
  otherDriverPhone: string;
  otherInsuranceCompany: string;
  accidentDescription: string;
}

export type EvidenceCategory =
  | 'identity-docs'
  | 'scene-photos'
  | 'other-party'
  | 'official-police'
  | 'medical-records'
  | 'repair-costs';

export interface ChecklistItem {
  id: string;
  category: EvidenceCategory;
  title: string;
  description: string;
  legalImportance: 'critical' | 'recommended' | 'optional';
  status: 'collected' | 'pending' | 'na';
  notes?: string;
  photoUrl?: string;
}

export interface ScoreBreakdownItem {
  key: string;
  name: string;
  score: number;
  maxScore: number;
  flagColor: 'emerald' | 'amber' | 'rose' | 'blue';
  recommendation: string;
}

export interface ScoreCardData {
  attemptLabel: string;
  timeAgoLabel: string;
  overallScore: number;
  items: ScoreBreakdownItem[];
}

export interface AiAnalysisResult {
  safetySummary: string;
  faultShieldAdvice: string;
  immediateActionSteps: string[];
  criticalDocuments: string[];
  evidenceChecklist: Array<{
    item: string;
    importance: 'high' | 'medium' | 'essential';
    reason: string;
  }>;
  insuranceStrategy: {
    recommendedClaimType: string;
    deadlines: string;
    surveyorTips: string[];
    commonPitfalls: string[];
  };
  legalAssistanceGuide: {
    policeActionRequired: string;
    needLawyer: boolean;
    lawyerRecommendationReason: string;
    freeLegalAidInfo: string;
  };
  officialStatements: {
    policeDraft: string;
    insuranceIntimationDraft: string;
  };
  caseStrengthScore?: {
    overall: number;
    breakdown: {
      documentation: number;
      liabilityProtection: number;
      claimReadiness: number;
      policeCompliance: number;
      evidenceCompleteness: number;
    };
  };
}
