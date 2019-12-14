'use strict';

(function () {
  var TABLET_MAX_WIDTH = 1279;

  var navToggle = document.querySelector('.page-header__nav-toggle');

  var isNavClosed = function () {
    return navToggle.classList.contains('page-header__nav-toggle--nav-closed');
  };

  var pageHeader = document.querySelector('.page-header');

  var Elements = {
    pageHeader: pageHeader,
    headerLogo: pageHeader.querySelector('.page-header__logo'),
    navToggle: navToggle,
    mainNav: pageHeader.querySelector('.main-nav'),
    headerLink: pageHeader.querySelector('.page-header__link')
  };

  var elementNavMap = {
    'pageHeader': 'page-header--nav-closed',
    'headerLogo': 'page-header__logo--nav-closed',
    'navToggle': 'page-header__nav-toggle--nav-closed',
    'closeToggle': 'page-header__nav-toggle--nav-opened',
    'mainNav': 'main-nav--closed',
    'headerLink': 'action-link--nav-closed'
  };

  var addClasses = function (element, adClass) {
    element.classList.add(adClass);
    if (element === Elements.navToggle) {
      element.classList.remove(elementNavMap['closeToggle']);
    }
  };

  var removeClasses = function (element, adClass) {
    element.classList.remove(adClass);
    if (element === Elements.navToggle) {
      element.classList.add(elementNavMap['closeToggle']);
    }
  };

  var toggleNavigation = function (isClosed) {
    if (isClosed) {
      for (var key in Elements) {
        if (Elements.hasOwnProperty(key)) {
          removeClasses(Elements[key], elementNavMap[key]);
        }
      }
    } else {
      for (key in Elements) {
        if (Elements.hasOwnProperty(key)) {
          addClasses(Elements[key], elementNavMap[key]);
        }
      }
    }

    Elements.navToggle.blur();
  };

  var checkWindowSize = function () {
    if (window.matchMedia('(max-width: ' + TABLET_MAX_WIDTH + 'px').matches) {
      toggleNavigation(isNavClosed());
    }
  };

  checkWindowSize();

  var onNavToggleClick = function () {
    checkWindowSize();
  };

  var onWindowResize = function () {
    if (screen.width <= TABLET_MAX_WIDTH) {
      navToggle.classList.remove('page-header__nav-toggle--nav-closed');
      toggleNavigation(isNavClosed());
    }
  };

  navToggle.addEventListener('click', onNavToggleClick);
  window.addEventListener('resize', onWindowResize);
})();
