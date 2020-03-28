'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 200;
  var SUBSCRIPTIONS_URL_ONE_MONTH = 'https://b-612.github.io/json/yoga/subscriptionOneMonth.json';
  var SUBSCRIPTIONS_URL_SIX_MONTH = 'https://b-612.github.io/json/yoga/subscriptionSixMonths.json';
  var SUBSCRIPTIONS_URL_YEAR = 'https://b-612.github.io/json/yoga/subscriptionYear.json';
  var $section = $('.subscriptions');
  var $subscriptionCardTemp = $.parseHTML($('#subscription').html());
  var $subscriptionBtn = $('.subscriptions__time-btn');

  var makeTime = function makeTime(subscriptionData, textElem, timeElem) {
    if (subscriptionData.isTimeLimit) {
      timeElem.text('с ' + subscriptionData.startTime + ' до ' + subscriptionData.endTime);
    } else {
      textElem.text('Посещение не ограничено по времени');
      timeElem.remove();
    }
  };

  var makeSubscription = function makeSubscription(subscriptionData) {
    var $subscriptionCard = $($subscriptionCardTemp).clone();
    var $subscriptionParam = {
      TITLE: $($subscriptionCard).find('.subscription__title'),
      TEXT: $($subscriptionCard).find('.subscription__description'),
      TIME: $($subscriptionCard).find('.subscription__time'),
      PRICE: $($subscriptionCard).find('.subscription__price-number'),
      ORDER_LINK: $($subscriptionCard).find('.subscription__link')
    };
    window.items.makeText($subscriptionParam.TITLE, subscriptionData.title);
    makeTime(subscriptionData, $subscriptionParam.TEXT, $subscriptionParam.TIME);
    window.items.makeText($subscriptionParam.PRICE, subscriptionData.price);
    window.items.makeHref($subscriptionParam.ORDER_LINK, subscriptionData.orderLink);
    return $($subscriptionCard)[0];
  };

  var onItemHover = window.util.debounce(function (evt) {
    var ANIMATION_TIME = 300;

    if ($(evt.currentTarget).hasClass('subscription')) {
      $('.subscription').not($(evt.currentTarget)).removeClass('subscription--best').find('.subscription__link').hide();
      $(evt.currentTarget).addClass('subscription--best').find('.subscription__link').slideDown(ANIMATION_TIME, function () {
        $(this).show();
      });
    }
  }, DEBOUNCE_INTERVAL);

  var setItemsListeners = function setItemsListeners() {
    if (screen.width >= window.util.screenWidth.TAB_MIN) {
      $('.subscription').on('mouseenter', onItemHover).focus(onItemHover);
    }
  };

  var setStartBest = function setStartBest() {
    $('.subscription:eq(1)').addClass('subscription--best');

    if (screen.width >= window.util.screenWidth.TAB_MIN) {
      $('.subscription').not('.subscription:eq(1)').find('.subscription__link').hide();
    }
  };

  var InquiryParam = {
    URL: SUBSCRIPTIONS_URL_ONE_MONTH,
    ON_SUCCESS: {
      makeItems: window.items.makeItems,
      setTheBest: setStartBest,
      setItemsListeners: setItemsListeners,
      setListHeight: function setListHeight() {
        var startHeight = $('.subscriptions__list').height();
        $('.subscriptions__list').css('min-height', startHeight);
      }
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeSubscription,
    SECTION: $section,
    LIST_CLASS: 'subscriptions__list',
    MAKE_SLIDER: null
  };

  var onTimeBtnClick = function onTimeBtnClick(evt) {
    switch (true) {
      case $(evt.target).hasClass('subscriptions__time-btn--one-month'):
        InquiryParam.URL = SUBSCRIPTIONS_URL_ONE_MONTH;
        window.backend.getItems(InquiryParam);
        break;

      case $(evt.target).hasClass('subscriptions__time-btn--six-months'):
        InquiryParam.URL = SUBSCRIPTIONS_URL_SIX_MONTH;
        window.backend.getItems(InquiryParam);
        break;

      case $(evt.target).hasClass('subscriptions__time-btn--year'):
        InquiryParam.URL = SUBSCRIPTIONS_URL_YEAR;
        window.backend.getItems(InquiryParam);
        break;
    }

    window.subscriptions.onTimeBtnClickCounter++;
  };

  var setBtnsListeners = function setBtnsListeners() {
    $subscriptionBtn.click(function (evt) {
      evt.preventDefault();
      $subscriptionBtn.removeClass('subscriptions__time-btn--current');
      $(evt.target).addClass('subscriptions__time-btn--current');
      onTimeBtnClick(evt);
    });
  };

  var onWindowResize = function onWindowResize() {
    $('.subscriptions__list').css('min-height', '');
    $subscriptionBtn[0].click();
  };

  setBtnsListeners();
  $(window).resize(function () {
    switch (true) {
      case screen.width >= window.util.screenWidth.TAB_MIN && window.subscriptions.lastWindowWidth < window.util.screenWidth.TAB_MIN:
        onWindowResize();
        break;

      case screen.width < window.util.screenWidth.TAB_MIN && window.subscriptions.lastWindowWidth >= window.util.screenWidth.TAB_MIN:
        onWindowResize();
        break;

      case screen.width <= window.util.screenWidth.TAB_MAX && window.subscriptions.lastWindowWidth > window.util.screenWidth.TAB_MAX && screen.width >= window.util.screenWidth.TAB_MIN:
        onWindowResize();
        break;

      case screen.width > window.util.screenWidth.TAB_MAX && window.subscriptions.lastWindowWidth <= window.util.screenWidth.TAB_MAX:
        onWindowResize();
        break;
    }

    window.subscriptions.lastWindowWidth = screen.width;
  });
  window.subscriptions = {
    onTimeBtnClickCounter: 0,
    lastWindowWidth: screen.width
  };
  $subscriptionBtn[0].click();
})();
//# sourceMappingURL=subscription.js.map
