import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${orderId}`,
      { status },
      { headers: this.getHeaders() },
    );
  }
  getUserOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`, {
      headers: this.getHeaders(),
    });
  }
}
