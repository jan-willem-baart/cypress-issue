import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { catchError, of, take, tap } from 'rxjs';


@Component({
  selector: 'app-cypress-example',
  standalone: true,
  imports: [MatButtonModule, HttpClientModule],
  template: `<p>{{ text }}</p>`
})
export class CypressExampleComponent implements OnInit {
  public text: string = '';

  constructor(protected http: HttpClient) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.http
      .get<{ text: string }>(`http://localhost:8080/pa/th`)
      .pipe(
        tap(() => console.log('get call executed')),
        take(1),
        catchError((error) => {
          console.error('Errrrrror: ', error);
          return of({ text: '' });
        }),
        tap((req) => (this.text = req.text))
      )
      .subscribe();
  }
}
