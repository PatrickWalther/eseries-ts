import { 
  ESeries, 
  series, 
  findNearest, 
  findGreaterThan, 
  findLessThan, 
  tolerance,
  erange,
  toleranceLimits,
  seriesKeyFromName
} from '../src/eseries';

describe('ESeries', () => {
  describe('series', () => {
    it('should return the correct base values for E12', () => {
      const values = series(ESeries.E12);
      expect(values).toEqual([10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]);
    });

    it('should throw an error for an invalid series', () => {
      // @ts-ignore - Testing runtime behavior with invalid value
      expect(() => series(999)).toThrow(/not found/);
    });
  });

  describe('seriesKeyFromName', () => {
    it('should return the correct series key for a valid name', () => {
      expect(seriesKeyFromName('E12')).toBe(ESeries.E12);
      expect(seriesKeyFromName('e24')).toBe(ESeries.E24); // Case insensitive
    });

    it('should throw an error for an invalid name', () => {
      expect(() => seriesKeyFromName('E99')).toThrow(/not found/);
    });
  });

  describe('tolerance', () => {
    it('should return the correct tolerance for each series', () => {
      expect(tolerance(ESeries.E3)).toBe(0.4);
      expect(tolerance(ESeries.E6)).toBe(0.2);
      expect(tolerance(ESeries.E12)).toBe(0.1);
      expect(tolerance(ESeries.E24)).toBe(0.05);
    });
  });

  describe('findNearest', () => {
    it('should find the nearest value in a series', () => {
      expect(findNearest(ESeries.E12, 42)).toBe(39);
      expect(findNearest(ESeries.E24, 42)).toBe(43);
    });
  });

  describe('findGreaterThan', () => {
    it('should find the smallest value greater than the target', () => {
      expect(findGreaterThan(ESeries.E12, 42)).toBe(47);
      expect(findGreaterThan(ESeries.E24, 42)).toBe(43);
    });
  });

  describe('findLessThan', () => {
    it('should find the largest value less than the target', () => {
      expect(findLessThan(ESeries.E12, 42)).toBe(39);
      expect(findLessThan(ESeries.E24, 42)).toBe(39);
    });
  });

  describe('erange', () => {
    it('should return all values in the given range', () => {
      const values = erange(ESeries.E12, 10, 100);
      expect(values).toEqual([10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]);
    });

    it('should handle ranges that do not align with base values', () => {
      const values = erange(ESeries.E12, 25, 70);
      expect(values).toEqual([27, 33, 39, 47, 56, 68]);
    });
  });

  describe('toleranceLimits', () => {
    it('should return correct tolerance limits for E12', () => {
      const [lower, upper] = toleranceLimits(ESeries.E12, 100);
      expect(lower).toBe(90);
      expect(upper).toBe(110);
    });
  });
});