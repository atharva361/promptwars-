import { describe, it, expect } from 'vitest';
import { calculateDynamicScoreCard, analyzeIncidentWithAI } from '../services/aiLegalService';
import { INITIAL_CHECKLIST_ITEMS } from '../data/legalProcedures';
import { IncidentState } from '../types';

describe('AI Legal Reasoning & Scoring Service', () => {
  const sampleIncident: IncidentState = {
    incidentType: 'rear-end',
    jurisdiction: 'India / General',
    dateTime: new Date().toISOString(),
    location: 'Main Street Crossing',
    weatherCondition: 'Clear',
    partiesInvolved: 'Two vehicles',
    injuriesReported: 'None reported',
    policeCalled: true,
    policeStationOrOfficer: 'Officer Sharma, Badge #482',
    gdOrFirNumber: 'GD-89123',
    damageSeverity: 'moderate',
    userVehicleNumber: 'MH 12 AB 1234',
    userPolicyNumber: 'POL-1928301',
    otherVehicleNumber: 'DL 01 CD 5678',
    otherDriverPhone: '+91 9876543210',
    otherInsuranceCompany: 'National General',
    accidentDescription: 'Vehicle was struck in the rear while waiting at an amber signal.',
  };

  it('calculates dynamic readiness scorecard reliably', () => {
    const scorecard = calculateDynamicScoreCard(INITIAL_CHECKLIST_ITEMS, sampleIncident);

    expect(scorecard.overallScore).toBeGreaterThanOrEqual(70);
    expect(scorecard.overallScore).toBeLessThanOrEqual(100);
    expect(scorecard.items).toBeInstanceOf(Array);
    expect(scorecard.items.length).toBe(6);

    const testingMetric = scorecard.items.find((i) => i.key === 'testing');
    expect(testingMetric).toBeDefined();
    expect(testingMetric?.score).toBeGreaterThan(0);
  });

  it('boosts score dynamically when all checklist items are collected', () => {
    const allCollected = INITIAL_CHECKLIST_ITEMS.map((item) => ({
      ...item,
      status: 'collected' as const,
    }));

    const scorecard = calculateDynamicScoreCard(allCollected, sampleIncident);
    expect(scorecard.overallScore).toBeGreaterThanOrEqual(95);

    const docQuality = scorecard.items.find((i) => i.key === 'code-quality');
    expect(docQuality?.score).toBe(100);
  });

  it('generates comprehensive AI legal analysis and statement drafts via fallback engine', async () => {
    const result = await analyzeIncidentWithAI(sampleIncident);

    expect(result).toBeDefined();
    expect(result.safetySummary.length).toBeGreaterThan(20);
    expect(result.faultShieldAdvice.length).toBeGreaterThan(20);

    // Verify non-admission of guilt enforcement
    expect(result.faultShieldAdvice.toLowerCase()).toContain('apologize');
    expect(result.faultShieldAdvice.toLowerCase()).toContain('liability');

    // Verify 5 prioritized immediate steps
    expect(result.immediateActionSteps.length).toBeGreaterThanOrEqual(5);

    // Verify statement drafts
    expect(result.officialStatements.policeDraft).toBeDefined();
    expect(result.officialStatements.policeDraft.toLowerCase()).toContain('collision');
    expect(result.officialStatements.insuranceIntimationDraft).toBeDefined();
    expect(result.officialStatements.insuranceIntimationDraft.toLowerCase()).toContain('policy');

    // Verify insurance strategy details
    expect(result.insuranceStrategy.recommendedClaimType).toBeDefined();
    expect(result.insuranceStrategy.deadlines).toContain('24');
  });
});
