import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  titles = ['Full Stack Developer', 'Freelancer'];
  currentTitleIndex = 0;

  constructor() {
    setInterval(() => {
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length
    }, 2000);
  }
}
