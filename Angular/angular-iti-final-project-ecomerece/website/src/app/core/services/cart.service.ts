import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart, CartResponse } from '../models/cart.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private tokens = inject(TokenService);
  private base = `${environment.apiUrl}/cart`;

  private _cart = signal<Cart | null>(null);
  readonly cart = this._cart.asReadonly();
  readonly itemsCount = computed(() =>
    (this._cart()?.cartItems ?? []).reduce((n, i) => n + (i.quantity ?? 0), 0),
  );
  readonly totalPrice = computed(() => this._cart()?.totalCartPrice ?? 0);

  loadCart(): Observable<Cart | null> {
    if (!this.tokens.has()) {
      this._cart.set(null);
      return of(null);
    }
    return this.http.get<CartResponse>(this.base).pipe(
      tap((res) => this._cart.set(res?.data ?? null)),
      catchError(() => {
        this._cart.set(null);
        return of(null);
      }),
    ) as unknown as Observable<Cart | null>;
  }

  addToCart(productId: string): Observable<CartResponse> {
    return this.http
      .post<CartResponse>(this.base, { productId })
      .pipe(tap((res) => this._cart.set(res?.data ?? null)));
  }

  updateQuantity(productId: string, quantity: number): Observable<CartResponse> {
    return this.http
      .patch<CartResponse>(`${this.base}/${productId}`, { quantity })
      .pipe(tap((res) => this._cart.set(res?.data ?? null)));
  }

  removeItem(productId: string): Observable<CartResponse> {
    return this.http
      .delete<CartResponse>(`${this.base}/${productId}`)
      .pipe(tap((res) => this._cart.set(res?.data ?? null)));
  }

  clearCart(): Observable<CartResponse> {
    return this.http
      .delete<CartResponse>(this.base)
      .pipe(tap((res) => this._cart.set(res?.data ?? null)));
  }

  resetLocal(): void {
    this._cart.set(null);
  }
}
