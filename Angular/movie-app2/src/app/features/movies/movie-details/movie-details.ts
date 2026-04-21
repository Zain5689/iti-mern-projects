import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../shared/models/interfaces/movie.model';
import { MovieService } from '../services/movie';
import { env } from '../../../core/data/env';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.html',
})
export class MovieDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = signal<Movie | null>(null);

  readonly posterPrefix = env.posterPrefix;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const movieId = Number(params['id']);

      this.movieService.getMovieById(movieId).subscribe({
        next: (data) => {
          this.movie.set(data);
        },
        error: (err) => {
          console.error('Movie NOT Found', err);
          this.movie.set(null);
        },
      });
    });
  }
}
