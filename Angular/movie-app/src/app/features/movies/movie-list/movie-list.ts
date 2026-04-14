import { Component } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  MOVIES_DATA: Movie[] = [
    {
      id: 1523145,
      title: 'Your Heart Will Be Broken',
      original_title: 'Твоё сердце будет разбито',
      poster_path: '/7wIBfBl2gejt6xHxNSK0reVIm7E.jpg',
      backdrop_path: '/1x9e0qWonw634NhIsRdvnneeqvN.jpg',
      overview:
        'High school student Polina is saved from bullying at her new school and makes a deal with the main bully Bars: he must pretend to be her boyfriend and protect her, and she must do everything he says. During this game, the couple develops real feelings, but her family and classmates have reasons to separate the lovers.',
      release_date: '2026-03-26',
      vote_average: 7.129,
      vote_count: 58,
      popularity: 732.3257,
      original_language: 'ru',
      adult: false,
    },
    {
      id: 1226863,
      title: 'The Super Mario Galaxy Movie',
      original_title: 'The Super Mario Galaxy Movie',
      poster_path: '/eJGWx219ZcEMVQJhAgMiqo8tYY.jpg',
      backdrop_path: '/kxQiIJ4gVcD3K6o14MJ72p5yRcE.jpg',
      overview:
        "Having thwarted Bowser's previous plot to marry Princess Peach, Mario and Luigi now face a fresh threat in Bowser Jr., who is determined to liberate his father from captivity and restore the family legacy. Alongside companions new and old, the brothers travel across the stars to stop the young heir's crusade.",
      release_date: '2026-04-01',
      vote_average: 6.8,
      vote_count: 426,
      popularity: 576.8202,
      original_language: 'en',
      adult: false,
    },
    {
      id: 502356,
      title: 'The Super Mario Bros. Movie',
      original_title: 'The Super Mario Bros. Movie',
      poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
      backdrop_path: '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
      overview:
        'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
      release_date: '2023-04-05',
      vote_average: 7.588,
      vote_count: 10475,
      popularity: 324.1603,
      original_language: 'en',
      adult: false,
    },
    {
      id: 83533,
      title: 'Avatar: Fire and Ash',
      original_title: 'Avatar: Fire and Ash',
      poster_path: '/cf7hE1ifY4UNbS25tGnaTyyDrI2.jpg',
      backdrop_path: '/u8DU5fkLoM5tTRukzPC31oGPxaQ.jpg',
      overview:
        "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
      release_date: '2025-12-17',
      vote_average: 7.4,
      vote_count: 2553,
      popularity: 354.5655,
      original_language: 'en',
      adult: false,
    },
    {
      id: 1327819,
      title: 'Hoppers',
      original_title: 'Hoppers',
      poster_path: '/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg',
      backdrop_path: '/u53UYu5XG2hNgWGvs3xGhAVzypl.jpg',
      overview:
        "Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing people to communicate with animals as animals. Animal lover Mabel seizes an opportunity to use the technology, uncovering mysteries within the animal world beyond anything she could have imagined.",
      release_date: '2026-03-04',
      vote_average: 7.6,
      vote_count: 457,
      popularity: 312.0482,
      original_language: 'en',
      adult: false,
    },
    {
      id: 687163,
      title: 'Project Hail Mary',
      original_title: 'Project Hail Mary',
      poster_path: '/yihdXomYb5kTeSivtFndMy5iDmf.jpg',
      backdrop_path: '/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg',
      overview:
        'Science teacher Ryland Grace wakes up on a spaceship light years from home with no recollection of who he is or how he got there. As his memory returns, he begins to uncover his mission: solve the riddle of the mysterious substance causing the sun to die out. He must call on his scientific knowledge and unorthodox ideas to save everything on Earth from extinction… but an unexpected friendship means he may not have to do it alone.',
      release_date: '2026-03-15',
      vote_average: 8.233,
      vote_count: 1382,
      popularity: 308.6168,
      original_language: 'en',
      adult: false,
    },
  ];
}
