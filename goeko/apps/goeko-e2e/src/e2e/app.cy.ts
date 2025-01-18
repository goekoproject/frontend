import { getIsPlatform, setAcceptCookiePolicy } from '../support/app.po'

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    setAcceptCookiePolicy()
  })

  it('should access to platform', () => {
    cy.login()
    getIsPlatform().should('exist')
  })
})
