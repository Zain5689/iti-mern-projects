import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from '../../../shared/models/interfaces/movie.model';
import { env } from '../../../core/env';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '392e7da67e8860f48faaf7ea3b1d1599';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>(env.baseurl)
      .pipe(map((response) => response.results));
  }

  getMovieById(id: number): Observable<Movie> {
    const url = `${env.detailsUrl}/${id}?api_key=${this.apiKey}`;
    return this.http.get<Movie>(url);
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
