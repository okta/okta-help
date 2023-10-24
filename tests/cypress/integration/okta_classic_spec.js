describe('Classic landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/content/index-admin.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta product documentation')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Classic Engine')
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('Classic landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('ja-jp/content/index-admin.htm')
  })

  it('displays expected content structures in Japanese', () => {
    // cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Classic Engine')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})
