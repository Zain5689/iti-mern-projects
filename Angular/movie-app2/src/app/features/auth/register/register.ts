import { Component, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/Services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  apiErrors: WritableSignal<string[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  registerForm: FormGroup = new FormGroup(
    {
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.confirmPasswordValidator },
  );

  confirmPasswordValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confPass = group.get('confirmPassword')?.value;
    if (pass === confPass) {
      group.get('confirmPassword')?.setErrors(null);
      return null;
    } else {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  handleRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.apiErrors.set([]);
      const { confirmPassword, ...model } = this.registerForm.value;

      this.authService.signUp(model).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading.set(false);
          const errorData = err.error?.errors || [err.error?.message || 'Registration Failed'];
          this.apiErrors.set(Array.isArray(errorData) ? errorData : [errorData]);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
