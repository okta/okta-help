describe('Locale switching for H.O.C. home page', () => {

  it('works as expected', () => {
    cy.visit('en-us/Content/index.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/Content/index.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'en-us/Content/index.htm')
  })
})


describe('Locale switching for ASA', () => {

  it('works as expected', () => {
    cy.visit('asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })
})

describe('Locale switching for Classic', () => {

  it('works as expected', () => {
    cy.visit('en-us/Content/index-admin.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/Content/index-admin.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'en-us/Content/index-admin.htm')
  })
})

describe('Locale switching for Classic release notes', () => {

  it('works as expected', () => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
  })
})

describe('Locale switching for End User', () => {

  it('works as expected', () => {
    cy.visit('eu/en-us/Content/Topics/end-user/end-user-home.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })
})

describe('Locale switching for OIE', () => {

  it('works as expected', () => {
    cy.visit('oie/en-us/Content/Topics/identity-engine/oie-index.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'oie/en-us/Content/Topics/identity-engine/oie-index.htm')
  })
})

describe('Locale switching for OIE release notes', () => {

  it('works as expected', () => {
    cy.visit('oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oie/ja-jp/Content/Topics/ReleaseNotes/oie-relnotes.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')
  })
})

describe('Locale switching for Workflows', () => {

  it('works as expected', () => {
    cy.visit('wf/en-us/Content/Topics/Workflows/workflows-main.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
    cy.switchLocale('言語の変更', 'English (United States)')
    cy.url().should('include', 'wf/en-us/Content/Topics/Workflows/workflows-main.htm')
  })
})
