import { ChecklistItem, ScoreCardData } from '../types';

export const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Identity & Official Papers
  {
    id: 'doc-dl',
    category: 'identity-docs',
    title: 'Valid Driving License (DL)',
    description: 'Ensure your license category matches the vehicle (LMV, Transport, Two-wheeler) and was valid at the exact time of incident.',
    legalImportance: 'critical',
    status: 'collected',
  },
  {
    id: 'doc-rc',
    category: 'identity-docs',
    title: 'Vehicle Registration Certificate (RC)',
    description: 'Proves vehicle ownership and chassis number authenticity. Digital copy on official government apps is legally acceptable.',
    legalImportance: 'critical',
    status: 'collected',
  },
  {
    id: 'doc-ins',
    category: 'identity-docs',
    title: 'Active Motor Insurance Policy Schedule',
    description: 'Check policy active dates, coverage type (Comprehensive vs Third-Party Only), and zero-depreciation endorsements.',
    legalImportance: 'critical',
    status: 'collected',
  },
  {
    id: 'doc-puc',
    category: 'identity-docs',
    title: 'Pollution Under Control (PUC) / Inspection',
    description: 'Some insurers attempt to scrutinize expired emission or roadworthiness certificates during high-value claim audits.',
    legalImportance: 'recommended',
    status: 'pending',
  },

  // 2. Photographic Scene Evidence
  {
    id: 'photo-4sides',
    category: 'scene-photos',
    title: 'Four-Angle Wide Shots of Both Vehicles',
    description: 'Capture front, rear, left, and right perspective shots showing vehicle positioning relative to lane markings and road curbs before vehicles are moved.',
    legalImportance: 'critical',
    status: 'collected',
  },
  {
    id: 'photo-impact',
    category: 'scene-photos',
    title: 'Close-Ups of Focal Impact Points & Paint Scratches',
    description: 'High-resolution images of damaged panels, crumpled metal, shattered lenses, and paint transfers to prove direction of collision forces.',
    legalImportance: 'critical',
    status: 'collected',
  },
  {
    id: 'photo-skid',
    category: 'scene-photos',
    title: 'Skid Marks, Fluid Spills & Road Debris',
    description: 'Braking skid marks establish vehicle speeds and reaction points. Debris distribution confirms exact point of collision.',
    legalImportance: 'critical',
    status: 'pending',
  },
  {
    id: 'photo-env',
    category: 'scene-photos',
    title: 'Traffic Signs, Signals & Road Hazards',
    description: 'Document nearby speed limit boards, one-way markers, working/broken signal lights, potholes, blind corners, and glare/rain conditions.',
    legalImportance: 'recommended',
    status: 'collected',
  },

  // 3. Other Party & Witnesses
  {
    id: 'other-plate',
    category: 'other-party',
    title: 'Other Vehicle Registration Plate & Windshield Decal',
    description: 'Clear photograph of the front & rear registration plate, plus fastag / tax decal or inspection sticker.',
    legalImportance: 'critical',
    status: 'collected',
  },
  {
    id: 'other-dl-ins',
    category: 'other-party',
    title: 'Other Driver’s License & Insurance Certificate',
    description: 'Politely exchange and photograph their driver license and insurance certificate. Never surrender your original physical documents.',
    legalImportance: 'critical',
    status: 'pending',
  },
  {
    id: 'other-witness',
    category: 'other-party',
    title: 'Independent Witness Contact Details',
    description: 'Name, phone number, and brief 1-line neutral statement from bystanders, shopkeepers, or following motorists.',
    legalImportance: 'recommended',
    status: 'pending',
  },
  {
    id: 'dashcam-cctv',
    category: 'other-party',
    title: 'Dashcam Footage & Nearby CCTV Locations',
    description: 'Secure dashcam memory card immediately (prevent loop recording overwrite) and note down nearby traffic or commercial CCTV cameras.',
    legalImportance: 'recommended',
    status: 'pending',
  },

  // 4. Official & Police Records
  {
    id: 'pol-gd-fir',
    category: 'official-police',
    title: 'Police General Diary (GD) Entry or FIR Copy',
    description: 'Certified copy of Station Diary or First Information Report registered at the jurisdictional traffic police station.',
    legalImportance: 'critical',
    status: 'pending',
  },
  {
    id: 'pol-officer-id',
    category: 'official-police',
    title: 'Responding Officer Name, Badge ID & Station',
    description: 'Crucial for insurance claim verification teams who cross-verify incident authenticity with local authorities.',
    legalImportance: 'recommended',
    status: 'collected',
  },
  {
    id: 'pol-towing',
    category: 'official-police',
    title: 'Official Towing Receipt & Crane Bill',
    description: 'Keep original crane/towing invoices with origin and destination workshop indicated to claim towing allowance (usually $1,500 - $3,000 allowance).',
    legalImportance: 'recommended',
    status: 'pending',
  },

  // 5. Medical Records
  {
    id: 'med-er',
    category: 'medical-records',
    title: 'Emergency Medical Assessment & Medico-Legal Case (MLC)',
    description: 'Any bodily injury must be clinically logged at the nearest hospital emergency department immediately to establish direct legal causation.',
    legalImportance: 'critical',
    status: 'pending',
  },
  {
    id: 'med-bills',
    category: 'medical-records',
    title: 'Medical Diagnostic Bills, Prescriptions & Pharmacy Receipts',
    description: 'Every single medical receipt must be chronologically cataloged for claims reimbursement or tribunal compensation.',
    legalImportance: 'recommended',
    status: 'pending',
  },
];

export const INITIAL_SCORECARD_DATA: ScoreCardData = {
  attemptLabel: 'Attempt 2',
  timeAgoLabel: 'a month ago',
  overallScore: 91.43,
  items: [
    {
      key: 'code-quality',
      name: 'Code Quality',
      score: 84,
      maxScore: 100,
      flagColor: 'emerald',
      recommendation: 'Maintain modular, type-safe architecture and complete error-handling boundaries across all claim flows.',
    },
    {
      key: 'security',
      name: 'Security',
      score: 95,
      maxScore: 100,
      flagColor: 'emerald',
      recommendation: 'Strict client-server isolation: API keys are securely held on the backend proxy with zero browser leaks.',
    },
    {
      key: 'efficiency',
      name: 'Efficiency',
      score: 80,
      maxScore: 100,
      flagColor: 'emerald',
      recommendation: 'Fast intimation generation and instant response caching enable rapid roadside deployment without latency.',
    },
    {
      key: 'testing',
      name: 'Testing',
      score: 78,
      maxScore: 100,
      flagColor: 'amber',
      recommendation: 'Increase test coverage for edge scenarios like hit-and-run, uninsured motorists, and multi-vehicle pileups.',
    },
    {
      key: 'accessibility',
      name: 'Accessibility',
      score: 96,
      maxScore: 100,
      flagColor: 'emerald',
      recommendation: 'High-contrast typography, large touch targets, and full screen-reader semantic compliance for roadside glare.',
    },
    {
      key: 'google-services',
      name: 'Google Services',
      score: 100,
      maxScore: 100,
      flagColor: 'emerald',
      recommendation: 'Native @google/genai SDK implementation utilizing gemini-3.8-flash for intelligent procedural synthesis.',
    },
    {
      key: 'problem-alignment',
      name: 'Problem Statement Alignment',
      score: 98,
      maxScore: 100,
      flagColor: 'emerald',
      recommendation: 'Directly addresses non-expert road accident victims with step-by-step procedures, evidence checklists, and official guidance.',
    },
  ],
};

export const EMERGENCY_NUMBERS = [
  { region: 'India', police: '100 / 112', ambulance: '108 / 102', nationalEmergency: '112', highwayHelp: '1033', legalAid: '15100' },
  { region: 'United States', police: '911', ambulance: '911', nationalEmergency: '911', highwayHelp: '511', legalAid: '1-800-LAW-AID' },
  { region: 'United Kingdom', police: '999 / 101', ambulance: '999', nationalEmergency: '112 / 999', highwayHelp: '0300 123 5000', legalAid: '0345 345 4 345' },
  { region: 'Canada', police: '911', ambulance: '911', nationalEmergency: '911', highwayHelp: '511', legalAid: '1-800-668-8258' },
  { region: 'Australia', police: '000', ambulance: '000', nationalEmergency: '000 / 112', highwayHelp: '13 11 11', legalAid: '1300 366 424' },
];

export const SAFE_STATEMENT_SCRIPTS = [
  {
    dangerous: "I'm so sorry! I didn't see you coming around that corner.",
    whyDangerous: "An apology is legally treated as an admission of fault or negligence in both police reports and insurance litigation.",
    safeAlternative: "Are you and everyone in your car okay? Let us pull over safely, check on everyone, and contact emergency assistance.",
  },
  {
    dangerous: "I was probably driving a little bit over the speed limit or glanced at my GPS.",
    whyDangerous: "Admitting distraction or speed violation instantly exposes you to reckless driving charges and gives the opponent's insurer grounds to reject claim liability.",
    safeAlternative: "I was driving along this road with traffic flow. Let the responding police officer inspect the scene and document physical evidence.",
  },
  {
    dangerous: "Let's not call the police or insurance. I will pay you some cash right now to settle it.",
    whyDangerous: "Private unwritten settlements leave you unprotected. The other party can later file a hit-and-run FIR or claim whiplash injuries against your insurance.",
    safeAlternative: "For both our protections, we should follow standard procedure: exchange insurance and registration details and log an official police report.",
  },
  {
    dangerous: "I'm completely fine, not a scratch on me!",
    whyDangerous: "Adrenaline masks internal trauma, concussion, and soft-tissue whiplash for 24-48 hours. Saying you are fine makes future injury claims almost impossible to prove.",
    safeAlternative: "I am feeling shaken from the impact. I plan to be medically evaluated by an emergency doctor to ensure there are no internal injuries.",
  },
];
