const Mock = require("mockjs");
const settings = require("../../settings");

const getResourceList = function() {
  let resourceList = {
    code: "SUCCESS",
    message: "调用成功",
    body: [
      {
        id: "1",
        name: "概览",
        code: "dashboard",
        parentId: "0",
        parentName: "",
        type: "menu",
        path: "/Dashboard",
        requestType: "get",
        sort: "0",
        icon: "pie-chart",
        description: ""
      },
      {
        id: "2",
        name: "个人中心",
        code: "personal",
        parentId: "0",
        parentName: "",
        type: "menu",
        path: "",
        requestType: "",
        sort: "1",
        icon: "user",
        description: ""
      },
      {
        id: "3",
        name: "个人设置",
        code: "setting",
        parentId: "2",
        parentName: "个人中心",
        type: "menu",
        path: "/user/Personal",
        requestType: "get",
        sort: "2",
        icon: "edit",
        description: ""
      },
      {
        id: "4",
        name: "系统管理",
        code: "system",
        parentId: "0",
        parentName: "",
        type: "menu",
        path: "",
        requestType: "",
        sort: "3",
        icon: "setting",
        description: ""
      },
      {
        id: "5",
        name: "用户管理",
        code: "user",
        parentId: "4",
        parentName: "系统管理",
        type: "menu",
        path: "/system/User",
        requestType: "get",
        sort: "4",
        icon: "team",
        description: ""
      },
      {
        id: "6",
        name: "角色管理",
        code: "role",
        parentId: "4",
        parentName: "系统管理",
        type: "menu",
        path: "/system/Role",
        requestType: "get",
        sort: "5",
        icon: "solution",
        description: ""
      },
      {
        id: "7",
        name: "权限管理",
        code: "role",
        parentId: "4",
        parentName: "系统管理",
        type: "menu",
        path: "/system/Resource",
        requestType: "get",
        sort: "6",
        icon: "menu",
        description: ""
      }
    ],
    cost: 1
  };
  return resourceList;
};

const saveResource = function() {
  let result = {
    code: "SUCCESS",
    message: "调用成功",
    body: "1",
    cost: 11
  };
  return result;
};

Mock.mock(
  settings.preUrl.api + "/permission/resourcesList",
  "get",
  getResourceList
);
Mock.mock(
  RegExp(settings.preUrl.api + `/permission/resource/`),
  "put",
  saveResource
);
