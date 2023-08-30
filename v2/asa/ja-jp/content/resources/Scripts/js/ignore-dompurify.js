// We remove defer tag for jquery library to fix coveo script
// and tabs functionality, however that changes how madcap
// loads scripts on the page and built in dom purify script
// can not be loaded normally.
// Suppressing jquery error only for dompurify module, as fixing
// root cause is not possible.

requirejs.onError = function (err) {
  if (err.requireType === 'mismatch' &&
      err.message.search('dompurify') !== -1) {
    // ignoring dom purify module error
    return;
  }
  throw err;
};

(function redirectToLowercasePath() {
  try {
    var url = new URL(window.location.href);
    var urlPath = url.pathname;
    var lowercaseUrlPath = urlPath.toLowerCase();
    if (urlPath !== lowercaseUrlPath) {
      url.pathname = lowercaseUrlPath;
      window.location.replace(url.href);
    }
  } catch(error) {
    console.log('Could not update url path: ' + error);
  }
} ())
