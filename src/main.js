import App from "./App.svelte";

export const loadApp = (el) => {
  new App({
    target: el,
  })
}

if (LOAD_TYPE === 'local') {
  loadApp(document.getElementById("app"))
}
