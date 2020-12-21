
import { getLocale } from './LocaleUtil';
import { getAliasUrl, getRedirectUrl } from './UrlUtil';

const location = {
  hash: document.location.hash,
  href: document.location.href,
};

// Construct alias url with cshid
let aliasUrl = getAliasUrl(location);

// Extract locale from query
const locale = getLocale();

// Update alias url to include locale in path and remove from query param
const redirectUrl = getRedirectUrl({locale, aliasUrl});

// redirect to alias url
document.location.replace(redirectUrl);

