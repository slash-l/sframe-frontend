import axios from "axios";
import router from "@/router";
import { getAccessTokenFromCookie } from "@/api/auth/auth";
import message from "ant-design-vue/es/message";

let config = {
  timeout: 10 * 1000 // Timeout
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  config => {
    console.log("start request interceptors");

    // 获取当前cookie 域内的access_token，如果没有则跳转至登录界面
    let access_token = getAccessTokenFromCookie();
    // let refresh_token = authApi.getRefreshTokenFromCookie()

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    } else {
      message.error("亲，还未登录系统，请先登录哦！");
      router.push({ name: "login" });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/new/Login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 403:
          message.error("权限不足");
          break;
        // 404请求不存在
        case 404:
          message.error("请求资源不存在，请检查路径是否正确！");
          break;
        // 其他错误，直接抛出错误提示
        default:
          message.error("系统错误！");
      }
      return Promise.reject(error.response);
    }
  }
);

export default _axios;
