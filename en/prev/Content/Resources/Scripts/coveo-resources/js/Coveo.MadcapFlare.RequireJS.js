requirejs.config({
    enforceDefine: true,
    waitSeconds: 0
});
(function (r, e, a, d, y) { r[a] = r[a] || function () { d = new Event(a); e.dispatchEvent(d); }; })(window, document, 'readyToInitCoveo');
require(['Coveo__temporary'], function (Coveo) {
    // Coveo Framework is loaded now, safe to do other require calls
    // that depend on that config.
    var requireScript = document.getElementById('coveoRequireScript');
    var resourceUri = requireScript ? requireScript.getAttribute('src') : '';
    if (resourceUri) {
        var uriParts = resourceUri.split('/');
        uriParts.pop();
        uriParts.push('Coveo.Okta.js');
        require([uriParts.join('/')], function (Custo) {
            window['Coveo'] = Coveo._.extend({}, Coveo, Custo);
            readyToInitCoveo();
        });
    }
});
