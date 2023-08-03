describe('OAG landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('displays expected content structures in English', () => {
    // cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    // There is an invisible space character in the breadcrumb
    cy.hasBreadcrumbs('Okta Access Gateway')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(6)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})

describe('OAG landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('oag/ja-jp/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('displays expected content structures in Japanese', () => {
    // cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Okta Access Gateway')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(6)
    cy.hasDeferAttrsCorrectlyApplied()
    cy.hasQualtrics()
    cy.hidesCoveoSearchBar()
  })
})
