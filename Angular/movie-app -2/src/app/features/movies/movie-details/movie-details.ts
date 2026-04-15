import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../shared/models/interfaces/movie.model';
import { imgPrefix, MOVIES_DATA, posterPrefix } from '../../../core/data';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.html',
})
export class MovieDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  movie = signal<Movie | undefined>(undefined);
  readonly imgPrefix = imgPrefix;
  readonly posterPrefix = posterPrefix;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const movieId = Number(params['id']);

      console.log('Searching for ID:', movieId);

      const foundMovie = MOVIES_DATA.find((m) => m.id === movieId);

      if (foundMovie) {
        this.movie.set(foundMovie);
        console.log('Movie Found:', foundMovie.title);
      } else {
        console.error('Movie NOT Found in MOVIES_DATA');
      }
    });
  }
}
