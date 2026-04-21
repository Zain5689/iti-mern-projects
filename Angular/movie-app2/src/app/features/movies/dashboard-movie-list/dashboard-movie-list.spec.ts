import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMovieList } from './dashboard-movie-list';

describe('DashboardMovieList', () => {
  let component: DashboardMovieList;
  let fixture: ComponentFixture<DashboardMovieList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMovieList],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMovieList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
