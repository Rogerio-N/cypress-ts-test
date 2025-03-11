import LoginPage from 'cypress/pages/login'

describe('Login test cenarios', () => {
    beforeEach(() => {
        cy.visit('/signin')
    })

    it('should login with valid credentials', () => {
        const loginPage = new LoginPage()
        cy.fixture('users').then((users) => {
            const user = users.results[0]
            cy.intercept('POST', '/login').as('login')
            loginPage.typeUsername(user.username)
            loginPage.typePassword(Cypress.env('defaultPassword'))
            loginPage.clickButtonSignin()
            cy.wait('@login').its('response.statusCode').should('eq', 200)
        })
    })
})
