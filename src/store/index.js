import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const requireContext = require.context('./modules', true, /.*\.js$/);

const modules = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.js$)/g, ""), requireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true;
    }
    return { ...modules, [name]: module };
  }, {});

console.log("modules", modules);

export const vuex_modules = modules;

export default new Vuex.Store({
  modules
});
