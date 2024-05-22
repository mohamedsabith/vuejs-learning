import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../components/signup/SignUp.vue";
import Dashboard from "../components/dashboard/Dashboard.vue";
import Home from "../components/home/Home.vue";
import Login from "../components/login/Login.vue";
import Post from "../components/post/Post.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresNoAuth: true },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: { requiresNoAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresNoAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts",
    name: "Post",
    component: Post,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
