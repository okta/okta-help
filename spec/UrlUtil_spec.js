import { getRedirectUrl, getUrlParameter } from '../../src/UrlUtil';

const LOCALE_COOKIE_KEY = 'okta_help_user_lang';
let languageGetter;

// Moved setup() to file level, and then added code to clear out
// cookie and browser values before each test run
// to avoid these leaking
const setup = (href) => {
  // reset values
  jest.clearAllMocks();
  window.location.hash = '';
  document.cookie = `${LOCALE_COOKIE_KEY}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  let windowSpy = jest.spyOn(window, 'window', 'get');
  windowSpy.mockImplementation(() => {
    return {
      location: {
        href,
      }
    };
  });
};

describe('UrlUtil.getRedirectUrl', () => {
  test('generates redirect url correctly for admin docs with locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview&locale=ja');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/ja-jp/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for admin docs without locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/en-us/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for end-user docs with locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview&locale=ja&type=end-user');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/end-user/ja-jp/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for end-user docs without locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-user-ov-overview&type=end-user');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/end-user/en-us/okta_help.htm#cshid=csh-user-ov-overview');
  });

  test('generates redirect url correctly for oie docs with locale query param', () => {
    setup('help.foo.com/okta_help.htm?id=csh-about-authenticators&locale=ja&type=oie');
    const result = getRedirectUrl();
    expect(result).toEqual('help.foo.com/oie/ja-jp/okta_help.htm#cshid=csh-about-authenticators');
  });

});

describe('UrlUtil.getUrlParameter', () => {
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
