export type Product = {
  product_id: string;            
  product_name: string;          
  category_id: number;           
  category_name: string;        
  price: number;                 
  image_url: string;           
  tags: Tag[];                   
};

type Tag = 'On Sale' | 'New' | 'Last in Inventory'; 

