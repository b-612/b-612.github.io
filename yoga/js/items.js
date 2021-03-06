'use strict';

(function () {
  var makeElemAttr = function makeElemAttr(itemElem, dataElemArr, itemElemOrAttrArr) {
    for (var i = 0; i < dataElemArr.length; i++) {
      if (dataElemArr[i]) {
        itemElem.setAttribute(itemElemOrAttrArr[i], dataElemArr[i]);
      } else {
        itemElem.remove();
        break;
      }
    }
  };

  var makeText = function makeText(element, data) {
    if (data) {
      element.text(data);
    } else {
      element.remove();
    }
  };

  var makeHref = function makeHref(element, data) {
    if (data) {
      element.attr('href', data);
    } else {
      element.remove();
    }
  };

  var makeSources = function makeSources(deviceVersions, imageData, imgFormats) {
    if (imageData) {
      var sources = [];
      $.each(deviceVersions, function (i, device) {
        $.each(imgFormats, function (j, format) {
          var source = document.createElement('source');

          if (format === 'webp') {
            if (i !== 'mob') {
              makeElemAttr(source, ['image/webp', "(min-width: ".concat(device, ")"), "img/".concat(imageData, "-").concat(i, "@1x.").concat(format, " 1x, img/").concat(imageData, "-").concat(i, "@2x.").concat(format, " 2x")], ['type', 'media', 'srcset']);
            } else {
              makeElemAttr(source, ['image/webp', "img/".concat(imageData, "-").concat(i, "@1x.").concat(format, " 1x, img/").concat(imageData, "-").concat(i, "@2x.").concat(format, " 2x")], ['type', 'srcset']);
            }
          } else {
            if (i !== 'mob') {
              makeElemAttr(source, ['(min-width: ' + device + ')', "img/".concat(imageData, "-").concat(i, "@1x.").concat(format, " 1x, img/").concat(imageData, "-").concat(i, "@2x.").concat(format, " 2x")], ['media', 'srcset']);
            }
          }

          if (source.attributes.length > 0) {
            sources.unshift(source);
          }
        });
      });
      return sources;
    }

    return null;
  };

  var setImgAttr = function setImgAttr(imgElem, imgData, title) {
    imgElem.attr('src', "img/".concat(imgData, "-mob@1x.jpg"));
    imgElem.attr('srcset', "img/".concat(imgData, "-mob@2x.jpg 2x"));
    imgElem.attr('alt', title);
    imgElem.attr('width', '250');
    imgElem.attr('height', '200');
  };

  var makeItemImage = function makeItemImage(imgElem, imageData, deviceVersions, imgFormats) {
    var picture = document.createElement('picture');
    $.each(makeSources(deviceVersions, imageData, imgFormats), function () {
      picture.appendChild(this);
    });
    picture.appendChild($(imgElem)[0]);
    return picture;
  };

  var makeItems = function makeItems(itemsData, makeItem, section, listClass, makeSlider) {
    var ANIMATION_TIME = 300;
    var itemsArgs = arguments;
    var setTheBest = itemsArgs[itemsArgs.length - 2];
    var setItemsListeners = itemsArgs[itemsArgs.length - 1];
    var fragment = window.util.fragment;
    var list = section.find('.' + listClass);

    if (section.hasClass('directions') && !window.items.directionsData) {
      window.items.directionsData = itemsData;
    }

    if (section.hasClass('directions') && screen.width >= window.util.screenWidth.TAB_MIN) {
      var $itemsWrapper = $('<div>').addClass('directions__items-wrapper');
      var $btnLookMore = $('<a>', {
        href: '#'
      }).addClass('directions__watch-more').text('Смотреть больше');
      var firstItem = makeItem(window.items.directionsData[0]);

      for (var i = 1; i < window.items.directionsData.length; i += 1) {
        var item = makeItem(window.items.directionsData[i]);
        $(item).addClass('direction--small');
        $($itemsWrapper)[0].appendChild(item);
      }

      $itemsWrapper.append($btnLookMore);
      $(firstItem).addClass('direction--big');
      fragment.appendChild(firstItem);
      fragment.appendChild($($itemsWrapper)[0]);
    } else if (section.hasClass('directions')) {
      $.each(window.items.directionsData, function () {
        fragment.appendChild(makeItem(this));
      });
    } else {
      $.each(itemsData, function () {
        fragment.appendChild(makeItem(this));
      });
    }

    switch (true) {
      case section.hasClass('subscriptions') && window.subscriptions.onTimeBtnClickCounter > 1:
        if (screen.width >= window.util.screenWidth.TAB_MIN) {
          var listHeight = list.height();
          list.css('min-height', listHeight).animate({
            opacity: 0
          }, ANIMATION_TIME, function () {
            $(this).empty();
            this.appendChild(fragment);
            setTheBest();
            setItemsListeners();
            $(this).animate({
              opacity: 1
            }, ANIMATION_TIME);
          });
        } else {
          list.animate({
            opacity: 0
          }, ANIMATION_TIME, function () {
            $(this).empty();
            this.appendChild(fragment);
            $(this).animate({
              opacity: 1
            }, ANIMATION_TIME);
          });
        }

        break;

      case listClass === 'members-slider' || listClass === 'reviews-slider':
        section.find('.' + listClass).empty()[0].appendChild(fragment);
        makeSlider();
        break;

      default:
        section.find('.' + listClass).empty()[0].appendChild(fragment);
    }
  };

  var removeSection = function removeSection(section) {
    return function () {
      section.remove();
    };
  };

  window.items = {
    makeText: makeText,
    makeHref: makeHref,
    makeItemImage: makeItemImage,
    setImgAttr: setImgAttr,
    removeSection: removeSection,
    makeItems: makeItems
  };
})();
//# sourceMappingURL=items.js.map
