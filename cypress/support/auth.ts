import LoginPage from 'cypress/pages/login'

Cypress.Commands.add('login', (username: string) => {
    cy.session([username], () => {
        cy.visit('/signin')
        const loginPage = new LoginPage()
        cy.fixture('users').then((users) => {
            const user = users.results.filter(
                (user) => user.username === username
            )[0]
            cy.intercept('POST', '/login').as('login')
            loginPage.typeUsername(user.username)
            loginPage.typePassword(Cypress.env('defaultPassword'))
            loginPage.clickButtonSignin()
            cy.wait('@login').its('response.statusCode').should('eq', 200)
        })
    })
})
