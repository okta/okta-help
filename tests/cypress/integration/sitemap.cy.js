describe('Sitemaps validation', () => {
  const NUMBER_OF_ENTITIES_TO_CHECK = 20
  const verifySitemap = (path) => {
    cy.readFile(path).then((response) => {
      // convert sitemap xml body to an array of urls
      const urls = Cypress.$(response)
        // according to the sitemap.xml spec,
        // the url value should reside in a <loc /> node
        // https://www.google.com/sitemaps/protocol.html
        .find('loc')
        .toArray()
        // get the text of the <loc /> node
        .map((el) => el.innerText)

      const step = Math.floor(urls.length / NUMBER_OF_ENTITIES_TO_CHECK) + 1

      // We call this once here to establish the base URL
      cy.visit('/')

      for (let i = 0; i < urls.length; i += step) {
        const parts = urls[i].split('https://help.okta.com')
        // Use the relative path split from the base H.O.C. URL
        const relpath = parts[1]

        cy.request('GET', relpath)
      }
    })
  }

  [
    'en-us/Sitemap.xml',
    'ja-jp/Sitemap.xml',
    'asa/en-us/Sitemap.xml',
    'asa/ja-jp/Sitemap.xml',
    'eu/en-us/Sitemap.xml',
    'eu/ja-jp/Sitemap.xml',
    'oag/en-us/Sitemap.xml',
    'oag/ja-jp/Sitemap.xml',
    'oie/en-us/Sitemap.xml',
    'oie/ja-jp/Sitemap.xml',
    'wf/en-us/Sitemap.xml',
    'wf/ja-jp/Sitemap.xml',
  ].forEach((sitemap) => {
    it(`Loads ${NUMBER_OF_ENTITIES_TO_CHECK} urls from ${sitemap}`, () => {
      verifySitemap(sitemap)
    })
  })
})
