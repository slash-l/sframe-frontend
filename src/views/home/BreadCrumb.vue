<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>
      <a-icon type="home" />
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <span>{{ breadCrumbName }}</span>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <span>{{ subBreadCrumbName }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",

  data() {
    return {
      breadCrumbName: "",
      subBreadCrumbName: ""
    };
  },

  computed: {
    getBreadCrumbNames() {
      return this.$store.state.login.breadCrumbNames;
    }
  },
  watch: {
    getBreadCrumbNames(val) {
      this.breadCrumbName = val.breadCrumbName;
      this.subBreadCrumbName = val.subBreadCrumbName;
    }
  }
};
</script>

<style scoped></style>
