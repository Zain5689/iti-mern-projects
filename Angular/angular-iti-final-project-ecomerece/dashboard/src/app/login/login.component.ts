import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  apiUrl = `${environment.apiUrl}/auth/login`;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post<any>(this.apiUrl, loginData).subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);

            try {
              const decoded: any = jwtDecode(res.token);

              const userRole = decoded.role;

              if (userRole) {
                localStorage.setItem('role', userRole);

                if (userRole === 'admin') {
                  this.router.navigate(['/admin/products']);
                } else {
                  this.router.navigate(['/']);
                }
              } else {
                this.errorMessage = 'No user role found';
              }
            } catch (decodeError) {
              console.error('Error decoding token:', decodeError);
              this.errorMessage = 'Error decoding token';
            }
          }
        },
        error: (err) => {
          console.error('Login Error:', err);
          this.errorMessage =
            err.error?.message ||
            'Failed to log in, please check your credentials or server';
        },
      });
    } else {
      this.errorMessage = 'Please enter the correct data';
    }
  }
}
