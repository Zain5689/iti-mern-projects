import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  // توحيد الرابط مع السيرفر
  private readonly baseUrl = 'http://localhost:3000/api/auth';

  userData: WritableSignal<any> = signal(null);

  username: Signal<any> = computed(() => {
    const user = this.userData();
    return user ? user.email || user.name || '' : '';
  });

  constructor() {
    this.saveUserData();
  }

  saveUserData() {
    const myToken = localStorage.getItem('myToken');
    if (myToken) {
      try {
        const decoded = jwtDecode(myToken);
        this.userData.set(decoded);
      } catch {
        this.signOut();
      }
    }
  }

  signUp(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  signIn(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, data);
  }
  allUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/users`);
  }

  signOut(): void {
    localStorage.removeItem('myToken');
    this.userData.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.userData();
  }
}
