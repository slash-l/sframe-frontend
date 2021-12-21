import axios from "@/utils/http";
import settings from "@/settings";

/**
 * 获取角色列表
 */
export const ApiGetRoleList = () =>
  axios({
    url: settings.preUrl.api + "/permission/roleList",
    params: {},
    method: "get"
  });

/**
 * 根据 roleId 获取 role 对象数据
 * @param roleId
 */
export const ApiGetRole = roleId =>
  axios({
    url: settings.preUrl.api + "/permission/role/${roleId}",
    params: { roleId },
    method: "get"
  });

/**
 * 新增保存角色
 */
export const ApiAddRole = roleVO =>
  axios({
    url: settings.preUrl.api + "/permission/role",
    params: { roleVO },
    method: "post"
  });

/**
 * 更新角色
 */
export const ApiUpdateRole = (roleId, roleVO) =>
  axios({
    url: settings.preUrl.api + "/permission/role/${roleId}",
    params: { roleVO },
    method: "put"
  });

/**
 * 删除角色
 */
export const ApiDeleteRole = roleId =>
  axios({
    url: settings.preUrl.api + "/permission/role/${roleId}",
    params: { roleId },
    method: "delete"
  });

/**
 * 批量删除角色
 */
export const ApiDeleteRoles = roleIds =>
  axios({
    url: settings.preUrl.api + "/permission/role",
    params: { roleIds },
    method: "delete"
  });
