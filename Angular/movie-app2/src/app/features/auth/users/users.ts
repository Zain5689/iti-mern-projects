import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../core/Services/auth-service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  allUsers: WritableSignal<any[]> = signal([]);
  constructor(private readonly authService: AuthService) {}
  ngOnInit(): void {
    this.authService.allUsers().subscribe({
      next: (res) => this.allUsers.set(res),
      error: (err) => console.log(err),
    });
  }
}
