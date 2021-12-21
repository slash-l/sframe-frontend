import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import echarts from "echarts";
import VueI18n from "vue-i18n";
import LangENUS from "./common/lang/en-us";
import LangZHCN from "./common/lang/zh-cn";
process.env.VUE_APP_MOCK === "true" && require("./mock.js");

console.log("mock state:" + process.env.VUE_APP_MOCK);

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(echarts);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh-cn",
  messages: {
    "en-us": LangENUS,
    "zh-cn": LangZHCN
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

// 设置浏览器标题
Vue.directive("title", {
  inserted: function(el) {
    document.title = el.dataset.title;
  }
});
