import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { imgPrefix, MOVIES_DATA } from '../../../core/data';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  readonly movies = MOVIES_DATA;
  readonly imgPrefix = imgPrefix;
}
