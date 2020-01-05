'use strict';

(function () {
  var backendData = {
    REQUEST_TIMEOUT: 5000,
    METHOD_FOR_GET: 'GET',
    METHOD_FOR_POST: 'POST',
    SEND_DATA_FOR_GET: null,
    STATUS_OK: 200
  };

  var xhrResults = {};

  var getXhr = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    return xhr;
  };

  var getXhrParams = function (xhr, url, method, timeout, sendData) {
    xhr.timeout = timeout;
    xhr.open(method, url);

    if (!sendData) {
      xhr.send();
    } else {
      xhr.send(sendData);
    }

    return xhr.response;
  };

  var setLoadCallback = function (xhr, onLoad, section, containerClassList, listClassList, getFunc, postFunc, onError, method, resultName, isPag, itemClass, itemExample, slListItem, counterIncr) {
    xhr.addEventListener('load', function () {
      var xhrResult = null;

      if (xhr.status === backendData.STATUS_OK) {
        if (method === backendData.METHOD_FOR_GET) {
          xhrResult = xhr.response;
          var result = getFunc(xhr.response, itemClass, itemExample, slListItem, counterIncr, section);
          onLoad(result, section, containerClassList, listClassList, isPag);
        } else {
          postFunc();
        }
      } else {
        onError(section);
      }

      window.backend.xhrResults['' + resultName] = Array.from(xhrResult);
    });
  };

  var getSendData = function (dataUrl, method, onLoad, section, containerClassList, listClassList, getFunc, postFunc, onError, sendData, resultName, isPag, itemClass, itemExample, slListItem, counterIncr) {
    var xhr = getXhr();

    getXhrParams(xhr, dataUrl, method, window.backend.backendData.REQUEST_TIMEOUT, sendData);
    setLoadCallback(xhr, onLoad, section, containerClassList, listClassList, getFunc, postFunc, onError, method, resultName, isPag, itemClass, itemExample, slListItem, counterIncr);
  };

  window.backend = {
    getSendData: getSendData,
    backendData: backendData,
    xhrResults: xhrResults
  };
})();
