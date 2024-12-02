import config from '../helpers/constants';
const { devices } = config;

describe('Login Form', () => {

  Cypress.Cookies.debug(true);

  devices.forEach((device) => {
    it('visit url', () => {
      cy.viewport(<Cypress.ViewportPreset>device);
      cy.clearAllCookies();
      cy.visit(`http://localhost:3000/login`);
    });

    it('fill form', () => {
      cy.viewport(<Cypress.ViewportPreset>device);
      cy.get('#email').type('cypress@test.com');
      cy.get('#password').type('cypresstest.99');
      cy.get('button[type="submit"]').click();
    })
  });
});
