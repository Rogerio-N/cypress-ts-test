export class CreateTransactionPage {
    private elements = {
        listUser: () => cy.get('[data-test="users-list"]'),
        inputSearchUser: () => cy.get('[data-test="user-list-search-input"]'),
        inputAmout: () => cy.get('#amount'),
        inputNote: () => cy.get('#transaction-create-description-input'),
        buttonRequest: () =>
            cy.get('[data-test="transaction-create-submit-request"]'),
        buttonPay: () =>
            cy.get('[data-test="transaction-create-submit-payment"]'),
        textStepSelectContact: () => cy.contains('Select Contact'),
        textStepPayment: () => cy.contains('Payment'),
        textStepComplete: () => cy.contains('Complete'),
        buttonReturn: () =>
            cy.get('[data-test="new-transaction-return-to-transactions"]'),
        buttonCreateAnother: () =>
            cy.get('[data-test="new-transaction-create-another-transaction"]'),
    }

    selectRandomUser() {
        this.elements
            .listUser()
            .children()
            .its('length')
            .then((length) => {
                const randomIndex = Math.floor(Math.random() * length)
                this.elements.listUser().children().eq(randomIndex).click()
            })
    }

    searchUser(username: string) {
        this.elements.inputSearchUser().type(username)
    }

    typeAmount(amount: string) {
        this.elements.inputAmout().type(amount)
    }

    typeNote(note: string) {
        this.elements.inputNote().type(note)
    }

    clickButtonRequest() {
        this.elements.buttonRequest().click()
    }

    clickButtonPay() {
        this.elements.buttonPay().click()
    }

    getCheckSelectContactStep() {
        return this.elements
            .textStepSelectContact()
            .parent()
            .parent()
            .find('[data-testid="CheckCircleIcon"]')
    }

    getCheckPaymentStep() {
        return this.elements
            .textStepPayment()
            .parent()
            .parent()
            .find('[data-testid="CheckCircleIcon"]')
    }

    getCheckCompleteStep() {
        return this.elements
            .textStepComplete()
            .parent()
            .parent()
            .find('[data-testid="CheckCircleIcon"]')
    }
}
