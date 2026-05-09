export interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
  __v: 0;
}

export interface CategoryResponse {
  data: Category[];
  message: string;
  success: boolean;
}
