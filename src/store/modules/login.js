import * as authApi from "@/api/auth/auth";
import { ApiGetUserResources } from "@/api/system/user";

const state = {
  user: authApi.buildUserFromCookie(),
  userResources: null,
  breadCrumbNames: null
};

const mutations = {
  SET_TOKEN: state => {
    state.user = authApi.buildUserFromCookie();
  },
  REMOVE_TOKEN: state => {
    state.user = null;
  },
  SET_USER_RESOURCES: (state, rst) => {
    state.userResources = rst;
  },
  SET_BREADCRUMB: (state, breadCrumbNames) => {
    state.breadCrumbNames = breadCrumbNames;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    const rst = await authApi.login(username, password);
    authApi.setTokensToCookie(rst.data.access_token, rst.data.refresh_token);
    commit("SET_TOKEN");
  },

  logout({ commit }) {
    // 调用 sso 登出 api
    // ...

    commit("REMOVE_TOKEN");
    authApi.removeTokensFromCookie();
  },

  async getUserResources({ commit }) {
    const rst = await ApiGetUserResources(state.user.userId);
    //将后端父子结构数据转换为 tree 结构数据
    const treeData = formatTreeJson(rst.data.body);

    commit("SET_USER_RESOURCES", treeData);
  },

  async setBreadCrumb({ commit }, { breadCrumbName, subBreadCrumbName }) {
    commit("SET_BREADCRUMB", { breadCrumbName, subBreadCrumbName });
  }
};

function formatTreeJson(resourceList) {
  let treeResult = [];
  for (let resource of resourceList) {
    if (resource.parentId == 0) {
      //判断是否为顶层节点
      let parent = {
        //转换成el-Cascader可以识别的数据结构
        key: resource.id,
        title: resource.name,
        icon: resource.icon,
        path: resource.path
      };
      let childs = getchilds(resource.id, resourceList); //获取子节点
      if (childs.length != 0)
        parent.children = getchilds(resource.id, resourceList);
      treeResult.push(parent);
    }
  }
  return treeResult;
}
function getchilds(id, array) {
  let childs = new Array();
  for (let arr of array) {
    //循环获取子节点
    if (arr.parentId == id) {
      childs.push({
        title: arr.name,
        key: arr.id,
        icon: arr.icon,
        path: arr.path,
        parentTitle: arr.parentName
      });
    }
  }
  for (let child of childs) {
    //获取子节点的子节点
    let childscopy = getchilds(child.value, array); //递归获取子节点
    if (childscopy.length > 0) {
      child.children = childscopy;
    }
  }
  return childs;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
