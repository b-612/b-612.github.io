'use strict';

(function () {
  var COUNTER_INCR = 2;

  var containerClass = 'news__slider';
  var listClass = 'news-slider__list';

  var newsItemTemplate = document.querySelector('#news-item');
  var newsItemExample = newsItemTemplate.content.querySelector('.news-item');
  var newsSection = document.querySelector('.news');
  var slideListTemp = document.querySelector('#slide-list');
  var slideListItem = slideListTemp.content.querySelector('.swiper-slide');

  window.backend.getSendData(window.data.NEWS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, newsSection, containerClass, listClass, window.eventsSlider.makeSlides, false, window.sliders.removeSlidesSection, false, 'news', false, 'news-item', newsItemExample, slideListItem, COUNTER_INCR);

  window.newsSlider = {
    newsSection: newsSection,
    containerClass: containerClass,
    listClass: listClass,
  };
})();
