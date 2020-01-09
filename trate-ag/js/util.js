'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var UtilOption = {
    FRAGMENT: document.createDocumentFragment(),

    MOBILE_MIN_WIDTH: 320,
    MOBILE_MAX_WIDTH: 767,
    MOBILE_DIFFERENCE: 447,
    TABLET_MIN_WIDTH: 768,
    MOB_NAV_MAX_WIDTH: 999,
    TABLET_MAX_WIDTH: 1339,
    DESKTOP_MIN_WIDTH: 1340,

    RETINA_DPI: '144dpi',
    RETINA_DPPX: '1.5dppx',

    RATE: 0,
    RATE_COUNTER: 0,
    MAX_RATE: 0,
    MOBILE_SLIDER_RATE: 2,
    TABLET_SLIDER_RATE: 4,
    DESK_SLIDER_RATE: 6,

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
