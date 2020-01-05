'use strict';

(function () {
  var checkIsElemClosed = function (element, testClass) {
    return element.classList.contains(testClass);
  };

  var toggleElement = function (isClosed, doIfIsClosed, doIfIsOpened, blurElement) {
    if (isClosed) {
      doIfIsClosed();
    } else {
      doIfIsOpened();
    }

    blurElement.blur();
  };

  window.navToggle = {
    checkIsElemClosed: checkIsElemClosed,
    toggleElement: toggleElement
  };
})();
