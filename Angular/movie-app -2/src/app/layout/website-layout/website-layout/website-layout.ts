import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-website-layout',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './website-layout.html',
  styleUrl: './website-layout.css',
})
export class WebsiteLayout {}
