'use strict';

(function () {
  var offerTemlate = document.querySelector('#offer');
  var offerExample = offerTemlate.content.querySelector('.offers-slide');
  var offerSection = document.querySelector('.offers');
  var containerClass = 'offers-slider';
  var listClass = 'offers-slider__list';

  var makeElemOrAttr = function (itemElem, dataElemArr, itemElemOrAttrArr) {
    for (var i = 0; i < dataElemArr.length; i++) {
      if (dataElemArr[i]) {
        itemElem[itemElemOrAttrArr[i]] = dataElemArr[i];
      } else {
        itemElem.remove();
        break;
      }
    }
  };

  var setStyleBackImg = function (itemImgData, item, itemMixClass, i) {
    item.classList.add(itemMixClass + (i + 1));

    if (itemImgData) {
      var style = '<style>'
        +
          '@media (max-width: ' + window.util.MOBILE_MAX_WIDTH + 'px) {\n'
        +
          '  .' + itemMixClass + (i + 1) + ' {\n'
        +
          '    background-image: url("' + itemImgData.slice(0, -9) + '-mob@1x.jpg");\n'
        +
          '  }\n\n'
        +
          '    @media (min-resolution: ' + window.util.RETINA_DPPX + '), (min-resolution: ' + window.util.RETINA_DPPX + ') {\n'
        +
          '  .' + itemMixClass + (i + 1) + ' {\n'
        +
          '      background-image: url("' + itemImgData.slice(0, -9) + '-mob@2x.jpg");\n'
        +
          '    }\n' +
          '  }\n'
        +
          '}\n\n'
        +
        '@media (min-width: ' + window.util.TABLET_MIN_WIDTH + 'px) and (max-width: ' + window.util.TABLET_MAX_WIDTH + 'px) {\n'
        +
        '  .' + itemMixClass + (i + 1) + ' {\n'
        +
        '    background-image: url("' + itemImgData.slice(0, -9) + '-tab@1x.jpg");\n'
        +
        '  }\n\n'
        +
        '    @media (min-resolution: ' + window.util.RETINA_DPPX + '), (min-resolution: ' + window.util.RETINA_DPPX + ') {\n'
        +
        '  .' + itemMixClass + (i + 1) + ' {\n'
        +
        '      background-image: url("' + itemImgData.slice(0, -9) + '-tab@2x.jpg");\n'
        +
        '    }\n' +
        '  }\n'
        +
        '}\n\n'
        +
          '@media (min-width: ' + window.util.DESKTOP_MIN_WIDTH + 'px) {\n'
        +
          '  .' + itemMixClass + (i + 1) + ' {\n'
        +
          '    background-image: url("' + itemImgData + '");\n'
        +
          '  }\n'
        +
          '}</style>';

      item.insertAdjacentHTML('afterbegin', style);
    }
  };

  var makeOffers = function (offers) {
    var allOfferItems = [];

    offers.forEach(function (it, i) {
      var offer = offerExample.cloneNode(true);
      var offerTitle = offer.querySelector('.offers-slide__title');
      var offerDescription = offer.querySelector('.offers-slide__description');
      var offerButton = offer.querySelector('.offers-slide__link');

      makeElemOrAttr(offerTitle, [it.title], ['textContent']);
      makeElemOrAttr(offerDescription, [it.description], ['textContent']);
      makeElemOrAttr(offerButton, [it.buttonText, it.buttonLink], ['textContent', 'href']);
      setStyleBackImg(it.slideUrl, offer, 'offers-slide--', i);

      allOfferItems.push(offer);
    });

    return allOfferItems;
  };

  window.backend.getSendData(window.data.OFFERS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, offerSection, containerClass, listClass, makeOffers, false, window.sliders.removeSlidesSection, false, 'offers', true);

  window.offersSlider = {
    offerSection: offerSection,
    containerClass: containerClass,
    listClass: listClass,
    makeOffers: makeOffers,
    makeElemOrAttr: makeElemOrAttr,
    setStyleBackImg: setStyleBackImg
  };
})();
