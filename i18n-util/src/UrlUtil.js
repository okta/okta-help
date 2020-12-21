
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
  // add locale to url path and remove query param
  const env = 'prod';
  const fileName = 'okta_help.htm';
  const host = aliasUrl.split('/okta_help.htm')[0];
  const cshid = aliasUrl.split('okta_help.htm')[1].split('?locale=')[0];
  const redirectUrl = `${host}/${locale}/${env}/${fileName}${cshid}`;
  return redirectUrl;

};

module.exports = {
  getAliasUrl,
  getRedirectUrl
}; 
