import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../shared/models/interfaces/movie.model';
import { MovieService } from '../services/movie';
import { imgPrefix, posterPrefix } from '../../../shared/models/data/movies.data';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.html',
})
export class MovieDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = signal<Movie | undefined>(undefined);
  readonly imgPrefix = imgPrefix;
  readonly posterPrefix = posterPrefix;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const movieId = Number(params['id']);

      const foundMovie = this.movieService.getMovieById(movieId);

      if (foundMovie) {
        this.movie.set(foundMovie);
      } else {
        console.error('Movie NOT Found');
      }
    });
  }
}
