describe('goeko-e2e', () => {
  beforeEach(() => cy.visit('https://goeko-dev.web.app'))

  it('should display welcome message', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    cy.login(email, password)
    

    // Function helper example, see `../support/app.po.ts` file
  })
})
