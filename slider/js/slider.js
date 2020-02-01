'use strict';

(function () {
  var MOB_MAX = 768;

  var activateSlider = function () {
    $('.slider').slick({
      infinite: true,
      accessibility: true,
      zIndex: 1000,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow:
        '<button type="button" class="carousel-control slider__arrow slider__arrow--prev">' +
        '<span class="visually-hidden">Предыдущий слайд</span>' +
        '</button>',
      nextArrow:
        '<button type="button" class="carousel-control slider__arrow slider__arrow--next">' +
        '<span class="visually-hidden">Следующий слайд</span>' +
        '</button>',
      dots: false,

      responsive: [
        {
          breakpoint: MOB_MAX,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            arrows: false,
            dots: true,
            dotsClass: 'slick-dots list-unstyled'
          }
        }
      ]
    });
  };

  var activateCustomPagination = function () {
    $('.slider-pagination').slick({
      slidesToShow: 4,
      asNavFor: '.slider',
      focusOnSelect: true,
      accessibility: true,
      zIndex: 1000,
      slidesPerRow: 4,

      responsive: [
        {
          breakpoint: MOB_MAX,
          settings: "unslick"
        }
      ]
    });
  };

  var onSlideChange = function () {
    var $currentSlideClass = $('.slider .slick-current').attr('class').split('--')[1].split(' ')[0];

    $('.slider-pagination__nav-item').removeClass('slick-current');
    $('.slider-pagination__nav-item' + '--' + $currentSlideClass).addClass('slick-current');
  };

  var disablePagination = function () {
    $('.slider-pagination').slick('unslick');
  };

  activateSlider();
  activateCustomPagination();
  $('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    onSlideChange();
  });

  $(window).resize(window.util.debounce(function () {
    if ($(window).width() >= MOB_MAX) {
      disablePagination();
      activateCustomPagination();
    } else {
      disablePagination();
    }
  }));
})();
