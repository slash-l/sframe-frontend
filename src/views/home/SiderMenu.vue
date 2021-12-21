<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      mode="inline"
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2', '3']"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in menuList">
        <a-menu-item
          v-if="!item.children"
          :key="item.key"
          @click="navRouter(item)"
        >
          <a-icon v-bind:type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.key" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  name: "SiderMenu",
  components: {
    "sub-menu": SubMenu
  },
  data() {
    return {
      menuList: []
    };
  },
  mounted() {
    this.getMenuData();
  },
  methods: {
    getMenuData() {
      this.$store.dispatch("login/getUserResources");
    },
    navRouter(item) {
      this.$store.dispatch("login/setBreadCrumb", {
        breadCrumbName: item.parentTitle,
        subBreadCrumbName: item.title
      });
      this.$router.push(item.path);
    }
  },
  computed: {
    getUserResources() {
      return this.$store.state.login.userResources;
    }
  },
  watch: {
    getUserResources(val) {
      this.menuList = val;
    }
  }
};
</script>

<style scoped></style>
