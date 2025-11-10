import { describe, it, expect } from 'vitest';
import { resolveGapValue, type GapPreset } from './gap';

describe('resolveGapValue', () => {
  it('returns undefined for undefined input', () => {
    expect(resolveGapValue(undefined)).toBeUndefined();
  });

  it('resolves preset values correctly', () => {
    expect(resolveGapValue('small')).toBe('0.5rem');
    expect(resolveGapValue('medium')).toBe('1rem');
    expect(resolveGapValue('large')).toBe('1.5rem');
    expect(resolveGapValue('xl')).toBe('2rem');
  });

  it('returns custom string values as-is', () => {
    expect(resolveGapValue('10px')).toBe('10px');
    expect(resolveGapValue('2em')).toBe('2em');
    expect(resolveGapValue('1.5rem')).toBe('1.5rem');
    expect(resolveGapValue('var(--custom-gap)')).toBe('var(--custom-gap)');
  });

  it('converts numbers to rem units', () => {
    expect(resolveGapValue(0)).toBe('0rem');
    expect(resolveGapValue(1)).toBe('1rem');
    expect(resolveGapValue(2.5)).toBe('2.5rem');
    expect(resolveGapValue(-1)).toBe('-1rem');
  });

  it('handles edge cases', () => {
    // Invalid preset should be treated as custom string
    expect(resolveGapValue('invalid' as any)).toBe('invalid');
    // Empty string
    expect(resolveGapValue('')).toBe('');
    // Null value should return undefined
    expect(resolveGapValue(null as any)).toBeUndefined();
    // Boolean value should return undefined
    expect(resolveGapValue(true as any)).toBeUndefined();
    // Object value should return undefined
    expect(resolveGapValue({} as any)).toBeUndefined();
  });
});