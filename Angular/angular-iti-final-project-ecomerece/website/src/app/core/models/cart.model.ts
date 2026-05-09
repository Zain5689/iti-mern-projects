export interface CartProduct {
  _id: string;
  title: string;
  imageCover?: string;
  price?: number;
  quantity?: number;
}

export interface CartItem {
  _id?: string;
  product: string | CartProduct;
  quantity: number;
  price: number;
  color?: string;
}

export interface Cart {
  _id?: string;
  user: string;
  cartItems: CartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartResponse {
  status: string;
  data: Cart;
  message?: string;
}
