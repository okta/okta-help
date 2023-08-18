describe('Classic release notes landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/content/topics/releasenotes/okta-relnotes.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta product documentation')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Release notes')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(6)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('Classic release notes production page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/content/topics/releasenotes/production.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta product documentation')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Production')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTabs(4)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})
