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

      for (let i = 0; i < urls.length; i += step) {
        cy.request('GET', urls[i])
      }
    })
  }

  [
    'en-us/Sitemap.xml',
    'asa/en-us/Sitemap.xml',
    'eu/en-us/Sitemap.xml',
    'oag/en-us/Sitemap.xml',
    'oie/en-us/Sitemap.xml',
    'wf/en-us/Sitemap.xml',
    'eu/ja-jp/Sitemap.xml'
  ].forEach((sitemap) => {
    it(`Loads ${NUMBER_OF_ENTITIES_TO_CHECK} urls from ${sitemap}`, () => {
      verifySitemap(sitemap)
    })
  })
})
