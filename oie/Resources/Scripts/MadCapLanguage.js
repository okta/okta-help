
(function () {
    require(['languages.js'], function (languages) {
        var data = languages.data;
        var defaultLang = data[0].code;
        var langAndTarget = new Array();
        for (var i = 0; i < data.length; i++) {
            langAndTarget[data[i].code] = data[i].target;
        }
        // Fetch navigator settings. Property navigator.browserLanguage is IE and Edge exclusive.
        var windowNavigatorLanguage = window.navigator.browserLanguage;
        if (typeof (windowNavigatorLanguage) == "undefined") {
            windowNavigatorLanguage = window.navigator.language;
        }
        // If no navigator language setting:
        if (typeof (windowNavigatorLanguage) == "undefined") {
            window.location.href = langAndTarget[defaultLang];
        }
        // Else search for match:
        else {
            var browserLang = windowNavigatorLanguage.toLowerCase();
            var delimiter = browserLang.indexOf("-");
            var browserShortLang = delimiter >= 0 ? browserLang.substring(0, delimiter) : browserLang;
            // Exact match
            if (typeof (langAndTarget[browserLang]) != "undefined") {
                window.location.href = langAndTarget[browserLang];
            }
            // Short exact match
            else if (typeof (langAndTarget[browserShortLang]) != "undefined") {
                window.location.href = langAndTarget[browserShortLang];
            }
            else {
                // Short approximate match
                var found = false;
                for (var i = 0; i < data.length; i++) {
                    delimiter = data[i].code.indexOf("-");
                    var shortCode = delimiter >= 0 ? data[i].code.substring(0, delimiter) : data[i].code;
                    if (shortCode == browserShortLang) {
                        window.location.href = langAndTarget[data[i].code];
                        found = true;
                    }
                }
                // No match
                if (!found) {
                    window.location.href = langAndTarget[defaultLang];
                }
            }
        }
    });
})();