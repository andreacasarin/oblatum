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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_navbar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_form_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_register_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_footer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_form_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_login_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue__);







Vue.component('obl-navbar', __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue___default.a);
Vue.component('obl-register-form', __WEBPACK_IMPORTED_MODULE_2__components_register_form_vue___default.a);
Vue.component('obl-footer', __WEBPACK_IMPORTED_MODULE_3__components_footer_vue___default.a);
Vue.component('obl-login-form', __WEBPACK_IMPORTED_MODULE_4__components_login_form_vue___default.a);
Vue.component('obl-recover-password-form', __WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue___default.a);

// Paths
var globalPath = "";
Vue.prototype.$path = {
	global: globalPath,
	home: globalPath + '/',
	login: globalPath + '/login',
	recover: globalPath + '/recover'
}

var apiPath = globalPath + '/api/';
Vue.prototype.$api = {
  api: apiPath,
  createUser: apiPath + '/users'
}

//Routes
const routes = [
  { path: Vue.prototype.$path.home, component: __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default.a }, 
  { path: Vue.prototype.$path.login, component: __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default.a },
  { path: Vue.prototype.$path.recover, component: __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default.a }
];



//Creation of the route instance
const router = new VueRouter({
  routes: routes 
})


//Creation of the app instance
const app = new Vue({
  el: '#app',
  data: {
    foo: 'foo'
  },
  router: router
})

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(5)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(9),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/usr/local/app/client/components/home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9370cea0", Component.options)
  } else {
    hotAPI.reload("data-v-9370cea0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("e258e200", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9370cea0\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9370cea0\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.main-container{\n    width: 100%;\n    margin: 0 auto;\n}\n\n/*Text in top of the page*/\n.main-text {\n    margin-top: 15px;\n    max-width: 900px;\n    font-weight: bold;\n    font-size: 45px;\n}\n\n/*Description of what we do in top page*/\n.descriptive-text{\n    margin-top: 5px;\n    max-width: 600px;\n}\n\n/*Form containing submit button, textfield*/\n.sign-in-form{\n    max-width: 450px;\n    height: 120px;\n    margin: 0 auto;\n    margin-bottom: 50px;\n}\n\n\n/*Sign up button*/\n#signup{\n    background-color: #4EBF3C;\n    border-color: #4EBF3C;\n}\n#signup:hover{\n    background-color: #1D8D0B;\n    border-color: #1D8D0B;\n    cursor: pointer;\n}\n/*Label above email textfield*/\n#keep-in-touch-text {\n    color: white;\n    font-size: 14px;\n}\n\n/*workaround*/\n@media (max-width: 768px){\n.what-we-do-images{\n        margin-bottom: 25px;\n}\n}\n.what-we-do-section{\n    background-color: whitesmoke;\n    padding-bottom: 50px;\n}\n.what-we-do-title{\n    font-weight: bold;\n    font-size: 45px;\n    margin-top: 50px;\n    margin-bottom: 25px;\n    color: #020C18;\n}\n.what-we-do-block{\n    margin-top: 25px;\n    margin-bottom: 15px;\n    padding-left: 25px;\n    padding-right: 25px;\n}\n.what-we-do-text{\n    vertical-align: middle;\n    background-color: yellow;\n}\n.team-title{\n    font-weight: bold;\n    font-size: 45px;\n    margin-top: 50px;\n    margin-bottom: 40px;\n}\n.member-description{\n    padding-top: 5px;\n    font-size: 15px;\n    margin-right: 5px;\n    margin-left: 5px;\n}\n.member-name{\n    padding-top: 10px;\n        font-weight: bold;\n    font-size: 20px;\n}\n.team-container{\n    margin-left: 25px;\n    margin-right: 25px;\n    margin-bottom: 50px;\n}\n\n/*workaround*/\n@media (max-width: 768px){\n.member-description{\n        margin-left: 10px;\n        margin-right: 10px;\n        margin-bottom: 50px;\n        font-size: 15px;\n}\n}\n", "", {"version":3,"sources":["/usr/local/app/client/components/home.vue?698f3d8f"],"names":[],"mappings":";AACA;IACA,YAAA;IACA,eAAA;CACA;;AAEA,2BAAA;AACA;IACA,iBAAA;IACA,iBAAA;IACA,kBAAA;IACA,gBAAA;CACA;;AAEA,yCAAA;AACA;IACA,gBAAA;IACA,iBAAA;CACA;;AAEA,4CAAA;AACA;IACA,iBAAA;IACA,cAAA;IACA,eAAA;IACA,oBAAA;CACA;;;AAGA,kBAAA;AACA;IACA,0BAAA;IACA,sBAAA;CACA;AAEA;IACA,0BAAA;IACA,sBAAA;IACA,gBAAA;CACA;AACA,+BAAA;AACA;IACA,aAAA;IACA,gBAAA;CACA;;AAEA,cAAA;AACA;AACA;QACA,oBAAA;CACA;CACA;AAEA;IACA,6BAAA;IACA,qBAAA;CACA;AAEA;IACA,kBAAA;IACA,gBAAA;IACA,iBAAA;IACA,oBAAA;IACA,eAAA;CACA;AACA;IACA,iBAAA;IACA,oBAAA;IACA,mBAAA;IACA,oBAAA;CACA;AAEA;IACA,uBAAA;IACA,yBAAA;CACA;AAEA;IACA,kBAAA;IACA,gBAAA;IACA,iBAAA;IACA,oBAAA;CACA;AAEA;IACA,iBAAA;IACA,gBAAA;IACA,kBAAA;IACA,iBAAA;CAEA;AAEA;IACA,kBAAA;QACA,kBAAA;IACA,gBAAA;CACA;AAEA;IACA,kBAAA;IACA,mBAAA;IACA,oBAAA;CACA;;AAEA,cAAA;AACA;AACA;QACA,kBAAA;QACA,mBAAA;QACA,oBAAA;QACA,gBAAA;CACA;CACA","file":"home.vue","sourcesContent":["<style>\n.main-container{\n    width: 100%;\n    margin: 0 auto;\n}\n\n/*Text in top of the page*/\n.main-text {\n    margin-top: 15px;\n    max-width: 900px;\n    font-weight: bold;\n    font-size: 45px;\n}\n\n/*Description of what we do in top page*/\n.descriptive-text{\n    margin-top: 5px;\n    max-width: 600px;\n}\n\n/*Form containing submit button, textfield*/\n.sign-in-form{\n    max-width: 450px;\n    height: 120px;\n    margin: 0 auto;\n    margin-bottom: 50px;\n}\n\n\n/*Sign up button*/\n#signup{\n    background-color: #4EBF3C;\n    border-color: #4EBF3C;\n}\n\n#signup:hover{\n    background-color: #1D8D0B;\n    border-color: #1D8D0B;\n    cursor: pointer;\n}\n/*Label above email textfield*/\n#keep-in-touch-text {\n    color: white;\n    font-size: 14px;\n}\n\n/*workaround*/\n@media (max-width: 768px){\n    .what-we-do-images{\n        margin-bottom: 25px;\n    }\n}\n\n.what-we-do-section{\n    background-color: whitesmoke;\n    padding-bottom: 50px;\n}\n\n.what-we-do-title{\n    font-weight: bold;\n    font-size: 45px;\n    margin-top: 50px;\n    margin-bottom: 25px;\n    color: #020C18;\n}\n.what-we-do-block{\n    margin-top: 25px;\n    margin-bottom: 15px;\n    padding-left: 25px;\n    padding-right: 25px;\n}\n\n.what-we-do-text{\n    vertical-align: middle;\n    background-color: yellow; \n}\n\n.team-title{\n    font-weight: bold;\n    font-size: 45px;\n    margin-top: 50px;\n    margin-bottom: 40px;\n}\n\n.member-description{\n    padding-top: 5px;\n    font-size: 15px;\n    margin-right: 5px;\n    margin-left: 5px;\n\n}\n\n.member-name{\n    padding-top: 10px;\n        font-weight: bold;\n    font-size: 20px;\n}\n\n .team-container{\n    margin-left: 25px;\n    margin-right: 25px;\n    margin-bottom: 50px;\n }\n\n/*workaround*/\n@media (max-width: 768px){\n    .member-description{\n        margin-left: 10px;\n        margin-right: 10px;\n        margin-bottom: 50px;\n        font-size: 15px;\n    }\n}\n</style>\n\n<template>\n<!-- main container -->\n<b-container fluid>\n\n    <!-- bold big text -->\n    <b-row class=\"justify-content-center\">\n        <b-col class=\"text-center main-text text-white\">\n            Let’s build the future together\n        </b-col>\n    </b-row>\n\n    <!-- description label -->\n    <b-row class=\"justify-content-center\">\n        <b-col class=\"text-center descriptive-text text-white\">\n            Oblatum enables people to trace, store and insure their most valuable assets.\n        </b-col>\n    </b-row>\n\n    <!-- Sign up form -->\n    <b-row class=\"justify-content-center\">\n        <b-col>\n            <obl-login-form v-if=\"isLogin\"></obl-login-form>\n            <obl-register-form v-if=\"isHome\"></obl-register-form>\n            <obl-recover-password-form v-if=\"isRecover\"></obl-recover-password-form>\n        </b-col>\n    </b-row>\n\n    <!-- What we do section -->\n    <b-row id=\"what-we-do-sec\" class=\"what-we-do-section justify-content-center\">\n        <b-col>\n            <b-row class=\"justify-content-center\">\n                <b-col class=\"text-center what-we-do-title\">\n                    Think big, start small, scale fast\n                </b-col>\n            </b-row>\n            <!-- Think Big -->\n            <b-row class=\"what-we-do-block d-flex align-items-center\">\n\n                <img class=\"col-md-3 order-md-2 what-we-do-images\" \n                    :src=\"this.$path.global + '/images/think-big.svg'\" \n                    alt=\"Think big\"\n                    height=\"100px\"\n                    width=\"100px\" \n                    />\n\n                <b-col col md=\"9\" class=\"order-md-1 d-flex align-items-center\">\n                    Oblatum mission is to organize the world’s asset in a transparent and secure way that enables people prosperity and promote financial inclusion.\n                </b-col>\n\n\n            </b-row>\n\n            <!-- Start small -->\n            <b-row class=\"what-we-do-block d-flex align-items-center\">\n                <img class=\"col-md-3 what-we-do-images\" \n                    :src=\"this.$path.global + '/images/start-small.svg'\"\n                    alt=\"Start small\"\n                    height=\"100px\"\n                    width=\"100px\" />\n\n                <b-col col md=\"9\" class=\"order-md-1 d-flex align-items-center\">\n                    We have chosen to start from tracing bicycle. We leverage the Ethereum blockchain to create a digital certificate associated with the bicycle which enhances transparency and prevents the reselling of stolen bicycles.\n                </b-col>\n\n            </b-row>\n\n            <!-- Scale fast -->\n            <b-row class=\"what-we-do-block d-flex align-items-center\">\n\n                <img class=\"col-md-3 order-md-2 what-we-do-images\" \n                    :src=\"this.$path.global + '/images/scale-fast.svg'\"\n                    alt=\"Scale fast\"\n                    height=\"100px\"\n                    width=\"100px\"/>\n\n                <b-col col md=\"9\" class=\"order-md-1 d-flex align-items-center\">\n                    Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation. \n                </b-col>\n\n            </b-row>\n        </b-col>\n    </b-row>\n\n    <!-- Team section -->\n    <b-row id=\"team-sec\">\n        <b-col>\n\n            <b-row>\n                <b-col class=\"text-center team-title text-white\">\n                    Team\n                </b-col>\n            </b-row>\n\n            <!-- Team container -->\n            <b-row class=\"team-container\">\n\n                <!-- Member A -->\n                <b-col col md=\"4\">\n                    <b-row>\n\n                        <img \n                            :src=\"this.$path.global + '/images/andrea.jpg'\" \n                            class=\"rounded-circle mx-auto d-block\" \n                            alt=\"Member photo\"\n                            height=\"200px\"\n                            width=\"200px\" />\n\n                    </b-row>\n                    <b-row class=\"justify-content-center text-white member-name\">Andrea Casarin\n                    </b-row>\n                    <b-row class=\"justify-content-center text-white\"><i>Front-end developer</i>\n                    </b-row>\n                </b-col>\n\n                <!-- Member B -->\n                <b-col col md=\"4\">\n\n                    <b-row>\n                        <img \n                            :src=\"this.$path.global + '/images/alessandro.jpg'\" \n                            class=\"rounded-circle mx-auto d-block\" \n                            alt=\"Member photo\"\n                            height=\"200px\"\n                            width=\"200px\" />\n                    </b-row>\n\n                    <b-row class=\"row justify-content-center text-white member-name\">Alessandro Rea</b-row>\n                    <b-row class=\"justify-content-center text-white\"><i>Founder & CEO</i>\n                    </b-row>\n                </b-col>\n\n                <!-- Member C -->\n                <b-col col md=\"4\">\n\n                    <b-row>\n                        <img \n                            :src=\"this.$path.global + '/images/ezechiele.jpg'\" \n                            class=\"rounded-circle mx-auto d-block\" \n                            alt=\"Member photo\"\n                            height=\"200px\"\n                            width=\"200px\" />\n                    </b-row>\n\n                    <b-row class=\"row justify-content-center text-white member-name\">Ezechiele Tosadori</b-row>\n\n                    <b-row class=\"justify-content-center text-white\"><i>Front-end developer</i>\n                    </b-row>\n\n                </b-col>\n            </b-row>\n\n        </b-col>\n    </b-row>\n</b-container>\n\n</template>\n\n<script>\nmodule.exports = {\n  computed: {\n        isLogin: function() {\n            return this.$route.path == this.$path.login;\n        },\n        isHome: function(){\n            return this.$route.path == this.$path.home;\n        },\n        isRecover: function(){\n            return this.$route.path == this.$path.recover;\n        }\n  }\n}\n</script>\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
  computed: {
        isLogin: function() {
            return this.$route.path == this.$path.login;
        },
        isHome: function(){
            return this.$route.path == this.$path.home;
        },
        isRecover: function(){
            return this.$route.path == this.$path.recover;
        }
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('b-container', {
    attrs: {
      "fluid": ""
    }
  }, [_c('b-row', {
    staticClass: "justify-content-center"
  }, [_c('b-col', {
    staticClass: "text-center main-text text-white"
  }, [_vm._v("\n            Let’s build the future together\n        ")])], 1), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center"
  }, [_c('b-col', {
    staticClass: "text-center descriptive-text text-white"
  }, [_vm._v("\n            Oblatum enables people to trace, store and insure their most valuable assets.\n        ")])], 1), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center"
  }, [_c('b-col', [(_vm.isLogin) ? _c('obl-login-form') : _vm._e(), _vm._v(" "), (_vm.isHome) ? _c('obl-register-form') : _vm._e(), _vm._v(" "), (_vm.isRecover) ? _c('obl-recover-password-form') : _vm._e()], 1)], 1), _vm._v(" "), _c('b-row', {
    staticClass: "what-we-do-section justify-content-center",
    attrs: {
      "id": "what-we-do-sec"
    }
  }, [_c('b-col', [_c('b-row', {
    staticClass: "justify-content-center"
  }, [_c('b-col', {
    staticClass: "text-center what-we-do-title"
  }, [_vm._v("\n                    Think big, start small, scale fast\n                ")])], 1), _vm._v(" "), _c('b-row', {
    staticClass: "what-we-do-block d-flex align-items-center"
  }, [_c('img', {
    staticClass: "col-md-3 order-md-2 what-we-do-images",
    attrs: {
      "src": this.$path.global + '/images/think-big.svg',
      "alt": "Think big",
      "height": "100px",
      "width": "100px"
    }
  }), _vm._v(" "), _c('b-col', {
    staticClass: "order-md-1 d-flex align-items-center",
    attrs: {
      "col": "",
      "md": "9"
    }
  }, [_vm._v("\n                    Oblatum mission is to organize the world’s asset in a transparent and secure way that enables people prosperity and promote financial inclusion.\n                ")])], 1), _vm._v(" "), _c('b-row', {
    staticClass: "what-we-do-block d-flex align-items-center"
  }, [_c('img', {
    staticClass: "col-md-3 what-we-do-images",
    attrs: {
      "src": this.$path.global + '/images/start-small.svg',
      "alt": "Start small",
      "height": "100px",
      "width": "100px"
    }
  }), _vm._v(" "), _c('b-col', {
    staticClass: "order-md-1 d-flex align-items-center",
    attrs: {
      "col": "",
      "md": "9"
    }
  }, [_vm._v("\n                    We have chosen to start from tracing bicycle. We leverage the Ethereum blockchain to create a digital certificate associated with the bicycle which enhances transparency and prevents the reselling of stolen bicycles.\n                ")])], 1), _vm._v(" "), _c('b-row', {
    staticClass: "what-we-do-block d-flex align-items-center"
  }, [_c('img', {
    staticClass: "col-md-3 order-md-2 what-we-do-images",
    attrs: {
      "src": this.$path.global + '/images/scale-fast.svg',
      "alt": "Scale fast",
      "height": "100px",
      "width": "100px"
    }
  }), _vm._v(" "), _c('b-col', {
    staticClass: "order-md-1 d-flex align-items-center",
    attrs: {
      "col": "",
      "md": "9"
    }
  }, [_vm._v("\n                    Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation. \n                ")])], 1)], 1)], 1), _vm._v(" "), _c('b-row', {
    attrs: {
      "id": "team-sec"
    }
  }, [_c('b-col', [_c('b-row', [_c('b-col', {
    staticClass: "text-center team-title text-white"
  }, [_vm._v("\n                    Team\n                ")])], 1), _vm._v(" "), _c('b-row', {
    staticClass: "team-container"
  }, [_c('b-col', {
    attrs: {
      "col": "",
      "md": "4"
    }
  }, [_c('b-row', [_c('img', {
    staticClass: "rounded-circle mx-auto d-block",
    attrs: {
      "src": this.$path.global + '/images/andrea.jpg',
      "alt": "Member photo",
      "height": "200px",
      "width": "200px"
    }
  })]), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center text-white member-name"
  }, [_vm._v("Andrea Casarin\n                    ")]), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center text-white"
  }, [_c('i', [_vm._v("Front-end developer")])])], 1), _vm._v(" "), _c('b-col', {
    attrs: {
      "col": "",
      "md": "4"
    }
  }, [_c('b-row', [_c('img', {
    staticClass: "rounded-circle mx-auto d-block",
    attrs: {
      "src": this.$path.global + '/images/alessandro.jpg',
      "alt": "Member photo",
      "height": "200px",
      "width": "200px"
    }
  })]), _vm._v(" "), _c('b-row', {
    staticClass: "row justify-content-center text-white member-name"
  }, [_vm._v("Alessandro Rea")]), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center text-white"
  }, [_c('i', [_vm._v("Founder & CEO")])])], 1), _vm._v(" "), _c('b-col', {
    attrs: {
      "col": "",
      "md": "4"
    }
  }, [_c('b-row', [_c('img', {
    staticClass: "rounded-circle mx-auto d-block",
    attrs: {
      "src": this.$path.global + '/images/ezechiele.jpg',
      "alt": "Member photo",
      "height": "200px",
      "width": "200px"
    }
  })]), _vm._v(" "), _c('b-row', {
    staticClass: "row justify-content-center text-white member-name"
  }, [_vm._v("Ezechiele Tosadori")]), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center text-white"
  }, [_c('i', [_vm._v("Front-end developer")])])], 1)], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9370cea0", module.exports)
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(14),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/usr/local/app/client/components/navbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fa57521", Component.options)
  } else {
    hotAPI.reload("data-v-3fa57521", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b31fb962", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fa57521\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./navbar.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fa57521\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./navbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.nav-link{\n    color: whitesmoke!important;\n    font-weight: bold;\n}\n.nav-link:hover{\n    color: white!important;\n}\n.navbar-brand{\n    color: white!important;\n    font-weight: bold;\n}\n.custom-toggler.navbar-toggler {\n    border-color: whitesmoke;\n}\n.custom-toggler .navbar-toggler-icon {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n}\n", "", {"version":3,"sources":["/usr/local/app/client/components/navbar.vue?ab2010ce"],"names":[],"mappings":";AACA;IACA,4BAAA;IACA,kBAAA;CACA;AAEA;IACA,uBAAA;CACA;AAEA;IACA,uBAAA;IACA,kBAAA;CACA;AACA;IACA,yBAAA;CACA;AACA;IACA,0QAAA;CACA","file":"navbar.vue","sourcesContent":["<style>\n.nav-link{\n    color: whitesmoke!important;\n    font-weight: bold;\n}\n\n.nav-link:hover{\n    color: white!important;\n}\n\n.navbar-brand{\n    color: white!important;\n    font-weight: bold;\n}\n.custom-toggler.navbar-toggler {\n    border-color: whitesmoke;\n}\n.custom-toggler .navbar-toggler-icon {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n}\n</style>\n\n<template>\n    <b-navbar toggleable=\"md\" type=\"dark\">\n\n        <b-navbar-toggle target=\"nav_collapse\"></b-navbar-toggle>\n\n        <b-navbar-brand to=\"/\">\n            <img :src=\"this.$path.global + '/images/logo-white.svg'\" alt=\"Logo white\" height=\"60px\" width=\"60px\" />Oblatum\n        </b-navbar-brand>\n\n    <b-collapse is-nav id=\"nav_collapse\">\n\n        <b-navbar-nav class=\"ml-auto\">\n            <b-nav-item :to=\"this.$path.home\" v-if=\"!isHome\">REGISTER</b-nav-item>\n            <b-nav-item :to=\"this.$path.login\" v-if=\"isHome\">LOGIN</b-nav-item>\n        </b-navbar-nav>\n\n    </b-collapse>\n\n    </b-navbar>\n</template>\n\n<script>\nmodule.exports = {\n  computed: {\n        isHome: function(){\n            return this.$route.path == \"/\";\n        }\n  }\n}\n</script>\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
  computed: {
        isHome: function(){
            return this.$route.path == "/";
        }
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('b-navbar', {
    attrs: {
      "toggleable": "md",
      "type": "dark"
    }
  }, [_c('b-navbar-toggle', {
    attrs: {
      "target": "nav_collapse"
    }
  }), _vm._v(" "), _c('b-navbar-brand', {
    attrs: {
      "to": "/"
    }
  }, [_c('img', {
    attrs: {
      "src": this.$path.global + '/images/logo-white.svg',
      "alt": "Logo white",
      "height": "60px",
      "width": "60px"
    }
  }), _vm._v("Oblatum\n    ")]), _vm._v(" "), _c('b-collapse', {
    attrs: {
      "is-nav": "",
      "id": "nav_collapse"
    }
  }, [_c('b-navbar-nav', {
    staticClass: "ml-auto"
  }, [(!_vm.isHome) ? _c('b-nav-item', {
    attrs: {
      "to": this.$path.home
    }
  }, [_vm._v("REGISTER")]) : _vm._e(), _vm._v(" "), (_vm.isHome) ? _c('b-nav-item', {
    attrs: {
      "to": this.$path.login
    }
  }, [_vm._v("LOGIN")]) : _vm._e()], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3fa57521", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(16)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/usr/local/app/client/components/register-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] register-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a1320ad", Component.options)
  } else {
    hotAPI.reload("data-v-3a1320ad", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("2596bd1a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a1320ad\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./register-form.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a1320ad\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./register-form.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.form-container{\n    background-color: whitesmoke;\n    border-radius: 10px;\n    max-width: 450px;\n\n    padding-bottom: 30px;\n    padding-left: 15px;\n    padding-right: 15px;\n    padding-top: 30px;\n\n    margin-bottom: 45px;\n    margin-top: 75px;\n}\n.textfield-label{\n}\n#description{\n    font-size: 10px;\n}\n\n", "", {"version":3,"sources":["/usr/local/app/client/components/register-form.vue?05e7d9b0"],"names":[],"mappings":";AACA;IACA,6BAAA;IACA,oBAAA;IACA,iBAAA;;IAEA,qBAAA;IACA,mBAAA;IACA,oBAAA;IACA,kBAAA;;IAEA,oBAAA;IACA,iBAAA;CACA;AAEA;CAEA;AAEA;IACA,gBAAA;CACA","file":"register-form.vue","sourcesContent":["<style>\n    .form-container{\n        background-color: whitesmoke;\n        border-radius: 10px;\n        max-width: 450px;\n\n        padding-bottom: 30px;\n        padding-left: 15px;\n        padding-right: 15px;\n        padding-top: 30px;\n\n        margin-bottom: 45px;\n        margin-top: 75px;\n    }\n\n    .textfield-label{\n        \n    }\n\n    #description{\n        font-size: 10px;\n    }\n\n</style>\n\n<template>\n<div>\n<b-container class=\"form-container\">\n\n    <legend class=\"text-center\">\n        <b>Sign up!</b>\n        <p id=\"description\">Something written here</p>\n    </legend>\n\n<b-form @submit=\"onSubmit\">\n\n<b-form-group \n    label=\"Name:\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"icon ion-person\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"name\" type=\"text\" v-model=\"form.name\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n<b-form-group \n    label=\"Surname:\">\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"icon ion-person\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"surname\" type=\"text\" v-model=\"form.surname\"></b-form-input>\n    </b-input-group>\n</b-form-group>\n\n<b-form-group \n    label=\"Email:\" \n    description=\"We'll never share your email with anyone else.\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"ion-email\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"email\" type=\"text\" v-model=\"form.email\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n<b-form-group \n    label=\"Password:\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"ion-locked\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"password\" type=\"password\" v-model=\"form.password\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n<b-form-group \n    label=\"Confirm password:\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"ion-locked\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"confirm-password\" type=\"password\" v-model=\"form.passwordConfirmation\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n\n<b-form-group class=\"text-center\">\n    <b-button id=\"signup\" type=\"submit\" variant=\"primary\" class=\"text-center\">Register</b-button>\n    <b-form-text>\n        <router-link :to=\"this.$path.recover\" class=\"text-oblatum-color\">Forgot your password?</router-link>\n    </b-form-text>\n</b-form-group>\n\n\n</b-form>\n</b-container>\n\n</div>\n</template>\n\n<script>\nexport default {\n  data: function(){\n      return {\n        form: {\n            email: '',\n            name: '',\n            surname: '',\n            password: '',\n            passwordConfirmation: '',\n            role: 'user'\n        }\n    }\n  },\n  methods: {\n    onSubmit (e) {\n      e.preventDefault();\n\n      axios.post(this.$api.createUser, JSON.parse(JSON.stringify(this.form)))\n      .then(response => {\n        console.log(response)\n      })\n      .catch(e => {\n        this.errors.push(e)\n      })\n    }\n  }\n}\n</script>\n\n<!-- b-form-1.vue -->"],"sourceRoot":""}]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function(){
      return {
        form: {
            email: '',
            name: '',
            surname: '',
            password: '',
            passwordConfirmation: '',
            role: 'user'
        }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();

      axios.post(this.$api.createUser, JSON.parse(JSON.stringify(this.form)))
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('b-container', {
    staticClass: "form-container"
  }, [_c('legend', {
    staticClass: "text-center"
  }, [_c('b', [_vm._v("Sign up!")]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "description"
    }
  }, [_vm._v("Something written here")])]), _vm._v(" "), _c('b-form', {
    on: {
      "submit": _vm.onSubmit
    }
  }, [_c('b-form-group', {
    attrs: {
      "label": "Name:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "icon ion-person"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "name",
      "type": "text"
    },
    model: {
      value: (_vm.form.name),
      callback: function($$v) {
        _vm.$set(_vm.form, "name", $$v)
      },
      expression: "form.name"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    attrs: {
      "label": "Surname:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "icon ion-person"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "surname",
      "type": "text"
    },
    model: {
      value: (_vm.form.surname),
      callback: function($$v) {
        _vm.$set(_vm.form, "surname", $$v)
      },
      expression: "form.surname"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    attrs: {
      "label": "Email:",
      "description": "We'll never share your email with anyone else."
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "ion-email"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "email",
      "type": "text"
    },
    model: {
      value: (_vm.form.email),
      callback: function($$v) {
        _vm.$set(_vm.form, "email", $$v)
      },
      expression: "form.email"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    attrs: {
      "label": "Password:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "ion-locked"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "password",
      "type": "password"
    },
    model: {
      value: (_vm.form.password),
      callback: function($$v) {
        _vm.$set(_vm.form, "password", $$v)
      },
      expression: "form.password"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    attrs: {
      "label": "Confirm password:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "ion-locked"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "confirm-password",
      "type": "password"
    },
    model: {
      value: (_vm.form.passwordConfirmation),
      callback: function($$v) {
        _vm.$set(_vm.form, "passwordConfirmation", $$v)
      },
      expression: "form.passwordConfirmation"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    staticClass: "text-center"
  }, [_c('b-button', {
    staticClass: "text-center",
    attrs: {
      "id": "signup",
      "type": "submit",
      "variant": "primary"
    }
  }, [_vm._v("Register")]), _vm._v(" "), _c('b-form-text', [_c('router-link', {
    staticClass: "text-oblatum-color",
    attrs: {
      "to": this.$path.recover
    }
  }, [_vm._v("Forgot your password?")])], 1)], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3a1320ad", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(21)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(24),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/usr/local/app/client/components/footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] footer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-be195da8", Component.options)
  } else {
    hotAPI.reload("data-v-be195da8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("7324119e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-be195da8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./footer.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-be195da8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./footer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n    /*FOOTER*/\n.footer{\n    padding-top:25px;\n    background-color: whitesmoke;\n    padding-bottom: 25px;\n}\n.footer-logo{\n    padding-left: 75px;\n}\n\n\n\n/*workaround*/\n@media (max-width: 768px){\n.footer-logo{\n        padding-left: 0px;\n}\n.footer-aboutus{\n        padding-left: 50px;\n        padding-right: 50px;\n        text-align: center;\n}\n}\n.copyright{\n    padding-left: 20px;\n}\n.footer-label{\n    font-size: 18px;\n    font-weight: bold;\n    margin-bottom: 15px;\n}\n.footer-section{\n    margin-top: 15px;\n}\n.icon-padding{\n    padding-right: 10px;\n    font-size: 24px;\n    vertical-align: middle;\n}\n.icon-align{\n    text-align: middle;\n}\n.email-link{\n    color: black;\n}\n.email-link:hover{\n    color: lightgrey;\n}\n", "", {"version":3,"sources":["/usr/local/app/client/components/footer.vue?23b8f2d2"],"names":[],"mappings":";IACA,UAAA;AACA;IACA,iBAAA;IACA,6BAAA;IACA,qBAAA;CACA;AAEA;IACA,mBAAA;CACA;;;;AAIA,cAAA;AACA;AACA;QACA,kBAAA;CACA;AAEA;QACA,mBAAA;QACA,oBAAA;QACA,mBAAA;CACA;CACA;AAGA;IACA,mBAAA;CACA;AAGA;IACA,gBAAA;IACA,kBAAA;IACA,oBAAA;CACA;AAGA;IACA,iBAAA;CACA;AAGA;IACA,oBAAA;IACA,gBAAA;IACA,uBAAA;CACA;AAEA;IACA,mBAAA;CACA;AAEA;IACA,aAAA;CACA;AAEA;IACA,iBAAA;CACA","file":"footer.vue","sourcesContent":["<style>\n    /*FOOTER*/\n.footer{\n    padding-top:25px;\n    background-color: whitesmoke;\n    padding-bottom: 25px;\n}\n\n.footer-logo{\n    padding-left: 75px;\n}\n\n\n\n/*workaround*/\n@media (max-width: 768px){\n    .footer-logo{\n        padding-left: 0px;\n    }\n\n    .footer-aboutus{\n        padding-left: 50px;\n        padding-right: 50px;\n        text-align: center;\n    }\n}\n\n\n.copyright{\n    padding-left: 20px;\n}\n\n\n.footer-label{\n    font-size: 18px;\n    font-weight: bold;\n    margin-bottom: 15px;\n}\n\n\n.footer-section{\n    margin-top: 15px;\n}\n\n\n.icon-padding{\n    padding-right: 10px;\n    font-size: 24px;\n    vertical-align: middle;\n}\n\n.icon-align{\n    text-align: middle;\n}\n\n.email-link{\n    color: black;\n}\n\n.email-link:hover{\n    color: lightgrey;\n}\n</style>\n\n<template>\n<footer id=\"contacts-sec\">\n  <div class=\"footer container-fluid\">\n    <b-row class=\"justify-content-between\">\n\n\n        <!-- footer contact us -->\n      <b-col col md=\"3\" order-md=\"2\" class=\"footer-section\">\n            <b-row class=\"footer-label justify-content-center justify-content-md-between\">\n                Contacts\n            </b-row>\n            <b-row class=\"justify-content-center justify-content-md-start\">\n                <span class=\"icon-align\"><i class=\"ion-ios-telephone icon-padding\"></i>+39 3278562208</span>\n            </b-row>\n\n            <b-row class=\"justify-content-center justify-content-md-start\">\n                <span class=\"icon-align\"><i class=\"ion-email icon-padding\"></i>\n                <a class=\"email-link\" href=\"mailto:oblatum@support.it\">oblatum@support.it</a></span>\n            </b-row>\n        </b-col>\n\n        <!-- footer About Us -->\n        <!--<div class=\"col-md-3 footer-section order-md-3\">\n            <p class=\"row footer-label justify-content-center justify-content-md-start\">\n                About Us\n            </p> \n            <p class=\"row footer-aboutus\">\n                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n            </p>\n        </div>-->\n\n        <!-- footer logo -->\n        <b-col md=\"9\" order-md=\"1\" class=\"footer-section footer-logo\">\n            <b-row class=\"justify-content-center justify-content-md-start\">\n                    <img class=\"float-right\" \n                    :src=\"this.$path.global + '/images/logo-black.svg'\"\n                    alt=\"Logo black\"\n                    height=\"100px\"\n                    width=\"100px\" \n                    />\n                <h1 class=\"footer-logo-text my-auto\">Oblatum</h1>\n            </b-row>\n            <b-row class=\"copyright justify-content-center justify-content-md-start\">Oblatum © 2018</b-row>\n        </b-col>\n    </b-row>\n  </div>\n</footer>\n</template>\n\n<script>\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    attrs: {
      "id": "contacts-sec"
    }
  }, [_c('div', {
    staticClass: "footer container-fluid"
  }, [_c('b-row', {
    staticClass: "justify-content-between"
  }, [_c('b-col', {
    staticClass: "footer-section",
    attrs: {
      "col": "",
      "md": "3",
      "order-md": "2"
    }
  }, [_c('b-row', {
    staticClass: "footer-label justify-content-center justify-content-md-between"
  }, [_vm._v("\n                Contacts\n            ")]), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center justify-content-md-start"
  }, [_c('span', {
    staticClass: "icon-align"
  }, [_c('i', {
    staticClass: "ion-ios-telephone icon-padding"
  }), _vm._v("+39 3278562208")])]), _vm._v(" "), _c('b-row', {
    staticClass: "justify-content-center justify-content-md-start"
  }, [_c('span', {
    staticClass: "icon-align"
  }, [_c('i', {
    staticClass: "ion-email icon-padding"
  }), _vm._v(" "), _c('a', {
    staticClass: "email-link",
    attrs: {
      "href": "mailto:oblatum@support.it"
    }
  }, [_vm._v("oblatum@support.it")])])])], 1), _vm._v(" "), _c('b-col', {
    staticClass: "footer-section footer-logo",
    attrs: {
      "md": "9",
      "order-md": "1"
    }
  }, [_c('b-row', {
    staticClass: "justify-content-center justify-content-md-start"
  }, [_c('img', {
    staticClass: "float-right",
    attrs: {
      "src": this.$path.global + '/images/logo-black.svg',
      "alt": "Logo black",
      "height": "100px",
      "width": "100px"
    }
  }), _vm._v(" "), _c('h1', {
    staticClass: "footer-logo-text my-auto"
  }, [_vm._v("Oblatum")])]), _vm._v(" "), _c('b-row', {
    staticClass: "copyright justify-content-center justify-content-md-start"
  }, [_vm._v("Oblatum © 2018")])], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-be195da8", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(29),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/usr/local/app/client/components/login-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cba3d8e", Component.options)
  } else {
    hotAPI.reload("data-v-1cba3d8e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("57365ba2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cba3d8e\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login-form.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cba3d8e\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login-form.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.form-container{\n    background-color: whitesmoke;\n    border-radius: 10px;\n    max-width: 450px;\n\n    padding-bottom: 30px;\n    padding-left: 15px;\n    padding-right: 15px;\n    padding-top: 30px;\n\n    margin-bottom: 45px;\n    margin-top: 75px;\n}\n.textfield-label{\n}\n\n", "", {"version":3,"sources":["/usr/local/app/client/components/login-form.vue?398151ca"],"names":[],"mappings":";AACA;IACA,6BAAA;IACA,oBAAA;IACA,iBAAA;;IAEA,qBAAA;IACA,mBAAA;IACA,oBAAA;IACA,kBAAA;;IAEA,oBAAA;IACA,iBAAA;CACA;AAEA;CAEA","file":"login-form.vue","sourcesContent":["<style>\n    .form-container{\n        background-color: whitesmoke;\n        border-radius: 10px;\n        max-width: 450px;\n\n        padding-bottom: 30px;\n        padding-left: 15px;\n        padding-right: 15px;\n        padding-top: 30px;\n\n        margin-bottom: 45px;\n        margin-top: 75px;\n    }\n\n    .textfield-label{\n        \n    }\n\n</style>\n\n<template>\n<div>\n<b-container class=\"form-container\">\n\n    <legend class=\"text-center\">\n        <b>Sign in!</b>\n        <p id=\"description\" style=\"font-size: 9pt\">Something written here</p>\n    </legend>\n\n<b-form @submit=\"onSubmit\">\n\n<b-form-group \n    label=\"Email:\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"ion-email\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"email\" type=\"text\" v-model=\"form.email\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n<b-form-group \n    label=\"Password:\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"ion-locked\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"password\" type=\"password\" v-model=\"form.password\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n\n<b-form-group class=\"text-center\">\n    <b-button id=\"signup\" type=\"submit\" variant=\"primary\" class=\"text-center\">Login</b-button>\n    <b-form-text><router-link :to=\"this.$path.recover\" class=\"text-oblatum-color\">Forgot your password?</router-link></b-form-text>\n</b-form-group>\n\n\n</b-form>\n</b-container>\n\n</div>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      form: {\n        email: '',\n        password: ''\n      }\n    }\n  },\n  methods: {\n    onSubmit (e) {\n      e.preventDefault();\n      alert(JSON.stringify(this.form));\n    }\n  }\n}\n</script>\n\n<!-- b-form-1.vue -->"],"sourceRoot":""}]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
});


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('b-container', {
    staticClass: "form-container"
  }, [_c('legend', {
    staticClass: "text-center"
  }, [_c('b', [_vm._v("Sign in!")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "9pt"
    },
    attrs: {
      "id": "description"
    }
  }, [_vm._v("Something written here")])]), _vm._v(" "), _c('b-form', {
    on: {
      "submit": _vm.onSubmit
    }
  }, [_c('b-form-group', {
    attrs: {
      "label": "Email:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "ion-email"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "email",
      "type": "text"
    },
    model: {
      value: (_vm.form.email),
      callback: function($$v) {
        _vm.$set(_vm.form, "email", $$v)
      },
      expression: "form.email"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    attrs: {
      "label": "Password:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "ion-locked"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "password",
      "type": "password"
    },
    model: {
      value: (_vm.form.password),
      callback: function($$v) {
        _vm.$set(_vm.form, "password", $$v)
      },
      expression: "form.password"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    staticClass: "text-center"
  }, [_c('b-button', {
    staticClass: "text-center",
    attrs: {
      "id": "signup",
      "type": "submit",
      "variant": "primary"
    }
  }, [_vm._v("Login")]), _vm._v(" "), _c('b-form-text', [_c('router-link', {
    staticClass: "text-oblatum-color",
    attrs: {
      "to": this.$path.recover
    }
  }, [_vm._v("Forgot your password?")])], 1)], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1cba3d8e", module.exports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(34),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/usr/local/app/client/components/recover-password-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] recover-password-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9dbdee8", Component.options)
  } else {
    hotAPI.reload("data-v-b9dbdee8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("645f5bba", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b9dbdee8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./recover-password-form.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b9dbdee8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./recover-password-form.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.form-container{\n    background-color: whitesmoke;\n    border-radius: 10px;\n    max-width: 450px;\n\n    padding-bottom: 30px;\n    padding-left: 15px;\n    padding-right: 15px;\n    padding-top: 30px;\n\n    margin-bottom: 45px;\n    margin-top: 75px;\n}\n.textfield-label{\n}\n\n", "", {"version":3,"sources":["/usr/local/app/client/components/recover-password-form.vue?07c2577a"],"names":[],"mappings":";AACA;IACA,6BAAA;IACA,oBAAA;IACA,iBAAA;;IAEA,qBAAA;IACA,mBAAA;IACA,oBAAA;IACA,kBAAA;;IAEA,oBAAA;IACA,iBAAA;CACA;AAEA;CAEA","file":"recover-password-form.vue","sourcesContent":["<style>\n    .form-container{\n        background-color: whitesmoke;\n        border-radius: 10px;\n        max-width: 450px;\n\n        padding-bottom: 30px;\n        padding-left: 15px;\n        padding-right: 15px;\n        padding-top: 30px;\n\n        margin-bottom: 45px;\n        margin-top: 75px;\n    }\n\n    .textfield-label{\n        \n    }\n\n</style>\n\n<template>\n<div>\n<b-container class=\"form-container\">\n\n    <legend class=\"text-center\">\n        <b>Recover your password</b>\n        <p id=\"description\" style=\"font-size: 9pt\">Something written here</p>\n    </legend>\n\n<b-form @submit=\"onSubmit\">\n\n<b-form-group \n    label=\"Email:\">\n\n    <b-input-group>\n        <b-input-group-addon>\n            <span class=\"ion-email\"></span>\n        </b-input-group-addon>\n        <b-form-input id=\"email\" type=\"text\" v-model=\"form.email\"></b-form-input>\n    </b-input-group>\n\n</b-form-group>\n\n<b-form-group class=\"text-center\">\n    <b-button id=\"signup\" type=\"submit\" variant=\"primary\" class=\"text-center\">Send email</b-button>\n</b-form-group>\n\n\n</b-form>\n</b-container>\n\n</div>\n</template>\n\n<script>\nexport default {\n  data: function(){\n    return {\n      form: {\n          email: '',\n      }\n    }\n  },\n  methods: {\n    onSubmit (e) {\n      e.preventDefault();\n      alert(JSON.stringify(this.form));\n    }\n  }\n}\n</script>\n\n<!-- b-form-1.vue -->"],"sourceRoot":""}]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function(){
    return {
      form: {
          email: '',
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('b-container', {
    staticClass: "form-container"
  }, [_c('legend', {
    staticClass: "text-center"
  }, [_c('b', [_vm._v("Recover your password")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "9pt"
    },
    attrs: {
      "id": "description"
    }
  }, [_vm._v("Something written here")])]), _vm._v(" "), _c('b-form', {
    on: {
      "submit": _vm.onSubmit
    }
  }, [_c('b-form-group', {
    attrs: {
      "label": "Email:"
    }
  }, [_c('b-input-group', [_c('b-input-group-addon', [_c('span', {
    staticClass: "ion-email"
  })]), _vm._v(" "), _c('b-form-input', {
    attrs: {
      "id": "email",
      "type": "text"
    },
    model: {
      value: (_vm.form.email),
      callback: function($$v) {
        _vm.$set(_vm.form, "email", $$v)
      },
      expression: "form.email"
    }
  })], 1)], 1), _vm._v(" "), _c('b-form-group', {
    staticClass: "text-center"
  }, [_c('b-button', {
    staticClass: "text-center",
    attrs: {
      "id": "signup",
      "type": "submit",
      "variant": "primary"
    }
  }, [_vm._v("Send email")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b9dbdee8", module.exports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map