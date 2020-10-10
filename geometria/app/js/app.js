/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _init = __webpack_require__(/*! ./init */ \"./src/js/init.js\");\n\nvar app = new _init.App();\napp.init();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/init.js":
/*!************************!*\
  !*** ./src/js/init.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.App = undefined;\n\nvar _mobileNav = __webpack_require__(/*! ./modules/mobile-nav */ \"./src/js/modules/mobile-nav.js\");\n\nvar _onlyNumber = __webpack_require__(/*! ./modules/only-number */ \"./src/js/modules/only-number.js\");\n\nvar _square = __webpack_require__(/*! ./modules/square */ \"./src/js/modules/square.js\");\n\nvar App = function App() {};\n\nApp.prototype.init = function () {\n  _mobileNav.mobileNav.init();\n\n  _onlyNumber.onlyNumber.init();\n\n  _square.square.init();\n};\n\nexports.App = App;\n\n//# sourceURL=webpack:///./src/js/init.js?");

/***/ }),

/***/ "./src/js/modules/mobile-nav.js":
/*!**************************************!*\
  !*** ./src/js/modules/mobile-nav.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar mobileNav = {\n  openNav: function openNav($menuToggleElem, $menuList) {\n    $('html, body').toggleClass('js-lock');\n    $menuToggleElem.toggleClass('is-active');\n    $menuList.fadeToggle(300);\n  },\n  init: function init() {\n    var $navigation = $('.nav');\n    $('.js-mobile-menu').click(function () {\n      var $hamburger = $(this).find('.hamburger');\n      mobileNav.openNav($($hamburger), $navigation);\n    });\n  }\n};\nexports.mobileNav = mobileNav;\n\n//# sourceURL=webpack:///./src/js/modules/mobile-nav.js?");

/***/ }),

/***/ "./src/js/modules/only-number.js":
/*!***************************************!*\
  !*** ./src/js/modules/only-number.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar onlyNumber = {\n  $input: $('.js-input-number'),\n  replaceToNumber: function replaceToNumber(input) {\n    input.value = input.value.replace(/[^0-9\\.]/g, '');\n  },\n  init: function init() {\n    onlyNumber.$input.on('keyup', function () {\n      onlyNumber.replaceToNumber(this);\n    });\n  }\n};\nexports.onlyNumber = onlyNumber;\n\n//# sourceURL=webpack:///./src/js/modules/only-number.js?");

/***/ }),

/***/ "./src/js/modules/square.js":
/*!**********************************!*\
  !*** ./src/js/modules/square.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar square = {\n  calculator: '.js-calc',\n  result: '.js-result',\n  input: '.js-input-square',\n  select: '.js-select',\n  $btn: $('.js-count'),\n  countPerimeter: function countPerimeter($parent) {\n    var a = $parent.find(square.input).val();\n    var $result = $parent.find(square.result);\n\n    if (a) {\n      var $select = $(square.select);\n      var result = Number(a) * 4;\n      $result.text(result + \" \" + $select.val()).hide().fadeIn(300);\n    }\n  },\n  countSquare: function countSquare($parent) {\n    var a = Number($parent.find(square.input).val());\n    var $result = $parent.find(square.result);\n\n    if (a) {\n      var $select = $(square.select);\n      var result = a * a;\n      $result.text(result + \" \" + $select.val()).hide().fadeIn(300);\n    }\n  },\n  init: function init() {\n    square.$btn.on('click', function () {\n      var $parent = $(this).closest(square.calculator);\n      var mode = $parent.data('calc');\n\n      switch (mode) {\n        case 'perimeter':\n          square.countPerimeter($parent);\n          break;\n\n        case 'square':\n          square.countSquare($parent);\n          break;\n      }\n    });\n  }\n};\nexports.square = square;\n\n//# sourceURL=webpack:///./src/js/modules/square.js?");

/***/ })

/******/ });