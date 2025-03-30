export class ListBankAccountsPage {
    private elemets = {
        listBankAccounts: () => cy.get('[data-test="bankaccount-list"]'),
        modalRequiredBankAccount: () => cy.findByRole('dialog'),
        buttonCreateBankAccount: () => cy.get('[data-test="bankaccount-new"]'),
        buttonListDeleteBankAccount: () =>
            cy.findAllByRole('button', { name: 'Delete' }),
    }

    getListBankAccounts() {
        return this.elemets.listBankAccounts()
    }

    getModalRequiredBankAccount() {
        return this.elemets.modalRequiredBankAccount()
    }

    clickButtonCreateBankAccount() {
        this.elemets.buttonCreateBankAccount().click({ force: true })
    }

    clickLastButtonDelete() {
        this.elemets.buttonListDeleteBankAccount().last().click({ force: true })
    }
}
