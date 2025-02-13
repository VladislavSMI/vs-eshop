import {
  formatDateToLocal,
  formatPrice,
  isProduction,
  isBrowser,
  isMockEnabled,
  setCursor,
  normalizeSQL,
  getRange,
  printException,
  collapseDuplicateSlashes,
  trimEndingSlash,
  trimStartingSlash,
  joinPathSegments,
  getPublicUrl,
  generateRelativeImageUrl,
} from './utils';

import { CLOUD_CONFIG } from '../cloud_storage/config';
import { MISSING_IMAGE } from '../const';

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

describe('getRange', () => {
  it('returns an array from 0 to n-1', () => {
    expect(getRange(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('returns an empty array when n is 0', () => {
    expect(getRange(0)).toEqual([]);
  });
});

describe('printException', () => {
  it('returns the error stack if an Error is provided', () => {
    const error = new Error('Test error');
    error.stack = 'Error: Test error\n    at test (file.js:1:1)';
    expect(printException(error)).toBe(error.stack);
  });

  it('returns "Unknown error" if a non-Error is provided', () => {
    expect(printException('not an error')).toBe('Unknown error');
    expect(printException({})).toBe('Unknown error');
  });
});

describe('collapseDuplicateSlashes', () => {
  it('collapses multiple consecutive slashes into a single slash', () => {
    const input = '///foo//bar/baz';
    const expected = '/foo/bar/baz';
    expect(collapseDuplicateSlashes(input)).toBe(expected);
  });

  it('handles paths with protocol correctly', () => {
    const input = 'http://example.com//foo';
    const expected = 'http://example.com/foo';
    expect(collapseDuplicateSlashes(input)).toBe(expected);
  });

  it('returns the same string if no duplicate slashes are present', () => {
    const input = '/foo/bar';
    expect(collapseDuplicateSlashes(input)).toBe(input);
  });
});

describe('trimEndingSlash', () => {
  it('removes a trailing slash', () => {
    expect(trimEndingSlash('test/')).toBe('test');
  });

  it('returns the string unchanged if there is no trailing slash', () => {
    expect(trimEndingSlash('test')).toBe('test');
  });

  it('removes the trailing slash from "/" resulting in an empty string', () => {
    expect(trimEndingSlash('/')).toBe('');
  });
});

describe('trimStartingSlash', () => {
  it('removes a leading slash', () => {
    expect(trimStartingSlash('/test')).toBe('test');
  });

  it('returns the string unchanged if there is no leading slash', () => {
    expect(trimStartingSlash('test')).toBe('test');
  });

  it('removes only one leading slash even if multiple exist', () => {
    expect(trimStartingSlash('//test')).toBe('/test');
  });
});

describe('joinPathSegments', () => {
  it('joins segments correctly without leading or trailing slashes', () => {
    expect(joinPathSegments(['foo', 'bar'])).toBe('foo/bar');
  });

  it('joins segments with a leading slash when addLeading is true', () => {
    expect(joinPathSegments(['foo', 'bar'], { addLeading: true })).toBe(
      '/foo/bar',
    );
  });

  it('joins segments with a trailing slash when addTrailing is true', () => {
    expect(joinPathSegments(['foo', 'bar'], { addTrailing: true })).toBe(
      'foo/bar/',
    );
  });

  it('joins segments with both leading and trailing slashes when both options are true', () => {
    expect(
      joinPathSegments(['foo', 'bar'], { addLeading: true, addTrailing: true }),
    ).toBe('/foo/bar/');
  });

  it('filters out empty segments', () => {
    expect(joinPathSegments(['foo', '', 'bar'])).toBe('foo/bar');
  });
});

describe('getPublicUrl', () => {
  const defaultConfig = { baseUrl: 'http://example.com', folder: 'images' };

  it('returns MISSING_IMAGE if the provided url is null', () => {
    expect(getPublicUrl(null, defaultConfig)).toBe(MISSING_IMAGE);
  });

  it('returns MISSING_IMAGE if config.baseUrl is not set', () => {
    const config = { ...defaultConfig, baseUrl: '' };
    expect(getPublicUrl('image.jpg', config)).toBe(MISSING_IMAGE);
  });

  it('returns MISSING_IMAGE if config.folder is not set', () => {
    const config = { ...defaultConfig, folder: '' };
    expect(getPublicUrl('image.jpg', config)).toBe(MISSING_IMAGE);
  });

  it('returns a valid public URL when config is properly set', () => {
    expect(getPublicUrl('image.jpg', defaultConfig)).toBe(
      'http://example.com/images/image.jpg',
    );
  });

  it('uses the global CLOUD_CONFIG when no config parameter is provided', () => {
    const originalBaseUrl = CLOUD_CONFIG.baseUrl;
    const originalFolder = CLOUD_CONFIG.folder;

    // Override the global config for this test
    CLOUD_CONFIG.baseUrl = 'http://global.com';
    CLOUD_CONFIG.folder = 'globalFolder';

    expect(getPublicUrl('image.jpg')).toBe(
      'http://global.com/globalFolder/image.jpg',
    );

    // Restore the original global config
    CLOUD_CONFIG.baseUrl = originalBaseUrl;
    CLOUD_CONFIG.folder = originalFolder;
  });
});

describe('generateRelativeImageUrl', () => {
  it('generates a relative image URL for valid input', () => {
    const result = generateRelativeImageUrl({
      productId: 'prod123',
      imageId: 'img456',
      mimeType: 'image/jpeg',
    });
    expect(result).toBe('prod123/img456.jpeg');
  });

  it('returns null if productId is missing', () => {
    const result = generateRelativeImageUrl({
      productId: '',
      imageId: 'img456',
      mimeType: 'image/jpeg',
    });
    expect(result).toBeNull();
  });

  it('returns null if imageId is missing', () => {
    const result = generateRelativeImageUrl({
      productId: 'prod123',
      imageId: '',
      mimeType: 'image/jpeg',
    });
    expect(result).toBeNull();
  });

  it('returns null if mimeType is missing', () => {
    const result = generateRelativeImageUrl({
      productId: 'prod123',
      imageId: 'img456',
      mimeType: '',
    });
    expect(result).toBeNull();
  });

  it('returns null if mimeType is invalid', () => {
    const result = generateRelativeImageUrl({
      productId: 'prod123',
      imageId: 'img456',
      mimeType: 'invalid',
    });
    expect(result).toBeNull();
  });
});
