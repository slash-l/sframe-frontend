const Mock = require("mockjs");
const settings = require("../../settings");

const getRoleList = function() {
  let roleList = {
    code: "SUCCESS",
    message: "调用成功",
    body: [
      {
        id: "11",
        name: "系统管理员",
        code: "admin",
        description: "系统最高权限",
        createTime: "2020.01.01"
      },
      {
        id: "22",
        name: "游客",
        code: "guest",
        description: "系统部分访问权限",
        createTime: "2020.01.01"
      }
    ],
    cost: 1
  };
  return roleList;
};

const getRole = function() {
  let role = {
    code: "SUCCESS",
    message: "调用成功",
    body: {
      id: "11",
      name: "系统管理员",
      code: "admin",
      description: "系统管理员，拥有系统最高权限",
      createTime: "2020.01.01",
      resourceList: ["1", "2", "3", "4", "5", "6", "7"]
    },
    cost: 1
  };
  return role;
};

const addRole = function() {
  let result = {
    code: "SUCCESS",
    message: "新增成功",
    body: "1",
    cost: 11
  };
  return result;
};

const updateRole = function() {
  let result = {
    code: "SUCCESS",
    message: "更新成功",
    body: "2",
    cost: 11
  };
  return result;
};

const deleteRole = function() {
  let result = {
    code: "SUCCESS",
    message: "调用成功",
    cost: 11
  };
  return result;
};

Mock.mock(settings.preUrl.api + "/permission/roleList", "get", getRoleList);
Mock.mock(RegExp(settings.preUrl.api + `/permission/role`), "get", getRole);
Mock.mock(RegExp(settings.preUrl.api + `/permission/role`), "post", addRole);
Mock.mock(RegExp(settings.preUrl.api + `/permission/role`), "put", updateRole);
Mock.mock(
  RegExp(settings.preUrl.api + `/permission/role`),
  "delete",
  deleteRole
);
