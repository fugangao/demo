import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/:catchAll(.*)",
    hidden: true,
    component: () => import("@/components/notFound.vue"),
  },
  { path: "/", redirect: "/login", hidden: true },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/components/login.vue"),
  },
  {
    path: "/home",
    name: "学生管理",
    redirect: "/home/studentlist",
    component: () => import("@/components/home/home.vue"),
    children: [
      {
        path: "studentlist",
        name: "学生列表",
        component: () => import("@/components/student/studentlist.vue"),
      },
      {
        path: "infolist",
        name: "信息列表",
        component: () => import("@/components/student/infolist.vue"),
      },
      {
        path: "info",
        name: "信息管理",
        component: () => import("@/components/student/info.vue"),
      },
      {
        path: "worklist",
        name: "作业列表",
        component: () => import("@/components/student/worklist.vue"),
      },
      {
        path: "work",
        name: "作业管理",
        component: () => import("@/components/student/work.vue"),
      },
    ],
  },
  {
    path: "/home",
    name: "数据分析",
    component: () => import("@/components/home/home.vue"),
    children: [
      {
        path: "dataView",
        name: "数据概览",
        component: () => import("@/components/dataAnalysis/dataView.vue"),
      },
      {
        path: "mapView",
        name: "地图概览",
        component: () => import("@/components/dataAnalysis/mapView.vue"),
      },
      {
        path: "travelMap",
        name: "旅游地图",
        component: () => import("@/components/dataAnalysis/travelMap.vue"),
      },
      {
        path: "scoreMap",
        name: "分数地图",
        component: () => import("@/components/dataAnalysis/scoreMap.vue"),
      },
    ]
  },
  {
    path: "/home",
    name: "用户中心",
    component: () => import("@/components/home/home.vue"),
    children:[{path:'user',name:'权限管理',component: ()=> import('@/components/user/user.vue')}]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // to 即将进入的路由
  // from 在哪个路由进入的
  // next 放行
  //   console.log(to); //打印的是页面要跳转到的路由,例如：它下面的path：为"/login"
  let token = localStorage.getItem("token") || "";
  if (token) {
    //判断是否有token
    next();
  } else {
    //在没有token的前提下，to下面的path是否为/login，如果不是则页面跳转到登录页面
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login" }); //跳转页面到login页
    }
  }
});

export default router;
