'use strict';

(function () {
  var DETAIL_IMG_MAX_WIDTH = 180;
  var IMG_MAX_WIDTH = 405;

  var containerClass = 'new-products__slider';
  var itemListClass = 'new-products__list';
  var listClass = 'new-products__slider-list';

  var newProductTemplate = document.querySelector('#new-product');
  var productExample = newProductTemplate.content.querySelector('.product');
  var newProductsSection = document.querySelector('.new-products');
  var slideListTemp = document.querySelector('#slide-list');
  var slideListItem = slideListTemp.content.querySelector('.swiper-slide');
  var slideItem;
  var slideList;

  var setImgWidthHeight = function (img, maxWidth) {
    var denominator = img.naturalWidth / img.naturalHeight;

    img.width = img.naturalWidth > maxWidth ?
      maxWidth : img.naturalWidth;

    img.height = img.naturalWidth > maxWidth ?
      Math.round(maxWidth / denominator) : img.naturalHeight;
  };

  var setImgAttributes = function (elementData, img) {
    img.addEventListener('load', function () {
      if (elementData.detail) {
        // eslint-disable-next-line no-invalid-this
        setImgWidthHeight(this, DETAIL_IMG_MAX_WIDTH);
      } else {
        // eslint-disable-next-line no-invalid-this
        setImgWidthHeight(this, IMG_MAX_WIDTH);
      }
    });
  };

  var makeProduct = function (elementData) {
    var product = productExample.cloneNode(true);
    var productTitle = product.querySelector('.product__title');
    var productDesc = product.querySelector('.product__description');
    var productCategory = product.querySelector('.product__category-link');
    var productBtn = product.querySelector('.product__order');
    var productPicture = product.querySelector('.product__picture');
    var productSource = product.querySelector('source');
    var productImage = document.createElement('img');

    window.offersSlider.makeElemOrAttr(productTitle, [elementData.title], ['textContent']);
    window.offersSlider.makeElemOrAttr(productDesc, [elementData.description], ['textContent']);
    window.offersSlider.makeElemOrAttr(productCategory, [elementData.category, elementData.catLink], ['textContent', 'href']);
    window.offersSlider.makeElemOrAttr(productBtn, [elementData.buttonText, elementData.buttonLink], ['textContent', 'href']);

    if (elementData.slideUrl) {
      productImage.classList.add('product__image');

      if (elementData.detail) {
        productImage.classList.add('product__image--detail');
      }

      setImgAttributes(elementData, productImage);

      productImage.src = elementData.slideUrl;
      productSource.srcset = elementData.slideUrl.slice(0, -4) + '.webp';
      productImage.alt = 'Изображение ' + elementData.title;
      productPicture.insertAdjacentElement('beforeend', productImage);
    } else {
      productImage.remove();
    }

    if (elementData.size === 'big') {
      product.classList.add('product--big');
    } else {
      product.classList.add('product--small');
    }

    return product;
  };

  var makeAllProducts = function (productsData) {
    var allProducts = [];

    productsData.forEach(function (it) {
      var product = makeProduct(it);

      allProducts.push(product);
    });

    return allProducts;
  };

  var pushItemsInSlide = function (maxR, element, i, allSlides) {
    if (i === 0) {
      window.util.RATE = 0;
      window.util.RATE_COUNTER = 0;
    }

    if (window.util.RATE_COUNTER === 0 || window.util.RATE_COUNTER >= maxR) {
      slideItem = slideListItem.cloneNode(true);
      slideList = slideItem.querySelector('ul');
      slideList.classList.add(itemListClass);
      allSlides.push(slideItem);
      window.util.RATE_COUNTER = 0;
    }

    if (window.util.RATE_COUNTER < maxR) {
      slideList.appendChild(element);

      window.util.RATE = element.classList.contains('product--big') ?
        2 : 1;

      window.util.RATE_COUNTER = window.util.RATE_COUNTER + window.util.RATE;
    }
  };

  var makeSlides = function (productsData) {
    var allProducts = makeAllProducts(productsData);
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

    if (window.util.MAX_RATE === window.util.MOBILE_SLIDER_RATE) {
      allProducts.forEach(function (it) {
        it.classList.add('swiper-slide');
        allSlides.push(it);
      });
    } else {
      allProducts.forEach(function (it, i) {
        pushItemsInSlide(window.util.MAX_RATE, it, i, allSlides);
      });
    }

    return allSlides;
  };

  window.backend.getSendData(window.data.NEW_PRODUCTS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, newProductsSection, containerClass, listClass, makeSlides, false, window.sliders.removeSlidesSection, false, 'newProducts', true);

  window.newProducts = {
    newProductsSection: newProductsSection,
    containerClass: containerClass,
    listClass: listClass,
    pushItemsInSlide: pushItemsInSlide,
    makeSlides: makeSlides
  };
})();
