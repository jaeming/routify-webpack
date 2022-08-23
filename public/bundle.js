/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.routify/routes.default.js":
/*!************************************!*\
  !*** ./.routify/routes.default.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  "meta": {},
  "id": "_default",
  "_regex": {},
  "_paramKeys": {},
  "module": false,
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "rootName": "default",
  "routifyDir": "file:///home/benji/demos/routify-3-webpack/.routify/routes.default.js",
  "children": [
    {
      "meta": {},
      "id": "_default_index_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "index",
      "file": {
        "path": "src/routes/index.svelte",
        "dir": "src/routes",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "asyncModule": () => __webpack_require__.e(/*! import() */ "src_routes_index_svelte").then(__webpack_require__.bind(__webpack_require__, /*! ./../src/routes/index.svelte */ "./src/routes/index.svelte")),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_more_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "more",
      "file": {
        "path": "src/routes/more.svelte",
        "dir": "src/routes",
        "base": "more.svelte",
        "ext": ".svelte",
        "name": "more"
      },
      "asyncModule": () => __webpack_require__.e(/*! import() */ "src_routes_more_svelte").then(__webpack_require__.bind(__webpack_require__, /*! ./../src/routes/more.svelte */ "./src/routes/more.svelte")),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_stuff_svelte",
      "_regex": {},
      "_paramKeys": {},
      "name": "stuff",
      "file": {
        "path": "src/routes/stuff.svelte",
        "dir": "src/routes",
        "base": "stuff.svelte",
        "ext": ".svelte",
        "name": "stuff"
      },
      "asyncModule": () => __webpack_require__.e(/*! import() */ "src_routes_stuff_svelte").then(__webpack_require__.bind(__webpack_require__, /*! ./../src/routes/stuff.svelte */ "./src/routes/stuff.svelte")),
      "children": []
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true
      },
      "_regex": {},
      "_paramKeys": {},
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => __webpack_require__.e(/*! import() */ "_routify_components_404_svelte").then(__webpack_require__.bind(__webpack_require__, /*! ./components/[...404].svelte */ "./.routify/components/[...404].svelte")),
      "children": []
    }
  ]
});

/***/ }),

/***/ "./node_modules/@roxi/routify/lib/common/RNode.js":
/*!********************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/common/RNode.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RNode": () => (/* binding */ RNode)
/* harmony export */ });
/** @template {import('./Routify').Routify<any>} InstanceType */
class RNode {
    /** @type {InstanceType['NodeType']} */
    parent

    /** @type {Object.<string, any>} */
    meta = {}

    /** @type {String} */
    id

    /**
     * @param {string} name
     * @param {ReservedCmpProps|string} module
     * @param {InstanceType} instance
     */
    constructor(name, module, instance) {
        /** @type {InstanceType} */
        this.instance = instance
        this.name = name

        instance.nodeIndex.push(this)
        this.module = module
        Object.defineProperty(this, 'instance', { enumerable: false })
        Object.defineProperty(this, 'parent', { enumerable: false })
    }

    /** @param {InstanceType['NodeConstructor']['prototype']} child */
    appendChild(child) {
        if (child.instance) child.parent = this
    }

    /**
     * Creates a new child node
     * Same as `node.appendChild(instance.createNode('my-node'))`
     * @param {string} name
     */
    createChild(name, module) {
        const node = /** @type {InstanceType['NodeConstructor']['prototype']} */ (
            this.instance.createNode(name, module)
        )
        this.appendChild(node)
        return node
    }

    /** @type {InstanceType['NodeConstructor']['prototype'][]} */
    get descendants() {
        return this.instance.nodeIndex.filter(node =>
            node.ancestors.find(n => n === this),
        )
    }

    remove() {
        const { nodeIndex } = this.instance
        const index = nodeIndex.findIndex(node => node === this)
        nodeIndex.splice(index, 1)
    }

    /** @type {InstanceType['NodeConstructor']['prototype'][]} */
    get ancestors() {
        let node = this
        const ancestors = []
        while ((node = node.parent)) ancestors.push(node)

        return ancestors
    }

    /** @type {InstanceType['NodeConstructor']['prototype']} */
    get root() {
        let node = this
        while (node.parent) node = node.parent
        return node
    }

    get isRoot() {
        return this === this.root
    }

    /** @type {InstanceType['NodeType'][]} */
    get children() {
        return this.instance.nodeIndex.filter(node => node.parent === this)
    }

    /** @returns {number} */
    get level() {
        return (this.parent?.level || 0) + 1
    }

    /** @type {Object.<string,RegExp>} */
    _regex = {}

    get regex() {
        // match against name to make sure regex stays working if name is changed
        const { name } = this
        if (!this._regex[name])
            this._regex[name] = this.instance.utils.getRegexFromName(this.name)
        return this._regex[name]
    }

    // save to regex key so regex gets invalidated if name changes
    set regex(value) {
        this._regex[this.name] = new RegExp(value)
    }

    /**
     * @type {Object.<string, string[]>}
     * */
    _paramKeys = {}

    get paramKeys() {
        // match against name to make sure regex stays working if name is changed
        const { name } = this
        if (!this._paramKeys[name])
            this._paramKeys[name] = this.instance.utils.getFieldsFromName(this.name)
        return this._paramKeys[name]
    }

    /**
     * returns parameters for a given urlFragment
     * @param {string} urlFragment
     */
    getParams(urlFragment) {
        const values = this.instance.utils.getValuesFromPath(this.regex, urlFragment)
        return this.instance.utils.mapFieldsWithValues(this.paramKeys, values)
    }

    // todo traverse should use the getChainTo API interface

    /**
     * resolve a node relative to this node
     * @param {string} path
     * @param {boolean} allowDynamic allow traversing dynamic components (parameterized)
     * @param {boolean} includeIndex
     * @param {boolean} silent don't throw errors for 404s
     * @returns {this}
     */
    traverse(path, allowDynamic = false, includeIndex = false, silent = false) {
        const isNamed = !path.startsWith('/') && !path.startsWith('.')
        return isNamed
            ? this.root.instance.nodeIndex.find(node => node.meta.name === path)
            : this.getChainTo(path, { allowDynamic, includeIndex, silent })?.pop().node
    }

    /**
     * Returns an array of steps to reach a path. Each path contains a node and params
     * @param {string} path
     * @param {object} [options]
     * @param {boolean} [options.allowDynamic=true]
     * @param {boolean} [options.includeIndex=true]
     * @param {boolean} [options.silent=false] don't throw errors for 404s
     * @param {this} [options.rootNode]
     
     */
    getChainTo(path, options) {
        options = {
            ...{ allowDynamic: true, includeIndex: true },
            ...options,
        }

        /** @type {InstanceType['NodeConstructor']['prototype']} */
        const originNode = path.startsWith('/') ? options.rootNode || this.root : this

        /**
         * The path from current node to the leaf page, eg. "blog", "posts", "some-story", "comments", "123"
         * @type {string[]}
         * */
        const stepsToLeaf = path
            .split('/')
            .filter(snip => snip !== '.')
            .filter(Boolean)

        let currentNodeStep = {
            node: originNode,
            stepsToLeaf,
            params: {},
            fragment: '',
        }
        const nodeSteps = [currentNodeStep]

        let inStaticDeadEnd = false // if true, don't look for a static component
        let inDynamicDeadEnd = false // if true, don't look for a dynamic component

        while (currentNodeStep.stepsToLeaf.length) {
            const [nextStep, ...restSteps] = currentNodeStep.stepsToLeaf
            // console.log(`in "${nodeSteps.map(ns => ns.node.name).join('/')}" looking for "${nextStep}"`)

            const nextNode =
                nextStep === '..'
                    ? currentNodeStep.node.parent
                    : (!inStaticDeadEnd &&
                          currentNodeStep.node.children.find(
                              node => node.name === nextStep,
                          )) ||
                      (options.allowDynamic &&
                          !inDynamicDeadEnd &&
                          currentNodeStep.node.children
                              .filter(({ meta }) => meta.dynamic && !meta.dynamicSpread)
                              .find(node => node.regex.test(nextStep))) ||
                      (options.allowDynamic &&
                          currentNodeStep.node.children.find(
                              node => node.meta.dynamicSpread,
                          ))

            if (nextNode) {
                // we found a node that matches the next url fragment
                // console.log(nodeSteps.map(ns => ns.node.name).join('/') + '/' + nextNode.name)

                const nodeStep = {
                    node: nextNode,
                    params: nextNode.meta.dynamicSpread
                        ? [nextStep]
                        : nextNode.meta.dynamic
                        ? nextNode.getParams(nextStep)
                        : {},
                    stepsToLeaf: restSteps,
                    fragment: nextStep,
                }
                currentNodeStep = nodeStep
                nodeSteps.push(nodeStep)
            } else if (!options.allowDynamic && options.silent) return null
            else if (!options.allowDynamic && !options.silent)
                throw new Error(
                    `${nodeSteps
                        .map(ns => ns.node.name || 'root')
                        .join('/')} could not travel to ${nextStep}`,
                )
            else if (currentNodeStep.node.meta.dynamicSpread) {
                // we didn't find a node matching the next step, but we're inside a dynamic spread parameter node, so we'll use that
                currentNodeStep.params.push(nextStep)
                currentNodeStep.fragment += `/${nextStep}`
                currentNodeStep.stepsToLeaf.shift()
                inDynamicDeadEnd = false
                inStaticDeadEnd = false
            } else {
                // we didn't find a node and the current node doesn't have spread parameters. Let's backtrack.
                // console.log(`backtracking from ${nodeSteps.map(ns => ns.node.name).join('/')}`)
                nodeSteps.pop()
                currentNodeStep = [...nodeSteps].pop()
                inDynamicDeadEnd = inStaticDeadEnd
                inStaticDeadEnd = true
                if (!currentNodeStep && options.silent) return null
                else if (!currentNodeStep && !options.silent)
                    throw new Error(`Could not find path "${path}" from ${this.name}`)
            }
        }

        // append an index component if one exists
        try {
            const indexNode =
                options.includeIndex && currentNodeStep.node.traverse('./index')

            if (indexNode)
                nodeSteps.push({
                    node: indexNode,
                    stepsToLeaf: [],
                    params: {},
                    fragment: '',
                })
        } catch (err) {}

        // normalize params so that spread parameters get a key
        nodeSteps.forEach(ns => {
            ns.params = Array.isArray(ns.params)
                ? { [ns.node.name.replace(/\[\.\.\.(.+)\]/, '$1')]: ns.params }
                : ns.params
        })

        return nodeSteps
    }

    /** @returns {InstanceType['NodeConstructor']['prototype']} */
    toJSON() {
        return {
            ...this,
            children: [...this.children],
        }
    }

    /** @returns {string} */
    get path() {
        return (
            '/' +
            [this, ...this.ancestors]
                .reverse()
                .map(node => node.name)
                .filter(Boolean)
                .join('/')
        )
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/common/Routify.js":
/*!**********************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/common/Routify.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Routify": () => (/* binding */ Routify)
/* harmony export */ });
/* harmony import */ var _runtime_Instance_UrlParamUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/Instance/UrlParamUtils.js */ "./node_modules/@roxi/routify/lib/runtime/Instance/UrlParamUtils.js");
/* harmony import */ var _RNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RNode.js */ "./node_modules/@roxi/routify/lib/common/RNode.js");



/**
 * @template {typeof RNode<any>} NodeConstructor
 */
class Routify {
    /** @type {typeof RNode<any>} */
    NodeConstructor

    /** @type {NodeConstructor['prototype']} */
    NodeType

    /** @type {NodeConstructor['prototype'][]} */
    nodeIndex = []

    /** @type {Object<string, NodeConstructor['prototype']>} */
    rootNodes = {}

    utils = new _runtime_Instance_UrlParamUtils_js__WEBPACK_IMPORTED_MODULE_0__.UrlParamUtils()

    /**
     * @param {string=} name relative path for the node
     * @param {any|string=} module svelte component
     * @returns {this['NodeType']}
     */
    createNode(name, module) {
        return new this.NodeConstructor(name, module, this)
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/common/helpers.js":
/*!**********************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/common/helpers.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assignNode": () => (/* binding */ assignNode),
/* harmony export */   "findNearestParent": () => (/* binding */ findNearestParent),
/* harmony export */   "getDistance": () => (/* binding */ getDistance)
/* harmony export */ });
/**
 * like assign, but without overwrite. First prop wins.
 * @param {object} target
 * @param  {...any} sources
 */
const gentleAssign = (target, ...sources) => {
    sources.forEach(source =>
        Object.keys(source).forEach(key => (target[key] = target[key] ?? source[key])),
    )
    return target
}

/**
 * deep assign node trees, will only overwrite undefined values
 * also merges meta
 * @param {RNodeRuntime} target eg. de
 * @param {...RNodeRuntime} sources eg. en
 * @returns {RNodeRuntime}
 */
const assignNode = (target, ...sources) => {
    // assign nodes
    gentleAssign(target, ...sources)

    // assign meta
    gentleAssign(target.meta, ...sources.map(s => s.meta))

    sources.forEach(source => {
        source.children.forEach(sNode => {
            let tNode = target.children.find(tNode => tNode.name === sNode.name)
            if (!tNode) tNode = target.createChild(null, null)
            assignNode(tNode, sNode)
        })
    })
    return target
}

/**
 *
 * @param {RNodeRuntime} node
 * @param {function(RNodeRuntime['parent']):any} callback
 * @returns {RNodeRuntime['parent']|undefined}
 */
const findNearestParent = (node, callback) => {
    let parent = /** @type {RNodeRuntime} */ node.parent
    while (parent) {
        if (callback(parent)) return parent
        parent = parent.parent
    }
}

/**
 * gets the ancestry distance between two nodes. Eg.:
 * the distance between the nodes /foo and /foo/bar/baz is 2
 * @param {RNodeRuntime} parentNode
 * @param {RNodeRuntime} childNode
 * @returns {number|undefined}
 */
const getDistance = (parentNode, childNode) => {
    let child = null
    let distance = 0

    while ((child = childNode.parent)) {
        distance++
        if (parentNode === childNode) return distance
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/common/utils.js":
/*!********************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/common/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPropsToComp": () => (/* binding */ addPropsToComp),
/* harmony export */   "deepAssign": () => (/* binding */ deepAssign),
/* harmony export */   "isObjectOrArray": () => (/* binding */ isObjectOrArray),
/* harmony export */   "mockRoutes": () => (/* binding */ mockRoutes),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "normalizePlugins": () => (/* binding */ normalizePlugins),
/* harmony export */   "sortPlugins": () => (/* binding */ sortPlugins)
/* harmony export */ });
/**
 * @template {{}} T
 * @template {{}} T2
 * @param {T} receiver
 * @param  {...T2} sources
 * @return {T&Partial<T2>} //partial because we're not guaranteed that types are preserved
 */
function deepAssign(receiver, ...sources) {
    for (const source of sources) {
        if (Array.isArray(source)) {
            // transform receiver to an array if the source is an array
            // @ts-ignore
            receiver = Array.isArray(receiver) ? receiver : []
            // @ts-ignore
            receiver.push(...source) // @ts-ignore
        } else
            for (const key of Reflect.ownKeys(source)) {
                if ([source[key], receiver[key]].every(isObjectOrArray)) {
                    receiver[key] = deepAssign(receiver[key], source[key])
                } else receiver[key] = source[key]
            }
    }
    return receiver
}

const isObject = v =>
    v &&
    typeof v === 'object' &&
    !['Array', 'Date', 'Regexp'].includes(v.constructor?.name)

const isObjectOrArray = v => Array.isArray(v) || isObject(v)

/**
 * checks for repeating patterns to prevent infinite loops
 */
class RepetitionChecker {
    history = []
    /**
     * Pushes an entry to history. If the entry already exists, it checks
     * if the history between previously added entry and current entry is a
     * repetition. If so, it returns the repetition.
     * @param {any} entry
     * @returns {false|any[]}
     */
    pushAndCheck = entry => {
        const { history } = this
        const prevIndexCursor = history.lastIndexOf(entry) + 1
        history.push(entry)
        if (prevIndexCursor) {
            const lastIndexCursor = history.length
            const sliceLength = lastIndexCursor - prevIndexCursor
            const slice1 = history.slice(prevIndexCursor - sliceLength, prevIndexCursor)
            const slice2 = history.slice(prevIndexCursor)
            if (JSON.stringify(slice1) === JSON.stringify(slice2)) return slice2
        }
        return false
    }
}

/**
 * @param {RoutifyBuildtimePlugin[]} plugins
 * @returns {RoutifyBuildtimePlugin[]}
 */
const normalizePlugins = plugins =>
    // clone, flatten and normalize
    plugins.flat().map(plugin => ({
        ...plugin,
        before: [].concat(plugin.before).filter(Boolean), //convert to, or keep as array
        after: [].concat(plugin.after).filter(Boolean), //convert to, or keep as array
    }))

/**
 * @param {RoutifyBuildtimePlugin[]} plugins
 * @returns {RoutifyBuildtimePlugin[]}
 */
function sortPlugins(plugins) {
    const repetitionChecker = new RepetitionChecker()

    const _sort = () => {
        plugins.some((plugin1, index1) =>
            plugins.some((plugin2, index2) => {
                const plugin2ShouldPrecede =
                    plugin1.after.includes(plugin2.name) ||
                    plugin2.before.includes(plugin1.name)
                const plugin2DoesPrecede = index2 < index1
                if (plugin2ShouldPrecede && !plugin2DoesPrecede) {
                    // move plugin2 to the index of plugin1
                    plugins.splice(index2, 1) //remove
                    plugins.splice(index1, 0, plugin2) //insert

                    // make sure we're not stuck in a loop
                    const loop = repetitionChecker.pushAndCheck(plugin2)
                    if (loop)
                        // todo create loopException
                        throw new Error(
                            'found infinite loop in plugins. Repeating pattern:\n' +
                                `${loop
                                    .map(
                                        p =>
                                            `${p.name} (${['before', 'after']
                                                .map(name => `${name}: ${p[name]}`)
                                                .join('; ')} )`,
                                    )
                                    .join('\n')
                                    .replace(/before: ;/g, '')
                                    .replace(/after:  /g, '')
                                    .replace(/\( \)/g, '')}`,
                        )
                    _sort()
                    return true
                }
            }),
        )
    }

    _sort()

    return plugins
}

/**
 * mock routes from an object
 * @template {RoutifyBuildtime|RoutifyRuntime} T
 * @param {T} instance
 * @param {Object.<string, any>} routes
 * @example
 * mockRoutes(instance, {
 *   module: {
 *     about: {},
 *     posts: { '[slug]': {} },
 *     admin: { crud: {}, users: {} },
 *   },
 * })
 */
const mockRoutes = (instance, routes) => {
    const rootNode = instance.createNode('module')
    const queue = [{ parent: rootNode, children: routes.module }]

    while (queue.length) {
        const job = queue.shift()
        Object.entries(job.children).forEach(([name, routes]) => {
            const parent = job.parent.createChild(name, '')
            parent.meta.name = name
            if (name.startsWith('[')) parent.meta.dynamic = true
            if (name.startsWith('[...')) parent.meta.dynamicSpread = true
            queue.push({
                /** @ts-ignore our mocked route is lacking a lot of properties */
                parent,
                children: routes,
            })
        })
    }

    return rootNode
}

/**
 * Adds props to a Svelte component
 * @example
 * const MyCompWithProps = addPropsToComp(MyComp, {msg: 'hello world'})
 * @template {typeof import('svelte/internal').SvelteComponentDev} Component
 * @param {Component} Comp
 * @param {Object<string, any>} props
 * @returns {Component}
 */
const addPropsToComp = (Comp, props) => {
    const ssrWrapper = (Comp, props) => ({
        ...Comp,
        $$render: (...params) => {
            params[1] = { ...params[1], ...props }
            return Comp.$$render(...params)
        },
    })

    const domWrapper = (Comp, props) =>
        function (options) {
            return new Comp({ ...options, props: { ...options.props, ...props } })
        }
    const wrapper = Comp['$$render'] ? ssrWrapper : domWrapper

    return wrapper(Comp, props)
}

// todo fix types below. Callback param is any, but should be V. Probably needs overloading

/**
 * Returns store value on the next store update.
 * If wanted is specified, the value will only be returned once the value matches.
 * Wanted can be a callback.
 * @example
 * // returns the next value from clock
 * const hour = await next(clock)
 * @example
 * // resolves when clock is 5
 * await next(clock, 5)
 * @example
 * // resolves when clock is 5
 * const hour = await next(clock, val => val === 5)
 * @template {import('svelte/store').Readable<V>} T
 * @template V
 * @param {T} store
 * @param {((wanted: V)=>Boolean)|V=} wanted
 * @param {boolean=} strict use === matching instead of == for the wanted value
 * @returns {Promise<V>}
 */
const next = (store, wanted, strict) =>
    new Promise(resolve => {
        let unsub
        unsub = store.subscribe(value => {
            // skip the first initial return
            if (!unsub) return
            if (
                typeof wanted === 'undefined' ||
                value === wanted ||
                (value == wanted && !strict) ||
                (typeof wanted === 'function' && /** @type {function} */ (wanted)(value))
            ) {
                resolve(value)
                unsub
            }
        })
    })


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Global/BrowserAdapter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Global/BrowserAdapter.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBrowserAdapter": () => (/* binding */ createBrowserAdapter)
/* harmony export */ });
/** @returns {BrowserAdapter} */
const createBrowserAdapter = opts => {
    const delimiter = opts?.delimiter || ';'

    return {
        // Called by each router when the browser URL changes. Returns an internal URL for each respective router.
        toRouter: (url, router) => {
            const formatRE = router.name ? `${router.name}=(.+?)` : `(.+?)`
            const RE = new RegExp(`(^|${delimiter})${formatRE}(${delimiter}|$)`)

            const matches = url.match(RE)
            return matches ? matches[2] : '/'
        },
        // compiles all router URLS into a single URL for the browser.
        toBrowser: routers =>
            routers
                .map(r => (r.name ? `${r.name}=` : '') + r.url.external())
                .join(delimiter),
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Global/Global.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Global/Global.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Global": () => (/* binding */ Global),
/* harmony export */   "globalInstance": () => (/* binding */ globalInstance)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@roxi/routify/lib/runtime/utils/index.js");
/* harmony import */ var _BrowserAdapter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserAdapter.js */ "./node_modules/@roxi/routify/lib/runtime/Global/BrowserAdapter.js");



class Global {
    /** @type {RoutifyRuntime[]} */
    instances = []

    constructor() {
        globalThis['__routify'] = this

        this.log = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.createRootLogger)() // ROUTIFY-DEV-ONLY
    }

    /** @type {Router[]} */
    get routers() {
        return [].concat(...this.instances.map(instance => instance.routers))
    }

    browserAdapter = (0,_BrowserAdapter_js__WEBPACK_IMPORTED_MODULE_1__.createBrowserAdapter)()

    /** @param {Router} router */
    urlFromBrowser = router => {
        // ROUTIFY-DEV-ONLY-START
        if (_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.debugWrapper)
            return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.debugWrapper)(
                this.browserAdapter.toRouter,
                'calling browserAdapter.toRouter',
            )((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.urlFromAddress)(), router)
        // ROUTIFY-DEV-ONLY-END

        return this.browserAdapter.toRouter((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.urlFromAddress)(), router)
    }

    register(instance) {
        this.instances.push(instance)
        return this
    }
}

let globalInstance = new Global()


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Instance/RNodeRuntime.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Instance/RNodeRuntime.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RNodeRuntime": () => (/* binding */ RNodeRuntime)
/* harmony export */ });
/* harmony import */ var _common_RNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/RNode.js */ "./node_modules/@roxi/routify/lib/common/RNode.js");
/* harmony import */ var _Node_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node.svelte */ "./node_modules/@roxi/routify/lib/runtime/Instance/Node.svelte");
/* harmony import */ var _RoutifyRuntime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoutifyRuntime.js */ "./node_modules/@roxi/routify/lib/runtime/Instance/RoutifyRuntime.js");




/**
 * @extends {RNode<RoutifyRuntime>}
 */
class RNodeRuntime extends _common_RNode_js__WEBPACK_IMPORTED_MODULE_0__.RNode {
    /** @type {LoadSvelteModule} */
    asyncModule

    /**
     * @param {string} name
     * @param {ReservedCmpProps} module
     * @param {RoutifyRuntime} instance
     * @param {LoadSvelteModule=} asyncModule
     */
    constructor(name, module, instance, asyncModule) {
        super(name, module, instance)

        /** @type {ReservedCmpProps} */
        this.module = module

        /** @type {LoadSvelteModule} */
        this.asyncModule = asyncModule
    }

    get children() {
        return this.instance.nodeIndex
            .filter(node => node.parent === this)
            .sort((prev, curr) => (prev.meta.order || 0) - (curr.meta.order || 0))
    }

    get pages() {
        return this.pagesWithIndex.filter(node => node.name !== 'index')
    }

    get pagesWithIndex() {
        return this.children
            .filter(node => !node.meta.fallback)
            .filter(node => !node.name.startsWith('_'))
            .filter(node => !node.name.includes('['))
            .filter(node => !(node.meta?.order === false))
    }

    /** @ts-ignore SvelteComponentConstructor is only available in VSCode */
    /** @returns {Promise<import('svelte/internal').SvelteComponentDev>} */
    async getRawComponent() {
        const module = await this.loadModule()
        return module?.default
    }

    async loadModule() {
        if (!this.module && this.asyncModule) {
            this.module = await this.asyncModule()
        }
        return this.module
    }

    /**
     * Returns in a sync/async component in a synchronous wrapper
     * @returns {() => Node}
     **/
    get component() {
        const node = this

        return function (options) {
            options.props = {
                ...options.props,
                passthrough: options.props,
                node,
            }
            return new _Node_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({ ...options })
        }
    }

    /**
     * @param {object} snapshotRoot
     */
    importTree = snapshotRoot => {
        const queue = [[this, snapshotRoot]]

        while (queue.length) {
            const [node, snapshot] = queue.pop()
            const { children, ...nodeSnapshot } = snapshot
            Object.assign(node, nodeSnapshot)

            // queue children
            for (const childSnapshot of children) {
                const childNode = node.createChild(
                    snapshot.name || snapshot.rootName || '',
                )
                queue.push([childNode, childSnapshot])
            }
        }
        return this
    }

    get _fallback() {
        return this.children.find(node => node.meta.fallback) || this.parent?._fallback
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Instance/RoutifyRuntime.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Instance/RoutifyRuntime.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoutifyRuntime": () => (/* binding */ RoutifyRuntime)
/* harmony export */ });
/* harmony import */ var _RNodeRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RNodeRuntime.js */ "./node_modules/@roxi/routify/lib/runtime/Instance/RNodeRuntime.js");
/* harmony import */ var _Global_Global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Global/Global.js */ "./node_modules/@roxi/routify/lib/runtime/Global/Global.js");
/* harmony import */ var _common_Routify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Routify.js */ "./node_modules/@roxi/routify/lib/common/Routify.js");




/**
 * @extends {Routify<typeof RNodeRuntime>}
 */
class RoutifyRuntime extends _common_Routify_js__WEBPACK_IMPORTED_MODULE_2__.Routify {
    NodeConstructor = _RNodeRuntime_js__WEBPACK_IMPORTED_MODULE_0__.RNodeRuntime
    mode = 'runtime'

    /**@type {Router[]} routers this instance belongs to */
    routers = []

    /** @type {Object<string, RNodeRuntime>} */
    rootNodes = {}

    constructor(options) {
        super()

        this.options = options
        if (options.routes) {
            this.rootNodes[options.routes.rootName || 'unnamed'] = this.createNode(
                options.routes.rootName,
            ).importTree(options.routes)
        }
        this.global = _Global_Global_js__WEBPACK_IMPORTED_MODULE_1__.globalInstance.register(this)
        Object.defineProperty(this, 'routers', { enumerable: false })
        this.log = this.global.log
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Instance/UrlParamUtils.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Instance/UrlParamUtils.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UrlParamUtils": () => (/* binding */ UrlParamUtils)
/* harmony export */ });
const defaultRe = /\[(.+?)\]/gm // matches [string]
class UrlParamUtils {
    constructor(RE = defaultRe) {
        this.RE = RE
    }

    /**
     * returns ["slug", "id"] from "my[slug]and[id]"
     * @param {string} name
     * @returns {string[]}
     */
    getFieldsFromName = name => [...name.matchAll(this.RE)].map(v => v[1])

    /**
     * converts "my[slug]and[id]" to /my(.+)and(.+)/gm
     * @param {string} name
     * @returns {RegExp}
     */
    getRegexFromName = name => new RegExp('^' + name.replace(this.RE, '(.+)') + '$')

    /**
     * returns an array of values matching a regular expression and path
     * @param {RegExp} re
     * @param {string} path
     * @returns {string[]}
     */
    getValuesFromPath = (re, path) => (path.match(re) || []).slice(1)

    /**
     * converts (['a', 'b', 'c'], [1, 2, 3]) to {a: 1, b: 2, c: 3}
     * @param {string[]} fields
     * @param {string[]} values
     * @returns
     */
    mapFieldsWithValues = (fields, values) =>
        this.haveEqualLength(fields, values) &&
        fields.reduce((map, field, index) => {
            map[field] = values[index]
            return map
        }, {})

    haveEqualLength = (fields, values) => {
        if (fields.length !== values.length)
            throw new Error(
                'fields and values should be of same length' +
                    `\nfields: ${JSON.stringify(fields)}` +
                    `\nvalues: ${JSON.stringify(values)}`,
            )
        return true
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Route/Route.js":
/*!***************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Route/Route.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Route": () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var _RouteFragment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RouteFragment.js */ "./node_modules/@roxi/routify/lib/runtime/Route/RouteFragment.js");


/** @type {UrlState[]} */
const URL_STATES = ['pushState', 'replaceState', 'popState']

class Route {
    /** @type {RouteFragment[]} */
    allFragments = []
    /** @type {RouteFragment[]} only fragments with components */
    get fragments() {
        return this.router.transformFragments.run(this.allFragments)
    }

    /** @type {Promise<{route: Route}>} */
    loaded

    /** @type {RoutifyLoadReturn} */
    load = {
        status: 200,
        error: null,
        maxage: null,
        props: {},
        redirect: null,
    }

    /**
     * @param {Router} router
     * @param {string} url
     * @param {UrlState} mode
     * @param {Object} state a state to attach to the route
     */
    constructor(router, url, mode, state) {
        this.router = router
        this.url = url
        this.mode = mode
        this.state = state

        if (!router.rootNode) {
            this.router.log.error("Can't navigate without a rootNode")
            const err = new Error("Can't navigate without a rootNode")
            Object.assign(err, { routify: { router } })
            throw err
        }

        if (!URL_STATES.includes(mode))
            throw new Error('url.mode must be pushState, replaceState or popState')

        this.allFragments = this._createFragments()
        this.log = router.log.createChild('[route]') // ROUTIFY-DEV-ONLY
        this.log.debug('created', this) // ROUTIFY-DEV-ONLY
    }

    get params() {
        const match = this.url.match(/\?.+/)
        const query = (match && match[0]) || ''

        return Object.assign(
            {},
            ...this.allFragments.map(fragment => fragment.params),
            this.router.queryHandler.parse(query, this),
        )
    }

    async loadRoute() {
        const { router } = this
        const pipeline = [
            this.runBeforeUrlChangeHooks,
            this.loadComponents,
            this.runGuards,
            this.runPreloads,
        ]

        this.loaded = new Promise(async (resolve, reject) => {
            for (const pretask of pipeline) {
                const passedPreTask = await pretask.bind(this)()
                const routerHasNewerPendingRoute = this !== router.pendingRoute.get()
                if (!router.pendingRoute.get()) {
                    resolve({ route: router.activeRoute.get() })
                    return
                } else if (routerHasNewerPendingRoute) {
                    router.pendingRoute.get().loaded.then(resolve).catch(reject)
                    return
                } else if (!passedPreTask) {
                    router.pendingRoute.set(null)
                    return
                }
            }

            // the route made it through all pretasks, lets set it to active
            this.router.log.debug('set active route', this) // ROUTIFY-DEV-ONLY

            const $activeRoute = this.router.activeRoute.get()
            if ($activeRoute) router.history.push($activeRoute)

            router.activeRoute.set(this)

            router.afterUrlChange.run({
                route: this,
                history: [...router.history].reverse(),
            })

            this.router.log.debug('unset pending route', this) // ROUTIFY-DEV-ONLY
            router.pendingRoute.set(null)
            resolve({ route: this })
        })
        return this.loaded
    }

    /**
     * converts async module functions to sync functions
     */
    async loadComponents() {
        this.log.debug('load components', this) // ROUTIFY-DEV-ONLY
        await Promise.all(this.fragments.map(fragment => fragment.node.loadModule()))
        return true
    }

    async runPreloads() {
        this.log.debug('run preloads', this) // ROUTIFY-DEV-ONLY

        /** @type { RoutifyLoadContext } */
        const ctx = {
            route: this,
            node: [...this.fragments].pop()?.node,
        }

        for (const fragment of this.fragments) {
            if (fragment.node.module?.load) {
                fragment.load = await fragment.node.module.load(ctx)
                Object.assign(this.load, fragment.load)

                if (this.load.redirect) return this.router.url.replace(this.load.redirect)
            }
        }

        return this
    }

    // todo deprecate?
    async runGuards() {
        this.log.debug(`running guards for ${this.url}`, this) // ROUTIFY-DEV-ONLY

        const components = this.fragments
            .map(fragment => fragment.node.module)
            .filter(module => module?.guard)
        // process each component's guard
        for (const module of components) {
            console.warn(
                '"guard" will be deprecated. Please use "load.redirect" instead.',
            )
            const result = await module.guard(this)
            if (!result) return false
        }
        return true
    }

    async runBeforeUrlChangeHooks() {
        return await this.router.beforeUrlChange.run({ route: this })
    }

    /**
     * creates fragments. A fragment is the section between each / in the URL
     */
    _createFragments() {
        const url = this.url.replace(/#.+/, '')
        const rootNode = this.router.rootNode
        const nodeChain = this.router.rootNode.getChainTo(url, {
            rootNode,
            allowDynamic: true,
            includeIndex: true,
        })
        const fragments = nodeChain.map(
            nc => new _RouteFragment_js__WEBPACK_IMPORTED_MODULE_0__.RouteFragment(this, nc.node, nc.fragment, nc.params),
        )
        return fragments
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Route/RouteFragment.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Route/RouteFragment.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouteFragment": () => (/* binding */ RouteFragment)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@roxi/routify/lib/runtime/Route/utils.js");


class RouteFragment {
    /**
     * @param {Route} route the route this fragment belongs to
     * @param {RNodeRuntime} node the node that corresponds to the fragment
     * @param {String} urlFragment a fragment of the url (fragments = url.split('/'))
     * @param {Object<string, any>} params
     */
    constructor(route, node, urlFragment, params) {
        this.route = route
        this.node = node
        /** @type {Partial<RoutifyLoadReturn>} */
        this.load = undefined
        this.urlFragment = urlFragment
        this.params = params

        Object.defineProperty(this, 'route', { enumerable: false })
    }

    /**
     * @type {Object.<string, string|string[]>}
     **/
    _params = {}

    get params() {
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.URIDecodeObject)(this._params)
    }

    set params(params) {
        this._params = params
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Route/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Route/utils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "URIDecodeObject": () => (/* binding */ URIDecodeObject),
/* harmony export */   "getNearestAncestorNodeWithSpreadParam": () => (/* binding */ getNearestAncestorNodeWithSpreadParam),
/* harmony export */   "getUrlFragments": () => (/* binding */ getUrlFragments),
/* harmony export */   "indexOfNode": () => (/* binding */ indexOfNode),
/* harmony export */   "spreadsLast": () => (/* binding */ spreadsLast)
/* harmony export */ });
const spreadsLast = node => (node.name.match(/\[\.\.\.(.+)\]/) ? 1 : -1)

/**
 *
 * @param {RouteFragment[]} routeFragments
 * @returns {RNodeRuntime}
 */
const getNearestAncestorNodeWithSpreadParam = routeFragments => {
    for (const fragment of [...routeFragments].reverse()) {
        for (const node of fragment.node.parent?.children || []) {
            const match = node.name.match(/\[\.\.\.(.+)\]/)
            if (match) return node
        }
    }
}

const getUrlFragments = url =>
    url
        .replace(/[?#].+/, '') // strip the search and hash query
        .replace(/\/$/, '') // strip trailing slash
        .split('/')
        .slice(1) // skip the first fragment since it will always be empty

const indexOfNode = (fragments, node) =>
    fragments.findIndex(fragment => fragment.node === node)

/**
 * @template {string|string[]} T
 * @param {T} strOrArr
 * @returns {T}
 */
const uriDecodeStringOrArray = strOrArr =>
    strOrArr instanceof Array
        ? /** @type {T} */ (strOrArr.map(decodeURI))
        : /** @type {T} */ (decodeURI(strOrArr))

const URIDecodeObject = obj =>
    Object.entries(obj).reduce(
        (_return, [key, value]) => ({
            ..._return,
            [key]: uriDecodeStringOrArray(value),
        }),
        {},
    )


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Router/Router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Router/Router.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router),
/* harmony export */   "createRouter": () => (/* binding */ createRouter)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _Route_Route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Route/Route.js */ "./node_modules/@roxi/routify/lib/runtime/Route/Route.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@roxi/routify/lib/runtime/utils/index.js");
/* harmony import */ var _urlReflectors_ReflectorBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./urlReflectors/ReflectorBase.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/ReflectorBase.js");
/* harmony import */ var _Global_Global_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Global/Global.js */ "./node_modules/@roxi/routify/lib/runtime/Global/Global.js");
/* harmony import */ var _Instance_RoutifyRuntime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Instance/RoutifyRuntime.js */ "./node_modules/@roxi/routify/lib/runtime/Instance/RoutifyRuntime.js");
/* harmony import */ var _urlReflectors_Address_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./urlReflectors/Address.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Address.js");
/* harmony import */ var _urlReflectors_Internal_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./urlReflectors/Internal.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Internal.js");
/* harmony import */ var hookar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! hookar */ "./node_modules/hookar/esm/index.mjs");
/* harmony import */ var _plugins_reset_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plugins/reset/index.js */ "./node_modules/@roxi/routify/lib/runtime/plugins/reset/index.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/utils.js */ "./node_modules/@roxi/routify/lib/common/utils.js");
/**
 * @typedef { Object } ParentCmpCtx
 * @prop { Route } route
 * @prop { RNodeRuntime } node
 * @prop { Object.<String|Number, String|Number> } localParams
 * @prop { Object.<String|Number, any> } options
 */

/**
 * @typedef { Object } RouterOptionsNormalizedOverlay
 * @prop { UrlRewrite[] } urlRewrite hook: transforms paths to and from router and browser
 * @prop { RouterInitCallback[] } beforeRouterInit hook: runs before each router initiation
 * @prop { RouterInitCallback[] } afterRouterInit hook: runs after each router initiation
 * @prop { BeforeUrlChangeCallback[] } beforeUrlChange hook: guard that runs before url changes
 * @prop { AfterUrlChangeCallback[] } afterUrlChange hook: runs after url has changed
 * @prop { TransformFragmentsCallback[] } transformFragments hook: transform route fragments after navigation
 * @prop { OnDestroyRouterCallback[] } onDestroy hook: runs before router is destroyed
 */

/**
 * @typedef { RoutifyRuntimeOptions & RouterOptionsNormalizedOverlay } RouterOptionsNormalized
 */













// todo move stripNullFields and normalizeRouterOptions to utils file.
const stripNullFields = obj =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))

/**
 * merges options.plugin into options
 * @param {Partial<RoutifyRuntimeOptions>} options
 * @param {Partial<RouterOptionsNormalized>=} config
 */
const normalizeRouterOptions = (options, config) => {
    config = config || {
        name: '',
        beforeRouterInit: [],
        afterRouterInit: [],
        urlRewrite: [],
        beforeUrlChange: [],
        afterUrlChange: [],
        transformFragments: [],
        onDestroy: [],
    }

    // separate plugins and options
    const { plugins, ...optionsOnly } = options
    const optionsGroups = [...(plugins || []), optionsOnly]
    optionsGroups.forEach(pluginOptions => {
        if ('plugin' in pluginOptions) normalizeRouterOptions(pluginOptions, config)

        Object.entries(pluginOptions).forEach(([field, value]) => {
            if (Array.isArray(config[field]))
                config[field].push(...[value].flat().filter(Boolean))
            else config[field] = value || config[field]
        })
    })
    return config
}

const defaultPlugins = [(0,_plugins_reset_index_js__WEBPACK_IMPORTED_MODULE_9__["default"])()]

/**
 * @implements { Readable<Router> }
 */
class Router {
    /** @type { RouteStore } */
    pendingRoute = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getable)(null)
    /** @type { RouteStore } */
    activeRoute = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getable)(null)

    _urlReflector = null

    /** @type {UrlRewrite[]} */
    urlRewrites = []

    /** @type { import('hookar').HooksCollection<RouterInitCallback> } */
    beforeRouterInit = (0,hookar__WEBPACK_IMPORTED_MODULE_8__.createSequenceHooksCollection)()
    /** @type { import('hookar').HooksCollection<RouterInitCallback> } */
    afterRouterInit = (0,hookar__WEBPACK_IMPORTED_MODULE_8__.createSequenceHooksCollection)()
    /** @type { import('hookar').HooksCollection<BeforeUrlChangeCallback> } */
    beforeUrlChange = (0,hookar__WEBPACK_IMPORTED_MODULE_8__.createGuardsCollection)()
    /** @type { import('hookar').HooksCollection<AfterUrlChangeCallback> } */
    afterUrlChange = (0,hookar__WEBPACK_IMPORTED_MODULE_8__.createSequenceHooksCollection)()
    /** @type { import('hookar').HooksCollection<TransformFragmentsCallback> } */
    transformFragments = (0,hookar__WEBPACK_IMPORTED_MODULE_8__.createPipelineCollection)()
    /** @type { import('hookar').HooksCollection<OnDestroyRouterCallback> } */
    onDestroy = (0,hookar__WEBPACK_IMPORTED_MODULE_8__.createSequenceHooksCollection)()

    parentElem = null

    /** @type {QueryHandler} */
    queryHandler = {
        parse: (search, route) => (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.fromEntries)(new URLSearchParams(search)),
        stringify: (params, route) => {
            const query = new URLSearchParams(params).toString()
            return query ? `?${query}` : ''
        },
    }

    url = {
        internal: () => this.url.getPending() || this.url.getActive(),
        external: () => this.getExternalUrl(),
        getActive: () => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(this.activeRoute)?.url,
        getPending: () => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(this.pendingRoute)?.url,
        toString: () => this.url.internal(),
        set: this._setUrl.bind(this),
        push: (url, state = {}) => this._setUrl(url, 'pushState', false, state),
        replace: (url, state = {}) => this._setUrl(url, 'replaceState', false, state),
        pop: (url, state = {}) => this._setUrl(url, 'popState', false, state),
    }

    /**
     * function that resolves after the active route has changed
     * @returns {Promise<Route>} */
    ready = async () =>
        (!this.pendingRoute.get() && this.activeRoute.get()) || (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_10__.next)(this.activeRoute)

    /** @type {Route[]} */
    history = []

    /**
     * @param {Partial<RoutifyRuntimeOptions>} input
     */
    constructor(input) {
        const { subscribe, set } = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(this)
        this.subscribe = subscribe
        this.triggerStore = () => set(this)

        input.plugins = [...(input.plugins || []), ...defaultPlugins].filter(Boolean)
        this.init(input)
        this.params = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)(this.activeRoute, $activeRoute => $activeRoute.params)
        // we're using setTimeout to make sure outgoing routers have been destroyed
        // this also prevents the first router from absorbing the url from the address and
        // then reflecting only its internal url before other routers have absorbed the url
        this.afterUrlChange(() => setTimeout(() => this._urlReflector.reflect()))
        this.activeRoute.get = () => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(this.activeRoute)
        this.pendingRoute.get = () => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(this.pendingRoute)
    }

    /**
     * @param {Partial<RoutifyRuntimeOptions>} input
     */
    init(input) {
        const firstInit = !this.options

        // we need to strip undefine / null fields since they would overwrite existing options
        input = stripNullFields(input)
        /** @type {Partial<RouterOptionsNormalized>} */
        this.options = normalizeRouterOptions({ ...this.options, ...input })

        let {
            instance,
            rootNode,
            name,
            routes,
            urlRewrite,
            urlReflector,
            url,
            passthrough,
            beforeUrlChange,
            afterUrlChange,
            transformFragments,
            onDestroy,
            beforeRouterInit,
            afterRouterInit,
            queryHandler,
        } = this.options

        if (queryHandler) this.queryHandler = queryHandler

        beforeUrlChange.forEach(this.beforeUrlChange)
        transformFragments.forEach(this.transformFragments)
        afterUrlChange.forEach(this.afterUrlChange)
        onDestroy.forEach(this.onDestroy)
        beforeRouterInit.forEach(this.beforeRouterInit)
        afterRouterInit.forEach(this.afterRouterInit)

        this.beforeRouterInit.run({ router: this, firstInit })

        const parentCmpCtx = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getContextMaybe)('routify-fragment-context')

        /** @type {RoutifyRuntime} */
        this.instance =
            instance ||
            this.instance ||
            parentCmpCtx?.route.router.instance ||
            _Global_Global_js__WEBPACK_IMPORTED_MODULE_4__.globalInstance.instances[0] ||
            new _Instance_RoutifyRuntime_js__WEBPACK_IMPORTED_MODULE_5__.RoutifyRuntime({})

        this.name = name
        this.urlRewrites = urlRewrite

        // ROUTIFY-DEV-ONLY-START
        this.log =
            this.log || this.instance.log.createChild(this.name || '[unnamed instance]')
        // ROUTIFY-DEV-ONLY-END

        if (passthrough && !(passthrough instanceof Router))
            passthrough = parentCmpCtx?.route.router || passthrough

        this.passthrough = passthrough || this.passthrough

        _Global_Global_js__WEBPACK_IMPORTED_MODULE_4__.globalInstance.instances.forEach(inst => {
            const index = inst.routers.indexOf(this)
            if (index !== -1) inst.routers.splice(index, 1)
        })

        this.instance.routers.push(this)

        if (routes) this.importRoutes(routes)

        this.parentCmpCtx = parentCmpCtx
        /** @type {RNodeRuntime} */
        this.rootNode = rootNode || this.rootNode || this.instance.rootNodes.default

        this.log.debug('initiated router') // ROUTIFY-DEV-ONLY

        if (this.url.getActive()) {
            this.log.debug('router was created with activeUrl') // ROUTIFY-DEV-ONLY
            this._setUrl(this.url.getActive(), 'pushState', true)
        }

        const shouldInstallUrlReflector =
            !this.urlReflector ||
            (urlReflector && !(this.urlReflector instanceof urlReflector))

        if (shouldInstallUrlReflector) {
            urlReflector =
                urlReflector ||
                (typeof window != 'undefined' ? _urlReflectors_Address_js__WEBPACK_IMPORTED_MODULE_6__.AddressReflector : _urlReflectors_Internal_js__WEBPACK_IMPORTED_MODULE_7__.InternalReflector)
            this.setUrlReflector(urlReflector)
        }

        if (url) this.url.replace(url)
        this.triggerStore()
        this.afterRouterInit.run({ router: this, firstInit })
    }

    setParentElem = elem => (this.parentElem = elem.parentElement)

    importRoutes(routes) {
        this.rootNode = this.instance.createNode().importTree(routes)
        this.instance.rootNodes[routes.rootName || 'unnamed'] = this.rootNode
    }

    /**
     * converts a URL or Routify's internal URL to an external URL (for the browser)
     * @param {string=} url
     * @returns
     */
    getExternalUrl = url => {
        const result = this.urlRewrites.reduce(
            (_url, rewrite) => rewrite.toExternal(_url, { router: this }),
            url || this.url.internal(),
        )
        return result
    }

    /**
     * converts an external URL (from the browser) to an internal URL
     * @param {string} url
     * @returns
     */
    getInternalUrl = url =>
        this.urlRewrites.reduce(
            (_url, rewrite) => rewrite.toInternal(_url, { router: this }),
            url,
        )

    /**
     *
     * @param {string} url
     * @param {UrlState} mode pushState, replaceState or popState
     * @param {boolean} [isInternal=false] if the URL is already internal, skip rewrite.toInternal
     * @param {Object=} state a state to attach to the route
     * @returns {Promise<true|false>}
     */
    async _setUrl(url, mode, isInternal, state) {
        if (!isInternal) url = this.getInternalUrl(url)

        url = url || '/'
        url = url.replace(/(.+)\/+([#?]|$)/, '$1$2') // strip trailing slashes
        const { activeRoute, pendingRoute } = this

        // ROUTIFY-DEV-ONLY-START
        const { debug, groupCollapsed, trace, groupEnd } = this.log
        if (this.log.level >= 4) {
            const info = {
                url,
                mode,
                prev: this.url.internal(),
                browserOld: (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.urlFromAddress)(),
                state,
            }
            ;[groupCollapsed('set url', info), trace(), groupEnd()]
        }
        // ROUTIFY-DEV-ONLY-END

        if (!url.startsWith('/')) url = url.replace(new URL(url).origin, '')

        const route = new _Route_Route_js__WEBPACK_IMPORTED_MODULE_1__.Route(this, url, mode, state)

        const currentRoute = pendingRoute.get() || activeRoute.get()
        if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.identicalRoutes)(currentRoute, route)) {
            debug('current route is identical - skip', currentRoute, route) // ROUTIFY-DEV-ONLY
            return true
        }

        route.log.debug('set pending route', route) // ROUTIFY-DEV-ONLY
        pendingRoute.set(route)
        await route.loadRoute()

        return true
    }

    destroy() {
        this.log.debug(`destroying router`) // ROUTIFY-DEV-ONLY
        this.instance.routers = this.instance.routers.filter(router => router !== this)
        this.onDestroy.run({ router: this })
    }

    /** @type {BaseReflector} */
    get urlReflector() {
        return this._urlReflector
    }

    /** @param {typeof BaseReflector} UrlReflector */
    setUrlReflector(UrlReflector) {
        this._urlReflector?.uninstall()
        this._urlReflector = new UrlReflector(this)
        this._urlReflector.install()
        this.triggerStore()
    }
}

/**
 * Creates a new router
 * @param  {Partial<RoutifyRuntimeOptions>} options
 */
const createRouter = options => new Router(options)


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Address.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Address.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressReflector": () => (/* binding */ AddressReflector)
/* harmony export */ });
/* harmony import */ var hookar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hookar */ "./node_modules/hookar/esm/index.mjs");
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/index.js */ "./node_modules/@roxi/routify/lib/runtime/utils/index.js");
/* harmony import */ var _ReflectorBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReflectorBase.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/ReflectorBase.js");





class AddressReflector extends _ReflectorBase_js__WEBPACK_IMPORTED_MODULE_3__.BaseReflector {
    /** @param {Router} router */
    constructor(router) {
        super(router)
        const { instance, urlRewrites } = router
        const { urlFromBrowser, browserAdapter } = instance.global

        if (!history['onPushstate']) {
            this.log.debug('polyfill history hooks') // ROUTIFY-DEV-ONLY
            polyfillHistory()
        }

        /** @param {('push'|'replace')} method */
        const createStateEventHandler = method => {
            return function (data, title, url) {
                const routerName = data?.routify?.router ?? false

                if (routerName === false) url = browserAdapter.toRouter(url, router)
                else if (routerName !== router.name) return false
                for (const rewrite of urlRewrites)
                    url = rewrite.toInternal(url, { router })
                router.url[method](url)
            }
        }

        this.absorb = () => router.url.replace(urlFromBrowser(router))
        this._pushstateHandler = createStateEventHandler('push')
        this._replacestateHandler = createStateEventHandler('replace')
        this._popstateHandler = () => router.url.pop(urlFromBrowser(router))
    }

    install() {
        this.hooks = [
            history['onPushstate'](this._pushstateHandler),
            history['onReplacestate'](this._replacestateHandler),
            history['onPopstate'](this._popstateHandler),
        ]

        if (!(0,svelte_store__WEBPACK_IMPORTED_MODULE_1__.get)(this.router.activeRoute)) this.absorb()
        else this.reflect()
    }

    uninstall() {
        this.hooks.forEach(unreg => unreg())
        setTimeout(() => this.reflect())
    }

    reflect = () => {
        const { mode } = (0,svelte_store__WEBPACK_IMPORTED_MODULE_1__.get)(this.router.activeRoute)
        if (mode === 'popState') return false
        const { routers, browserAdapter } = this.router.instance.global

        const addressRouters = routers.filter(
            router => router.urlReflector instanceof this.constructor,
        )

        const url = browserAdapter.toBrowser(addressRouters)

        // ROUTIFY-DEV-ONLY-START
        this.log.debug('pushing internal url to browser', {
            mode,
            url,
            currentBrowserUrl: (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.urlFromAddress)(),
            currentInternalUrl: this.router.url.internal(),
        })
        // ROUTIFY-DEV-ONLY-END

        history[`${mode}Native`]({}, '', url)
    }
}

function polyfillHistory() {
    const hooks = {
        /** @type {import('hookar').HooksCollection<History['pushState']>} */
        onPushstate: (0,hookar__WEBPACK_IMPORTED_MODULE_0__.createSequenceHooksCollection)(),
        /** @type {import('hookar').HooksCollection<History['replaceState']>} */
        onReplacestate: (0,hookar__WEBPACK_IMPORTED_MODULE_0__.createSequenceHooksCollection)(),
        onPopstate: (0,hookar__WEBPACK_IMPORTED_MODULE_0__.createSequenceHooksCollection)(),
    }
    Object.assign(history, hooks)

    // backup native methods
    const { pushState, replaceState } = history
    history['pushStateNative'] = pushState
    history['replaceStateNative'] = replaceState

    history.pushState = hooks.onPushstate.run
    history.replaceState = hooks.onReplacestate.run
    window.addEventListener('popstate', hooks.onPopstate.run)

    return true
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Internal.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Internal.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InternalReflector": () => (/* binding */ InternalReflector)
/* harmony export */ });
/* harmony import */ var _ReflectorBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReflectorBase.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/ReflectorBase.js");


// todo should these extend a base class?

class InternalReflector extends _ReflectorBase_js__WEBPACK_IMPORTED_MODULE_0__.BaseReflector {}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/LocalStorage.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/LocalStorage.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageReflector": () => (/* binding */ LocalStorageReflector)
/* harmony export */ });
/* harmony import */ var _ReflectorBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReflectorBase.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/ReflectorBase.js");


class LocalStorageReflector extends _ReflectorBase_js__WEBPACK_IMPORTED_MODULE_0__.BaseReflector {
    /** @param {Router} router */
    constructor(router) {
        super(router)
        this.storageName = `__routify-router-${this.router.name}`
    }
    reflect() {
        window.localStorage.setItem(this.storageName, this.router.url.internal())
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/ReflectorBase.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/ReflectorBase.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseReflector": () => (/* binding */ BaseReflector)
/* harmony export */ });
class BaseReflector {
    /** @param {Router} router */
    constructor(router) {
        this.router = router
        this.log = this.router.log
    }
    install() {}
    uninstall() {}
    reflect() {}
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/helpers/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/helpers/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activeRoute": () => (/* binding */ activeRoute),
/* harmony export */   "afterUrlChange": () => (/* binding */ afterUrlChange),
/* harmony export */   "beforeUrlChange": () => (/* binding */ beforeUrlChange),
/* harmony export */   "context": () => (/* binding */ context),
/* harmony export */   "getMRCA": () => (/* binding */ getMRCA),
/* harmony export */   "getPath": () => (/* binding */ getPath),
/* harmony export */   "getScrollBoundaries": () => (/* reexport safe */ _scroll__WEBPACK_IMPORTED_MODULE_2__.getScrollBoundaries),
/* harmony export */   "goto": () => (/* binding */ goto),
/* harmony export */   "isActive": () => (/* binding */ isActive),
/* harmony export */   "isActiveRoute": () => (/* binding */ isActiveRoute),
/* harmony export */   "isActiveUrl": () => (/* binding */ isActiveUrl),
/* harmony export */   "meta": () => (/* binding */ meta),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "params": () => (/* binding */ params),
/* harmony export */   "pendingRoute": () => (/* binding */ pendingRoute),
/* harmony export */   "persistentScrollTo": () => (/* reexport safe */ _scroll__WEBPACK_IMPORTED_MODULE_2__.persistentScrollTo),
/* harmony export */   "resolveNode": () => (/* binding */ resolveNode),
/* harmony export */   "scopedScrollIntoView": () => (/* reexport safe */ _scroll__WEBPACK_IMPORTED_MODULE_2__.scopedScrollIntoView),
/* harmony export */   "traverseNode": () => (/* binding */ traverseNode),
/* harmony export */   "url": () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@roxi/routify/lib/runtime/utils/index.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scroll */ "./node_modules/@roxi/routify/lib/runtime/helpers/scroll.js");





/**
 * gets most recent common ancestor
 * @param {RNodeRuntime} node1
 * @param {RNodeRuntime} node2
 */
const getMRCA = (node1, node2) => {
    const lineage1 = [node1, ...node1.ancestors]
    const lineage2 = [node2, ...node2.ancestors]
    return lineage1.find(node => lineage2.includes(node))
}

const getPath = (node1, node2) => {
    const lineage1 = [node1, ...node1.ancestors]
    const lineage2 = [node2, ...node2.ancestors]
    const mrca = getMRCA(node1, node2)
    const backtrackSteps = lineage1.indexOf(mrca)
    const backtrackStr = backtrackSteps ? '../'.repeat(backtrackSteps) : ''
    const forwardSteps = lineage2.indexOf(mrca)
    const forwardStepsStr = lineage2
        .slice(0, forwardSteps)
        .reverse()
        .map(n => n.name)
        .join('/')
    return backtrackStr + forwardStepsStr
}

/**
 * @callback Goto
 * @param {string} path relative, absolute or named URL
 * @param {Object.<string, string>=} userParams
 * @param {any=} options
 * @type {Readable<Goto>} */
const goto = {
    subscribe: (run, invalidate) => {
        const { router } = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts
        return (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)(url, $url => (path, userParams, options) => {
            const newUrl = $url(path, userParams)
            router.url.push(newUrl)
        }).subscribe(run, invalidate)
    },
}

/**
 * @template T
 * @typedef {import('svelte/store').Readable<T>} Readable
 */

/**
 * @typedef {Object} IsActiveOptions
 * @prop {Boolean} [recursive=true] return true if descendant is active
 */

/**
 * @callback Url
 * @param {string} inputPath
 * @param {Object.<string, string>=} userParams
 * @returns {string}
 *
 * @type {Readable<Url>}
 **/
const url = {
    subscribe: (run, invalidate) => {
        const { router } = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts
        const originalOriginNode = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.fragment.node
        return (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)(router.activeRoute, activeRoute => {
            // in case we swapped the routes tree (rootNode), make sure we find
            // the node that corresponds with the previous origin
            // otherwise mrca will break as there's no shared ancestor
            const originNode = router.rootNode.traverse(originalOriginNode.path)
            return (inputPath, userParams = {}) => {
                // we want absolute urls to be relative to the nearest router. Ironic huh
                const offset = inputPath.startsWith('/') ? router.rootNode.path : ''
                const targetNode = originNode.traverse(offset + inputPath)
                if (!targetNode) {
                    console.error('could not find destination node', inputPath)
                    return
                }
                const mrca = getMRCA(targetNode, router.rootNode)
                const path = '/' + getPath(mrca, targetNode)

                const params = {
                    ...inheritedParams(targetNode, activeRoute),
                    ...userParams,
                }

                const internalUrl = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.populateUrl)(path, params, activeRoute)
                return router.getExternalUrl(internalUrl)
            }
        }).subscribe(run, invalidate)
    },
}

/**
 *
 * @param {RNodeRuntime} node
 * @param {Route} route
 */
const inheritedParams = (node, route) => {
    const lineage = [node, ...node.ancestors].reverse()
    const params = lineage.map(
        _node =>
            route.allFragments.find(
                // compare both path and node
                // node could have moved /shop/[product], eg: to /en/shop/[product]
                // but could also have been replaced by a different, but matching node
                // if the route tree changed, eg: /en/shop/[product] /da/shop/[product]
                fragment => fragment.node === _node || fragment.node.path === _node.path,
            )?.params,
    )
    return Object.assign({}, ...params)
}

/**
 * @type {Readable<Object.<string, any>>}
 */
const params = {
    subscribe: (run, invalidate) =>
        (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.router.params, params => params).subscribe(run, invalidate),
}

/**
 * @callback IsActive
 * @param {String=} path
 * @param {Object.<string,string>} [params]
 * @param {IsActiveOptions} [options]
 * @returns {Boolean}
 *
 * @type {Readable<IsActive>} */
const isActive = {
    subscribe: (run, invalidate) =>
        (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.router.activeRoute, isActiveRoute).subscribe(run, invalidate),
}

/**
 * @param {Route} $route
 */
const isActiveRoute = $route => isActiveUrl($route.url, $route.params)

const isActiveUrl = (url, actualParams = {}) => {
    const stripLastIndexAndSlash = str => str.replace(/(\/index)?\/*$/, '')

    // strip search and hash
    url = url.replace(/[?#].+/, '')
    url = stripLastIndexAndSlash(url)

    /** @type {IsActive} */
    return (path, params = {}, options = {}) => {
        const { recursive } = { recursive: true, ...options }

        // return false if wanted params aren't satisfied
        for (const wantedParam of Object.keys(params))
            if (actualParams[wantedParam] !== params[wantedParam]) return false

        path = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.pathAndParamsToUrl)(path, { ...actualParams, ...params }, x => '', true)
        // if path ends in /index, make /index optional. The browser URL might say /foo and not /foo/index
        path = stripLastIndexAndSlash(path)
        const suffix = recursive ? '(/|$)' : '/?$'

        const regexPath = new RegExp(`^${path}${suffix}`)
        return regexPath.test(url)
    }
}
/**
 * @param {string} path
 */
const resolveNode = path => {
    const { node } = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.fragment
    const { router } = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts
    return traverseNode(node, path, router)
}

/**
 *
 * @param {RNodeRuntime} node
 * @param {string} path
 * @param {Router} router
 * @returns {RNodeRuntime}
 */
const traverseNode = (node, path, router) =>
    path.startsWith('/') ? router.rootNode.traverse(`.${path}`) : node.traverse(path)

/**
 * @template {Function} T
 * @template U
 * @param {T} callback
 * @returns {Readable<T extends () => infer U ? U : any>}
 */
const pseudoStore = callback => ({
    subscribe: run => {
        run(callback())
        return () => {}
    },
})

const context = pseudoStore(() => _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.fragment)

const node = pseudoStore(() => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(context).node)

const meta = pseudoStore(() => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(node).meta)

/** @type {Readable<Route>} */
const activeRoute = {
    subscribe: run => _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.router.activeRoute.subscribe(run),
}

/** @type {Readable<Route>} */
const pendingRoute = {
    subscribe: run => _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.router.pendingRoute.subscribe(run),
}

/**@type {Readable<function(AfterUrlChangeCallback):any>} */
const afterUrlChange = {
    subscribe: run => {
        const hookHandles = []
        /**
         * @param {AfterUrlChangeCallback} callback
         */
        const register = callback => {
            const unhook = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.router.afterUrlChange(callback)
            hookHandles.push(unhook)
            return unhook
        }
        run(register)
        return () => hookHandles.map(unhook => unhook())
    },
}

/**@type {Readable<function(BeforeUrlChangeCallback):any>} */
const beforeUrlChange = {
    subscribe: run => {
        const hookHandles = []
        /**
         * @param {BeforeUrlChangeCallback} callback
         */
        const register = callback => {
            const unhook = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.contexts.router.beforeUrlChange(callback)
            hookHandles.push(unhook)
            return unhook
        }
        run(register)
        return () => hookHandles.map(unhook => unhook())
    },
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/helpers/scroll.js":
/*!******************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/helpers/scroll.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getScrollBoundaries": () => (/* binding */ getScrollBoundaries),
/* harmony export */   "persistentScrollTo": () => (/* binding */ persistentScrollTo),
/* harmony export */   "scopedScrollIntoView": () => (/* binding */ scopedScrollIntoView)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./node_modules/@roxi/routify/lib/runtime/index.js");


/**
 * @type {import('./scroll')['persistentScrollTo']}
 * @param {HTMLElement} el
 * @param {ScrollIntoViewOptions} options
 * @param {number} timeout
 */
// @ts-ignore
const persistentScrollTo = (el, options, timeout) => {
    options = options || {}
    options.behavior = 'auto'
    const limits = getScrollBoundaries()
    const observer = new MutationObserver(() => scopedScrollIntoView(el, limits))
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
    })
    const stopScroll = () => observer.disconnect()

    if (timeout) {
        return new Promise(resolve =>
            setTimeout(() => {
                stopScroll()
                resolve()
            }, timeout),
        )
    } else {
        timeout
        return stopScroll
    }
}
/**
 * returns all the elements that should scrolling shouldn't propagate past, ie. routify-scroll=lock and router parent elements
 * @returns  {HTMLElement[]}
 */
const getScrollBoundaries = () => [
    ...document.querySelectorAll('[data-routify-scroll="lock"]'),
    ..._index_js__WEBPACK_IMPORTED_MODULE_0__.globalInstance.routers.filter(router => router.parentCmpCtx)
        .map(router => router.parentElem),
]

/**
 *
 * @param {HTMLElement} elem
 * @param {HTMLElement[]=} limits
 */
const scopedScrollIntoView = (elem, limits) => {
    limits = limits || getScrollBoundaries()

    let parent = elem
    while (parent?.scrollTo && !limits.includes(parent)) {
        const targetRect = elem.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()

        const top = targetRect.top - parentRect.top
        const left = targetRect.left - parentRect.left

        parent.scrollTo({ top, left })
        parent = parent.parentElement
    }
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressReflector": () => (/* reexport safe */ _Router_urlReflectors_Address_js__WEBPACK_IMPORTED_MODULE_4__.AddressReflector),
/* harmony export */   "Component": () => (/* reexport safe */ _renderer_ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "InternalReflector": () => (/* reexport safe */ _Router_urlReflectors_Internal_js__WEBPACK_IMPORTED_MODULE_6__.InternalReflector),
/* harmony export */   "LocalStorageReflector": () => (/* reexport safe */ _Router_urlReflectors_LocalStorage_js__WEBPACK_IMPORTED_MODULE_5__.LocalStorageReflector),
/* harmony export */   "Router": () => (/* reexport safe */ _Router_Router_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "RouterClass": () => (/* reexport safe */ _Router_Router_js__WEBPACK_IMPORTED_MODULE_1__.Router),
/* harmony export */   "Routify": () => (/* binding */ Routify),
/* harmony export */   "activeRoute": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.activeRoute),
/* harmony export */   "afterUrlChange": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.afterUrlChange),
/* harmony export */   "assignNode": () => (/* reexport safe */ _common_helpers_js__WEBPACK_IMPORTED_MODULE_9__.assignNode),
/* harmony export */   "beforeUrlChange": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.beforeUrlChange),
/* harmony export */   "context": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.context),
/* harmony export */   "createRouter": () => (/* reexport safe */ _Router_Router_js__WEBPACK_IMPORTED_MODULE_1__.createRouter),
/* harmony export */   "findNearestParent": () => (/* reexport safe */ _common_helpers_js__WEBPACK_IMPORTED_MODULE_9__.findNearestParent),
/* harmony export */   "getDistance": () => (/* reexport safe */ _common_helpers_js__WEBPACK_IMPORTED_MODULE_9__.getDistance),
/* harmony export */   "getMRCA": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.getMRCA),
/* harmony export */   "getPath": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.getPath),
/* harmony export */   "getScrollBoundaries": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.getScrollBoundaries),
/* harmony export */   "globalInstance": () => (/* reexport safe */ _Global_Global_js__WEBPACK_IMPORTED_MODULE_3__.globalInstance),
/* harmony export */   "goto": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.goto),
/* harmony export */   "isActive": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.isActive),
/* harmony export */   "isActiveRoute": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.isActiveRoute),
/* harmony export */   "isActiveUrl": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.isActiveUrl),
/* harmony export */   "meta": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.meta),
/* harmony export */   "node": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.node),
/* harmony export */   "params": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.params),
/* harmony export */   "pendingRoute": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.pendingRoute),
/* harmony export */   "persistentScrollTo": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.persistentScrollTo),
/* harmony export */   "resolveNode": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.resolveNode),
/* harmony export */   "scopedScrollIntoView": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.scopedScrollIntoView),
/* harmony export */   "traverseNode": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.traverseNode),
/* harmony export */   "url": () => (/* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__.url)
/* harmony export */ });
/* harmony import */ var _Router_Router_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router/Router.svelte */ "./node_modules/@roxi/routify/lib/runtime/Router/Router.svelte");
/* harmony import */ var _Router_Router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Router/Router.js */ "./node_modules/@roxi/routify/lib/runtime/Router/Router.js");
/* harmony import */ var _Instance_RoutifyRuntime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Instance/RoutifyRuntime.js */ "./node_modules/@roxi/routify/lib/runtime/Instance/RoutifyRuntime.js");
/* harmony import */ var _Global_Global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global/Global.js */ "./node_modules/@roxi/routify/lib/runtime/Global/Global.js");
/* harmony import */ var _Router_urlReflectors_Address_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router/urlReflectors/Address.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Address.js");
/* harmony import */ var _Router_urlReflectors_LocalStorage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Router/urlReflectors/LocalStorage.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/LocalStorage.js");
/* harmony import */ var _Router_urlReflectors_Internal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Router/urlReflectors/Internal.js */ "./node_modules/@roxi/routify/lib/runtime/Router/urlReflectors/Internal.js");
/* harmony import */ var _renderer_ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./renderer/ComposeFragments.svelte */ "./node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte");
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/index.js */ "./node_modules/@roxi/routify/lib/runtime/helpers/index.js");
/* harmony import */ var _common_helpers_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/helpers.js */ "./node_modules/@roxi/routify/lib/common/helpers.js");
// @ts-ignore










const Routify = _Instance_RoutifyRuntime_js__WEBPACK_IMPORTED_MODULE_2__.RoutifyRuntime







/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/plugins/reset/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/plugins/reset/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Removes parent modules from a node
 *  @returns {RoutifyRuntimePlugin}
 **/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => ({
    beforeUrlChange: ({ route }) => {
        const fragments = route.allFragments

        fragments.forEach(fragment => {
            const { reset } = fragment.node.meta
            if (reset) {
                const index = fragments.indexOf(fragment)
                const deleteCount = reset === true ? index : Number(reset)
                const start = index - deleteCount
                fragments.splice(start, index)
            }
        })
        return true
    },
}));


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/renderer/utils/normalizeMulti.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/renderer/utils/normalizeMulti.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeMulti": () => (/* binding */ normalizeMulti)
/* harmony export */ });
/**
 * @typedef {string|RNodeRuntime} MultiPage
 * @typedef {{pages: RNodeRuntime[], single: Boolean}} Multi
 * @typedef {Boolean|MultiPage[]|Partial<{pages: MultiPage[], single: Boolean}>} MultiInput
 */

/**
 *
 * @param {RNodeRuntime} node
 */
const nodeIsPage = node =>
    !node.meta.fallback && !node.name.startsWith('_') && node.meta?.order !== false

/**
 * @param {RNodeRuntime} refNode
 * @param {import('../types').RenderContext} parentContext
 */
const getChildren = (refNode, parentContext) => {
    const parentNode = parentContext?.node || refNode.parent

    const matches = parentNode
        ? parentNode.children.filter(node => node === refNode || nodeIsPage(node))
        : [refNode]

    return matches
}

/**
 * @param {RNodeRuntime | string} nodeOrString
 */
const coerceStringToNode = (nodeOrString, refNode) =>
    typeof nodeOrString === 'string' ? refNode.traverse(nodeOrString) : nodeOrString

/**
 * @param {undefined|Boolean|MultiPage[]} pagesInput
 * @param {RNodeRuntime} refNode
 * @param {import('../types').RenderContext} parentContext
 * @returns {RNodeRuntime[]}
 */
const coercePagesToNodes = (pagesInput, refNode, parentContext) => {
    const pageInputs = Array.isArray(pagesInput)
        ? pagesInput
        : getChildren(refNode, parentContext)
    return pageInputs.map(page => coerceStringToNode(page, refNode))
}

/**
 * @param {boolean|Array|Object} multiInput
 * @returns {Multi}
 */
const convertToObj = multiInput =>
    multiInput instanceof Object
        ? !Array.isArray(multiInput)
            ? multiInput
            : { pages: multiInput }
        : {}

/**
 * normalize multi object. If no pages are specified, use siblings of the refNode
 * @param {MultiInput} multiInput
 * @param {RNodeRuntime|null} refNode
 * @param {import('../types').RenderContext} parentContext
 * @returns {Multi}
 */
const normalizeMulti = (multiInput, refNode, parentContext) => {
    const multi = convertToObj(multiInput)

    multi.single = multi.single || !multiInput
    multi.pages = coercePagesToNodes(multi.pages, refNode, parentContext)

    return multi
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/utils/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/utils/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoIncrementer": () => (/* binding */ autoIncrementer),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "contexts": () => (/* binding */ contexts),
/* harmony export */   "createRootLogger": () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.createRootLogger),
/* harmony export */   "debugWrapper": () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.debugWrapper),
/* harmony export */   "distinctBy": () => (/* binding */ distinctBy),
/* harmony export */   "fromEntries": () => (/* binding */ fromEntries),
/* harmony export */   "getContextMaybe": () => (/* binding */ getContextMaybe),
/* harmony export */   "getUrlFromClick": () => (/* binding */ getUrlFromClick),
/* harmony export */   "getable": () => (/* binding */ getable),
/* harmony export */   "identicalRoutes": () => (/* binding */ identicalRoutes),
/* harmony export */   "insertWildcards": () => (/* binding */ insertWildcards),
/* harmony export */   "isDescendantElem": () => (/* binding */ isDescendantElem),
/* harmony export */   "loadState": () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.loadState),
/* harmony export */   "pathAndParamsToUrl": () => (/* binding */ pathAndParamsToUrl),
/* harmony export */   "populateUrl": () => (/* binding */ populateUrl),
/* harmony export */   "saveState": () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.saveState),
/* harmony export */   "urlFromAddress": () => (/* binding */ urlFromAddress)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@roxi/routify/lib/runtime/utils/logger.js");


 // ROUTIFY-DEV-ONLY

// /**
//  * writable with subscription hooks
//  * @param {any} value
//  */
// export const writable2 = value => {
//     let subscribers = []
//     let { set, subscribe, update } = writable(value)

//     const hooks = {
//         onSub: () => {},
//         onUnsub: () => {},
//         onFirstSub: () => {},
//         onLastUnsub: () => {},
//     }

//     const newSubscribe = (run, invalidator) => {
//         // hooks
//         hooks.onSub()
//         if (!subscribers.length) hooks.onFirstSub()

//         const unsub = subscribe(run, invalidator)
//         subscribers.push(unsub)
//         return () => {
//             hooks.onUnsub()
//             if (subscribers.length === 1) hooks.onLastUnsub()

//             subscribers = subscribers.filter(_unsub => _unsub !== unsub)
//             unsub()
//         }
//     }

//     return {
//         set,
//         subscribe: newSubscribe,
//         update,
//         subscribers,
//         hooks,
//     }
// }

const isDescendantElem = parent => elem => {
    while ((elem = elem.parentNode)) if (elem === parent) return true
    return false
}

const getUrlFromClick = event => {
    const el = event.target.closest('a')
    const href = el && el.href

    if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.button ||
        (event.key && event.key !== 'Enter') ||
        event.defaultPrevented
    )
        return
    if (!href || el.target || el.host !== location.host) return

    const url = new URL(href)
    const relativeUrl = url.pathname + url.search + url.hash

    event.preventDefault()
    return relativeUrl
}

// TODO ADD TEST
/**
 * Creates an url from a path and params objects
 * @example no wildcard
 * ```javascript
 * pathAndParamsToUrl('/foo/[slug]/[id]', {slug: 'hello'})
 * // /foo/hello/[id]
 * ```
 * @example wildcard
 * ```javascript
 * pathAndParamsToUrl('/foo/[slug]/[id]', {slug: 'hello'}, undefined, true)
 * // /foo/hello/.*?
 * ```
 * @param {string} path
 * @param {Object.<string|number,string|number>} params
 * @param {function} queryHandler
 * @param {boolean} useWildcards inserts wildcards for unmatched params
 * @returns {string}
 */
const pathAndParamsToUrl = (path, params = {}, queryHandler, useWildcards) => {
    Object.entries(params).forEach(([key, val]) => {
        if (path.includes(`[${key}]`)) {
            path = path.replace(`[${key}]`, val)
            delete params[key]
        }
    })

    if (useWildcards) path = insertWildcards(path)

    return path + queryHandler(params)
}

/**
 * replaces /path/[foo]/bar with /path/.*?/bar
 * @param {string} str
 */
const insertWildcards = str => {
    return str.replace(/\[.*?\]/, '.*?')
}

const fromEntries = iterable => {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val
        return obj
    }, {})
}

/**
 * replaces [] brackets in a string with actual params
 * @param {string} path
 * @param {Object.<string,(string|string[])>} params
 * @param {Route} route
 * @returns
 */
const populateUrl = (path, params, route) => {
    /** @type {Object.<string, string>} */
    const overloads = {}
    Object.entries(params).forEach(([param, value]) => {
        const RE = new RegExp(`\\[(\.\.\.)?${param}\\]|\\:${param}`)
        value = Array.isArray(value) ? value.join('/') : value
        if (path.match(RE)) path = path.replace(RE, encodeURI(value))
        else overloads[param] = value
    })
    const query = route.router.queryHandler.stringify(overloads, route)

    return path + query
}

const urlFromAddress = () =>
    (({ pathname, search, hash }) => pathname + search + hash)(window.location)

let _globalAutoIncrementerCount = {}
const autoIncrementer = (
    storeObj = _globalAutoIncrementerCount,
    name = '__NA',
) => {
    storeObj[name] = storeObj[name] || 0
    storeObj[name]++
    return storeObj[name]
}

/**
 * @template  T
 * @param {string} prop
 * @returns {function(T, number, T[]): boolean}
 */
const distinctBy = prop => (obj, i, arr) =>
    arr.findIndex(_obj => _obj[prop] === obj[prop]) === i

const contexts = {
    /** @type {Router} */
    get router() {
        return (0,svelte__WEBPACK_IMPORTED_MODULE_1__.getContext)('routify-fragment-context').router
    },
    /** @type {FragmentContext} */
    get fragment() {
        return (0,svelte__WEBPACK_IMPORTED_MODULE_1__.getContext)('routify-fragment-context')
    },
}

/**
 * gets context if available without throwing errors outside component initialization
 * @param {string} name
 * @returns
 */
const getContextMaybe = name => {
    try {
        return (0,svelte__WEBPACK_IMPORTED_MODULE_1__.getContext)(name)
    } catch (err) {}
}

/**
 * @template T
 * @typedef {import('svelte/store').Writable<T> & {get: ()=>T}} Getable
 */

/**
 * like writable, but with an added get prop
 * @template T
 * @param  {T} value
 * @param  {import('svelte/store').StartStopNotifier<T>=} start
 * @returns {Getable<T>}
 */
const getable = (value, start) => {
    const store = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(value, start)
    return Object.assign(store, { get: () => (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(store) })
}

/**
 * checks if all route.fragments and url are identical
 * @param  {...Route} routes
 * @returns
 */
const identicalRoutes = (...routes) =>
    routes
        .map(route => JSON.stringify([route?.allFragments, route?.url]))
        .reduce((prev, curr) => prev === curr && curr)

/**
 * Shallow clones class instance.
 * Variadic parameters are assigned to clone.
 * @template T
 * @param {T} obj
 * @param  {...any} rest
 * @returns {T}
 */
const clone = (obj, ...rest) =>
    Object.assign(Object.create(Object.getPrototypeOf(obj)), obj, ...rest)


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/utils/logger.js":
/*!****************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/utils/logger.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRootLogger": () => (/* binding */ createRootLogger),
/* harmony export */   "debugWrapper": () => (/* binding */ debugWrapper),
/* harmony export */   "loadState": () => (/* binding */ loadState),
/* harmony export */   "saveState": () => (/* binding */ saveState)
/* harmony export */ });
/* harmony import */ var consolite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! consolite */ "./node_modules/consolite/esm/index.mjs");

const log = (0,consolite__WEBPACK_IMPORTED_MODULE_0__.createLogger)('[rf3]')

const createRootLogger = () => {
    Object.assign(log, loadState())
    return new Proxy(log, {
        get: (target, prop) => target[prop],
        set: (target, prop, value) => {
            target[prop] = value
            saveState(log)
            return false
        },
    })
}

const loadState = () => {
    if (typeof window === 'undefined') {
        const level = process.env.DEBUG_LEVEL
        const filter = process.env.DEBUG_FILTER
        return { level, filter }
    } else {
        return JSON.parse(localStorage.getItem('__routify.logState') || '{}')
    }
}

const saveState = log => {
    const { level, filter } = log
    if (typeof window === 'undefined') {
        process.env.DEBUG_LEVEL = level
        process.env.DEBUG_FILTER = filter
    } else localStorage.setItem('__routify.logState', JSON.stringify({ filter, level }))
}

/**
 * @template {function} T
 * @param {T} fn
 * @param {string} msg
 * @returns {T}
 */
const debugWrapper =
    (fn, msg) =>
    /** @ts-ignore */
    (...params) => {
        const result = fn(...params)
        log.debug(msg, { params, result })
        return result
    }


/***/ }),

/***/ "./node_modules/consolite/esm/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/consolite/esm/index.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Consolite": () => (/* binding */ Consolite),
/* harmony export */   "createLogger": () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * @callback Filter
 * @param {string[]} prefixes
 */

/**
 * @typedef {Object} Logger
 * @prop {createLogger} create Creates new logger.
 * @prop {createLogger} createChild Creates a child logger. Prefix will be inherited. Level and levels will be inherited if undefined.
 * @prop {createLogger} createParent Creates a parent logger. Prefix will be inherited. Level and levels will be inherited if undefined.
 * @prop {Object.<string, number>} levels
 * @prop {number} level
 * @prop {Filter|string|RegExp} filter
 * @prop {Logger} root
 * @prop {Logger} parent
 */

const defaults = {
  filter: '',
  level: 3,
  levels: {
    default: 3,
    error: 1,
    warn: 2,
    debug: 4,
    trace: 4,
  },
}

const noop = x => x
const unique = (v, i, a) => a.indexOf(v) === i

// $& means the whole matched string
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const escapeIfString = str => (typeof str === 'string' ? escapeRegExp(str) : str)

class Consolite {
  prefix = []
  _filter = null
  _level = null
  _levels = {}
  parent = null

  constructor(...prefix) {
    this.prefix.push(...prefix)

    const withinLevel = prop => this.levels[prop] <= this.level
    const passesFilter = () =>
      typeof this.filter === 'function'
        ? this.filter(prefix)
        : prefix.join('').match(escapeIfString(this.filter))

    this.register = (prop, fn) =>
      Object.defineProperty(this, prop, {
        get: () => {
          const canBind = typeof fn === 'function'
          const shouldPrint = withinLevel(prop) && passesFilter() && canBind
          const prefixes = prefix.map(p => (typeof p === 'string' ? p : p(prop, this)))

          return shouldPrint ? fn.bind(console, ...prefixes) : noop
        },
      })
    
    // attach console methods
    Object.keys(console).forEach(prop => this.register(prop, console[prop]))
  }

  get level() {
    return this._level ?? this.parent?.level ?? defaults.level
  }
  set level(val) {
    this._level = val
  }
  get filter() {
    return this._filter ?? this.parent?.filter ?? defaults.filter
  }
  set filter(val) {
    this._filter = val
  }
  get root() {
    return this.parent?.root || this
  }

  levels = new Proxy(this._levels, {
    ownKeys: target =>
      [
        ...Object.keys(defaults.levels),
        ...Object.keys(this.parent?.levels || {}),
        ...Reflect.ownKeys(target),
      ].filter(unique),
    getOwnPropertyDescriptor: (target, key) => ({
      value: target[key],
      enumerable: true,
      configurable: true,
    }),
    get: (target, prop) =>
      target[prop] ||
      target.default ||
      this.parent?.levels[prop] ||
      this.parent?.levels.default ||
      defaults.levels[prop] ||
      defaults.levels.default,
    set: (target, prop, value) => (target[prop] = value),
  })

  createChild(...prefix) {
    const child = createLogger(...this.prefix, ...prefix)
    child.parent = this
    return child
  }

  createParent(...prefix) {
    return createLogger(...prefix, ...this.prefix)
  }

  create = createLogger
}

/**
 * @callback PrefixFn
 * @param {string} method console method, eg. log, debug etc...
 */

/** @typedef {Consolite & Console} ConsoliteLogger */

/**
 * @param {(string|PrefixFn)[]} prefix
 * @returns {ConsoliteLogger}
 */
const createLogger = (...prefix) => Object.assign(new Consolite(...prefix))


/***/ }),

/***/ "./node_modules/hookar/esm/index.mjs":
/*!*******************************************!*\
  !*** ./node_modules/hookar/esm/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGuardsCollection": () => (/* binding */ createGuardsCollection),
/* harmony export */   "createParallelHooksCollection": () => (/* binding */ createParallelHooksCollection),
/* harmony export */   "createPipelineCollection": () => (/* binding */ createPipelineCollection),
/* harmony export */   "createSequenceHooksCollection": () => (/* binding */ createSequenceHooksCollection)
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.mjs */ "./node_modules/hookar/esm/util.mjs");
/**
 * @template H
 * @callback AddHookToCollection
 * @param {H} hook
 * @returns {function} unhook
 **/



/**
 * @template H
 * @typedef {AddHookToCollection<H> & HooksCollectionProps<H>} HooksCollection
 */

/**
 * @template H hook
 * @typedef {Object} HooksCollectionProps
 * @prop {H} run
 * @prop {H} runOnce
 * @prop {H[]} hooks
 */

/**
 * @template  V
 * @callback Runner
 * @param {HookCb<V>[]} value
 * @param  {...any} rest
 */

/**
 * @template T
 * @callback HookCb
 * @param {T} value
 * @param {...any} rest
 */

/**
 * creates a hook collection
 * @template T
 * @param {Runner<T>} runner
 * @return {HooksCollection<HookCb<T>>}
 * @example
 * const hooksCollection = createHook()
 * const unhookFn = hooksCollection(x => console.log('hello', x))
 * const unhookFn2 = hooksCollection(x => console.log('goodbye', x))
 *
 * // call hooks
 * hooksCollection.hooks.forEach(hook => hook('Jake'))
 * // logs "hello Jake" and "goodbye Jake"
 *
 * // unregister
 * unhookFn()
 * unhookFn2()
 */
const createHooksCollection = (runner) => {
  /** @type {HookCb<T>[]} */
  const hooks = [];

  /**
   *@type {HooksCollection<HookCb<T>>}
   */
  const hooksCollection = (hook) => {
    hooks.push(hook);
    return () => hooks.splice(hooks.indexOf(hook), 1);
  };

  hooksCollection.hooks = hooks;
  hooksCollection.run = runner(hooks);
  hooksCollection.runOnce = (0,_util_mjs__WEBPACK_IMPORTED_MODULE_0__.runOnce)(runner(hooks));

  return hooksCollection;
};

/**
 * @template P
 * @typedef {HooksCollection<(pri: P, ...rest)=>P>} CollectionSync
 */
/**
 * @template P
 * @typedef {HooksCollection<(pri: P, ...rest)=>P|Promise<P>>} CollectionAsync
 */
/**
 * @template P
 * @typedef {HooksCollection<((pri: P, ...rest)=>void)>} CollectionSyncVoid
 */
/**
 * @template P
 * @typedef {HooksCollection<(pri: P, ...rest)=>void|Promise<void>>} CollectionAsyncVoid
 */

/**
 * @template T
 * @param {T=} type
 * @returns {HooksCollection<T>}
 */
const createPipelineCollection = (type) =>
  // @ts-ignore
  createHooksCollection(
    (hooks) =>
      (value, ...rest) =>
        hooks.reduce(
          (pipedValue, hook) =>
            pipedValue?.then ? pipedValue.then((r) => hook(r, ...rest)) : hook(pipedValue, ...rest),
          value
        )
  );

/**
 * @template T
 * @param {T=} type
 * @returns {CollectionSyncVoid<T>|CollectionAsyncVoid<T>}
 */
const createSequenceHooksCollection = (type) =>
  createHooksCollection(
    (hooks) =>
      (value, ...rest) =>
        hooks.reduce(
          (last, hook) => (last?.then ? last.then((_) => hook(value, ...rest)) : hook(value, ...rest)),
          value
        )
  );

/**
 * @template T
 * @param {T=} type
 * @returns {CollectionSyncVoid<T>|CollectionAsyncVoid<T>}
 */
const createParallelHooksCollection = (type) =>
  createHooksCollection(
    (hooks) =>
      (value, ...rest) =>
        Promise.all(hooks.map((hook) => hook(value, ...rest))).then((r) => value)
  );

/**
 * @template T
 * @param {T=} type
 * @returns {CollectionSync<T>|CollectionAsync<T>}
 */
const createGuardsCollection = (type) =>
  // @ts-ignore
  createHooksCollection(
    (hooks) =>
      (value, ...rest) =>
        hooks.reduce(
          (pipedValue, hook) =>
            pipedValue?.then ? pipedValue.then((r) => r && hook(value, ...rest)) : pipedValue && hook(value, ...rest),
          value || true
        )
  );


/***/ }),

/***/ "./node_modules/hookar/esm/util.mjs":
/*!******************************************!*\
  !*** ./node_modules/hookar/esm/util.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runOnce": () => (/* binding */ runOnce)
/* harmony export */ });
/**
 * @template {function} CB
 * @param {CB} cb
 * @returns {CB}
 */
const runOnce = (cb) => {
  let hasRun;

  /** @type {unknown} */
  const wrapper = (...params) => {
    if (hasRun) return;
    hasRun = true;
    return cb(...params);
  };

  return /** @type {CB} */ (wrapper);
};


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/hot-api.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/hot-api.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* binding */ makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy.js */ "./node_modules/svelte-hmr/runtime/proxy.js");
/* eslint-env browser */



const logPrefix = '[HMR:Svelte]'

// eslint-disable-next-line no-console
const log = (...args) => console.log(logPrefix, ...args)

const domReload = () => {
  // eslint-disable-next-line no-undef
  const win = typeof window !== 'undefined' && window
  if (win && win.location && win.location.reload) {
    log('Reload')
    win.location.reload()
  } else {
    log('Full reload required')
  }
}

const replaceCss = (previousId, newId) => {
  if (typeof document === 'undefined') return false
  if (!previousId) return false
  if (!newId) return false
  // svelte-xxx-style => svelte-xxx
  const previousClass = previousId.slice(0, -6)
  const newClass = newId.slice(0, -6)
  // eslint-disable-next-line no-undef
  document.querySelectorAll('.' + previousClass).forEach(el => {
    el.classList.remove(previousClass)
    el.classList.add(newClass)
  })
  return true
}

const removeStylesheet = cssId => {
  if (cssId == null) return
  if (typeof document === 'undefined') return
  // eslint-disable-next-line no-undef
  const el = document.getElementById(cssId)
  if (el) el.remove()
  return
}

const defaultArgs = {
  reload: domReload,
}

const makeApplyHmr = transformArgs => args => {
  const allArgs = transformArgs({ ...defaultArgs, ...args })
  return applyHmr(allArgs)
}

let needsReload = false

function applyHmr(args) {
  const {
    id,
    cssId,
    nonCssHash,
    reload = domReload,
    // normalized hot API (must conform to rollup-plugin-hot)
    hot,
    hotOptions,
    Component,
    acceptable, // some types of components are impossible to HMR correctly
    preserveLocalState,
    ProxyAdapter,
    emitCss,
  } = args

  const existing = hot.data && hot.data.record

  const canAccept = acceptable && (!existing || existing.current.canAccept)

  const r =
    existing ||
    (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.createProxy)({
      Adapter: ProxyAdapter,
      id,
      Component,
      hotOptions,
      canAccept,
      preserveLocalState,
    })

  const cssOnly =
    hotOptions.injectCss &&
    existing &&
    nonCssHash &&
    existing.current.nonCssHash === nonCssHash

  r.update({
    Component,
    hotOptions,
    canAccept,
    nonCssHash,
    cssId,
    previousCssId: r.current.cssId,
    cssOnly,
    preserveLocalState,
  })

  hot.dispose(data => {
    // handle previous fatal errors
    if (needsReload || (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)()) {
      if (hotOptions && hotOptions.noReload) {
        log('Full reload required')
      } else {
        reload()
      }
    }

    // 2020-09-21 Snowpack master doesn't pass data as arg to dispose handler
    data = data || hot.data

    data.record = r

    if (!emitCss && cssId && r.current.cssId !== cssId) {
      if (hotOptions.cssEjectDelay) {
        setTimeout(() => removeStylesheet(cssId), hotOptions.cssEjectDelay)
      } else {
        removeStylesheet(cssId)
      }
    }
  })

  if (canAccept) {
    hot.accept(async arg => {
      const { bubbled } = arg || {}

      // NOTE Snowpack registers accept handlers only once, so we can NOT rely
      // on the surrounding scope variables -- they're not the last version!
      const { cssId: newCssId, previousCssId } = r.current
      const cssChanged = newCssId !== previousCssId
      // ensure old style sheet has been removed by now
      if (!emitCss && cssChanged) removeStylesheet(previousCssId)
      // guard: css only change
      if (
        // NOTE bubbled is provided only by rollup-plugin-hot, and we
        // can't safely assume a CSS only change without it... this means we
        // can't support CSS only injection with Nollup or Webpack currently
        bubbled === false && // WARNING check false, not falsy!
        r.current.cssOnly &&
        (!cssChanged || replaceCss(previousCssId, newCssId))
      ) {
        return
      }

      const success = await r.reload()

      if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)() || (!success && !hotOptions.optimistic)) {
        needsReload = true
      }
    })
  }

  // well, endgame... we won't be able to render next updates, even successful,
  // if we don't have proxies in svelte's tree
  //
  // since we won't return the proxy and the app will expect a svelte component,
  // it's gonna crash... so it's best to report the real cause
  //
  // full reload required
  //
  const proxyOk = r && r.proxy
  if (!proxyOk) {
    throw new Error(`Failed to create HMR proxy for Svelte component ${id}`)
  }

  return r.proxy
}


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/index.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* reexport safe */ _hot_api_js__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _hot_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hot-api.js */ "./node_modules/svelte-hmr/runtime/hot-api.js");



/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/overlay.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/overlay.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-env browser */

const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const ErrorOverlay = () => {
  let errors = []
  let compileError = null

  const errorsTitle = 'Failed to init component'
  const compileErrorTitle = 'Failed to compile'

  const style = {
    section: `
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 32px;
      background: rgba(0, 0, 0, .85);
      font-family: Menlo, Consolas, monospace;
      font-size: large;
      color: rgb(232, 232, 232);
      overflow: auto;
      z-index: 2147483647;
    `,
    h1: `
      margin-top: 0;
      color: #E36049;
      font-size: large;
      font-weight: normal;
    `,
    h2: `
      margin: 32px 0 0;
      font-size: large;
      font-weight: normal;
    `,
    pre: ``,
  }

  const createOverlay = () => {
    const h1 = document.createElement('h1')
    h1.style = style.h1
    const section = document.createElement('section')
    section.appendChild(h1)
    section.style = style.section
    const body = document.createElement('div')
    section.appendChild(body)
    return { h1, el: section, body }
  }

  const setTitle = title => {
    overlay.h1.textContent = title
  }

  const show = () => {
    const { el } = overlay
    if (!el.parentNode) {
      const target = document.body
      target.appendChild(overlay.el)
    }
  }

  const hide = () => {
    const { el } = overlay
    if (el.parentNode) {
      overlay.el.remove()
    }
  }

  const update = () => {
    if (compileError) {
      overlay.body.innerHTML = ''
      setTitle(compileErrorTitle)
      const errorEl = renderError(compileError)
      overlay.body.appendChild(errorEl)
      show()
    } else if (errors.length > 0) {
      overlay.body.innerHTML = ''
      setTitle(errorsTitle)
      errors.forEach(({ title, message }) => {
        const errorEl = renderError(message, title)
        overlay.body.appendChild(errorEl)
      })
      show()
    } else {
      hide()
    }
  }

  const renderError = (message, title) => {
    const div = document.createElement('div')
    if (title) {
      const h2 = document.createElement('h2')
      h2.textContent = title
      h2.style = style.h2
      div.appendChild(h2)
    }
    const pre = document.createElement('pre')
    pre.textContent = message
    div.appendChild(pre)
    return div
  }

  const addError = (error, title) => {
    const message = (error && error.stack) || error
    errors.push({ title, message })
    update()
  }

  const clearErrors = () => {
    errors.forEach(({ element }) => {
      removeElement(element)
    })
    errors = []
    update()
  }

  const setCompileError = message => {
    compileError = message
    update()
  }

  const overlay = createOverlay()

  return {
    addError,
    clearErrors,
    setCompileError,
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorOverlay);


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js":
/*!**************************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adapter": () => (/* binding */ adapter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/svelte-hmr/runtime/overlay.js");
/* global window, document */

// NOTE from 3.38.3 (or so), insert was carrying the hydration logic, that must
// be used because DOM elements are reused more (and so insertion points are not
// necessarily added in order); then in 3.40 the logic was moved to
// insert_hydration, which is the one we must use for HMR
const svelteInsert = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_hydration || svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert
if (!svelteInsert) {
  throw new Error(
    'failed to find insert_hydration and insert in svelte/internal'
  )
}



const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const adapter = class ProxyAdapterDom {
  constructor(instance) {
    this.instance = instance
    this.insertionPoint = null

    this.afterMount = this.afterMount.bind(this)
    this.rerender = this.rerender.bind(this)

    this._noOverlay = !!instance.hotOptions.noOverlay
  }

  // NOTE overlay is only created before being actually shown to help test
  // runner (it won't have to account for error overlay when running assertions
  // about the contents of the rendered page)
  static getErrorOverlay(noCreate = false) {
    if (!noCreate && !this.errorOverlay) {
      this.errorOverlay = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
    }
    return this.errorOverlay
  }

  // TODO this is probably unused now: remove in next breaking release
  static renderCompileError(message) {
    const noCreate = !message
    const overlay = this.getErrorOverlay(noCreate)
    if (!overlay) return
    overlay.setCompileError(message)
  }

  dispose() {
    // Component is being destroyed, detaching is not optional in Svelte3's
    // component API, so we can dispose of the insertion point in every case.
    if (this.insertionPoint) {
      removeElement(this.insertionPoint)
      this.insertionPoint = null
    }
    this.clearError()
  }

  // NOTE afterMount CAN be called multiple times (e.g. keyed list)
  afterMount(target, anchor) {
    const {
      instance: { debugName },
    } = this
    if (!this.insertionPoint) {
      this.insertionPoint = document.createComment(debugName)
    }
    svelteInsert(target, this.insertionPoint, anchor)
  }

  rerender() {
    this.clearError()
    const {
      instance: { refreshComponent },
      insertionPoint,
    } = this
    if (!insertionPoint) {
      throw new Error('Cannot rerender: missing insertion point')
    }
    refreshComponent(insertionPoint.parentNode, insertionPoint)
  }

  renderError(err) {
    if (this._noOverlay) return
    const {
      instance: { debugName },
    } = this
    const title = debugName || err.moduleName || 'Error'
    this.constructor.getErrorOverlay().addError(err, title)
  }

  clearError() {
    if (this._noOverlay) return
    const overlay = this.constructor.getErrorOverlay(true)
    if (!overlay) return
    overlay.clearErrors()
  }
}

// TODO this is probably unused now: remove in next breaking release
if (typeof window !== 'undefined') {
  window.__SVELTE_HMR_ADAPTER = adapter
}

// mitigate situation with Snowpack remote source pulling latest of runtime,
// but using previous version of the Node code transform in the plugin
// see: https://github.com/rixo/svelte-hmr/issues/27
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/proxy.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/proxy.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxy": () => (/* binding */ createProxy),
/* harmony export */   "hasFatalError": () => (/* binding */ hasFatalError)
/* harmony export */ });
/* harmony import */ var _svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svelte-hooks.js */ "./node_modules/svelte-hmr/runtime/svelte-hooks.js");
/* eslint-env browser */
/**
 * The HMR proxy is a component-like object whose task is to sit in the
 * component tree in place of the proxied component, and rerender each
 * successive versions of said component.
 */



const handledMethods = ['constructor', '$destroy']
const forwardedMethods = ['$set', '$on']

const logError = (msg, err) => {
  // eslint-disable-next-line no-console
  console.error('[HMR][Svelte]', msg)
  if (err) {
    // NOTE avoid too much wrapping around user errors
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

const posixify = file => file.replace(/[/\\]/g, '/')

const getBaseName = id =>
  id
    .split('/')
    .pop()
    .split('.')
    .slice(0, -1)
    .join('.')

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const getFriendlyName = id => capitalize(getBaseName(posixify(id)))

const getDebugName = id => `<${getFriendlyName(id)}>`

const relayCalls = (getTarget, names, dest = {}) => {
  for (const key of names) {
    dest[key] = function(...args) {
      const target = getTarget()
      if (!target) {
        return
      }
      return target[key] && target[key].call(this, ...args)
    }
  }
  return dest
}

const isInternal = key => key !== '$$' && key.slice(0, 2) === '$$'

// This is intented as a somewhat generic / prospective fix to the situation
// that arised with the introduction of $$set in Svelte 3.24.1 -- trying to
// avoid giving full knowledge (like its name) of this implementation detail
// to the proxy. The $$set method can be present or not on the component, and
// its presence impacts the behaviour (but with HMR it will be tested if it is
// present _on the proxy_). So the idea here is to expose exactly the same $$
// props as the current version of the component and, for those that are
// functions, proxy the calls to the current component.
const relayInternalMethods = (proxy, cmp) => {
  // delete any previously added $$ prop
  Object.keys(proxy)
    .filter(isInternal)
    .forEach(key => {
      delete proxy[key]
    })
  // guard: no component
  if (!cmp) return
  // proxy current $$ props to the actual component
  Object.keys(cmp)
    .filter(isInternal)
    .forEach(key => {
      Object.defineProperty(proxy, key, {
        configurable: true,
        get() {
          const value = cmp[key]
          if (typeof value !== 'function') return value
          return (
            value &&
            function(...args) {
              return value.apply(this, args)
            }
          )
        },
      })
    })
}

// proxy custom methods
const copyComponentProperties = (proxy, cmp, previous) => {
  if (previous) {
    previous.forEach(prop => {
      delete proxy[prop]
    })
  }

  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(cmp))
  const wrappedProps = props.filter(prop => {
    if (!handledMethods.includes(prop) && !forwardedMethods.includes(prop)) {
      Object.defineProperty(proxy, prop, {
        configurable: true,
        get() {
          return cmp[prop]
        },
        set(value) {
          // we're changing it on the real component first to see what it
          // gives... if it throws an error, we want to throw the same error in
          // order to most closely follow non-hmr behaviour.
          cmp[prop] = value
        },
      })
      return true
    }
  })

  return wrappedProps
}

// everything in the constructor!
//
// so we don't polute the component class with new members
//
class ProxyComponent {
  constructor(
    {
      Adapter,
      id,
      debugName,
      current, // { Component, hotOptions: { preserveLocalState, ... } }
      register,
    },
    options // { target, anchor, ... }
  ) {
    let cmp
    let disposed = false
    let lastError = null

    const setComponent = _cmp => {
      cmp = _cmp
      relayInternalMethods(this, cmp)
    }

    const getComponent = () => cmp

    const destroyComponent = () => {
      // destroyComponent is tolerant (don't crash on no cmp) because it
      // is possible that reload/rerender is called after a previous
      // createComponent has failed (hence we have a proxy, but no cmp)
      if (cmp) {
        cmp.$destroy()
        setComponent(null)
      }
    }

    const refreshComponent = (target, anchor, conservativeDestroy) => {
      if (lastError) {
        lastError = null
        adapter.rerender()
      } else {
        try {
          const replaceOptions = {
            target,
            anchor,
            preserveLocalState: current.preserveLocalState,
          }
          if (conservativeDestroy) {
            replaceOptions.conservativeDestroy = true
          }
          cmp.$replace(current.Component, replaceOptions)
        } catch (err) {
          setError(err, target, anchor)
          if (
            !current.hotOptions.optimistic ||
            // non acceptable components (that is components that have to defer
            // to their parent for rerender -- e.g. accessors, named exports)
            // are most tricky, and they havent been considered when most of the
            // code has been written... as a result, they are especially tricky
            // to deal with, it's better to consider any error with them to be
            // fatal to avoid odities
            !current.canAccept ||
            (err && err.hmrFatal)
          ) {
            throw err
          } else {
            // const errString = String((err && err.stack) || err)
            logError(`Error during component init: ${debugName}`, err)
          }
        }
      }
    }

    const setError = err => {
      lastError = err
      adapter.renderError(err)
    }

    const instance = {
      hotOptions: current.hotOptions,
      proxy: this,
      id,
      debugName,
      refreshComponent,
    }

    const adapter = new Adapter(instance)

    const { afterMount, rerender } = adapter

    // $destroy is not called when a child component is disposed, so we
    // need to hook from fragment.
    const onDestroy = () => {
      // NOTE do NOT call $destroy on the cmp from here; the cmp is already
      //   dead, this would not work
      if (!disposed) {
        disposed = true
        adapter.dispose()
        unregister()
      }
    }

    // ---- register proxy instance ----

    const unregister = register(rerender)

    // ---- augmented methods ----

    this.$destroy = () => {
      destroyComponent()
      onDestroy()
    }

    // ---- forwarded methods ----

    relayCalls(getComponent, forwardedMethods, this)

    // ---- create & mount target component instance ---

    try {
      let lastProperties
      ;(0,_svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__.createProxiedComponent)(current.Component, options, {
        allowLiveBinding: current.hotOptions.allowLiveBinding,
        onDestroy,
        onMount: afterMount,
        onInstance: comp => {
          setComponent(comp)
          // WARNING the proxy MUST use the same $$ object as its component
          // instance, because a lot of wiring happens during component
          // initialisation... lots of references to $$ and $$.fragment have
          // already been distributed around when the component constructor
          // returns, before we have a chance to wrap them (and so we can't
          // wrap them no more, because existing references would become
          // invalid)
          this.$$ = comp.$$
          lastProperties = copyComponentProperties(this, comp, lastProperties)
        },
      })
    } catch (err) {
      const { target, anchor } = options
      setError(err, target, anchor)
      throw err
    }
  }
}

const syncStatics = (component, proxy, previousKeys) => {
  // remove previously copied keys
  if (previousKeys) {
    for (const key of previousKeys) {
      delete proxy[key]
    }
  }

  // forward static properties and methods
  const keys = []
  for (const key in component) {
    keys.push(key)
    proxy[key] = component[key]
  }

  return keys
}

const globalListeners = {}

const onGlobal = (event, fn) => {
  event = event.toLowerCase()
  if (!globalListeners[event]) globalListeners[event] = []
  globalListeners[event].push(fn)
}

const fireGlobal = (event, ...args) => {
  const listeners = globalListeners[event]
  if (!listeners) return
  for (const fn of listeners) {
    fn(...args)
  }
}

const fireBeforeUpdate = () => fireGlobal('beforeupdate')

const fireAfterUpdate = () => fireGlobal('afterupdate')

if (typeof window !== 'undefined') {
  window.__SVELTE_HMR = {
    on: onGlobal,
  }
  window.dispatchEvent(new CustomEvent('svelte-hmr:ready'))
}

let fatalError = false

const hasFatalError = () => fatalError

/**
 * Creates a HMR proxy and its associated `reload` function that pushes a new
 * version to all existing instances of the component.
 */
function createProxy({
  Adapter,
  id,
  Component,
  hotOptions,
  canAccept,
  preserveLocalState,
}) {
  const debugName = getDebugName(id)
  const instances = []

  // current object will be updated, proxy instances will keep a ref
  const current = {
    Component,
    hotOptions,
    canAccept,
    preserveLocalState,
  }

  const name = `Proxy${debugName}`

  // this trick gives the dynamic name Proxy<MyComponent> to the concrete
  // proxy class... unfortunately, this doesn't shows in dev tools, but
  // it stills allow to inspect cmp.constructor.name to confirm an instance
  // is a proxy
  const proxy = {
    [name]: class extends ProxyComponent {
      constructor(options) {
        try {
          super(
            {
              Adapter,
              id,
              debugName,
              current,
              register: rerender => {
                instances.push(rerender)
                const unregister = () => {
                  const i = instances.indexOf(rerender)
                  instances.splice(i, 1)
                }
                return unregister
              },
            },
            options
          )
        } catch (err) {
          // If we fail to create a proxy instance, any instance, that means
          // that we won't be able to fix this instance when it is updated.
          // Recovering to normal state will be impossible. HMR's dead.
          //
          // Fatal error will trigger a full reload on next update (reloading
          // right now is kinda pointless since buggy code still exists).
          //
          // NOTE Only report first error to avoid too much polution -- following
          // errors are probably caused by the first one, or they will show up
          // in turn when the first one is fixed ¯\_(ツ)_/¯
          //
          if (!fatalError) {
            fatalError = true
            logError(
              `Unrecoverable HMR error in ${debugName}: ` +
                `next update will trigger a full reload`
            )
          }
          throw err
        }
      }
    },
  }[name]

  // initialize static members
  let previousStatics = syncStatics(current.Component, proxy)

  const update = newState => Object.assign(current, newState)

  // reload all existing instances of this component
  const reload = () => {
    fireBeforeUpdate()

    // copy statics before doing anything because a static prop/method
    // could be used somewhere in the create/render call
    previousStatics = syncStatics(current.Component, proxy, previousStatics)

    const errors = []

    instances.forEach(rerender => {
      try {
        rerender()
      } catch (err) {
        logError(`Failed to rerender ${debugName}`, err)
        errors.push(err)
      }
    })

    if (errors.length > 0) {
      return false
    }

    fireAfterUpdate()

    return true
  }

  const hasFatalError = () => fatalError

  return { id, proxy, update, reload, hasFatalError, current }
}


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/svelte-hooks.js":
/*!*********************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/svelte-hooks.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxiedComponent": () => (/* binding */ createProxiedComponent)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/**
 * Emulates forthcoming HMR hooks in Svelte.
 *
 * All references to private component state ($$) are now isolated in this
 * module.
 */


const captureState = cmp => {
  // sanity check: propper behaviour here is to crash noisily so that
  // user knows that they're looking at something broken
  if (!cmp) {
    throw new Error('Missing component')
  }
  if (!cmp.$$) {
    throw new Error('Invalid component')
  }

  const {
    $$: { callbacks, bound, ctx, props },
  } = cmp

  const state = cmp.$capture_state()

  // capturing current value of props (or we'll recreate the component with the
  // initial prop values, that may have changed -- and would not be reflected in
  // options.props)
  const hmr_props_values = {}
  Object.keys(cmp.$$.props).forEach(prop => {
    hmr_props_values[prop] = ctx[props[prop]]
  })

  return {
    ctx,
    props,
    callbacks,
    bound,
    state,
    hmr_props_values,
  }
}

// remapping all existing bindings (including hmr_future_foo ones) to the
// new version's props indexes, and refresh them with the new value from
// context
const restoreBound = (cmp, restore) => {
  // reverse prop:ctxIndex in $$.props to ctxIndex:prop
  //
  // ctxIndex can be either a regular index in $$.ctx or a hmr_future_ prop
  //
  const propsByIndex = {}
  for (const [name, i] of Object.entries(restore.props)) {
    propsByIndex[i] = name
  }

  // NOTE $$.bound cannot change in the HMR lifetime of a component, because
  //      if bindings changes, that means the parent component has changed,
  //      which means the child (current) component will be wholly recreated
  for (const [oldIndex, updateBinding] of Object.entries(restore.bound)) {
    // can be either regular prop, or future_hmr_ prop
    const propName = propsByIndex[oldIndex]

    // this should never happen if remembering of future props is enabled...
    // in any case, there's nothing we can do about it if we have lost prop
    // name knowledge at this point
    if (propName == null) continue

    // NOTE $$.props[propName] also propagates knowledge of a possible
    //      future prop to the new $$.props (via $$.props being a Proxy)
    const newIndex = cmp.$$.props[propName]
    cmp.$$.bound[newIndex] = updateBinding

    // NOTE if the prop doesn't exist or doesn't exist anymore in the new
    //      version of the component, clearing the binding is the expected
    //      behaviour (since that's what would happen in non HMR code)
    const newValue = cmp.$$.ctx[newIndex]
    updateBinding(newValue)
  }
}

// restoreState
//
// It is too late to restore context at this point because component instance
// function has already been called (and so context has already been read).
// Instead, we rely on setting current_component to the same value it has when
// the component was first rendered -- which fix support for context, and is
// also generally more respectful of normal operation.
//
const restoreState = (cmp, restore) => {
  if (!restore) return

  if (restore.callbacks) {
    cmp.$$.callbacks = restore.callbacks
  }

  if (restore.bound) {
    restoreBound(cmp, restore)
  }

  // props, props.$$slots are restored at component creation (works
  // better -- well, at all actually)
}

const get_current_component_safe = () => {
  // NOTE relying on dynamic bindings (current_component) makes us dependent on
  // bundler config (and apparently it does not work in demo-svelte-nollup)
  try {
    // unfortunately, unlike current_component, get_current_component() can
    // crash in the normal path (when there is really no parent)
    return (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_current_component)()
  } catch (err) {
    // ... so we need to consider that this error means that there is no parent
    //
    // that makes us tightly coupled to the error message but, at least, we
    // won't mute an unexpected error, which is quite a horrible thing to do
    if (err.message === 'Function called outside component initialization') {
      // who knows...
      return svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    } else {
      throw err
    }
  }
}

const createProxiedComponent = (
  Component,
  initialOptions,
  { allowLiveBinding, onInstance, onMount, onDestroy }
) => {
  let cmp
  let options = initialOptions

  const isCurrent = _cmp => cmp === _cmp

  const assignOptions = (target, anchor, restore, preserveLocalState) => {
    const props = Object.assign({}, options.props)

    // Filtering props to avoid "unexpected prop" warning
    // NOTE this is based on props present in initial options, but it should
    //      always works, because props that are passed from the parent can't
    //      change without a code change to the parent itself -- hence, the
    //      child component will be fully recreated, and initial options should
    //      always represent props that are currnetly passed by the parent
    if (options.props && restore.hmr_props_values) {
      for (const prop of Object.keys(options.props)) {
        if (restore.hmr_props_values.hasOwnProperty(prop)) {
          props[prop] = restore.hmr_props_values[prop]
        }
      }
    }

    if (preserveLocalState && restore.state) {
      if (Array.isArray(preserveLocalState)) {
        // form ['a', 'b'] => preserve only 'a' and 'b'
        props.$$inject = {}
        for (const key of preserveLocalState) {
          props.$$inject[key] = restore.state[key]
        }
      } else {
        props.$$inject = restore.state
      }
    } else {
      delete props.$$inject
    }
    options = Object.assign({}, initialOptions, {
      target,
      anchor,
      props,
      hydrate: false,
    })
  }

  // Preserving knowledge of "future props" -- very hackish version (maybe
  // there should be an option to opt out of this)
  //
  // The use case is bind:something where something doesn't exist yet in the
  // target component, but comes to exist later, after a HMR update.
  //
  // If Svelte can't map a prop in the current version of the component, it
  // will just completely discard it:
  // https://github.com/sveltejs/svelte/blob/1632bca34e4803d6b0e0b0abd652ab5968181860/src/runtime/internal/Component.ts#L46
  //
  const rememberFutureProps = cmp => {
    if (typeof Proxy === 'undefined') return

    cmp.$$.props = new Proxy(cmp.$$.props, {
      get(target, name) {
        if (target[name] === undefined) {
          target[name] = 'hmr_future_' + name
        }
        return target[name]
      },
      set(target, name, value) {
        target[name] = value
      },
    })
  }

  const instrument = targetCmp => {
    const createComponent = (Component, restore, previousCmp) => {
      ;(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_current_component)(parentComponent || previousCmp)
      const comp = new Component(options)
      // NOTE must be instrumented before restoreState, because restoring
      // bindings relies on hacked $$.props
      instrument(comp)
      restoreState(comp, restore)
      return comp
    }

    rememberFutureProps(targetCmp)

    targetCmp.$$.on_hmr = []

    // `conservative: true` means we want to be sure that the new component has
    // actually been successfuly created before destroying the old instance.
    // This could be useful for preventing runtime errors in component init to
    // bring down the whole HMR. Unfortunately the implementation bellow is
    // broken (FIXME), but that remains an interesting target for when HMR hooks
    // will actually land in Svelte itself.
    //
    // The goal would be to render an error inplace in case of error, to avoid
    // losing the navigation stack (especially annoying in native, that is not
    // based on URL navigation, so we lose the current page on each error).
    //
    targetCmp.$replace = (
      Component,
      {
        target = options.target,
        anchor = options.anchor,
        preserveLocalState,
        conservative = false,
      }
    ) => {
      const restore = captureState(targetCmp)
      assignOptions(
        target || options.target,
        anchor,
        restore,
        preserveLocalState
      )

      const callbacks = cmp ? cmp.$$.on_hmr : []

      const afterCallbacks = callbacks.map(fn => fn(cmp)).filter(Boolean)

      const previous = cmp
      if (conservative) {
        try {
          const next = createComponent(Component, restore, previous)
          // prevents on_destroy from firing on non-final cmp instance
          cmp = null
          previous.$destroy()
          cmp = next
        } catch (err) {
          cmp = previous
          throw err
        }
      } else {
        // prevents on_destroy from firing on non-final cmp instance
        cmp = null
        if (previous) {
          // previous can be null if last constructor has crashed
          previous.$destroy()
        }
        cmp = createComponent(Component, restore, cmp)
      }

      cmp.$$.hmr_cmp = cmp

      for (const fn of afterCallbacks) {
        fn(cmp)
      }

      cmp.$$.on_hmr = callbacks

      return cmp
    }

    // NOTE onMount must provide target & anchor (for us to be able to determinate
    // 			actual DOM insertion point)
    //
    // 			And also, to support keyed list, it needs to be called each time the
    // 			component is moved (same as $$.fragment.m)
    if (onMount) {
      const m = targetCmp.$$.fragment.m
      targetCmp.$$.fragment.m = (...args) => {
        const result = m(...args)
        onMount(...args)
        return result
      }
    }

    // NOTE onDestroy must be called even if the call doesn't pass through the
    //      component's $destroy method (that we can hook onto by ourselves, since
    //      it's public API) -- this happens a lot in svelte's internals, that
    //      manipulates cmp.$$.fragment directly, often binding to fragment.d,
    //      for example
    if (onDestroy) {
      targetCmp.$$.on_destroy.push(() => {
        if (isCurrent(targetCmp)) {
          onDestroy()
        }
      })
    }

    if (onInstance) {
      onInstance(targetCmp)
    }

    // Svelte 3 creates and mount components from their constructor if
    // options.target is present.
    //
    // This means that at this point, the component's `fragment.c` and,
    // most notably, `fragment.m` will already have been called _from inside
    // createComponent_. That is: before we have a chance to hook on it.
    //
    // Proxy's constructor
    //   -> createComponent
    //     -> component constructor
    //       -> component.$$.fragment.c(...) (or l, if hydrate:true)
    //       -> component.$$.fragment.m(...)
    //
    //   -> you are here <-
    //
    if (onMount) {
      const { target, anchor } = options
      if (target) {
        onMount(target, anchor)
      }
    }
  }

  const parentComponent = allowLiveBinding
    ? svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    : get_current_component_safe()

  cmp = new Component(options)
  cmp.$$.hmr_cmp = cmp

  instrument(cmp)

  return cmp
}


/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Instance/Node.svelte":
/*!*********************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Instance/Node.svelte ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/Instance/Node.svelte generated by Svelte v3.49.0 */



const file = "node_modules/@roxi/routify/lib/runtime/Instance/Node.svelte";

// (21:0) {:else}
function create_else_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[5])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(21:0) {:else}",
		ctx
	});

	return block;
}

// (15:0) {#if Component}
function create_if_block(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*Component*/ ctx[1] && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*Component*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*Component*/ 2) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(15:0) {#if Component}",
		ctx
	});

	return block;
}

// (16:4) {#if Component}
function create_if_block_1(ctx) {
	let component;
	let current;
	const component_spread_levels = [/*passthrough*/ ctx[0], { context: /*context*/ ctx[2] }];

	let component_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < component_spread_levels.length; i += 1) {
		component_props = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)(component_props, component_spread_levels[i]);
	}

	component = new /*Component*/ ctx[1]({ props: component_props, $$inline: true });

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(component.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(component, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const component_changes = (dirty & /*passthrough, context*/ 5)
			? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_update)(component_spread_levels, [
					dirty & /*passthrough*/ 1 && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_object)(/*passthrough*/ ctx[0]),
					dirty & /*context*/ 4 && { context: /*context*/ ctx[2] }
				])
			: {};

			if (dirty & /*$$scope*/ 32) {
				component_changes.$$scope = { dirty, ctx };
			}

			component.$set(component_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(component.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(component.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(component, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(16:4) {#if Component}",
		ctx
	});

	return block;
}

// (17:8) <Component {...passthrough} {context}>
function create_default_slot(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[5])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(17:8) <Component {...passthrough} {context}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*Component*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
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

const CTX = 'routify-fragment-context';

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Node', slots, ['default']);
	let { node } = $$props;
	let { passthrough } = $$props;
	const context = { ...(0,svelte__WEBPACK_IMPORTED_MODULE_1__.getContext)(CTX), node };
	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.setContext)(CTX, context);
	let Component = node.module?.default;
	if (!Component && node.asyncModule) node.asyncModule().then(r => $$invalidate(1, Component = r.default));
	const writable_props = ['node', 'passthrough'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Node> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('node' in $$props) $$invalidate(3, node = $$props.node);
		if ('passthrough' in $$props) $$invalidate(0, passthrough = $$props.passthrough);
		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		getContext: svelte__WEBPACK_IMPORTED_MODULE_1__.getContext,
		setContext: svelte__WEBPACK_IMPORTED_MODULE_1__.setContext,
		node,
		passthrough,
		CTX,
		context,
		Component
	});

	$$self.$inject_state = $$props => {
		if ('node' in $$props) $$invalidate(3, node = $$props.node);
		if ('passthrough' in $$props) $$invalidate(0, passthrough = $$props.passthrough);
		if ('Component' in $$props) $$invalidate(1, Component = $$props.Component);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [passthrough, Component, context, node, slots, $$scope];
}

class Node extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { node: 3, passthrough: 0 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Node",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*node*/ ctx[3] === undefined && !('node' in props)) {
			console.warn("<Node> was created without expected prop 'node'");
		}

		if (/*passthrough*/ ctx[0] === undefined && !('passthrough' in props)) {
			console.warn("<Node> was created without expected prop 'passthrough'");
		}
	}

	get node() {
		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set node(value) {
		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get passthrough() {
		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set passthrough(value) {
		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; Node = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/Instance/Node.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: Node, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Node);



/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/Router/Router.svelte":
/*!*********************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/Router/Router.svelte ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Router.js */ "./node_modules/@roxi/routify/lib/runtime/Router/Router.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@roxi/routify/lib/runtime/utils/index.js");
/* harmony import */ var _renderer_ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderer/ComposeFragments.svelte */ "./node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte");
/* harmony import */ var _decorators_ScrollDecorator_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../decorators/ScrollDecorator.svelte */ "./node_modules/@roxi/routify/lib/runtime/decorators/ScrollDecorator.svelte");
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _Global_Global_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Global/Global.js */ "./node_modules/@roxi/routify/lib/runtime/Global/Global.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/Router/Router.svelte generated by Svelte v3.49.0 */









const file = "node_modules/@roxi/routify/lib/runtime/Router/Router.svelte";

// (98:0) {#if $activeRoute}
function create_if_block_1(ctx) {
	let div;
	let component;
	let initialize_action;
	let current;
	let mounted;
	let dispose;

	component = new _renderer_ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				context: /*context*/ ctx[5],
				options: { decorator: /*decorator*/ ctx[1] }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(component.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "data-routify", /*nodeId*/ ctx[3]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "display", "contents");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 98, 4, 3464);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(component, div, null);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(initialize_action = /*initialize*/ ctx[6].call(null, div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const component_changes = {};
			if (dirty & /*decorator*/ 2) component_changes.options = { decorator: /*decorator*/ ctx[1] };
			component.$set(component_changes);

			if (!current || dirty & /*nodeId*/ 8) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "data-routify", /*nodeId*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(component.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(component.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(component);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(98:0) {#if $activeRoute}",
		ctx
	});

	return block;
}

// (104:0) {#if !router.parentElem}
function create_if_block(ctx) {
	let div;
	let router_setParentElem_action;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 104, 4, 3636);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(router_setParentElem_action = /*router*/ ctx[0].setParentElem(div));
				mounted = true;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(104:0) {#if !router.parentElem}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*$activeRoute*/ ctx[2] && create_if_block_1(ctx);
	let if_block1 = !/*router*/ ctx[0].parentElem && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			if_block1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*$activeRoute*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$activeRoute*/ 4) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (!/*router*/ ctx[0].parentElem) {
				if (if_block1) {
					
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block1_anchor);
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

function instance_1($$self, $$props, $$invalidate) {
	let activeRoute;
	let nodeId;

	let $activeRoute,
		$$unsubscribe_activeRoute = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		$$subscribe_activeRoute = () => ($$unsubscribe_activeRoute(), $$unsubscribe_activeRoute = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.subscribe)(activeRoute, $$value => $$invalidate(2, $activeRoute = $$value)), activeRoute);

	$$self.$$.on_destroy.push(() => $$unsubscribe_activeRoute());
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Router', slots, []);
	let { router = null } = $$props;
	let { routes = null } = $$props;
	let { decorator = _decorators_ScrollDecorator_svelte__WEBPACK_IMPORTED_MODULE_5__["default"] } = $$props;
	let { urlReflector = null } = $$props;
	let { instance = null } = $$props;
	let { urlRewrite = null } = $$props;
	let { url = null } = $$props;
	let { name = null } = $$props;
	let { rootNode = null } = $$props;
	let { passthrough = null } = $$props;
	let { beforeRouterInit = null } = $$props;
	let { afterRouterInit = null } = $$props;
	let { beforeUrlChange = null } = $$props;
	let { afterUrlChange = null } = $$props;
	let { transformFragments = null } = $$props;
	let { onDestroy = null } = $$props;
	let { plugins = null } = $$props;
	let { queryHandler = null } = $$props;
	const context = { childFragments: (0,svelte_store__WEBPACK_IMPORTED_MODULE_6__.writable)([]) };
	const getExistingRouter = name => _Global_Global_js__WEBPACK_IMPORTED_MODULE_7__.globalInstance.routers.find(router => router.name === name);

	const initialize = elem => {
		if (!router.passthrough) {
			elem.addEventListener('click', handleClick);
			elem.addEventListener('keydown', handleClick);
		}
	};

	const handleClick = event => {
		const url = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.getUrlFromClick)(event);
		if (url) router.url.push(url);
	};

	if (typeof window !== 'undefined') (0,svelte__WEBPACK_IMPORTED_MODULE_2__.onDestroy)(() => router.destroy());

	const writable_props = [
		'router',
		'routes',
		'decorator',
		'urlReflector',
		'instance',
		'urlRewrite',
		'url',
		'name',
		'rootNode',
		'passthrough',
		'beforeRouterInit',
		'afterRouterInit',
		'beforeUrlChange',
		'afterUrlChange',
		'transformFragments',
		'onDestroy',
		'plugins',
		'queryHandler'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('router' in $$props) $$invalidate(0, router = $$props.router);
		if ('routes' in $$props) $$invalidate(7, routes = $$props.routes);
		if ('decorator' in $$props) $$invalidate(1, decorator = $$props.decorator);
		if ('urlReflector' in $$props) $$invalidate(8, urlReflector = $$props.urlReflector);
		if ('instance' in $$props) $$invalidate(9, instance = $$props.instance);
		if ('urlRewrite' in $$props) $$invalidate(10, urlRewrite = $$props.urlRewrite);
		if ('url' in $$props) $$invalidate(11, url = $$props.url);
		if ('name' in $$props) $$invalidate(12, name = $$props.name);
		if ('rootNode' in $$props) $$invalidate(13, rootNode = $$props.rootNode);
		if ('passthrough' in $$props) $$invalidate(14, passthrough = $$props.passthrough);
		if ('beforeRouterInit' in $$props) $$invalidate(15, beforeRouterInit = $$props.beforeRouterInit);
		if ('afterRouterInit' in $$props) $$invalidate(16, afterRouterInit = $$props.afterRouterInit);
		if ('beforeUrlChange' in $$props) $$invalidate(17, beforeUrlChange = $$props.beforeUrlChange);
		if ('afterUrlChange' in $$props) $$invalidate(18, afterUrlChange = $$props.afterUrlChange);
		if ('transformFragments' in $$props) $$invalidate(19, transformFragments = $$props.transformFragments);
		if ('onDestroy' in $$props) $$invalidate(20, onDestroy = $$props.onDestroy);
		if ('plugins' in $$props) $$invalidate(21, plugins = $$props.plugins);
		if ('queryHandler' in $$props) $$invalidate(22, queryHandler = $$props.queryHandler);
	};

	$$self.$capture_state = () => ({
		Router: _Router_js__WEBPACK_IMPORTED_MODULE_1__.Router,
		_onDestroy: svelte__WEBPACK_IMPORTED_MODULE_2__.onDestroy,
		getUrlFromClick: _utils_index_js__WEBPACK_IMPORTED_MODULE_3__.getUrlFromClick,
		Component: _renderer_ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		ScrollDecorator: _decorators_ScrollDecorator_svelte__WEBPACK_IMPORTED_MODULE_5__["default"],
		get: svelte_store__WEBPACK_IMPORTED_MODULE_6__.get,
		writable: svelte_store__WEBPACK_IMPORTED_MODULE_6__.writable,
		globalInstance: _Global_Global_js__WEBPACK_IMPORTED_MODULE_7__.globalInstance,
		router,
		routes,
		decorator,
		urlReflector,
		instance,
		urlRewrite,
		url,
		name,
		rootNode,
		passthrough,
		beforeRouterInit,
		afterRouterInit,
		beforeUrlChange,
		afterUrlChange,
		transformFragments,
		onDestroy,
		plugins,
		queryHandler,
		context,
		getExistingRouter,
		initialize,
		handleClick,
		nodeId,
		activeRoute,
		$activeRoute
	});

	$$self.$inject_state = $$props => {
		if ('router' in $$props) $$invalidate(0, router = $$props.router);
		if ('routes' in $$props) $$invalidate(7, routes = $$props.routes);
		if ('decorator' in $$props) $$invalidate(1, decorator = $$props.decorator);
		if ('urlReflector' in $$props) $$invalidate(8, urlReflector = $$props.urlReflector);
		if ('instance' in $$props) $$invalidate(9, instance = $$props.instance);
		if ('urlRewrite' in $$props) $$invalidate(10, urlRewrite = $$props.urlRewrite);
		if ('url' in $$props) $$invalidate(11, url = $$props.url);
		if ('name' in $$props) $$invalidate(12, name = $$props.name);
		if ('rootNode' in $$props) $$invalidate(13, rootNode = $$props.rootNode);
		if ('passthrough' in $$props) $$invalidate(14, passthrough = $$props.passthrough);
		if ('beforeRouterInit' in $$props) $$invalidate(15, beforeRouterInit = $$props.beforeRouterInit);
		if ('afterRouterInit' in $$props) $$invalidate(16, afterRouterInit = $$props.afterRouterInit);
		if ('beforeUrlChange' in $$props) $$invalidate(17, beforeUrlChange = $$props.beforeUrlChange);
		if ('afterUrlChange' in $$props) $$invalidate(18, afterUrlChange = $$props.afterUrlChange);
		if ('transformFragments' in $$props) $$invalidate(19, transformFragments = $$props.transformFragments);
		if ('onDestroy' in $$props) $$invalidate(20, onDestroy = $$props.onDestroy);
		if ('plugins' in $$props) $$invalidate(21, plugins = $$props.plugins);
		if ('queryHandler' in $$props) $$invalidate(22, queryHandler = $$props.queryHandler);
		if ('nodeId' in $$props) $$invalidate(3, nodeId = $$props.nodeId);
		if ('activeRoute' in $$props) $$subscribe_activeRoute($$invalidate(4, activeRoute = $$props.activeRoute));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*instance, rootNode, name, routes, urlRewrite, urlReflector, passthrough, beforeRouterInit, afterRouterInit, beforeUrlChange, afterUrlChange, transformFragments, onDestroy, plugins, queryHandler, router*/ 8386433) {
			$: {
				/** @type {RoutifyRuntimeOptions}*/
				const options = {
					instance,
					rootNode,
					name,
					routes,
					urlRewrite,
					urlReflector,
					passthrough,
					beforeRouterInit,
					afterRouterInit,
					beforeUrlChange,
					afterUrlChange,
					transformFragments,
					onDestroy,
					plugins,
					queryHandler
				};

				// todo move everything to init
				if (!router) $$invalidate(0, router = getExistingRouter(options.name) || new _Router_js__WEBPACK_IMPORTED_MODULE_1__.Router(options)); else router.init(options);
			}
		}

		if ($$self.$$.dirty & /*url, router*/ 2049) {
			$: if (url && url !== router.url.internal()) router.url.replace(url);
		}

		if ($$self.$$.dirty & /*router*/ 1) {
			$: $$subscribe_activeRoute($$invalidate(4, activeRoute = router.activeRoute));
		}

		if ($$self.$$.dirty & /*$activeRoute*/ 4) {
			$: context.childFragments.set($activeRoute?.fragments || []);
		}

		if ($$self.$$.dirty & /*$activeRoute*/ 4) {
			$: $$invalidate(3, nodeId = $activeRoute?.fragments[0].node.name);
		}

		if ($$self.$$.dirty & /*router*/ 1) {
			$: router.log.debug('before render', (0,svelte_store__WEBPACK_IMPORTED_MODULE_6__.get)(context.childFragments)); // ROUTIFY-DEV-ONLY
		}
	};

	return [
		router,
		decorator,
		$activeRoute,
		nodeId,
		activeRoute,
		context,
		initialize,
		routes,
		urlReflector,
		instance,
		urlRewrite,
		url,
		name,
		rootNode,
		passthrough,
		beforeRouterInit,
		afterRouterInit,
		beforeUrlChange,
		afterUrlChange,
		transformFragments,
		onDestroy,
		plugins,
		queryHandler
	];
}

class Router_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance_1, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {
			router: 0,
			routes: 7,
			decorator: 1,
			urlReflector: 8,
			instance: 9,
			urlRewrite: 10,
			url: 11,
			name: 12,
			rootNode: 13,
			passthrough: 14,
			beforeRouterInit: 15,
			afterRouterInit: 16,
			beforeUrlChange: 17,
			afterUrlChange: 18,
			transformFragments: 19,
			onDestroy: 20,
			plugins: 21,
			queryHandler: 22
		});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Router_1",
			options,
			id: create_fragment.name
		});
	}

	get router() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set router(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get routes() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set routes(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get decorator() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set decorator(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get urlReflector() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set urlReflector(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get instance() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set instance(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get urlRewrite() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set urlRewrite(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get url() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rootNode() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rootNode(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get passthrough() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set passthrough(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get beforeRouterInit() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set beforeRouterInit(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get afterRouterInit() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set afterRouterInit(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get beforeUrlChange() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set beforeUrlChange(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get afterUrlChange() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set afterUrlChange(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transformFragments() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transformFragments(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onDestroy() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onDestroy(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get plugins() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set plugins(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get queryHandler() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set queryHandler(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; Router_1 = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_8__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/Router/Router.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: Router_1, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_9__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router_1);



/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/decorators/Noop.svelte":
/*!***********************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/decorators/Noop.svelte ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/decorators/Noop.svelte generated by Svelte v3.49.0 */


const file = "node_modules/@roxi/routify/lib/runtime/decorators/Noop.svelte";

function create_fragment(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[1])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
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

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Noop', slots, ['default']);
	let { context = null } = $$props;
	context // need this to avoid warnings
	const writable_props = ['context'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Noop> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ context });

	$$self.$inject_state = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [context, $$scope, slots];
}

class Noop extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { context: 0 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Noop",
			options,
			id: create_fragment.name
		});
	}

	get context() {
		throw new Error("<Noop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set context(value) {
		throw new Error("<Noop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; Noop = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/decorators/Noop.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: Noop, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Noop);



/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/decorators/ScrollDecorator.svelte":
/*!**********************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/decorators/ScrollDecorator.svelte ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _helpers_scroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/scroll.js */ "./node_modules/@roxi/routify/lib/runtime/helpers/scroll.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/decorators/ScrollDecorator.svelte generated by Svelte v3.49.0 */



const file = "node_modules/@roxi/routify/lib/runtime/decorators/ScrollDecorator.svelte";

function create_fragment(ctx) {
	let div;
	let div_class_value;
	let init_action;
	let t;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (default_slot) default_slot.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", div_class_value = "decorator-" + /*context*/ ctx[0].node.id);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "position", "relative");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div, "top", "-200px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 109, 0, 3770);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(init_action = /*init*/ ctx[2].call(null, div));
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*context*/ 1 && div_class_value !== (div_class_value = "decorator-" + /*context*/ ctx[0].node.id)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", div_class_value);
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[6])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
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

const scrollHandlers = new Map();

/** @param {Router} router */
const fetchScrollHandler = router => {
	if (!scrollHandlers.has(router)) scrollHandlers.set(router, new ScrollHandler(router));
	return scrollHandlers.get(router);
};

// todo life cycle scroll to -> persistent scroll to -> watch scroll
class ScrollHandler {
	/** @param {Router} router */
	constructor(router) {
		this.router = router;
		this.stopPersistent = () => null;

		/** @type {ElementHolder[]} */
		this.elemHolders = [];

		if (typeof document !== 'undefined') document.addEventListener('scroll', () => this.onScroll());
	}

	/**
 * @param {HTMLElement} elem
 * @param {import('../Router/types').RenderContext} context
 */
	registerRenderContext(elem, context) {
		const elemHolder = { elem, context };
		this.elemHolders.push(elemHolder);
		context.onDestroy(() => this.elemHolders.splice(this.elemHolders.indexOf(elemHolder), 1));
	}

	/** @param {HTMLElement} elem */
	scrollTo(elem, shouldPersist) {
		setTimeout(async () => {
			(0,_helpers_scroll_js__WEBPACK_IMPORTED_MODULE_1__.scopedScrollIntoView)(elem);

			if (shouldPersist) {
				this.stopPersistent(); // cancel last scroll
				this.stopPersistent = (0,_helpers_scroll_js__WEBPACK_IMPORTED_MODULE_1__.persistentScrollTo)(elem, {});
				setTimeout(this.stopPersistent, 500);
			}
		});
	}

	onScroll() {
		const cutoff = window.innerHeight / 3;

		/** @type {ElementHolder}*/
		let candidateElementHolder;

		let candidateTop = -Infinity;

		for (const elementHolder of this.elemHolders) {
			const { top } = elementHolder.elem.getBoundingClientRect();

			if (cutoff > top && (top > candidateTop || elementHolder.context.node.ancestors.includes(candidateElementHolder.context.node))) {
				candidateElementHolder = elementHolder;
				candidateTop = top;
			}
		}

		if (candidateElementHolder) {
			const { context, elem } = candidateElementHolder;

			if (context.router.activeRoute.get() != context.route) context.router.url.set(context.node.path, 'replaceState', true, {
				// we got to this route by scrolling manually, so we don't want the router to do any scrolling
				dontScroll: true
			});
		}
	}
}

function instance($$self, $$props, $$invalidate) {
	let $isActive;
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('ScrollDecorator', slots, ['default']);
	let { context } = $$props;
	let { Parent } = $$props;
	const { isActive, single, router, route, node } = context;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(isActive, 'isActive');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, isActive, value => $$invalidate(5, $isActive = value));
	const isLeafFragment = () => context.route && context.node.id === [...context.route.fragments].pop().node.id;

	// assign one scrollHandler per router
	const scrollHandler = fetchScrollHandler(router);

	/** @type {HTMLElement} */
	let elem;

	const init = el => {
		$$invalidate(4, elem = el);
		scrollHandler.registerRenderContext(elem, context);
	};

	const writable_props = ['context', 'Parent'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ScrollDecorator> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('Parent' in $$props) $$invalidate(3, Parent = $$props.Parent);
		if ('$$scope' in $$props) $$invalidate(6, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		scopedScrollIntoView: _helpers_scroll_js__WEBPACK_IMPORTED_MODULE_1__.scopedScrollIntoView,
		persistentScrollTo: _helpers_scroll_js__WEBPACK_IMPORTED_MODULE_1__.persistentScrollTo,
		scrollHandlers,
		fetchScrollHandler,
		ScrollHandler,
		context,
		Parent,
		isActive,
		single,
		router,
		route,
		node,
		isLeafFragment,
		scrollHandler,
		elem,
		init,
		$isActive
	});

	$$self.$inject_state = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('Parent' in $$props) $$invalidate(3, Parent = $$props.Parent);
		if ('elem' in $$props) $$invalidate(4, elem = $$props.elem);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$isActive, elem, context*/ 49) {
			$: if ($isActive && elem && !context.route.state.dontScroll && isLeafFragment()) scrollHandler.scrollTo(elem, true);
		}
	};

	return [context, isActive, init, Parent, elem, $isActive, $$scope, slots];
}

class ScrollDecorator extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { context: 0, Parent: 3 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "ScrollDecorator",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*context*/ ctx[0] === undefined && !('context' in props)) {
			console.warn("<ScrollDecorator> was created without expected prop 'context'");
		}

		if (/*Parent*/ ctx[3] === undefined && !('Parent' in props)) {
			console.warn("<ScrollDecorator> was created without expected prop 'Parent'");
		}
	}

	get context() {
		throw new Error("<ScrollDecorator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set context(value) {
		throw new Error("<ScrollDecorator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get Parent() {
		throw new Error("<ScrollDecorator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set Parent(value) {
		throw new Error("<ScrollDecorator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; ScrollDecorator = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/decorators/ScrollDecorator.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: ScrollDecorator, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollDecorator);



/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte":
/*!*********************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var hookar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hookar */ "./node_modules/hookar/esm/index.mjs");
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _Route_RouteFragment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Route/RouteFragment */ "./node_modules/@roxi/routify/lib/runtime/Route/RouteFragment.js");
/* harmony import */ var _RenderFragment_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RenderFragment.svelte */ "./node_modules/@roxi/routify/lib/runtime/renderer/RenderFragment.svelte");
/* harmony import */ var _utils_normalizeMulti_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/normalizeMulti.js */ "./node_modules/@roxi/routify/lib/runtime/renderer/utils/normalizeMulti.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte generated by Svelte v3.49.0 */


const { Error: Error_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;





const file = "node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[0] = list[i];
	return child_ctx;
}

// (59:0) {#each childContexts as context (context.node.id)}
function create_each_block(key_1, ctx) {
	let first;
	let renderfragment;
	let current;

	renderfragment = new _RenderFragment_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				context: /*context*/ ctx[0],
				props: /*props*/ ctx[4],
				activeContext: /*activeContext*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(renderfragment.$$.fragment);
			this.first = first;
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, first, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(renderfragment, target, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const renderfragment_changes = {};
			if (dirty & /*activeContext*/ 2) renderfragment_changes.activeContext = /*activeContext*/ ctx[1];
			renderfragment.$set(renderfragment_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(renderfragment.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(renderfragment.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(first);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(renderfragment, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(59:0) {#each childContexts as context (context.node.id)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = /*childContexts*/ ctx[5];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	const get_key = ctx => /*context*/ ctx[0].node.id;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*childContexts, props, activeContext*/ 50) {
				each_value = /*childContexts*/ ctx[5];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value, get_each_context, get_key);
				each_blocks = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_keyed_each)(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(each_1_anchor);
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

function instance($$self, $$props, $$invalidate) {
	let $childFragments;
	let $isActive;
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('ComposeFragments', slots, []);
	let { context = null } = $$props;
	let { options = {} } = $$props;
	const { childFragments, isActive } = context;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(childFragments, 'childFragments');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, childFragments, value => $$invalidate(7, $childFragments = value));
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(isActive, 'isActive');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, isActive, value => $$invalidate(8, $isActive = value));
	const { multi, decorator, props } = options;
	let activeContext;

	/** @type {import('./utils/index').Multi}*/
	const setup = (0,_utils_normalizeMulti_js__WEBPACK_IMPORTED_MODULE_5__.normalizeMulti)(multi, $childFragments[0]?.node, context);

	/** @type {import('./types').RenderContext[] }*/
	const childContexts = setup.pages.map(node => ({
		childFragments: (0,svelte_store__WEBPACK_IMPORTED_MODULE_2__.writable)([]),
		node,
		fragment: new _Route_RouteFragment__WEBPACK_IMPORTED_MODULE_3__.RouteFragment(null, node, null, {}),
		isActive: (0,svelte_store__WEBPACK_IMPORTED_MODULE_2__.writable)(false),
		router: $childFragments[0]?.route.router || context.router,
		route: null,
		parentContext: context,
		onDestroy: (0,hookar__WEBPACK_IMPORTED_MODULE_1__.createSequenceHooksCollection)(),
		decorators: [context?.decorators, decorator].flat().filter(Boolean),
		single: (0,svelte_store__WEBPACK_IMPORTED_MODULE_2__.writable)(setup.single)
	}));

	/**
 * @param {RouteFragment[]} fragments
 */
	const handlePageChange = fragments => {
		const [fragment, ...childFragments] = [...fragments];

		// todo we should match node, not node.id. For some reason node instances are different
		$$invalidate(1, activeContext = childContexts.find(s => s.node.id === fragment?.node.id));

		if (!activeContext) throw new Error(`couldn't find context for ${fragment?.node.id}`);
		$$invalidate(1, activeContext.fragment = fragment, activeContext);
		activeContext.childFragments.set(childFragments);
		$$invalidate(1, activeContext.route = fragments[0].route, activeContext);

		// todo issue is caused by routify:meta reset in modules/index.md
		// set this sibling to active and all other to inactive
		childContexts.forEach(s => s.isActive.set(s === activeContext));
	};

	const writable_props = ['context', 'options'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ComposeFragments> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('options' in $$props) $$invalidate(6, options = $$props.options);
	};

	$$self.$capture_state = () => ({
		createSequenceHooksCollection: hookar__WEBPACK_IMPORTED_MODULE_1__.createSequenceHooksCollection,
		writable: svelte_store__WEBPACK_IMPORTED_MODULE_2__.writable,
		RouteFragment: _Route_RouteFragment__WEBPACK_IMPORTED_MODULE_3__.RouteFragment,
		RenderFragment: _RenderFragment_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		normalizeMulti: _utils_normalizeMulti_js__WEBPACK_IMPORTED_MODULE_5__.normalizeMulti,
		context,
		options,
		childFragments,
		isActive,
		multi,
		decorator,
		props,
		activeContext,
		setup,
		childContexts,
		handlePageChange,
		$childFragments,
		$isActive
	});

	$$self.$inject_state = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('options' in $$props) $$invalidate(6, options = $$props.options);
		if ('activeContext' in $$props) $$invalidate(1, activeContext = $$props.activeContext);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$isActive*/ 256) {
			// if parent changes status to inactive, so does children
			$: if (isActive && !$isActive) childContexts.forEach(cc => cc.isActive.set(false));
		}

		if ($$self.$$.dirty & /*$childFragments*/ 128) {
			$: $childFragments.length && handlePageChange($childFragments);
		}
	};

	return [
		context,
		activeContext,
		childFragments,
		isActive,
		props,
		childContexts,
		options,
		$childFragments,
		$isActive
	];
}

class ComposeFragments extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { context: 0, options: 6 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "ComposeFragments",
			options,
			id: create_fragment.name
		});
	}

	get context() {
		throw new Error_1("<ComposeFragments>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set context(value) {
		throw new Error_1("<ComposeFragments>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get options() {
		throw new Error_1("<ComposeFragments>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set options(value) {
		throw new Error_1("<ComposeFragments>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; ComposeFragments = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: ComposeFragments, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComposeFragments);



/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte":
/*!*********************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/utils */ "./node_modules/@roxi/routify/lib/common/utils.js");
/* harmony import */ var _DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DecoratorWrapper.svelte */ "./node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte generated by Svelte v3.49.0 */





const file = "node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte";

// (25:0) <svelte:component this={lastDecorator} {Parent} {context}>
function create_default_slot(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[7])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(25:0) <svelte:component this={lastDecorator} {Parent} {context}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*lastDecorator*/ ctx[2];

	function switch_props(ctx) {
		return {
			props: {
				Parent: /*Parent*/ ctx[1],
				context: /*context*/ ctx[0],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
			switch_instance_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*Parent*/ 2) switch_instance_changes.Parent = /*Parent*/ ctx[1];
			if (dirty & /*context*/ 1) switch_instance_changes.context = /*context*/ ctx[0];

			if (dirty & /*$$scope*/ 128) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*lastDecorator*/ ctx[2])) {
				if (switch_instance) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
					const old_component = switch_instance;

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(old_component.$$.fragment, 1, 0, () => {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(old_component, 1);
					});

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, 1);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(switch_instance_anchor);
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(switch_instance, detaching);
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

function instance($$self, $$props, $$invalidate) {
	let decoClones;
	let lastDecorator;
	let Parent;
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('DecoratorWrapper', slots, ['default']);
	let { decorators = null, nested = false, context } = $$props;

	// we only want to trigger onDestroy from the first decorator wrapper
	if (!nested) (0,svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy)(() => context.onDestroy.run());

	const writable_props = ['decorators', 'nested', 'context'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DecoratorWrapper> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('decorators' in $$props) $$invalidate(3, decorators = $$props.decorators);
		if ('nested' in $$props) $$invalidate(4, nested = $$props.nested);
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('$$scope' in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onDestroy: svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy,
		addPropsToComp: _common_utils__WEBPACK_IMPORTED_MODULE_2__.addPropsToComp,
		DecoratorWrapper: _DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		decorators,
		nested,
		context,
		decoClones,
		Parent,
		lastDecorator
	});

	$$self.$inject_state = $$props => {
		if ('decorators' in $$props) $$invalidate(3, decorators = $$props.decorators);
		if ('nested' in $$props) $$invalidate(4, nested = $$props.nested);
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('decoClones' in $$props) $$invalidate(5, decoClones = $$props.decoClones);
		if ('Parent' in $$props) $$invalidate(1, Parent = $$props.Parent);
		if ('lastDecorator' in $$props) $$invalidate(2, lastDecorator = $$props.lastDecorator);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*decorators, context*/ 9) {
			// TODO insert Noop.svelte as first item
			$: $$invalidate(5, decoClones = [...decorators || context.decorators]);
		}

		if ($$self.$$.dirty & /*decoClones*/ 32) {
			$: $$invalidate(2, lastDecorator = decoClones.pop());
		}

		if ($$self.$$.dirty & /*decoClones, context*/ 33) {
			$: $$invalidate(1, Parent = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.addPropsToComp)(_DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__["default"], {
				decorators: decoClones,
				context,
				nested: true
			}));
		}
	};

	return [context, Parent, lastDecorator, decorators, nested, decoClones, slots, $$scope];
}

class DecoratorWrapper_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { decorators: 3, nested: 4, context: 0 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "DecoratorWrapper_1",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*context*/ ctx[0] === undefined && !('context' in props)) {
			console.warn("<DecoratorWrapper> was created without expected prop 'context'");
		}
	}

	get decorators() {
		throw new Error("<DecoratorWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set decorators(value) {
		throw new Error("<DecoratorWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nested() {
		throw new Error("<DecoratorWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nested(value) {
		throw new Error("<DecoratorWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get context() {
		throw new Error("<DecoratorWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set context(value) {
		throw new Error("<DecoratorWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; DecoratorWrapper_1 = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: DecoratorWrapper_1, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DecoratorWrapper_1);



/***/ }),

/***/ "./node_modules/@roxi/routify/lib/runtime/renderer/RenderFragment.svelte":
/*!*******************************************************************************!*\
  !*** ./node_modules/@roxi/routify/lib/runtime/renderer/RenderFragment.svelte ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComposeFragments.svelte */ "./node_modules/@roxi/routify/lib/runtime/renderer/ComposeFragments.svelte");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DecoratorWrapper.svelte */ "./node_modules/@roxi/routify/lib/runtime/renderer/DecoratorWrapper.svelte");
/* harmony import */ var _decorators_Noop_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../decorators/Noop.svelte */ "./node_modules/@roxi/routify/lib/runtime/decorators/Noop.svelte");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/@roxi/routify/lib/runtime/renderer/RenderFragment.svelte generated by Svelte v3.49.0 */






const file = "node_modules/@roxi/routify/lib/runtime/renderer/RenderFragment.svelte";

// (27:0) {#if isVisible && NodeComponent}
function create_if_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = _DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__["default"];

	function switch_props(ctx) {
		return {
			props: {
				context: /*context*/ ctx[0],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
			switch_instance_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*context*/ 1) switch_instance_changes.context = /*context*/ ctx[0];

			if (dirty & /*$$scope, NodeComponent, compProps, userContext, props, context, $childFragments*/ 1048695) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = _DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__["default"])) {
				if (switch_instance) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
					const old_component = switch_instance;

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(old_component.$$.fragment, 1, 0, () => {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(old_component, 1);
					});

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, 1);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(switch_instance_anchor);
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(switch_instance, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(27:0) {#if isVisible && NodeComponent}",
		ctx
	});

	return block;
}

// (39:12) {#if $childFragments.length || (multi && !multi?.single)}
function create_if_block_1(ctx) {
	let component;
	let current;

	component = new _ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				options: {
					multi: /*multi*/ ctx[18],
					decorator: /*decorator*/ ctx[19],
					props: /*props*/ ctx[1]
				},
				context: /*context*/ ctx[0]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(component.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(component, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const component_changes = {};

			if (dirty & /*multi, decorator, props*/ 786434) component_changes.options = {
				multi: /*multi*/ ctx[18],
				decorator: /*decorator*/ ctx[19],
				props: /*props*/ ctx[1]
			};

			if (dirty & /*context*/ 1) component_changes.context = /*context*/ ctx[0];
			component.$set(component_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(component.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(component.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(component, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(39:12) {#if $childFragments.length || (multi && !multi?.single)}",
		ctx
	});

	return block;
}

// (32:8) <svelte:component             this={NodeComponent}             {...compProps}             context={userContext}             let:props             let:multi             let:decorator>
function create_default_slot_1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = (/*$childFragments*/ ctx[6].length || /*multi*/ ctx[18] && !/*multi*/ ctx[18]?.single) && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*$childFragments*/ ctx[6].length || /*multi*/ ctx[18] && !/*multi*/ ctx[18]?.single) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$childFragments, multi*/ 262208) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(32:8) <svelte:component             this={NodeComponent}             {...compProps}             context={userContext}             let:props             let:multi             let:decorator>",
		ctx
	});

	return block;
}

// (30:4) <svelte:component this={DecoratorWrapper} {context}>
function create_default_slot(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*compProps*/ ctx[5], { context: /*userContext*/ ctx[4] }];
	var switch_value = /*NodeComponent*/ ctx[2];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: {
				default: [
					create_default_slot_1,
					({ props, multi, decorator }) => ({ 1: props, 18: multi, 19: decorator }),
					({ props, multi, decorator }) => (props ? 2 : 0) | (multi ? 262144 : 0) | (decorator ? 524288 : 0)
				]
			},
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.assign)(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
			switch_instance_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, target, anchor);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*compProps, userContext*/ 48)
			? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_update)(switch_instance_spread_levels, [
					dirty & /*compProps*/ 32 && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_spread_object)(/*compProps*/ ctx[5]),
					dirty & /*userContext*/ 16 && { context: /*userContext*/ ctx[4] }
				])
			: {};

			if (dirty & /*$$scope, multi, decorator, props, context, $childFragments*/ 1835075) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*NodeComponent*/ ctx[2])) {
				if (switch_instance) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
					const old_component = switch_instance;

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(old_component.$$.fragment, 1, 0, () => {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(old_component, 1);
					});

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(switch_instance.$$.fragment);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, 1);
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(switch_instance_anchor);
			if (switch_instance) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(switch_instance, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(30:4) <svelte:component this={DecoratorWrapper} {context}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*isVisible*/ ctx[3] && /*NodeComponent*/ ctx[2] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*isVisible*/ ctx[3] && /*NodeComponent*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isVisible, NodeComponent*/ 12) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
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

function instance($$self, $$props, $$invalidate) {
	let isVisible;
	let params;
	let load;
	let route;
	let compProps;
	let userContext;
	let $isActive;
	let $single;
	let $childFragments;
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('RenderFragment', slots, []);
	let { context, props, activeContext } = $$props;
	const { isActive, childFragments, single } = context; // grab the stores
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(isActive, 'isActive');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, isActive, value => $$invalidate(14, $isActive = value));
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(childFragments, 'childFragments');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, childFragments, value => $$invalidate(6, $childFragments = value));
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(single, 'single');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, single, value => $$invalidate(15, $single = value));
	let NodeComponent = context.node.module?.default || !context.node.asyncModule && _decorators_Noop_svelte__WEBPACK_IMPORTED_MODULE_4__["default"];
	(0,svelte__WEBPACK_IMPORTED_MODULE_2__.setContext)('routify-fragment-context', context);
	const notExcludedCtx = context => !context?.node.meta.multi?.exclude;
	const isPartOfPage = () => !$single && [context, activeContext].every(notExcludedCtx);
	const writable_props = ['context', 'props', 'activeContext'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RenderFragment> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('props' in $$props) $$invalidate(1, props = $$props.props);
		if ('activeContext' in $$props) $$invalidate(10, activeContext = $$props.activeContext);
	};

	$$self.$capture_state = () => ({
		Component: _ComposeFragments_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		setContext: svelte__WEBPACK_IMPORTED_MODULE_2__.setContext,
		DecoratorWrapper: _DecoratorWrapper_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Noop: _decorators_Noop_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		context,
		props,
		activeContext,
		isActive,
		childFragments,
		single,
		NodeComponent,
		notExcludedCtx,
		isPartOfPage,
		route,
		load,
		userContext,
		params,
		compProps,
		isVisible,
		$isActive,
		$single,
		$childFragments
	});

	$$self.$inject_state = $$props => {
		if ('context' in $$props) $$invalidate(0, context = $$props.context);
		if ('props' in $$props) $$invalidate(1, props = $$props.props);
		if ('activeContext' in $$props) $$invalidate(10, activeContext = $$props.activeContext);
		if ('NodeComponent' in $$props) $$invalidate(2, NodeComponent = $$props.NodeComponent);
		if ('route' in $$props) $$invalidate(11, route = $$props.route);
		if ('load' in $$props) $$invalidate(12, load = $$props.load);
		if ('userContext' in $$props) $$invalidate(4, userContext = $$props.userContext);
		if ('params' in $$props) $$invalidate(13, params = $$props.params);
		if ('compProps' in $$props) $$invalidate(5, compProps = $$props.compProps);
		if ('isVisible' in $$props) $$invalidate(3, isVisible = $$props.isVisible);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$isActive*/ 16384) {
			$: $$invalidate(3, isVisible = $isActive || isPartOfPage());
		}

		if ($$self.$$.dirty & /*NodeComponent, isVisible, context*/ 13) {
			$: if (!NodeComponent && isVisible) context.node.getRawComponent().then(r => $$invalidate(2, NodeComponent = r));
		}

		if ($$self.$$.dirty & /*context*/ 1) {
			$: $$invalidate(13, { params, load, route } = context.fragment, params, ($$invalidate(12, load), $$invalidate(0, context)), ($$invalidate(11, route), $$invalidate(0, context)));
		}

		if ($$self.$$.dirty & /*params, load, props*/ 12290) {
			$: $$invalidate(5, compProps = { ...params, ...load?.props, ...props });
		}

		if ($$self.$$.dirty & /*context, load, route*/ 6145) {
			$: $$invalidate(4, userContext = { ...context, load, route });
		}
	};

	return [
		context,
		props,
		NodeComponent,
		isVisible,
		userContext,
		compProps,
		$childFragments,
		isActive,
		childFragments,
		single,
		activeContext,
		route,
		load,
		params,
		$isActive
	];
}

class RenderFragment extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { context: 0, props: 1, activeContext: 10 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "RenderFragment",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*context*/ ctx[0] === undefined && !('context' in props)) {
			console.warn("<RenderFragment> was created without expected prop 'context'");
		}

		if (/*props*/ ctx[1] === undefined && !('props' in props)) {
			console.warn("<RenderFragment> was created without expected prop 'props'");
		}

		if (/*activeContext*/ ctx[10] === undefined && !('activeContext' in props)) {
			console.warn("<RenderFragment> was created without expected prop 'activeContext'");
		}
	}

	get context() {
		throw new Error("<RenderFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set context(value) {
		throw new Error("<RenderFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get props() {
		throw new Error("<RenderFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set props(value) {
		throw new Error("<RenderFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get activeContext() {
		throw new Error("<RenderFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set activeContext(value) {
		throw new Error("<RenderFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {}; RenderFragment = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_5__.applyHmr({ m: module, id: "\"node_modules/@roxi/routify/lib/runtime/renderer/RenderFragment.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: RenderFragment, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_6__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RenderFragment);



/***/ }),

/***/ "./src/App.svelte":
/*!************************!*\
  !*** ./src/App.svelte ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _roxi_routify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @roxi/routify */ "./node_modules/@roxi/routify/lib/runtime/index.js");
/* harmony import */ var _routify_routes_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.routify/routes.default */ "./.routify/routes.default.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/App.svelte generated by Svelte v3.49.0 */




const file = "src/App.svelte";

function create_fragment(ctx) {
	let a0;
	let t1;
	let a1;
	let t3;
	let a2;
	let t5;
	let router;
	let current;
	router = new _roxi_routify__WEBPACK_IMPORTED_MODULE_1__.Router({ props: { routes: _routify_routes_default__WEBPACK_IMPORTED_MODULE_2__["default"] }, $$inline: true });

	const block = {
		c: function create() {
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a0.textContent = "home";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" |\n");
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a1.textContent = "more";
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" |\n");
			a2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a2.textContent = "stuff";
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(router.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "/");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 5, 0, 113);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "/more");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 6, 0, 136);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a2, "href", "./stuff");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a2, file, 7, 0, 163);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t5, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(router, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(router.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(router.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(router, detaching);
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

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('App', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Router: _roxi_routify__WEBPACK_IMPORTED_MODULE_1__.Router, routes: _routify_routes_default__WEBPACK_IMPORTED_MODULE_2__["default"] });
	return [];
}

class App extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) { if (false) {}; App = _home_benji_demos_routify_3_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__.applyHmr({ m: module, id: "\"src/App.svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false,"allowLiveBinding":false}, Component: App, ProxyAdapter: _home_benji_demos_routify_3_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__.adapter, acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);



/***/ }),

/***/ "./node_modules/svelte-loader/lib/hot-api.js":
/*!***************************************************!*\
  !*** ./node_modules/svelte-loader/lib/hot-api.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyHmr": () => (/* binding */ applyHmr)
/* harmony export */ });
/* harmony import */ var svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-hmr/runtime */ "./node_modules/svelte-hmr/runtime/index.js");


// eslint-disable-next-line no-undef
const g = typeof window !== 'undefined' ? window : __webpack_require__.g;

const globalKey =
	typeof Symbol !== 'undefined'
		? Symbol('SVELTE_LOADER_HOT')
		: '__SVELTE_LOADER_HOT';

if (!g[globalKey]) {
	// do updating refs counting to know when a full update has been applied
	let updatingCount = 0;

	const notifyStart = () => {
		updatingCount++;
	};

	const notifyError = reload => err => {
		const errString = (err && err.stack) || err;
		// eslint-disable-next-line no-console
		console.error(
			'[HMR] Failed to accept update (nollup compat mode)',
			errString
		);
		reload();
		notifyEnd();
	};

	const notifyEnd = () => {
		updatingCount--;
		if (updatingCount === 0) {
			// NOTE this message is important for timing in tests
			// eslint-disable-next-line no-console
			console.log('[HMR:Svelte] Up to date');
		}
	};

	g[globalKey] = {
		hotStates: {},
		notifyStart,
		notifyError,
		notifyEnd,
	};
}

const runAcceptHandlers = acceptHandlers => {
	const queue = [...acceptHandlers];
	const next = () => {
		const cur = queue.shift();
		if (cur) {
			return cur(null).then(next);
		} else {
			return Promise.resolve(null);
		}
	};
	return next();
};

const applyHmr = (0,svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)(args => {
	const { notifyStart, notifyError, notifyEnd } = g[globalKey];
	const { m, reload } = args;

	let acceptHandlers = (m.hot.data && m.hot.data.acceptHandlers) || [];
	let nextAcceptHandlers = [];

	m.hot.dispose(data => {
		data.acceptHandlers = nextAcceptHandlers;
	});

	const dispose = (...args) => m.hot.dispose(...args);

	const accept = handler => {
		if (nextAcceptHandlers.length === 0) {
			m.hot.accept();
		}
		nextAcceptHandlers.push(handler);
	};

	const check = status => {
		if (status === 'ready') {
			notifyStart();
		} else if (status === 'idle') {
			runAcceptHandlers(acceptHandlers)
				.then(notifyEnd)
				.catch(notifyError(reload));
		}
	};

	m.hot.addStatusHandler(check);

	m.hot.dispose(() => {
		m.hot.removeStatusHandler(check);
	});

	const hot = {
		data: m.hot.data,
		dispose,
		accept,
	};

	return { ...args, hot };
});


/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentTyped),
/* harmony export */   "afterUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.afterUpdate),
/* harmony export */   "beforeUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.beforeUpdate),
/* harmony export */   "createEventDispatcher": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.createEventDispatcher),
/* harmony export */   "getAllContexts": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getAllContexts),
/* harmony export */   "getContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getContext),
/* harmony export */   "hasContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.hasContext),
/* harmony export */   "onDestroy": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy),
/* harmony export */   "onMount": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onMount),
/* harmony export */   "setContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.setContext),
/* harmony export */   "tick": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.tick)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* binding */ HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* binding */ HtmlTagHydration),
/* harmony export */   "SvelteComponent": () => (/* binding */ SvelteComponent),
/* harmony export */   "SvelteComponentDev": () => (/* binding */ SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* binding */ SvelteComponentTyped),
/* harmony export */   "SvelteElement": () => (/* binding */ SvelteElement),
/* harmony export */   "action_destroyer": () => (/* binding */ action_destroyer),
/* harmony export */   "add_attribute": () => (/* binding */ add_attribute),
/* harmony export */   "add_classes": () => (/* binding */ add_classes),
/* harmony export */   "add_flush_callback": () => (/* binding */ add_flush_callback),
/* harmony export */   "add_location": () => (/* binding */ add_location),
/* harmony export */   "add_render_callback": () => (/* binding */ add_render_callback),
/* harmony export */   "add_resize_listener": () => (/* binding */ add_resize_listener),
/* harmony export */   "add_styles": () => (/* binding */ add_styles),
/* harmony export */   "add_transform": () => (/* binding */ add_transform),
/* harmony export */   "afterUpdate": () => (/* binding */ afterUpdate),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "append_dev": () => (/* binding */ append_dev),
/* harmony export */   "append_empty_stylesheet": () => (/* binding */ append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* binding */ append_hydration),
/* harmony export */   "append_hydration_dev": () => (/* binding */ append_hydration_dev),
/* harmony export */   "append_styles": () => (/* binding */ append_styles),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "attr_dev": () => (/* binding */ attr_dev),
/* harmony export */   "attribute_to_object": () => (/* binding */ attribute_to_object),
/* harmony export */   "beforeUpdate": () => (/* binding */ beforeUpdate),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "binding_callbacks": () => (/* binding */ binding_callbacks),
/* harmony export */   "blank_object": () => (/* binding */ blank_object),
/* harmony export */   "bubble": () => (/* binding */ bubble),
/* harmony export */   "check_outros": () => (/* binding */ check_outros),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "claim_component": () => (/* binding */ claim_component),
/* harmony export */   "claim_element": () => (/* binding */ claim_element),
/* harmony export */   "claim_html_tag": () => (/* binding */ claim_html_tag),
/* harmony export */   "claim_space": () => (/* binding */ claim_space),
/* harmony export */   "claim_svg_element": () => (/* binding */ claim_svg_element),
/* harmony export */   "claim_text": () => (/* binding */ claim_text),
/* harmony export */   "clear_loops": () => (/* binding */ clear_loops),
/* harmony export */   "component_subscribe": () => (/* binding */ component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* binding */ compute_rest_props),
/* harmony export */   "compute_slots": () => (/* binding */ compute_slots),
/* harmony export */   "createEventDispatcher": () => (/* binding */ createEventDispatcher),
/* harmony export */   "create_animation": () => (/* binding */ create_animation),
/* harmony export */   "create_bidirectional_transition": () => (/* binding */ create_bidirectional_transition),
/* harmony export */   "create_component": () => (/* binding */ create_component),
/* harmony export */   "create_in_transition": () => (/* binding */ create_in_transition),
/* harmony export */   "create_out_transition": () => (/* binding */ create_out_transition),
/* harmony export */   "create_slot": () => (/* binding */ create_slot),
/* harmony export */   "create_ssr_component": () => (/* binding */ create_ssr_component),
/* harmony export */   "current_component": () => (/* binding */ current_component),
/* harmony export */   "custom_event": () => (/* binding */ custom_event),
/* harmony export */   "dataset_dev": () => (/* binding */ dataset_dev),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "destroy_block": () => (/* binding */ destroy_block),
/* harmony export */   "destroy_component": () => (/* binding */ destroy_component),
/* harmony export */   "destroy_each": () => (/* binding */ destroy_each),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "detach_after_dev": () => (/* binding */ detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* binding */ detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* binding */ detach_between_dev),
/* harmony export */   "detach_dev": () => (/* binding */ detach_dev),
/* harmony export */   "dirty_components": () => (/* binding */ dirty_components),
/* harmony export */   "dispatch_dev": () => (/* binding */ dispatch_dev),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "element": () => (/* binding */ element),
/* harmony export */   "element_is": () => (/* binding */ element_is),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "end_hydrating": () => (/* binding */ end_hydrating),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "escape_attribute_value": () => (/* binding */ escape_attribute_value),
/* harmony export */   "escape_object": () => (/* binding */ escape_object),
/* harmony export */   "exclude_internal_props": () => (/* binding */ exclude_internal_props),
/* harmony export */   "fix_and_destroy_block": () => (/* binding */ fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* binding */ fix_and_outro_and_destroy_block),
/* harmony export */   "fix_position": () => (/* binding */ fix_position),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "getAllContexts": () => (/* binding */ getAllContexts),
/* harmony export */   "getContext": () => (/* binding */ getContext),
/* harmony export */   "get_all_dirty_from_scope": () => (/* binding */ get_all_dirty_from_scope),
/* harmony export */   "get_binding_group_value": () => (/* binding */ get_binding_group_value),
/* harmony export */   "get_current_component": () => (/* binding */ get_current_component),
/* harmony export */   "get_custom_elements_slots": () => (/* binding */ get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* binding */ get_root_for_style),
/* harmony export */   "get_slot_changes": () => (/* binding */ get_slot_changes),
/* harmony export */   "get_spread_object": () => (/* binding */ get_spread_object),
/* harmony export */   "get_spread_update": () => (/* binding */ get_spread_update),
/* harmony export */   "get_store_value": () => (/* binding */ get_store_value),
/* harmony export */   "globals": () => (/* binding */ globals),
/* harmony export */   "group_outros": () => (/* binding */ group_outros),
/* harmony export */   "handle_promise": () => (/* binding */ handle_promise),
/* harmony export */   "hasContext": () => (/* binding */ hasContext),
/* harmony export */   "has_prop": () => (/* binding */ has_prop),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "insert_dev": () => (/* binding */ insert_dev),
/* harmony export */   "insert_hydration": () => (/* binding */ insert_hydration),
/* harmony export */   "insert_hydration_dev": () => (/* binding */ insert_hydration_dev),
/* harmony export */   "intros": () => (/* binding */ intros),
/* harmony export */   "invalid_attribute_name_character": () => (/* binding */ invalid_attribute_name_character),
/* harmony export */   "is_client": () => (/* binding */ is_client),
/* harmony export */   "is_crossorigin": () => (/* binding */ is_crossorigin),
/* harmony export */   "is_empty": () => (/* binding */ is_empty),
/* harmony export */   "is_function": () => (/* binding */ is_function),
/* harmony export */   "is_promise": () => (/* binding */ is_promise),
/* harmony export */   "is_void": () => (/* binding */ is_void),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "listen_dev": () => (/* binding */ listen_dev),
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "loop_guard": () => (/* binding */ loop_guard),
/* harmony export */   "merge_ssr_styles": () => (/* binding */ merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* binding */ missing_component),
/* harmony export */   "mount_component": () => (/* binding */ mount_component),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "not_equal": () => (/* binding */ not_equal),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "null_to_empty": () => (/* binding */ null_to_empty),
/* harmony export */   "object_without_properties": () => (/* binding */ object_without_properties),
/* harmony export */   "onDestroy": () => (/* binding */ onDestroy),
/* harmony export */   "onMount": () => (/* binding */ onMount),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "outro_and_destroy_block": () => (/* binding */ outro_and_destroy_block),
/* harmony export */   "prevent_default": () => (/* binding */ prevent_default),
/* harmony export */   "prop_dev": () => (/* binding */ prop_dev),
/* harmony export */   "query_selector_all": () => (/* binding */ query_selector_all),
/* harmony export */   "raf": () => (/* binding */ raf),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "run_all": () => (/* binding */ run_all),
/* harmony export */   "safe_not_equal": () => (/* binding */ safe_not_equal),
/* harmony export */   "schedule_update": () => (/* binding */ schedule_update),
/* harmony export */   "select_multiple_value": () => (/* binding */ select_multiple_value),
/* harmony export */   "select_option": () => (/* binding */ select_option),
/* harmony export */   "select_options": () => (/* binding */ select_options),
/* harmony export */   "select_value": () => (/* binding */ select_value),
/* harmony export */   "self": () => (/* binding */ self),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "set_attributes": () => (/* binding */ set_attributes),
/* harmony export */   "set_current_component": () => (/* binding */ set_current_component),
/* harmony export */   "set_custom_element_data": () => (/* binding */ set_custom_element_data),
/* harmony export */   "set_data": () => (/* binding */ set_data),
/* harmony export */   "set_data_dev": () => (/* binding */ set_data_dev),
/* harmony export */   "set_input_type": () => (/* binding */ set_input_type),
/* harmony export */   "set_input_value": () => (/* binding */ set_input_value),
/* harmony export */   "set_now": () => (/* binding */ set_now),
/* harmony export */   "set_raf": () => (/* binding */ set_raf),
/* harmony export */   "set_store_value": () => (/* binding */ set_store_value),
/* harmony export */   "set_style": () => (/* binding */ set_style),
/* harmony export */   "set_svg_attributes": () => (/* binding */ set_svg_attributes),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "spread": () => (/* binding */ spread),
/* harmony export */   "src_url_equal": () => (/* binding */ src_url_equal),
/* harmony export */   "start_hydrating": () => (/* binding */ start_hydrating),
/* harmony export */   "stop_propagation": () => (/* binding */ stop_propagation),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "svg_element": () => (/* binding */ svg_element),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "tick": () => (/* binding */ tick),
/* harmony export */   "time_ranges_to_array": () => (/* binding */ time_ranges_to_array),
/* harmony export */   "to_number": () => (/* binding */ to_number),
/* harmony export */   "toggle_class": () => (/* binding */ toggle_class),
/* harmony export */   "transition_in": () => (/* binding */ transition_in),
/* harmony export */   "transition_out": () => (/* binding */ transition_out),
/* harmony export */   "trusted": () => (/* binding */ trusted),
/* harmony export */   "update_await_block_branch": () => (/* binding */ update_await_block_branch),
/* harmony export */   "update_keyed_each": () => (/* binding */ update_keyed_each),
/* harmony export */   "update_slot": () => (/* binding */ update_slot),
/* harmony export */   "update_slot_base": () => (/* binding */ update_slot_base),
/* harmony export */   "validate_component": () => (/* binding */ validate_component),
/* harmony export */   "validate_dynamic_element": () => (/* binding */ validate_dynamic_element),
/* harmony export */   "validate_each_argument": () => (/* binding */ validate_each_argument),
/* harmony export */   "validate_each_keys": () => (/* binding */ validate_each_keys),
/* harmony export */   "validate_slots": () => (/* binding */ validate_slots),
/* harmony export */   "validate_store": () => (/* binding */ validate_store),
/* harmony export */   "validate_void_dynamic_element": () => (/* binding */ validate_void_dynamic_element),
/* harmony export */   "xlink_attr": () => (/* binding */ xlink_attr)
/* harmony export */ });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes, is_svg) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration(undefined, is_svg);
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes, is_svg);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes, is_svg = false) {
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function getAllContexts() {
    return get_current_component().$$.context;
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : __webpack_require__.g);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */
function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = '';
    let last = 0;
    while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : (ch === '"' ? '&quot;' : '&lt;'));
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === 'string' || (value && typeof value === 'object');
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    const assignment = (boolean && value === true) ? '' : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${style_object[key]};`)
        .join(' ');
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function validate_dynamic_element(tag) {
    const is_string = typeof tag === 'string';
    if (tag && !is_string) {
        throw new Error('<svelte:element> expects "this" attribute to be a string.');
    }
}
function validate_void_dynamic_element(tag) {
    if (tag && is_void(tag)) {
        throw new Error(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ }),

/***/ "./node_modules/svelte/store/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/svelte/store/index.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "derived": () => (/* binding */ derived),
/* harmony export */   "get": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.get_store_value),
/* harmony export */   "readable": () => (/* binding */ readable),
/* harmony export */   "writable": () => (/* binding */ writable)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if ((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal)(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.is_function)(result) ? result : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.subscribe)(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.run_all)(unsubscribers);
            cleanup();
        };
    });
}




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadApp": () => (/* binding */ loadApp)
/* harmony export */ });
/* harmony import */ var _App_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.svelte */ "./src/App.svelte");


const loadApp = (el) => {
  new _App_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]({
    target: el,
  })
}

if (false) {}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("bundle." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("fc7f83d1b1983b61a100")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "wp5-starter-svelte:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatewp5_starter_svelte"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwp5_starter_svelte"] = self["webpackChunkwp5_starter_svelte"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map