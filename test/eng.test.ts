import { engString } from '../src/eng';

describe('engString', () => {
  it('should format zero correctly', () => {
    expect(engString(0)).toBe('0');
  });

  it('should handle negative values', () => {
    expect(engString(-1000)).toBe('-1 k');
  });

  it('should format values without SI prefixes when requested', () => {
    expect(engString(1000, 3, false)).toBe('1000');
    expect(engString(0.001, 3, false)).toBe('0.001');
  });

  it('should use SI prefixes correctly', () => {
    expect(engString(1)).toBe('1');
    expect(engString(1000)).toBe('1 k');
    expect(engString(1000000)).toBe('1 M');
    expect(engString(0.001)).toBe('1 m');
    expect(engString(0.000001)).toBe('1 µ');
    expect(engString(0.000000001)).toBe('1 n');
  });

  it('should respect significant figures', () => {
    expect(engString(1234, 4)).toBe('1.234 k');
    expect(engString(1234, 3)).toBe('1.23 k');
    expect(engString(1234, 2)).toBe('1.2 k');
    expect(engString(1234, 1)).toBe('1 k');
  });

  it('should handle values outside SI prefix range', () => {
    expect(engString(1e30, 3, true)).toBe('1e30');
    expect(engString(1e-30, 3, true)).toBe('1e-30');
  });
});