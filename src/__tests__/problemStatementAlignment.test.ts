import { describe, it, expect } from 'vitest';
import { INITIAL_CHECKLIST_ITEMS, EMERGENCY_NUMBERS, SAFE_STATEMENT_SCRIPTS } from '../data/legalProcedures';
import { analyzeIncidentWithAI } from '../services/aiLegalService';

describe('Problem Statement Alignment Verification', () => {
  it('Pillar 1: Explains basic steps after an accident', () => {
    // Verifies Golden 15 Minutes protocols, safe statement scripts, and emergency contacts
    expect(SAFE_STATEMENT_SCRIPTS.length).toBeGreaterThan(0);
    expect(EMERGENCY_NUMBERS.length).toBeGreaterThan(0);

    const hasNoAdmissionOfFault = SAFE_STATEMENT_SCRIPTS.some((s) =>
      s.whyDangerous.toLowerCase().includes('fault') || s.whyDangerous.toLowerCase().includes('liability')
    );
    expect(hasNoAdmissionOfFault).toBe(true);
  });

  it('Pillar 2: Lists documents and evidence to collect', () => {
    const requiredDocs = INITIAL_CHECKLIST_ITEMS.filter((i) => i.category === 'identity-docs');
    const scenePhotos = INITIAL_CHECKLIST_ITEMS.filter((i) => i.category === 'scene-photos');
    const witnessItems = INITIAL_CHECKLIST_ITEMS.filter((i) => i.category === 'other-party');
    const policeItems = INITIAL_CHECKLIST_ITEMS.filter((i) => i.category === 'official-police');

    expect(requiredDocs.length).toBeGreaterThan(0);
    expect(scenePhotos.length).toBeGreaterThan(0);
    expect(witnessItems.length).toBeGreaterThan(0);
    expect(policeItems.length).toBeGreaterThan(0);
  });

  it('Pillar 3: Explains insurance-claim procedures', async () => {
    const aiResult = await analyzeIncidentWithAI({
      incidentType: 'rear-end',
      jurisdiction: 'India / General',
      dateTime: new Date().toISOString(),
      location: 'Test Highway',
      weatherCondition: 'Dry',
      partiesInvolved: '2',
      injuriesReported: 'None',
      policeCalled: true,
      policeStationOrOfficer: 'City Station',
      gdOrFirNumber: 'GD-1234',
      damageSeverity: 'moderate',
      userVehicleNumber: 'TEST-123',
      userPolicyNumber: 'POL-123',
      otherVehicleNumber: 'OTHER-456',
      otherDriverPhone: '',
      otherInsuranceCompany: '',
      accidentDescription: 'Minor collision at light',
    });

    expect(aiResult.insuranceStrategy).toBeDefined();
    expect(aiResult.insuranceStrategy.recommendedClaimType).toBeDefined();
    expect(aiResult.insuranceStrategy.surveyorTips.length).toBeGreaterThan(0);
    expect(aiResult.officialStatements.insuranceIntimationDraft.length).toBeGreaterThan(50);
  });

  it('Pillar 4: Guides toward appropriate legal/official assistance', async () => {
    const aiResult = await analyzeIncidentWithAI({
      incidentType: 'hit-and-run',
      jurisdiction: 'General',
      dateTime: new Date().toISOString(),
      location: 'Test Street',
      weatherCondition: 'Clear',
      partiesInvolved: '1 unknown',
      injuriesReported: 'Hospitalization trauma',
      policeCalled: true,
      policeStationOrOfficer: 'Local Precinct',
      gdOrFirNumber: 'FIR-001',
      damageSeverity: 'severe',
      userVehicleNumber: '',
      userPolicyNumber: '',
      otherVehicleNumber: '',
      otherDriverPhone: '',
      otherInsuranceCompany: '',
      accidentDescription: 'Hit by speeding vehicle that fled scene',
    });

    expect(aiResult.legalAssistanceGuide).toBeDefined();
    expect(aiResult.legalAssistanceGuide.needLawyer).toBe(true);
    expect(aiResult.legalAssistanceGuide.policeActionRequired).toContain('FIR');
    expect(aiResult.legalAssistanceGuide.freeLegalAidInfo).toBeDefined();
  });
});
