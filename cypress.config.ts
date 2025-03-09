import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ) {
            return config
        },
    },
    env: {
        API_BASE_URL: 'http://localhost:3001',
    },
})
