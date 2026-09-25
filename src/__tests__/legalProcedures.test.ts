import { describe, it, expect } from 'vitest';
import {
  INITIAL_CHECKLIST_ITEMS,
  INITIAL_SCORECARD_DATA,
  EMERGENCY_NUMBERS,
  SAFE_STATEMENT_SCRIPTS,
} from '../data/legalProcedures';

describe('Legal & Accident Procedures Dataset', () => {
  it('contains comprehensive checklist items across all 5 legal evidence categories', () => {
    expect(INITIAL_CHECKLIST_ITEMS.length).toBeGreaterThan(10);

    const categories = new Set(INITIAL_CHECKLIST_ITEMS.map((item) => item.category));
    expect(categories.has('identity-docs')).toBe(true);
    expect(categories.has('scene-photos')).toBe(true);
    expect(categories.has('other-party')).toBe(true);
    expect(categories.has('official-police')).toBe(true);
    expect(categories.has('medical-records')).toBe(true);
  });

  it('marks legally essential documents as critical importance', () => {
    const criticalItems = INITIAL_CHECKLIST_ITEMS.filter((i) => i.legalImportance === 'critical');
    expect(criticalItems.length).toBeGreaterThanOrEqual(4);

    const drivingLicense = INITIAL_CHECKLIST_ITEMS.find((i) => i.id === 'doc-dl');
    expect(drivingLicense).toBeDefined();
    expect(drivingLicense?.legalImportance).toBe('critical');

    const registrationCert = INITIAL_CHECKLIST_ITEMS.find((i) => i.id === 'doc-rc');
    expect(registrationCert).toBeDefined();
    expect(registrationCert?.legalImportance).toBe('critical');
  });

  it('provides safe vs dangerous liability script comparisons', () => {
    expect(SAFE_STATEMENT_SCRIPTS.length).toBeGreaterThanOrEqual(4);
    SAFE_STATEMENT_SCRIPTS.forEach((script) => {
      expect(script.dangerous.length).toBeGreaterThan(10);
      expect(script.whyDangerous.length).toBeGreaterThan(10);
      expect(script.safeAlternative.length).toBeGreaterThan(10);
      // Ensure safe alternative does not apologize
      expect(script.safeAlternative.toLowerCase()).not.toContain('sorry');
    });
  });

  it('provides emergency numbers with direct dial capabilities for multiple jurisdictions', () => {
    expect(EMERGENCY_NUMBERS.length).toBeGreaterThanOrEqual(3);
    const india = EMERGENCY_NUMBERS.find((n) => n.region === 'India');
    expect(india).toBeDefined();
    expect(india?.police).toContain('112');
    expect(india?.ambulance).toContain('108');

    const us = EMERGENCY_NUMBERS.find((n) => n.region === 'United States');
    expect(us).toBeDefined();
    expect(us?.police).toBe('911');
  });

  it('validates the baseline scorecard rubric properties', () => {
    expect(INITIAL_SCORECARD_DATA.overallScore).toBeGreaterThanOrEqual(70);
    expect(INITIAL_SCORECARD_DATA.overallScore).toBeLessThanOrEqual(100);
    expect(INITIAL_SCORECARD_DATA.items.length).toBeGreaterThanOrEqual(6);

    INITIAL_SCORECARD_DATA.items.forEach((item) => {
      expect(item.score).toBeGreaterThanOrEqual(0);
      expect(item.score).toBeLessThanOrEqual(100);
      expect(item.name.length).toBeGreaterThan(0);
    });
  });
});
