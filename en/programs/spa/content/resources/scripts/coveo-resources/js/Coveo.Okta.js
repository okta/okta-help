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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
// your custo component
__export(__webpack_require__(9));
// your ui components here
var CustomSelect_1 = __webpack_require__(10);
exports.CustomSelect = CustomSelect_1.CustomSelect;
var StackoverflowStats_1 = __webpack_require__(11);
exports.StackoverflowStats = StackoverflowStats_1.StackoverflowStats;
var SalesforceCommunityResultLink_1 = __webpack_require__(12);
exports.SalesforceCommunityResultLink = SalesforceCommunityResultLink_1.SalesforceCommunityResultLink;
var SwapVar_1 = __webpack_require__(13);
SwapVar_1.swapVar(this);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(5);
var UrlUtils_1 = __webpack_require__(0);
exports.UrlUtils = UrlUtils_1.UrlUtils;
var HttpUtils_1 = __webpack_require__(6);
exports.HttpUtils = HttpUtils_1.HttpUtils;
var LexUtils_1 = __webpack_require__(7);
exports.LexUtils = LexUtils_1.LexUtils;
var CustomEvents_1 = __webpack_require__(8);
exports.CustomEvents = CustomEvents_1.CustomEvents;
var OktaHelper_1 = __webpack_require__(1);
exports.OktaHelper = OktaHelper_1.OktaHelper;
var OktaFacetManager_1 = __webpack_require__(2);
exports.OktaFacetManager = OktaFacetManager_1.OktaFacetManager;


/***/ }),
/* 5 */
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
/**
* Camelize a string, cutting the string by multiple separators like
* hyphens, underscores and spaces.
*
* @return string Camelized text
*/
String.prototype.camelize = function () {
    return this.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
        if (p2)
            return p2.toUpperCase();
        return p1.toLowerCase();
    });
};
/**
 * Decamelizes a string with/without a custom separator (underscore by default).
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
String.prototype.decamelize = function (separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;
    return this
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
};


/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
var fields = [
    '@commonsource',
    '@commoncontenttype'
];
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
        // State Events
        _this.bind.onRootElement(_this.getStateEventName(Coveo.QueryStateModel.eventTypes.changeOne + "f:" + _this.options.typeOfContentId), _this.handleTypeOfContentFacetChanged);
        var params = UrlUtils_1.UrlUtils.getUrlParams(window.location.search);
        var searchboxOption = sessionStorage.getItem(OktaCusto.STORAGE_KEY);
        var facetComponents = _this.searchInterface.getComponents('Facet');
        if (params.sbOption) {
            _this.defaultTypeOfContent.push(params.sbOption);
        }
        else if (_this.options.typeOfContentDefaultValues && _this.options.typeOfContentDefaultValues.length) {
            _this.defaultTypeOfContent = _this.options.typeOfContentDefaultValues;
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
    OktaCusto.prototype.getStateEventName = function (event) {
        return Coveo.QueryStateModel.ID + ':' + event;
    };
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
        var searchboxOption = sessionStorage.getItem(OktaCusto.STORAGE_KEY);
        if (!this.queryController.firstQuery && searchboxOption) {
            sessionStorage.removeItem(OktaCusto.STORAGE_KEY);
        }
    };
    OktaCusto.prototype.handleTypeOfContentFacetChanged = function (args) {
        var searchboxOption = sessionStorage.getItem(OktaCusto.STORAGE_KEY);
        if (!args.value && searchboxOption) {
            sessionStorage.removeItem(OktaCusto.STORAGE_KEY);
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
        // Force suggestions to hide if they are still showing
        var suggestionBox = document.querySelector('.magic-box-hasSuggestion');
        if (Coveo.Utils.isHtmlElement(suggestionBox)) {
            suggestionBox.classList.remove('magic-box-hasSuggestion');
        }
    };
    /**
     * Preprocess Results
     */
    OktaCusto.prototype.handlePreprocessResults = function (args) {
        _.each(args.results.results, function (result) {
            result.raw.sfcommentcountstr = result.raw.sfcommentcountstr || (result.raw.sfcommentcount ? result.raw.sfcommentcount.toString() : '0');
        });
    };
    /**
     * Query Success
     */
    OktaCusto.prototype.handleQuerySuccess = function (args) { };
    OktaCusto.ID = 'OktaCusto';
    OktaCusto.STORAGE_KEY = 'SearchboxOption';
    OktaCusto.CONTENT_TYPE_CUSTOM_SORT = [
        'Documentation',
        'Knowledge base',
        'Discussions',
        'Groups',
        'Events',
        'Ideas',
        'Roadmap',
        'Training'
    ];
    OktaCusto.options = {
        typeOfContentId: Coveo.ComponentOptions.buildStringOption(),
        typeOfContentDefaultValues: Coveo.ComponentOptions.buildListOption(),
        enableCustomFacet: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true })
    };
    return OktaCusto;
}(Component));
exports.OktaCusto = OktaCusto;
;
Initialization.registerAutoCreateComponent(OktaCusto);
Initialization.registerComponentFields(OktaCusto.ID, fields);


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
                        var retVal = _.map(values, function (v) {
                            return { label: v.value, value: v.value, key: v.value.camelize() };
                        });
                        if (_this.options.customSort && _this.options.customSort.length) {
                            var camelizedCustomSort = _.map(_this.options.customSort, function (v) { return v.camelize(); });
                            var sortObj_1 = _.object(camelizedCustomSort, _.range(camelizedCustomSort.length));
                            retVal = _.sortBy(retVal, function (obj) { return sortObj_1[obj.key]; });
                        }
                        retVal = _.map(retVal, function (v) { return _.omit(v, 'key'); });
                        resolve(retVal);
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
            _this.selectOptionAction(_this.getSelectedOption());
        });
        return _this;
    }
    CustomSelect.prototype.handleNewQuery = function (args) {
        this.updateHash(this.getSelectedOption());
    };
    CustomSelect.prototype.updateHash = function (selectedOption) {
        if (selectedOption) {
            var hash = Coveo.HashUtils.getHash();
            var searchboxOpt = Coveo.HashUtils.getValue(this.options.localStorageKey, hash);
            var strippedHash = hash.replace(this.options.localStorageKey + "=" + searchboxOpt, '');
            var newHash = (searchboxOpt ? strippedHash : hash);
            if (newHash === '#' || newHash === '') {
                window.location.replace("#" + this.options.localStorageKey + "=" + selectedOption);
            }
            else {
                window.location.replace(newHash + "&" + this.options.localStorageKey + "=" + selectedOption);
            }
        }
    };
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
            if (current == this_1.select.options.item(i).text) {
                listItem.addClass('active');
            }
            listItem.on('click', function (e) {
                e.stopPropagation();
                self.select.value = listItem.getAttribute('value');
                self.selectOptionAction(self.getSelectedOption());
                self.selectStyled.text(listItem.text());
                self.selectStyled.removeClass('active');
                _.each(self.listOptions.children(), function (li) { Coveo.$$(li).removeClass('active'); });
                listItem.addClass('active');
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
            this.selectOptionAction(this.getSelectedOption());
            this.selectStyled.text(this.select.options[nextSelectedIndex].text);
            this.selectStyled.removeClass('active');
        }
    };
    CustomSelect.prototype.selectOptionAction = function (value) {
        var message = {
            name: CustomSelect.ID,
            payload: {
                selectedOption: value,
                globalIdRef: this.options.globalIdRef
            }
        };
        sessionStorage.setItem(this.options.localStorageKey, value);
        window.postMessage(JSON.stringify(message), this.options.lexHost);
    };
    CustomSelect.ID = 'CustomSelect';
    /**
     * The options for the component
     * @componentOptions
     */
    CustomSelect.options = {
        options: Coveo.ComponentOptions.buildJsonOption(),
        field: Coveo.ComponentOptions.buildFieldOption(),
        customSort: ComponentOptions.buildListOption({ depend: 'field' }),
        defaultOption: Coveo.ComponentOptions.buildStringOption(),
        localStorageKey: Coveo.ComponentOptions.buildStringOption({ defaultValue: 'SearchboxOption' }),
        lexHost: ComponentOptions.buildStringOption({ defaultValue: '*' }),
        globalIdRef: ComponentOptions.buildStringOption({ defaultValue: '' }),
    };
    return CustomSelect;
}(Component));
exports.CustomSelect = CustomSelect;
Initialization.registerAutoCreateComponent(CustomSelect);


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
var fields = [
    '@sfcaseid',
    '@objecttype',
    '@sfparentid',
    '@sffeeditemid',
    '@sfid',
    '@sfcontentdocumentid',
    '@sfideaid',
    '@sfkbid',
    '@sfurlname'
];
var SalesforceCommunityResultLink = /** @class */ (function (_super) {
    __extends(SalesforceCommunityResultLink, _super);
    function SalesforceCommunityResultLink(element, options, bindings, result) {
        var _this = _super.call(this, element, SalesforceCommunityResultLink.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.result = result;
        _this.options = ComponentOptions.initComponentOptions(element, SalesforceCommunityResultLink, options);
        _this.result = result;
        if (_this.options.enableUrlRewriter) {
            _this.applyCommunityUrlRewriter();
        }
        if (_this.options.useAsPrintable) {
            _this.element.textContent = _this.result.clickUri;
        }
        new Coveo.ResultLink(_this.element, _this.options, bindings, result);
        return _this;
    }
    SalesforceCommunityResultLink.prototype.applyCommunityUrlRewriter = function () {
        var communityUrl = SalesforceCommunityResultLink.getCommunityUrl(this.result, this.options);
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
            communityUrl = communityBaseUrl + "/s/ideas#" + (result.raw.sfideaid || result.raw.sfid);
        }
        else if (result.raw.objecttype == 'OktaCommunityEvent__c') {
            communityUrl = communityBaseUrl + "/s/event?id=" + result.raw.sfid;
        }
        else if (result.raw.sfkbid) {
            communityUrl = communityBaseUrl + "/s/article/" + result.raw.sfurlname;
        }
        return communityUrl;
    };
    SalesforceCommunityResultLink.ID = 'SalesforceCommunityResultLink';
    /**
     * The options for the component
     * @componentOptions
     */
    SalesforceCommunityResultLink.options = {
        enableUrlRewriter: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        useAsPrintable: Coveo.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        name: Coveo.ComponentOptions.buildStringOption({ defaultValue: '' }),
        hostName: Coveo.ComponentOptions.buildStringOption({ defaultValue: window.location.hostname }),
        protocol: Coveo.ComponentOptions.buildStringOption({ defaultValue: window.location.protocol })
    };
    return SalesforceCommunityResultLink;
}(Component));
exports.SalesforceCommunityResultLink = SalesforceCommunityResultLink;
Initialization.registerAutoCreateComponent(SalesforceCommunityResultLink);
Initialization.registerComponentFields(SalesforceCommunityResultLink.ID, fields);


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
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0OWI2Njg5Yzg4YmZhNTY3OTY1OCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvVXJsVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N1c3RvL09rdGFIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N1c3RvL09rdGFGYWNldE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9Pa3RhQ29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvU3RyaW5nVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0h0dHBVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvTGV4VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9DdXN0b21FdmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N1c3RvL09rdGFDdXN0by50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvQ3VzdG9tU2VsZWN0L0N1c3RvbVNlbGVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvU3RhY2tvdmVyZmxvd1N0YXRzL1N0YWNrb3ZlcmZsb3dTdGF0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsvU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N3YXBWYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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QyxJQUFJLFNBQVMsRUFBRTtRQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3pCO1NBQU07UUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFSRCwwQkFRQyIsImZpbGUiOiJDb3Zlby5Pa3RhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQ292ZW9FeHRlbnNpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ292ZW9FeHRlbnNpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDliNjY4OWM4OGJmYTU2Nzk2NTgiLCJleHBvcnQgY2xhc3MgVXJsVXRpbHMge1xuICBzdGF0aWMgZ2V0VXJsUGFyYW1zID0gcXVlcnkgPT4ge1xuICAgIGlmICghcXVlcnkpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICB2YXIgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBzZWFyY2ggPSAnJztcbiAgICBwYXJzZXIuaHJlZiA9IHF1ZXJ5O1xuICAgIHZhciBoYXNoID0gcGFyc2VyLmhhc2guc3Vic3RyaW5nKDEpO1xuICAgIGlmIChoYXNoKSB7XG4gICAgICB2YXIgaGFzaFBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGhhc2hQYXJzZXIuaHJlZiA9IGhhc2g7XG4gICAgICBzZWFyY2ggPSBoYXNoUGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaCA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIHNlYXJjaCA9IHNlYXJjaCB8fCBxdWVyeTtcblxuICAgIHJldHVybiAoL15bPyNdLy50ZXN0KHNlYXJjaCkgPyBzZWFyY2guc2xpY2UoMSkgOiBzZWFyY2gpXG4gICAgICAuc3BsaXQoJyYnKVxuICAgICAgLnJlZHVjZSgocGFyYW1zLCBwYXJhbSkgPT4ge1xuICAgICAgICBsZXQgW2tleSwgdmFsdWVdID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZSA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZS5yZXBsYWNlKC9cXCsvZywgJyAnKSkgOiAnJztcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRMb2NhdGlvbkZyb21VcmkgPSBxdWVyeSA9PiB7XG4gICAgaWYgKCFxdWVyeSkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGFuY2hvci5ocmVmID0gcXVlcnk7XG4gICAgdmFyIHJldFZhbCA9IHtcbiAgICAgIGhyZWY6IGFuY2hvci5ocmVmLFxuICAgICAgcGF0aG5hbWU6IGFuY2hvci5wYXRobmFtZSxcbiAgICAgIGhvc3RuYW1lOiBhbmNob3IuaG9zdG5hbWUsXG4gICAgICBob3N0OiBhbmNob3IuaG9zdCxcbiAgICAgIHNlYXJjaDogYW5jaG9yLnNlYXJjaCxcbiAgICAgIHByb3RvY29sOiBhbmNob3IucHJvdG9jb2wsXG4gICAgICBoYXNoOiBhbmNob3IuaGFzaFxuICAgIH07XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9VcmxVdGlscy50cyIsIlxuZXhwb3J0IGNsYXNzIE9rdGFIZWxwZXIge1xuXG4gIHN0YXRpYyB5b3VySGVscGVyTWV0aG9kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgc3RhdGljIGN1c3RvbUxvYWRUZW1wbGF0ZSh2YWx1ZSwgb3B0aW9ucyk6IHN0cmluZyB7XG5cbiAgICB2YXIgZWxlbWVudCA9IENvdmVvLiQkKCdkaXYnKS5lbDtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IENvdmVvLlRlbXBsYXRlSGVscGVycy5nZXRIZWxwZXIoJ2xvYWRUZW1wbGF0ZScpLmNhbGwodGhpcywgb3B0aW9ucy50ZW1wbGF0ZUlkKTtcbiAgICBDb3Zlby5Jbml0aWFsaXphdGlvbi5hdXRvbWF0aWNhbGx5Q3JlYXRlQ29tcG9uZW50c0luc2lkZShlbGVtZW50LCB7XG4gICAgICBvcHRpb25zOiB7fSxcbiAgICAgIGJpbmRpbmdzOiBvcHRpb25zLmJpbmRpbmdzLFxuICAgICAgcmVzdWx0OiBPa3RhSGVscGVyLnJlc29sdmVRdWVyeVJlc3VsdCgpXG4gICAgfSk7XG4gICAgcmV0dXJuIGVsZW1lbnQuaW5uZXJIVE1MXG4gIH1cblxuICBzdGF0aWMgYmFkZ2UodmFsdWUsIG9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhZGdlQ3NzID0gb3B0aW9ucy5iYWRnZUNzcyB8fCAnYmFkZ2Utb2t0YSc7XG4gICAgbGV0IGJhZGdlID0gQ292ZW8uJCQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogYGJhZGdlIGJhZGdlLXBpbGwgJHtiYWRnZUNzc31gIH0sIHZhbHVlKTtcbiAgICByZXR1cm4gYmFkZ2UuZWwub3V0ZXJIVE1MO1xuICB9XG4gIHN0YXRpYyByZXNvbHZlUXVlcnlSZXN1bHQoKTogQ292ZW8uSVF1ZXJ5UmVzdWx0IHtcbiAgICBsZXQgZm91bmQ7XG4gICAgbGV0IHJlc3VsdExpc3QgPSBDb3Zlby5Db21wb25lbnQuZ2V0Q29tcG9uZW50UmVmKCdSZXN1bHRMaXN0Jyk7XG4gICAgaWYgKHJlc3VsdExpc3QpIHtcbiAgICAgIGZvdW5kID0gcmVzdWx0TGlzdC5yZXN1bHRDdXJyZW50bHlCZWluZ1JlbmRlcmVkO1xuICAgIH1cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBsZXQgcXVpY2t2aWV3ID0gQ292ZW8uQ29tcG9uZW50LmdldENvbXBvbmVudFJlZignUXVpY2t2aWV3Jyk7XG4gICAgICBpZiAocXVpY2t2aWV3KSB7XG4gICAgICAgIGZvdW5kID0gcXVpY2t2aWV3LnJlc3VsdEN1cnJlbnRseUJlaW5nUmVuZGVyZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3VzdG8vT2t0YUhlbHBlci50cyIsImV4cG9ydCBjbGFzcyBPa3RhRmFjZXRNYW5hZ2VyIHtcblxuICAvKipcbiAgICogQWRkIHRoZSBib29sZWFuIG9wdGlvbiBgb2t0YUZsYXZvcmAgb24gdGhlIGBGYWNldGAgY29tcG9uZW50XG4gICAqIE92ZXJyaWRlIGBjcmVhdGVEb21gIHByb3RvdHlwZSBvbiB0aGUgYEZhY2V0YCBjb21wb25lbnRcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyb2YgT2t0YUZhY2V0TWFuYWdlclxuICAgKi9cbiAgc3RhdGljIGluaXRpYWxpemUoKSB7XG5cbiAgICB2YXIgZGVmYXVsdEZhY2V0Q3JlYXRlRG9tID0gQ292ZW8uRmFjZXQucHJvdG90eXBlLmNyZWF0ZURvbTtcbiAgICB2YXIgZGVmYXVsdFJlYnVpbGRWYWx1ZUVsZW1lbnRzID0gQ292ZW8uRmFjZXQucHJvdG90eXBlWydyZWJ1aWxkVmFsdWVFbGVtZW50cyddO1xuXG4gICAgQ292ZW8uRmFjZXQub3B0aW9uc1snb2t0YUZsYXZvciddID0gQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZEJvb2xlYW5PcHRpb24oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pO1xuXG4gICAgQ292ZW8uRmFjZXQucHJvdG90eXBlLmNyZWF0ZURvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmOiBDb3Zlby5GYWNldCA9IHRoaXM7XG4gICAgICBkZWZhdWx0RmFjZXRDcmVhdGVEb20uY2FsbChzZWxmKTtcbiAgICB9O1xuXG4gICAgQ292ZW8uRmFjZXQucHJvdG90eXBlWydyZWJ1aWxkVmFsdWVFbGVtZW50cyddID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGY6IENvdmVvLkZhY2V0ID0gdGhpcztcbiAgICAgIGRlZmF1bHRSZWJ1aWxkVmFsdWVFbGVtZW50cy5jYWxsKHNlbGYpO1xuICAgICAgT2t0YUZhY2V0TWFuYWdlci5jdXN0b21SZWJ1aWxkVmFsdWVFbGVtZW50cyhzZWxmKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5qZWN0cyBhIGZha2UgXCJBbGwgQ29udGVudFwiIHZhbHVlIHRvIHRoZSBmYWNldCB3aGVuIG9rdGFGbGF2b3Igb3B0aW9uIGlzIGFjdGl2YXRlZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge0NvdmVvLkZhY2V0fSBmYWNldFxuICAgKiBAbWVtYmVyb2YgT2t0YUZhY2V0TWFuYWdlclxuICAgKi9cbiAgc3RhdGljIGN1c3RvbVJlYnVpbGRWYWx1ZUVsZW1lbnRzKGZhY2V0OiBDb3Zlby5GYWNldCkge1xuICAgIHZhciBzZWxmOiBDb3Zlby5GYWNldCA9IGZhY2V0O1xuXG4gICAgaWYgKHNlbGYub3B0aW9uc1snb2t0YUZsYXZvciddKSB7XG4gICAgICB2YXIgZmFrZUZhY2V0VmFsdWVFbGVtZW50ID0gQ292ZW8uJCQoJ2RpdicpO1xuICAgICAgdmFyIHNob3VsZEJlQ2hlY2tlZCA9IHNlbGYuZmFjZXRWYWx1ZXNMaXN0LmZhY2V0LmdldFNlbGVjdGVkVmFsdWVzKCkubGVuZ3RoID09PSAwICYmIHNlbGYuZmFjZXRWYWx1ZXNMaXN0LmZhY2V0LmdldEV4Y2x1ZGVkVmFsdWVzKCkubGVuZ3RoID09PSAwO1xuXG4gICAgICB2YXIgYWxsRmFjZXRWYWx1ZSA9IENvdmVvLkZhY2V0VmFsdWUuY3JlYXRlRnJvbVZhbHVlKCdBbGwgQ29udGVudCcpO1xuICAgICAgYWxsRmFjZXRWYWx1ZS5zZWxlY3RlZCA9IHNob3VsZEJlQ2hlY2tlZDtcbiAgICAgIHZhciBhbGxGYWNldFZhbHVlRWxlbWVudCA9IG5ldyBDb3Zlby5GYWNldFZhbHVlRWxlbWVudChzZWxmLCBhbGxGYWNldFZhbHVlLCB0cnVlKTtcbiAgICAgIGFsbEZhY2V0VmFsdWVFbGVtZW50LmJ1aWxkKCk7XG4gICAgICBhbGxGYWNldFZhbHVlRWxlbWVudC5yZW5kZXJlci53aXRoTm8oYWxsRmFjZXRWYWx1ZUVsZW1lbnQucmVuZGVyZXIuZXhjbHVkZUljb24pO1xuICAgICAgZmFrZUZhY2V0VmFsdWVFbGVtZW50LnNldEh0bWwoYWxsRmFjZXRWYWx1ZUVsZW1lbnQucmVuZGVyZXIubGlzdEl0ZW0ub3V0ZXJIVE1MKTtcblxuICAgICAgdmFyIGZha2VGYWNldFZhbHVlRWxlbWVudExpc3RJdGVtID0gQ292ZW8uJCQoZmFrZUZhY2V0VmFsdWVFbGVtZW50KS5maW5kKCdsaScpO1xuICAgICAgaWYgKGZha2VGYWNldFZhbHVlRWxlbWVudExpc3RJdGVtKSB7XG4gICAgICAgIENvdmVvLiQkKGZha2VGYWNldFZhbHVlRWxlbWVudExpc3RJdGVtKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIHZhciBzaG91bGRCZUNoZWNrZWQgPSBzZWxmLmZhY2V0VmFsdWVzTGlzdC5mYWNldC5nZXRTZWxlY3RlZFZhbHVlcygpLmxlbmd0aCA9PT0gMCAmJiBzZWxmLmZhY2V0VmFsdWVzTGlzdC5mYWNldC5nZXRFeGNsdWRlZFZhbHVlcygpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICBDb3Zlby4kJChmYWtlRmFjZXRWYWx1ZUVsZW1lbnRMaXN0SXRlbSkudG9nZ2xlQ2xhc3MoJ2NvdmVvLXNlbGVjdGVkJywgc2hvdWxkQmVDaGVja2VkKTtcbiAgICAgICAgICBpZiAoIXNob3VsZEJlQ2hlY2tlZCkge1xuICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xuICAgICAgICAgICAgc2VsZi50cmlnZ2VyTmV3UXVlcnkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0byBub3QgaW5zZXJ0IHRoZSAoZmFrZSkgQWxsIENvbnRlbnQgZmFjZXQgdmFsdWUgaXMgYWxyZWFkeSBpbnRvIHRoZSB2YWx1ZSBDb250YWluZXIuXG4gICAgICAgIHZhciBmaXJzdEVsZW1lbnRDaGlsZCA9IDxIVE1MRWxlbWVudD5zZWxmLmZhY2V0VmFsdWVzTGlzdC52YWx1ZUNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgaWYoZmlyc3RFbGVtZW50Q2hpbGQgJiYgZmlyc3RFbGVtZW50Q2hpbGQuZGF0YXNldC52YWx1ZSAhPT0gJ0FsbCBDb250ZW50Jyl7XG4gICAgICAgICAgc2VsZi5mYWNldFZhbHVlc0xpc3QudmFsdWVDb250YWluZXIuaW5zZXJ0QmVmb3JlKGZha2VGYWNldFZhbHVlRWxlbWVudExpc3RJdGVtLCBzZWxmLmZhY2V0VmFsdWVzTGlzdC52YWx1ZUNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N1c3RvL09rdGFGYWNldE1hbmFnZXIudHMiLCJcbmV4cG9ydCAqIGZyb20gJy4vT2t0YUNvcmUnO1xuLy8geW91ciBjdXN0byBjb21wb25lbnRcbmV4cG9ydCAqIGZyb20gJy4vY3VzdG8vT2t0YUN1c3RvJztcblxuLy8geW91ciB1aSBjb21wb25lbnRzIGhlcmVcbmV4cG9ydCB7IEN1c3RvbVNlbGVjdCB9IGZyb20gJy4vdWkvQ3VzdG9tU2VsZWN0L0N1c3RvbVNlbGVjdCc7XG5leHBvcnQgeyBTdGFja292ZXJmbG93U3RhdHMgfSBmcm9tICcuL3VpL1N0YWNrb3ZlcmZsb3dTdGF0cy9TdGFja292ZXJmbG93U3RhdHMnO1xuZXhwb3J0IHsgU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsgfSBmcm9tICcuL3VpL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rJztcblxuaW1wb3J0IHsgc3dhcFZhciB9IGZyb20gJy4vU3dhcFZhcic7XG5zd2FwVmFyKHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0luZGV4LnRzIiwiXG5pbXBvcnQgJy4vdXRpbHMvU3RyaW5nVXRpbHMnO1xuZXhwb3J0IHsgVXJsVXRpbHMgfSBmcm9tICcuL3V0aWxzL1VybFV0aWxzJztcbmV4cG9ydCB7IEh0dHBVdGlscyB9IGZyb20gJy4vdXRpbHMvSHR0cFV0aWxzJztcbmV4cG9ydCB7IExleFV0aWxzIH0gZnJvbSAnLi91dGlscy9MZXhVdGlscyc7XG5cbmV4cG9ydCB7IEN1c3RvbUV2ZW50cyB9IGZyb20gJy4vZXZlbnRzL0N1c3RvbUV2ZW50cyc7XG5leHBvcnQgeyBPa3RhSGVscGVyIH0gZnJvbSAnLi9jdXN0by9Pa3RhSGVscGVyJztcbmV4cG9ydCB7IE9rdGFGYWNldE1hbmFnZXIgfSBmcm9tICcuL2N1c3RvL09rdGFGYWNldE1hbmFnZXInO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL09rdGFDb3JlLnRzIiwiZGVjbGFyZSBpbnRlcmZhY2UgU3RyaW5nIHtcbiAgZ2V0SW5pdGlhbHMoZ2x1ZT86IGJvb2xlYW4pOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuICBjYXBpdGFsaXplKCk6IHN0cmluZztcbiAgY2FtZWxpemUoKTogc3RyaW5nO1xuICBkZWNhbWVsaXplKHNlcGFyYXRvcik6IHN0cmluZztcbn1cblxuXG5TdHJpbmcucHJvdG90eXBlLmdldEluaXRpYWxzID0gZnVuY3Rpb24gKGdsdWU6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiB7XG5cbiAgdmFyIGluaXRpYWxzID0gdGhpcy5yZXBsYWNlKC9bXmEtekEtWi0gXS9nLCAnJykubWF0Y2goL1xcYlxcdy9nKSB8fCBbXTtcblxuICBpZiAoZ2x1ZSkge1xuICAgIHJldHVybiBpbml0aWFscy5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFscztcbn07XG5cblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uICgpOiBzdHJpbmcge1xuICByZXR1cm4gdGhpcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcYlxcdy9nLCBmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufTtcblxuLyoqXG4qIENhbWVsaXplIGEgc3RyaW5nLCBjdXR0aW5nIHRoZSBzdHJpbmcgYnkgbXVsdGlwbGUgc2VwYXJhdG9ycyBsaWtlXG4qIGh5cGhlbnMsIHVuZGVyc2NvcmVzIGFuZCBzcGFjZXMuXG4qIFxuKiBAcmV0dXJuIHN0cmluZyBDYW1lbGl6ZWQgdGV4dFxuKi9cblN0cmluZy5wcm90b3R5cGUuY2FtZWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL14oW0EtWl0pfFtcXHMtX10rKFxcdykvZywgZnVuY3Rpb24gKG1hdGNoLCBwMSwgcDIsIG9mZnNldCkge1xuICAgIGlmIChwMikgcmV0dXJuIHAyLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIHAxLnRvTG93ZXJDYXNlKCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIERlY2FtZWxpemVzIGEgc3RyaW5nIHdpdGgvd2l0aG91dCBhIGN1c3RvbSBzZXBhcmF0b3IgKHVuZGVyc2NvcmUgYnkgZGVmYXVsdCkuXG4gKiBcbiAqIEBwYXJhbSBzdHIgU3RyaW5nIGluIGNhbWVsY2FzZVxuICogQHBhcmFtIHNlcGFyYXRvciBTZXBhcmF0b3IgZm9yIHRoZSBuZXcgZGVjYW1lbGl6ZWQgc3RyaW5nLlxuICovXG5TdHJpbmcucHJvdG90eXBlLmRlY2FtZWxpemUgPSBmdW5jdGlvbiAoc2VwYXJhdG9yKSB7XG4gIHNlcGFyYXRvciA9IHR5cGVvZiBzZXBhcmF0b3IgPT09ICd1bmRlZmluZWQnID8gJ18nIDogc2VwYXJhdG9yO1xuICByZXR1cm4gdGhpc1xuICAgIC5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLCAnJDEnICsgc2VwYXJhdG9yICsgJyQyJylcbiAgICAucmVwbGFjZSgvKFtBLVpdKykoW0EtWl1bYS16XFxkXSspL2csICckMScgKyBzZXBhcmF0b3IgKyAnJDInKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL1N0cmluZ1V0aWxzLnRzIiwiZXhwb3J0IGNsYXNzIEh0dHBVdGlscyB7XG4gICAgc3RhdGljIGdldCA9IChhVXJsLCBhQ2FsbGJhY2spID0+IHtcbiAgICAgICAgdmFyIGFuSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgYW5IdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7IFxuICAgICAgICAgICAgaWYgKGFuSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIGFuSHR0cFJlcXVlc3Quc3RhdHVzID09IDIwMClcbiAgICAgICAgICAgICAgICBhQ2FsbGJhY2soYW5IdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYW5IdHRwUmVxdWVzdC5vcGVuKCBcIkdFVFwiLCBhVXJsLCB0cnVlICk7ICAgICAgICAgICAgXG4gICAgICAgIGFuSHR0cFJlcXVlc3Quc2VuZCggbnVsbCApO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvSHR0cFV0aWxzLnRzIiwiZXhwb3J0IGNsYXNzIExleFV0aWxzIHtcbiAgc3RhdGljIGdldENvdmVvU2VhcmNoVUkgPSAoY21wKSA9PiB7XG4gICAgcmV0dXJuIGNtcC5nZXRFbGVtZW50cygpLmZpbmQoZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gQ292ZW8uJCQoZWwpLmZpbmQoJyMnICsgY21wLmdldCgndi5uYW1lJykpIHx8IENvdmVvLiQkKGVsKS5maW5kKCcuQ292ZW9TZWFyY2hJbnRlcmZhY2UnKTtcbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgZ2V0U2VhcmNoSW50ZXJmYWNlRWxlbWVudCA9IChjbXApID0+IHtcbiAgICB2YXIgY292ZW9TZWFyY2hVSSA9IExleFV0aWxzLmdldENvdmVvU2VhcmNoVUkoY21wKTtcbiAgICByZXR1cm4gY292ZW9TZWFyY2hVSSA/IENvdmVvLiQkKGNvdmVvU2VhcmNoVUkpLmZpbmQoJyMnICsgY21wLmdldCgndi5uYW1lJykpIHx8IENvdmVvLiQkKGNvdmVvU2VhcmNoVUkpLmZpbmQoJy5Db3Zlb1NlYXJjaEludGVyZmFjZScpIDogbnVsbDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL0xleFV0aWxzLnRzIiwiaW1wb3J0IElTdHJpbmdNYXAgPSBDb3Zlby5JU3RyaW5nTWFwO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXZlbnRzIHtcbiAgcHVibGljIHN0YXRpYyB5b3VyQ3VzdG9tRXZlbnQgPSAneW91ckN1c3RvbUV2ZW50Jztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudHMvQ3VzdG9tRXZlbnRzLnRzIiwiaW1wb3J0ICQkID0gQ292ZW8uJCQ7XG5pbXBvcnQgQ29tcG9uZW50ID0gQ292ZW8uQ29tcG9uZW50O1xuaW1wb3J0IEluaXRpYWxpemF0aW9uID0gQ292ZW8uSW5pdGlhbGl6YXRpb247XG5pbXBvcnQgQ29tcG9uZW50T3B0aW9ucyA9IENvdmVvLkNvbXBvbmVudE9wdGlvbnM7XG5pbXBvcnQgSUNvbXBvbmVudEJpbmRpbmdzID0gQ292ZW8uSUNvbXBvbmVudEJpbmRpbmdzO1xuaW1wb3J0IElCdWlsZGluZ1F1ZXJ5RXZlbnRBcmdzID0gQ292ZW8uSUJ1aWxkaW5nUXVlcnlFdmVudEFyZ3M7XG5pbXBvcnQgSURvbmVCdWlsZGluZ1F1ZXJ5RXZlbnRBcmdzID0gQ292ZW8uSURvbmVCdWlsZGluZ1F1ZXJ5RXZlbnRBcmdzO1xuaW1wb3J0IElQcmVwcm9jZXNzUmVzdWx0c0V2ZW50QXJncyA9IENvdmVvLklQcmVwcm9jZXNzUmVzdWx0c0V2ZW50QXJncztcbmltcG9ydCBJTmV3UXVlcnlFdmVudEFyZ3MgPSBDb3Zlby5JTmV3UXVlcnlFdmVudEFyZ3M7XG5pbXBvcnQgeyBVcmxVdGlscyB9IGZyb20gJy4uL3V0aWxzL1VybFV0aWxzJztcbmltcG9ydCBJU3RyaW5nTWFwID0gQ292ZW8uSVN0cmluZ01hcDtcbmltcG9ydCB7IE9rdGFIZWxwZXIgfSBmcm9tICcuL09rdGFIZWxwZXInO1xuaW1wb3J0IHsgT2t0YUZhY2V0TWFuYWdlciB9IGZyb20gJy4vT2t0YUZhY2V0TWFuYWdlcic7XG5pbXBvcnQgeyBTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluayB9IGZyb20gJy4uL3VpL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rL1NhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rJztcblxuZGVjbGFyZSB2YXIgU3RyaW5nOiB7IHRvTG9jYWxlU3RyaW5nOiAocGFyYW06IGFueSkgPT4gdm9pZDsgfTtcblxuZXhwb3J0IGludGVyZmFjZSBJT2t0YU9wdGlvbnMge1xuICB0eXBlT2ZDb250ZW50SWQ/OiBzdHJpbmc7XG4gIHR5cGVPZkNvbnRlbnREZWZhdWx0VmFsdWVzPzogc3RyaW5nW107XG4gIGVuYWJsZUN1c3RvbUZhY2V0PzogYm9vbGVhbjtcbn1cblxuY29uc3QgZmllbGRzID0gW1xuICAnQGNvbW1vbnNvdXJjZScsXG4gICdAY29tbW9uY29udGVudHR5cGUnXG5dO1xuXG4vKipcbiAqIFJlcXVpcmVkIGN1c3RvbWl6YXRpb24gc3BlY2lmaWNhbGx5IGFwcGxpZWQgZm9yIHlvdXIgaW1wbGVtZW50YXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIE9rdGFDdXN0byBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgc3RhdGljIElEID0gJ09rdGFDdXN0byc7XG4gIHN0YXRpYyBTVE9SQUdFX0tFWT0gJ1NlYXJjaGJveE9wdGlvbic7XG4gIHN0YXRpYyBDT05URU5UX1RZUEVfQ1VTVE9NX1NPUlQ9IFtcbiAgICAnRG9jdW1lbnRhdGlvbicsXG4gICAgJ0tub3dsZWRnZSBiYXNlJyxcbiAgICAnRGlzY3Vzc2lvbnMnLFxuICAgICdHcm91cHMnLFxuICAgICdFdmVudHMnLFxuICAgICdJZGVhcycsXG4gICAgJ1JvYWRtYXAnLFxuICAgICdUcmFpbmluZydcbiAgXTtcblxuICBzdGF0aWMgb3B0aW9uczogSU9rdGFPcHRpb25zID0ge1xuICAgIHR5cGVPZkNvbnRlbnRJZDogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZFN0cmluZ09wdGlvbigpLFxuICAgIHR5cGVPZkNvbnRlbnREZWZhdWx0VmFsdWVzOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkTGlzdE9wdGlvbjxzdHJpbmc+KCksXG4gICAgZW5hYmxlQ3VzdG9tRmFjZXQ6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRCb29sZWFuT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pXG4gIH07XG5cbiAgXG5cbiAgcHJpdmF0ZSBkZWZhdWx0VHlwZU9mQ29udGVudDogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBmYWNldFR5cGVPZkNvbnRlbnQ6IENvdmVvLkZhY2V0O1xuXG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgb3B0aW9uczogSU9rdGFPcHRpb25zLCBwdWJsaWMgYmluZGluZ3M/OiBJQ29tcG9uZW50QmluZGluZ3MpIHtcblxuICAgIHN1cGVyKGVsZW1lbnQsIE9rdGFDdXN0by5JRCwgYmluZGluZ3MpO1xuICAgIHRoaXMub3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnMuaW5pdENvbXBvbmVudE9wdGlvbnMoZWxlbWVudCwgT2t0YUN1c3RvLCBvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlQ3VzdG9tRmFjZXQpIHtcbiAgICAgIE9rdGFGYWNldE1hbmFnZXIuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemF0aW9uIEV2ZW50c1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLkluaXRpYWxpemF0aW9uRXZlbnRzLmJlZm9yZUluaXRpYWxpemF0aW9uLCB0aGlzLmhhbmRsZUJlZm9yZUluaXQpO1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLkluaXRpYWxpemF0aW9uRXZlbnRzLmFmdGVyQ29tcG9uZW50c0luaXRpYWxpemF0aW9uLCB0aGlzLmhhbmRsZUFmdGVyQ29tcG9uZW50c0luaXQpO1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLkluaXRpYWxpemF0aW9uRXZlbnRzLmFmdGVySW5pdGlhbGl6YXRpb24sIHRoaXMuaGFuZGxlQWZ0ZXJJbml0KTtcblxuICAgIC8vIFF1ZXJ5IEV2ZW50c1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLlF1ZXJ5RXZlbnRzLm5ld1F1ZXJ5LCB0aGlzLmhhbmRsZU5ld1F1ZXJ5KTtcbiAgICB0aGlzLmJpbmQub25Sb290RWxlbWVudChDb3Zlby5RdWVyeUV2ZW50cy5idWlsZGluZ1F1ZXJ5LCB0aGlzLmhhbmRsZUJ1aWxkaW5nUXVlcnkpO1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KENvdmVvLlF1ZXJ5RXZlbnRzLmRvbmVCdWlsZGluZ1F1ZXJ5LCB0aGlzLmhhbmRsZURvbmVCdWlsZGluZ1F1ZXJ5KTtcbiAgICB0aGlzLmJpbmQub25Sb290RWxlbWVudChDb3Zlby5RdWVyeUV2ZW50cy5wcmVwcm9jZXNzUmVzdWx0cywgdGhpcy5oYW5kbGVQcmVwcm9jZXNzUmVzdWx0cyk7XG4gICAgdGhpcy5iaW5kLm9uUm9vdEVsZW1lbnQoQ292ZW8uUXVlcnlFdmVudHMucHJlcHJvY2Vzc01vcmVSZXN1bHRzLCB0aGlzLmhhbmRsZVByZXByb2Nlc3NSZXN1bHRzKTtcbiAgICB0aGlzLmJpbmQub25Sb290RWxlbWVudChDb3Zlby5RdWVyeUV2ZW50cy5xdWVyeVN1Y2Nlc3MsIHRoaXMuaGFuZGxlUXVlcnlTdWNjZXNzKTtcblxuICAgIC8vIFN0YXRlIEV2ZW50c1xuICAgIHRoaXMuYmluZC5vblJvb3RFbGVtZW50KHRoaXMuZ2V0U3RhdGVFdmVudE5hbWUoYCR7Q292ZW8uUXVlcnlTdGF0ZU1vZGVsLmV2ZW50VHlwZXMuY2hhbmdlT25lfWY6JHt0aGlzLm9wdGlvbnMudHlwZU9mQ29udGVudElkfWApLCB0aGlzLmhhbmRsZVR5cGVPZkNvbnRlbnRGYWNldENoYW5nZWQpO1xuXG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSBVcmxVdGlscy5nZXRVcmxQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3Qgc2VhcmNoYm94T3B0aW9uID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShPa3RhQ3VzdG8uU1RPUkFHRV9LRVkpO1xuICAgIGNvbnN0IGZhY2V0Q29tcG9uZW50cyA9IHRoaXMuc2VhcmNoSW50ZXJmYWNlLmdldENvbXBvbmVudHMoJ0ZhY2V0Jyk7XG5cbiAgICBpZiAocGFyYW1zLnNiT3B0aW9uKSB7XG4gICAgICB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50LnB1c2gocGFyYW1zLnNiT3B0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy50eXBlT2ZDb250ZW50RGVmYXVsdFZhbHVlcyAmJiB0aGlzLm9wdGlvbnMudHlwZU9mQ29udGVudERlZmF1bHRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50ID0gdGhpcy5vcHRpb25zLnR5cGVPZkNvbnRlbnREZWZhdWx0VmFsdWVzO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoYm94T3B0aW9uKSB7XG4gICAgICB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50LnB1c2goc2VhcmNoYm94T3B0aW9uKVxuICAgIH1cblxuICAgIC8vIG5vIG5lZWQgdG8gZGVmYXVsdCB0byBhbGxcbiAgICB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50ID0gXy53aXRob3V0KHRoaXMuZGVmYXVsdFR5cGVPZkNvbnRlbnQsICdhbGwnLCAnQWxsIENvbnRlbnQnLCAnYWxsIGNvbnRlbnQnLCAnJyk7XG5cbiAgICBpZiAoZmFjZXRDb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5mYWNldFR5cGVPZkNvbnRlbnQgPSBfLmZpbmQoZmFjZXRDb21wb25lbnRzLCAoZjogQ292ZW8uRmFjZXQpID0+IGYub3B0aW9ucy5pZCA9PT0gdGhpcy5vcHRpb25zLnR5cGVPZkNvbnRlbnRJZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGF0ZUV2ZW50TmFtZShldmVudDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIENvdmVvLlF1ZXJ5U3RhdGVNb2RlbC5JRCArICc6JyArIGV2ZW50O1xuICB9XG4gIC8qKlxuICAgKiBCZWZvcmUgSW5pdGlhbGl6YXRpb25cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQmVmb3JlSW5pdCgpIHsgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBDb21wb25lbnQgSW5pdGlhbGl6YXRpb25cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQWZ0ZXJDb21wb25lbnRzSW5pdCgpIHtcbiAgICAvLyBDb3Zlby5UZW1wbGF0ZUhlbHBlcnMucmVnaXN0ZXJGaWVsZEhlbHBlcignY3VzdG9tTG9hZFRlbXBsYXRlJywgKHZhbHVlLCBvcHRpb25zKSA9PiB7XG4gICAgLy8gICB2YXIgZWxlbWVudCA9IENvdmVvLiQkKCdkaXYnKS5lbDtcbiAgICAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gQ292ZW8uVGVtcGxhdGVIZWxwZXJzLmdldEhlbHBlcignbG9hZFRlbXBsYXRlJykuY2FsbCh0aGlzLCBvcHRpb25zLnRlbXBsYXRlSWQpO1xuICAgIC8vICAgQ292ZW8uSW5pdGlhbGl6YXRpb24uYXV0b21hdGljYWxseUNyZWF0ZUNvbXBvbmVudHNJbnNpZGUoZWxlbWVudCwge1xuICAgIC8vICAgICBvcHRpb25zOiB7fSxcbiAgICAvLyAgICAgYmluZGluZ3M6IHRoaXMuYmluZGluZ3MsXG4gICAgLy8gICAgIHJlc3VsdDogT2t0YUhlbHBlci5yZXNvbHZlUXVlcnlSZXN1bHQoKVxuICAgIC8vICAgfSk7XG4gICAgLy8gICByZXR1cm4gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgLy8gfSk7XG4gICAgQ292ZW8uVGVtcGxhdGVIZWxwZXJzLnJlZ2lzdGVyRmllbGRIZWxwZXIoJ2JhZGdlJywgT2t0YUhlbHBlci5iYWRnZSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgQ29tcG9uZW50IEluaXRpYWxpemF0aW9uXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUFmdGVySW5pdCgpIHtcbiAgICBpZiAodGhpcy5mYWNldFR5cGVPZkNvbnRlbnQgJiYgdGhpcy5kZWZhdWx0VHlwZU9mQ29udGVudCAmJiB0aGlzLmRlZmF1bHRUeXBlT2ZDb250ZW50Lmxlbmd0aCkge1xuICAgICAgdGhpcy5mYWNldFR5cGVPZkNvbnRlbnQuc2VsZWN0TXVsdGlwbGVWYWx1ZXModGhpcy5kZWZhdWx0VHlwZU9mQ29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5ldyBRdWVyeVxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVOZXdRdWVyeShhcmdzOiBJTmV3UXVlcnlFdmVudEFyZ3MpIHtcbiAgICBjb25zdCBzZWFyY2hib3hPcHRpb24gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKE9rdGFDdXN0by5TVE9SQUdFX0tFWSk7XG4gICAgaWYgKCF0aGlzLnF1ZXJ5Q29udHJvbGxlci5maXJzdFF1ZXJ5ICYmIHNlYXJjaGJveE9wdGlvbikge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShPa3RhQ3VzdG8uU1RPUkFHRV9LRVkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlVHlwZU9mQ29udGVudEZhY2V0Q2hhbmdlZChhcmdzOiBDb3Zlby5JQXR0cmlidXRlQ2hhbmdlZEV2ZW50QXJnKXtcbiAgICBjb25zdCBzZWFyY2hib3hPcHRpb24gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKE9rdGFDdXN0by5TVE9SQUdFX0tFWSk7XG4gICAgaWYoIWFyZ3MudmFsdWUgJiYgc2VhcmNoYm94T3B0aW9uKXtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oT2t0YUN1c3RvLlNUT1JBR0VfS0VZKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEJ1aWxkaW5nIFF1ZXJ5XG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUJ1aWxkaW5nUXVlcnkoYXJnczogSUJ1aWxkaW5nUXVlcnlFdmVudEFyZ3MpIHsgXG4gICAgXG4gIH1cblxuICAvKipcbiAgICogRG9uZSBCdWlsZGluZyBRdWVyeVxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVEb25lQnVpbGRpbmdRdWVyeShhcmdzOiBJRG9uZUJ1aWxkaW5nUXVlcnlFdmVudEFyZ3MpIHtcbiAgICAvLyBGb3JjZSBzdWdnZXN0aW9ucyB0byBoaWRlIGlmIHRoZXkgYXJlIHN0aWxsIHNob3dpbmdcbiAgICBjb25zdCBzdWdnZXN0aW9uQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hZ2ljLWJveC1oYXNTdWdnZXN0aW9uJyk7XG4gICAgaWYgKENvdmVvLlV0aWxzLmlzSHRtbEVsZW1lbnQoc3VnZ2VzdGlvbkJveCkpIHtcbiAgICAgIChzdWdnZXN0aW9uQm94IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKCdtYWdpYy1ib3gtaGFzU3VnZ2VzdGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwcm9jZXNzIFJlc3VsdHNcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlUHJlcHJvY2Vzc1Jlc3VsdHMoYXJnczogSVByZXByb2Nlc3NSZXN1bHRzRXZlbnRBcmdzKSB7XG4gICAgXy5lYWNoKGFyZ3MucmVzdWx0cy5yZXN1bHRzLCAocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdC5yYXcuc2Zjb21tZW50Y291bnRzdHIgPSByZXN1bHQucmF3LnNmY29tbWVudGNvdW50c3RyIHx8IChyZXN1bHQucmF3LnNmY29tbWVudGNvdW50ID8gcmVzdWx0LnJhdy5zZmNvbW1lbnRjb3VudC50b1N0cmluZygpOiAnMCcpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IFN1Y2Nlc3NcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlUXVlcnlTdWNjZXNzKGFyZ3M6IENvdmVvLklRdWVyeVN1Y2Nlc3NFdmVudEFyZ3MpIHsgfVxuXG59O1xuXG5Jbml0aWFsaXphdGlvbi5yZWdpc3RlckF1dG9DcmVhdGVDb21wb25lbnQoT2t0YUN1c3RvKTtcbkluaXRpYWxpemF0aW9uLnJlZ2lzdGVyQ29tcG9uZW50RmllbGRzKE9rdGFDdXN0by5JRCwgZmllbGRzKTsgXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jdXN0by9Pa3RhQ3VzdG8udHMiLCJpbXBvcnQgQ29tcG9uZW50ID0gQ292ZW8uQ29tcG9uZW50O1xuaW1wb3J0IEluaXRpYWxpemF0aW9uID0gQ292ZW8uSW5pdGlhbGl6YXRpb247XG5pbXBvcnQgQ29tcG9uZW50T3B0aW9ucyA9IENvdmVvLkNvbXBvbmVudE9wdGlvbnM7XG5pbXBvcnQgSUNvbXBvbmVudEJpbmRpbmdzID0gQ292ZW8uSUNvbXBvbmVudEJpbmRpbmdzO1xuaW1wb3J0IElTdHJpbmdNYXAgPSBDb3Zlby5JU3RyaW5nTWFwO1xuXG5pbnRlcmZhY2UgSUN1c3RvbU9wdGlvbiB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgdmFsdWU6IHN0cmluZ1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ3VzdG9tU2VsZWN0T3B0aW9ucyB7XG4gIG9wdGlvbnM/OiBhbnksXG4gIGRlZmF1bHRPcHRpb24/OiBzdHJpbmcsXG4gIGZpZWxkPzogQ292ZW8uSUZpZWxkT3B0aW9uLFxuICBjdXN0b21Tb3J0Pzogc3RyaW5nW10sXG4gIGxvY2FsU3RvcmFnZUtleT86IHN0cmluZyxcbiAgbGV4SG9zdD86IFN0cmluZyxcbiAgZ2xvYmFsSWRSZWY/OiBTdHJpbmcsXG59XG5cblxuLyoqXG4gKiBDb21wb25lbnQgdXNlZCB0byByZW5kZXIgY3VzdG9tIHNlbGVjdCBib3ggd2hpY2ggYWZ0ZXIgYSBjbGljayBkaXNwbGF5cyBhIFxuICogY29sbGFwc2FibGUgbGlzdCBvZiBtdWx0aXBsZSB2YWx1ZXMgd2hpY2ggY2FuIGJlIHVzZWQgaW4gZm9ybXMsIG1lbnVzIG9yIHN1cnZleXMuXG4gKiBUaGlzIGNvbXBvbmVudCBvdmVyd3JpdGVzIGEgc3RhbmRhcmQgc2VsZWN0IHRvIHJlcGxhY2UgaXQgd2l0aCBvdXIgY3VzdG9tIHNlbGVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbVNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBJRCA9ICdDdXN0b21TZWxlY3QnO1xuXG4gIHByaXZhdGUgc2VsZWN0T3B0aW9uczogQXJyYXk8SUN1c3RvbU9wdGlvbj47XG4gIHByaXZhdGUgc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgcHJpdmF0ZSBzZWxlY3RTdHlsZWQ6IENvdmVvLkRvbTtcbiAgcHJpdmF0ZSBsaXN0T3B0aW9uczogQ292ZW8uRG9tO1xuXG4gIC8qKlxuICAgKiBUaGUgb3B0aW9ucyBmb3IgdGhlIGNvbXBvbmVudFxuICAgKiBAY29tcG9uZW50T3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIG9wdGlvbnM6IElDdXN0b21TZWxlY3RPcHRpb25zID0ge1xuICAgIG9wdGlvbnM6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRKc29uT3B0aW9uKCksXG4gICAgZmllbGQ6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRGaWVsZE9wdGlvbigpLFxuICAgIGN1c3RvbVNvcnQ6IENvbXBvbmVudE9wdGlvbnMuYnVpbGRMaXN0T3B0aW9uPHN0cmluZz4oe2RlcGVuZDogJ2ZpZWxkJ30pLFxuICAgIGRlZmF1bHRPcHRpb246IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRTdHJpbmdPcHRpb24oKSxcbiAgICBsb2NhbFN0b3JhZ2VLZXk6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRTdHJpbmdPcHRpb24oeyBkZWZhdWx0VmFsdWU6ICdTZWFyY2hib3hPcHRpb24nIH0pLFxuICAgIGxleEhvc3Q6IENvbXBvbmVudE9wdGlvbnMuYnVpbGRTdHJpbmdPcHRpb24oeyBkZWZhdWx0VmFsdWU6ICcqJyB9KSxcbiAgICBnbG9iYWxJZFJlZjogQ29tcG9uZW50T3B0aW9ucy5idWlsZFN0cmluZ09wdGlvbih7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgb3B0aW9uczogSUN1c3RvbVNlbGVjdE9wdGlvbnMsIHB1YmxpYyBiaW5kaW5ncz86IElDb21wb25lbnRCaW5kaW5ncykge1xuICAgIHN1cGVyKGVsZW1lbnQsIEN1c3RvbVNlbGVjdC5JRCwgYmluZGluZ3MpO1xuICAgIHRoaXMub3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnMuaW5pdENvbXBvbmVudE9wdGlvbnMoZWxlbWVudCwgQ3VzdG9tU2VsZWN0LCBvcHRpb25zKTtcblxuICBcbiAgICB0aGlzLnNlbGVjdCA9IHRoaXMuZ2V0U2VsZWN0RWxlbWVudCgpO1xuICAgIENvdmVvLiQkKHRoaXMuc2VsZWN0KS5hZGRDbGFzcygnY292ZW8tY3VzdG9tLXNlbGVjdC1oaWRkZW4nKTtcblxuICAgIGxldCBwcm9taXNlT3B0aW9ucyA9IG5ldyBQcm9taXNlPElDdXN0b21PcHRpb25bXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5maWVsZCkge1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMucXVlcnlDb250cm9sbGVyID8gdGhpcy5xdWVyeUNvbnRyb2xsZXIuZ2V0RW5kcG9pbnQoKSA6IENvdmVvLlNlYXJjaEVuZHBvaW50LmVuZHBvaW50c1snZGVmYXVsdCddO1xuICAgICAgICBpZiAoZW5kcG9pbnQpIHtcbiAgICAgICAgICBlbmRwb2ludC5saXN0RmllbGRWYWx1ZXMoeyBmaWVsZDogdGhpcy5vcHRpb25zLmZpZWxkLnRvU3RyaW5nKCksIG1heGltdW1OdW1iZXJPZlZhbHVlczogMTAwIH0pLmRvbmUoKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgbGV0IHJldFZhbCA9IF8ubWFwKHZhbHVlcywgKHYpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IHYudmFsdWUsIHZhbHVlOiB2LnZhbHVlLCBrZXk6IHYudmFsdWUuY2FtZWxpemUoKSB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMub3B0aW9ucy5jdXN0b21Tb3J0ICYmIHRoaXMub3B0aW9ucy5jdXN0b21Tb3J0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgIGxldCBjYW1lbGl6ZWRDdXN0b21Tb3J0ID1fLm1hcCh0aGlzLm9wdGlvbnMuY3VzdG9tU29ydCwgKHYpPT57IHJldHVybiB2LmNhbWVsaXplKCkgfSk7XG4gICAgICAgICAgICAgIGxldCBzb3J0T2JqID0gXy5vYmplY3QoY2FtZWxpemVkQ3VzdG9tU29ydCwgXy5yYW5nZShjYW1lbGl6ZWRDdXN0b21Tb3J0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgICByZXRWYWwgPSBfLnNvcnRCeShyZXRWYWwsIChvYmopID0+IHsgcmV0dXJuIHNvcnRPYmpbb2JqLmtleV07IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXRWYWwgPSBfLm1hcChyZXRWYWwsICh2KSA9PiB7cmV0dXJuIF8ub21pdCh2LCAna2V5Jyl9KTtcbiAgICAgICAgICAgIHJlc29sdmUocmV0VmFsKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCh7ICdlcnJvcic6ICdubyBlbmRwb2ludCEnIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRoaXMub3B0aW9ucy5vcHRpb25zKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5idWlsZFNlbGVjdFN0eWxlZCgpO1xuXG4gICAgcHJvbWlzZU9wdGlvbnMudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RPcHRpb25zID0gdmFsdWVzO1xuICAgICAgdGhpcy5yZW5kZXJTZWxlY3RTdHlsZWQoKTtcbiAgICAgIHRoaXMuc2VsZWN0T3B0aW9uQWN0aW9uKHRoaXMuZ2V0U2VsZWN0ZWRPcHRpb24oKSk7XG4gICAgfSk7XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVOZXdRdWVyeShhcmdzOiBDb3Zlby5JTmV3UXVlcnlFdmVudEFyZ3Mpe1xuICAgIHRoaXMudXBkYXRlSGFzaCh0aGlzLmdldFNlbGVjdGVkT3B0aW9uKCkpO1xuICB9XG4gIHByaXZhdGUgdXBkYXRlSGFzaChzZWxlY3RlZE9wdGlvbjpzdHJpbmcpe1xuICAgIGlmIChzZWxlY3RlZE9wdGlvbil7XG4gICAgICBjb25zdCBoYXNoID0gQ292ZW8uSGFzaFV0aWxzLmdldEhhc2goKTtcbiAgICAgIGNvbnN0IHNlYXJjaGJveE9wdCA9IENvdmVvLkhhc2hVdGlscy5nZXRWYWx1ZSh0aGlzLm9wdGlvbnMubG9jYWxTdG9yYWdlS2V5LCBoYXNoKTtcbiAgICAgIGxldCBzdHJpcHBlZEhhc2ggPSBoYXNoLnJlcGxhY2UoYCR7dGhpcy5vcHRpb25zLmxvY2FsU3RvcmFnZUtleX09JHtzZWFyY2hib3hPcHR9YCwgJycpO1xuICAgICAgY29uc3QgbmV3SGFzaCA9IChzZWFyY2hib3hPcHQgPyBzdHJpcHBlZEhhc2ggOiBoYXNoKTtcblxuICAgICAgaWYobmV3SGFzaCA9PT0gJyMnIHx8IG5ld0hhc2ggPT09ICcnKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGAjJHt0aGlzLm9wdGlvbnMubG9jYWxTdG9yYWdlS2V5fT0ke3NlbGVjdGVkT3B0aW9ufWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoYCR7bmV3SGFzaH0mJHt0aGlzLm9wdGlvbnMubG9jYWxTdG9yYWdlS2V5fT0ke3NlbGVjdGVkT3B0aW9ufWApO1xuICAgICAgfSBcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBnZXRTZWxlY3RFbGVtZW50KCkge1xuICAgIGxldCBzZWxlY3RFbCA9IDxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgPyB0aGlzLmVsZW1lbnQgOiBDb3Zlby4kJCh0aGlzLmVsZW1lbnQpLmZpbmQoJ3NlbGVjdCcpKTtcbiAgICBpZiAoIXNlbGVjdEVsKSB7XG4gICAgICBzZWxlY3RFbCA9IDxIVE1MU2VsZWN0RWxlbWVudD5Db3Zlby4kJCgnc2VsZWN0JykuZWw7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZWN0RWwpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0RWw7XG4gIH1cbiAgcHJpdmF0ZSBidWlsZFNlbGVjdFN0eWxlZCgpIHtcbiAgICAvLyBjcmVhdGUgd3JhcHBlciBjb250YWluZXJcbiAgICBjb25zdCB3cmFwcGVyID0gQ292ZW8uJCQoJ2RpdicsIHsgY2xhc3NOYW1lOiAnY292ZW8tY3VzdG9tLXNlbGVjdCcgfSk7XG4gICAgLy8gaW5zZXJ0IHdyYXBwZXIgYmVmb3JlIHNlbGVjdCBlbGVtZW50IGluIHRoZSBET00gdHJlZVxuICAgIHRoaXMuc2VsZWN0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIuZWwsIHRoaXMuc2VsZWN0KTtcbiAgICAvLyBtb3ZlIHNlbGVjdCBpbnRvIHdyYXBwZXJcbiAgICB3cmFwcGVyLmFwcGVuZCh0aGlzLnNlbGVjdCk7XG5cbiAgICB0aGlzLnNlbGVjdFN0eWxlZCA9IENvdmVvLiQkKCdkaXYnLCB7IGNsYXNzTmFtZTogJ2NvdmVvLWN1c3RvbS1zZWxlY3Qtc3R5bGVkJyB9KTtcbiAgICB0aGlzLmxpc3RPcHRpb25zID0gQ292ZW8uJCQoJ3VsJywgeyBjbGFzc05hbWU6ICdjb3Zlby1jdXN0b20tc2VsZWN0LW9wdGlvbnMnIH0pO1xuXG4gICAgd3JhcHBlci5hcHBlbmQodGhpcy5zZWxlY3RTdHlsZWQuZWwpO1xuICAgIHdyYXBwZXIuYXBwZW5kKHRoaXMubGlzdE9wdGlvbnMuZWwpO1xuXG4gICAgdGhpcy5yZW5kZXJTZWxlY3RTdHlsZWQoKTtcblxuICAgIHRoaXMuc2VsZWN0U3R5bGVkLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZWxlY3RTdHlsZWQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB0aGlzLmxpc3RPcHRpb25zLnRvZ2dsZSgpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdFN0eWxlZC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICB0aGlzLmxpc3RPcHRpb25zLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyU2VsZWN0U3R5bGVkKCkge1xuXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5saXN0T3B0aW9ucy5lbXB0eSgpO1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdC5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5idWlsZFNlbGVjdE9wdGlvbnMoKTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuc2VsZWN0Lm9wdGlvbnMubGVuZ3RoID8gdGhpcy5zZWxlY3Qub3B0aW9uc1t0aGlzLnNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0IDogJyc7XG4gICAgdGhpcy5zZWxlY3RTdHlsZWQudGV4dChjdXJyZW50KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBDb3Zlby4kJCgnbGknLCB7XG4gICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdC5vcHRpb25zLml0ZW0oaSkudmFsdWVcbiAgICAgIH0sIHRoaXMuc2VsZWN0Lm9wdGlvbnMuaXRlbShpKS50ZXh0KTtcbiAgICAgIHRoaXMubGlzdE9wdGlvbnMuYXBwZW5kKGxpc3RJdGVtLmVsKTtcblxuICAgICAgaWYgKGN1cnJlbnQgPT0gdGhpcy5zZWxlY3Qub3B0aW9ucy5pdGVtKGkpLnRleHQpIHtcbiAgICAgICAgbGlzdEl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgICAgbGlzdEl0ZW0ub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2VsZi5zZWxlY3QudmFsdWUgPSBsaXN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIHNlbGYuc2VsZWN0T3B0aW9uQWN0aW9uKHNlbGYuZ2V0U2VsZWN0ZWRPcHRpb24oKSk7XG4gICAgICAgIHNlbGYuc2VsZWN0U3R5bGVkLnRleHQobGlzdEl0ZW0udGV4dCgpKVxuICAgICAgICBzZWxmLnNlbGVjdFN0eWxlZC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIF8uZWFjaChzZWxmLmxpc3RPcHRpb25zLmNoaWxkcmVuKCksIChsaSkgPT4geyBDb3Zlby4kJChsaSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpOyB9KTtcbiAgICAgICAgbGlzdEl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBzZWxmLmxpc3RPcHRpb25zLmhpZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3B0aW9ucygpIHtcbiAgICBDb3Zlby4kJCh0aGlzLnNlbGVjdCkuZW1wdHkoKTtcbiAgICBpZiAodGhpcy5zZWxlY3RPcHRpb25zKSB7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbnMudW5zaGlmdCh7IGxhYmVsOiAnQWxsIENvbnRlbnQnLCB2YWx1ZTogJ2FsbCcgfSk7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbnMgPSBfLnVuaXEodGhpcy5zZWxlY3RPcHRpb25zLCAodikgPT4geyByZXR1cm4gdi5sYWJlbDsgfSk7XG5cbiAgICAgIF8uZWFjaCh0aGlzLnNlbGVjdE9wdGlvbnMsIChvKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbkVsID0gPEhUTUxPcHRpb25FbGVtZW50PkNvdmVvLiQkKCdvcHRpb24nLCB7XG4gICAgICAgICAgdmFsdWU6IG8udmFsdWUsXG4gICAgICAgIH0sIG8ubGFiZWwpLmVsO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlZmF1bHRPcHRpb24gPT09IG8udmFsdWUpIHtcbiAgICAgICAgICBzZWxlY3RPcHRpb25FbC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgQ292ZW8uJCQodGhpcy5zZWxlY3QpLmFwcGVuZChzZWxlY3RPcHRpb25FbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGdldFNlbGVjdGVkT3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdC5vcHRpb25zW3RoaXMuc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXRTZWxlY3RlZE9wdGlvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgbGV0IG5leHRTZWxlY3RlZEluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5zZWxlY3Qub3B0aW9ucywgKG8pPT57XG4gICAgICByZXR1cm4gby52YWx1ZSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gICAgaWYobmV4dFNlbGVjdGVkSW5kZXggPj0gMCl7XG4gICAgICB0aGlzLnNlbGVjdC52YWx1ZSA9IHRoaXMuc2VsZWN0Lm9wdGlvbnNbbmV4dFNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgdGhpcy5zZWxlY3RPcHRpb25BY3Rpb24odGhpcy5nZXRTZWxlY3RlZE9wdGlvbigpKTtcbiAgICAgIHRoaXMuc2VsZWN0U3R5bGVkLnRleHQodGhpcy5zZWxlY3Qub3B0aW9uc1tuZXh0U2VsZWN0ZWRJbmRleF0udGV4dClcbiAgICAgIHRoaXMuc2VsZWN0U3R5bGVkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdE9wdGlvbkFjdGlvbih2YWx1ZTpzdHJpbmcpe1xuICAgIHZhciBtZXNzYWdlID0ge1xuICAgICAgbmFtZTogQ3VzdG9tU2VsZWN0LklELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzZWxlY3RlZE9wdGlvbjogdmFsdWUsXG4gICAgICAgIGdsb2JhbElkUmVmOiB0aGlzLm9wdGlvbnMuZ2xvYmFsSWRSZWZcbiAgICAgIH1cbiAgICB9XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm9wdGlvbnMubG9jYWxTdG9yYWdlS2V5LCB2YWx1ZSk7XG4gICAgd2luZG93LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLCB0aGlzLm9wdGlvbnMubGV4SG9zdCBhcyBzdHJpbmcpO1xuICB9XG59XG5cbkluaXRpYWxpemF0aW9uLnJlZ2lzdGVyQXV0b0NyZWF0ZUNvbXBvbmVudChDdXN0b21TZWxlY3QpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpL0N1c3RvbVNlbGVjdC9DdXN0b21TZWxlY3QudHMiLCJpbXBvcnQgQ29tcG9uZW50ID0gQ292ZW8uQ29tcG9uZW50O1xuaW1wb3J0IEluaXRpYWxpemF0aW9uID0gQ292ZW8uSW5pdGlhbGl6YXRpb247XG5pbXBvcnQgQ29tcG9uZW50T3B0aW9ucyA9IENvdmVvLkNvbXBvbmVudE9wdGlvbnM7XG5pbXBvcnQgSUNvbXBvbmVudEJpbmRpbmdzID0gQ292ZW8uSUNvbXBvbmVudEJpbmRpbmdzO1xuaW1wb3J0IElRdWVyeVJlc3VsdCA9IENvdmVvLklRdWVyeVJlc3VsdDtcbmltcG9ydCBJU3RyaW5nTWFwID0gQ292ZW8uSVN0cmluZ01hcDtcbmltcG9ydCBJRmllbGRWYWx1ZU9wdGlvbnMgPSBDb3Zlby5JRmllbGRWYWx1ZU9wdGlvbnM7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJU3RhY2tvdmVyZmxvd1N0YXRzT3B0aW9ucyB7XG4gIGVuYWJsZVZvdGU/OiBib29sZWFuO1xuICBlbmFibGVTdGF0dXM/OiBib29sZWFuO1xuICBlbmFibGVWaWV3cz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTdGFja292ZXJmbG93U3RhdHMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgSUQgPSAnU3RhY2tvdmVyZmxvd1N0YXRzJztcblxuICAvKipcbiAgICogVGhlIG9wdGlvbnMgZm9yIHRoZSBjb21wb25lbnRcbiAgICogQGNvbXBvbmVudE9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBvcHRpb25zOiBJU3RhY2tvdmVyZmxvd1N0YXRzT3B0aW9ucyA9IHtcbiAgICBlbmFibGVWb3RlOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkQm9vbGVhbk9wdGlvbih7ZGVmYXVsdFZhbHVlOiB0cnVlfSksXG4gICAgZW5hYmxlU3RhdHVzOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkQm9vbGVhbk9wdGlvbih7ZGVmYXVsdFZhbHVlOiB0cnVlfSksXG4gICAgZW5hYmxlVmlld3M6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRCb29sZWFuT3B0aW9uKHtkZWZhdWx0VmFsdWU6IHRydWV9KVxuICB9O1xuXG4gIHByaXZhdGUgY292ZW9GaWVsZFRhYmxlOiBDb3Zlby5GaWVsZFRhYmxlO1xuICBwcml2YXRlIGNvdmVvRmllbGRUYWJsZU9wdGlvbnM6IENvdmVvLklGaWVsZFRhYmxlT3B0aW9ucztcbiAgcHJpdmF0ZSBzdGF0c0NvbnRhaW5lcjogQ292ZW8uRG9tO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBwdWJsaWMgb3B0aW9uczogSVN0YWNrb3ZlcmZsb3dTdGF0c09wdGlvbnMsXG4gICAgYmluZGluZ3M/OiBJQ29tcG9uZW50QmluZGluZ3MsXG4gICAgcHVibGljIHJlc3VsdD86IElRdWVyeVJlc3VsdFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50LCBTdGFja292ZXJmbG93U3RhdHMuSUQsIGJpbmRpbmdzKTtcblxuICAgIHRoaXMub3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnMuaW5pdENvbXBvbmVudE9wdGlvbnMoZWxlbWVudCwgU3RhY2tvdmVyZmxvd1N0YXRzLCBvcHRpb25zKTtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcblxuICAgIHRoaXMuc3RhdHNDb250YWluZXIgPSBDb3Zlby4kJCgnZGl2JywgeyBjbGFzc05hbWU6ICdzdGF0cycgfSk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3RhdHNDb250YWluZXIuZWwpO1xuXG4gICAgdGhpcy5idWlsZFN0YXRzKCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU3RhdHMoKXtcbiAgICBpZih0aGlzLm9wdGlvbnMuZW5hYmxlVm90ZSl7XG4gICAgICB0aGlzLmJ1aWxkU2luZ2xlU3RhdCgndm90ZXMnLCAnc3RhY2tvdmVyZmxvd19zY29yZScpO1xuICAgIH1cbiAgICBpZih0aGlzLm9wdGlvbnMuZW5hYmxlU3RhdHVzKSB7XG4gICAgICBjb25zdCBpc0Fuc3dlcmVkOmJvb2xlYW4gPSAodGhpcy5yZXN1bHQucmF3LnN0YWNrb3ZlcmZsb3dfaXNfYW5zd2VyZWQgJiYgdGhpcy5yZXN1bHQucmF3LnN0YWNrb3ZlcmZsb3dfaXNfYW5zd2VyZWQgPT09IFwiVHJ1ZVwiKTtcbiAgICAgIHRoaXMuYnVpbGRTaW5nbGVTdGF0KCdzdGF0dXMnLCAnc3RhY2tvdmVyZmxvd19hbnN3ZXJfY291bnQnLCBpc0Fuc3dlcmVkKTtcbiAgICB9XG4gICAgaWYodGhpcy5vcHRpb25zLmVuYWJsZVZpZXdzKXtcbiAgICAgIHRoaXMuYnVpbGRTaW5nbGVTdGF0KCd2aWV3cycsICdzdGFja292ZXJmbG93X3ZpZXdfY291bnQnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU2luZ2xlU3RhdChzdGF0TmFtZSwgZmllbGQsIGlzQW5zd2VyQWNjZXB0ZWQ6Ym9vbGVhbj1mYWxzZSl7XG4gICAgbGV0IHN0YXRDb250YWluZXIgPSBDb3Zlby4kJCgnZGl2JyAsIHtjbGFzc05hbWU6c3RhdE5hbWV9KTtcbiAgICBpZihzdGF0TmFtZT09PSdzdGF0dXMnKXtcbiAgICAgIGNvbnN0IGNvdW50ID0gTnVtYmVyKHRoaXMucmVzdWx0LnJhd1tmaWVsZF0gfHwgJycpO1xuICAgICAgc3RhdENvbnRhaW5lci5hZGRDbGFzcyhjb3VudCA+IDAgPyAnYW5zd2VyZWQnOid1bmFuc3dlcmVkJyk7XG4gICAgICBzdGF0Q29udGFpbmVyLmFkZENsYXNzKGlzQW5zd2VyQWNjZXB0ZWQgPyAnYW5zd2VyZWQtYWNjZXB0ZWQnOicnKTtcbiAgICB9XG4gICAgbGV0IHN0YXRWYWx1ZSA9IENvdmVvLiQkKCdkaXYnKTtcbiAgICBsZXQgc3RhdFR4dCA9IENvdmVvLiQkKCdkaXYnKTtcbiAgICBzdGF0Q29udGFpbmVyLmFwcGVuZChzdGF0VmFsdWUuZWwpO1xuICAgIHN0YXRDb250YWluZXIuYXBwZW5kKHN0YXRUeHQuZWwpO1xuICAgIHRoaXMuYWRkU3RhdEZpZWxkKHN0YXRWYWx1ZS5lbCwgZmllbGQpO1xuICAgIG5ldyBDb3Zlby5UZXh0KHN0YXRUeHQuZWwsIHsgdmFsdWU6IENvdmVvLmwoc3RhdE5hbWUpIH0sIHRoaXMuZ2V0QmluZGluZ3MoKSk7XG4gICAgdGhpcy5zdGF0c0NvbnRhaW5lci5hcHBlbmQoc3RhdENvbnRhaW5lci5lbCk7XG4gIH1cblxuICBwcml2YXRlIGFkZFN0YXRGaWVsZChlbGVtZW50OiBIVE1MRWxlbWVudCwgZmllbGQ6IHN0cmluZykge1xuICAgIGNvbnN0IGZpZWxkT3B0aW9uczogSUZpZWxkVmFsdWVPcHRpb25zID0ge1xuICAgICAgZmllbGQ6IGZpZWxkXG4gICAgfVxuICAgIC8vIEZvciBMYXp5IHZlcnNpb24gLi4uXG4gICAgaWYgKENvdmVvLkxhenlJbml0aWFsaXphdGlvbikge1xuICAgICAgQ292ZW8ubG9hZCgnRmllbGRWYWx1ZScpLnRoZW4oKCkgPT4ge1xuICAgICAgICBuZXcgQ292ZW8uRmllbGRWYWx1ZShlbGVtZW50LCBmaWVsZE9wdGlvbnMsIHRoaXMuZ2V0QmluZGluZ3MoKSwgdGhpcy5yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBDb3Zlby5GaWVsZFZhbHVlKGVsZW1lbnQsIGZpZWxkT3B0aW9ucywgdGhpcy5nZXRCaW5kaW5ncygpLCB0aGlzLnJlc3VsdCk7XG4gICAgfVxuICB9XG59XG5cbkluaXRpYWxpemF0aW9uLnJlZ2lzdGVyQXV0b0NyZWF0ZUNvbXBvbmVudChTdGFja292ZXJmbG93U3RhdHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpL1N0YWNrb3ZlcmZsb3dTdGF0cy9TdGFja292ZXJmbG93U3RhdHMudHMiLCJpbXBvcnQgQ29tcG9uZW50ID0gQ292ZW8uQ29tcG9uZW50O1xuaW1wb3J0IEluaXRpYWxpemF0aW9uID0gQ292ZW8uSW5pdGlhbGl6YXRpb247XG5pbXBvcnQgQ29tcG9uZW50T3B0aW9ucyA9IENvdmVvLkNvbXBvbmVudE9wdGlvbnM7XG5pbXBvcnQgSUNvbXBvbmVudEJpbmRpbmdzID0gQ292ZW8uSUNvbXBvbmVudEJpbmRpbmdzO1xuaW1wb3J0IElRdWVyeVJlc3VsdCA9IENvdmVvLklRdWVyeVJlc3VsdDtcbmltcG9ydCBJUmVzdWx0c0NvbXBvbmVudEJpbmRpbmdzID0gQ292ZW8uSVJlc3VsdHNDb21wb25lbnRCaW5kaW5ncztcblxuZXhwb3J0IGludGVyZmFjZSBJU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmtPcHRpb25zIGV4dGVuZHMgQ292ZW8uSVJlc3VsdExpbmtPcHRpb25zIHtcbiAgICB1c2VBc1ByaW50YWJsZT86IGJvb2xlYW47XG4gICAgZW5hYmxlVXJsUmV3cml0ZXI/OiBib29sZWFuO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgaG9zdE5hbWU/OiBzdHJpbmc7XG4gICAgcHJvdG9jb2w/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGZpZWxkcyA9IFtcbiAgICAnQHNmY2FzZWlkJyxcbiAgICAnQG9iamVjdHR5cGUnLFxuICAgICdAc2ZwYXJlbnRpZCcsXG4gICAgJ0BzZmZlZWRpdGVtaWQnLFxuICAgICdAc2ZpZCcsXG4gICAgJ0BzZmNvbnRlbnRkb2N1bWVudGlkJyxcbiAgICAnQHNmaWRlYWlkJyxcbiAgICAnQHNma2JpZCcsXG4gICAgJ0BzZnVybG5hbWUnXG5dO1xuXG5leHBvcnQgY2xhc3MgU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBJRCA9ICdTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluayc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW9ucyBmb3IgdGhlIGNvbXBvbmVudFxuICAgICAqIEBjb21wb25lbnRPcHRpb25zXG4gICAgICovXG4gICAgc3RhdGljIG9wdGlvbnM6IElTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGlua09wdGlvbnMgPSB7XG4gICAgICAgIGVuYWJsZVVybFJld3JpdGVyOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkQm9vbGVhbk9wdGlvbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgICAgICAgdXNlQXNQcmludGFibGU6IENvdmVvLkNvbXBvbmVudE9wdGlvbnMuYnVpbGRCb29sZWFuT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICAgICAgbmFtZTogQ292ZW8uQ29tcG9uZW50T3B0aW9ucy5idWlsZFN0cmluZ09wdGlvbih7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICAgIGhvc3ROYW1lOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkU3RyaW5nT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgfSksXG4gICAgICAgIHByb3RvY29sOiBDb3Zlby5Db21wb25lbnRPcHRpb25zLmJ1aWxkU3RyaW5nT3B0aW9uKHsgZGVmYXVsdFZhbHVlOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgfSlcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcHVibGljIG9wdGlvbnM6IElTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGlua09wdGlvbnMsXG4gICAgICAgIGJpbmRpbmdzPzogSVJlc3VsdHNDb21wb25lbnRCaW5kaW5ncyxcbiAgICAgICAgcHVibGljIHJlc3VsdD86IElRdWVyeVJlc3VsdFxuICAgICkge1xuXG4gICAgICAgIHN1cGVyKGVsZW1lbnQsIFNhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rLklELCBiaW5kaW5ncyk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gQ29tcG9uZW50T3B0aW9ucy5pbml0Q29tcG9uZW50T3B0aW9ucyhlbGVtZW50LCBTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluaywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICBcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZVVybFJld3JpdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29tbXVuaXR5VXJsUmV3cml0ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXNlQXNQcmludGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMucmVzdWx0LmNsaWNrVXJpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3IENvdmVvLlJlc3VsdExpbmsodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsIGJpbmRpbmdzLCByZXN1bHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlDb21tdW5pdHlVcmxSZXdyaXRlcigpIHtcblxuICAgICAgICBjb25zdCBjb21tdW5pdHlVcmwgPSBTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGluay5nZXRDb21tdW5pdHlVcmwodGhpcy5yZXN1bHQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb21tdW5pdHlVcmwpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmNsaWNrVXJpID0gdGhpcy5yZXN1bHRbJ0NsaWNrVXJpJ10gPSB0aGlzLnJlc3VsdC5yYXcuY2xpY2thYmxldXJpID0gdGhpcy5yZXN1bHQucmF3LnN5c2NsaWNrYWJsZXVyaSA9IGNvbW11bml0eVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29tbXVuaXR5TmFtZShvcHRpb25zOklTYWxlc2ZvcmNlQ29tbXVuaXR5UmVzdWx0TGlua09wdGlvbnMpIHtcbiAgICAgICAgbGV0IGNvbW11bml0eU5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvKC4qKVxcL3NcXC8oLiopL2ksICckMScpO1xuICAgICAgICBjb21tdW5pdHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8IChjb21tdW5pdHlOYW1lICE9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA/IGNvbW11bml0eU5hbWUgOiAnJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW11bml0eU5hbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRDb21tdW5pdHlVcmwocmVzdWx0OiBDb3Zlby5JUXVlcnlSZXN1bHQsIG9wdGlvbnM6SVNhbGVzZm9yY2VDb21tdW5pdHlSZXN1bHRMaW5rT3B0aW9ucykge1xuICAgICAgICBjb25zdCBjb21tdW5pdHlOYW1lID0gU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsuZ2V0Q29tbXVuaXR5TmFtZShvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY29tbXVuaXR5UGF0aCA9IGNvbW11bml0eU5hbWUgPyBgLyR7Y29tbXVuaXR5TmFtZX1gIDogJyc7XG4gICAgICAgIGNvbnN0IGNvbW11bml0eUJhc2VVcmwgPSBgJHtvcHRpb25zLnByb3RvY29sfS8vJHtvcHRpb25zLmhvc3ROYW1lfSR7Y29tbXVuaXR5UGF0aH1gO1xuICAgICAgICBsZXQgY29tbXVuaXR5VXJsID0gJyc7XG5cbiAgICAgICAgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnQ2FzZScpIHtcbiAgICAgICAgICAgIGNvbW11bml0eVVybCA9IGAke2NvbW11bml0eUJhc2VVcmx9L3MvY2FzZS8ke3Jlc3VsdC5yYXcuc2ZjYXNlaWR9YDtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucmF3Lm9iamVjdHR5cGUgPT0gJ0ZlZWRJdGVtJyB8fCByZXN1bHQucmF3Lm9iamVjdHR5cGUgPT0gJ0ZlZWRDb21tZW50Jykge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50SWQ6c3RyaW5nID0gcmVzdWx0LnJhdy5zZnBhcmVudGlkIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHBhcmVudElkLnN1YnN0cigwLDMpID09ICcwMDUnID8gJ3F1ZXN0aW9uJyA6ICdmZWVkJztcbiAgICAgICAgICAgIGNvbW11bml0eVVybCA9IGAke2NvbW11bml0eUJhc2VVcmx9L3MvJHtwYXRofS8ke3Jlc3VsdC5yYXcuc2ZmZWVkaXRlbWlkIHx8IHJlc3VsdC5yYXcuc2ZpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnQ29sbGFib3JhdGlvbkdyb3VwJykge1xuICAgICAgICAgICAgY29tbXVuaXR5VXJsID0gYCR7Y29tbXVuaXR5QmFzZVVybH0vcy9ncm91cC8ke3Jlc3VsdC5yYXcuc2ZpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnQ29udGVudFZlcnNpb24nKSB7XG4gICAgICAgICAgICBjb21tdW5pdHlVcmwgPSBgJHtjb21tdW5pdHlCYXNlVXJsfS9zL2NvbnRlbnRkb2N1bWVudC8ke3Jlc3VsdC5yYXcuc2Zjb250ZW50ZG9jdW1lbnRpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnSWRlYScpIHtcbiAgICAgICAgICAgIGNvbW11bml0eVVybCA9IGAke2NvbW11bml0eUJhc2VVcmx9L3MvaWRlYXMjJHtyZXN1bHQucmF3LnNmaWRlYWlkIHx8IHJlc3VsdC5yYXcuc2ZpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcub2JqZWN0dHlwZSA9PSAnT2t0YUNvbW11bml0eUV2ZW50X19jJykge1xuICAgICAgICAgICAgY29tbXVuaXR5VXJsID0gYCR7Y29tbXVuaXR5QmFzZVVybH0vcy9ldmVudD9pZD0ke3Jlc3VsdC5yYXcuc2ZpZH1gO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yYXcuc2ZrYmlkKSB7XG4gICAgICAgICAgICBjb21tdW5pdHlVcmwgPSBgJHtjb21tdW5pdHlCYXNlVXJsfS9zL2FydGljbGUvJHtyZXN1bHQucmF3LnNmdXJsbmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBjb21tdW5pdHlVcmw7XG4gICAgfVxufVxuXG5Jbml0aWFsaXphdGlvbi5yZWdpc3RlckF1dG9DcmVhdGVDb21wb25lbnQoU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmspO1xuSW5pdGlhbGl6YXRpb24ucmVnaXN0ZXJDb21wb25lbnRGaWVsZHMoU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsuSUQsIGZpZWxkcyk7IFxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsvU2FsZXNmb3JjZUNvbW11bml0eVJlc3VsdExpbmsudHMiLCJkZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xuICB9XG59XG5cbi8vIFdlYnBhY2sgb3V0cHV0IGEgbGlicmFyeSB0YXJnZXQgd2l0aCBhIHRlbXBvcmFyeSBuYW1lLlxuLy8gSXQgZG9lcyBub3QgdGFrZSBjYXJlIG9mIG1lcmdpbmcgdGhlIG5hbWVzcGFjZSBpZiB0aGUgZ2xvYmFsIHZhcmlhYmxlIGFscmVhZHkgZXhpc3RzLlxuLy8gSWYgYW5vdGhlciBwaWVjZSBvZiBjb2RlIGluIHRoZSBwYWdlIHVzZSB0aGUgQ292ZW8gbmFtZXNwYWNlIChlZzogZXh0ZW5zaW9uKSwgdGhlbiB0aGV5IGdldCBvdmVyd3JpdHRlblxuLy8gVGhpcyBjb2RlIHN3YXAgdGhlIGN1cnJlbnQgbW9kdWxlIHRvIHRoZSBcInJlYWxcIiBDb3ZlbyB2YXJpYWJsZSwgd2l0aG91dCBvdmVyd3JpdGluZyB0aGUgd2hvbGUgZ2xvYmFsIHZhci5cbi8vIFRoaXMgaXMgdG8gYWxsb3cgZW5kIHVzZXIgdG8gcHV0IENvdmVvUFNDb21wb25lbnRzLmpzIGJlZm9yZSBvciBhZnRlciB0aGUgbWFpbiBDb3Zlb0pzU2VhcmNoLmpzLCB3aXRob3V0IGJyZWFraW5nXG5cbmV4cG9ydCBmdW5jdGlvbiBzd2FwVmFyKHNjb3BlOiBhbnkpIHtcbiAgaWYgKHdpbmRvd1snQ292ZW8nXSA9PSB1bmRlZmluZWQpIHtcbiAgICB3aW5kb3dbJ0NvdmVvJ10gPSBzY29wZTtcbiAgfSBlbHNlIHtcbiAgICBfLmVhY2goXy5rZXlzKHNjb3BlKSwgKGspID0+IHtcbiAgICAgIHdpbmRvd1snQ292ZW8nXVtrXSA9IHNjb3BlW2tdO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU3dhcFZhci50cyJdLCJzb3VyY2VSb290IjoiIn0=