describe('OIE landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('oie/en-us/Content/Topics/identity-engine/oie-index.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Identity Engine')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('OIE landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
  })

  it('displays expected content structures in Japanese', () => {
    cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Identity Engine')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})
