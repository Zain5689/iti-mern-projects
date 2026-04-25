import { MovieService } from './../movies/services/movie';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';
import { MovieCard } from '../movies/movie-card/movie-card';
import { env } from '../../core/env';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestimonialCard, CommonModule, RouterModule, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);
  private router = inject(Router);

  popularMovies = toSignal(
    this.movieService.getAllMovies().pipe(map((movies) => movies.slice(0, 4))),
    { initialValue: [] },
  );
  readonly imgPrefix = env.imgPrefix;

  goToDetails(id: number) {
    this.router.navigate(['/movies', id]);
  }
}
