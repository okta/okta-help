const { getAliasUrl, getRedirectUrl }  = require('../../src/UrlUtil');


describe('UrlUtil.getAliasUrl', () => {
  test('generates alias url and adds cshid correctly with locale', () => {
    const result = getAliasUrl({
      hash: '#csh-eu-quick-access-apps?locale=en',
      href: 'help.foo.com/okta_help.htm#csh-eu-quick-access-apps?locale=en'
    });
    expect(result).toEqual('help.foo.com/okta_help.htm#cshid=csh-eu-quick-access-apps?locale=en');
  });

  test('generates alias url and adds cshid correctly without locale', () => {
    const result = getAliasUrl({
      hash: '#csh-eu-quick-access-apps',
      href: 'help.foo.com/okta_help.htm#csh-eu-quick-access-apps'
    });
    expect(result).toEqual('help.foo.com/okta_help.htm#cshid=csh-eu-quick-access-apps');
  });
});

describe('UrlUtil.getRedirectUrl', () => {
  test('generates redirect url correctly', () => {
    const result = getRedirectUrl({
      locale: 'ja',
      aliasUrl: 'help.foo.com/okta_help.htm#cshid=Settings_Emails_SMS?locale=ja'
    });
    expect(result).toEqual('help.foo.com/ja/prod/okta_help.htm#cshid=Settings_Emails_SMS');
  });

});
