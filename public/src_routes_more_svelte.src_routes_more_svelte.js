"use strict";
(self["webpackChunkwp5_starter_svelte"] = self["webpackChunkwp5_starter_svelte"] || []).push([["src_routes_more_svelte"],{

/***/ "./src/routes/more.svelte":
/*!********************************!*\
  !*** ./src/routes/more.svelte ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/routes/more.svelte generated by Svelte v3.49.0 */


const file = "src/routes/more.svelte";

function create_fragment(ctx) {
	let h2;

	const block = {
		c: function create() {
			h2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h2");
			h2.textContent = "More Page!";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h2, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h2, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h2);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('More', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<More> was created with unknown prop '${key}'`);
	});

	return [];
}

class More extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "More",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) { if (false) {}; More = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__.applyHmr({ m: module, id: "\"src/routes/more.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: More, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (More);



/***/ })

}]);
//# sourceMappingURL=src_routes_more_svelte.src_routes_more_svelte.js.map