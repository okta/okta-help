import { getAliasUrl, getRedirectUrl, getUrlParameter } from '../../src/UrlUtil';

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
  const setup = (hash) => {
    // reset values
    jest.clearAllMocks();
    let windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => {
      return {
        location: {
          hash,
        }
      };
    });
  };
  test('generates redirect url correctly for admin docs with locale query param', () => {
    setup('cshid=Settings_Emails_SMS?locale=ja');
    const result = getRedirectUrl({
      locale: 'ja',
      aliasUrl: 'help.foo.com/okta_help.htm#cshid=Settings_Emails_SMS?locale=ja'
    });
    expect(result).toEqual('help.foo.com/ja/prod/okta_help.htm#cshid=Settings_Emails_SMS');
  });

  test('generates redirect url correctly for admin docs without locale query param', () => {
    setup('cshid=Settings_Emails_SMS');
    const result = getRedirectUrl({
      locale: 'en',
      aliasUrl: 'help.foo.com/okta_help.htm#cshid=Settings_Emails_SMS'
    });
    expect(result).toEqual('help.foo.com/en/prod/okta_help.htm#cshid=Settings_Emails_SMS');
  });

  test('generates redirect url correctly for end-user docs with locale query param', () => {
    setup('cshid=Settings_Emails_SMS?locale=ja&type=end-user');
    const result = getRedirectUrl({
      locale: 'ja-jp',
      aliasUrl: 'help.foo.com/okta_help.htm#cshid=Settings_Emails_SMS?locale=ja&type=end-user'
    });
    expect(result).toEqual('help.foo.com/end-user/ja-jp/okta_help.htm#cshid=Settings_Emails_SMS');
  });

  test('generates redirect url correctly for end-user docs without locale query param', () => {
    setup('cshid=Settings_Emails_SMS?type=end-user');
    const result = getRedirectUrl({
      locale: 'ja-jp',
      aliasUrl: 'help.foo.com/okta_help.htm#cshid=Settings_Emails_SMS?type=end-user'
    });
    expect(result).toEqual('help.foo.com/end-user/ja-jp/okta_help.htm#cshid=Settings_Emails_SMS');
  });

});

describe('UrlUtil.getUrlParameter', () => {
  const setup = (hash) => {
    // reset values
    jest.clearAllMocks();
    let windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => {
      return {
        location: {
          hash,
        }
      };
    });
  };
  test('extracts locale query param correctly', () => {
    setup('cshid=Settings_Emails_SMS?locale=ja-JP&type=end-user');
    const result = getUrlParameter('locale');
    expect(result).toEqual('ja-JP');
  });

  test('extracts type query param correctly', () => {
    setup('cshid=Settings_Emails_SMS?type=end-user&locale=en-US');
    const result = getUrlParameter('type');
    expect(result).toEqual('end-user');
  });
});
