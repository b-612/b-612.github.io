'use strict';

(function () {
  var body = document.querySelector('body');
  var elementNavClosedMap = {
    'navToggle': 'nav-toggle--closed',
    'mainNav': 'main-nav--closed',
    'mainNavList': 'main-nav__list--closed'
  };

  var elementNavOpenedMap = {
    'navToggle': 'nav-toggle--opened',
    'mainNav': 'main-nav--opened',
    'mainNavList': 'main-nav__list--opened'
  };

  var mainNav = document.querySelector('.main-nav');

  var ToggleElements = {
    mainNav: mainNav,
    navToggle: mainNav.querySelector('.nav-toggle'),
    mainNavList: mainNav.querySelector('.main-nav__list')
  };

  var Animations = {
    listAnimationDesk: 'nesting-list-animation-desk',
    listAnimationMobile: 'nesting-list-animation-mobile',
    linkAnimation: 'nesting-link-animation',
    linkAnimationClose: 'nesting-link-animation-close',
    listAnimationCloseMobile: 'nesting-list-animation-mobile-close'
  };

  var itemsLists = Array.from(ToggleElements.mainNavList.querySelectorAll('.main-nav__item'));
  var nestingLists = Array.from(ToggleElements.mainNavList.querySelectorAll('.main-nav__nesting-list'));

  var toggleClasses = function (element, addClass, removingEnd) {
    var elementClasses = Array.from(element.classList);
    var removingClass = '';

    elementClasses.forEach(function (it) {
      if (it.includes(removingEnd)) {
        removingClass = it;
      }
    });

    if (removingClass) {
      element.classList.remove(removingClass);
    }

    if (element === ToggleElements.navToggle && !element.classList.contains('nav-toggle--with-js')) {
      element.classList.add('nav-toggle--with-js');
    }

    element.classList.add(addClass);
  };

  var blurElement = function () {
    var activeElement = document.activeElement;
    activeElement.blur();
  };

  var closeNav = function () {
    window.setTimeout(function () {
      ToggleElements.mainNavList.classList.add('hidden');
    }, 450);

    hideLists(nestingLists, Animations.listAnimationMobile);

    for (var key in ToggleElements) {
      if (ToggleElements.hasOwnProperty(key)) {
        toggleClasses(ToggleElements[key], elementNavClosedMap[key], '--opened');
      }
    }

    body.removeAttribute('style');
  };

  var openNav = function () {

    for (var key in ToggleElements) {
      if (ToggleElements.hasOwnProperty(key)) {
        toggleClasses(ToggleElements[key], elementNavOpenedMap[key], '--closed');
      }
    }

    ToggleElements.mainNav.focus();
    body.style = 'overflow-y: hidden';
    ToggleElements.mainNavList.classList.remove('hidden');
  };

  var toggleNav = function () {
    window.navToggle.toggleElement(window.navToggle.checkIsElemClosed(ToggleElements.navToggle, 'nav-toggle--closed'), openNav, closeNav, ToggleElements.navToggle);
  };

  var toggleNavFromResize = function () {
    if (ToggleElements.navToggle.classList.contains('nav-toggle--closed')) {
      ToggleElements.navToggle.classList.remove('nav-toggle--closed');
    }

    toggleNav();
  };

  var onNavToggleClick = function () {
    toggleNav();
  };

  var removeAnimation = function (element, listAnimation) {
    var animatedItems = Array.from(element.children);
    var animatedLinks = Array.from(element.querySelectorAll('.' + Animations.linkAnimation));
    var animatedElements = animatedItems.concat(animatedLinks);

    animatedElements.push(element);

    animatedElements.forEach(function (current) {
      switch (true) {
        case current.classList.contains(Animations.linkAnimation) :
          current.classList.remove(Animations.linkAnimation);
          break;
        case current.classList.contains(listAnimation) :
          current.classList.remove(listAnimation);
          break;
      }
    });
  };

  var hideLists = function (lists, listAnimation) {
    lists.forEach(function (current) {
      if (!current.classList.contains('visually-hidden')) {
        current.classList.add('visually-hidden');
        removeAnimation(current, listAnimation);
      }
    });
  };

  var hideList = function (list, listAnimationOpen, listAnimationClose) {
    var nestingLinks = Array.from(list.querySelectorAll('.main-nav__nesting-link'));
    var nestingItems = Array.from(list.querySelectorAll('.main-nav__nesting-item'));
    var animationArray = nestingLinks.concat(nestingItems);

    animationArray.forEach(function (it) {
      it.classList.remove(Animations.linkAnimation);
      it.classList.add(Animations.linkAnimationClose);
    });

    list.classList.add(listAnimationClose);

    removeAnimation(list, listAnimationOpen);
    window.setTimeout(function () {
      list.classList.add('visually-hidden');
    }, 600);
  };

  var openList = function (evt, listAnimation) {
    if (evt.currentTarget.classList.contains('main-nav__item--list')) {
      var nestingList = evt.currentTarget.querySelector('.main-nav__nesting-list');
      var nestingItems = Array.from(nestingList.querySelectorAll('.main-nav__nesting-item'));
      var nestingLinks = Array.from(nestingList.querySelectorAll('.main-nav__nesting-link'));
      var animationArray = nestingItems.concat(nestingLinks);

      animationArray.push(nestingList);
      nestingList.classList.remove('visually-hidden');
      nestingList.classList.remove(Animations.listAnimationCloseMobile);

      animationArray.forEach(function (current) {
        if (current.classList.contains('main-nav__nesting-link')) {
          current.classList.remove(Animations.linkAnimationClose);
          current.classList.add(Animations.linkAnimation);
        } else {
          current.classList.add(listAnimation);
        }
      });
    }
  };

  var toggleList = function (evt, lists, listAnimation) {
    if (evt.target.nextElementSibling) {
      if (evt.target.nextElementSibling.classList.contains('visually-hidden')) {
        openList(evt, listAnimation);
      } else {
        hideList(evt.target.nextElementSibling, Animations.listAnimationMobile, Animations.listAnimationCloseMobile);
      }
    }
  };

  var onItemHoverDesk = function (evt) {
    hideLists(nestingLists, Animations.listAnimationDesk);
    blurElement();
    openList(evt, Animations.listAnimationDesk);
  };

  var onItemClickMobile = function (evt) {
    toggleList(evt, nestingLists, Animations.listAnimationMobile);
  };

  var onItemFocusDesk = function (evt) {
    hideLists(nestingLists, Animations.listAnimationDesk);
    openList(evt, Animations.listAnimationDesk);
  };

  var onItemFocusMobile = function (evt) {
    openList(evt, Animations.listAnimationMobile);
  };

  var onItemMouseoutDesk = function () {
    hideLists(nestingLists, Animations.listAnimationDesk);
  };

  var addDesktopListeners = function () {
    itemsLists.forEach(function (current) {
      current.addEventListener('mouseover', onItemHoverDesk);
      current.addEventListener('mouseout', onItemMouseoutDesk);
      current.addEventListener('focusin', onItemFocusDesk);
    });
  };

  var addMobileListeners = function () {
    itemsLists.forEach(function (current) {
      current.addEventListener('click', onItemClickMobile);
      current.addEventListener('focusin', onItemFocusMobile);
    });
  };

  var removeMobileListeners = function () {
    itemsLists.forEach(function (current) {
      current.removeEventListener('click', onItemClickMobile);
      current.removeEventListener('focusin', onItemFocusMobile);
    });
  };

  var removeDesktopListeners = function () {
    itemsLists.forEach(function (current) {
      current.removeEventListener('mouseover', onItemHoverDesk);
      current.removeEventListener('mouseout', onItemMouseoutDesk);
      current.removeEventListener('focusin', onItemFocusDesk);
    });
  };

  ToggleElements.navToggle.addEventListener('click', onNavToggleClick);

  window.mainNav = {
    toggleNav: toggleNav,
    toggleNavFromResize: toggleNavFromResize,
    addDesktopListeners: addDesktopListeners,
    addMobileListeners: addMobileListeners,
    removeDesktopListeners: removeDesktopListeners,
    removeMobileListeners: removeMobileListeners,
    onItemMouseoutDesk: onItemMouseoutDesk
  };
})();
