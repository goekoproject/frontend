import { getButtonCookie, getIsPlatform } from '../support/app.po'

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    getButtonCookie().click({ force: true })
  })

  it('should display welcome message', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    cy.login(email, password)
    getIsPlatform().should('exist')

    // Function helper example, see `../support/app.po.ts` file
  })
})
