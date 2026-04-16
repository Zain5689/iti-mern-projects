import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { imgPrefix } from '../../../shared/models/data/movies.data';
import { MovieService } from '../services/movie';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  private movieService = inject(MovieService);
  readonly movies = this.movieService.getAllMovies();
  readonly imgPrefix = imgPrefix;
}
