
/**
 * @roxi/routify 2.18.8
 * File generated Tue Aug 23 2022 11:45:12 GMT-0400 (Eastern Daylight Time)
 */

export const __version = "2.18.8"
export const __timestamp = "2022-08-23T15:45:12.177Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/benji/demos/routify-3-webpack/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "more.svelte",
      "filepath": "/more.svelte",
      "name": "more",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/benji/demos/routify-3-webpack/src/pages/more.svelte",
      "importPath": "../src/pages/more.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/more",
      "id": "_more",
      "component": () => import('../src/pages/more.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "stuff.svelte",
      "filepath": "/stuff.svelte",
      "name": "stuff",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/benji/demos/routify-3-webpack/src/pages/stuff.svelte",
      "importPath": "../src/pages/stuff.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/stuff",
      "id": "_stuff",
      "component": () => import('../src/pages/stuff.svelte').then(m => m.default)
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

