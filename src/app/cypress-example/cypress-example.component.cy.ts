import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { mount } from 'cypress/angular';

import { CypressExampleComponent } from './cypress-example.component';

const setup = ({ text = '' } = {}) => {
  cy.log('before intercept');
  cy.intercept(
    {
      https: false,
      method: 'GET',
    },
    { text }
  ).as('getPath');
  cy.log('before mount');

  return mount(CypressExampleComponent, {
    imports: [
      HttpClientModule,
      NoopAnimationsModule,
    ],
  }).then(async () => {
    cy.wait(['@getPath']);
  });
};

describe('CypressExampleComponent', () => {
  it('should show given endpoint data', () => {
    const text = 'Dummy text';

    setup({ text }).then(() => {
      cy.get('p').contains(text).should('be.visible');
    });
  });

  it('simplified test without SIFERS setup', () => {
    const text = 'Dummy text';
    cy.log('intercept before')
    cy.intercept(
      {
        https: false,
        method: 'GET',
      },
      { text }
    ).as('getPath');

    cy.log('before mount');
    mount(CypressExampleComponent, {});
    cy.wait(['@getPath']);

    cy.get('p').contains(text).should('be.visible');
  });
});
