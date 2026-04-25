import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../services/movie';
import { env } from '../../../core/env';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  private movieService = inject(MovieService);

  readonly movies = toSignal(this.movieService.getAllMovies(), { initialValue: [] });

  readonly posterPrefix = env.posterPrefix;
}
