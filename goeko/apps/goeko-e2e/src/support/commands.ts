// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const getElInputByName = (name: string) => cy.get(`go-input[name="${name}"]`).shadow().find('input')

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email?: string, password?: string): void
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (email = Cypress.env('email'), password = Cypress.env('password')) => {
  getElInputByName('email').type(email)
  getElInputByName('current-password').type(password)
  cy.get('button[type="submit"]').click()
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
