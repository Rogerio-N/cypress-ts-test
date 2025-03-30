export class CreateBankAccountPage {
    private elements = {
        inputBankAccountName: () => cy.get('#bankaccount-bankName-input'),
        textBankAccountNameValidation: () =>
            cy.get('#bankaccount-bankName-input-helper-text'),
        inputRoutingNumber: () => cy.get('#bankaccount-routingNumber-input'),
        textRoutingNumberValidation: () =>
            cy.get('#bankaccount-routingNumber-input-helper-text'),
        inputAccountNumber: () => cy.get('#bankaccount-accountNumber-input'),
        textAccountNumberValidation: () =>
            cy.get('#bankaccount-accountNumber-input-helper-text'),
        buttonSaveAccount: () => cy.findByRole('button', { name: 'Save' }),
    }

    getInputBankAccountName() {
        return this.elements.inputBankAccountName()
    }

    typeBankAccountName(name: string) {
        this.elements.inputBankAccountName().type(name)
    }

    getTextBankAccountNameValidation() {
        return this.elements.textBankAccountNameValidation()
    }

    getInputRoutingNumber() {
        return this.elements.inputRoutingNumber()
    }

    typeRoutingNumber(routingNumber: string) {
        this.elements.inputRoutingNumber().type(routingNumber)
    }

    getTextRoutingNumberValidation() {
        return this.elements.textRoutingNumberValidation()
    }

    getInputAccountNumber() {
        return this.elements.inputAccountNumber()
    }

    typeAccountNumber(accountNumber: string) {
        this.elements.inputAccountNumber().type(accountNumber)
    }

    getTextAccountNumberValidation() {
        return this.elements.textAccountNumberValidation()
    }

    clickButtonSaveAccount() {
        this.elements.buttonSaveAccount().click()
    }

    getButtonSaveAccount() {
        return this.elements.buttonSaveAccount()
    }
}
