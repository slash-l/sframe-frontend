import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

const state = {
  lang: zhCN
};

const mutations = {
  CHANGE_LANG: (state, langType) => {
    state.lang = langType;
    console.log(state.lang);
  }
};

const actions = {
  changeLang({ commit }, langType) {
    commit("CHANGE_LANG", langType);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
