(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoveoExtension"] = factory();
	else
		root["CoveoExtension"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UrlUtils = /** @class */ (function () {
    function UrlUtils() {
    }
    UrlUtils.getUrlParams = function (query) {
        if (!query) {
            return {};
        }
        var parser = document.createElement('a');
        var search = '';
        parser.href = query;
        var hash = parser.hash.substring(1);
        if (hash) {
            var hashParser = document.createElement('a');
            hashParser.href = hash;
            search = hashParser.search.substring(1);
        }
        else {
            search = parser.search.substring(1);
        }
        search = search || query;
        return (/^[?#]/.test(search) ? search.slice(1) : search)
            .split('&')
            .reduce(function (params, param) {
            var _a = param.split('='), key = _a[0], value = _a[1];
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
        }, {});
    };
    UrlUtils.getLocationFromUri = function (query) {
        if (!query) {
            return {};
        }
        var anchor = document.createElement('a');
        anchor.href = query;
        var retVal = {
            href: anchor.href,
            pathname: anchor.pathname,
            hostname: anchor.hostname,
            host: anchor.host,
            search: anchor.search,
            protocol: anchor.protocol,
            hash: anchor.hash
        };
        return retVal;
    };
    return UrlUtils;
}());
exports.UrlUtils = UrlUtils;
;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OktaHelper = /** @class */ (function () {
    function OktaHelper() {
    }
    OktaHelper.yourHelperMethod = function () {
        return '';
    };
    OktaHelper.customLoadTemplate = function (value, options) {
        var element = Coveo.$$('div').el;
        element.innerHTML = Coveo.TemplateHelpers.getHelper('loadTemplate').call(this, options.templateId);
        Coveo.Initialization.automaticallyCreateComponentsInside(element, {
            options: {},
            bindings: options.bindings,
            result: OktaHelper.resolveQueryResult()
        });
        return element.innerHTML;
    };
    OktaHelper.badge = function (value, options) {
        var badgeCss = options.badgeCss || 'badge-okta';
        var badge = Coveo.$$('span', { className: "badge badge-pill " + badgeCss }, value);
        return badge.el.outerHTML;
    };
    OktaHelper.resolveQueryResult = function () {
        var found;
        var resultList = Coveo.Component.getComponentRef('ResultList');
        if (resultList) {
            found = resultList.resultCurrentlyBeingRendered;
        }
        if (!found) {
            var quickview = Coveo.Component.getComponentRef('Quickview');
            if (quickview) {
                found = quickview.resultCurrentlyBeingRendered;
            }
        }
        return found;
    };
    return OktaHelper;
}());
exports.OktaHelper = OktaHelper;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OktaFacetManager = /** @class */ (function () {
    function OktaFacetManager() {
    }
    /**
     * Add the boolean option `oktaFlavor` on the `Facet` component
     * Override `createDom` prototype on the `Facet` component
     *
     * @static
     * @memberof OktaFacetManager
     */
    OktaFacetManager.initialize = function () {
        var defaultFacetCreateDom = Coveo.Facet.prototype.createDom;
        var defaultRebuildValueElements = Coveo.Facet.prototype['rebuildValueElements'];
        Coveo.Facet.options['oktaFlavor'] = Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false });
        Coveo.Facet.prototype.createDom = function () {
            var self = this;
            defaultFacetCreateDom.call(self);
        };
        Coveo.Facet.prototype['rebuildValueElements'] = function () {
            var self = this;
            defaultRebuildValueElements.call(self);
            OktaFacetManager.customRebuildValueElements(self);
        };
    };
    /**
     * Injects a fake "All Content" value to the facet when oktaFlavor option is activated.
     *
     * @static
     * @param {Coveo.Facet} facet
     * @memberof OktaFacetManager
     */
    OktaFacetManager.customRebuildValueElements = function (facet) {
        var self = facet;
        if (self.options['oktaFlavor']) {
            var fakeFacetValueElement = Coveo.$$('div');
            var shouldBeChecked = self.facetValuesList.facet.getSelectedValues().length === 0 && self.facetValuesList.facet.getExcludedValues().length === 0;
            var allFacetValue = Coveo.FacetValue.createFromValue('All Content');
            allFacetValue.selected = shouldBeChecked;
            var allFacetValueElement = new Coveo.FacetValueElement(self, allFacetValue, true);
            allFacetValueElement.build();
            allFacetValueElement.renderer.withNo(allFacetValueElement.renderer.excludeIcon);
            fakeFacetValueElement.setHtml(allFacetValueElement.renderer.listItem.outerHTML);
            var fakeFacetValueElementListItem = Coveo.$$(fakeFacetValueElement).find('li');
            if (fakeFacetValueElementListItem) {
                Coveo.$$(fakeFacetValueElementListItem).on('click', function (e) {
                    var shouldBeChecked = self.facetValuesList.facet.getSelectedValues().length === 0 && self.facetValuesList.facet.getExcludedValues().length === 0;
                    Coveo.$$(fakeFacetValueElementListItem).toggleClass('coveo-selected', shouldBeChecked);
                    if (!shouldBeChecked) {
                        self.reset();
                        self.triggerNewQuery();
                    }
                });
                // Make sure to not insert the (fake) All Content facet value is already into the value Container.
                var firstElementChild = self.facetValuesList.valueContainer.firstElementChild;
                if (firstElementChild && firstElementChild.dataset.value !== 'All Content') {
                    self.facetValuesList.valueContainer.insertBefore(fakeFacetValueElementListItem, self.facetValuesList.valueContainer.firstChild);
                }
            }
        }
    };
    return OktaFacetManager;
}());
exports.OktaFacetManager = OktaFacetManager;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component = Coveo.Component;
var Initialization = Coveo.Initialization;
var ComponentOptions = Coveo.ComponentOptions;
var SalesforceCommunityResultLink = /** @class */ (function (_super) {
    __extends(SalesforceCommunityResultLink, _super);
    function SalesforceCommunityResultLink(element, options, bindings, result) {
        var _this = _super.call(this, element, SalesforceCommunityResultLink.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.result = result;
        _this.options = ComponentOptions.initComponentOptions(element, SalesforceCommunityResultLink, options);
        _this.result = result;
        if (_this.options.communityOptions.enableUrlRewriter) {
            _this.applyCommunityUrlRewriter();
        }
        new Coveo.ResultLink(_this.element, _this.options, bindings, result);
        return _this;
    }
    SalesforceCommunityResultLink.prototype.applyCommunityUrlRewriter = function () {
        var communityUrl = SalesforceCommunityResultLink.getCommunityUrl(this.result, this.options.communityOptions);
        if (communityUrl) {
            this.result.clickUri = this.result['ClickUri'] = this.result.raw.clickableuri = this.result.raw.sysclickableuri = communityUrl;
        }
    };
    SalesforceCommunityResultLink.getCommunityName = function (options) {
        var communityName = window.location.pathname.replace(/\/(.*)\/s\/(.*)/i, '$1');
        communityName = options.name || (communityName != window.location.pathname ? communityName : '');
        return communityName;
    };
    SalesforceCommunityResultLink.getCommunityUrl = function (result, options) {
        var communityName = SalesforceCommunityResultLink.getCommunityName(options);
        var communityPath = communityName ? "/" + communityName : '';
        var communityBaseUrl = options.protocol + "//" + options.hostName + communityPath;
        var communityUrl = '';
        if (result.raw.objecttype == 'Case') {
            communityUrl = communityBaseUrl + "/s/case/" + result.raw.sfcaseid;
        }
        else if (result.raw.objecttype == 'FeedItem' || result.raw.objecttype == 'FeedComment') {
            var parentId = result.raw.sfparentid || '';
            var path = parentId.substr(0, 3) == '005' ? 'question' : 'feed';
            communityUrl = communityBaseUrl + "/s/" + path + "/" + (result.raw.sffeeditemid || result.raw.sfid);
        }
        else if (result.raw.objecttype == 'CollaborationGroup') {
            communityUrl = communityBaseUrl + "/s/group/" + result.raw.sfid;
        }
        else if (result.raw.objecttype == 'ContentVersion') {
            communityUrl = communityBaseUrl + "/s/contentdocument/" + result.raw.sfcontentdocumentid;
        }
        else if (result.raw.objecttype == 'Idea') {
            communityUrl = communityBaseUrl + "/s/idea/" + (result.raw.sfideaid || result.raw.sfid);
        }
        else if (result.raw.sfkbid) {
            communityUrl = communityBaseUrl + "/s/article/" + result.raw.sfurlname;
        }
        return communityUrl;
    };
    SalesforceCommunityResultLink.ID = 'SalesforceCommunityResultLink';
    SalesforceCommunityResultLink.REQUIRED_FIELDS_TO_INCLUDE = [
        '@sfcaseid',
        '@objecttype',
        '@sfparentid',
        '@sffeeditemid',
        '@sfid',
        '@sfcontentdocumentid',
        '@sfideaid',
        '@sfkbid',
        '@sfurlname',
    ];
    SalesforceCommunityResultLink.communityOptions = {
        enableUrlRewriter: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        name: Coveo.ComponentOptions.buildStringOption({ defaultValue: '' }),
        hostName: Coveo.ComponentOptions.buildStringOption({ defaultValue: window.location.hostname }),
        protocol: Coveo.ComponentOptions.buildStringOption({ defaultValue: window.location.protocol })
    };
    /**
     * The options for the component
     * @componentOptions
     */
    SalesforceCommunityResultLink.options = {
        // communityOptions: SalesforceCommunityResultLink.communityOptions
        communityOptions: Coveo.ComponentOptions.buildObjectOption({ subOptions: SalesforceCommunityResultLink.communityOptions })
    };
    return SalesforceCommunityResultLink;
}(Component));
exports.SalesforceCommunityResultLink = SalesforceCommunityResultLink;
Initialization.registerAutoCreateComponent(SalesforceCommunityResultLink);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
// your custo component
__export(__webpack_require__(10));
// your ui components here
var CustomSelect_1 = __webpack_require__(11);
exports.CustomSelect = CustomSelect_1.CustomSelect;
var StackoverflowStats_1 = __webpack_require__(12);
exports.StackoverflowStats = StackoverflowStats_1.StackoverflowStats;
var SalesforceCommunityResultLink_1 = __webpack_require__(3);
exports.SalesforceCommunityResultLink = SalesforceCommunityResultLink_1.SalesforceCommunityResultLink;
var SwapVar_1 = __webpack_require__(13);
SwapVar_1.swapVar(this);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(6);
var UrlUtils_1 = __webpack_require__(0);
exports.UrlUtils = UrlUtils_1.UrlUtils;
var HttpUtils_1 = __webpack_require__(7);
exports.HttpUtils = HttpUtils_1.HttpUtils;
var LexUtils_1 = __webpack_require__(8);
exports.LexUtils = LexUtils_1.LexUtils;
var CustomEvents_1 = __webpack_require__(9);
exports.CustomEvents = CustomEvents_1.CustomEvents;
var OktaHelper_1 = __webpack_require__(1);
exports.OktaHelper = OktaHelper_1.OktaHelper;
var OktaFacetManager_1 = __webpack_require__(2);
exports.OktaFacetManager = OktaFacetManager_1.OktaFacetManager;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

String.prototype.getInitials = function (glue) {
    if (glue === void 0) { glue = true; }
    var initials = this.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g) || [];
    if (glue) {
        return initials.join('');
    }
    return initials;
};
String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HttpUtils = /** @class */ (function () {
    function HttpUtils() {
    }
    HttpUtils.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        };
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LexUtils = /** @class */ (function () {
    function LexUtils() {
    }
    LexUtils.getCoveoSearchUI = function (cmp) {
        return cmp.getElements().find(function (el) {
            return Coveo.$$(el).find('#' + cmp.get('v.name')) || Coveo.$$(el).find('.CoveoSearchInterface');
        });
    };
    LexUtils.getSearchInterfaceElement = function (cmp) {
        var coveoSearchUI = LexUtils.getCoveoSearchUI(cmp);
        return coveoSearchUI ? Coveo.$$(coveoSearchUI).find('#' + cmp.get('v.name')) || Coveo.$$(coveoSearchUI).find('.CoveoSearchInterface') : null;
    };
    return LexUtils;
}());
exports.LexUtils = LexUtils;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CustomEvents = /** @class */ (function () {
    function CustomEvents() {
    }
    CustomEvents.yourCustomEvent = 'yourCustomEvent';
    return CustomEvents;
}());
exports.CustomEvents = CustomEvents;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component = Coveo.Component;
var Initialization = Coveo.Initialization;
var ComponentOptions = Coveo.ComponentOptions;
var UrlUtils_1 = __webpack_require__(0);
var OktaHelper_1 = __webpack_require__(1);
var OktaFacetManager_1 = __webpack_require__(2);
var SalesforceCommunityResultLink_1 = __webpack_require__(3);
/**
 * Required customization specifically applied for your implementation
 */
var OktaCusto = /** @class */ (function (_super) {
    __extends(OktaCusto, _super);
    function OktaCusto(element, options, bindings) {
        var _this = _super.call(this, element, OktaCusto.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.defaultTypeOfContent = [];
        _this.options = ComponentOptions.initComponentOptions(element, OktaCusto, options);
        if (_this.options.enableCustomFacet) {
            OktaFacetManager_1.OktaFacetManager.initialize();
        }
        // Initialization Events
        _this.bind.onRootElement(Coveo.InitializationEvents.beforeInitialization, _this.handleBeforeInit);
        _this.bind.onRootElement(Coveo.InitializationEvents.afterComponentsInitialization, _this.handleAfterComponentsInit);
        _this.bind.onRootElement(Coveo.InitializationEvents.afterInitialization, _this.handleAfterInit);
        // Query Events
        _this.bind.onRootElement(Coveo.QueryEvents.newQuery, _this.handleNewQuery);
        _this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, _this.handleBuildingQuery);
        _this.bind.onRootElement(Coveo.QueryEvents.doneBuildingQuery, _this.handleDoneBuildingQuery);
        _this.bind.onRootElement(Coveo.QueryEvents.preprocessResults, _this.handlePreprocessResults);
        _this.bind.onRootElement(Coveo.QueryEvents.preprocessMoreResults, _this.handlePreprocessResults);
        _this.bind.onRootElement(Coveo.QueryEvents.querySuccess, _this.handleQuerySuccess);
        var params = UrlUtils_1.UrlUtils.getUrlParams(window.location.search);
        var searchboxOption = localStorage.getItem('SearchboxOption');
        var facetComponents = _this.searchInterface.getComponents('Facet');
        if (_this.options.typeOfContentDefaultValues && _this.options.typeOfContentDefaultValues.length) {
            _this.defaultTypeOfContent = _this.options.typeOfContentDefaultValues;
        }
        else if (params.sbOption) {
            _this.defaultTypeOfContent.push(params.sbOption);
        }
        else if (searchboxOption) {
            _this.defaultTypeOfContent.push(searchboxOption);
        }
        // no need to default to all
        _this.defaultTypeOfContent = _.without(_this.defaultTypeOfContent, 'all', 'All Content', 'all content', '');
        if (facetComponents.length) {
            _this.facetTypeOfContent = _.find(facetComponents, function (f) { return f.options.id === _this.options.typeOfContentId; });
        }
        return _this;
    }
    /**
     * Before Initialization
     */
    OktaCusto.prototype.handleBeforeInit = function () { };
    /**
     * After Component Initialization
     */
    OktaCusto.prototype.handleAfterComponentsInit = function () {
        // Coveo.TemplateHelpers.registerFieldHelper('customLoadTemplate', (value, options) => {
        //   var element = Coveo.$$('div').el;
        //   element.innerHTML = Coveo.TemplateHelpers.getHelper('loadTemplate').call(this, options.templateId);
        //   Coveo.Initialization.automaticallyCreateComponentsInside(element, {
        //     options: {},
        //     bindings: this.bindings,
        //     result: OktaHelper.resolveQueryResult()
        //   });
        //   return element.innerHTML;
        // });
        Coveo.TemplateHelpers.registerFieldHelper('badge', OktaHelper_1.OktaHelper.badge);
    };
    /**
     * After Component Initialization
     */
    OktaCusto.prototype.handleAfterInit = function () {
        if (this.facetTypeOfContent && this.defaultTypeOfContent && this.defaultTypeOfContent.length) {
            this.facetTypeOfContent.selectMultipleValues(this.defaultTypeOfContent);
        }
    };
    /**
     * New Query
     */
    OktaCusto.prototype.handleNewQuery = function (args) {
        if (!this.queryController.firstQuery) {
            localStorage.removeItem('SearchboxOption');
        }
    };
    /**
     * Building Query
     */
    OktaCusto.prototype.handleBuildingQuery = function (args) {
    };
    /**
     * Done Building Query
     */
    OktaCusto.prototype.handleDoneBuildingQuery = function (args) {
        var mergedFieldsToInclude = args.queryBuilder.fieldsToInclude || [];
        args.queryBuilder.fieldsToInclude = mergedFieldsToInclude.concat(SalesforceCommunityResultLink_1.SalesforceCommunityResultLink.REQUIRED_FIELDS_TO_INCLUDE);
    };
    /**
     * Preprocess Results
     */
    OktaCusto.prototype.handlePreprocessResults = function (args) {
        var _this = this;
        _.each(args.results.results, function (result) {
            result.raw.sfcommentcount = result.raw.sfcommentcount == 0 ? '0' : result.raw.sfcommentcount;
            result.raw.communityClickUri = SalesforceCommunityResultLink_1.SalesforceCommunityResultLink.getCommunityUrl(result, _this.options.communityOptions) || result.clickUri;
        });
    };
    /**
     * Query Success
     */
    OktaCusto.prototype.handleQuerySuccess = function (args) { };
    OktaCusto.ID = 'OktaCusto';
    OktaCusto.communityOptions = {
        enableUrlRewriter: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        name: Coveo.ComponentOptions.buildStringOption({ defaultValue: '' }),
        hostName: Coveo.ComponentOptions.buildStringOption({ defaultValue: window.location.hostname }),
        protocol: Coveo.ComponentOptions.buildStringOption({ defaultValue: window.location.protocol })
    };
    OktaCusto.options = {
        typeOfContentId: Coveo.ComponentOptions.buildStringOption(),
        typeOfContentDefaultValues: Coveo.ComponentOptions.buildListOption(),
        enableCustomFacet: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        communityOptions: Coveo.ComponentOptions.buildObjectOption({ subOptions: OktaCusto.communityOptions })
    };
    return OktaCusto;
}(Component));
exports.OktaCusto = OktaCusto;
;
Initialization.registerAutoCreateComponent(OktaCusto);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component = Coveo.Component;
var Initialization = Coveo.Initialization;
var ComponentOptions = Coveo.ComponentOptions;
/**
 * Component used to render custom select box which after a click displays a
 * collapsable list of multiple values which can be used in forms, menus or surveys.
 * This component overwrites a standard select to replace it with our custom select.
 */
var CustomSelect = /** @class */ (function (_super) {
    __extends(CustomSelect, _super);
    function CustomSelect(element, options, bindings) {
        var _this = _super.call(this, element, CustomSelect.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.options = ComponentOptions.initComponentOptions(element, CustomSelect, options);
        _this.select = _this.getSelectElement();
        Coveo.$$(_this.select).addClass('coveo-custom-select-hidden');
        var promiseOptions = new Promise(function (resolve, reject) {
            if (_this.options.field) {
                var endpoint = _this.queryController ? _this.queryController.getEndpoint() : Coveo.SearchEndpoint.endpoints['default'];
                if (endpoint) {
                    endpoint.listFieldValues({ field: _this.options.field.toString(), maximumNumberOfValues: 100 }).done(function (values) {
                        resolve(_.map(values, function (v) {
                            return { label: v.value, value: v.value };
                        }));
                    });
                }
                else {
                    reject({ 'error': 'no endpoint!' });
                }
            }
            else {
                resolve(_this.options.options);
            }
        });
        _this.buildSelectStyled();
        promiseOptions.then(function (values) {
            _this.selectOptions = values;
            _this.renderSelectStyled();
            localStorage.setItem(_this.options.localStorageKey, _this.getSelectedOption());
        });
        return _this;
    }
    CustomSelect.prototype.getSelectElement = function () {
        var selectEl = (this.element instanceof HTMLSelectElement ? this.element : Coveo.$$(this.element).find('select'));
        if (!selectEl) {
            selectEl = Coveo.$$('select').el;
            this.element.appendChild(selectEl);
        }
        return selectEl;
    };
    CustomSelect.prototype.buildSelectStyled = function () {
        var _this = this;
        // create wrapper container
        var wrapper = Coveo.$$('div', { className: 'coveo-custom-select' });
        // insert wrapper before select element in the DOM tree
        this.select.parentNode.insertBefore(wrapper.el, this.select);
        // move select into wrapper
        wrapper.append(this.select);
        this.selectStyled = Coveo.$$('div', { className: 'coveo-custom-select-styled' });
        this.listOptions = Coveo.$$('ul', { className: 'coveo-custom-select-options' });
        wrapper.append(this.selectStyled.el);
        wrapper.append(this.listOptions.el);
        this.renderSelectStyled();
        this.selectStyled.on('click', function (e) {
            e.stopPropagation();
            _this.selectStyled.toggleClass('active');
            _this.listOptions.toggle();
        });
        document.addEventListener('click', function () {
            _this.selectStyled.removeClass('active');
            _this.listOptions.hide();
        });
    };
    CustomSelect.prototype.renderSelectStyled = function () {
        var self = this;
        this.listOptions.empty();
        if (!this.select.options.length) {
            this.buildSelectOptions();
        }
        var current = this.select.options.length ? this.select.options[this.select.selectedIndex].text : '';
        this.selectStyled.text(current);
        var _loop_1 = function () {
            var listItem = Coveo.$$('li', {
                value: this_1.select.options.item(i).value
            }, this_1.select.options.item(i).text);
            this_1.listOptions.append(listItem.el);
            listItem.on('click', function (e) {
                e.stopPropagation();
                self.select.value = listItem.getAttribute('value');
                localStorage.setItem(self.options.localStorageKey, self.getSelectedOption());
                self.selectStyled.text(listItem.text());
                self.selectStyled.removeClass('active');
                self.listOptions.hide();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.select.options.length; i++) {
            _loop_1();
        }
    };
    CustomSelect.prototype.buildSelectOptions = function () {
        var _this = this;
        Coveo.$$(this.select).empty();
        if (this.selectOptions) {
            this.selectOptions.unshift({ label: 'All Content', value: 'all' });
            this.selectOptions = _.uniq(this.selectOptions, function (v) { return v.label; });
            _.each(this.selectOptions, function (o) {
                var selectOptionEl = Coveo.$$('option', {
                    value: o.value,
                }, o.label).el;
                if (_this.options.defaultOption === o.value) {
                    selectOptionEl.selected = true;
                }
                Coveo.$$(_this.select).append(selectOptionEl);
            });
        }
    };
    CustomSelect.prototype.getSelectedOption = function () {
        return this.select.options[this.select.selectedIndex].value;
    };
    CustomSelect.prototype.setSelectedOption = function (value) {
        var nextSelectedIndex = _.findIndex(this.select.options, function (o) {
            return o.value === value;
        });
        if (nextSelectedIndex >= 0) {
            this.select.value = this.select.options[nextSelectedIndex].value;
            localStorage.setItem(this.options.localStorageKey, this.getSelectedOption());
            this.selectStyled.text(this.select.options[nextSelectedIndex].text);
            this.selectStyled.removeClass('active');
        }
    };
    CustomSelect.ID = 'CustomSelect';
    /**
     * The options for the component
     * @componentOptions
     */
    CustomSelect.options = {
        options: Coveo.ComponentOptions.buildJsonOption(),
        field: Coveo.ComponentOptions.buildFieldOption(),
        defaultOption: Coveo.ComponentOptions.buildStringOption(),
        localStorageKey: Coveo.ComponentOptions.buildStringOption({ defaultValue: 'SearchboxOption' }),
    };
    return CustomSelect;
}(Component));
exports.CustomSelect = CustomSelect;
Initialization.registerAutoCreateComponent(CustomSelect);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component = Coveo.Component;
var Initialization = Coveo.Initialization;
var ComponentOptions = Coveo.ComponentOptions;
var StackoverflowStats = /** @class */ (function (_super) {
    __extends(StackoverflowStats, _super);
    function StackoverflowStats(element, options, bindings, result) {
        var _this = _super.call(this, element, StackoverflowStats.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.result = result;
        _this.options = ComponentOptions.initComponentOptions(element, StackoverflowStats, options);
        _this.result = result;
        _this.statsContainer = Coveo.$$('div', { className: 'stats' });
        _this.element.appendChild(_this.statsContainer.el);
        _this.buildStats();
        return _this;
    }
    StackoverflowStats.prototype.buildStats = function () {
        if (this.options.enableVote) {
            this.buildSingleStat('votes', 'stackoverflow_score');
        }
        if (this.options.enableStatus) {
            var isAnswered = (this.result.raw.stackoverflow_is_answered && this.result.raw.stackoverflow_is_answered === "True");
            this.buildSingleStat('status', 'stackoverflow_answer_count', isAnswered);
        }
        if (this.options.enableViews) {
            this.buildSingleStat('views', 'stackoverflow_view_count');
        }
    };
    StackoverflowStats.prototype.buildSingleStat = function (statName, field, isAnswerAccepted) {
        if (isAnswerAccepted === void 0) { isAnswerAccepted = false; }
        var statContainer = Coveo.$$('div', { className: statName });
        if (statName === 'status') {
            var count = Number(this.result.raw[field] || '');
            statContainer.addClass(count > 0 ? 'answered' : 'unanswered');
            statContainer.addClass(isAnswerAccepted ? 'answered-accepted' : '');
        }
        var statValue = Coveo.$$('div');
        var statTxt = Coveo.$$('div');
        statContainer.append(statValue.el);
        statContainer.append(statTxt.el);
        this.addStatField(statValue.el, field);
        new Coveo.Text(statTxt.el, { value: Coveo.l(statName) }, this.getBindings());
        this.statsContainer.append(statContainer.el);
    };
    StackoverflowStats.prototype.addStatField = function (element, field) {
        var _this = this;
        var fieldOptions = {
            field: field
        };
        // For Lazy version ...
        if (Coveo.LazyInitialization) {
            Coveo.load('FieldValue').then(function () {
                new Coveo.FieldValue(element, fieldOptions, _this.getBindings(), _this.result);
            });
        }
        else {
            new Coveo.FieldValue(element, fieldOptions, this.getBindings(), this.result);
        }
    };
    StackoverflowStats.ID = 'StackoverflowStats';
    /**
     * The options for the component
     * @componentOptions
     */
    StackoverflowStats.options = {
        enableVote: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        enableStatus: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        enableViews: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
    };
    return StackoverflowStats;
}(Component));
exports.StackoverflowStats = StackoverflowStats;
Initialization.registerAutoCreateComponent(StackoverflowStats);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Webpack output a library target with a temporary name.
// It does not take care of merging the namespace if the global variable already exists.
// If another piece of code in the page use the Coveo namespace (eg: extension), then they get overwritten
// This code swap the current module to the "real" Coveo variable, without overwriting the whole global var.
// This is to allow end user to put CoveoPSComponents.js before or after the main CoveoJsSearch.js, without breaking
function swapVar(scope) {
    if (window['Coveo'] == undefined) {
        window['Coveo'] = scope;
    }
    else {
        _.each(_.keys(scope), function (k) {
            window['Coveo'][k] = scope[k];
        });
    }
}
exports.swapVar = swapVar;


/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNTFjM2JlM2VhYjI0NTUwNWYxOSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvVXJsVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N1c3RvL09rdGFIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N1c3RvL09rdGFGYWNldE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rLnRzIiwid2VicGFjazovLy8uL3NyYy9JbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvT2t0YUNvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1N0cmluZ1V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9IdHRwVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0xleFV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvQ3VzdG9tRXZlbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jdXN0by9Pa3RhQ3VzdG8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL0N1c3RvbVNlbGVjdC9DdXN0b21TZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL1N0YWNrb3ZlcmZsb3dTdGF0cy9TdGFja292ZXJmbG93U3RhdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N3YXBWYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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QkFBa0IsQ0FBQyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQztRQUM3RSxXQUFXLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDO0tBQzdFLENBQUM7SUFpRUoseUJBQUM7Q0FBQSxDQTVFdUMsU0FBUyxHQTRFaEQ7QUE1RVksZ0RBQWtCO0FBOEUvQixjQUFjLENBQUMsMkJBQTJCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ3ZGL0QseURBQXlEO0FBQ3pELHdGQUF3RjtBQUN4RiwwR0FBMEc7QUFDMUcsNEdBQTRHO0FBQzVHLG9IQUFvSDtBQUVwSCxTQUFnQixPQUFPLENBQUMsS0FBVTtJQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUU7UUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN6QjtTQUFNO1FBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBUkQsMEJBUUMiLCJmaWxlIjoiQ292ZW8uT2t0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkNvdmVvRXh0ZW5zaW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkNvdmVvRXh0ZW5zaW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE1MWMzYmUzZWFiMjQ1NTA1ZjE5IiwiZXhwb3J0IGNsYXNzIFVybFV0aWxzIHtcbiAgc3RhdGljIGdldFVybFBhcmFtcyA9IHF1ZXJ5ID0+IHtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgdmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgc2VhcmNoID0gJyc7XG4gICAgcGFyc2VyLmhyZWYgPSBxdWVyeTtcbiAgICB2YXIgaGFzaCA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKTtcbiAgICBpZiAoaGFzaCkge1xuICAgICAgdmFyIGhhc2hQYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBoYXNoUGFyc2VyLmhyZWYgPSBoYXNoO1xuICAgICAgc2VhcmNoID0gaGFzaFBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWFyY2ggPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB9XG5cbiAgICBzZWFyY2ggPSBzZWFyY2ggfHwgcXVlcnk7XG5cbiAgICByZXR1cm4gKC9eWz8jXS8udGVzdChzZWFyY2gpID8gc2VhcmNoLnNsaWNlKDEpIDogc2VhcmNoKVxuICAgICAgLnNwbGl0KCcmJylcbiAgICAgIC5yZWR1Y2UoKHBhcmFtcywgcGFyYW0pID0+IHtcbiAgICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWUgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWUucmVwbGFjZSgvXFwrL2csICcgJykpIDogJyc7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TG9jYXRpb25Gcm9tVXJpID0gcXVlcnkgPT4ge1xuICAgIGlmICghcXVlcnkpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgdmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3IuaHJlZiA9IHF1ZXJ5O1xuICAgIHZhciByZXRWYWwgPSB7XG4gICAgICBocmVmOiBhbmNob3IuaHJlZixcbiAgICAgIHBhdGhuYW1lOiBhbmNob3IucGF0aG5hbWUsXG4gICAgICBob3N0bmFtZTogYW5jaG9yLmhvc3RuYW1lLFxuICAgICAgaG9zdDogYW5jaG9yLmhvc3QsXG4gICAgICBzZWFyY2g6IGFuY2hvci5zZWFyY2gsXG4gICAgICBwcm90b2NvbDogYW5jaG9yLnByb3RvY29sLFxuICAgICAgaGFzaDogYW5jaG9yLmhhc2hcbiAgICB9O1xuICAgIHJldHVybiByZXRWYWw7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvVXJsVXRpbHMudHMiLCJcbmV4cG9ydCBjbGFzcyBPa3RhSGVscGVyIHtcblxuICBzdGF0aWMgeW91ckhlbHBlck1ldGhvZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHN0YXRpYyBjdXN0b21Mb2FkVGVtcGxhdGUodmFsdWUsIG9wdGlvbnMpOiBzdHJpbmcge1xuXG4gICAgdmFyIGVsZW1lbnQgPSBDb3Zlby4kJCgnZGl2JykuZWw7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBDb3Zlby5UZW1wbGF0ZUhlbHBlcnMuZ2V0SGVscGVyKCdsb2FkVGVtcGxhdGUnKS5jYWxsKHRoaXMsIG9wdGlvbnMudGVtcGxhdGVJZCk7XG4gICAgQ292ZW8uSW5pdGlhbGl6YXRpb24uYXV0b21hdGljYWxseUNyZWF0ZUNvbXBvbmVudHNJbnNpZGUoZWxlbWVudCwge1xuICAgICAgb3B0aW9uczoge30sXG4gICAgICBiaW5kaW5nczogb3B0aW9ucy5iaW5kaW5ncyxcbiAgICAgIHJlc3VsdDogT2t0YUhlbHBlci5yZXNvbHZlUXVlcnlSZXN1bHQoKVxuICAgIH0pO1xuICAgIHJldHVybiBlbGVtZW50LmlubmVySFRNTFxuICB9XG5cbiAgc3RhdGljIGJhZGdlKHZhbHVlLCBvcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCBiYWRnZUNzcyA9IG9wdGlvbnMuYmFkZ2VDc3MgfHwgJ2JhZGdlLW9rdGEnO1xuICAgIGxldCBiYWRnZSA9IENvdmVvLiQkKCdzcGFuJywgeyBjbGFzc05hbWU6IGBiYWRnZSBiYWRnZS1waWxsICR7YmFkZ2VDc3N9YCB9LCB2YWx1ZSk7XG4gICAgcmV0dXJuIGJhZGdlLmVsLm91dGVySFRNTDtcbiAgfVxuICBzdGF0aWMgcmVzb2x2ZVF1ZXJ5UmVzdWx0KCk6IENvdmVvLklRdWVyeVJlc3VsdCB7XG4gICAgbGV0IGZvdW5kO1xuICAgIGxldCByZXN1bHRMaXN0ID0gQ292ZW8uQ29tcG9uZW50LmdldENvbXBvbmVudFJlZignUmVzdWx0TGlzdCcpO1xuICAgIGlmIChyZXN1bHRMaXN0KSB7XG4gICAgICBmb3VuZCA9IHJlc3VsdExpc3QucmVzdWx0Q3VycmVudGx5QmVpbmdSZW5kZXJlZDtcbiAgICB9XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgbGV0IHF1aWNrdmlldyA9IENvdmVvLkNvbXBvbmVudC5nZXRDb21wb25lbnRSZWYoJ1F1aWNrdmlldycpO1xuICAgICAgaWYgKHF1aWNrdmlldykge1xuICAgICAgICBmb3VuZCA9IHF1aWNrdmlldy5yZXN1bHRDdXJyZW50bHlCZWluZ1JlbmRlcmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N1c3RvL09rdGFIZWxwZXIudHMiLCJleHBvcnQgY2xhc3MgT2t0YUZhY2V0TWFuYWdlciB7XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgYm9vbGVhbiBvcHRpb24gYG9rdGFGbGF2b3JgIG9uIHRoZSBgRmFjZXRgIGNvbXBvbmVudFxuICAgKiBPdmVycmlkZSBgY3JlYXRlRG9tYCBwcm90b3R5cGUgb24gdGhlIGBGYWNldGAgY29tcG9uZW50XG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlcm9mIE9rdGFGYWNldE1hbmFnZXJcbiAgICovXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xuXG4gICAgdmFyIGRlZmF1bHRGYWNldENyZWF0ZURvbSA9IENvdmVvLkZhY2V0LnByb3RvdHlwZS5jcmVhdGVEb207XG4gICAgdmFyIGRlZmF1bHRSZWJ1aWxkVmFsdWVFbGVtZW50cyA9IENvdmVvLkZhY2V0LnByb3RvdHlwZVsncmVidWlsZFZhbHVlRWxlbWVudHMnXTtcblxuICAgIENvdmVvLkZhY2V0Lm9wdGlvbnNbJ29rdGFGbGF2b3InXSA9IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRCb29sZWFuT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KTtcblxuICAgIENvdmVvLkZhY2V0LnByb3RvdHlwZS5jcmVhdGVEb20gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZjogQ292ZW8uRmFjZXQgPSB0aGlzO1xuICAgICAgZGVmYXVsdEZhY2V0Q3JlYXRlRG9tLmNhbGwoc2VsZik7XG4gICAgfTtcblxuICAgIENvdmVvLkZhY2V0LnByb3RvdHlwZVsncmVidWlsZFZhbHVlRWxlbWVudHMnXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmOiBDb3Zlby5GYWNldCA9IHRoaXM7XG4gICAgICBkZWZhdWx0UmVidWlsZFZhbHVlRWxlbWVudHMuY2FsbChzZWxmKTtcbiAgICAgIE9rdGFGYWNldE1hbmFnZXIuY3VzdG9tUmVidWlsZFZhbHVlRWxlbWVudHMoc2VsZik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluamVjdHMgYSBmYWtlIFwiQWxsIENvbnRlbnRcIiB2YWx1ZSB0byB0aGUgZmFjZXQgd2hlbiBva3RhRmxhdm9yIG9wdGlvbiBpcyBhY3RpdmF0ZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtDb3Zlby5GYWNldH0gZmFjZXRcbiAgICogQG1lbWJlcm9mIE9rdGFGYWNldE1hbmFnZXJcbiAgICovXG4gIHN0YXRpYyBjdXN0b21SZWJ1aWxkVmFsdWVFbGVtZW50cyhmYWNldDogQ292ZW8uRmFjZXQpIHtcbiAgICB2YXIgc2VsZjogQ292ZW8uRmFjZXQgPSBmYWNldDtcblxuICAgIGlmIChzZWxmLm9wdGlvbnNbJ29rdGFGbGF2b3InXSkge1xuICAgICAgdmFyIGZha2VGYWNldFZhbHVlRWxlbWVudCA9IENvdmVvLiQkKCdkaXYnKTtcbiAgICAgIHZhciBzaG91bGRCZUNoZWNrZWQgPSBzZWxmLmZhY2V0VmFsdWVzTGlzdC5mYWNldC5nZXRTZWxlY3RlZFZhbHVlcygpLmxlbmd0aCA9PT0gMCAmJiBzZWxmLmZhY2V0VmFsdWVzTGlzdC5mYWNldC5nZXRFeGNsdWRlZFZhbHVlcygpLmxlbmd0aCA9PT0gMDtcblxuICAgICAgdmFyIGFsbEZhY2V0VmFsdWUgPSBDb3Zlby5GYWNldFZhbHVlLmNyZWF0ZUZyb21WYWx1ZSgnQWxsIENvbnRlbnQnKTtcbiAgICAgIGFsbEZhY2V0VmFsdWUuc2VsZWN0ZWQgPSBzaG91bGRCZUNoZWNrZWQ7XG4gICAgICB2YXIgYWxsRmFjZXRWYWx1ZUVsZW1lbnQgPSBuZXcgQ292ZW8uRmFjZXRWYWx1ZUVsZW1lbnQoc2VsZiwgYWxsRmFjZXRWYWx1ZSwgdHJ1ZSk7XG4gICAgICBhbGxGYWNldFZhbHVlRWxlbWVudC5idWlsZCgpO1xuICAgICAgYWxsRmFjZXRWYWx1ZUVsZW1lbnQucmVuZGVyZXIud2l0aE5vKGFsbEZhY2V0VmFsdWVFbGVtZW50LnJlbmRlcmVyLmV4Y2x1ZGVJY29uKTtcbiAgICAgIGZha2VGYWNldFZhbHVlRWxlbWVudC5zZXRIdG1sKGFsbEZhY2V0VmFsdWVFbGVtZW50LnJlbmRlcmVyLmxpc3RJdGVtLm91dGVySFRNTCk7XG5cbiAgICAgIHZhciBmYWtlRmFjZXRWYWx1ZUVsZW1lbnRMaXN0SXRlbSA9IENvdmVvLiQkKGZha2VGYWNldFZhbHVlRWxlbWVudCkuZmluZCgnbGknKTtcbiAgICAgIGlmIChmYWtlRmFjZXRWYWx1ZUVsZW1lbnRMaXN0SXRlbSkge1xuICAgICAgICBDb3Zlby4kJChmYWtlRmFjZXRWYWx1ZUVsZW1lbnRMaXN0SXRlbSkub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICB2YXIgc2hvdWxkQmVDaGVja2VkID0gc2VsZi5mYWNldFZhbHVlc0xpc3QuZmFjZXQuZ2V0U2VsZWN0ZWRWYWx1ZXMoKS5sZW5ndGggPT09IDAgJiYgc2VsZi5mYWNldFZhbHVlc0xpc3QuZmFjZXQuZ2V0RXhjbHVkZWRWYWx1ZXMoKS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgQ292ZW8uJCQoZmFrZUZhY2V0VmFsdWVFbGVtZW50TGlzdEl0ZW0pLnRvZ2dsZUNsYXNzKCdjb3Zlby1zZWxlY3RlZCcsIHNob3VsZEJlQ2hlY2tlZCk7XG4gICAgICAgICAgaWYgKCFzaG91bGRCZUNoZWNrZWQpIHtcbiAgICAgICAgICAgIHNlbGYucmVzZXQoKTtcbiAgICAgICAgICAgIHNlbGYudHJpZ2dlck5ld1F1ZXJ5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdG8gbm90IGluc2VydCB0aGUgKGZha2UpIEFsbCBDb250ZW50IGZhY2V0IHZhbHVlIGlzIGFscmVhZHkgaW50byB0aGUgdmFsdWUgQ29udGFpbmVyLlxuICAgICAgICB2YXIgZmlyc3RFbGVtZW50Q2hpbGQgPSA8SFRNTEVsZW1lbnQ+c2VsZi5mYWNldFZhbHVlc0xpc3QudmFsdWVDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmKGZpcnN0RWxlbWVudENoaWxkICYmIGZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQudmFsdWUgIT09ICdBbGwgQ29udGVudCcpe1xuICAgICAgICAgIHNlbGYuZmFjZXRWYWx1ZXNMaXN0LnZhbHVlQ29udGFpbmVyLmluc2VydEJlZm9yZShmYWtlRmFjZXRWYWx1ZUVsZW1lbnRMaXN0SXRlbSwgc2VsZi5mYWNldFZhbHVlc0xpc3QudmFsdWVDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jdXN0by9Pa3RhRmFjZXRNYW5hZ2VyLnRzIiwiaW1wb3J0IENvbXBvbmVudCA9IENvdmVvLkNvbXBvbmVudDtcbmltcG9ydCBJbml0aWFsaXphdGlvbiA9IENvdmVvLkluaXRpYWxpemF0aW9uO1xuaW1wb3J0IENvbXBvbmVudE9wdGlvbnMgPSBDb3Zlby5Db21wb25lbnRPcHRpb25zO1xuaW1wb3J0IElDb21wb25lbnRCaW5kaW5ncyA9IENvdmVvLklDb21wb25lbnRCaW5kaW5ncztcbmltcG9ydCBJUXVlcnlSZXN1bHQgPSBDb3Zlby5JUXVlcnlSZXN1bHQ7XG5pbXBvcnQgSVJlc3VsdHNDb21wb25lbnRCaW5kaW5ncyA9IENvdmVvLklSZXN1bHRzQ29tcG9uZW50QmluZGluZ3M7XG5pbXBvcnQgSVN0cmluZ01hcCA9IENvdmVvLklTdHJpbmdNYXA7XG5pbXBvcnQgSUZpZWxkVmFsdWVPcHRpb25zID0gQ292ZW8uSUZpZWxkVmFsdWVPcHRpb25zO1xuaW1wb3J0IHsgSVNhbGVzZm9yY2VDb21tdW5pdHlPcHRpb25zIH0gZnJvbSBcIi4uLy4uL2N1c3RvL09rdGFDdXN0b1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGlua09wdGlvbnMgZXh0ZW5kcyBDb3Zlby5JUmVzdWx0TGlua09wdGlvbnMge1xuICAgIGNvbW11bml0eU9wdGlvbnM/OklTYWxlc2ZvcmNlQ29tbXVuaXR5T3B0aW9ucztcblxufVxuXG5leHBvcnQgY2xhc3MgU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBJRCA9ICdTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluayc7XG4gICAgc3RhdGljIFJFUVVJUkVEX0ZJRUxEU19UT19JTkNMVURFOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ0BzZmNhc2VpZCcsXG4gICAgICAgICdAb2JqZWN0dHlwZScsXG4gICAgICAgICdAc2ZwYXJlbnRpZCcsXG4gICAgICAgICdAc2ZmZWVkaXRlbWlkJyxcbiAgICAgICAgJ0BzZmlkJyxcbiAgICAgICAgJ0BzZmNvbnRlbnRkb2N1bWVudGlkJyxcbiAgICAgICAgJ0BzZmlkZWFpZCcsXG4gICAgICAgICdAc2ZrYmlkJyxcbiAgICAgICAgJ0BzZnVybG5hbWUnLFxuICAgIF07XG5cbiAgICBzdGF0aWMgY29tbXVuaXR5T3B0aW9uczogSVNhbGVzZm9yY2VDb21tdW5pdHlPcHRpb25zID0ge1xuICAgICAgZW5hYmxlVXJsUmV3cml0ZXI6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRCb29sZWFuT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICAgICAgbmFtZTogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZFN0cmluZ09wdGlvbih7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICBob3N0TmFtZTogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZFN0cmluZ09wdGlvbih7IGRlZmF1bHRWYWx1ZTogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIH0pLFxuICAgICAgcHJvdG9jb2w6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRTdHJpbmdPcHRpb24oeyBkZWZhdWx0VmFsdWU6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25zIGZvciB0aGUgY29tcG9uZW50XG4gICAgICogQGNvbXBvbmVudE9wdGlvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgb3B0aW9uczogSVNhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rT3B0aW9ucyA9IHtcbiAgICAgICAgLy8gY29tbXVuaXR5T3B0aW9uczogU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsuY29tbXVuaXR5T3B0aW9uc1xuICAgICAgICBjb21tdW5pdHlPcHRpb25zOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkT2JqZWN0T3B0aW9uKDxDb3Zlby5JQ29tcG9uZW50T3B0aW9uc09iamVjdE9wdGlvbkFyZ3M+IHsgc3ViT3B0aW9uczogU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsuY29tbXVuaXR5T3B0aW9uc30pXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHB1YmxpYyBvcHRpb25zOiBJU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmtPcHRpb25zLFxuICAgICAgICBiaW5kaW5ncz86IElSZXN1bHRzQ29tcG9uZW50QmluZGluZ3MsXG4gICAgICAgIHB1YmxpYyByZXN1bHQ/OiBJUXVlcnlSZXN1bHRcbiAgICApIHtcblxuICAgICAgICBzdXBlcihlbGVtZW50LCBTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluay5JRCwgYmluZGluZ3MpO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnMuaW5pdENvbXBvbmVudE9wdGlvbnMoZWxlbWVudCwgU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmssIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb21tdW5pdHlPcHRpb25zLmVuYWJsZVVybFJld3JpdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29tbXVuaXR5VXJsUmV3cml0ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBDb3Zlby5SZXN1bHRMaW5rKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCBiaW5kaW5ncywgcmVzdWx0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5Q29tbXVuaXR5VXJsUmV3cml0ZXIoKSB7XG5cbiAgICAgICAgY29uc3QgY29tbXVuaXR5VXJsID0gU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsuZ2V0Q29tbXVuaXR5VXJsKHRoaXMucmVzdWx0LCB0aGlzLm9wdGlvbnMuY29tbXVuaXR5T3B0aW9ucyk7XG4gICAgICAgIGlmIChjb21tdW5pdHlVcmwpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmNsaWNrVXJpID0gdGhpcy5yZXN1bHRbJ0NsaWNrVXJpJ10gPSB0aGlzLnJlc3VsdC5yYXcuY2xpY2thYmxldXJpID0gdGhpcy5yZXN1bHQucmF3LnN5c2NsaWNrYWJsZXVyaSA9IGNvbW11bml0eVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29tbXVuaXR5TmFtZShvcHRpb25zOklTYWxlc2ZvcmNlQ29tbXVuaXR5T3B0aW9ucykge1xuICAgICAgICBsZXQgY29tbXVuaXR5TmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC8oLiopXFwvc1xcLyguKikvaSwgJyQxJyk7XG4gICAgICAgIGNvbW11bml0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgKGNvbW11bml0eU5hbWUgIT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID8gY29tbXVuaXR5TmFtZSA6ICcnKTtcblxuICAgICAgICByZXR1cm4gY29tbXVuaXR5TmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbW11bml0eVVybChyZXN1bHQ6IENvdmVvLklRdWVyeVJlc3VsdCwgb3B0aW9uczpJU2FsZXNmb3JjZUNvbW11bml0eU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY29tbXVuaXR5TmFtZSA9IFNhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rLmdldENvbW11bml0eU5hbWUob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbW11bml0eVBhdGggPSBjb21tdW5pdHlOYW1lID8gYC8ke2NvbW11bml0eU5hbWV9YCA6ICcnO1xuICAgICAgICBjb25zdCBjb21tdW5pdHlCYXNlVXJsID0gYCR7b3B0aW9ucy5wcm90b2NvbH0vLyR7b3B0aW9ucy5ob3N0TmFtZX0ke2NvbW11bml0eVBhdGh9YDtcbiAgICAgICAgbGV0IGNvbW11bml0eVVybCA9ICcnO1xuXG4gICAgICAgIGlmIChyZXN1bHQucmF3Lm9iamVjdHR5cGUgPT0gJ0Nhc2UnKSB7XG4gICAgICAgICAgICBjb21tdW5pdHlVcmwgPSBgJHtjb21tdW5pdHlCYXNlVXJsfS9zL2Nhc2UvJHtyZXN1bHQucmF3LnNmY2FzZWlkfWA7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnJhdy5vYmplY3R0eXBlID09ICdGZWVkSXRlbScgfHwgcmVzdWx0LnJhdy5vYmplY3R0eXBlID09ICdGZWVkQ29tbWVudCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudElkOnN0cmluZyA9IHJlc3VsdC5yYXcuc2ZwYXJlbnRpZCB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBwYXJlbnRJZC5zdWJzdHIoMCwzKSA9PSAnMDA1JyA/ICdxdWVzdGlvbicgOiAnZmVlZCc7XG4gICAgICAgICAgICBjb21tdW5pdHlVcmwgPSBgJHtjb21tdW5pdHlCYXNlVXJsfS9zLyR7cGF0aH0vJHtyZXN1bHQucmF3LnNmZmVlZGl0ZW1pZCB8fCByZXN1bHQucmF3LnNmaWR9YFxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnQ29sbGFib3JhdGlvbkdyb3VwJykge1xuICAgICAgICAgICAgY29tbXVuaXR5VXJsID0gYCR7Y29tbXVuaXR5QmFzZVVybH0vcy9ncm91cC8ke3Jlc3VsdC5yYXcuc2ZpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnQ29udGVudFZlcnNpb24nKSB7XG4gICAgICAgICAgICBjb21tdW5pdHlVcmwgPSBgJHtjb21tdW5pdHlCYXNlVXJsfS9zL2NvbnRlbnRkb2N1bWVudC8ke3Jlc3VsdC5yYXcuc2Zjb250ZW50ZG9jdW1lbnRpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnSWRlYScpIHtcbiAgICAgICAgICAgIGNvbW11bml0eVVybCA9IGAke2NvbW11bml0eUJhc2VVcmx9L3MvaWRlYS8ke3Jlc3VsdC5yYXcuc2ZpZGVhaWQgfHwgcmVzdWx0LnJhdy5zZmlkfWA7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnJhdy5zZmtiaWQpIHtcbiAgICAgICAgICAgIGNvbW11bml0eVVybCA9IGAke2NvbW11bml0eUJhc2VVcmx9L3MvYXJ0aWNsZS8ke3Jlc3VsdC5yYXcuc2Z1cmxuYW1lfWA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tbXVuaXR5VXJsO1xuICAgIH1cbn1cblxuSW5pdGlhbGl6YXRpb24ucmVnaXN0ZXJBdXRvQ3JlYXRlQ29tcG9uZW50KFNhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9TYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluay9TYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluay50cyIsImV4cG9ydCAqIGZyb20gJy4vT2t0YUNvcmUnO1xuLy8geW91ciBjdXN0byBjb21wb25lbnRcbmV4cG9ydCAqIGZyb20gJy4vY3VzdG8vT2t0YUN1c3RvJztcblxuLy8geW91ciB1aSBjb21wb25lbnRzIGhlcmVcbmV4cG9ydCB7IEN1c3RvbVNlbGVjdCB9IGZyb20gJy4vdWkvQ3VzdG9tU2VsZWN0L0N1c3RvbVNlbGVjdCc7XG5leHBvcnQgeyBTdGFja292ZXJmbG93U3RhdHMgfSBmcm9tICcuL3VpL1N0YWNrb3ZlcmZsb3dTdGF0cy9TdGFja292ZXJmbG93U3RhdHMnO1xuZXhwb3J0IHsgU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsgfSBmcm9tICcuL3VpL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rJztcblxuaW1wb3J0IHsgc3dhcFZhciB9IGZyb20gJy4vU3dhcFZhcic7XG5zd2FwVmFyKHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0luZGV4LnRzIiwiXG5pbXBvcnQgJy4vdXRpbHMvU3RyaW5nVXRpbHMnO1xuZXhwb3J0IHsgVXJsVXRpbHMgfSBmcm9tICcuL3V0aWxzL1VybFV0aWxzJztcbmV4cG9ydCB7IEh0dHBVdGlscyB9IGZyb20gJy4vdXRpbHMvSHR0cFV0aWxzJztcbmV4cG9ydCB7IExleFV0aWxzIH0gZnJvbSAnLi91dGlscy9MZXhVdGlscyc7XG5cbmV4cG9ydCB7IEN1c3RvbUV2ZW50cyB9IGZyb20gJy4vZXZlbnRzL0N1c3RvbUV2ZW50cyc7XG5leHBvcnQgeyBPa3RhSGVscGVyIH0gZnJvbSAnLi9jdXN0by9Pa3RhSGVscGVyJztcbmV4cG9ydCB7IE9rdGFGYWNldE1hbmFnZXIgfSBmcm9tICcuL2N1c3RvL09rdGFGYWNldE1hbmFnZXInO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL09rdGFDb3JlLnRzIiwiZGVjbGFyZSBpbnRlcmZhY2UgU3RyaW5nIHtcbiAgZ2V0SW5pdGlhbHMoZ2x1ZT86IGJvb2xlYW4pOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuICBjYXBpdGFsaXplKCk6IHN0cmluZztcbn1cblxuXG5TdHJpbmcucHJvdG90eXBlLmdldEluaXRpYWxzID0gZnVuY3Rpb24gKGdsdWU6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiB7XG5cbiAgdmFyIGluaXRpYWxzID0gdGhpcy5yZXBsYWNlKC9bXmEtekEtWi0gXS9nLCAnJykubWF0Y2goL1xcYlxcdy9nKSB8fCBbXTtcblxuICBpZiAoZ2x1ZSkge1xuICAgIHJldHVybiBpbml0aWFscy5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFscztcbn07XG5cblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uICgpOiBzdHJpbmcge1xuICByZXR1cm4gdGhpcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcYlxcdy9nLCBmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9TdHJpbmdVdGlscy50cyIsImV4cG9ydCBjbGFzcyBIdHRwVXRpbHMge1xuICAgIHN0YXRpYyBnZXQgPSAoYVVybCwgYUNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHZhciBhbkh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIGFuSHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4geyBcbiAgICAgICAgICAgIGlmIChhbkh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiBhbkh0dHBSZXF1ZXN0LnN0YXR1cyA9PSAyMDApXG4gICAgICAgICAgICAgICAgYUNhbGxiYWNrKGFuSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuSHR0cFJlcXVlc3Qub3BlbiggXCJHRVRcIiwgYVVybCwgdHJ1ZSApOyAgICAgICAgICAgIFxuICAgICAgICBhbkh0dHBSZXF1ZXN0LnNlbmQoIG51bGwgKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL0h0dHBVdGlscy50cyIsImV4cG9ydCBjbGFzcyBMZXhVdGlscyB7XG4gIHN0YXRpYyBnZXRDb3Zlb1NlYXJjaFVJID0gKGNtcCkgPT4ge1xuICAgIHJldHVybiBjbXAuZ2V0RWxlbWVudHMoKS5maW5kKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIENvdmVvLiQkKGVsKS5maW5kKCcjJyArIGNtcC5nZXQoJ3YubmFtZScpKSB8fCBDb3Zlby4kJChlbCkuZmluZCgnLkNvdmVvU2VhcmNoSW50ZXJmYWNlJyk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGdldFNlYXJjaEludGVyZmFjZUVsZW1lbnQgPSAoY21wKSA9PiB7XG4gICAgdmFyIGNvdmVvU2VhcmNoVUkgPSBMZXhVdGlscy5nZXRDb3Zlb1NlYXJjaFVJKGNtcCk7XG4gICAgcmV0dXJuIGNvdmVvU2VhcmNoVUkgPyBDb3Zlby4kJChjb3Zlb1NlYXJjaFVJKS5maW5kKCcjJyArIGNtcC5nZXQoJ3YubmFtZScpKSB8fCBDb3Zlby4kJChjb3Zlb1NlYXJjaFVJKS5maW5kKCcuQ292ZW9TZWFyY2hJbnRlcmZhY2UnKSA6IG51bGw7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9MZXhVdGlscy50cyIsImltcG9ydCBJU3RyaW5nTWFwID0gQ292ZW8uSVN0cmluZ01hcDtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50cyB7XG4gIHB1YmxpYyBzdGF0aWMgeW91ckN1c3RvbUV2ZW50ID0gJ3lvdXJDdXN0b21FdmVudCc7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXZlbnRzL0N1c3RvbUV2ZW50cy50cyIsImltcG9ydCAkJCA9IENvdmVvLiQkO1xuaW1wb3J0IENvbXBvbmVudCA9IENvdmVvLkNvbXBvbmVudDtcbmltcG9ydCBJbml0aWFsaXphdGlvbiA9IENvdmVvLkluaXRpYWxpemF0aW9uO1xuaW1wb3J0IENvbXBvbmVudE9wdGlvbnMgPSBDb3Zlby5Db21wb25lbnRPcHRpb25zO1xuaW1wb3J0IElDb21wb25lbnRCaW5kaW5ncyA9IENvdmVvLklDb21wb25lbnRCaW5kaW5ncztcbmltcG9ydCBJQnVpbGRpbmdRdWVyeUV2ZW50QXJncyA9IENvdmVvLklCdWlsZGluZ1F1ZXJ5RXZlbnRBcmdzO1xuaW1wb3J0IElEb25lQnVpbGRpbmdRdWVyeUV2ZW50QXJncyA9IENvdmVvLklEb25lQnVpbGRpbmdRdWVyeUV2ZW50QXJncztcbmltcG9ydCBJUHJlcHJvY2Vzc1Jlc3VsdHNFdmVudEFyZ3MgPSBDb3Zlby5JUHJlcHJvY2Vzc1Jlc3VsdHNFdmVudEFyZ3M7XG5pbXBvcnQgSU5ld1F1ZXJ5RXZlbnRBcmdzID0gQ292ZW8uSU5ld1F1ZXJ5RXZlbnRBcmdzO1xuaW1wb3J0IHsgVXJsVXRpbHMgfSBmcm9tICcuLi91dGlscy9VcmxVdGlscyc7XG5pbXBvcnQgSVN0cmluZ01hcCA9IENvdmVvLklTdHJpbmdNYXA7XG5pbXBvcnQgeyBPa3RhSGVscGVyIH0gZnJvbSAnLi9Pa3RhSGVscGVyJztcbmltcG9ydCB7IE9rdGFGYWNldE1hbmFnZXIgfSBmcm9tICcuL09rdGFGYWNldE1hbmFnZXInO1xuaW1wb3J0IHsgU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsgfSBmcm9tICcuLi91aS9TYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluay9TYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluayc7XG5cbmRlY2xhcmUgdmFyIFN0cmluZzogeyB0b0xvY2FsZVN0cmluZzogKHBhcmFtOiBhbnkpID0+IHZvaWQ7IH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNhbGVzZm9yY2VDb21tdW5pdHlPcHRpb25zIHtcbiAgZW5hYmxlVXJsUmV3cml0ZXI/OiBib29sZWFuO1xuICBuYW1lPzogc3RyaW5nO1xuICBob3N0TmFtZT86IHN0cmluZztcbiAgcHJvdG9jb2w/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9rdGFPcHRpb25zIHtcbiAgdHlwZU9mQ29udGVudElkPzogc3RyaW5nO1xuICB0eXBlT2ZDb250ZW50RGVmYXVsdFZhbHVlcz86IHN0cmluZ1tdO1xuICBlbmFibGVDdXN0b21GYWNldD86IGJvb2xlYW47XG4gIGNvbW11bml0eU9wdGlvbnM/OklTYWxlc2ZvcmNlQ29tbXVuaXR5T3B0aW9ucztcbn1cblxuLyoqXG4gKiBSZXF1aXJlZCBjdXN0b21pemF0aW9uIHNwZWNpZmljYWxseSBhcHBsaWVkIGZvciB5b3VyIGltcGxlbWVudGF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBPa3RhQ3VzdG8gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHN0YXRpYyBJRCA9ICdPa3RhQ3VzdG8nO1xuICBzdGF0aWMgY29tbXVuaXR5T3B0aW9uczogSVNhbGVzZm9yY2VDb21tdW5pdHlPcHRpb25zID0ge1xuICAgIGVuYWJsZVVybFJld3JpdGVyOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkQm9vbGVhbk9wdGlvbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgICBuYW1lOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkU3RyaW5nT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICBob3N0TmFtZTogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZFN0cmluZ09wdGlvbih7IGRlZmF1bHRWYWx1ZTogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIH0pLFxuICAgIHByb3RvY29sOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkU3RyaW5nT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgfSlcbiAgfVxuXG4gIHN0YXRpYyBvcHRpb25zOiBJT2t0YU9wdGlvbnMgPSB7XG4gICAgdHlwZU9mQ29udGVudElkOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkU3RyaW5nT3B0aW9uKCksXG4gICAgdHlwZU9mQ29udGVudERlZmF1bHRWYWx1ZXM6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRMaXN0T3B0aW9uPHN0cmluZz4oKSxcbiAgICBlbmFibGVDdXN0b21GYWNldDogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZEJvb2xlYW5PcHRpb24oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgY29tbXVuaXR5T3B0aW9uczogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZE9iamVjdE9wdGlvbig8Q292ZW8uSUNvbXBvbmVudE9wdGlvbnNPYmplY3RPcHRpb25BcmdzPiB7IHN1Yk9wdGlvbnM6IE9rdGFDdXN0by5jb21tdW5pdHlPcHRpb25zfSlcbiAgfTtcblxuICBcblxuICBwcml2YXRlIGRlZmF1bHRUeXBlT2ZDb250ZW50OiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGZhY2V0VHlwZU9mQ29udGVudDogQ292ZW8uRmFjZXQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgb3B0aW9uczogSU9rdGFPcHRpb25zLCBwdWJsaWMgYmluZGluZ3M/OiBJQ29tcG9uZW50QmluZGluZ3MpIHtcblxuICAgIHN1cGVyKGVsZW1lbnQsIE9rdGFDdXN0by5JRCwgYmluZGluZ3MpO1xuICAgIHRoaXMub3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnMuaW5pdENvbXBvbmVudE9wdGlvbnMoZWxlbWVudCwgT2t0YUN1c3RvLCBvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlQ3VzdG9tRmFjZXQpIHtcbiAgICAgIE9rdGFGYWNldE1hbmFnZXIuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemF0aW9uIEV2ZW50c1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLkluaXRpYWxpemF0aW9uRXZlbnRzLmJlZm9yZUluaXRpYWxpemF0aW9uLCB0aGlzLmhhbmRsZUJlZm9yZUluaXQpO1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLkluaXRpYWxpemF0aW9uRXZlbnRzLmFmdGVyQ29tcG9uZW50c0luaXRpYWxpemF0aW9uLCB0aGlzLmhhbmRsZUFmdGVyQ29tcG9uZW50c0luaXQpO1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLkluaXRpYWxpemF0aW9uRXZlbnRzLmFmdGVySW5pdGlhbGl6YXRpb24sIHRoaXMuaGFuZGxlQWZ0ZXJJbml0KTtcblxuICAgIC8vIFF1ZXJ5IEV2ZW50c1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLlF1ZXJ5RXZlbnRzLm5ld1F1ZXJ5LCB0aGlzLmhhbmRsZU5ld1F1ZXJ5KTtcbiAgICB0aGlzLmJpbmQub25Sb290RWxlbWVudChDb3Zlby5RdWVyeUV2ZW50cy5idWlsZGluZ1F1ZXJ5LCB0aGlzLmhhbmRsZUJ1aWxkaW5nUXVlcnkpO1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLlF1ZXJ5RXZlbnRzLmRvbmVCdWlsZGluZ1F1ZXJ5LCB0aGlzLmhhbmRsZURvbmVCdWlsZGluZ1F1ZXJ5KTtcbiAgICB0aGlzLmJpbmQub25Sb290RWxlbWVudChDb3Zlby5RdWVyeUV2ZW50cy5wcmVwcm9jZXNzUmVzdWx0cywgdGhpcy5oYW5kbGVQcmVwcm9jZXNzUmVzdWx0cyk7XG4gICAgdGhpcy5iaW5kLm9uUm9vdEVsZW1lbnQoQ292ZW8uUXVlcnlFdmVudHMucHJlcHJvY2Vzc01vcmVSZXN1bHRzLCB0aGlzLmhhbmRsZVByZXByb2Nlc3NSZXN1bHRzKTtcbiAgICB0aGlzLmJpbmQub25Sb290RWxlbWVudChDb3Zlby5RdWVyeUV2ZW50cy5xdWVyeVN1Y2Nlc3MsIHRoaXMuaGFuZGxlUXVlcnlTdWNjZXNzKTtcblxuICAgIGNvbnN0IHBhcmFtczogYW55ID0gVXJsVXRpbHMuZ2V0VXJsUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHNlYXJjaGJveE9wdGlvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdTZWFyY2hib3hPcHRpb24nKTtcbiAgICBjb25zdCBmYWNldENvbXBvbmVudHMgPSB0aGlzLnNlYXJjaEludGVyZmFjZS5nZXRDb21wb25lbnRzKCdGYWNldCcpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50eXBlT2ZDb250ZW50RGVmYXVsdFZhbHVlcyAmJiB0aGlzLm9wdGlvbnMudHlwZU9mQ29udGVudERlZmF1bHRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50ID0gdGhpcy5vcHRpb25zLnR5cGVPZkNvbnRlbnREZWZhdWx0VmFsdWVzO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLnNiT3B0aW9uKSB7XG4gICAgICB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50LnB1c2gocGFyYW1zLnNiT3B0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaGJveE9wdGlvbikge1xuICAgICAgdGhpcy5kZWZhdWx0VHlwZU9mQ29udGVudC5wdXNoKHNlYXJjaGJveE9wdGlvbilcbiAgICB9XG5cbiAgICAvLyBubyBuZWVkIHRvIGRlZmF1bHQgdG8gYWxsXG4gICAgdGhpcy5kZWZhdWx0VHlwZU9mQ29udGVudCA9IF8ud2l0aG91dCh0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50LCAnYWxsJywgJ0FsbCBDb250ZW50JywgJ2FsbCBjb250ZW50JywgJycpO1xuXG4gICAgaWYgKGZhY2V0Q29tcG9uZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmFjZXRUeXBlT2ZDb250ZW50ID0gXy5maW5kKGZhY2V0Q29tcG9uZW50cywgKGY6IENvdmVvLkZhY2V0KSA9PiBmLm9wdGlvbnMuaWQgPT09IHRoaXMub3B0aW9ucy50eXBlT2ZDb250ZW50SWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCZWZvcmUgSW5pdGlhbGl6YXRpb25cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQmVmb3JlSW5pdCgpIHsgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBDb21wb25lbnQgSW5pdGlhbGl6YXRpb25cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQWZ0ZXJDb21wb25lbnRzSW5pdCgpIHtcbiAgICAvLyBDb3Zlby5UZW1wbGF0ZUhlbHBlcnMucmVnaXN0ZXJGaWVsZEhlbHBlcignY3VzdG9tTG9hZFRlbXBsYXRlJywgKHZhbHVlLCBvcHRpb25zKSA9PiB7XG4gICAgLy8gICB2YXIgZWxlbWVudCA9IENvdmVvLiQkKCdkaXYnKS5lbDtcbiAgICAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gQ292ZW8uVGVtcGxhdGVIZWxwZXJzLmdldEhlbHBlcignbG9hZFRlbXBsYXRlJykuY2FsbCh0aGlzLCBvcHRpb25zLnRlbXBsYXRlSWQpO1xuICAgIC8vICAgQ292ZW8uSW5pdGlhbGl6YXRpb24uYXV0b21hdGljYWxseUNyZWF0ZUNvbXBvbmVudHNJbnNpZGUoZWxlbWVudCwge1xuICAgIC8vICAgICBvcHRpb25zOiB7fSxcbiAgICAvLyAgICAgYmluZGluZ3M6IHRoaXMuYmluZGluZ3MsXG4gICAgLy8gICAgIHJlc3VsdDogT2t0YUhlbHBlci5yZXNvbHZlUXVlcnlSZXN1bHQoKVxuICAgIC8vICAgfSk7XG4gICAgLy8gICByZXR1cm4gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgLy8gfSk7XG4gICAgQ292ZW8uVGVtcGxhdGVIZWxwZXJzLnJlZ2lzdGVyRmllbGRIZWxwZXIoJ2JhZGdlJywgT2t0YUhlbHBlci5iYWRnZSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgQ29tcG9uZW50IEluaXRpYWxpemF0aW9uXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUFmdGVySW5pdCgpIHtcbiAgICBpZiAodGhpcy5mYWNldFR5cGVPZkNvbnRlbnQgJiYgdGhpcy5kZWZhdWx0VHlwZU9mQ29udGVudCAmJiB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50Lmxlbmd0aCkge1xuICAgICAgdGhpcy5mYWNldFR5cGVPZkNvbnRlbnQuc2VsZWN0TXVsdGlwbGVWYWx1ZXModGhpcy5kZWZhdWx0VHlwZU9mQ29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5ldyBRdWVyeVxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVOZXdRdWVyeShhcmdzOiBJTmV3UXVlcnlFdmVudEFyZ3MpIHtcbiAgICBpZiAoIXRoaXMucXVlcnlDb250cm9sbGVyLmZpcnN0UXVlcnkpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdTZWFyY2hib3hPcHRpb24nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnVpbGRpbmcgUXVlcnlcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQnVpbGRpbmdRdWVyeShhcmdzOiBJQnVpbGRpbmdRdWVyeUV2ZW50QXJncykgeyBcbiAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBEb25lIEJ1aWxkaW5nIFF1ZXJ5XG4gICAqL1xuICBwcml2YXRlIGhhbmRsZURvbmVCdWlsZGluZ1F1ZXJ5KGFyZ3M6IElEb25lQnVpbGRpbmdRdWVyeUV2ZW50QXJncykge1xuICAgIGxldCBtZXJnZWRGaWVsZHNUb0luY2x1ZGUgPSBhcmdzLnF1ZXJ5QnVpbGRlci5maWVsZHNUb0luY2x1ZGUgfHwgW107XG4gICAgYXJncy5xdWVyeUJ1aWxkZXIuZmllbGRzVG9JbmNsdWRlID0gbWVyZ2VkRmllbGRzVG9JbmNsdWRlLmNvbmNhdChTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluay5SRVFVSVJFRF9GSUVMRFNfVE9fSU5DTFVERSk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcHJvY2VzcyBSZXN1bHRzXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVByZXByb2Nlc3NSZXN1bHRzKGFyZ3M6IElQcmVwcm9jZXNzUmVzdWx0c0V2ZW50QXJncykge1xuICAgIF8uZWFjaChhcmdzLnJlc3VsdHMucmVzdWx0cywgKHJlc3VsdCkgPT4ge1xuXG4gICAgICAgIHJlc3VsdC5yYXcuc2Zjb21tZW50Y291bnQgPSByZXN1bHQucmF3LnNmY29tbWVudGNvdW50ID09IDAgPyAnMCcgOiByZXN1bHQucmF3LnNmY29tbWVudGNvdW50O1xuICAgICAgICByZXN1bHQucmF3LmNvbW11bml0eUNsaWNrVXJpID0gU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsuZ2V0Q29tbXVuaXR5VXJsKHJlc3VsdCwgdGhpcy5vcHRpb25zLmNvbW11bml0eU9wdGlvbnMpIHx8IHJlc3VsdC5jbGlja1VyaTtcbiAgICAgICAgXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBRdWVyeSBTdWNjZXNzXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVF1ZXJ5U3VjY2VzcyhhcmdzOiBDb3Zlby5JUXVlcnlTdWNjZXNzRXZlbnRBcmdzKSB7IH1cblxufTtcblxuSW5pdGlhbGl6YXRpb24ucmVnaXN0ZXJBdXRvQ3JlYXRlQ29tcG9uZW50KE9rdGFDdXN0byk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jdXN0by9Pa3RhQ3VzdG8udHMiLCJpbXBvcnQgQ29tcG9uZW50ID0gQ292ZW8uQ29tcG9uZW50O1xuaW1wb3J0IEluaXRpYWxpemF0aW9uID0gQ292ZW8uSW5pdGlhbGl6YXRpb247XG5pbXBvcnQgQ29tcG9uZW50T3B0aW9ucyA9IENvdmVvLkNvbXBvbmVudE9wdGlvbnM7XG5pbXBvcnQgSUNvbXBvbmVudEJpbmRpbmdzID0gQ292ZW8uSUNvbXBvbmVudEJpbmRpbmdzO1xuaW1wb3J0IElTdHJpbmdNYXAgPSBDb3Zlby5JU3RyaW5nTWFwO1xuXG5pbnRlcmZhY2UgSUN1c3RvbU9wdGlvbiB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgdmFsdWU6IHN0cmluZ1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ3VzdG9tU2VsZWN0T3B0aW9ucyB7XG4gIG9wdGlvbnM/OiBhbnksXG4gIGRlZmF1bHRPcHRpb24/OiBzdHJpbmcsXG4gIGZpZWxkPzogQ292ZW8uSUZpZWxkT3B0aW9uLFxuICBsb2NhbFN0b3JhZ2VLZXk/OiBzdHJpbmdcbiAgLy8gZW5kcG9pbnQ6IENvdmVvLlNlYXJjaEVuZHBvaW50XG59XG5cblxuLyoqXG4gKiBDb21wb25lbnQgdXNlZCB0byByZW5kZXIgY3VzdG9tIHNlbGVjdCBib3ggd2hpY2ggYWZ0ZXIgYSBjbGljayBkaXNwbGF5cyBhIFxuICogY29sbGFwc2FibGUgbGlzdCBvZiBtdWx0aXBsZSB2YWx1ZXMgd2hpY2ggY2FuIGJlIHVzZWQgaW4gZm9ybXMsIG1lbnVzIG9yIHN1cnZleXMuXG4gKiBUaGlzIGNvbXBvbmVudCBvdmVyd3JpdGVzIGEgc3RhbmRhcmQgc2VsZWN0IHRvIHJlcGxhY2UgaXQgd2l0aCBvdXIgY3VzdG9tIHNlbGVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbVNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBJRCA9ICdDdXN0b21TZWxlY3QnO1xuXG4gIHByaXZhdGUgc2VsZWN0T3B0aW9uczogQXJyYXk8SUN1c3RvbU9wdGlvbj47XG4gIHByaXZhdGUgc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgcHJpdmF0ZSBzZWxlY3RTdHlsZWQ6IENvdmVvLkRvbTtcbiAgcHJpdmF0ZSBsaXN0T3B0aW9uczogQ292ZW8uRG9tO1xuXG4gIC8qKlxuICAgKiBUaGUgb3B0aW9ucyBmb3IgdGhlIGNvbXBvbmVudFxuICAgKiBAY29tcG9uZW50T3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIG9wdGlvbnM6IElDdXN0b21TZWxlY3RPcHRpb25zID0ge1xuICAgIG9wdGlvbnM6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRKc29uT3B0aW9uKCksXG4gICAgZmllbGQ6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRGaWVsZE9wdGlvbigpLFxuICAgIGRlZmF1bHRPcHRpb246IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRTdHJpbmdPcHRpb24oKSxcbiAgICBsb2NhbFN0b3JhZ2VLZXk6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRTdHJpbmdPcHRpb24oeyBkZWZhdWx0VmFsdWU6ICdTZWFyY2hib3hPcHRpb24nIH0pLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCwgcHVibGljIG9wdGlvbnM6IElDdXN0b21TZWxlY3RPcHRpb25zLCBwdWJsaWMgYmluZGluZ3M/OiBJQ29tcG9uZW50QmluZGluZ3MpIHtcbiAgICBzdXBlcihlbGVtZW50LCBDdXN0b21TZWxlY3QuSUQsIGJpbmRpbmdzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBDb21wb25lbnRPcHRpb25zLmluaXRDb21wb25lbnRPcHRpb25zKGVsZW1lbnQsIEN1c3RvbVNlbGVjdCwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnNlbGVjdCA9IHRoaXMuZ2V0U2VsZWN0RWxlbWVudCgpO1xuICAgIENvdmVvLiQkKHRoaXMuc2VsZWN0KS5hZGRDbGFzcygnY292ZW8tY3VzdG9tLXNlbGVjdC1oaWRkZW4nKTtcblxuICAgIGxldCBwcm9taXNlT3B0aW9ucyA9IG5ldyBQcm9taXNlPElDdXN0b21PcHRpb25bXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5maWVsZCkge1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMucXVlcnlDb250cm9sbGVyID8gdGhpcy5xdWVyeUNvbnRyb2xsZXIuZ2V0RW5kcG9pbnQoKSA6IENvdmVvLlNlYXJjaEVuZHBvaW50LmVuZHBvaW50c1snZGVmYXVsdCddO1xuICAgICAgICBpZiAoZW5kcG9pbnQpIHtcbiAgICAgICAgICBlbmRwb2ludC5saXN0RmllbGRWYWx1ZXMoeyBmaWVsZDogdGhpcy5vcHRpb25zLmZpZWxkLnRvU3RyaW5nKCksIG1heGltdW1OdW1iZXJPZlZhbHVlczogMTAwIH0pLmRvbmUoKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShfLm1hcCh2YWx1ZXMsICh2KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGxhYmVsOiB2LnZhbHVlLCB2YWx1ZTogdi52YWx1ZSB9O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KHsgJ2Vycm9yJzogJ25vIGVuZHBvaW50IScgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodGhpcy5vcHRpb25zLm9wdGlvbnMpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1aWxkU2VsZWN0U3R5bGVkKCk7XG5cbiAgICBwcm9taXNlT3B0aW9ucy50aGVuKHZhbHVlcyA9PiB7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbnMgPSB2YWx1ZXM7XG4gICAgICB0aGlzLnJlbmRlclNlbGVjdFN0eWxlZCgpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5vcHRpb25zLmxvY2FsU3RvcmFnZUtleSwgdGhpcy5nZXRTZWxlY3RlZE9wdGlvbigpKTtcbiAgICB9KTtcblxuXG4gIH1cblxuICBwcml2YXRlIGdldFNlbGVjdEVsZW1lbnQoKSB7XG4gICAgbGV0IHNlbGVjdEVsID0gPEhUTUxTZWxlY3RFbGVtZW50Pih0aGlzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCA/IHRoaXMuZWxlbWVudCA6IENvdmVvLiQkKHRoaXMuZWxlbWVudCkuZmluZCgnc2VsZWN0JykpO1xuICAgIGlmICghc2VsZWN0RWwpIHtcbiAgICAgIHNlbGVjdEVsID0gPEhUTUxTZWxlY3RFbGVtZW50PkNvdmVvLiQkKCdzZWxlY3QnKS5lbDtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChzZWxlY3RFbCk7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RFbDtcbiAgfVxuICBwcml2YXRlIGJ1aWxkU2VsZWN0U3R5bGVkKCkge1xuICAgIC8vIGNyZWF0ZSB3cmFwcGVyIGNvbnRhaW5lclxuICAgIGNvbnN0IHdyYXBwZXIgPSBDb3Zlby4kJCgnZGl2JywgeyBjbGFzc05hbWU6ICdjb3Zlby1jdXN0b20tc2VsZWN0JyB9KTtcbiAgICAvLyBpbnNlcnQgd3JhcHBlciBiZWZvcmUgc2VsZWN0IGVsZW1lbnQgaW4gdGhlIERPTSB0cmVlXG4gICAgdGhpcy5zZWxlY3QucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlci5lbCwgdGhpcy5zZWxlY3QpO1xuICAgIC8vIG1vdmUgc2VsZWN0IGludG8gd3JhcHBlclxuICAgIHdyYXBwZXIuYXBwZW5kKHRoaXMuc2VsZWN0KTtcblxuICAgIHRoaXMuc2VsZWN0U3R5bGVkID0gQ292ZW8uJCQoJ2RpdicsIHsgY2xhc3NOYW1lOiAnY292ZW8tY3VzdG9tLXNlbGVjdC1zdHlsZWQnIH0pO1xuICAgIHRoaXMubGlzdE9wdGlvbnMgPSBDb3Zlby4kJCgndWwnLCB7IGNsYXNzTmFtZTogJ2NvdmVvLWN1c3RvbS1zZWxlY3Qtb3B0aW9ucycgfSk7XG5cbiAgICB3cmFwcGVyLmFwcGVuZCh0aGlzLnNlbGVjdFN0eWxlZC5lbCk7XG4gICAgd3JhcHBlci5hcHBlbmQodGhpcy5saXN0T3B0aW9ucy5lbCk7XG5cbiAgICB0aGlzLnJlbmRlclNlbGVjdFN0eWxlZCgpO1xuXG4gICAgdGhpcy5zZWxlY3RTdHlsZWQub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNlbGVjdFN0eWxlZC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgIHRoaXMubGlzdE9wdGlvbnMudG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0U3R5bGVkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHRoaXMubGlzdE9wdGlvbnMuaGlkZSgpO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgcmVuZGVyU2VsZWN0U3R5bGVkKCkge1xuXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5saXN0T3B0aW9ucy5lbXB0eSgpO1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdC5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5idWlsZFNlbGVjdE9wdGlvbnMoKTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuc2VsZWN0Lm9wdGlvbnMubGVuZ3RoID8gdGhpcy5zZWxlY3Qub3B0aW9uc1t0aGlzLnNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0IDogJyc7XG4gICAgdGhpcy5zZWxlY3RTdHlsZWQudGV4dChjdXJyZW50KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBDb3Zlby4kJCgnbGknLCB7XG4gICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdC5vcHRpb25zLml0ZW0oaSkudmFsdWVcbiAgICAgIH0sIHRoaXMuc2VsZWN0Lm9wdGlvbnMuaXRlbShpKS50ZXh0KTtcbiAgICAgIHRoaXMubGlzdE9wdGlvbnMuYXBwZW5kKGxpc3RJdGVtLmVsKTtcblxuICAgICAgbGlzdEl0ZW0ub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2VsZi5zZWxlY3QudmFsdWUgPSBsaXN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNlbGYub3B0aW9ucy5sb2NhbFN0b3JhZ2VLZXksIHNlbGYuZ2V0U2VsZWN0ZWRPcHRpb24oKSk7XG4gICAgICAgIHNlbGYuc2VsZWN0U3R5bGVkLnRleHQobGlzdEl0ZW0udGV4dCgpKVxuICAgICAgICBzZWxmLnNlbGVjdFN0eWxlZC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNlbGYubGlzdE9wdGlvbnMuaGlkZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcHRpb25zKCkge1xuICAgIENvdmVvLiQkKHRoaXMuc2VsZWN0KS5lbXB0eSgpO1xuICAgIGlmICh0aGlzLnNlbGVjdE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VsZWN0T3B0aW9ucy51bnNoaWZ0KHsgbGFiZWw6ICdBbGwgQ29udGVudCcsIHZhbHVlOiAnYWxsJyB9KTtcbiAgICAgIHRoaXMuc2VsZWN0T3B0aW9ucyA9IF8udW5pcSh0aGlzLnNlbGVjdE9wdGlvbnMsICh2KSA9PiB7IHJldHVybiB2LmxhYmVsOyB9KTtcblxuICAgICAgXy5lYWNoKHRoaXMuc2VsZWN0T3B0aW9ucywgKG8pID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uRWwgPSA8SFRNTE9wdGlvbkVsZW1lbnQ+Q292ZW8uJCQoJ29wdGlvbicsIHtcbiAgICAgICAgICB2YWx1ZTogby52YWx1ZSxcbiAgICAgICAgfSwgby5sYWJlbCkuZWw7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVmYXVsdE9wdGlvbiA9PT0gby52YWx1ZSkge1xuICAgICAgICAgIHNlbGVjdE9wdGlvbkVsLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBDb3Zlby4kJCh0aGlzLnNlbGVjdCkuYXBwZW5kKHNlbGVjdE9wdGlvbkVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0Lm9wdGlvbnNbdGhpcy5zZWxlY3Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gIH1cbiAgcHVibGljIHNldFNlbGVjdGVkT3B0aW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBsZXQgbmV4dFNlbGVjdGVkSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLnNlbGVjdC5vcHRpb25zLCAobyk9PntcbiAgICAgIHJldHVybiBvLnZhbHVlID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgICBpZihuZXh0U2VsZWN0ZWRJbmRleCA+PSAwKXtcbiAgICAgIHRoaXMuc2VsZWN0LnZhbHVlID0gdGhpcy5zZWxlY3Qub3B0aW9uc1tuZXh0U2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm9wdGlvbnMubG9jYWxTdG9yYWdlS2V5LCB0aGlzLmdldFNlbGVjdGVkT3B0aW9uKCkpO1xuICAgICAgdGhpcy5zZWxlY3RTdHlsZWQudGV4dCh0aGlzLnNlbGVjdC5vcHRpb25zW25leHRTZWxlY3RlZEluZGV4XS50ZXh0KVxuICAgICAgdGhpcy5zZWxlY3RTdHlsZWQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfVxufVxuXG5Jbml0aWFsaXphdGlvbi5yZWdpc3RlckF1dG9DcmVhdGVDb21wb25lbnQoQ3VzdG9tU2VsZWN0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9DdXN0b21TZWxlY3QvQ3VzdG9tU2VsZWN0LnRzIiwiaW1wb3J0IENvbXBvbmVudCA9IENvdmVvLkNvbXBvbmVudDtcbmltcG9ydCBJbml0aWFsaXphdGlvbiA9IENvdmVvLkluaXRpYWxpemF0aW9uO1xuaW1wb3J0IENvbXBvbmVudE9wdGlvbnMgPSBDb3Zlby5Db21wb25lbnRPcHRpb25zO1xuaW1wb3J0IElDb21wb25lbnRCaW5kaW5ncyA9IENvdmVvLklDb21wb25lbnRCaW5kaW5ncztcbmltcG9ydCBJUXVlcnlSZXN1bHQgPSBDb3Zlby5JUXVlcnlSZXN1bHQ7XG5pbXBvcnQgSVN0cmluZ01hcCA9IENvdmVvLklTdHJpbmdNYXA7XG5pbXBvcnQgSUZpZWxkVmFsdWVPcHRpb25zID0gQ292ZW8uSUZpZWxkVmFsdWVPcHRpb25zO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YWNrb3ZlcmZsb3dTdGF0c09wdGlvbnMge1xuICBlbmFibGVWb3RlPzogYm9vbGVhbjtcbiAgZW5hYmxlU3RhdHVzPzogYm9vbGVhbjtcbiAgZW5hYmxlVmlld3M/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU3RhY2tvdmVyZmxvd1N0YXRzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIElEID0gJ1N0YWNrb3ZlcmZsb3dTdGF0cyc7XG5cbiAgLyoqXG4gICAqIFRoZSBvcHRpb25zIGZvciB0aGUgY29tcG9uZW50XG4gICAqIEBjb21wb25lbnRPcHRpb25zXG4gICAqL1xuICBzdGF0aWMgb3B0aW9uczogSVN0YWNrb3ZlcmZsb3dTdGF0c09wdGlvbnMgPSB7XG4gICAgZW5hYmxlVm90ZTogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZEJvb2xlYW5PcHRpb24oe2RlZmF1bHRWYWx1ZTogdHJ1ZX0pLFxuICAgIGVuYWJsZVN0YXR1czogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZEJvb2xlYW5PcHRpb24oe2RlZmF1bHRWYWx1ZTogdHJ1ZX0pLFxuICAgIGVuYWJsZVZpZXdzOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkQm9vbGVhbk9wdGlvbih7ZGVmYXVsdFZhbHVlOiB0cnVlfSlcbiAgfTtcblxuICBwcml2YXRlIGNvdmVvRmllbGRUYWJsZTogQ292ZW8uRmllbGRUYWJsZTtcbiAgcHJpdmF0ZSBjb3Zlb0ZpZWxkVGFibGVPcHRpb25zOiBDb3Zlby5JRmllbGRUYWJsZU9wdGlvbnM7XG4gIHByaXZhdGUgc3RhdHNDb250YWluZXI6IENvdmVvLkRvbTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgcHVibGljIG9wdGlvbnM6IElTdGFja292ZXJmbG93U3RhdHNPcHRpb25zLFxuICAgIGJpbmRpbmdzPzogSUNvbXBvbmVudEJpbmRpbmdzLFxuICAgIHB1YmxpYyByZXN1bHQ/OiBJUXVlcnlSZXN1bHRcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgU3RhY2tvdmVyZmxvd1N0YXRzLklELCBiaW5kaW5ncyk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBDb21wb25lbnRPcHRpb25zLmluaXRDb21wb25lbnRPcHRpb25zKGVsZW1lbnQsIFN0YWNrb3ZlcmZsb3dTdGF0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG5cbiAgICB0aGlzLnN0YXRzQ29udGFpbmVyID0gQ292ZW8uJCQoJ2RpdicsIHsgY2xhc3NOYW1lOiAnc3RhdHMnIH0pO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzQ29udGFpbmVyLmVsKTtcblxuICAgIHRoaXMuYnVpbGRTdGF0cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFN0YXRzKCl7XG4gICAgaWYodGhpcy5vcHRpb25zLmVuYWJsZVZvdGUpe1xuICAgICAgdGhpcy5idWlsZFNpbmdsZVN0YXQoJ3ZvdGVzJywgJ3N0YWNrb3ZlcmZsb3dfc2NvcmUnKTtcbiAgICB9XG4gICAgaWYodGhpcy5vcHRpb25zLmVuYWJsZVN0YXR1cykge1xuICAgICAgY29uc3QgaXNBbnN3ZXJlZDpib29sZWFuID0gKHRoaXMucmVzdWx0LnJhdy5zdGFja292ZXJmbG93X2lzX2Fuc3dlcmVkICYmIHRoaXMucmVzdWx0LnJhdy5zdGFja292ZXJmbG93X2lzX2Fuc3dlcmVkID09PSBcIlRydWVcIik7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlU3RhdCgnc3RhdHVzJywgJ3N0YWNrb3ZlcmZsb3dfYW5zd2VyX2NvdW50JywgaXNBbnN3ZXJlZCk7XG4gICAgfVxuICAgIGlmKHRoaXMub3B0aW9ucy5lbmFibGVWaWV3cyl7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlU3RhdCgndmlld3MnLCAnc3RhY2tvdmVyZmxvd192aWV3X2NvdW50Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFNpbmdsZVN0YXQoc3RhdE5hbWUsIGZpZWxkLCBpc0Fuc3dlckFjY2VwdGVkOmJvb2xlYW49ZmFsc2Upe1xuICAgIGxldCBzdGF0Q29udGFpbmVyID0gQ292ZW8uJCQoJ2RpdicgLCB7Y2xhc3NOYW1lOnN0YXROYW1lfSk7XG4gICAgaWYoc3RhdE5hbWU9PT0nc3RhdHVzJyl7XG4gICAgICBjb25zdCBjb3VudCA9IE51bWJlcih0aGlzLnJlc3VsdC5yYXdbZmllbGRdIHx8ICcnKTtcbiAgICAgIHN0YXRDb250YWluZXIuYWRkQ2xhc3MoY291bnQgPiAwID8gJ2Fuc3dlcmVkJzondW5hbnN3ZXJlZCcpO1xuICAgICAgc3RhdENvbnRhaW5lci5hZGRDbGFzcyhpc0Fuc3dlckFjY2VwdGVkID8gJ2Fuc3dlcmVkLWFjY2VwdGVkJzonJyk7XG4gICAgfVxuICAgIGxldCBzdGF0VmFsdWUgPSBDb3Zlby4kJCgnZGl2Jyk7XG4gICAgbGV0IHN0YXRUeHQgPSBDb3Zlby4kJCgnZGl2Jyk7XG4gICAgc3RhdENvbnRhaW5lci5hcHBlbmQoc3RhdFZhbHVlLmVsKTtcbiAgICBzdGF0Q29udGFpbmVyLmFwcGVuZChzdGF0VHh0LmVsKTtcbiAgICB0aGlzLmFkZFN0YXRGaWVsZChzdGF0VmFsdWUuZWwsIGZpZWxkKTtcbiAgICBuZXcgQ292ZW8uVGV4dChzdGF0VHh0LmVsLCB7IHZhbHVlOiBDb3Zlby5sKHN0YXROYW1lKSB9LCB0aGlzLmdldEJpbmRpbmdzKCkpO1xuICAgIHRoaXMuc3RhdHNDb250YWluZXIuYXBwZW5kKHN0YXRDb250YWluZXIuZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTdGF0RmllbGQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGZpZWxkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmaWVsZE9wdGlvbnM6IElGaWVsZFZhbHVlT3B0aW9ucyA9IHtcbiAgICAgIGZpZWxkOiBmaWVsZFxuICAgIH1cbiAgICAvLyBGb3IgTGF6eSB2ZXJzaW9uIC4uLlxuICAgIGlmIChDb3Zlby5MYXp5SW5pdGlhbGl6YXRpb24pIHtcbiAgICAgIENvdmVvLmxvYWQoJ0ZpZWxkVmFsdWUnKS50aGVuKCgpID0+IHtcbiAgICAgICAgbmV3IENvdmVvLkZpZWxkVmFsdWUoZWxlbWVudCwgZmllbGRPcHRpb25zLCB0aGlzLmdldEJpbmRpbmdzKCksIHRoaXMucmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgQ292ZW8uRmllbGRWYWx1ZShlbGVtZW50LCBmaWVsZE9wdGlvbnMsIHRoaXMuZ2V0QmluZGluZ3MoKSwgdGhpcy5yZXN1bHQpO1xuICAgIH1cbiAgfVxufVxuXG5Jbml0aWFsaXphdGlvbi5yZWdpc3RlckF1dG9DcmVhdGVDb21wb25lbnQoU3RhY2tvdmVyZmxvd1N0YXRzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9TdGFja292ZXJmbG93U3RhdHMvU3RhY2tvdmVyZmxvd1N0YXRzLnRzIiwiZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbiAgfVxufVxuXG4vLyBXZWJwYWNrIG91dHB1dCBhIGxpYnJhcnkgdGFyZ2V0IHdpdGggYSB0ZW1wb3JhcnkgbmFtZS5cbi8vIEl0IGRvZXMgbm90IHRha2UgY2FyZSBvZiBtZXJnaW5nIHRoZSBuYW1lc3BhY2UgaWYgdGhlIGdsb2JhbCB2YXJpYWJsZSBhbHJlYWR5IGV4aXN0cy5cbi8vIElmIGFub3RoZXIgcGllY2Ugb2YgY29kZSBpbiB0aGUgcGFnZSB1c2UgdGhlIENvdmVvIG5hbWVzcGFjZSAoZWc6IGV4dGVuc2lvbiksIHRoZW4gdGhleSBnZXQgb3ZlcndyaXR0ZW5cbi8vIFRoaXMgY29kZSBzd2FwIHRoZSBjdXJyZW50IG1vZHVsZSB0byB0aGUgXCJyZWFsXCIgQ292ZW8gdmFyaWFibGUsIHdpdGhvdXQgb3ZlcndyaXRpbmcgdGhlIHdob2xlIGdsb2JhbCB2YXIuXG4vLyBUaGlzIGlzIHRvIGFsbG93IGVuZCB1c2VyIHRvIHB1dCBDb3Zlb1BTQ29tcG9uZW50cy5qcyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIG1haW4gQ292ZW9Kc1NlYXJjaC5qcywgd2l0aG91dCBicmVha2luZ1xuXG5leHBvcnQgZnVuY3Rpb24gc3dhcFZhcihzY29wZTogYW55KSB7XG4gIGlmICh3aW5kb3dbJ0NvdmVvJ10gPT0gdW5kZWZpbmVkKSB7XG4gICAgd2luZG93WydDb3ZlbyddID0gc2NvcGU7XG4gIH0gZWxzZSB7XG4gICAgXy5lYWNoKF8ua2V5cyhzY29wZSksIChrKSA9PiB7XG4gICAgICB3aW5kb3dbJ0NvdmVvJ11ba10gPSBzY29wZVtrXTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1N3YXBWYXIudHMiXSwic291cmNlUm9vdCI6IiJ9