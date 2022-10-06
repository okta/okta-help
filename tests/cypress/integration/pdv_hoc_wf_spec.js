describe('Test Workflows content on H.O.C.', () => {

  it('Workflows landing page (en-US)', () => {
    cy.visit('wf/en-us/Content/Topics/Workflows/workflows-main.htm')
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
  })

  it('Workflows landing page (ja-JP)', () => {
    cy.visit('wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
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
  })
    
})
