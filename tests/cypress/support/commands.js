Cypress.Commands.add('hasOktaHOCBanner', hasOktaHOCBanner)
Cypress.Commands.add('hasCopyright', hasCopyright)
Cypress.Commands.add('hasLeftSideNav', hasLeftSideNav)
Cypress.Commands.add('hasNoLeftSideNav', hasNoLeftSideNav)
Cypress.Commands.add('hasLeftSideNavHidden', hasLeftSideNavHidden)
Cypress.Commands.add('hasTOC', hasTOC)
Cypress.Commands.add('hasBreadcrumbs', hasBreadcrumbs)
Cypress.Commands.add('hasTopMenuBar', hasTopMenuBar)
Cypress.Commands.add('hasBodyContent', hasBodyContent)
Cypress.Commands.add('hasTiles', hasTiles)
Cypress.Commands.add('hasTabs', hasTabs)
Cypress.Commands.add('hasDeferAttrsCorrectlyApplied', hasDeferAttrsCorrectlyApplied)
Cypress.Commands.add('hasQualtrics', hasQualtrics)
Cypress.Commands.add('hasCoveoSearchBar', hasCoveoSearchBar)
Cypress.Commands.add('hidesCoveoSearchBar', hidesCoveoSearchBar)
Cypress.Commands.add('hasMadCapSearchBar', hasMadCapSearchBar)
Cypress.Commands.add('switchLocale', switchLocale)

function hasOktaHOCBanner (title) {
  // The title can differ depending on language
  cy.get(`img[title="${title}"]`)
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.equal(382)
    })

  cy.get('a.logo')
    .should('be.visible')
    .invoke('attr', 'href')
    .and('include', 'https://support.okta.com/help/s/')
}

function hasCopyright () {
  cy.get('p.copyright')
    .contains('©')
}

function hasLeftSideNav () {
  cy.get('ul.sidenav')
    .should('be.visible')
}

function hasNoLeftSideNav () {
  cy.get('ul.sidenav')
    .should('not.exist')
}

function hasLeftSideNavHidden () {
  cy.get('ul.sidenav')
    .should('not.be.visible')
}

function hasTOC (numOfEntries) {
  // Number of entries is a minimum estimate
  // Each pub will have a varying number of entries in the TOC
  // We're checking the number of entries in the TOC when the page first loads
  // We aren't checking child entries, or total number of entries, which is changeable.
  cy.get('ul.sidenav a')
    // Number of TOC entries (estimate)
    .its('length')
    .should('be.gte', numOfEntries)

  // Cypress now throws errors on chaining commands
  // The accepted pattern is get > action > assert
  // Can no longer chain actions, requires a new get for each action
  cy.get('ul.sidenav a')
    .each(($el) => {
      cy.wrap($el)
        .should('have.attr', 'href')
    })
}

function hasBreadcrumbs (topicName) {
  cy.get('div.breadcrumbs')
    .should('be.visible')
    .find('span.MCBreadcrumbsSelf')
    .invoke('text')
    .should(($text) => {
      expect($text).to.equal(topicName)
    })
}

function hasTopMenuBar (numTopLinks, numChildLinks) {
  // All pubs but End User have 5 top-level links and 9 child links
  // End User pub as 4 top-level links and 6 child links
  // Passing these vals in as params to facilitate code reuse
  cy.get('div.navbar > div.dropdown')
  .should(($div) => {
    expect($div).to.have.length(numTopLinks)
  })

  cy.get('div.dropdown-content')
    .eq(0)
    .should('be.hidden')
    .invoke('show')

  // The menu bar has child links
  cy.get('div.dropdown-content > div > a')
    .should(($a) => {
      expect($a).to.have.length(numChildLinks)
    })
    .each(($el) => {
      cy.wrap($el)
        .should('have.attr', 'href')
    })
}

function hasBodyContent () {
  cy.get('div.body-container')
    .should('be.visible')

  cy.get('div.okta-topics')
    .should('be.visible')
}

function hasTiles (numOfTiles) {
  // A landing page has a N number of tiles, depending on the pub.
  // Check that number for each pub, and also ascertain that each tile contains a link
  cy.get('p[class="tile-title"]')
    .should(($p) => {
      expect($p).to.have.length(numOfTiles)
    })

  cy.get('p[class="tile-title"] > a')
    .its('length')
    .should('eq', numOfTiles)

  // Cypress now throws errors on chaining commands
  // The accepted pattern is get > action > assert
  // Can no longer chain actions, requires a new get for each action
  cy.get('p[class="tile-title"] > a')
    .each(($el) => {
      cy.wrap($el)
        .should('have.attr', 'href')
    })
}

function hasTabs (numOfTabs) {
  cy.get('ul[id="production-tabs"] > li')
    .should('have.length', numOfTabs)
    // Each tab can be activated
    .each(($li) => {
      cy.wrap($li).click()

      cy.get($li)
        .should('have.class', 'is-active')
    })
}

function hasDeferAttrsCorrectlyApplied () {
  // Most JS modules have the 'defer' attributes applied to them
  // Smoke test on one module...
  cy.get('head script[src*="MadCapAll.js"')
    .should('have.attr', 'defer')

  // The following two modules must not have 'defer' attrs applied
  cy.get('head script[src*="require.min.js"]')
    .should('not.have.attr', 'defer')

  cy.get('head script[src*="foundation.6.2.3_custom.js"]')
    .should('not.have.attr', 'defer')
}

function hasQualtrics () {
  cy.get('div#feedback-tab')
    .should('be.visible')

  cy.get('a#feedback-link')
    .invoke('attr', 'href')
    .and('eq', '#')

  cy.get('a#feedback-link')
    .should('be.visible')
    .should('have.attr', 'onclick')

  // Check window for 'openSurvey()' func
  cy.window().then((win) => {
    const openSurvey = win.openSurvey

    expect(openSurvey).to.exist
  })
}

function hasCoveoSearchBar () {
  cy.get('div.magic-box-input input')
    .should('be.visible')
}

function hidesCoveoSearchBar () {
  cy.get('div.magic-box-input input')
    .should('not.be.visible')

  cy.get('button[class="search-btn"]')
    .should('be.visible')
    .click()

  cy.get('div.magic-box-input input')
    .should('be.visible')
}

function hasMadCapSearchBar (title) {
  cy.get('form.search').last().as('searchForm')

  cy.get(`input[aria-label="${title}"]`).last()
    .should('be.visible')
    .type('verify')

  cy.get(`input[aria-label="${title}"]`).last()
    .should('have.value', 'verify')
    .should('be.visible')

  cy.get('@searchForm')
    .find('div.search-submit')
    .should('be.visible')
    .click()

  cy.url()
    .should('include', 'Search.htm?q=verify')
}

function switchLocale (changeLocaleStr, langName) {
  // 'langName' is the display text for the lang that the user will switch to
  // From EN to JA, this is '日本語 (日本)‎'
  // From JA to EN, this is 'English (United States)‎'
  //
  // 'changeLocaleStr' is the expected string displayed to a user in the target locale.
  // For EN this is "Change language"
  // For JA this is "言語を変更" (as of 10/22, previously it was "言語の変更")
  cy.get('button.select-language-button')
    .should(($el) => {
      expect($el).to.be.visible
    })
    .trigger('mouseover')

  cy.get('div.button-icon-wrapper')
    .should(($el) => {
      expect($el).to.have.attr('aria-label', changeLocaleStr)
      expect($el).to.be.visible
    })

  cy.get('button.select-language-button')
    .trigger('click')

  // Cypress now throws errors on chaining commands
  // The accepted pattern is get > action > assert
  // Can no longer chain actions, requires a new get for each action
  cy.get('.select-language-drop-down a').contains(langName)
    .should(($el) => {
      expect($el).to.be.visible
    })
    .trigger('click')
}
