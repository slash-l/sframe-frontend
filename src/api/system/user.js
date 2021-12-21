import axios from "@/utils/http";
import settings from "@/settings";

/**
 * 获取用户列表
 */
export const ApiGetUserList = () =>
  axios({
    url: settings.preUrl.api + "/permission/userList",
    params: {},
    method: "get"
  });

/**
 * 获取登录用户所有资源权限列表
 * @param userId
 */
export const ApiGetUserResources = userId =>
  axios({
    url: settings.preUrl.api + "/permission/userResourcesList",
    params: { userId },
    method: "get"
  });

/**
 * 根据 userId 获取 user 对象数据
 * @param userId
 */
export const ApiGetUser = userId =>
  axios({
    url: settings.preUrl.api + "/permission/user/${userId}",
    params: { userId },
    method: "get"
  });

/**
 * 新增保存角色
 */
export const ApiAddUser = userVO =>
  axios({
    url: settings.preUrl.api + "/permission/user",
    params: { userVO },
    method: "post"
  });

/**
 * 更新角色
 */
export const ApiUpdateUser = (userId, userVO) =>
  axios({
    url: settings.preUrl.api + "/permission/user/${userId}",
    params: { userVO },
    method: "put"
  });

/**
 * 删除用户
 */
export const ApiDeleteUser = userId =>
  axios({
    url: settings.preUrl.api + "/permission/user/${userId}",
    params: { userId },
    method: "delete"
  });

/**
 * 批量删除用户
 */
export const ApiDeleteUsers = userIds =>
  axios({
    url: settings.preUrl.api + "/permission/user",
    params: { userIds },
    method: "delete"
  });
