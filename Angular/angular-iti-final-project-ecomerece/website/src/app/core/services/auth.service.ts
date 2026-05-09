import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  LoginPayload,
  MeResponse,
  SignupPayload,
  User,
} from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokens = inject(TokenService);
  private base = `${environment.apiUrl}/auth`;

  private _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(
    () => !!this._currentUser() || this.tokens.has(),
  );
  readonly isAdmin = computed(() => this._currentUser()?.role === 'admin');

  signup(payload: SignupPayload): Observable<{ status?: string; message?: string }> {
    return this.http.post<{ status?: string; message?: string }>(
      `${this.base}/signup`,
      payload,
    );
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, payload).pipe(
      tap((res) => {
        if (res?.token) this.tokens.set(res.token);
      }),
    );
  }

  fetchMe(): Observable<User | null> {
    if (!this.tokens.has()) return of(null);
    return this.http.get<MeResponse>(`${this.base}/me`).pipe(
      tap((res) => this._currentUser.set(res?.data?.user ?? null)),
      catchError(() => {
        this._currentUser.set(null);
        return of(null);
      }),
    ) as unknown as Observable<User | null>;
  }

  logout(): void {
    this.tokens.clear();
    this._currentUser.set(null);
  }
}
