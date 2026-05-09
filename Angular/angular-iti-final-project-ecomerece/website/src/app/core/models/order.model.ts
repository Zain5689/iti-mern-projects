import { CartItem } from './cart.model';

export type PaymentMethod = 'cash';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  street: string;
  details?: string;
  postalCode?: string;
}

export interface CreateOrderPayload {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  _id: string;
  user: string;
  cartItems: CartItem[];
  totalOrderPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  status: string;
  data: Order;
  message?: string;
}
