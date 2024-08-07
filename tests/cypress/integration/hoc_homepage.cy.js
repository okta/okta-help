describe('Okta H.O.C. landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/content/index.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Docs')
    cy.hasCopyright()
    cy.hasLeftSideNavHidden()
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('Okta H.O.C. landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('ja-jp/content/index.htm')
  })

  it('displays expected content structures in Japanese', () => {
    // cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNavHidden()
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()

    cy.get('p[class="tile-title"] > a')
    .each(($el) => {
      cy.wrap($el)
        .should('have.attr', 'href')
        .and('not.contain', 'en-us')
    })
  })
})
