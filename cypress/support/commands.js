Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('input[type=username]').type(username)
  cy.get('input[type=password]').type(`${password}`, { log: false })
  cy.get('button[type=submit]').click()
  cy.url().should('include', '/dashboard')
  cy.getCookie('access_token_cookie').should('exist')
  cy.get('h1').should('contain', username)
})

Cypress.Commands.add('resetDb', () => {
  // Reset the database
  cy.request('GET', '/api/dev/reset-db')
})

Cypress.Commands.add('seedUsers', () => {
  // Create only the default users
  cy.request('GET', '/api/dev/seed-users')
})

Cypress.Commands.add('seedData', () => {
  // Create the default users + posts, comments, etc.
  cy.request('GET', '/api/dev/seed-data')
})