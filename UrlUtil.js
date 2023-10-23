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
   * "host": `https://help.okta.com`
   * "type": `oie` | `wf` | `asa` | `eu` | `oag`
   *    "type" is not provided for links to "Classic" engine content
   * "locale": `en-us` | `ja-jp`
   * **/
  const redirectUrl = type ?
    `${host}/${type}/${locale}/${fileName}#cshid=${id}`:
    `${host}/${locale}/${fileName}#cshid=${id}`;
  return redirectUrl;

};

export {
  getRedirectUrl,
  getUrlParameter
};
