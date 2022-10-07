describe('ASA landing page (en-US)', () => {
  beforeEach(() => {
    cy.visit('asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('displays the Okta H.O.C. image', () => {
    cy.get('img[title="Okta Support"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(382)
      })
  })

  it('displays a link to Okta Support', () => {
    cy.get('a.logo')
      .should('be.visible')
      .and('have.attr', 'href', 'https://support.okta.com/help/s/')
  })

  it('displays a copyright', () => {
    cy.get('p.copyright')
      .contains('©')
  })

  it('displays left-side nav', () => {
    cy.get('ul.sidenav')
      .should('be.visible')
  })

  it('displays the TOC', () => {
    cy.get('ul.sidenav a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // Number of TOC entries (estimate)
    cy.xpath('//ul[contains(@class, "sidenav")]//a[@href]')
      .its('length')
      .should('be.gt', 9)
  })

  it('displays a next topic button', () => {
    cy.get('button.next-topic-button')
      .should('be.visible')
  })

  it('displays a previous topic button', () => { 
    cy.get('button.previous-topic-button')
      .should('be.visible')
  })

  it('displays the top-level menu bar', () => {
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(5)
      })
    cy.get('div.dropdown-content')
      .eq(0)
      .should('be.hidden')
      .invoke('show')
    // The menu bar has child links
    cy.get('div.dropdown-content > div > a')
      .should(($a) => {
        expect($a).to.have.length(9)
      })
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    })

  it('displays the body content area', () => {
    cy.get('div.body-container')
      .should('be.visible')
    cy.get('div.okta-topics')
      .should('be.visible')  
  })

  it('displays links in all landing page tiles', () => {
    cy.get('div.body-main div.tiles div p a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
        })
    })

  it('displays expected number of tiles', () => {
    cy.get('p[class="tile-title"]')
      .should(($p) => {
        expect($p).to.have.length(6)
      })
    })

  it('displays links for each tile', () => {
    cy.get('p[class="tile-title"] > a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

  it('applies the "defer" attribute to most JS modules', () => {
    cy.get('head script[src*="MadCapAll.js"')
      .should('have.attr', 'defer')
  })

  it('but it omits the "defer" attribute from some JS modules', () => {
    cy.get('head script[src*="require.min.js"]')
      .should('not.have.attr', 'defer')

    cy.get('head script[src*="foundation.6.2.3_custom.js"]')
      .should('not.have.attr', 'defer')
  })

  it('contains the Qualtrics JS module', () => {
    cy.get('script[src="../../../Resources/Scripts/js/vendor/qualtrics.js"]')
      .should('exist')
  })

  it('displays the Coveo search bar', () => {
    cy.get('div.magic-box-input input')
      .should('be.visible')
  })

})

describe('ASA landing page (ja-JP)', () => {
  beforeEach(() => {
    cy.visit('asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('displays the Okta H.O.C. image', () => {
    cy.get('img[title="Okta Support"]')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(382)
      })
  })

  it('displays a link to Okta Support', () => {
    cy.get('a.logo')
      .should('be.visible')
      .and('have.attr', 'href', 'https://support.okta.com/help/s/')
  })

  it('displays a copyright', () => {
    cy.get('p.copyright')
      .contains('©')
  })

  it('displays left-side nav', () => {
    cy.get('ul.sidenav')
      .should('be.visible')
  })

  it('displays the TOC', () => {
    cy.get('ul.sidenav a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
    // Number of TOC entries (estimate)
    cy.xpath('//ul[contains(@class, "sidenav")]//a[@href]')
      .its('length')
      .should('be.gt', 9)
  })

  it('displays a next topic button', () => {
    cy.get('button.next-topic-button')
      .should('be.visible')
  })

  it('displays a previous topic button', () => { 
    cy.get('button.previous-topic-button')
      .should('be.visible')
  })

  it('displays the top-level menu bar', () => {
    cy.get('div.navbar > div.dropdown')
      .should(($div) => {
        expect($div).to.have.length(5)
      })
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

  it('displays the body content area', () => {
    cy.get('div.body-container')
      .should('be.visible')
    cy.get('div.okta-topics')
      .should('be.visible')  
  })

  it('displays links in all landing page tiles', () => {
    cy.get('div.body-main div.tiles div p a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
        })
    })

  it('displays expected number of tiles', () => {
    cy.get('p[class="tile-title"]')
      .should(($p) => {
        expect($p).to.have.length(6)
      })
    })

  it('displays links for each tile', () => {
    cy.get('p[class="tile-title"] > a')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
      })
  })

  it('applies the "defer" attribute to most JS modules', () => {
    cy.get('head script[src*="MadCapAll.js"')
      .should('have.attr', 'defer')
  })

  it('but it omits the "defer" attribute from some JS modules', () => {
    cy.get('head script[src*="require.min.js"]')
      .should('not.have.attr', 'defer')

    cy.get('head script[src*="foundation.6.2.3_custom.js"]')
      .should('not.have.attr', 'defer')
  })

  it('contains the Qualtrics JS module', () => {
    cy.get('script[src="../../../Resources/Scripts/js/vendor/qualtrics.js"]')
      .should('exist')
  })

  it('displays the Coveo search bar', () => {
    cy.get('div.magic-box-input input')
      .should('be.visible')
  })

})
