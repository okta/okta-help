import { getRedirectUrl, getUrlParameter } from '../../src/UrlUtil';

describe('UrlUtil.getRedirectUrl', () => {
  const setup = (href) => {
    // reset values
    jest.clearAllMocks();
    let windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => {
      return {
        location: {
          href,
        }
      };
    });
  };
  test('generates redirect url correctly for admin docs with locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview&locale=ja');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/en/prod/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for admin docs without locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/en/prod/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for end-user docs with locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview&locale=ja&type=end-user');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/end-user/ja-jp/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for end-user docs without locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview&type=end-user&locale=en');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/end-user/en-us/okta_help.htm#cshid=csh-user-ov-overview');
  });

});

describe('UrlUtil.getUrlParameter', () => {
  const setup = (href) => {
    // reset values
    jest.clearAllMocks();
    let windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => {
      return {
        location: {
          href,
        }
      };
    });
  };
  test('extracts locale query param correctly', () => {
    setup('cshid=Settings_Emails_SMS&locale=ja-JP&type=end-user');
    const result = getUrlParameter('locale');
    expect(result).toEqual('ja-JP');
  });

  test('extracts type query param correctly', () => {
    setup('cshid=Settings_Emails_SMS&type=end-user&locale=en-US');
    const result = getUrlParameter('type');
    expect(result).toEqual('end-user');
  });
});
