import {
  isValidTag,
  filterProductByTag,
  hasAvailableSizes,
  getCategoryName,
} from '@/lib/utils/productUtils';
import { CONST } from '@/lib/const';
import {
  mockProducts,
  mockProductDetails,
  mockCategories,
} from '@/__test__/mocks/ProductRepositoryMocks';
import { Tag } from '../types';

describe('isValidTag()', () => {
  it('recognize a platform-supported tag', () => {
    expect(isValidTag(CONST.validTags[0])).toBe(true);
  });

  it('rejects any unknown tag', () => {
    expect(isValidTag('Not-a-real-tag')).toBe(false);
  });
});

describe('filterProductByTag()', () => {
  const sampleTag = CONST.validTags[0]; // e.g. "On Sale"
  const injected = {
    ...mockProducts[0],
    tags: [...mockProducts[0].tags, sampleTag],
  };
  const catalogue = [injected, ...mockProducts.slice(1)];

  it('splits the catalogue into “tagged” vs “everything else”', () => {
    const { filteredProducts, restProducts } = filterProductByTag(
      catalogue,
      sampleTag,
    );

    // every item whose tag list includes `sampleTag` must be in the first array…
    const expectedFiltered = catalogue.filter((p) =>
      p.tags.includes(sampleTag),
    );
    expect(filteredProducts).toEqual(expectedFiltered);

    // …and the rest should be the complement of that set
    const expectedRest = catalogue.filter((p) => !p.tags.includes(sampleTag));
    expect(restProducts).toEqual(expectedRest);
  });

  it('returns an empty tagged list when no product carries the tag', () => {
    const noneTag = 'NotInCatalogue' as Tag;
    const { filteredProducts, restProducts } = filterProductByTag(
      mockProducts,
      noneTag,
    );

    expect(filteredProducts).toHaveLength(0);
    expect(restProducts).toEqual(mockProducts);
  });
});

describe('hasAvailableSizes()', () => {
  it('reports stock when ANY variation is available', () => {
    expect(hasAvailableSizes(mockProductDetails.variations)).toBe(true);
  });

  it('returns false when every variation is sold out', () => {
    const soldOut = mockProductDetails.variations.map((v) => ({
      ...v,
      stockQuantity: false,
    }));
    expect(hasAvailableSizes(soldOut)).toBe(false);
  });
});

describe('getCategoryName()', () => {
  it('maps a known category ID to its display name', () => {
    expect(getCategoryName(2, mockCategories)).toBe('Trucks');
  });

  it('falls back to “Unknown” for an unmapped ID', () => {
    expect(getCategoryName(999, mockCategories)).toBe('Unknown');
  });
});
