import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EVENTS_ROUTES } from './routes';
import { mount } from 'cypress/angular';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper-component',
  template: '<router-outlet></router-outlet>',
})
class WrapperComponent {}

const setup = () => {
  return mount(WrapperComponent, {
    imports: [
      RouterTestingModule.withRoutes(EVENTS_ROUTES),
      NoopAnimationsModule,
    ],
  }).then(
    async ({
      fixture: {
        debugElement: { injector },
      },
    }) => {
      const ngZone = injector.get(NgZone);
      const router = injector.get(Router);

      await ngZone.run(() => router.navigate(['/']));
      return {
        ngZone,
        router,
        injector,
      };
    }
  );
};

describe('', () => {
  it('should test', () => {
    setup().then(() => {
      cy.get('[data-test=open-dialog]').click();
    });
  });
});
