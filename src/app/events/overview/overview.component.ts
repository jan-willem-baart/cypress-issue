import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  openDialog() {
    this.router.navigate(['edit', 6], {
      relativeTo: this.route,
    });
  }
}
