describe('Alias tests: With no locale cookie set, loads English', () => {
  beforeEach(() => {
    cy.clearCookie('okta_help_user_lang')
  })

  it('when accessing H.O.C. home', () => {
    cy.visit('okta_help.htm?id=csh-index')
    cy.url().should('include', 'en-us/Content/index.htm')
  })

  it('when accessing ASA home', () => {
    cy.visit('okta_help.htm?type=asa&id=csh-asa-overview')
    cy.url().should('include', 'asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('when accessing Classic home', () => {
    cy.visit('okta_help.htm?id=ext-admin-landing')
    cy.url().should('include', 'en-us/Content/index-admin.htm')
  })

  it('when accessing End User home', () => {
    cy.visit('okta_help.htm?type=eu&id=csh-user-home')
    cy.url().should('include', 'eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })

  it('when accessing OAG home', () => {
    cy.visit('okta_help.htm?type=oag&id=ag-main')
    cy.url().should('include', 'oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('when accessing OIE home', () => {
    cy.visit('okta_help.htm?type=oie&id=csh-oie')
    cy.url().should('include', 'oie/en-us/Content/Topics/identity-engine/oie-index.htm')
  })

  it('when accessing Workflows home', () => {
    cy.visit('okta_help.htm?type=wf&id=ext-Okta-workflows')
    cy.url().should('include', 'wf/en-us/Content/Topics/Workflows/workflows-main.htm')
  })

  it('when accessing "Directory_People"', () => {
    cy.visit('okta_help.htm?type=oie&id=Directory_People')
    cy.url().should('include', 'oie/en-us/Content/Topics/users-groups-profiles/usgp-people.htm')
  })

  it('when accessing "Directory_Groups"', () => {
    cy.visit('okta_help.htm?type=oie&id=Directory_Groups')
    cy.url().should('include', 'oie/en-us/Content/Topics/users-groups-profiles/usgp-about-groups.htm')
  })

  it('when accessing "Applications_Applications"', () => {
    cy.visit('okta_help.htm?type=oie&id=Applications_Applications')
    cy.url().should('include', 'oie/en-us/Content/Topics/Apps/apps-overview-add-apps.htm')
  })
})

describe('Alias tests: With en-US locale cookie set, loads English', () => {
  beforeEach(() => {
    cy.setCookie('okta_help_user_lang', 'en-US')
  })

  it('when accessing H.O.C. home', () => {
    cy.visit('okta_help.htm?id=csh-index')
    cy.url().should('include', 'en-us/Content/index.htm')
  })

  it('when accessing ASA home', () => {
    cy.visit('okta_help.htm?type=asa&id=csh-asa-overview')
    cy.url().should('include', 'asa/en-us/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('when accessing Classic home', () => {
    cy.visit('okta_help.htm?id=ext-admin-landing')
    cy.url().should('include', 'en-us/Content/index-admin.htm')
  })

  it('when accessing End User home', () => {
    cy.visit('okta_help.htm?type=eu&id=csh-user-home')
    cy.url().should('include', 'eu/en-us/Content/Topics/end-user/end-user-home.htm')
  })

  it('when accessing OAG home', () => {
    cy.visit('okta_help.htm?type=oag&id=ag-main')
    cy.url().should('include', 'oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('when accessing OIE home', () => {
    cy.visit('okta_help.htm?type=oie&id=csh-oie')
    cy.url().should('include', 'oie/en-us/Content/Topics/identity-engine/oie-index.htm')
  })

  it('when accessing Workflows home', () => {
    cy.visit('okta_help.htm?type=wf&id=ext-Okta-workflows')
    cy.url().should('include', 'wf/en-us/Content/Topics/Workflows/workflows-main.htm')
  })
})

describe('Alias tests: With no locale cookie set and locale passed as ja-JP, loads Japanese', () => {
  beforeEach(() => {
    cy.clearCookie('okta_help_user_lang')
  })

  it('when accessing H.O.C. home', () => {
    cy.visit('okta_help.htm?id=csh-index&locale=ja-JP')
    cy.url().should('include', 'ja-jp/Content/index.htm')
  })

  it('when accessing ASA home', () => {
    cy.visit('okta_help.htm?type=asa&id=csh-asa-overview&locale=ja-JP')
    cy.url().should('include', 'asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('when accessing Classic home', () => {
    cy.visit('okta_help.htm?id=ext-admin-landing&locale=ja-JP')
    cy.url().should('include', 'ja-jp/Content/index-admin.htm')
  })

  it('when accessing End User home', () => {
    cy.visit('okta_help.htm?type=eu&id=csh-user-home&locale=ja-JP')
    cy.url().should('include', 'eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
  })

  it('when accessing OAG home', () => {
    cy.visit('okta_help.htm?type=oag&id=ag-main')
    cy.url().should('include', 'oag/en-us/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('when accessing OIE home', () => {
    cy.visit('okta_help.htm?type=oie&id=csh-oie&locale=ja-JP')
    cy.url().should('include', 'oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
  })

  it('when accessing Workflows home', () => {
    cy.visit('okta_help.htm?type=wf&id=ext-Okta-workflows&locale=ja-JP')
    cy.url().should('include', 'wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
  })

  it('when accessing "Directory_People"', () => {
    cy.visit('okta_help.htm?type=oie&id=Directory_People')
    cy.url().should('include', 'oie/en-us/Content/Topics/users-groups-profiles/usgp-people.htm')
  })

  it('when accessing "Directory_Groups"', () => {
    cy.visit('okta_help.htm?type=oie&id=Directory_Groups')
    cy.url().should('include', 'oie/en-us/Content/Topics/users-groups-profiles/usgp-about-groups.htm')
  })

  it('when accessing "Applications_Applications"', () => {
    cy.visit('okta_help.htm?type=oie&id=Applications_Applications')
    cy.url().should('include', 'oie/en-us/Content/Topics/Apps/apps-overview-add-apps.htm')
  })
})

describe('Alias tests: With ja-JP locale cookie set, loads Japanese', () => {
  beforeEach(() => {
    cy.setCookie('okta_help_user_lang', 'ja-JP')
  })

  it('when accessing H.O.C. home', () => {
    cy.visit('okta_help.htm?id=csh-index')
    cy.url().should('include', 'ja-jp/Content/index.htm')
  })

  it('when accessing ASA home', () => {
    cy.visit('okta_help.htm?type=asa&id=csh-asa-overview')
    cy.url().should('include', 'asa/ja-jp/Content/Topics/Adv_Server_Access/docs/asa-overview.htm')
  })

  it('when accessing Classic home', () => {
    cy.visit('okta_help.htm?id=ext-admin-landing')
    cy.url().should('include', 'ja-jp/Content/index-admin.htm')
  })

  it('when accessing End User home', () => {
    cy.visit('okta_help.htm?type=eu&id=csh-user-home')
    cy.url().should('include', 'eu/ja-jp/Content/Topics/end-user/end-user-home.htm')
  })

  it('when accessing OAG home', () => {
    // Commenting out until we get JA translations up for OAG
    // cy.visit('okta_help.htm?type=oag&id=ag-main')
    // cy.url().should('include', 'oag/ja-jp/Content/Topics/Access-Gateway/ag-main.htm')
  })

  it('when accessing OIE home', () => {
    cy.visit('okta_help.htm?type=oie&id=csh-oie')
    cy.url().should('include', 'oie/ja-jp/Content/Topics/identity-engine/oie-index.htm')
  })

  it('when accessing Workflows home', () => {
    cy.visit('okta_help.htm?type=wf&id=ext-Okta-workflows')
    cy.url().should('include', 'wf/ja-jp/Content/Topics/Workflows/workflows-main.htm')
  })
})
