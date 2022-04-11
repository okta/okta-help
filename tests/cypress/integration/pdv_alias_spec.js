describe('Test alias to help center passes', () => {
  beforeEach(() => {
    cy.clearCookie('okta_help_user_lang')
  })

  it('when accessing "Directory_People"', () => {
    cy.visit('okta_help.htm?type=oie&id=Directory_People')
    cy.url().should('include', 'oie/en-us/Content/Topics/users-groups-profiles/usgp-people.htm?cshid=Directory_People#Directory_People1')
  })

  it('when accessing "Directory_Groups"', () => {
    cy.visit('okta_help.htm?type=oie&id=Directory_Groups')
    cy.url().should('include', 'oie/en-us/Content/Topics/users-groups-profiles/usgp-about-groups.htm?cshid=Directory_Groups#Directory_Groups')
  })

  it('when accessing "Applications_Applications"', () => {
    cy.visit('okta_help.htm?type=oie&id=Applications_Applications')
    cy.url().should('include', 'oie/en-us/Content/Topics/Apps/apps-overview-add-apps.htm?cshid=Applications_Applications')
  })

})
