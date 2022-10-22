describe('End User landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })
  it('displays as expected', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasPreviousTopicArrow()
    cy.hasNextTopicArrow()
    cy.hasTopMenuBar(4, 6)
    cy.hasBodyContent() 
    cy.hasTiles(4)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hasMadCapSearchBar()
  })
})

describe('End User landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })
  it('displays as expected', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasPreviousTopicArrow()
    cy.hasNextTopicArrow()
    cy.hasTopMenuBar(4, 6)
    cy.hasBodyContent() 
    cy.hasTiles(4)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    // cy.hasCoveoSearchBar()
  })
})