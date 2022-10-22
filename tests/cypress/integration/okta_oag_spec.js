describe('OAG landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
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
    cy.hasTiles(6)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hasCoveoSearchBar()
  })
})

// TODO 'OAG landing page (ja-JP)' NOT TRANSLATED YET
