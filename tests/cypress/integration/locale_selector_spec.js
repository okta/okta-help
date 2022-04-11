describe('Locale is set to ja-JP', () => {

  it('when Japanese is selected', () => {
    cy.visit('en-us/Content/index.htm')
    // change locale to ja-JP
    cy.get('[title="Change language"]')
      .should('be.hidden')
      .invoke('show')
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'ja-jp/Content/index.htm')
  })
})


describe('Locale is set to en-US', () => {

  it('when English is selected', () => {
    cy.visit('ja-jp/Content/index.htm')
    // change locale to en-US
    // 'title' should be "言語の変更" but isn't, this is a bug in Flare's JS
    cy.get('[title="Change language"]')
      .should('be.hidden')
      .invoke('show')
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'en-us/Content/index.htm')
  })
})
