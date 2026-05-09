import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private auth = inject(AuthService);
  private cartService = inject(CartService);
  private tokens = inject(TokenService);
  private router = inject(Router);

  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly currentUser = this.auth.currentUser;
  readonly isAdmin = this.auth.isAdmin;
  readonly cartCount = this.cartService.itemsCount;
  readonly userInitial = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name.trim().charAt(0).toUpperCase() || 'U';
  });

  searchQuery = signal('');
  userMenuOpen = signal(false);

  ngOnInit(): void {
    if (this.tokens.has()) {
      this.auth.fetchMe().subscribe();
      this.cartService.loadCart().subscribe();
    }
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update((v) => !v);
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.cartService.resetLocal();
    this.closeUserMenu();
    this.router.navigate(['']);
  }

  search(): void {
    const q = this.searchQuery().trim();
    if (!q) return;
    this.router.navigate(['/shop'], { queryParams: { q } });
  }
}
