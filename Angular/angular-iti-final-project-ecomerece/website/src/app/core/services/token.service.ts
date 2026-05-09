import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  get token(): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  set(token: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  }

  clear(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  }

  has(): boolean {
    return !!this.token;
  }
}
