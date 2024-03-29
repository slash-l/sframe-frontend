import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import lang from "./modules/lang";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    lang
  }
});
