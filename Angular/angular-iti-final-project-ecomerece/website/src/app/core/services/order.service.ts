import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateOrderPayload, OrderResponse } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/orders`;

  /**
   * Place a Cash-on-Delivery order from the current authenticated user's cart.
   * The backend implementation of /orders is owned by the Orders & Order
   * Management member; this client targets the agreed contract.
   */
  placeCashOrder(payload: CreateOrderPayload): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.base, {
      ...payload,
      paymentMethod: 'cash',
    });
  }

  myOrders(): Observable<{ status: string; count?: number; data: unknown[] }> {
    return this.http.get<{ status: string; count?: number; data: unknown[] }>(
      `${this.base}/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  cancelOrder(id: string): Observable<{ status: string; message?: string; data: unknown }> {
    return this.http.delete<{ status: string; message?: string; data: unknown }>(
      `${this.base}/${id}`,
    );
  }
}
