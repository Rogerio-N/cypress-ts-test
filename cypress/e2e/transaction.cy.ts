import { CreateTransactionPage } from 'cypress/pages/createTransactionPage'

describe('Transaction test scenarios', () => {
    beforeEach(() => {
        cy.login('Keegan35')
    })

    describe('Create transaction', () => {
        it('should create a payment transaction', () => {
            cy.intercept('GET', '/users', (req) => {
                delete req.headers['if-none-match']
            }).as('getUsers')
            cy.visit('/transaction/new')
            cy.wait('@getUsers').its('response.statusCode').should('eq', 200)

            const createTransactionPage = new CreateTransactionPage()
            createTransactionPage.selectRandomUser()
            createTransactionPage.getCheckSelectContactStep().should('exist')

            cy.intercept('POST', '/transactions').as('payment')
            createTransactionPage.typeAmount('1')
            createTransactionPage.typeNote('Test Payment Transaction')
            createTransactionPage.clickButtonPay()
            cy.wait('@payment').its('response.statusCode').should('eq', 200)

            createTransactionPage.getCheckPaymentStep().should('exist')
            createTransactionPage.getCheckCompleteStep().should('exist')
        })

        it('should create a request transaction', () => {
            cy.intercept('GET', '/users').as('getUsers')
            cy.visit('/transaction/new')
            cy.wait('@getUsers').its('response.statusCode').should('eq', 200)

            const createTransactionPage = new CreateTransactionPage()
            createTransactionPage.selectRandomUser()
            createTransactionPage.getCheckSelectContactStep().should('exist')

            cy.intercept('POST', '/transactions').as('request')
            createTransactionPage.typeAmount('1')
            createTransactionPage.typeNote('Test Request Transaction')
            createTransactionPage.clickButtonRequest()
            cy.wait('@request').its('response.statusCode').should('eq', 200)

            createTransactionPage.getCheckPaymentStep().should('exist')
            createTransactionPage.getCheckCompleteStep().should('exist')
        })
    })
})
