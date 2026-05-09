import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem, CartProduct } from '../../core/models/cart.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage implements OnInit {
  private cartService = inject(CartService);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(true);
  busyProductId = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  readonly cart = this.cartService.cart;
  readonly itemsCount = this.cartService.itemsCount;
  readonly totalPrice = this.cartService.totalPrice;
  readonly isEmpty = computed(() => !this.cart() || (this.cart()?.cartItems?.length ?? 0) === 0);

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/cart' },
      });
      return;
    }
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.cartService.loadCart().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  productId(item: CartItem): string {
    return typeof item.product === 'object' ? item.product._id : item.product;
  }

  productView(item: CartItem): CartProduct | null {
    return typeof item.product === 'object' ? item.product : null;
  }

  changeQty(item: CartItem, delta: number): void {
    const id = this.productId(item);
    const next = (item.quantity ?? 1) + delta;
    if (next < 1) {
      this.remove(item);
      return;
    }
    this.busyProductId.set(id);
    this.cartService.updateQuantity(id, next).subscribe({
      next: () => this.busyProductId.set(null),
      error: (err) => {
        this.busyProductId.set(null);
        this.errorMessage.set(err?.error?.message || 'Could not update quantity.');
      },
    });
  }

  remove(item: CartItem): void {
    const id = this.productId(item);
    this.busyProductId.set(id);
    this.cartService.removeItem(id).subscribe({
      next: () => this.busyProductId.set(null),
      error: (err) => {
        this.busyProductId.set(null);
        this.errorMessage.set(err?.error?.message || 'Could not remove item.');
      },
    });
  }

  clear(): void {
    if (!confirm('Clear all items from your cart?')) return;
    this.loading.set(true);
    this.cartService.clearCart().subscribe({
      next: () => this.loading.set(false),
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message || 'Could not clear cart.');
      },
    });
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
