import { Product, ProductDetails, ProductAdmin } from '@/lib/types';
import {
  ProductRow,
  ProductRowAdmin,
  ProductRowDetails,
} from '../QueryResults';
import { formatDateToLocal } from '@/lib/utils/utils';
import { isValidTag } from '@/lib/utils/productUtils';

const mapBaseProduct = (row: ProductRow): Product => ({
  productId: row.product_id,
  productName: row.product_name,
  categoryId: row.category_id,
  categoryName: row.category_name,
  price: row.price || 0,
  imageUrl: row.image_url || '',
  tags: row.tags?.filter(isValidTag) || [],
});

const mapProductDetails = (row: ProductRowDetails): ProductDetails => ({
  ...mapBaseProduct(row),
  descriptions:
    row.descriptions?.map((d) => ({
      languageCode: d.language_code,
      description: d.description,
    })) || [],
  variations:
    row.variations?.map((v) => ({
      variationId: v.variation_id || '',
      sizeId: v.size_id || 0,
      size: v.size || 0,
      stockQuantity: (v.stock_quantity || 0) > 0, // Converts to boolean for ProductDetails for non-admin
    })) || [],
  reviews:
    row.reviews?.map((r) => ({
      customerName: r.customer_name,
      rating: r.rating || 0,
      reviewText: r.review_text || '',
      reviewDate: r.review_date,
      helpfulVotes: r.helpful_votes || 0,
    })) || [],
  discounts:
    row.discounts?.map((d) => ({
      discountPercentage: d.discount_percentage || 0,
      validFrom: d.valid_from,
      validUntil: d.valid_until || null,
    })) || [],
  relatedProducts: row.related_products || [],
});

const mapProductAdmin = (row: ProductRowAdmin): ProductAdmin => ({
  ...mapProductDetails(row),
  variations:
    row.variations?.map((v) => ({
      variationId: v.variation_id || '',
      sizeId: v.size_id || 0,
      size: v.size || 0,
      stockQuantity: v.stock_quantity || 0, // Keeps as a number for ProductAdmin
    })) || [],
  createdAt: formatDateToLocal(row.created_at),
  deletedAt: row.deleted_at ? formatDateToLocal(row.deleted_at) : null,
});

export const ProductMappers = {
  base: mapBaseProduct,
  withDetails: mapProductDetails,
  forAdmin: mapProductAdmin,
};
