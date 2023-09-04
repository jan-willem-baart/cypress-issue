import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    RouterModule,
  ],
})
export class AppComponent {
  title = 'cypress-issue';
}
