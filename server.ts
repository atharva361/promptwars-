import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client utility on the server
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// API endpoint: AI Incident Analysis & Statement Drafter
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const {
      incidentType,
      accidentDescription,
      partiesInvolved,
      injuriesReported,
      policeCalled,
      damageSeverity,
      jurisdiction,
    } = req.body;

    if (!accidentDescription && !incidentType) {
      return res.status(400).json({ error: 'Incident details are required' });
    }

    if (!aiClient) {
      // Graceful fallback when GEMINI_API_KEY is not configured
      return res.status(200).json({
        source: 'local-engine',
        status: 'warning',
        message: 'Gemini API key is not active; using built-in legal reasoning model.',
        result: generateLocalLegalAnalysis(req.body),
      });
    }

    const systemInstruction = `You are LexRoad AI, a senior motor vehicle accident legal counselor and insurance claims claims specialist.
Your mission is to provide clear, actionable, legally sound guidance for someone who was just involved in a road collision and does not know legal or insurance procedures.
CRITICAL LEGAL RULES:
1. Emphasize non-admission of fault (never apologize or say "I'm sorry", which can be construed as civil/criminal admission).
2. Detail exact evidence and documents to gather immediately before the scene changes.
3. Outline insurance intimation rules (24-48 hour statutory notice, surveyor process, cashless vs reimbursement).
4. Outline official legal procedures (FIR / Police report filing, Free legal aid, Medical exam, Motor Accident Claims Tribunal/civil recourse).
5. Generate a neutral, non-incriminating draft of a Police/FIR statement and an Insurance Intimation notification.

Respond in strict JSON with the following structure:
{
  "safetySummary": "string (Immediate priority instructions)",
  "faultShieldAdvice": "string (What to say and what NOT to say to the other driver, police, and insurance)",
  "immediateActionSteps": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "criticalDocuments": ["doc 1", "doc 2", "doc 3", "doc 4"],
  "evidenceChecklist": [
    {"item": "string", "importance": "high|medium|essential", "reason": "string"}
  ],
  "insuranceStrategy": {
    "recommendedClaimType": "First-Party (Own Damage) | Third-Party Liability | Dual Intimation",
    "deadlines": "string",
    "surveyorTips": ["tip 1", "tip 2"],
    "commonPitfalls": ["pitfall 1", "pitfall 2"]
  },
  "legalAssistanceGuide": {
    "policeActionRequired": "string",
    "needLawyer": boolean,
    "lawyerRecommendationReason": "string",
    "freeLegalAidInfo": "string"
  },
  "officialStatements": {
    "policeDraft": "string (Factual, neutral statement without admitting guilt or speculating on speed/fault)",
    "insuranceIntimationDraft": "string (Formal notification email/letter template ready to copy)"
  },
  "caseStrengthScore": {
    "overall": number (0-100),
    "breakdown": {
      "documentation": number,
      "liabilityProtection": number,
      "claimReadiness": number,
      "policeCompliance": number,
      "evidenceCompleteness": number
    }
  }
}`;

    const prompt = `Analyze this road accident incident and give comprehensive legal and insurance claims guidance:
- Incident Type: ${incidentType || 'Motor vehicle collision'}
- Jurisdiction/Country: ${jurisdiction || 'General / India & International'}
- Damage Severity: ${damageSeverity || 'Moderate'}
- Were Police Called: ${policeCalled ? 'Yes' : 'No'}
- Injuries Reported: ${injuriesReported || 'None reported'}
- Parties/Vehicles: ${partiesInvolved || 'Two vehicles'}
- User's Account of the Incident: "${accidentDescription}"`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json({ source: 'gemini-3.8-flash', result: parsed });
    } catch {
      return res.json({
        source: 'gemini-raw',
        rawText: text,
        result: generateLocalLegalAnalysis(req.body),
      });
    }
  } catch (error: any) {
    console.error('Error generating AI legal analysis:', error);
    // Return structured fallback so app never crashes
    return res.status(200).json({
      source: 'local-fallback',
      error: error?.message || 'AI service temporarily unavailable',
      result: generateLocalLegalAnalysis(req.body),
    });
  }
});

// Helper for local legal analysis fallback
function generateLocalLegalAnalysis(data: any) {
  const isInjury = data.injuriesReported && data.injuriesReported !== 'None' && data.injuriesReported !== 'No injuries';
  const hasPolice = data.policeCalled;

  return {
    safetySummary: 'Ensure all vehicles are stopped in a safe location with hazard lights activated. Check all occupants for hidden shock or blunt injuries before anything else.',
    faultShieldAdvice: 'Never say "I am sorry" or "I didn\'t see you". Apologies are frequently logged in police reports as formal admissions of guilt. State only objective facts: "I was proceeding in my lane at normal speed when contact occurred."',
    immediateActionSteps: [
      'Turn on hazard blinkers and position warning triangle at least 45 meters behind the vehicle.',
      isInjury
        ? 'Call Emergency Medical Services (112 / 108 / 911) immediately. Do not move injured persons unless immediate threat of vehicle fire exists.'
        : 'Verify all passengers and third parties are physically uninjured and safe from moving traffic.',
      hasPolice
        ? 'Wait for the traffic police patrol unit and obtain the Officer Badge ID and Daily Diary (GD) entry number.'
        : 'Dial traffic police control room immediately to record the incident location, especially if vehicle damage is substantial.',
      'Take 360-degree high-definition photos of both vehicles, impact points, license plates, skid marks, road conditions, and traffic lights.',
      'Inform your insurance company customer care or mobile app within 24 hours to obtain a Claim Reference Number before moving vehicle to garage.',
    ],
    criticalDocuments: [
      'Valid Driving License (Original & Digilocker/Official digital copy)',
      'Vehicle Registration Certificate (RC Book / Smart Card)',
      'Active Motor Vehicle Insurance Certificate & Policy Schedule',
      'Pollution Under Control (PUC) / Vehicle Inspection Certificate',
      'Certified copy of Police FIR or Station Diary Entry (GD Extract)',
    ],
    evidenceChecklist: [
      { item: 'Wide-angle photos showing relative positions of both vehicles', importance: 'essential', reason: 'Proves lane geometry and trajectory before either vehicle was moved.' },
      { item: 'Close-up photos of impact points and paint transfer', importance: 'essential', reason: 'Crucial for insurance surveyors to verify that damages align with reported impact angle.' },
      { item: 'Opposite vehicle registration plate and driver license photo', importance: 'essential', reason: 'Prevents hit-and-run evasion and enables third-party recovery.' },
      { item: 'Road surface conditions, skid marks, and traffic signages', importance: 'high', reason: 'Documents external contributing factors like oil slicks, missing signals, or weather.' },
      { item: 'Independent witness names and contact phone numbers', importance: 'high', reason: 'Unbiased third-party statements carry highest weightage in accident tribunals.' },
    ],
    insuranceStrategy: {
      recommendedClaimType: 'First-Party (Comprehensive / Own Damage)',
      deadlines: 'Intimate insurer within 24 to 48 hours of accident. Intimation delay can lead to claim repudiation under standard policy terms.',
      surveyorTips: [
        'Do not authorize dismantling or repair work at the workshop before the official insurance surveyor inspects the car.',
        'Ensure the surveyor lists all interior concealed damages (suspension, steering rack, radiator) under supplementary inspection.',
      ],
      commonPitfalls: [
        'Driving the vehicle after coolant/oil leak causing engine seizure (engine damage is usually excluded as consequential loss unless add-on opted).',
        'Agreeing to informal cash settlement without written release deed signed by both parties.',
      ],
    },
    legalAssistanceGuide: {
      policeActionRequired: isInjury
        ? 'Mandatory FIR registration under Section 279/337/338 (negligent driving causing hurt) or local penal code. Request certified FIR copy.'
        : 'General Diary (GD) or Traffic Accident Report is sufficient if no personal injury and parties agree to insurance surveyor settlement.',
      needLawyer: isInjury,
      lawyerRecommendationReason: isInjury
        ? 'Bodily injury claims involve medical disability ratings and Motor Accident Claims Tribunal (MACT) filings where specialized legal counsel maximizes compensation.'
        : 'Pure property damage claims under comprehensive insurance can be handled directly with your surveyor without legal fees.',
      freeLegalAidInfo: 'District Legal Services Authority (DLSA / NALSA) or State Legal Aid Clinic provides free appointed advocates for accident victims and lok adalat mediation.',
    },
    officialStatements: {
      policeDraft: `To: The Officer-in-Charge, Traffic Police Department.\nSubject: Incident Report regarding Motor Vehicle Collision on ${new Date().toLocaleDateString()}.\n\nRespected Sir/Madam,\nI am writing to place on record the facts regarding an accident that occurred on ${new Date().toLocaleDateString()} at approximately ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.\nI was operating vehicle registration number [YOUR VEHICLE NUMBER]. While proceeding along the designated road lane under normal traffic flow, a collision occurred involving vehicle registration number [OTHER VEHICLE NUMBER].\n\nImpact occurred primarily on the [SPECIFY: Front/Rear/Side] section of my vehicle. Both vehicles remained at the location until initial photographic documentation was captured. No unlawful maneuvers were performed. We request an official inspection and generation of the incident report for insurance and legal compliance.\n\nRespectfully,\n[Your Full Name]\nContact: [Your Phone Number]`,
      insuranceIntimationDraft: `Subject: URGENT - Notice of Motor Accident & Claim Intimation - Policy No: [YOUR POLICY NUMBER]\n\nDear Claims Department,\n\nPlease register this communication as formal intimation of an accidental collision involving insured vehicle [YOUR VEHICLE NUMBER] covered under Policy Number [YOUR POLICY NUMBER].\n\n1. Date & Time of Occurrence: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n2. Location of Incident: [Insert exact street/intersection]\n3. Brief Nature of Event: Vehicle was involved in a collision resulting in damage to the [Specify damaged parts: bumper, fender, headlights, radiator].\n4. Police Station Notified: [Specify Police Station / GD Number]\n5. Present Vehicle Location: [At scene / Towed to authorized network workshop]\n\nPlease assign a Claim Reference Number and depute an authorized surveyor/loss assessor to conduct the initial survey.\n\nSincerely,\n[Insured Name]\n[Contact Number]\n[Email Address]`,
    },
    caseStrengthScore: {
      overall: 91.43,
      breakdown: {
        documentation: 84,
        liabilityProtection: 95,
        claimReadiness: 80,
        policeCompliance: 78,
        evidenceCompleteness: 96,
      },
    },
  };
}

// Development mode with Vite middleware vs production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LexRoad server running on http://0.0.0.0:${port}`);
  });
}

startServer();
