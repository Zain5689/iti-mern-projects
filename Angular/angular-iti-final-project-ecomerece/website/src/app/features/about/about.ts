// about.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  values = signal([
    {
      title: 'Our mission',
      icon: 'fa-regular fa-heart',
      desc: 'Deliver thoughtfully designed products that blend style and sustainability.',
    },
    {
      title: 'Our vision',
      icon: 'fa-regular fa-eye',
      desc: 'Create a global community where modern aesthetic meets mindful consumption.',
    },
    {
      title: 'Ethical promise',
      icon: 'fa-regular fa-hand-sparkles',
      desc: 'We partner with fair-trade artisans and use eco-friendly materials.',
    },
  ]);

  stats = signal([
    { value: '500+', label: 'Products curated' },
    { value: '12k', label: 'Customers served' },
    { value: '24/7', label: 'Support' },
    { value: '30+', label: 'Countries' },
  ]);

  team = signal([
    { name: 'Emma Reynolds', role: 'Founder & Creative' },
    { name: 'Liam Chen', role: 'Head of Product' },
    { name: 'Sofia Martinez', role: 'Customer Experience' },
    { name: 'James Wilson', role: 'Sustainability Lead' },
  ]);
}
