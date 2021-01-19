import { getLocale } from './LocaleUtil';

const getUrlParameter = (name) => {
  const param = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
  var results = regex.exec(window.location.href);
  return (results && results.length > 1) ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
};

const getRedirectUrl = () =>  {
  // Extract locale from query
  const locale = getLocale();
  // Add locale to url path and remove query param
  const fileName = 'okta_help.htm';
  const host = window.location.href.split('/okta_help.htm')[0];
  // Currently type is only used for end-user docs. In the future it will be used for admin docs
  const type = getUrlParameter('type');
  const id = getUrlParameter('id');
  /** 
   * env is only added to support the current version of admin docs that dont have any translations
   * and are under en/prod folder. https://github.com/okta/okta-help/tree/gh-pages/en/prod
   * **/
  const env = 'prod';
  const redirectUrl = type ?
    `${host}/${type}/${locale}/${fileName}#cshid=${id}`:
    `${host}/${locale}/${env}/${fileName}#cshid=${id}`;
  return redirectUrl;

};

export {
  getRedirectUrl,
  getUrlParameter
}; 
