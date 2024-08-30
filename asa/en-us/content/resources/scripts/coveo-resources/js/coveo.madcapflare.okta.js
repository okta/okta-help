/* Coveo integration for MadcapFlare environment @ Okta */
document.addEventListener('readyToInitCoveo', function () {
    var getMadcapFlareVariable = function (id) {
        var content = '';
        var wrapper = document.getElementById(id);
        if (wrapper) {
            content = wrapper.firstChild.textContent || '';
        }
        return content;
    };
    var isProd = window.location.host === 'help.okta.com';

    var coveo_org_id = getMadcapFlareVariable(isProd ? 'coveo_org_id' : 'coveo_dev_org_id');
    var coveo_rest_uri = getMadcapFlareVariable('coveo_rest_uri');
    var coveo_search_url = getMadcapFlareVariable('coveo_search_url');
    var coveo_token_url = getMadcapFlareVariable('coveo_token_url');
    var coveo_dev_token = getMadcapFlareVariable('coveo_dev_token');
    var tokenPromise = new Promise(function (resolve, reject) {
        if (!isProd) {
            resolve(coveo_dev_token);
            return;
        }
        var MS_IN_A_DAY = 1000 * 60 * 60 * 24;
        var tokenObj = JSON.parse(localStorage.getItem("CoveoSearchToken"));
        var renewTokenNeeded = true;
        if (tokenObj) {
            var difference = new Date().getTime() - tokenObj.timestamp;
            var daysDifference = Math.floor(difference / MS_IN_A_DAY);
            renewTokenNeeded = daysDifference > 0;
        }
        if (!renewTokenNeeded) {
            resolve(tokenObj.value);
        }
        else {
            Coveo.HttpUtils.get(coveo_token_url, function (response) {
            /*  Code update below from Nate MacInnes for using search sandbox in review builds */
            /*  var newTokenObj = { value: JSON.parse(response), timestamp: new Date().getTime() }
                localStorage.setItem("CoveoSearchToken", JSON.stringify(newTokenObj));
                resolve(newTokenObj.value); */
                var parsedResponse = JSON.parse(response);
                var token = parsedResponse.token ? parsedResponse.token : parsedResponse;
                var newTokenObj = { value: token, timestamp: new Date().getTime() };
                localStorage.setItem("CoveoSearchToken", JSON.stringify(newTokenObj));
                resolve(newTokenObj.value);
            });
        }
    });
    tokenPromise.then(function (token) {
        Coveo.SearchEndpoint.configureCloudV2Endpoint(coveo_org_id, token, coveo_rest_uri);
        var searchboxRoot = document.getElementById('standaloneSearchbox');
        // var customSelectObj = new Coveo.CustomSelect(document.getElementById('customSelect'), {
        //     field: '@commoncontenttype',
        //     defaultOption: 'Documentation',
        //     customSort: Coveo.OktaCusto.CONTENT_TYPE_CUSTOM_SORT
        // });
        Coveo.$$(searchboxRoot).on(Coveo.StandaloneSearchInterfaceEvents.beforeRedirect, function (e, args) {
            args.searchPageUri = args.searchPageUri + '?t=Documentation';
        });
        Coveo.configureResourceRoot('https://static.cloud.coveo.com/searchui/v2.5395/js/');
        Coveo.initSearchbox(searchboxRoot, coveo_search_url, {
            Searchbox: {
                placeholder: 'Search our content'
            }
        });
    });
});
