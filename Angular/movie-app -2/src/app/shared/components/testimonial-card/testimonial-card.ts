import { Component, inject } from '@angular/core';
import { MovieService } from '../../../features/movies/services/movie';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.css',
})
export class TestimonialCard {
  private movieService = inject(MovieService);
  readonly reviews = this.movieService.getTestimonials();
}
