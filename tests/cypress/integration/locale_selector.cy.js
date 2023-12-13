let appHasStarted = false

// We need to wait until change language button is initialized.
// When on click event listener is attached to the button, it's good
// signal to start the test.
function spyOnAddEventListener (win) {
  appHasStarted = false
  // win = window object in our application
  const addListener = win.EventTarget.prototype.addEventListener

  win.EventTarget.prototype.addEventListener = function (name) {
    if (this.className &&
        this.className.indexOf('select-language-button') !== -1 &&
        name === 'click') {
      // web app added an event listener to the input box -
      // that means the web application has started
      appHasStarted = true
      // restore the original event listener
      win.EventTarget.prototype.addEventListener = addListener
    }

    /* eslint-disable-next-line prefer-rest-params */
    return addListener.apply(this, arguments)
  }
}

function waitForAppStart () {
  // keeps rechecking "appHasStarted" variable
  return new Cypress.Promise((resolve, reject) => {
    const isReady = () => {
      if (appHasStarted) {
        return resolve()
      }

      setTimeout(isReady, 0)
    }

    isReady()
  })
}

function visitAndWaitForInitialize (path) {
  cy.visit(path, {
    onBeforeLoad: spyOnAddEventListener,
  }).then(waitForAppStart)
}

describe('Locale switching', () => {
  it('redirects to expected URLs for H.O.C. home', () => {
    visitAndWaitForInitialize('en-us/content/index.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/content/index.htm')

    visitAndWaitForInitialize('ja-jp/content/index.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('redirects to expected URLs for ASA', () => {
    visitAndWaitForInitialize('asa/en-us/content/topics/adv_server_access/docs/asa-overview.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'asa/ja-jp/content/topics/adv_server_access/docs/asa-overview.htm')

    visitAndWaitForInitialize('asa/ja-jp/content/topics/adv_server_access/docs/asa-overview.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'asa/en-us/content/topics/adv_server_access/docs/asa-overview.htm')
  })

  it('redirects to expected URLs for Classic', () => {
    visitAndWaitForInitialize('en-us/content/index-admin.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/content/index-admin.htm')

    visitAndWaitForInitialize('ja-jp/content/index-admin.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'en-us/content/index-admin.htm')
  })

  it('redirects to expected URLs for Classic release notes', () => {
    visitAndWaitForInitialize('en-us/content/topics/releasenotes/okta-relnotes.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/content/topics/releasenotes/okta-relnotes.htm')

    visitAndWaitForInitialize('ja-jp/content/topics/releasenotes/okta-relnotes.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'en-us/content/topics/releasenotes/okta-relnotes.htm')
  })

  it('redirects to expected URLs for End User', () => {
    visitAndWaitForInitialize('eu/en-us/content/topics/end-user/end-user-home.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'eu/ja-jp/content/topics/end-user/end-user-home.htm')

    visitAndWaitForInitialize('eu/ja-jp/content/topics/end-user/end-user-home.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'eu/en-us/content/topics/end-user/end-user-home.htm')
  })

  it('redirects to expected URLs for OAG', () => {
    visitAndWaitForInitialize('oag/en-us/content/topics/access-gateway/ag-main.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oag/ja-jp/content/topics/access-gateway/ag-main.htm')

    visitAndWaitForInitialize('oag/ja-jp/content/topics/access-gateway/ag-main.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'oag/en-us/content/topics/access-gateway/ag-main.htm')
  })

  it('redirects to expected URLs for OIE', () => {
    visitAndWaitForInitialize('oie/en-us/content/topics/identity-engine/oie-index.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oie/ja-jp/content/topics/identity-engine/oie-index.htm')

    visitAndWaitForInitialize('oie/ja-jp/content/topics/identity-engine/oie-index.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'oie/en-us/content/topics/identity-engine/oie-index.htm')
  })

  it('redirects to expected URLs for OIE release notes', () => {
    visitAndWaitForInitialize('oie/en-us/content/topics/releasenotes/oie-relnotes.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oie/ja-jp/content/topics/releasenotes/oie-relnotes.htm')

    visitAndWaitForInitialize('oie/ja-jp/content/topics/releasenotes/oie-relnotes.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'oie/en-us/content/topics/releasenotes/oie-relnotes.htm')
  })

  it('redirects to expected URLs for Workflows', () => {
    visitAndWaitForInitialize('wf/en-us/content/topics/workflows/workflows-main.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'wf/ja-jp/content/topics/workflows/workflows-main.htm')

    visitAndWaitForInitialize('wf/ja-jp/content/topics/workflows/workflows-main.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'wf/en-us/content/topics/workflows/workflows-main.htm')
  })
})
