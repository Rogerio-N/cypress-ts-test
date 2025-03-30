import { ListBankAccountsPage } from 'cypress/pages/bankAccountsPage'
import { aliasQuery } from 'cypress/utils/graphqlUtils'

describe('Bank accounts test', () => {
    beforeEach(() => {
        cy.login('Keegan35')
    })

    describe('List bank accounts', () => {
        it('should list all bank accounts', () => {
            const listBankAccountsPage = new ListBankAccountsPage()
            cy.intercept('POST', '/graphql', (req) => {
                aliasQuery(req, 'ListBankAccount')
            })
            cy.visit('/bankaccounts')
            cy.wait('@gqlListBankAccountQuery')
                .its('response.statusCode')
                .should('eq', 200)
            listBankAccountsPage
                .getListBankAccounts()
                .should('exist')
                .and('not.be.empty')
        })

        it('should display modal when customer have no bankaccounts', () => {
            const listBankAccountsPage = new ListBankAccountsPage()
            cy.intercept('POST', '/graphql', (req) => {
                aliasQuery(req, 'ListBankAccount')
                req.reply({
                    statusCode: 200,
                    body: {
                        data: {
                            listBankAccount: [],
                        },
                    },
                })
            })
            cy.visit('/bankaccounts')
            cy.wait('@gqlListBankAccountQuery')
            listBankAccountsPage
                .getModalRequiredBankAccount()
                .should('exist')
                .and(
                    'contain.text',
                    'requires a Bank Account to perform transactions'
                )
        })
    })
})
