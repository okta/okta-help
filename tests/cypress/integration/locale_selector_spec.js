describe('Locale switching for H.O.C. home page', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('en-us/Content/index.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'ja-jp/Content/index.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('ja-jp/Content/index.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          // 'title' should be "言語の変更" but isn't -- we need to translate aria-labels!
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'en-us/Content/index.htm')
  })
})


describe('Locale switching for ASA', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

})

describe('Locale switching for Classic', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('en-us/Content/index-admin.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'ja-jp/Content/index-admin.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('ja-jp/Content/index-admin.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'en-us/Content/index-admin.htm')
  })
})

describe('Locale switching for Classic release notes', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'ja-jp/Content/Topics/ReleaseNotes/okta-relnotes.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('ja-jp/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
  })
})

describe('Locale switching for End User', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('eu/en-us/Content/Topics/end-user/end-user-home.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })
})

describe('Locale switching for OIE', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('oie/en-us/Content/Topics/identity-engine/oie-index.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'oie/en-us/Content/Topics/identity-engine/oie-index.htm')
  })
})

describe('Locale switching for OIE release notes', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'oie/ja-jp/Content/Topics/ReleaseNotes/oie-relnotes.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('oie/ja-jp/Content/Topics/ReleaseNotes/oie-relnotes.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')
  })
})

describe('Locale switching for Workflows', () => {

  it('switches from en-US to ja-JP', () => {
    cy.visit('wf/en-us/Content/Topics/Workflows/workflows-main.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', 'Change language')
          .should('be.visible')
      })
      .click()
    cy.get('a').contains('日本語 (日本)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
  })

  it('switches from ja-JP to en-US', () => {
    cy.visit('wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
    cy.get('button.select-language-button')
      .trigger('mouseover')
      .find('div.button-icon-wrapper')
      .then(($el) => {
        cy.wrap($el)
          .should('have.attr', 'aria-label', '言語の変更')
          .should('be.visible')
      })
      .click()
    cy.get('a')
      .contains('English (United States)‎')
      .should('be.visible')
      .click()
    cy.url().should('include', 'wf/en-us/Content/Topics/Workflows/workflows-main.htm')
  })
})
