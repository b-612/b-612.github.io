'use strict';

(function () {
  var textElemClassMap = {
    wrapper: 'product__text-wrapper',
    title: 'product__title',
    description: 'product__description',
    category: 'product__category',
    link: 'product__category-link',
    order: 'product__order'
  };

  var setRemoveHover = function (evt, isSet) {
    var wrapper = evt.target.closest('.' + textElemClassMap.wrapper);

    var elements = {
      title: wrapper.querySelector('.' + textElemClassMap.title),
      description: wrapper.querySelector('.' + textElemClassMap.description),
      category: wrapper.querySelector('.' + textElemClassMap.category),
      link: wrapper.querySelector('.' + textElemClassMap.link)
    };

    for (var key in elements) {
      if (elements[key]) {
        if (isSet) {
          elements[key].classList.add(textElemClassMap[key] + '--hover');
        } else {
          elements[key].classList.remove(textElemClassMap[key] + '--hover');
        }
      }
    }

    if (isSet) {
      wrapper.classList.add(textElemClassMap.wrapper + '--hover');
      evt.target.classList.add(textElemClassMap.order + '--hover');
    } else {
      wrapper.classList.remove(textElemClassMap.wrapper + '--hover');
      evt.target.classList.remove(textElemClassMap.order + '--hover');
    }
  };

  var setOrderHoverListeners = function () {
    var newProdSlider = document.querySelector('.new-products__slider');
    var orderLinks = Array.from(newProdSlider.querySelectorAll('.product__order'));

    orderLinks.forEach(function (it) {
      it.addEventListener('mouseover', function (evt) {
        setRemoveHover(evt, true);
      });

      it.addEventListener('focus', function (evt) {
        setRemoveHover(evt, true);
      });

      it.addEventListener('mouseout', function (evt) {
        setRemoveHover(evt, false);
      });

      it.addEventListener('blur', function (evt) {
        setRemoveHover(evt, false);
      });
    });
  };

  window.orderBtns = {
    setOrderHoverListeners: setOrderHoverListeners
  };
})();
