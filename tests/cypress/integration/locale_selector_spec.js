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
    visitAndWaitForInitialize('en-us/Content/index.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/Content/index.htm')

    visitAndWaitForInitialize('ja-jp/Content/index.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'en-us/Content/index.htm')
  })

  it('redirects to expected URLs for ASA', () => {
    visitAndWaitForInitialize('asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')

    visitAndWaitForInitialize('asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('redirects to expected URLs for Classic', () => {
    visitAndWaitForInitialize('en-us/Content/index-admin.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/Content/index-admin.htm')

    visitAndWaitForInitialize('ja-jp/Content/index-admin.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'en-us/Content/index-admin.htm')
  })

  it('redirects to expected URLs for Classic release notes', () => {
    visitAndWaitForInitialize('en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'ja-jp/Content/Topics/ReleaseNotes/okta-relnotes.htm')

    visitAndWaitForInitialize('ja-jp/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
  })

  it('redirects to expected URLs for End User', () => {
    visitAndWaitForInitialize('eu/en-us/Content/Topics/end-user/end-user-home.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'eu/ja-jp/Content/Topics/end-user/end-user-home.htm')

    visitAndWaitForInitialize('eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })

  it('redirects to expected URLs for OAG', () => {
    visitAndWaitForInitialize('oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oag/ja-jp/Content/Topics/Access-Gateway/ag-main.htm')

    visitAndWaitForInitialize('oag/ja-jp/Content/Topics/Access-Gateway/ag-main.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('redirects to expected URLs for OIE', () => {
    visitAndWaitForInitialize('oie/en-us/Content/Topics/identity-engine/oie-index.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')

    visitAndWaitForInitialize('oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'oie/en-us/Content/Topics/identity-engine/oie-index.htm')
  })

  it('redirects to expected URLs for OIE release notes', () => {
    visitAndWaitForInitialize('oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'oie/ja-jp/Content/Topics/ReleaseNotes/oie-relnotes.htm')

    visitAndWaitForInitialize('oie/ja-jp/Content/Topics/ReleaseNotes/oie-relnotes.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')
  })

  it('redirects to expected URLs for Workflows', () => {
    visitAndWaitForInitialize('wf/en-us/Content/Topics/Workflows/workflows-main.htm')
    cy.switchLocale('Change language', '日本語 (日本)‎')
    cy.url().should('include', 'wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')

    visitAndWaitForInitialize('wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
    cy.switchLocale('言語を変更', 'English (United States)')
    cy.url().should('include', 'wf/en-us/Content/Topics/Workflows/workflows-main.htm')
  })
})
