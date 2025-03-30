export class ListBankAccountsPage {
    private elemets = {
        listBankAccounts: () => cy.get('[data-test="bankaccount-list"]'),
        modalRequiredBankAccount: () => cy.findByRole('dialog'),
        buttonCreateBankAccount: () => cy.get('[data-test="bankaccount-new"]'),
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
}
