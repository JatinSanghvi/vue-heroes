import Vue from "vue";
import VueRouter from "vue-router";
import PageNotFound from "@/views/page-not-found";

Vue.use(VueRouter);

const parseProps = r => ({ id: parseInt(r.params.id) });

const routes = [
  {
    path: "/",
    redirect: "/heroes"
  },
  {
    path: "/heroes",
    name: "heroes",
    component: () =>
      import(/* webpackChunkName: "bundle-heroes" */ "@/views/heroes")
  },
  {
    path: "/heroes/:id",
    name: "hero-detail",
    props: parseProps,
    component: () =>
      import(/* webpackChunkName: "bundle-heroes" */ "@/views/hero-detail")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "bundle-about" */ "@/views/about")
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
