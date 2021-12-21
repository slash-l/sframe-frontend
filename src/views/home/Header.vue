<template>
  <a-layout-header class="header">
    <a-row :gutter="[16, 16]">
      <a-col :span="4">
        <div class="logo" />
      </a-col>
      <a-col :span="4" />
      <a-col :span="4" />
      <a-col :span="4" />
      <a-col :span="4"> </a-col>
      <a-col :span="4">
        <div class="user-icon">
          <div class="drop-down">
            <a-popover placement="bottomRight">
              <template slot="content">
                <div @click="goLogin()">
                  <a-icon type="logout" />&nbsp;&nbsp; {{ $t("home.logout") }}
                </div>
              </template>
              <template slot="title">
                <div @click="goUser()">
                  <a-icon type="user" />&nbsp;&nbsp; {{ $t("home.personal") }}
                </div>
              </template>
              <a-avatar size="large" icon="user" />
            </a-popover>
            <span class="show-name"> admin </span>
          </div>
          <div class="global">
            <a-popover placement="bottomRight">
              <template slot="content">
                <div @click="changeLocale('zhCN')">中文</div>
              </template>
              <template slot="title">
                <div @click="changeLocale('enUS')">English</div>
              </template>
              <a-avatar size="large" icon="global" />
            </a-popover>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goUser() {
      this.$router.push({ name: "personal" });
    },
    goLogin() {
      this.$store.dispatch("login/logout").then(() => {
        this.$router.push({ name: "login" });
      });
    },
    changeLocale(langType) {
      this.$store.dispatch("lang/changeLang", langType);
    }
  }
};
</script>

<style scoped>
.drop-down {
  float: left;
  width: 120px;
}
.global {
  float: right;
}
.user-icon {
  float: right;
}
.show-name {
  fontsize: 14px;
  color: #ffffff;
}
#components-popover-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
