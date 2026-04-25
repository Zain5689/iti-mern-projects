import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/Services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  apiErrors: WritableSignal<string[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.loginForm.controls;
  }

  handleLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.apiErrors.set([]);

      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          localStorage.setItem('myToken', res.token);
          this.authService.saveUserData();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading.set(false);
          const errorData = err.error?.errors || [
            err.error?.message || 'Invalid Email or Password',
          ];
          this.apiErrors.set(Array.isArray(errorData) ? errorData : [errorData]);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
