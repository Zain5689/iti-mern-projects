import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: WritableSignal<any> = signal(null); // null , data
  username: Signal<any> = computed(() => {
    const user = this.userData();
    return user ? user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : '';
  });
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {
    this.saveUserData();
  }

  saveUserData() {
    const myToken = localStorage.getItem('myToken');
    if (myToken) {
      try {
        const decoded = jwtDecode(myToken);
        this.userData.set(decoded);
      } catch (error) {
        console.log(error);
        this.signOut();
      }
    }
  }
  signUp(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/register', data);
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login', data);
  }
  signOut(): void {
    localStorage.removeItem('myToken');
    this.userData.set(null);
    this.router.navigate(['/login']);
  }
  allUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/users');
  }
}
