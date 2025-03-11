class LoginPage {
    private elements = {
        inputUsername: () => cy.get('#username'),
        inputPassword: () => cy.get('#password'),
        buttonSignin: () => cy.get('[data-test="signin-submit"]'),
    }

    typeUsername(username: string) {
        this.elements.inputUsername().type(username)
    }

    typePassword(password: string) {
        this.elements.inputPassword().type(password)
    }

    clickButtonSignin() {
        this.elements.buttonSignin().click()
    }
}

export default LoginPage
