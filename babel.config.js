module.exports = {
  // presets: [
  //     "@vue/cli-plugin-babel/preset"
  // ]
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry" // 配置浏览器兼容，根据兼容目标导入所有 polyfill
      }
    ]
  ]
};
