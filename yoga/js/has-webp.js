'use strict';

(function () {
  var hasWebP = function hasWebP() {
    var rv = $.Deferred();
    var img = new Image();

    img.onload = function () {
      rv.resolve();
    };

    img.onerror = function () {
      rv.reject();
    };

    img.src = 'img/test-webp.webp';
    return rv.promise();
  };

  hasWebP().then(function () {
    $.noop();
  }, function () {
    var elemsWithWebp = [$('.page-header'), $('.directions'), $('.subscriptions'), $('.team'), $('.registration'), $('.page-footer')];
    elemsWithWebp.forEach(function (current) {
      current.removeClass('webp').addClass('no-webp');
    });
  });
})();
//# sourceMappingURL=has-webp.js.map
