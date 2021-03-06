import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    pageLoaderStatus: 0,
    domain: 'http://localhost:8080/api'
  },
  mutations: {},
  actions: {},
  modules: {},
});
