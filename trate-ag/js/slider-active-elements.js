'use strict';

(function () {
  var getNavBtns = function (sliderContainer) {
    var allBtns = Array.from(sliderContainer.querySelectorAll('.swiper-button'));

    return allBtns;
  };

  var getCurrentList = function (evt) {
    var container = evt.target.closest('.swiper-container');
    var list = container.querySelector('.swiper-wrapper');

    return list;
  };

  var getLinks = function (container) {
    var links = Array.from(container.querySelectorAll('a'));

    return links;
  };

  var getLinksFirstDownload = function (container) {
    var links = Array.from(container.querySelectorAll('a'));
    links.shift();

    return links;
  };

  var disableElements = function (links) {
    links.forEach(function (it) {
      if (it.closest('.swiper-slide-active')) {
        it.tabIndex = 0;
      } else {
        it.tabIndex = -1;
      }
    });
  };

  var onNavClick = function (evt) {
    window.setTimeout(function () {
      disableElements(getLinks(getCurrentList(evt)));
    }, 500);
  };

  var setListeners = function (btns) {
    btns.forEach(function (it) {
      it.addEventListener('click', onNavClick);
    });
  };

  var onSliderMaked = function (sliderContainer) {
    return function () {
      setListeners(getNavBtns(sliderContainer));

      var item = sliderContainer.querySelector('.swiper-slide');

      if (item) {
        var mutationObserver = new MutationObserver(function () {
          disableElements(getLinks(sliderContainer));
          mutationObserver.disconnect();
        });


        mutationObserver.observe(item, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
          attributeOldValue: true,
          characterDataOldValue: true
        });

        // mutationObserver.disconnect();
      }
    };
  };

  var disableElementsFirst = function (sliderContainer) {
    disableElements(getLinksFirstDownload(sliderContainer));
  };

  window.sliderActiveElements = {
    activeCounter: 0,
    disableElements: disableElements,
    setListeners: setListeners,
    getLinks: getLinks,
    getNavBtns: getNavBtns,
    onSliderMaked: onSliderMaked,
    disableElementsFirst: disableElementsFirst
  };
})();
