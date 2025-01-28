import { getCategoryName } from '@/lib/utils/getCategoryName';
import { mockCategories } from '@/__test__/mocks/ProductRepositoryMocks';
import { createCrumbs } from './createCrumbs';

describe('createCrumbs', () => {
  const productSearchLabels = {
    query: 'Search text',
    categoryId: 'Category',
  };

  it('creates crumbs with search text and category names', () => {
    const searchParams = {
      query: 'Skateboards',
      categoryId: '3',
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
      valueTransformers: {
        categoryId: (value) => getCategoryName(Number(value), mockCategories),
      },
    });

    expect(crumbs).toEqual([
      { id: 'query', label: 'Search text', value: 'Skateboards' },
      { id: 'categoryId', label: 'Category', value: 'Wheels' },
    ]);
  });

  it('returns "Unknown" for an invalid categoryId', () => {
    const searchParams = {
      categoryId: 999,
      query: 'Skateboards',
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: {
        categoryId: 'Category',
        query: 'Text search',
      },
      valueTransformers: {
        categoryId: (value) => getCategoryName(Number(value), mockCategories),
      },
    });

    expect(crumbs).toEqual([
      { id: 'categoryId', label: 'Category', value: 'Unknown' },
      { id: 'query', label: 'Text search', value: 'Skateboards' },
    ]);
  });

  it('handles undefined valueTransformers and uses default string conversion', () => {
    const searchParams = {
      query: 'Skateboards',
      categoryId: '1',
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
    });

    expect(crumbs).toEqual([
      { id: 'query', label: 'Search text', value: 'Skateboards' },
      { id: 'categoryId', label: 'Category', value: '1' }, // Default string conversion
    ]);
  });

  it('filters out fields not in labels', () => {
    const searchParams = {
      query: 'Decks',
      categoryId: 2,
      invalidKey: 'This should not appear',
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
      valueTransformers: {
        categoryId: (value) => getCategoryName(Number(value), mockCategories),
      },
    });

    expect(crumbs).toEqual([
      { id: 'query', label: 'Search text', value: 'Decks' },
      { id: 'categoryId', label: 'Category', value: 'Trucks' },
    ]);
  });

  it('uses the key as the label when the label is missing', () => {
    const searchParams = {
      query: 'Skateboards',
      missingLabelKey: 'some value',
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
    });

    expect(crumbs).toEqual([
      { id: 'query', label: 'Search text', value: 'Skateboards' },
    ]);
  });

  it('handles null or undefined field values', () => {
    const searchParams = {
      query: 'Skateboards',
      categoryId: null,
      sort: undefined,
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
      valueTransformers: {},
    });

    expect(crumbs).toEqual([
      { id: 'query', label: 'Search text', value: 'Skateboards' },
    ]);
  });

  it('ignores labels that have no corresponding key in fields', () => {
    const searchParams = {
      query: 'Skateboards',
    };

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
    });

    expect(crumbs).toEqual([
      { id: 'query', label: 'Search text', value: 'Skateboards' },
    ]);
  });

  it('handles empty fields gracefully and returns an empty array', () => {
    const searchParams = {};

    const crumbs = createCrumbs({
      fields: searchParams,
      labels: productSearchLabels,
    });

    expect(crumbs).toEqual([]);
  });
});
