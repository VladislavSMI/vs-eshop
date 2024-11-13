export type ProductRow = {
  product_id: string;
  product_name: string;
  category_id: CategoryRow['category_id'];
  category_name: CategoryRow['category_name'];
  price: string;
  image_url: string;
  tags: string[];
};

export type CategoryRow = {
  category_id: number;
  category_name: string;
};
