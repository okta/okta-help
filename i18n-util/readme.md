# i18n-util

  
i18n-util package hosts utils to do locale computation and some custom redirection on help.okta.com. 
The new help link base url format is now available for use, http://help.okta.com/okta_help.htm?id=${doc_alias}.

Admin links will get redirected to en version of the docs since we don’t have translations yet.
Example:

http://help.okta.com/okta_help.htm?id=csh-config-asso

End-user links will get redirected to the localized version of the docs since we have translations.
Example:

https://help.okta.com/okta_help.htm?id=csh_ov_overview&type=end-user

Note:
 -  `id` (alias id) should be provided as the first query param argument in the url
 -  Enduser docs will need to include a `type` as end-user in the query param. `type` is currently not required for admin docs and is treated as default.
 -  `locale` is an optional parameter. For admin docs `locale` will always be computed as en (till we get translations ready).
 -  For end-user docs `locale` will computed automatically based on a [priority](#locale)

<!-- toc -->

*  [Build](#build)
*  [Development](#development)
*  [Locale](#locale)


<!-- tocstop -->

## Build

<!-- build -->

 
```sh
i18n-util $  yarn build
```
Running yarn build will generate a `okta_help.htm` and a `i18n-util.bundle.[hash].js` file. 

<!-- buildstop -->

## Development

<!-- development -->

Any time we make changes to src files within `i18n-util`, we need to make sure we re-generate a new version of `okta_help.htm` and a `i18n-util.bundle.[hash].js` by running `yarn build` and commit those files. While debugging locally use use `yarn build-dev` to enable source maps.

<!-- developmentstop -->

## Locale

<!-- locale -->

  Locale is computed within the LocaleUtil based on a priority list where we look at locale in the following order. A similar priority is used while computing locale for the okta monolith app.

 1. Locale in query param Example help.okta.com/okta_help.htm?id=csh-eu-quick-access-apps&locale=ja
 2. Locale set via cookie
 3. Browser locale
 4. Default to `en`

Once locale is computed, it gets set as a cookie under the key `okta_help_user_lang`.
<!-- localestop -->


