describe('OIE landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('oie/en-us/content/topics/identity-engine/oie-index.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Docs')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Identity Engine')
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('OIE landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('oie/ja-jp/content/topics/identity-engine/oie-index.htm')
  })

  it('displays expected content structures in Japanese', () => {
    // cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Identity Engine')
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})
