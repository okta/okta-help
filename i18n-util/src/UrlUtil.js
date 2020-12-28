

const getUrlParameter = (name) => {
  const param = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
  var results = regex.exec(window.location.hash);
  return (results && results.length > 1) ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
};

const getAliasUrl = (location) => {
  let cshid = null;
  if (location.hash && location.hash.length > 0) {
    cshid = location.hash.split('#')[1];
  }
  var path = location.href.split('#')[0];
  if (cshid) {
    path += `#cshid=${cshid}`;
  }
  return path;
};

const getRedirectUrl = ({locale, aliasUrl}) =>  {
  // Add locale to url path and remove query param
  const fileName = 'okta_help.htm';
  const host = aliasUrl.split('/okta_help.htm')[0];
  // Currently type is only used for end-user docs. In the future it will be used for admin docs
  const type = getUrlParameter('type');
  let cshid = aliasUrl.split('okta_help.htm')[1];
  // Remove locale form url
  cshid = cshid.split('?locale=')[0];
  // Remove type form url
  cshid = cshid.split('?type')[0];
  /** 
   * env is only added to support the current version of admin docs that dont have any translations
   * and are under en/prod folder. https://github.com/okta/okta-help/tree/gh-pages/en/prod
   * **/
  const env = 'prod';
  const redirectUrl = type ?
    `${host}/${type}/${locale}/${fileName}${cshid}`:
    `${host}/${locale}/${env}/${fileName}${cshid}`;
  return redirectUrl;

};

export {
  getAliasUrl,
  getRedirectUrl,
  getUrlParameter
}; 
