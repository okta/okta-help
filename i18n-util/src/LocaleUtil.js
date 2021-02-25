const LOCALE_COOKIE_KEY = 'okta_help_user_lang';
import { getUrlParameter } from './UrlUtil';
 
const  getLocale = () => {
  // map to convert locales to folder names within h.o.c
  // only end-user docs have translations
  const supportedLocaleToFolderMap = {
    'en-US': 'en-us',
    'ja-JP': 'ja-jp',
  };

  // map to convert locales without country code
  // Ex en gets converted to en-US
  const localesWithoutCountryMap = {
    'en': 'en-US',
    'ja': 'ja-JP'
  };

  // check locale passed in query param
  let locale = getUrlParameter('locale');
  if (!locale) {
    // check locale in cookie
    if (document.cookie.indexOf(LOCALE_COOKIE_KEY) !== -1) {
      locale = getCookieValue(LOCALE_COOKIE_KEY);
    } else {
      // check locale in browser
      locale = navigator.language;
    }
  }

  // convert locales without country code
  // Ex en gets converted to en-US
  if (localesWithoutCountryMap[locale]) {
    locale = localesWithoutCountryMap[locale];
  }

  setLocaleCookie(locale);

  // only end-user docs have translations
  // TODO remove check once admin docs also have translations OKTA-356320
  const type = getUrlParameter('type');
  if (type) {
    // convert locale value to folder path
    locale = supportedLocaleToFolderMap[locale];
  } else {
    // always return en for admin docs
    locale = 'en';
  }

  if (!locale) {
    // TODO add better default logic for unsupported locales OKTA-356251
    locale = type ? 'en-us': 'en';
  }
  
  return locale;
};

const getCookieValue = (cookieName) => {
  var b = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

const setLocaleCookie = (locale) => {
  if (document.cookie.indexOf(LOCALE_COOKIE_KEY) === -1) {
    document.cookie = `${LOCALE_COOKIE_KEY}=${locale}`;
  }
};

export {
  getLocale,
  setLocaleCookie
};
