export const getGreeting = () => cy.get('h1')
export const getButtonCookie = () => cy.get('button[data-testid="popup-ok"]')
export const getElInputByName = (name: string) => cy.get(`go-input[name="${name}"]`).shadow().find('input')
export const getIsPlatform = () => cy.get('goeko-platform')
