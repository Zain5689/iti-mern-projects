export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  ratingsQuantity: number;
  ratingsAverage?: number;
  quantity: number;
  sold: string;
  images: Array<string>;
  category: {
    _id?: string;
    title: string;
  };
}

export interface ApiResponse {
  status: string;
  count: number;
  data: Product[];
}
