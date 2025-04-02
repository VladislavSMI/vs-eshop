import { normalizeSQL } from '@/lib/utils/utils';
import {
  buildProductQuery,
  buildProductSearchQuery,
} from './productQueryBuilder';

describe('buildProductQuery', () => {
  it('should return the base query when no flags are provided', () => {
    const query = normalizeSQL(buildProductQuery());

    const expectedSelect = `
      SELECT 
      p.product_id,
      p.product_name,
      p.category_id,
      pc.category_name,
      pc.category_id,
      p.price,
      p.main_image_id,
      pi.mime_type,
      COALESCE(
        json_agg(DISTINCT t.tag_name) FILTER (WHERE t.tag_name IS NOT NULL),
        '[]'
      ) AS tags
    `;
    const expectedJoins = `
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.category_id
      LEFT JOIN product_tags pt ON p.product_id = pt.product_id
      LEFT JOIN tags t ON pt.tag_id = t.tag_id
      LEFT JOIN product_images pi ON p.main_image_id = pi.id
    `;

    expect(query).toContain(normalizeSQL(expectedSelect));
    expect(query).toContain(normalizeSQL(expectedJoins));
  });

  it('should include product details when isProductDetails is true', () => {
    const query = normalizeSQL(buildProductQuery({ isProductDetails: true }));

    const expectedDetailsSelect = `
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'language_code', pd.language_code,
            'description', pd.description
          )
        ) FILTER (WHERE pd.language_code IS NOT NULL AND pd.description IS NOT NULL),
        '[]'
      ) AS descriptions
    `;
    const expectedDetailsJoins = `
      LEFT JOIN product_descriptions pd ON p.product_id = pd.product_id AND pd.language_code = $2
      LEFT JOIN sizes s ON s.category_id = p.category_id
      LEFT JOIN product_variations pv ON pv.size_id = s.size_id AND pv.product_id = p.product_id
    `;

    expect(query).toContain(normalizeSQL(expectedDetailsSelect));
    expect(query).toContain(normalizeSQL(expectedDetailsJoins));
  });

  it('should include admin details when isAdminDetails is true', () => {
    const query = normalizeSQL(buildProductQuery({ isAdminDetails: true }));

    const expectedAdminSelect = `
      p.created_at,
      p.deleted_at
    `;

    expect(query).toContain(normalizeSQL(expectedAdminSelect));
  });

  it('should include both product and admin details when both flags are true', () => {
    const query = normalizeSQL(
      buildProductQuery({ isProductDetails: true, isAdminDetails: true }),
    );

    const expectedDetailsSelect = `
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'language_code', pd.language_code,
            'description', pd.description
          )
        ) FILTER (WHERE pd.language_code IS NOT NULL AND pd.description IS NOT NULL),
        '[]'
      ) AS descriptions
    `;
    const expectedAdminSelect = `
      p.created_at,
      p.deleted_at
    `;

    expect(query).toContain(normalizeSQL(expectedDetailsSelect));
    expect(query).toContain(normalizeSQL(expectedAdminSelect));
  });
});

describe('buildProductSearchQuery', () => {
  it('should build the search query with searchTerm and categoryId', () => {
    const { conditions, values } = buildProductSearchQuery({
      searchTerm: 'Test Product',
      categoryId: 123,
    });

    const expectedConditions = [
      `(p.product_name ILIKE $1 OR pd.description ILIKE $1)`,
      `pc.category_id = $2`,
    ];

    expect(conditions).toEqual(expectedConditions);
    expect(values).toEqual(['%Test Product%', 123]);
  });

  it('should build the query with only searchTerm when categoryId is not provided', () => {
    const { conditions, values } = buildProductSearchQuery({
      searchTerm: 'Test Product',
    });

    const expectedConditions = [
      `(p.product_name ILIKE $1 OR pd.description ILIKE $1)`,
    ];

    expect(conditions).toEqual(expectedConditions);
    expect(values).toEqual(['%Test Product%']);
  });

  it('should build the query with only categoryId when searchTerm is not provided', () => {
    const { conditions, values } = buildProductSearchQuery({
      categoryId: 123,
    });

    const expectedConditions = [`pc.category_id = $1`];

    expect(conditions).toEqual(expectedConditions);
    expect(values).toEqual([123]);
  });

  it('should build the query with tagNames when provided', () => {
    const { conditions, values } = buildProductSearchQuery({
      tagNames: ['new', 'sale'],
    });

    const expectedConditions = [`(t.tag_name ILIKE ANY($1::text[]))`];

    expect(conditions).toEqual(expectedConditions);
    expect(values).toEqual([['%new%', '%sale%']]);
  });

  it('should build the query with searchTerm and tagNames', () => {
    const { conditions, values } = buildProductSearchQuery({
      searchTerm: 'Test Product',
      tagNames: ['new', 'sale'],
    });

    const expectedConditions = [
      `(p.product_name ILIKE $1 OR pd.description ILIKE $1)`,
      `(t.tag_name ILIKE ANY($2::text[]))`,
    ];

    expect(conditions).toEqual(expectedConditions);
    expect(values).toEqual(['%Test Product%', ['%new%', '%sale%']]);
  });

  it('should build the query with categoryId and tagNames', () => {
    const { conditions, values } = buildProductSearchQuery({
      categoryId: 123,
      tagNames: ['new', 'sale'],
    });

    const expectedConditions = [
      `pc.category_id = $1`,
      `(t.tag_name ILIKE ANY($2::text[]))`,
    ];

    expect(conditions).toEqual(expectedConditions);
    expect(values).toEqual([123, ['%new%', '%sale%']]);
  });

  it('should build an empty query when no parameters are provided', () => {
    const { conditions, values } = buildProductSearchQuery({});

    expect(conditions).toEqual([]);
    expect(values).toEqual([]);
  });
});
