import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  image: string;
  isAdmin: boolean;
}

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
    isAdmin: false,
  };

  showAlert(isAdmin: boolean) {
    alert(isAdmin ? ' Admin Dashboard' : '👤  User Profile');
  }
}
