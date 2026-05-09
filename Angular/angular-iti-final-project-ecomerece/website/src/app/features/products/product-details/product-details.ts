import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = signal<Product | null>(null);
  activeImage = signal<string | null>(null);
  adding = signal(false);
  toastMessage = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private auth: AuthService,
    private cart: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        // Set initial main image
        if (data.imageCover) {
          this.activeImage.set(data.imageCover);
        }
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  addToCart(product: Product) {
    if (!product || (product.quantity ?? 0) <= 0) return;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }
    this.adding.set(true);
    this.cart.addToCart((product as any)._id).subscribe({
      next: () => {
        this.adding.set(false);
        this.showToast(`"${product.title}" added to cart`);
      },
      error: (err) => {
        this.adding.set(false);
        this.showToast(err?.error?.message || 'Could not add item to cart.');
      },
    });
  }

  addToWishlist(product: Product) {
    console.log('Wishlist:', product);
    this.showToast(`"${product.title}" added to wishlist`);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 2500);
  }
}
