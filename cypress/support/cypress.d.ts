/// <reference types="cypress" />

import type users from '../fixtures/users.json'

interface FixtureTypes {
    users: typeof users
}

declare global {
    namespace Cypress {
        interface Chainable {
            fixture<K extends keyof FixtureTypes>(
                fixtureName: K
            ): Chainable<FixtureTypes[K]>

            login(username: string)

            createTransaction(
                value?: number,
                note?: string,
                type?: 'payment' | 'request'
            )

            createBankAccount(
                name?: string,
                routingNumber?: string,
                accountNumber?: string
            )
        }
    }
}
