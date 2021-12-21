import axios from "@/utils/http";
import settings from "@/settings";

/**
 * 获取系统所有资源列表数据
 */
export const ApiGetResources = () =>
  axios({
    url: settings.preUrl.api + "/permission/resourcesList",
    params: {},
    method: "get"
  });

/**
 * 新增保存权限
 */
export const ApiAddResource = resourceVO =>
  axios({
    url: settings.preUrl.api + "/permission/resource",
    params: { resourceVO },
    method: "post"
  });

/**
 * 修改保存权限
 */
export const ApiUpdateResource = (resourceId, resourceVO) =>
  axios({
    url: settings.preUrl.api + `/permission/resource/${resourceId}`,
    params: { resourceVO },
    method: "put"
  });
