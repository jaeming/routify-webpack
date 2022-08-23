"use strict";
(self["webpackChunkwp5_starter_svelte"] = self["webpackChunkwp5_starter_svelte"] || []).push([["_routify_components_404_svelte"],{

/***/ "./.routify/components/[...404].svelte":
/*!*********************************************!*\
  !*** ./.routify/components/[...404].svelte ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "load": () => (/* binding */ load)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* .routify/components/[...404].svelte generated by Svelte v3.49.0 */


const file = ".routify/components/[...404].svelte";

function create_fragment(ctx) {
	let t0;
	let t1;
	let t2;

	const block = {
		c: function create() {
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("404 - Could not find the page \"");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*url*/ ctx[0]);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("\"");
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*url*/ 1) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*url*/ ctx[0]);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
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

const load = ({ route }) => ({
	status: 404,
	error: '[Routify] Page could not be found.',
	props: { url: route.url }
});

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('U5B_404u5D', slots, []);
	let { url } = $$props;
	const writable_props = ['url'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U5B_404u5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('url' in $$props) $$invalidate(0, url = $$props.url);
	};

	$$self.$capture_state = () => ({ load, url });

	$$self.$inject_state = $$props => {
		if ('url' in $$props) $$invalidate(0, url = $$props.url);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [url];
}

class U5B_404u5D extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { url: 0 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "U5B_404u5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*url*/ ctx[0] === undefined && !('url' in props)) {
			console.warn("<U5B_404u5D> was created without expected prop 'url'");
		}
	}

	get url() {
		throw new Error("<U5B_404u5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<U5B_404u5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; U5B_404u5D = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__.applyHmr({ m: module, id: "\".routify/components/[...404].svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: U5B_404u5D, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (U5B_404u5D);




/***/ })

}]);
//# sourceMappingURL=_routify_components_404_svelte._routify_components_404_svelte.js.map