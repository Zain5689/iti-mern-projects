import { Component } from '@angular/core';

import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-website-layout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './website-layout.html',
  styleUrl: './website-layout.css',
})
export class WebsiteLayout {}
