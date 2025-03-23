class LoginPage {
    private elements = {
        inputUsername: () => cy.get('#username'),
        textUsernameValidation: () => cy.get('#username-helper-text'),
        inputPassword: () => cy.get('#password'),
        buttonSignin: () => cy.get('[data-test="signin-submit"]'),
        alert: () => cy.findByRole('alert'),
    }

    typeUsername(username: string) {
        this.elements.inputUsername().type(username)
    }

    getTextUsernameValidation() {
        return this.elements.textUsernameValidation()
    }

    typePassword(password: string) {
        this.elements.inputPassword().type(password)
    }

    clickButtonSignin() {
        this.elements.buttonSignin().click()
    }

    getButtonSignin() {
        return this.elements.buttonSignin()
    }

    getAlert() {
        return this.elements.alert()
    }
}

export default LoginPage
