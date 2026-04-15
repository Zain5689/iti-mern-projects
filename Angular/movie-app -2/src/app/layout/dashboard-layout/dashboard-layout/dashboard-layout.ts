import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aside } from '../components/aside/aside';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Aside],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {}
