import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutPage implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  readonly cart = this.cartService.cart;
  readonly totalPrice = this.cartService.totalPrice;
  readonly itemsCount = this.cartService.itemsCount;
  readonly isEmpty = computed(
    () => !this.cart() || (this.cart()?.cartItems?.length ?? 0) === 0,
  );

  loading = signal(true);
  placing = signal(false);
  errorMessage = signal<string | null>(null);
  successOrderId = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)],
    ],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    details: [''],
    postalCode: [''],
    notes: [''],
    paymentMethod: ['cash', [Validators.required]],
  });

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/checkout' },
      });
      return;
    }
    this.cartService.loadCart().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });

    const user = this.auth.currentUser();
    if (user?.name && !this.form.controls.fullName.value) {
      this.form.controls.fullName.setValue(user.name);
    }
  }

  placeOrder(): void {
    if (this.form.invalid || this.placing()) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isEmpty()) {
      this.errorMessage.set('Your cart is empty.');
      return;
    }

    this.placing.set(true);
    this.errorMessage.set(null);

    const v = this.form.getRawValue();
    this.orderService
      .placeCashOrder({
        paymentMethod: 'cash',
        notes: v.notes || undefined,
        shippingAddress: {
          fullName: v.fullName,
          phone: v.phone,
          city: v.city,
          street: v.street,
          details: v.details || undefined,
          postalCode: v.postalCode || undefined,
        },
      })
      .subscribe({
        next: (res) => {
          this.successOrderId.set(res?.data?._id ?? 'created');
          this.cartService.resetLocal();
          this.cartService.loadCart().subscribe();
          this.placing.set(false);
        },
        error: (err) => {
          this.placing.set(false);
          this.errorMessage.set(
            err?.error?.message ||
              err?.error?.error ||
              'Could not place order. The orders service may not be available yet — please try again later.',
          );
        },
      });
  }
}
