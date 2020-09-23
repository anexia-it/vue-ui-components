import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Kitchensink from "../views/Kitchensink.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    redirect: {
      name: "Kitchensink"
    }
  },
  {
    path: "/kitchensink",
    name: "Kitchensink",
    component: Kitchensink
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
