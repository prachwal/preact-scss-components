import { describe, it, expect } from 'vitest';
import { resolveResponsiveValue, isResponsiveValue } from './responsive';

describe('resolveResponsiveValue', () => {
  it('returns undefined for undefined value', () => {
    expect(resolveResponsiveValue(undefined)).toBeUndefined();
    expect(resolveResponsiveValue(undefined, 'lg')).toBeUndefined();
  });

  it('returns the value directly if not an object', () => {
    expect(resolveResponsiveValue('test')).toBe('test');
    expect(resolveResponsiveValue(42)).toBe(42);
    expect(resolveResponsiveValue(true)).toBe(true);
    expect(resolveResponsiveValue(null)).toBe(null);
  });

  it('returns the value for the specified breakpoint', () => {
    const responsiveValue = { xs: 'small', md: 'medium', lg: 'large' };
    expect(resolveResponsiveValue(responsiveValue, 'xs')).toBe('small');
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('medium');
    expect(resolveResponsiveValue(responsiveValue, 'lg')).toBe('large');
  });

  it('falls back to smaller breakpoints when current breakpoint has no value', () => {
    const responsiveValue = { xs: 'small', sm: 'medium' };
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('medium');
    expect(resolveResponsiveValue(responsiveValue, 'lg')).toBe('medium');
    expect(resolveResponsiveValue(responsiveValue, 'xl')).toBe('medium');
  });

  it('falls back to smaller breakpoints when no value found for current breakpoint', () => {
    const responsiveValue = { xs: 'small' };
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('small');
  });

  it('uses md as default breakpoint', () => {
    const responsiveValue = { xs: 'small', md: 'medium', lg: 'large' };
    expect(resolveResponsiveValue(responsiveValue)).toBe('medium');
  });

  it('handles empty responsive objects', () => {
    expect(resolveResponsiveValue({})).toBeUndefined();
    expect(resolveResponsiveValue({}, 'lg')).toBeUndefined();
  });

  it('handles responsive objects with undefined values', () => {
    const responsiveValue = { xs: undefined, md: 'medium' };
    expect(resolveResponsiveValue(responsiveValue, 'xs')).toBeUndefined();
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('medium');
  });
});

describe('isResponsiveValue', () => {
  it('returns true for responsive objects', () => {
    expect(isResponsiveValue({ xs: 'small', md: 'medium' })).toBe(true);
    expect(isResponsiveValue({ lg: 'large' })).toBe(true);
  });

  it('returns false for non-objects', () => {
    expect(isResponsiveValue('string')).toBe(false);
    expect(isResponsiveValue(42)).toBe(false);
    expect(isResponsiveValue(true)).toBe(false);
    expect(isResponsiveValue(null)).toBe(false);
    expect(isResponsiveValue(undefined)).toBe(false);
  });

  it('returns false for arrays', () => {
    expect(isResponsiveValue(['item1', 'item2'])).toBe(false);
    expect(isResponsiveValue([])).toBe(false);
  });

  it('returns false for objects without breakpoint keys', () => {
    expect(isResponsiveValue(() => {})).toBe(false);
    expect(isResponsiveValue(new Date())).toBe(false);
    expect(isResponsiveValue(/regex/)).toBe(false);
    expect(isResponsiveValue({ randomKey: 'value' })).toBe(false);
  });
});