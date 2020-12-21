# i18n-util

  
i18n-util package hosts utils to do locale computation and some custom redirection on help.okta.com. An alias url from the monolith in the format `help.okta.com/okta_help.htm#csh-eu-quick-access-apps?locale=ja` will get transformed into `help.okta.com/ja/prod/okta_help.htm#cshid=csh-eu-quick-access-apps`. `locale` is an optional parameter. If locale is not sent, we'll compute it based on a [priority](#locale)

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

 1. Locale in query param Example help.okta.com/okta_help.htm#csh-eu-quick-access-apps?locale=ja
 2. Locale set via cookie
 3. Browser locale
 4. Default to `en`

Once locale is computed, it gets set as a cookie under the key `okta_help_user_lang`.
<!-- localestop -->


