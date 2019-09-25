import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _797ef9ec = () => interopDefault(import('../pages/create.vue' /* webpackChunkName: "pages/create" */))
const _3f42dc59 = () => interopDefault(import('../pages/discover.vue' /* webpackChunkName: "pages/discover" */))
const _255953ae = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _3df9732e = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _e59ccba8 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _7bd24aef = () => interopDefault(import('../pages/profile/followers.vue' /* webpackChunkName: "pages/profile/followers" */))
const _47eebb6b = () => interopDefault(import('../pages/profile/following.vue' /* webpackChunkName: "pages/profile/following" */))
const _68abd07a = () => interopDefault(import('../pages/profile/snaps.vue' /* webpackChunkName: "pages/profile/snaps" */))
const _d96eb3da = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _3186db1a = () => interopDefault(import('../pages/snap/edit/_id.vue' /* webpackChunkName: "pages/snap/edit/_id" */))
const _091c7ef0 = () => interopDefault(import('../pages/search/_searchQuery.vue' /* webpackChunkName: "pages/search/_searchQuery" */))
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
      path: "/discover",
      component: _3f42dc59,
      name: "discover"
    }, {
      path: "/login",
      component: _255953ae,
      name: "login"
    }, {
      path: "/profile",
      component: _3df9732e,
      children: [{
        path: "",
        component: _e59ccba8,
        name: "profile"
      }, {
        path: "followers",
        component: _7bd24aef,
        name: "profile-followers"
      }, {
        path: "following",
        component: _47eebb6b,
        name: "profile-following"
      }, {
        path: "snaps",
        component: _68abd07a,
        name: "profile-snaps"
      }]
    }, {
      path: "/register",
      component: _d96eb3da,
      name: "register"
    }, {
      path: "/snap/edit/:id?",
      component: _3186db1a,
      name: "snap-edit-id"
    }, {
      path: "/search/:searchQuery?",
      component: _091c7ef0,
      name: "search-searchQuery"
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
