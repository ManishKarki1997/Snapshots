import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _797ef9ec = () => interopDefault(import('../pages/create.vue' /* webpackChunkName: "pages/create" */))
const _255953ae = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _d96eb3da = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _42864865 = () => interopDefault(import('../pages/snap/_id.vue' /* webpackChunkName: "pages/snap/_id" */))
const _23abb312 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/create",
      component: _797ef9ec,
      name: "create"
    }, {
      path: "/login",
      component: _255953ae,
      name: "login"
    }, {
      path: "/register",
      component: _d96eb3da,
      name: "register"
    }, {
      path: "/snap/:id?",
      component: _42864865,
      name: "snap-id"
    }, {
      path: "/",
      component: _23abb312,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
