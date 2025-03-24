export class ListTransactionPage {
    private elements = {
        pageMain: () => cy.get('[data-test="main"]'),
        listTransaction: () => cy.get('[data-test="transaction-list"]'),
        filterDate: () =>
            cy.get('[data-test="transaction-list-filter-date-range-button"]'),
        textEmptyList: () => cy.get('[data-test="empty-list-header"]'),
    }

    getListTransaction() {
        return this.elements.listTransaction()
    }

    scrollDownTransactionList() {
        this.elements.listTransaction().children().scrollTo('bottom')
    }

    /**
     * Filter transaction by range
     * @param date Optional - YYYY-MM-DD - If Empty, it will filter by current date
     */
    filterTransactionByDate(date?: string) {
        if (!date) {
            const jsDate = new Date()
            const month = (jsDate.getMonth() + 1).toString().padStart(2, '0')
            const day = jsDate.getDate().toString().padStart(2, '0')
            date = `${jsDate.getFullYear()}-${month}-${day}`
        }
        this.elements.filterDate().click({ force: true })
        this.elements
            .filterDate()
            .get(`[data-date="${date}"]`)
            .click({ force: true })
            .click({ force: true })
    }

    getTextEmptyList() {
        return this.elements.textEmptyList()
    }
}
