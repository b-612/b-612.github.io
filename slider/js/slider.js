'use strict';

(function () {
  var MOB_MAX = 768;

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
    // asNavFor: '.slider-pagination',

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

  $('.slider-pagination').slick({
    slidesToShow: 4,
    asNavFor: '.slider',
    focusOnSelect: true,
    accessibility: true,
    zIndex: 1000,
    centerMode: true,
    slidesPerRow: 4,

    responsive: [
      {
        breakpoint: MOB_MAX,
        settings: "unslick"
      }
    ]
  });
})();
