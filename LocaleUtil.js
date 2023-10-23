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

  // TODO remove check once admin docs also have translations OKTA-356320
  locale = supportedLocaleToFolderMap[locale];

  // ugly tourniquet to stop bleeding of 'undefined'
  // into URLs
  if (locale === undefined || locale === null) {
    locale = 'en-us';
  }

  return locale;
};

const getCookieValue = (cookieName) => {
  var b = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

// Removed the conditional statement > don't we always want to reset
// the cookie when calling this function?
// If not, then let's doc/test the scenarios
const setLocaleCookie = (locale) => {
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}`;
};

export {
  getLocale,
  setLocaleCookie,
  getCookieValue
};
