import { Component } from '@angular/core';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';

@Component({
  selector: 'app-home',
  imports: [TestimonialCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
