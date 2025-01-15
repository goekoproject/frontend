export const getGreeting = () => cy.get('h1');
export const getGoInput = (name: string) => cy.get(`go-input[name="${name}"]`);
