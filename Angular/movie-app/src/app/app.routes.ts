import { Routes } from '@angular/router';
import { MovieList } from './features/movies/movie-list/movie-list';
import { Home } from './features/pages/home/home';
import { About } from './features/pages/about/about';
import { Contact } from './features/pages/contact/contact';
import { NotFound } from './features/pages/not-found/not-found';
import { MovieDetails } from './features/movies/movie-details/movie-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: MovieList },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'movies/:id', component: MovieDetails },
  { path: '**', component: NotFound },
];
