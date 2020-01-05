'use strict';

(function () {
  var SliderSectionClass = [
    'offers',
    'new-products',
    'events',
    'news'
  ];

  var SliderActivateFunction = [
    window.swiperActivate.activateOffersSlider,
    window.swiperActivate.activateNewProductsSlider,
    window.swiperActivate.activateEventsSlider,
    window.swiperActivate.activateNewsSlider
  ];

  var setSliderMakedListeners = function () {
    SliderSectionClass.forEach(function (it, i) {
      document.addEventListener(it + 'SliderMaked', function () {
        SliderActivateFunction[i]();
      });
    });
  };

  var sliderTemplate = document.querySelector('#swiper-slider');
  var sliderTemplateNoPag = document.querySelector('#swiper-slider-no-pag');

  var makeSlidesContainer = function (isPag) {
    var sliderContainer;

    sliderContainer = isPag ?
      sliderTemplate.content.querySelector('.swiper-container').cloneNode(true) :
      sliderTemplateNoPag.content.querySelector('.swiper-container').cloneNode(true);

    return sliderContainer;
  };

  var removeSlidesSection = function (section) {
    section.remove();
  };

  var makeSlider = function (slides, section, containerClass, listClass, isPag) {
    var oldSwiperContainer = section.querySelector('.swiper-container');

    if (oldSwiperContainer) {
      oldSwiperContainer.remove();
    }

    var sliderMaked = new Event(section.className + 'SliderMaked');


    var container = makeSlidesContainer(isPag);
    var slidesList = container.querySelector('.swiper-wrapper');

    container.classList.add(containerClass);
    slidesList.classList.add(listClass);

    slides.forEach(function (it) {
      slidesList.appendChild(it);
    });

    window.util.FRAGMENT.appendChild(container);
    if (section.querySelector('.container')) {
      section.querySelector('.container').appendChild(window.util.FRAGMENT);
    } else {
      section.appendChild(window.util.FRAGMENT);
    }

    document.addEventListener(section.className + 'SliderMaked', window.sliderActiveElements.onSliderMaked(container));
    document.dispatchEvent(sliderMaked);
  };

  window.sliders = {
    makeSlider: makeSlider,
    removeSlidesSection: removeSlidesSection,
    setSliderMakedListeners: setSliderMakedListeners
  };
})();
