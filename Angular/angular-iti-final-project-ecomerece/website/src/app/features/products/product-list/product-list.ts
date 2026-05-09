import { Component, OnInit, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCard } from '../../../layouts/components/product-card/product-card';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  public route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  allProducts: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;
  addingProductId = signal<string | null>(null);
  toastMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
    });

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.route.queryParams.subscribe((params) => {
          this.applyFilters(params['q'] || '', params['category'] || '');
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyFilters(query: string, categoryId: string): void {
    const search = query.toLowerCase().trim();
    this.filteredProducts = this.allProducts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search);
      const matchesCategory = !categoryId || (p.category as any)?._id === categoryId;
      return matchesSearch && matchesCategory;
    });
    this.cdr.detectChanges();
  }

  changeCategory(id: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: id },
      queryParamsHandling: 'merge',
    });
  }

  onAddToCart(product: Product): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
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
        this.showToast(err?.error?.message || 'Error adding to cart');
      },
    });
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 2500);
  }
}
