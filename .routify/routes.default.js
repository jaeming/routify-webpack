

export default {
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
  "routifyDir": import.meta.url,
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
      "asyncModule": () => import('./../src/routes/index.svelte'),
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
      "asyncModule": () => import('./../src/routes/more.svelte'),
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
      "asyncModule": () => import('./../src/routes/stuff.svelte'),
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
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}