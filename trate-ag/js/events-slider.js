'use strict';

(function () {
  var COUNTER_INCR = 3;

  var containerClass = 'events__slider';
  var listClass = 'events__slider-list';

  var eventTemplate = document.querySelector('#event');
  var eventExample = eventTemplate.content.querySelector('.event');
  var eventsSection = document.querySelector('.events');
  var slideListTemp = document.querySelector('#slide-list');
  var slideListItem = slideListTemp.content.querySelector('.swiper-slide');

  var makeEventsNews = function (eventsData, itemClass, itemExample) {
    var allEvents = [];

    eventsData.forEach(function (it, i) {
      var item = itemExample.cloneNode(true);
      var itemDate = item.querySelector('.' + itemClass + '__date');
      var itemTitle = item.querySelector('.' + itemClass + '__title');
      var description = item.querySelector('.' + itemClass + '__description');
      var itemLink = item.querySelector('.' + itemClass + '__link');

      window.offersSlider.makeElemOrAttr(itemDate, [it.date, it.dateTime], ['textContent', 'dateTime']);
      window.offersSlider.makeElemOrAttr(itemTitle, [it.title], ['textContent']);
      window.offersSlider.makeElemOrAttr(description, [it.description], ['textContent']);
      window.offersSlider.makeElemOrAttr(itemLink, [it.link], ['href']);
      window.offersSlider.setStyleBackImg(it.src, item, itemClass + '--', i);

      allEvents.push(item);
    });

    return allEvents;
  };

  var pushItemsInSlide = function (maxR, element, i, allSlides, slListItem, section, counterIncr) {
    if (i === 0) {
      window.util.RATE = 0;
      window.util.RATE_COUNTER = 0;
    }

    if (window.util.RATE_COUNTER === 0 || window.util.RATE_COUNTER >= maxR) {
      var slideItem = slListItem.cloneNode(true);
      window.util.slideItem = slideItem;
      var slList = window.util.slideItem.querySelector('ul');
      window.util.slList = slList;
      allSlides.push(window.util.slideItem);
      window.util.slList.classList.add(section.className + '__list');
      window.util.RATE_COUNTER = 0;
    }

    if (window.util.RATE_COUNTER < maxR) {
      window.util.slList.appendChild(element);

      window.util.RATE_COUNTER = window.util.RATE_COUNTER + counterIncr;
    }
  };

  var makeSlides = function (itemsData, itemClass, itemExample, slListItem, counterIncr, section) {
    var allItems = makeEventsNews(itemsData, itemClass, itemExample);
    var allSlides = [];

    switch (true) {
      case screen.width >= window.util.DESKTOP_MIN_WIDTH :
        window.util.MAX_RATE = window.util.DESK_SLIDER_RATE;
        break;
      case screen.width >= window.util.TABLET_MIN_WIDTH :
        window.util.MAX_RATE = window.util.TABLET_SLIDER_RATE;
        break;
      default :
        window.util.MAX_RATE = window.util.MOBILE_SLIDER_RATE;
    }

    if (window.util.MAX_RATE === window.util.DESK_SLIDER_RATE || window.util.MAX_RATE === window.util.TABLET_SLIDER_RATE) {
      allItems.forEach(function (it, i) {
        pushItemsInSlide(window.util.MAX_RATE, it, i, allSlides, slListItem, section, counterIncr);
      });
    } else {
      allItems.forEach(function (it) {
        it.classList.add('swiper-slide');
        allSlides.push(it);
      });
    }

    var globalWindow = window[section.className + 'Slider'];
    globalWindow.itemClass = itemClass;
    globalWindow.itemExample = itemExample;
    globalWindow.slListItem = slListItem;
    globalWindow.counterIncr = counterIncr;
    globalWindow.section = section;

    return allSlides;
  };

  window.backend.getSendData(window.data.EVENTS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, eventsSection, containerClass, listClass, makeSlides, false, window.sliders.removeSlidesSection, false, 'events', false, 'event', eventExample, slideListItem, COUNTER_INCR);

  window.eventsSlider = {
    eventsSection: eventsSection,
    containerClass: containerClass,
    listClass: listClass,
    makeEventsNews: makeEventsNews,
    makeSlides: makeSlides
  };
})();
