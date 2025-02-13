export const buildProductQuery = ({
  isProductDetails = false,
  isAdminDetails = false,
}: {
  isProductDetails?: boolean;
  isAdminDetails?: boolean;
} = {}): string => {
  const baseSelect = `
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

  const baseJoins = `
    LEFT JOIN product_categories pc ON p.category_id = pc.category_id
    LEFT JOIN product_tags pt ON p.product_id = pt.product_id
    LEFT JOIN tags t ON pt.tag_id = t.tag_id
    LEFT JOIN product_images pi ON p.main_image_id = pi.id
  `;

  const productDetailsSelect = isProductDetails
    ? `
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'language_code', pd.language_code,
            'description', pd.description
          )
        ) FILTER (WHERE pd.language_code IS NOT NULL AND pd.description IS NOT NULL),
        '[]'
      ) AS descriptions,
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'variation_id', pv.variation_id,
            'size_id', s.size_id,
            'size', s.size,
            'stock_quantity', pv.stock_quantity
          )
        ) FILTER (WHERE s.size_id IS NOT NULL),
        '[]'
      ) AS variations,
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'customer_name', r.customer_name,
            'rating', r.rating,
            'review_text', r.review_text,
            'review_date', r.review_date,
            'helpful_votes', r.helpful_votes
          )
        ) FILTER (WHERE r.customer_name IS NOT NULL AND r.rating IS NOT NULL),
        '[]'
      ) AS reviews,
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'discount_percentage', d.discount_percentage,
            'valid_from', d.valid_from,
            'valid_until', d.valid_until
          )
        ) FILTER (WHERE d.discount_percentage IS NOT NULL AND d.valid_from IS NOT NULL),
        '[]'
      ) AS discounts,
      COALESCE(
        json_agg(DISTINCT prp.related_product_id) FILTER (WHERE prp.related_product_id IS NOT NULL),
        '[]'
      ) AS related_products
    `
    : '';

  const productDetailsJoins = isProductDetails
    ? `
      LEFT JOIN product_descriptions pd ON p.product_id = pd.product_id AND pd.language_code = $2
      LEFT JOIN sizes s ON s.category_id = p.category_id
      LEFT JOIN product_variations pv ON pv.size_id = s.size_id AND pv.product_id = p.product_id
      LEFT JOIN reviews r ON p.product_id = r.product_id
      LEFT JOIN discounts d ON p.product_id = d.product_id AND d.valid_from <= NOW() AND (d.valid_until IS NULL OR d.valid_until >= NOW())
      LEFT JOIN product_related_products prp ON p.product_id = prp.product_id
    `
    : '';

  const adminDetailsSelect = isAdminDetails
    ? `
      p.created_at,
      p.deleted_at
    `
    : '';

  const selectClause = `
    SELECT
    ${[baseSelect, productDetailsSelect, adminDetailsSelect]
      .filter(Boolean)
      .join(',\n')}
  `;

  const fromAndJoinsClause = `
    FROM products p
    ${baseJoins}
    ${productDetailsJoins}
  `;

  return `
    ${selectClause}
    ${fromAndJoinsClause}
  `;
};

export const buildProductSearchQuery = ({
  searchTerm,
  categoryId,
  tagNames,
}: {
  searchTerm?: string;
  categoryId?: number;
  tagNames?: string[];
}): { conditions: string[]; values: (string | number | string[])[] } => {
  const conditions: string[] = [];
  const values: (string | number | string[])[] = [];

  if (searchTerm) {
    conditions.push(
      `(p.product_name ILIKE $${values.length + 1} OR pd.description ILIKE $${values.length + 1})`,
    );
    values.push(`%${searchTerm}%`);
  }

  if (categoryId) {
    conditions.push(`pc.category_id = $${values.length + 1}`);
    values.push(categoryId);
  }

  if (tagNames && tagNames.length > 0) {
    conditions.push(`(t.tag_name ILIKE ANY($${values.length + 1}::text[]))`);
    values.push(tagNames.map((tag) => `%${tag}%`));
  }

  return { conditions, values };
};
