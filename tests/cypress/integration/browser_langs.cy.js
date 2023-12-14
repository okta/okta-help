describe('Browser loads English', () => {
  beforeEach(() => {
    cy.clearCookie('okta_help_user_lang')
  })

  it('when no options provided (default)', () => {
    cy.visit('okta_help.htm?id=csh-index')
    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when primary browser language is neither EN nor JA', () => {
    cy.visit('okta_help.htm?id=csh-index', {
      onBeforeLoad: (window) => {
        Object.defineProperty(window.navigator, 'language', {
          value: 'ko-KR',
        })

        Object.defineProperty(window.navigator, 'languages', {
          value: ['ko-KR'],
        })
      },
    })

    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when browser language is invalid', () => {
    cy.visit('okta_help.htm?id=csh-index', {
      onBeforeLoad: (window) => {
        Object.defineProperty(window.navigator, 'language', {
          value: 'boo!',
        })

        Object.defineProperty(window.navigator, 'languages', {
          value: ['boo!'],
        })
      },
    })

    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when query string includes en-US locale', () => {
    cy.visit('okta_help.htm?locale=en-US&id=csh-index')
    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when query string includes en lang', () => {
    cy.visit('okta_help.htm?locale=en&id=csh-index')
    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when query string includes non-supported locale', () => {
    cy.visit('okta_help.htm?locale=ko-KR&id=csh-index')
    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when cookie is set to en-US locale', () => {
    cy.setCookie('okta_help_user_lang', 'en-US')
    cy.visit('okta_help.htm?&id=csh-index')
    cy.url().should('include', 'en-us/content/index.htm')
  })

  it('when browser lang is ja-JP but cookie is set to en-US locale', () => {
    cy.setCookie('okta_help_user_lang', 'en-US')
    cy.visit('okta_help.htm?id=csh-index', {
      onBeforeLoad: (window) => {
        Object.defineProperty(window.navigator, 'language', {
          value: 'ja-JP',
        })

        Object.defineProperty(window.navigator, 'languages', {
          value: ['ja-JP'],
        })
      },
    })

    cy.url().should('include', 'en-us/content/index.htm')
  })
})

describe('Browser loads Japanese', () => {
  beforeEach(() => {
    cy.clearCookie('okta_help_user_lang')
  })

  it('when ja-JP is set as primary browser language', () => {
    cy.visit('okta_help.htm?id=csh-index', {
      onBeforeLoad: (window) => {
        Object.defineProperty(window.navigator, 'language', {
          value: 'ja-JP',
        })

        Object.defineProperty(window.navigator, 'languages', {
          value: ['ja-JP'],
        })
      },
    })

    cy.url().should('include', 'ja-jp/content/index.htm')
  })

  it('when query string includes ja-JP locale', () => {
    cy.visit('okta_help.htm?locale=ja-JP&id=csh-index')
    cy.url().should('include', 'ja-jp/content/index.htm')
  })

  it('when query string includes ja lang', () => {
    cy.visit('okta_help.htm?locale=ja&id=csh-index')
    cy.url().should('include', 'ja-jp/content/index.htm')
  })

  it('when cookie is set to ja-JP locale', () => {
    cy.setCookie('okta_help_user_lang', 'ja-JP')
    cy.visit('okta_help.htm?&id=csh-index')
    cy.url().should('include', 'ja-jp/content/index.htm')
  })

  it('when browser lang is en-US but cookie is set to ja-JP locale', () => {
    cy.setCookie('okta_help_user_lang', 'ja-JP')
    cy.visit('okta_help.htm?id=csh-index', {
      onBeforeLoad: (window) => {
        Object.defineProperty(window.navigator, 'language', {
          value: 'en-US',
        })

        Object.defineProperty(window.navigator, 'languages', {
          value: ['en-US'],
        })
      },
    })

    cy.url().should('include', 'ja-jp/content/index.htm')
  })
})
