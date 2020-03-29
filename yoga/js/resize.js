'use strict';

(function () {
  var setLastWindowWidth = function setLastWindowWidth() {
    setLastWindowWidth.lastWindowWidth = screen.width;
  };

  var DirectionParam = {
    DATA: window.items.directionsData,
    MAKE_ITEM: window.directions.makeDirection,
    SECTION: $('.directions'),
    LIST_CLASS: 'directions__list'
  };

  var makeDirections = function makeDirections(params) {
    window.items.makeItems(params.DATA, params.MAKE_ITEM, params.SECTION, params.LIST_CLASS);
  };

  $(window).resize(function () {
    switch (true) {
      case screen.width >= window.util.screenWidth.MOB_SUBSCR_MIN && setLastWindowWidth.lastWindowWidth < window.util.screenWidth.MOB_SUBSCR_MIN:
        window.subscriptions.resizeSubscr();
        break;

      case screen.width >= window.util.screenWidth.TAB_MIN && setLastWindowWidth.lastWindowWidth < window.util.screenWidth.TAB_MIN:
        window.subscriptions.resizeSubscr();
        makeDirections(DirectionParam);
        break;

      case screen.width < window.util.screenWidth.TAB_MIN && setLastWindowWidth.lastWindowWidth >= window.util.screenWidth.TAB_MIN:
        window.subscriptions.resizeSubscr();
        makeDirections(DirectionParam);
        break;

      case screen.width <= window.util.screenWidth.TAB_MAX && setLastWindowWidth.lastWindowWidth > window.util.screenWidth.TAB_MAX && screen.width >= window.util.screenWidth.TAB_MIN:
        window.subscriptions.resizeSubscr();
        break;

      case screen.width > window.util.screenWidth.TAB_MAX && setLastWindowWidth.lastWindowWidth <= window.util.screenWidth.TAB_MAX:
        window.subscriptions.resizeSubscr();
        break;
    }

    setLastWindowWidth();
  });
  setLastWindowWidth();
})();
//# sourceMappingURL=resize.js.map
