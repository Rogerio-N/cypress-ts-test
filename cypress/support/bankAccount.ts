import { CreateBankAccountPage } from 'cypress/pages/bankAccountsPage'
import { aliasMutation } from 'cypress/utils/graphqlUtils'

Cypress.Commands.add(
    'createBankAccount',
    (
        name = `Bank of Test ${crypto.randomUUID()}`,
        routingNumber = '123456789',
        accountNumber = '987654321'
    ) => {
        cy.visit('/bankaccounts/new')
        const createBankAccountPage = new CreateBankAccountPage()
        createBankAccountPage.typeBankAccountName(name)
        createBankAccountPage.typeRoutingNumber(routingNumber)
        createBankAccountPage.typeAccountNumber(accountNumber)
        cy.intercept('POST', '/graphql', (req) => {
            aliasMutation(req, 'CreateBankAccount')
        })
        createBankAccountPage.clickButtonSaveAccount()
        cy.wait('@gqlCreateBankAccountMutation')
            .its('response.statusCode')
            .should('eq', 200)
    }
)
