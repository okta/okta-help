describe('Okta H.O.C. landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('en-us/Content/index.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasNoLeftSideNav()
    cy.hasTopMenuBar(5, 9)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hasCoveoSearchBar()
  })
})

describe('Okta H.O.C. landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('ja-jp/Content/index.htm')
  })

  it('displays expected content structures in Japanese', () => {
    cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasNoLeftSideNav()
    cy.hasTopMenuBar(5, 9)
    cy.hasBodyContent()
    cy.hasTiles(9)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hasCoveoSearchBar()
  })
})
