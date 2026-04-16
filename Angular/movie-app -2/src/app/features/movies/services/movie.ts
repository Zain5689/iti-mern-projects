import { Injectable } from '@angular/core';
import { Movie } from '../../../shared/models/interfaces/movie.model';
import { MOVIES_DATA } from '../../../shared/models/data/movies.data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private allMovies: Movie[] = MOVIES_DATA;

  constructor() {}

  getAllMovies(): Movie[] {
    return this.allMovies;
  }

  getMovieById(id: number): Movie | undefined {
    return this.allMovies.find((movie) => movie.id === id);
  }

  getTestimonials() {
    return [
      {
        name: 'Zainab',
        comment:
          'The movie collection is incredible! I found all the latest releases in one place.',
        role: 'Movie Critic',
      },
      {
        name: 'Ali',
        comment: 'Excellent stream quality and the movie details are very detailed and helpful.',
        role: 'Cinema Lover',
      },
      {
        name: 'Soha',
        comment: 'The best platform for tracking my favorite series. The interface is so smooth!',
        role: 'Film Blogger',
      },
    ];
  }
}
