import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  user: IUser = {
    id: 1,
    name: 'Zainab Hilal',
    email: 'zainabhilal@example.com',
    age: 23,
    image: 'assets/imgs/user.png',
    isAdmin: true,
  };

  showAlert(isAdmin: boolean) {
    alert(isAdmin ? ' Admin Profile' : '👤  User Profile');
  }
}
