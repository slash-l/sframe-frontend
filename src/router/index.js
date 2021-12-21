import Vue from "vue";
import VueRouter from "vue-router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(VueRouter);
Vue.use(Antd);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    redirect: { name: "dashboard" },
    children: [
      {
        path: "Dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard/DashBoard.vue")
      },
      {
        path: "user/Personal",
        name: "personal",
        component: () => import("../views/user/Personal.vue")
      },
      {
        path: "system/User",
        name: "user",
        component: () => import("../views/system/User.vue")
      },
      {
        path: "system/Role",
        name: "role",
        component: () => import("../views/system/Role.vue")
      },
      {
        path: "system/Resource",
        name: "role",
        component: () => import("../views/system/Resource.vue")
      }
    ]
  },
  {
    path: "/new",
    component: () => import("../views/NewLayout.vue"),
    redirect: { name: "login" },
    children: [
      {
        path: "Login",
        name: "login",
        component: () => import("../views/new/Login.vue")
      }
    ]
  },
  {
    path: "*",
    name: "page_404",
    component: () => import("../views/Page404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes
});

export default router;
