describe('End User landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('eu/en-us/content/topics/end-user/end-user-home.htm')
  })

  it('displays expected content structures in English', () => {
    // cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(7)
    cy.hasBreadcrumbs('Documentation for end users')
    cy.hasTopMenuBar(4, 9)
    cy.hasBodyContent()
    cy.hasTiles(4)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hasMadCapSearchBar('Search Field')
  })
})

describe('End User landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('eu/ja-jp/content/topics/end-user/end-user-home.htm')
  })

  it('displays expected content structures in Japanese', () => {
    // cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(7)
    // Vendor changed the following string in 12/22 from "エンドユーザー向けのドキュメント"
    cy.hasBreadcrumbs('エンドユーザー向けドキュメント')
    cy.hasTopMenuBar(4, 9)
    cy.hasBodyContent()
    cy.hasTiles(4)
    cy.hasDeferAttrsCorrectlyApplied()
    // cy.hasQualtrics()
    cy.hasMadCapSearchBar('検索フィールド')
  })
})
