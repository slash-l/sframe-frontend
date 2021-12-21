<template>
  <a-layout-footer style="text-align: center">
    <div>Copyright© {{ curYear }} - {{ nextYear }} JFrog 捷蛙科技</div>
  </a-layout-footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  data() {
    return {
      curYear: "",
      nextYear: ""
    };
  },
  created() {
    let aData = new Date();
    this.curYear = aData.getFullYear();
    this.nextYear = this.curYear + 1;
  }
};
</script>

<style scoped></style>
