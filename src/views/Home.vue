<template>
  <a-config-provider :locale="locale">
    <a-layout
      id="components-layout-demo-top-side-2"
      style="min-height: 100vh"
      v-title
      data-title="JFrog"
    >
      <Header></Header>
      <a-layout>
        <SiderMenu></SiderMenu>

        <a-layout style="padding: 0 24px 24px">
          <BreadCrumb></BreadCrumb>

          <a-layout-content
            :style="{
              background: '#fff',
              padding: '24px',
              margin: 0,
              minHeight: '280px'
            }"
          >
            <router-view></router-view>
          </a-layout-content>

          <Footer></Footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
import Header from "./home/Header";
import Footer from "./home/Footer";
import SiderMenu from "./home/SiderMenu";
import BreadCrumb from "./home/BreadCrumb";
import moment from "moment";
import "moment/locale/zh-cn";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const EN = "en-us";
const ZH = "zh-cn";

moment.locale("zh-cn");

export default {
  name: "Home",
  data() {
    return {
      collapsed: false,
      locale: this.$store.state.lang.lang
    };
  },
  components: {
    BreadCrumb,
    SiderMenu,
    Footer,
    Header
  },
  computed: {
    getLang() {
      return this.$store.state.lang.lang;
    }
  },
  watch: {
    getLang(val) {
      if (val === "enUS") {
        this.locale = enUS;
        moment.locale("en");
        this.$i18n.locale = EN;
      } else {
        this.locale = zhCN;
        moment.locale("zh-cn");
        this.$i18n.locale = ZH;
      }
    }
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
