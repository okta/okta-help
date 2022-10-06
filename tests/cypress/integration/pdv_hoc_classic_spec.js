describe('Test Classic content on H.O.C.', () => {

  it('Classic/V1 landing page (en-US)', () => {
    cy.visit('en-us/Content/index-admin.htm')
    // Logo image
    cy.get('img[title="Okta Support"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(382)
      })
    // Copyright
    cy.get('p.copyright')
      .contains('©')
    // Left-side nav pane (TOC)
    cy.get('ul.sidenav')
      .should('be.visible')
    // Each TOC entry contains a link
    cy.get('ul.sidenav a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // Menu dropdown
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(5)
      })
    // The page header has a menu bar
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    // The menu bar has nine links
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // All nine tiles on landing page have links
    cy.get('div.body-main div.tiles div h3 a')
      .should(($div) => {
        expect($div).to.have.length(9)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

  it('Classic/V1 landing page (ja-JP)', () => {
    cy.visit('ja-jp/Content/index-admin.htm')
    // Logo image
    cy.get('img[title="Okta Support"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(382)
      })
    // Copyright
    cy.get('p.copyright')
      .contains('©')
    // Left-side nav pane (TOC)
    cy.get('ul.sidenav')
      .should('be.visible')
    // Each TOC entry has a link
    cy.get('ul.sidenav a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // Menu dropdown
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(5)
      })
    // The page header has a menu bar
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    // The menu bar has nine links
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // All nine tiles on landing page have links
    cy.get('div.body-main div.tiles div h3 a')
      .should(($div) => {
        expect($div).to.have.length(9)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

  it('Classic/V1 release notes (en-US) landing page has correct number of tiles', () => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')
    // The relnotes page has nine tiles, each with a link
    cy.get('p[class="tile-title"]')
      .should(($p) => {
        expect($p).to.have.length(9)
      })
    cy.get('p[class="tile-title"] > a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

  it('Classic/V1 release notes production page tabs work as expected', () => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/production.htm')
    // The relnotes production page has four tabs
    cy.get('ul[id="production-tabs"] > li')
      .should('have.length', 4)
      // Each tab can be activated
      .each(($li) => {
        cy.wrap($li).click()
          .should('have.class', 'is-active')
      })
    })

    it('Classic/V1 topics have correct script formatting', () => {
      cy.visit('en-us/Content/Topics/ReleaseNotes/production.htm')
      // Most scripts take the 'defer' attr
      cy.get('head script[src*="MadCapAll.js"')
        .should('have.attr', 'defer')
      // The following scripts must have 'defer' attrs removed
      cy.get('head script[src*="require.min.js"]')
        .should('not.have.attr', 'defer')
      cy.get('head script[src*="foundation.6.2.3_custom.js"]')
        .should('not.have.attr', 'defer')
    })

    
})
