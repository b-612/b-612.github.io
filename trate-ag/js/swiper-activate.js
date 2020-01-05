'use strict';

(function () {
  var activeSliders = [];

  var activateOffersSlider = function () {
    var offersSlider = new Swiper ('.offers-slider', {
      // Optional parameters
      cssMode: true,
      direction: 'horizontal',
      loop: true,
      simulateTouch: false,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
        touchRatio: 0
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      mousewheel: true,
      keyboard: true,
    });
    activeSliders.push(offersSlider);
  };

  var activateNewProductsSlider = function () {
    var newProductsSlider = new Swiper ('.new-products__slider', {
      // Optional parameters
      cssMode: true,
      direction: 'horizontal',
      loop: true,
      simulateTouch: false,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
        touchRatio: 0
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      mousewheel: true,
      keyboard: true,
    });

    window.setTimeout(function () {
      window.orderBtns.setOrderHoverListeners();
    }, 500);

    activeSliders.push(newProductsSlider);
  };

  var activateEventsSlider = function () {
    var eventsSlider = new Swiper ('.events__slider', {
      // Optional parameters
      cssMode: true,
      direction: 'horizontal',
      loop: true,
      simulateTouch: false,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      mousewheel: true,
      keyboard: true,
    });
    activeSliders.push(eventsSlider);
  };

  var activateNewsSlider = function () {
    var newsSlider = new Swiper ('.news__slider', {
      // Optional parameters
      cssMode: true,
      direction: 'horizontal',
      loop: true,
      simulateTouch: false,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      mousewheel: true,
      keyboard: true,
    });
    activeSliders.push(newsSlider);
  };

  window.swiperActivate = {
    activateOffersSlider: activateOffersSlider,
    activateNewProductsSlider: activateNewProductsSlider,
    activateEventsSlider: activateEventsSlider,
    activateNewsSlider: activateNewsSlider,
    activeSliders: activeSliders
  };
})();
