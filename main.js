
import { getRedirectUrl } from './UrlUtil';

// Update alias url to include locale in path and remove from query param
const redirectUrl = getRedirectUrl();

// redirect to alias url
document.location.replace(redirectUrl);

