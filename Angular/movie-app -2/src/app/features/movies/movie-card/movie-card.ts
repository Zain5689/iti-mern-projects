import { env } from './../../../core/data/env';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../shared/models/interfaces/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
})
export class MovieCard {
  @Input({ required: true }) movie!: Movie;
  private router = inject(Router);

  readonly imgPrefix = env.imgPrefix;
  goToDetails() {
    this.router.navigate(['movies/', this.movie.id]);
  }
}
