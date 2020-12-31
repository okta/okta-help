import { getLocale, setLocaleCookie } from '../../src/LocaleUtil';

const LOCALE_COOKIE_KEY = 'okta_help_user_lang';
let languageGetter;
const setup = () => {
  // reset values
  jest.clearAllMocks();
  document.location.hash = '';
  document.cookie = `${LOCALE_COOKIE_KEY}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
};

describe('Locale Priority', () => {
  beforeEach(() => {
    setup();
  });
  test('query param locale is higher than browser and cookie locale', () => {
    document.location.hash = '#somehash?locale=en&type=end-user';
    languageGetter.mockReturnValue('ja-JP');
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });
  test('cookie locale is higher than browser locale', () => {
    languageGetter.mockReturnValue('ja-JP');
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('en');
  });
  test('browser locale is picked if query and hash is not set', () => {
    languageGetter.mockReturnValue('ja-JP');
    expect(getLocale()).toBe('en');
  });
});


describe('LocaleUtil.setLocaleCookie', () => {
  beforeEach(() => {
    setup();
  });
  test('test setLocaleCookie with "en"', () => {
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('en');
  });
  test('test setLocaleCookie with "en" if "okta_help_user_lang" set to ja before', () => {
    document.cookie = 'cookie1=test';
    document.cookie = `${LOCALE_COOKIE_KEY}=ja-JP`;

    setLocaleCookie('en-US');
    expect(getLocale()).toBe('en');
    expect(document.cookie.indexOf('okta_help_user_lang=en-US')).toBe(-1);
  });
});

describe('LocaleUtil.getLocale', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param', () => {
    document.location.hash = '#somehash?locale=en&type=end-user';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });

  test('test getLocale from cookie', () => {
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en');
  });

  test('test getLocale from browser', () => {
    languageGetter.mockReturnValue('ja-JP');
    expect(getLocale()).toBe('en');
  });
});

describe('LocaleUtil.getLocale with country code for admin', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param', () => {
    document.location.hash = '#somehash?locale=en-US';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en');
  });
});

describe('LocaleUtil.getLocale with country code for enduser docs', () => {
  beforeEach(() => {
    setup();
  });
  test('test getLocale from query param ', () => {
    document.location.hash = '#somehash?locale=en-US&type=end-user';
    setLocaleCookie('ja-JP');
    expect(getLocale()).toBe('en-us');
  });

  test('test getLocale from query param', () => {
    document.location.hash = '#somehash?type=end-user&locale=ja';
    setLocaleCookie('en-US');
    expect(getLocale()).toBe('ja-jp');
  });
});
