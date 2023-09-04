import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';

export interface DialogEntryData {
  route: ActivatedRoute;
}

@Component({
  template: '',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class DialogEntryComponent implements OnInit, OnDestroy {
  protected destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.route.snapshot.data['dialog'], {
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'routed',
      data: {
        route: this.route,
      } as DialogEntryData,
    });

    dialogRef
      .keydownEvents()
      .pipe(
        takeUntil(this.destroy$),
        tap((event) => {
          if (event.key === 'Escape') {
            dialogRef.close();
          }
        })
      )
      .subscribe();

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        tap(async () => {
          await this.router.navigate(['./'], {
            relativeTo: this.route.parent,
            queryParamsHandling: 'merge',
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
