import { CreateTransactionPage } from 'cypress/pages/createTransactionPage'

Cypress.Commands.add(
    'createTransaction',
    (value = 1, note = 'Test Transaction', type = 'payment') => {
        cy.intercept('GET', '/users', (req) => {
            delete req.headers['if-none-match']
        }).as('getUsers')
        cy.visit('/transaction/new')
        cy.wait('@getUsers').its('response.statusCode').should('eq', 200)

        const createTransactionPage = new CreateTransactionPage()
        createTransactionPage.selectRandomUser()

        cy.intercept('POST', '/transactions').as('payment')
        createTransactionPage.typeAmount(value.toString())
        createTransactionPage.typeNote(note)
        if (type === 'payment') {
            createTransactionPage.clickButtonPay()
        } else {
            createTransactionPage.clickButtonRequest()
        }
        cy.wait('@payment').its('response.statusCode').should('eq', 200)
    }
)
