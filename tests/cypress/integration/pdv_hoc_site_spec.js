describe('Test H.O.C.', () => {

  it('Coveo search', () => {
    // out of scope
    // not testable in local environments
  })

  it('Google Analytics', () => {
    // out of scope
    // not testable in local environments
  })

  it('Qualtrics feedback', () => {
    // out of scope
    // not testable in local environments
  })

  it('Classic/V1 release notes (en-US)', () => {
    cy.visit('en-us/Content/Topics/ReleaseNotes/okta-relnotes.htm')

  })

  it('OIE release notes (en-US)', () => {
    cy.visit('oie/en-us/Content/Topics/ReleaseNotes/oie-relnotes.htm')

  })

  it('Product documentation landing page (en-US)', () => {
    cy.visit('en-us/Content/index.htm')
    // Logo image
    cy.get('img[title="Okta Support"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(382)
      })
    // Copyright
    cy.get('p.copyright')
      .contains('©')
    // Menu dropdown
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(5)
      })
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
    // All eight tiles on landing page have links
    cy.get('div.body-main div.tiles div h3 a')
      .should(($div) => {
        expect($div).to.have.length(8)
      })
  })

  it('Product documentation landing page (ja-JP)', () => {
    cy.visit('ja-jp/Content/index.htm')
    // Logo image
    cy.get('img[title="Okta Support"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(382)
      })
    // Copyright
    cy.get('p.copyright')
      .contains('©')
    // Menu dropdown
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(5)
      })
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
    // All eight tiles on landing page have links
    cy.get('div.body-main div.tiles div h3 a')
      .should(($div) => {
        expect($div).to.have.length(8)
      })
  })

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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
    // All nine tiles on landing page have links
    cy.get('div.body-main div.tiles div h3 a')
      .should(($div) => {
        expect($div).to.have.length(9)
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
    // All nine tiles on landing page have links
    cy.get('div.body-main div.tiles div h3 a')
      .should(($div) => {
        expect($div).to.have.length(9)
      })
  })

  it('OIE landing page (en-US)', () => {
    cy.visit('oie/en-us/Content/Topics/identity-engine/oie-index.htm')
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
  })

  it('OIE landing page (ja-JP)', () => {
    cy.visit('oie/ja-JP/Content/Topics/identity-engine/oie-index.htm')
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
  })

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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
  })

  it('ASA landing page (ja-JP)', () => {
    cy.visit('asa/ja-JP/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
  })

  it('OAG landing page (en-US)', () => {
    cy.visit('oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
  })

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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
        expect($a).to.have.attr('href')
      })
  })

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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(6)
        expect($a).to.have.attr('href')
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
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(6)
        expect($a).to.have.attr('href')
      })
  })

})
