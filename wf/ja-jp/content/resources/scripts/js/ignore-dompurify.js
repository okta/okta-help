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
    var url = window.location.href;
    var lowercaseUrl = url.toLowerCase();
    if (url !== lowercaseUrl) {
      window.location.replace(lowercaseUrl);
    }
  } catch(error) {
    console.log('Could not update url path: ' + error);
  }
} ())
