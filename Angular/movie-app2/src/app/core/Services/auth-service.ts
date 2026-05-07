// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/interfaces/user.model';
import { TokenPayload } from '../../shared/models/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly baseUrl = 'http://localhost:3000/api/auth';
  private readonly baseUr2 = 'http://localhost:3000/api';

  // Use TokenPayload (not User) for the decoded JWT payload
  userData: WritableSignal<TokenPayload | null> = signal(null);

  // Computed signal works because TokenPayload has an email field
  username: Signal<string> = computed(() => {
    const user = this.userData();
    console.log(user);
    return user ? user.email.slice(0, user.email.indexOf('@')) : '';
  });

  constructor() {
    this.saveUserData();
  }

  saveUserData() {
    const myToken = localStorage.getItem('myToken');
    if (myToken) {
      try {
        // Decode with the TokenPayload type
        const decoded = jwtDecode<TokenPayload>(myToken);
        this.userData.set(decoded);
      } catch {
        this.signOut();
      }
    }
  }

  // signUp and signIn still use the full User model (including password)
  signUp(data: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  signIn(data: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, data);
  }

  allUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUr2}/users`);
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
