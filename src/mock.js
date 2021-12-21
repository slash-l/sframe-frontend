// 引入mockjs
const Mock = require("mockjs");
require("@/mock/system/user");
require("@/mock/system/login");
require("@/mock/system/resource");
require("@/mock/system/role");

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: "200 - 400"
});
