'use strict';

(function () {
  var checkWindowSize = function () {
    if (window.matchMedia('(max-width: ' + window.util.MOBILE_MAX_WIDTH + 'px').matches) {
      window.mainNav.toggleNav();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > window.util.MOBILE_MAX_WIDTH) {
      window.mainNav.addDesktopListeners();
      window.mainNav.removeMobileListeners();
    }
  };

  var onWindowResize = window.util.debounce(function () {
    if (screen.width < window.util.TABLET_MIN_WIDTH) {
      window.mainNav.toggleNavFromResize();
      window.mainNav.removeMobileListeners();
      window.mainNav.removeDesktopListeners();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > window.util.MOBILE_MAX_WIDTH) {
      window.mainNav.removeDesktopListeners();
      window.mainNav.removeMobileListeners();
      window.mainNav.addDesktopListeners();
    }

    window.mainNav.onItemMouseoutDesk();

    window.swiperActivate.activeSliders.forEach(function (it) {
      it.destroy();
    });

    window.sliders.makeSlider(window.offersSlider.makeOffers(window.backend.xhrResults.offers), window.offersSlider.offerSection, window.offersSlider.containerClass, window.offersSlider.listClass, true);

    window.sliders.makeSlider(window.newProducts.makeSlides(window.backend.xhrResults.newProducts), window.newProducts.newProductsSection, window.newProducts.containerClass, window.newProducts.listClass, true);

    window.sliders.makeSlider(window.eventsSlider.makeSlides(window.backend.xhrResults.events, window.eventsSlider.itemClass, window.eventsSlider.itemExample, window.eventsSlider.slListItem, window.eventsSlider.counterIncr, window.eventsSlider.section), window.eventsSlider.eventsSection, window.eventsSlider.containerClass, window.eventsSlider.listClass, false);

    window.sliders.makeSlider(window.eventsSlider.makeSlides(window.backend.xhrResults.news, window.newsSlider.itemClass, window.newsSlider.itemExample, window.newsSlider.slListItem, window.newsSlider.counterIncr, window.newsSlider.section), window.newsSlider.newsSection, window.newsSlider.containerClass, window.newsSlider.listClass, false);
  });

  checkWindowSize();
  window.addEventListener('resize', onWindowResize);
})();
