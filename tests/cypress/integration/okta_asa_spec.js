describe('ASA landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('displays expected content structures in English', () => {
    cy.hasOktaHOCBanner('Okta Support')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('Advanced Server Access')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(6)
    cy.hasDeferAttrsCorrectlyApplied()
    /* cy.hasQualtrics() */
    cy.hidesCoveoSearchBar()
  })
})

describe('ASA landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('displays expected content structures in Japanese', () => {
    cy.hasOktaHOCBanner('Oktaサポート')
    cy.hasCopyright()
    cy.hasLeftSideNav()
    cy.hasTOC(9)
    cy.hasBreadcrumbs('アドバンストサーバーアクセス')
    cy.hasTopMenuBar(5, 11)
    cy.hasBodyContent()
    cy.hasTiles(6)
    cy.hasDeferAttrsCorrectlyApplied()
    /* cy.hasQualtrics() */
    cy.hidesCoveoSearchBar()
  })
})
