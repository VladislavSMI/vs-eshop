import {
  formatDateToLocal,
  formatPrice,
  isProduction,
  isBrowser,
  isMockEnabled,
  setCursor,
  normalizeSQL,
} from './utils';

describe('Utility Functions', () => {
  describe('formatDateToLocal', () => {
    it('formats a valid date string correctly', () => {
      expect(formatDateToLocal('2024-12-05')).toBe('Dec 5, 2024');
    });

    it('handles an invalid date string', () => {
      expect(formatDateToLocal('invalid-date')).toBe('Invalid Date');
    });

    it('formats a valid date with a custom locale', () => {
      expect(formatDateToLocal('2024-12-05', 'de-DE')).toBe('5. Dez. 2024');
    });
  });

  describe('formatPrice', () => {
    it('formats a price with default locale and currency', () => {
      expect(formatPrice({ price: 12345, divisor: 100 })).toBe('€123.45');
    });

    it('formats a price with a custom locale and currency', () => {
      expect(
        formatPrice({
          price: 12345,
          locale: 'en-GB',
          currencyCode: 'GBP',
          divisor: 100,
        }),
      ).toBe('£123.45');
    });

    it('formats a price with a different currency display', () => {
      expect(
        formatPrice({
          price: 12345,
          currencyDisplay: 'code',
          currencyCode: 'USD',
          divisor: 100,
        }),
      ).toBe('USD 123.45');
    });
  });

  describe('isProduction', () => {
    let originalNodeEnv: string | undefined;

    beforeEach(() => {
      originalNodeEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalNodeEnv,
        writable: true,
      });
    });

    it('returns true if NODE_ENV is production', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });
      expect(isProduction()).toBe(true);
    });

    it('returns false if NODE_ENV is not production', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
      });
      expect(isProduction()).toBe(false);
    });
  });

  describe('isBrowser', () => {
    const originalWindow = global.window;

    beforeEach(() => {
      Object.defineProperty(global, 'window', {
        value: originalWindow,
        configurable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(global, 'window', {
        value: originalWindow,
        configurable: true,
      });
    });

    it('returns true if running in a browser environment', () => {
      expect(isBrowser()).toBe(true);
    });

    it('returns false if running in a Node.js environment', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        configurable: true,
      });
      expect(isBrowser()).toBe(false);
    });
  });

  describe('isMockEnabled', () => {
    it('returns true if MOCK_DB is set to true', () => {
      process.env.MOCK_DB = 'true';
      expect(isMockEnabled()).toBe(true);
    });

    it('returns false if MOCK_DB is not true', () => {
      process.env.MOCK_DB = 'false';
      expect(isMockEnabled()).toBe(false);
    });
  });

  describe('setCursor', () => {
    it('sets the body cursor style', () => {
      const bodyStyleSpy = jest.spyOn(document.body.style, 'cursor', 'set');
      setCursor('grab');
      expect(bodyStyleSpy).toHaveBeenCalledWith('grab');
      setCursor('default');
      expect(bodyStyleSpy).toHaveBeenCalledWith('default');
    });
  });

  describe('normalizeSQL', () => {
    it('normalizes SQL by removing extra spaces and trimming', () => {
      const sql = `
        SELECT *
        FROM users
        WHERE id = 1
      `;
      expect(normalizeSQL(sql)).toBe('SELECT * FROM users WHERE id = 1');
    });
  });
});
