export interface Product {
  _id?: string;
  title: string;      
  slug?: string;
  description: string;
  price: number;
  priceAfterDiscount?: number; 
  quantity: number;    
  sold?: number;
  category: any;         
  imageCover: string;    
  images?: string[];
  ratingsAverage?: number;
  ratingsQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}