import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductCard } from '../../layouts/components/product-card/product-card';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  addingProductId = signal<string | null>(null);
  toastMessage = signal<string | null>(null);

  private auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data.slice(0, 4));
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data.slice(0, 4));
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  onAddToCart(product: Product): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/' } });
      return;
    }
    const id = (product as any)._id;
    this.addingProductId.set(id);
    this.cart.addToCart(id).subscribe({
      next: () => {
        this.addingProductId.set(null);
        this.showToast(`"${product.title}" added to cart`);
      },
      error: (err) => {
        this.addingProductId.set(null);
        this.showToast(err?.error?.message || 'Could not add item to cart.');
      },
    });
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 2500);
  }

  addToWishlist(product: Product) {
    console.log('Wishlist:', product);
  }
}
