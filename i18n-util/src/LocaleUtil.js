const LOCALE_COOKIE_KEY = 'okta_help_user_lang';

const getLocale = () => {
  // map to convert locales to folder names within h.o.c
  const supportedLocaleToFolderMap = {
    'en-US': 'en',
    'ja-JP': 'ja',
  };

  // map to convert locales without country code
  // Ex en gets converted to en-US
  const localesWithoutCountryMap = {
    'en': 'en-US',
    'ja': 'ja-JP'
  };

  // check locale passed in query param
  let locale = document.location.hash.split('?locale=')[1];
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

  // convert locale value to folder path
  locale = supportedLocaleToFolderMap[locale];

  // default to en
  if (!locale) {
    locale = 'en';
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

module.exports = {
  getLocale,
  setLocaleCookie
}; 
