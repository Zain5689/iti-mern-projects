import { MovieService } from './../movies/services/movie';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';
import { imgPrefix } from '../../shared/models/data/movies.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestimonialCard, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);
  private router = inject(Router);

  popularMovies = this.movieService.getAllMovies().slice(0, 4);
  readonly imgPrefix = imgPrefix;

  goToDetails(id: number) {
    this.router.navigate(['/movies', id]);
  }
}
