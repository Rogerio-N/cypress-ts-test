import { CreateTransactionPage } from 'cypress/pages/createTransactionPage'

describe('Transaction test scenarios', () => {
    beforeEach(() => {
        cy.login('Keegan35')

        cy.intercept('GET', '/users', (req) => {
            delete req.headers['if-none-match']
        }).as('getUsers')
        cy.visit('/transaction/new')
        cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
    })

    describe('Create transaction', () => {
        it('should create a payment transaction', () => {
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

        describe('Redirects', () => {
            it('should return to transactions list page', () => {
                const createTransactionPage = new CreateTransactionPage()
                createTransactionPage.selectRandomUser()
                createTransactionPage
                    .getCheckSelectContactStep()
                    .should('exist')

                cy.intercept('POST', '/transactions').as('request')
                createTransactionPage.typeAmount('1')
                createTransactionPage.typeNote('Test Request Transaction')
                createTransactionPage.clickButtonRequest()
                cy.wait('@request').its('response.statusCode').should('eq', 200)

                createTransactionPage.clickButtonReturn()
                cy.url().should('eq', `${Cypress.config().baseUrl}/`)
            })

            it('should return to transactions list page', () => {
                const createTransactionPage = new CreateTransactionPage()
                createTransactionPage.selectRandomUser()
                createTransactionPage
                    .getCheckSelectContactStep()
                    .should('exist')

                cy.intercept('POST', '/transactions').as('request')
                createTransactionPage.typeAmount('1')
                createTransactionPage.typeNote('Test Request Transaction')
                createTransactionPage.clickButtonRequest()
                cy.wait('@request').its('response.statusCode').should('eq', 200)

                createTransactionPage.clickButtonCreateAnother()
                cy.url().should(
                    'eq',
                    `${Cypress.config().baseUrl}/transaction/new`
                )
            })
        })

        describe('Expected errors', () => {
            it('should have an empty list when search for a non-existent contact', () => {
                const createTransactionPage = new CreateTransactionPage()
                createTransactionPage.searchUser('non-existent-user')
                createTransactionPage.getUsersList().should('be.empty')
            })

            it('should have a error message when amount is empty', () => {
                const createTransactionPage = new CreateTransactionPage()
                createTransactionPage.selectRandomUser()
                createTransactionPage.typeNote('Test empty amount')
                createTransactionPage
                    .getTextAmountHelper()
                    .should('exist')
                    .and('be.visible')
                    .and('contain.text', 'Please enter a valid amount')
                createTransactionPage.getButtonPay().should('be.disabled')
                createTransactionPage.getButtonRequest().should('be.disabled')
            })

            it('should have a error message when note is empty', () => {
                const createTransactionPage = new CreateTransactionPage()
                createTransactionPage.selectRandomUser()
                createTransactionPage.typeAmount('1')
                createTransactionPage.getInputNote().focus().blur()
                createTransactionPage
                    .getTextNoteHelper()
                    .should('exist')
                    .and('be.visible')
                    .and('contain.text', 'Please enter a note')
                createTransactionPage.getButtonPay().should('be.disabled')
                createTransactionPage.getButtonRequest().should('be.disabled')
            })
        })
    })
})
