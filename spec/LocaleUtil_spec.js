import { getLocale, getCookieValue, setLocaleCookie } from '../../src/LocaleUtil';

const LOCALE_COOKIE_KEY = 'okta_help_user_lang';
let languageGetter;
const setup = () => {
  // reset values
  jest.clearAllMocks();
  window.location.hash = '';
  document.cookie = `${LOCALE_COOKIE_KEY}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
};

describe('Locale Priority', () => {
  beforeEach(() => {
    setup();
  });
  test('query param locale is higher than browser and cookie locale', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehas&locale=en&type=end-user';
    languageGetter.mockReturnValue('ja-JP');
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });
  test('cookie locale is higher than browser locale', () => {
    languageGetter.mockReturnValue('ja-JP');
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('en-us');
  });
  test('browser locale is picked if query and hash is not set', () => {
    languageGetter.mockReturnValue('ja-JP');
    expect(getLocale()).toBe('ja-jp');
  });
});

describe('LocaleUtil.setLocaleCookie', () => {
  beforeEach(() => {
    setup();
  });
  test('test setLocaleCookie with "en"', () => {
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('en-us');
  });

  // What is the intention of this test?
  test('test setLocaleCookie with "en-US" if "okta_help_user_lang" set to ja before', () => {
    document.cookie = 'cookie1=test';
    document.cookie = `${LOCALE_COOKIE_KEY}=ja-JP`;
    // Verify that the cookie value has been set to ja-JP
    const locale = getCookieValue(LOCALE_COOKIE_KEY);
    expect(locale).toEqual('ja-JP')
    // Verify that the cookie entry has an index value
    expect(document.cookie.indexOf('okta_help_user_lang=ja-JP')).toBe(0);
    // Reset the cookie value
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('en-us');
    // Previously this test checked for a -1 value
    // but by removing the conditional statement
    expect(document.cookie.indexOf('okta_help_user_lang=en-US')).toBe(0);
  });
});

describe('LocaleUtil.getLocale', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehas&locale=en&type=end-user';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });

  test('test getLocale from cookie', () => {
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('ja-jp');
  });

  test('test getLocale from browser', () => {
    languageGetter.mockReturnValue('ja-JP');
    expect(getLocale()).toBe('ja-jp');
  });
});

describe('LocaleUtil.getLocale with country code for admin', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehas&locale=en-US';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });
});

describe('LocaleUtil.getLocale with country code for enduser docs', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param ', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehash?locale=en-US&type=end-user';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });

  test('test getLocale from query param', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehash?type=end-user&locale=ja';
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('ja-jp');
  });
});

describe('LocaleUtil.getLocale with country code for oie docs', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param ', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehash&locale=en-US&type=oie';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });

  test('test getLocale from cookie', () => {
    // issues with mocking window.location.href, setting window.location.hash instead here.
    window.location.hash = '?id=somehash&type=oie';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('ja-jp');
  });
});

describe('Locale Priority', () => {
  beforeEach(() => {
    setup();
  });
  test('return "en-us" if browser reports "undefined"', () => {
    languageGetter.mockReturnValue(undefined);
    expect(getLocale()).toBe('en-us');
  });
});
