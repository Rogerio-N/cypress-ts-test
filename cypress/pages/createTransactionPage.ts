export class CreateTransactionPage {
    private elements = {
        listUser: () => cy.get('[data-test="users-list"]'),
        inputSearchUser: () => cy.get('[data-test="user-list-search-input"]'),
        inputAmout: () => cy.get('#amount'),
        textAmountHelper: () =>
            cy.get('#transaction-create-amount-input-helper-text'),
        inputNote: () => cy.get('#transaction-create-description-input'),
        textNoteHelper: () =>
            cy.get('#transaction-create-description-input-helper-text'),
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

    getUsersList() {
        return this.elements.listUser()
    }

    typeAmount(amount: string) {
        this.elements.inputAmout().type(amount)
    }

    getTextAmountHelper() {
        return this.elements.textAmountHelper()
    }

    typeNote(note: string) {
        this.elements.inputNote().type(note)
    }

    getInputNote() {
        return this.elements.inputNote()
    }

    getTextNoteHelper() {
        return this.elements.textNoteHelper()
    }

    clickButtonRequest() {
        this.elements.buttonRequest().click()
    }

    getButtonRequest() {
        return this.elements.buttonRequest()
    }

    clickButtonPay() {
        this.elements.buttonPay().click()
    }

    getButtonPay() {
        return this.elements.buttonPay()
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

    clickButtonReturn() {
        this.elements.buttonReturn().click()
    }

    clickButtonCreateAnother() {
        this.elements.buttonCreateAnother().click()
    }
}
