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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_navbar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_form_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_register_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_footer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_form_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_login_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue__);







Vue.component('obl-navbar', __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue___default.a);
Vue.component('obl-register-form', __WEBPACK_IMPORTED_MODULE_2__components_register_form_vue___default.a);
Vue.component('obl-footer', __WEBPACK_IMPORTED_MODULE_3__components_footer_vue___default.a);
Vue.component('obl-login-form', __WEBPACK_IMPORTED_MODULE_4__components_login_form_vue___default.a);
Vue.component('obl-recover-password-form', __WEBPACK_IMPORTED_MODULE_5__components_recover_password_form_vue___default.a);

// Paths
Vue.prototype.$path = {
  global: '',
  home: '/',
  login: '/login',
  recover: '/recover',
};

Vue.prototype.$api = {
  api: '/api/',
  createUser: '/api/users',
};

//Routes
const routes = [
  { path: Vue.prototype.$path.home, component: __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default.a },
  { path: Vue.prototype.$path.login, component: __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default.a },
  { path: Vue.prototype.$path.recover, component: __WEBPACK_IMPORTED_MODULE_0__components_home_vue___default.a },
];

// Creation of the route instance
const router = new VueRouter({
  routes: routes,
});

// Creation of the app instance
const app = new Vue({
  el: '#app',
  data: {
    foo: 'foo',
  },
  router: router,
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(4),
  /* styles */
  null,
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
/* 3 */
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
/* 4 */
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
  }, [_vm._v("\n                    Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation.\n                ")])], 1)], 1)], 1), _vm._v(" "), _c('b-row', {
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(7),
  /* styles */
  null,
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
/* 6 */
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

module.exports = {
  computed: {
    isHome: () => this.$route.path === '/',
  },
};


/***/ }),
/* 7 */
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
      "src": __webpack_require__(8),
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./build/logo-white.svg?74102556e33b9f91e03242e41fabd5d9";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(11),
  /* styles */
  null,
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
/* 10 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: () => {
    return {
      form: {
        email: '',
        name: '',
        surname: '',
        password: '',
        passwordConfirmation: '',
        role: 'user',
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post(this.$api.createUser, this.form)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
  },
});


/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(14),
  /* styles */
  null,
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



/***/ }),
/* 14 */
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
      "src": __webpack_require__(15),
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./build/logo-black.svg?e6c9522a6f1e99a0f24f28d4ffde7dc5";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(18),
  /* styles */
  null,
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(21),
  /* styles */
  null,
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
/* 20 */
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
/* 21 */
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