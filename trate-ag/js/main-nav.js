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

  var itemsLists = Array.from(ToggleElements.mainNavList.querySelectorAll('.main-nav__item'));
  var nestingLists = Array.from(ToggleElements.mainNavList.querySelectorAll('.main-nav__nesting-list'));
  var mainNavLinks = Array.from(mainNav.querySelector('.main-nav__link--list'));

  mainNavLinks.forEach(function (it) {
    it.preventDefault();
  });

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

    if (element === ToggleElements.navToggle) {
      element.classList.add('visually-hidden');
      window.setTimeout(function () {
        element.classList.remove('visually-hidden');
      }, 500);

      if (!element.classList.contains('nav-toggle--with-js')) {
        element.classList.add('nav-toggle--with-js');
      }
    }

    element.classList.add(addClass);
  };

  var blurElement = function () {
    var activeElement = document.activeElement;
    activeElement.blur();
  };

  var closeNav = function () {
    window.setTimeout(function () {
      if (screen.width <= window.util.MOB_NAV_MAX_WIDTH) {
        ToggleElements.mainNavList.classList.add('hidden');
      }
    }, 500);

    hideLists(nestingLists);

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

    body.style = 'overflow-y: hidden';
    ToggleElements.mainNavList.classList.remove('hidden');
  };

  var toggleNav = function () {
    window.navToggle.toggleElement(window.navToggle.checkIsElemClosed(ToggleElements.navToggle, 'nav-toggle--closed'), openNav, closeNav, ToggleElements.navToggle);

    window.setTimeout(function () {
      ToggleElements.navToggle.focus();
    }, 405);
  };

  var toggleNavFromResize = function () {
    if (ToggleElements.navToggle.classList.contains('nav-toggle--closed')) {
      ToggleElements.navToggle.classList.remove('nav-toggle--closed');
    }

    toggleNav();

    if (screen.width > window.util.MOB_NAV_MAX_WIDTH) {
      ToggleElements.mainNavList.classList.remove('hidden');
    }
  };

  var onNavToggleClick = function () {
    toggleNav();
  };

  var hideLists = function (lists) {
    lists.forEach(function (current) {
      if (!current.classList.contains('visually-hidden')) {
        current.classList.add('visually-hidden');
      }
    });
  };

  var hideList = function (list) {
    if (screen.width <= window.util.TABLET_MAX_WIDTH) {
      var items = Array.from(list.querySelectorAll('.main-nav__nesting-item'));
      items.forEach(function (it) {
        if (it.classList.contains('main-nav__nesting-item--open-anim')) {
          it.classList.remove('main-nav__nesting-item--open-anim');
        }

        it.classList.add('main-nav__nesting-item--close-anim');
      });

      if (list.classList.contains('main-nav__nesting-list--open-anim')) {
        list.classList.remove('main-nav__nesting-list--open-anim');
      }

      list.classList.add('main-nav__nesting-list--close-anim');

      window.setTimeout(function () {
        list.classList.add('visually-hidden');
      }, 400);
    } else {
      list.classList.add('visually-hidden');
    }
  };

  var openList = function (evt) {
    if (evt.currentTarget.classList.contains('main-nav__item--list')) {
      var nestingList = evt.currentTarget.querySelector('.main-nav__nesting-list');
      var items = Array.from(nestingList.querySelectorAll('.main-nav__nesting-item'));

      if (screen.width > window.util.MOBILE_MAX_WIDTH && screen.width < window.util.DESKTOP_MIN_WIDTH) {
        nestingLists.forEach(function (it) {
          it.classList.add('visually-hidden');
        });
      }

      nestingList.classList.remove('visually-hidden');

      if (screen.width <= window.util.TABLET_MAX_WIDTH) {
        items.forEach(function (it) {
          if (it.classList.contains('main-nav__nesting-item--close-anim')) {
            it.classList.remove('main-nav__nesting-item--close-anim');
          }

          it.classList.add('main-nav__nesting-item--open-anim');
        });

        if (nestingList.classList.contains('main-nav__nesting-list--close-anim')) {
          nestingList.classList.remove('main-nav__nesting-list--close-anim');
        }

        nestingList.classList.add('main-nav__nesting-list--open-anim');
      } else {
        items.forEach(function (it) {
          it.classList.remove('main-nav__nesting-item--close-anim');
        });

        nestingList.classList.remove('main-nav__nesting-list--close-anim');
      }
    }
  };

  var toggleList = function (evt) {
    if (evt.target.nextElementSibling) {
      if (evt.target.nextElementSibling.classList.contains('visually-hidden')) {
        openList(evt);
      } else {
        hideList(evt.target.nextElementSibling);
      }
    }
  };

  var onItemHoverDesk = function (evt) {
    hideLists(nestingLists);
    blurElement();
    openList(evt);
  };

  var onItemClickMobile = function (evt) {
    toggleList(evt, nestingLists);
  };

  var onItemFocusDesk = function (evt) {
    hideLists(nestingLists);
    openList(evt);
  };

  var onItemFocusMobile = function (evt) {
    openList(evt);
  };

  var onItemMouseoutDesk = function () {
    hideLists(nestingLists);
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
      current.addEventListener('mousedown', onItemClickMobile);
      current.addEventListener('focusin', onItemFocusMobile);
    });
  };

  var removeMobileListeners = function () {
    itemsLists.forEach(function (current) {
      current.removeEventListener('mousedown', onItemClickMobile);
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
