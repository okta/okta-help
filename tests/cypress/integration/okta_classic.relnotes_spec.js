describe('Classic release notes landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
  })
  it('displays as expected', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasPreviousTopicArrow()
    cy.hasNextTopicArrow()
    cy.hasTopMenuBar(5, 9)
    cy.hasBodyContent() 
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hasCoveoSearchBar()
  })
})

describe('Classic release notes production page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/production.htm')
  })
  it('displays as expected', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasPreviousTopicArrow()
    cy.hasNextTopicArrow()
    cy.hasTopMenuBar(5, 9)
    cy.hasBodyContent() 
    cy.hasTabs(4)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hasCoveoSearchBar()
  })
})
