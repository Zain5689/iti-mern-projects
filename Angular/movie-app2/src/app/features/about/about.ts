import { Component } from '@angular/core';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';

@Component({
  selector: 'app-about',
  imports: [TestimonialCard],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
