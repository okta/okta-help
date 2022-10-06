describe('Test ASA content on H.O.C.', () => {

  it('ASA landing page (en-US)', () => {
    cy.visit('asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
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
    // Body content is present
    cy.get('div.body-container')
      .should('be.visible')
    
    cy.visit('asa/en-us/Content/Topics/Adv_Server_Access/docs/about-asa.htm')
    // Body content is present
    cy.get('div.body-container')
      .should('be.visible')
  })

  it('ASA landing page (ja-JP)', () => {
    cy.visit('asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
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
    // Body content is present
    cy.get('div.body-container')
      .should('be.visible')
    
    cy.visit('asa/ja-jp/Content/Topics/Adv_Server_Access/docs/about-asa.htm')
    // Body content is present
    cy.get('div.body-container')
      .should('be.visible')
  })
    
})
