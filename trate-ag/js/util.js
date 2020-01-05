'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var UtilOption = {
    FRAGMENT: document.createDocumentFragment(),
    MOBILE_MIN_WIDTH: 320,
    MOBILE_MAX_WIDTH: 767,
    MOBILE_DIFFERENCE: 447,
    TABLET_MIN_WIDTH: 768,
    TABLET_MAX_WIDTH: 1279,
    DESKTOP_MIN_WIDTH: 1340,
    RETINA_DPI: '144dpi',
    RETINA_DPPX: '1.5dppx',
    RATE: 0,
    RATE_COUNTER: 0,
    MAX_RATE: 0,
    DESK_SLIDER_RATE: 6,
    TABLET_SLIDER_RATE: 4,
    MOBILE_SLIDER_RATE: 2,

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };

  window.util = UtilOption;
})();
