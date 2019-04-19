
requirejs.config({
    enforceDefine: true,
    waitSeconds: 0
});

(function (r, e, a, d, y) { r[a] = r[a] || function () { d = new Event(a); e.dispatchEvent(d); }; })(window, document, 'readyToInitCoveo');
require(['Coveo__temporary'], function (Coveo) {
    // Coveo Framework is loaded now, safe to do other require calls
    // that depend on that config.
    require(['../../Resources/Scripts/coveo-resources/js/Coveo.Okta.js'], function (Custo) {
        window['Coveo'] = Coveo._.extend({}, Coveo, Custo);
        readyToInitCoveo();
    });
});