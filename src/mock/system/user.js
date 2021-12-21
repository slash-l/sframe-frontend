const Mock = require("mockjs");
const settings = require("../../settings");

const getUserList = function() {
  let userList = {
    code: "SUCCESS",
    message: "调用成功",
    body: [
      {
        id: "1",
        loginName: "Captain",
        userName: "美国队长",
        email: "captain@admin.com",
        phoneNum: "13000000000",
        createTime: "2020.06.21"
      },
      {
        id: "2",
        loginName: "Iron-man",
        userName: "钢铁侠",
        email: "iron-man@admin.com",
        phoneNum: "13100000000",
        createTime: "2020.06.22"
      },
      {
        id: "3",
        loginName: "Hulk",
        userName: "绿巨人",
        email: "hulk@admin.com",
        phoneNum: "13200000000",
        createTime: "2020.06.23"
      }
    ],
    cost: 1
  };
  return userList;
};

const getUserResourcesList = function() {
  let userResources = {
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
  return userResources;
};

const getUser = function() {
  let user = {
    code: "SUCCESS",
    message: "调用成功",
    body: {
      id: "11",
      loginName: "Captain",
      userName: "美国队长",
      email: "captain@admin.com",
      phoneNum: "13000000000",
      createTime: "2020.06.21",
      roleList: ["11"],
      resourceList: ["1", "2", "3", "4", "5", "6", "7"]
    },
    cost: 1
  };
  return user;
};

const addUser = function() {
  let result = {
    code: "SUCCESS",
    message: "新增成功",
    body: "1",
    cost: 11
  };
  return result;
};

const updateUser = function() {
  let result = {
    code: "SUCCESS",
    message: "更新成功",
    body: "2",
    cost: 11
  };
  return result;
};

const deleteUser = function() {
  let result = {
    code: "SUCCESS",
    message: "调用成功",
    cost: 11
  };
  return result;
};

Mock.mock(settings.preUrl.api + "/permission/userList", "get", getUserList);
Mock.mock(
  RegExp(settings.preUrl.api + "/permission/userResourcesList?"),
  "get",
  getUserResourcesList
);
Mock.mock(
  RegExp(settings.preUrl.api + `/permission/user`),
  "delete",
  deleteUser
);
Mock.mock(RegExp(settings.preUrl.api + `/permission/user`), "get", getUser);
Mock.mock(RegExp(settings.preUrl.api + `/permission/user`), "post", addUser);
Mock.mock(RegExp(settings.preUrl.api + `/permission/user`), "put", updateUser);

// Mock.mock(RegExp(ApiPath.user.getUserInfo + ".*"), "get", (options) =>{
//     // 可以通过 options 获取参数
//     console.debug(ApiPath.user.getUserInfo, options);
//     return Mock.mock(mockUserInfo);
// });
