describe('Test End User content on H.O.C.', () => {

  it('End User landing page (en-US)', () => {
    cy.visit('eu/en-us/Content/Topics/end-user/end-user-home.htm')
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
    // Each TOC entry is a link
    cy.get('ul.sidenav a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // Menu dropdown
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(4)
      })
    // The page header has a menu bar
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    // The menu bar has six links
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(6)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

  it('End User landing page (ja-JP)', () => {
    cy.visit('eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
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
        expect($div).to.have.length(4)
      })
    // The page header has a menu bar
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    // The menu bar has six links
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(6)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

})
