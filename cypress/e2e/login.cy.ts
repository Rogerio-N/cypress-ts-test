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

    describe('Expected errors', () => {
        it('should show error message when login with invalid credentials', () => {
            const loginPage = new LoginPage()
            cy.fixture('users').then((users) => {
                const user = users.results[0]
                cy.intercept('POST', '/login').as('login')
                loginPage.typeUsername(user.username)
                loginPage.typePassword('invalidPassword')
                loginPage.clickButtonSignin()
                cy.wait('@login').its('response.statusCode').should('eq', 401)
                loginPage
                    .getAlert()
                    .should('exist')
                    .and('be.visible')
                    .and('contain.text', 'Username or password is invalid')
            })
        })

        it('should show error message when login with empty username', () => {
            const loginPage = new LoginPage()
            loginPage.clickButtonSignin()
            loginPage
                .getTextUsernameValidation()
                .should('contain.text', 'Username is required')
        })

        it('signin button should be disabled when login with empty password', () => {
            const loginPage = new LoginPage()
            loginPage.typeUsername('test')
            loginPage.getButtonSignin().should('be.disabled')
        })
    })
})
