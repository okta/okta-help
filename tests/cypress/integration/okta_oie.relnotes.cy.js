describe('OIE release notes landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('oie/en-us/content/topics/releasenotes/oie-relnotes.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Docs')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Release notes')
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    // cy.hasTiles(5)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('OIE release notes production page (en-US)', () => {
  beforeEach(() => {
    cy.visit('oie/en-us/content/topics/releasenotes/production-oie.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Docs')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Production')
    cy.hasTopMenuBar(6, 10)
    cy.hasBodyContent()
    cy.hasTabs(3)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})
