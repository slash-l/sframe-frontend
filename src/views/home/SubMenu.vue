<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon v-bind:type="props.menuInfo.icon" /><span>{{
        props.menuInfo.title
      }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.key"
        @click="() => parent.navRouter(item)"
      >
        <a-icon v-bind:type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.key"
        :menu-info="item"
        @click="() => parent.navRouter(item)"
      />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: "SubMenu",
  props: ["menuInfo"]
};
</script>

<style scoped></style>
