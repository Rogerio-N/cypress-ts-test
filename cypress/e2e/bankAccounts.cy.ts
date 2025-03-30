import {
    CreateBankAccountPage,
    ListBankAccountsPage,
} from 'cypress/pages/bankAccountsPage'
import { RouteMatcher } from 'cypress/types/net-stubbing'
import { aliasMutation, aliasQuery } from 'cypress/utils/graphqlUtils'

describe('Bank accounts test', () => {
    const gqlRouteMatcher: RouteMatcher = {
        method: 'POST',
        url: '/graphql',
    }

    beforeEach(() => {
        cy.login('Keegan35')
    })

    describe('List bank accounts', () => {
        it('should list all bank accounts', () => {
            const listBankAccountsPage = new ListBankAccountsPage()
            cy.intercept(gqlRouteMatcher, (req) => {
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
            cy.intercept(gqlRouteMatcher, (req) => {
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

    describe('Create bank account', () => {
        it('should create bank account', () => {
            const listBankAccountsPage = new ListBankAccountsPage()
            cy.intercept(gqlRouteMatcher, (req) => {
                aliasQuery(req, 'ListBankAccount')
            })
            cy.visit('/bankaccounts')
            cy.wait('@gqlListBankAccountQuery')
                .its('response.statusCode')
                .should('eq', 200)
            listBankAccountsPage.clickButtonCreateBankAccount()

            const createBankAccountPage = new CreateBankAccountPage()
            const bankAccountName = `Bank of Test ${crypto.randomUUID()}`
            createBankAccountPage.typeBankAccountName(bankAccountName)
            createBankAccountPage.typeRoutingNumber('123456789')
            createBankAccountPage.typeAccountNumber('987654321')
            cy.intercept(gqlRouteMatcher, (req) => {
                aliasMutation(req, 'CreateBankAccount')
            })
            createBankAccountPage.clickButtonSaveAccount()
            cy.wait('@gqlCreateBankAccountMutation')
                .its('response.statusCode')
                .should('eq', 200)

            listBankAccountsPage
                .getListBankAccounts()
                .should('contain.text', bankAccountName)
        })

        describe('expected errors', () => {
            it('should show error message when create bank account with empty name', () => {
                const listBankAccountsPage = new ListBankAccountsPage()
                cy.intercept(gqlRouteMatcher, (req) => {
                    aliasQuery(req, 'ListBankAccount')
                })
                cy.visit('/bankaccounts')
                cy.wait('@gqlListBankAccountQuery')
                    .its('response.statusCode')
                    .should('eq', 200)
                listBankAccountsPage.clickButtonCreateBankAccount()

                const createBankAccountPage = new CreateBankAccountPage()
                createBankAccountPage.getInputBankAccountName().focus().blur()
                createBankAccountPage.typeRoutingNumber('123456789')
                createBankAccountPage.typeAccountNumber('987654321')
                createBankAccountPage
                    .getTextBankAccountNameValidation()
                    .should('exist')
                    .and('have.text', 'Enter a bank name')
                createBankAccountPage
                    .getButtonSaveAccount()
                    .should('be.disabled')
            })

            it('should show error message when create bank account with empty routing number', () => {
                const listBankAccountsPage = new ListBankAccountsPage()
                cy.intercept(gqlRouteMatcher, (req) => {
                    aliasQuery(req, 'ListBankAccount')
                })
                cy.visit('/bankaccounts')
                cy.wait('@gqlListBankAccountQuery')
                    .its('response.statusCode')
                    .should('eq', 200)
                listBankAccountsPage.clickButtonCreateBankAccount()

                const createBankAccountPage = new CreateBankAccountPage()
                createBankAccountPage.typeBankAccountName('Bank of Test')
                createBankAccountPage.getInputRoutingNumber().focus().blur()
                createBankAccountPage.typeAccountNumber('987654321')
                createBankAccountPage
                    .getTextRoutingNumberValidation()
                    .should('exist')
                    .and('have.text', 'Enter a valid bank routing number')
                createBankAccountPage
                    .getButtonSaveAccount()
                    .should('be.disabled')
            })

            it('should show error message when create bank account with invalid routing number', () => {
                const listBankAccountsPage = new ListBankAccountsPage()
                cy.intercept(gqlRouteMatcher, (req) => {
                    aliasQuery(req, 'ListBankAccount')
                })
                cy.visit('/bankaccounts')
                cy.wait('@gqlListBankAccountQuery')
                    .its('response.statusCode')
                    .should('eq', 200)
                listBankAccountsPage.clickButtonCreateBankAccount()

                const createBankAccountPage = new CreateBankAccountPage()
                createBankAccountPage.typeBankAccountName('Bank of Test')
                createBankAccountPage.typeRoutingNumber('12345678')
                createBankAccountPage.typeAccountNumber('987654321')
                createBankAccountPage
                    .getTextRoutingNumberValidation()
                    .should('exist')
                    .and('have.text', 'Must contain a valid routing number')
                createBankAccountPage
                    .getButtonSaveAccount()
                    .should('be.disabled')
            })

            it('should show error message when create bank account with empty account number', () => {
                const listBankAccountsPage = new ListBankAccountsPage()
                cy.intercept(gqlRouteMatcher, (req) => {
                    aliasQuery(req, 'ListBankAccount')
                })
                cy.visit('/bankaccounts')
                cy.wait('@gqlListBankAccountQuery')
                    .its('response.statusCode')
                    .should('eq', 200)
                listBankAccountsPage.clickButtonCreateBankAccount()

                const createBankAccountPage = new CreateBankAccountPage()
                createBankAccountPage.typeBankAccountName('Bank of Test')
                createBankAccountPage.typeRoutingNumber('123456789')
                createBankAccountPage.getInputAccountNumber().focus().blur()
                createBankAccountPage
                    .getTextAccountNumberValidation()
                    .should('exist')
                    .and('have.text', 'Enter a valid bank account number')
                createBankAccountPage
                    .getButtonSaveAccount()
                    .should('be.disabled')
            })

            it('should show error message when create bank account with invalid account number', () => {
                const listBankAccountsPage = new ListBankAccountsPage()
                cy.intercept(gqlRouteMatcher, (req) => {
                    aliasQuery(req, 'ListBankAccount')
                })
                cy.visit('/bankaccounts')
                cy.wait('@gqlListBankAccountQuery')
                    .its('response.statusCode')
                    .should('eq', 200)
                listBankAccountsPage.clickButtonCreateBankAccount()

                const createBankAccountPage = new CreateBankAccountPage()
                createBankAccountPage.typeBankAccountName('Bank of Test')
                createBankAccountPage.typeRoutingNumber('123456789')
                createBankAccountPage.typeAccountNumber('98765432')
                createBankAccountPage
                    .getTextAccountNumberValidation()
                    .should('exist')
                    .and('have.text', 'Must contain at least 9 digits')
                createBankAccountPage
                    .getButtonSaveAccount()
                    .should('be.disabled')
            })
        })
    })

    describe('Delete bank account', () => {
        it('should delete bank account', () => {
            cy.createBankAccount()
            const listBankAccountsPage = new ListBankAccountsPage()
            cy.intercept(gqlRouteMatcher, (req) => {
                aliasQuery(req, 'ListBankAccount')
            })
            cy.visit('/bankaccounts')
            cy.wait('@gqlListBankAccountQuery')
                .its('response.statusCode')
                .should('eq', 200)

            cy.intercept(gqlRouteMatcher, (req) => {
                aliasMutation(req, 'DeleteBankAccount')
            })
            listBankAccountsPage.clickLastButtonDelete()
            cy.wait('@gqlDeleteBankAccountMutation')
                .its('response.statusCode')
                .should('eq', 200)
            listBankAccountsPage
                .getListBankAccounts()
                .children()
                .last()
                .should('contain.text', '(Deleted)')
        })
    })
})
