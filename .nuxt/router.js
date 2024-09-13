import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _db320d8a = () => interopDefault(import('../pages/forget-password.vue' /* webpackChunkName: "pages/forget-password" */))
const _1698ecc9 = () => interopDefault(import('../pages/reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _0ce92c7c = () => interopDefault(import('../pages/staff-login.vue' /* webpackChunkName: "pages/staff-login" */))
const _6b53d990 = () => interopDefault(import('../pages/verify-email.vue' /* webpackChunkName: "pages/verify-email" */))
const _477935b0 = () => interopDefault(import('../pages/Modules/change-password.vue' /* webpackChunkName: "pages/Modules/change-password" */))
const _769f5d98 = () => interopDefault(import('../pages/Modules/Dashboard/high-level-management.vue' /* webpackChunkName: "pages/Modules/Dashboard/high-level-management" */))
const _1291bb44 = () => interopDefault(import('../pages/Modules/Members/edit-members.vue' /* webpackChunkName: "pages/Modules/Members/edit-members" */))
const _7078ed73 = () => interopDefault(import('../pages/Modules/Members/members-record.vue' /* webpackChunkName: "pages/Modules/Members/members-record" */))
const _94e1c724 = () => interopDefault(import('../pages/Modules/Members/new-members.vue' /* webpackChunkName: "pages/Modules/Members/new-members" */))
const _b2dcca38 = () => interopDefault(import('../pages/Modules/Members/new-request.vue' /* webpackChunkName: "pages/Modules/Members/new-request" */))
const _78bdd1cb = () => interopDefault(import('../pages/Modules/Setting/access-control.vue' /* webpackChunkName: "pages/Modules/Setting/access-control" */))
const _60337a8e = () => interopDefault(import('../pages/Modules/Setting/roles-setting.vue' /* webpackChunkName: "pages/Modules/Setting/roles-setting" */))
const _0e696a58 = () => interopDefault(import('../pages/Modules/Staff-Management/edit-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/edit-staff" */))
const _bce5cea6 = () => interopDefault(import('../pages/Modules/Staff-Management/register-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/register-staff" */))
const _4ca04915 = () => interopDefault(import('../pages/Modules/Staff-Management/staff-record.vue' /* webpackChunkName: "pages/Modules/Staff-Management/staff-record" */))
const _594f53c2 = () => interopDefault(import('../pages/Modules/Staff-Management/usermatrix-view.vue' /* webpackChunkName: "pages/Modules/Staff-Management/usermatrix-view" */))
const _258fb8c2 = () => interopDefault(import('../pages/static/js/apexcharts.min.js' /* webpackChunkName: "pages/static/js/apexcharts.min" */))
const _9ba89218 = () => interopDefault(import('../pages/static/js/bootstrap.bundle.min.js' /* webpackChunkName: "pages/static/js/bootstrap.bundle.min" */))
const _63cb977a = () => interopDefault(import('../pages/static/js/datatables-simple-demo.js' /* webpackChunkName: "pages/static/js/datatables-simple-demo" */))
const _d1597c2c = () => interopDefault(import('../pages/static/js/dataTables.bootstrap5.min.js' /* webpackChunkName: "pages/static/js/dataTables.bootstrap5.min" */))
const _13f2e7a6 = () => interopDefault(import('../pages/static/js/fullcalendar.js' /* webpackChunkName: "pages/static/js/fullcalendar" */))
const _4f84f2cc = () => interopDefault(import('../pages/static/js/jquery-3.5.1.js' /* webpackChunkName: "pages/static/js/jquery-3.5.1" */))
const _776ab271 = () => interopDefault(import('../pages/static/js/jquery.dataTables.min.js' /* webpackChunkName: "pages/static/js/jquery.dataTables.min" */))
const _1d73defb = () => interopDefault(import('../pages/static/js/jquery.richtext.js' /* webpackChunkName: "pages/static/js/jquery.richtext" */))
const _2ce7af53 = () => interopDefault(import('../pages/static/js/jquery.table2excel.min.js' /* webpackChunkName: "pages/static/js/jquery.table2excel.min" */))
const _249629ec = () => interopDefault(import('../pages/static/js/scripts.js' /* webpackChunkName: "pages/static/js/scripts" */))
const _5f0427cc = () => interopDefault(import('../pages/static/js/select2.min.js' /* webpackChunkName: "pages/static/js/select2.min" */))
const _f6ab4bdc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/forget-password",
    component: _db320d8a,
    name: "forget-password"
  }, {
    path: "/reset-password",
    component: _1698ecc9,
    name: "reset-password"
  }, {
    path: "/staff-login",
    component: _0ce92c7c,
    name: "staff-login"
  }, {
    path: "/verify-email",
    component: _6b53d990,
    name: "verify-email"
  }, {
    path: "/Modules/change-password",
    component: _477935b0,
    name: "Modules-change-password"
  }, {
    path: "/Modules/Dashboard/high-level-management",
    component: _769f5d98,
    name: "Modules-Dashboard-high-level-management"
  }, {
    path: "/Modules/Members/edit-members",
    component: _1291bb44,
    name: "Modules-Members-edit-members"
  }, {
    path: "/Modules/Members/members-record",
    component: _7078ed73,
    name: "Modules-Members-members-record"
  }, {
    path: "/Modules/Members/new-members",
    component: _94e1c724,
    name: "Modules-Members-new-members"
  }, {
    path: "/Modules/Members/new-request",
    component: _b2dcca38,
    name: "Modules-Members-new-request"
  }, {
    path: "/Modules/Setting/access-control",
    component: _78bdd1cb,
    name: "Modules-Setting-access-control"
  }, {
    path: "/Modules/Setting/roles-setting",
    component: _60337a8e,
    name: "Modules-Setting-roles-setting"
  }, {
    path: "/Modules/Staff-Management/edit-staff",
    component: _0e696a58,
    name: "Modules-Staff-Management-edit-staff"
  }, {
    path: "/Modules/Staff-Management/register-staff",
    component: _bce5cea6,
    name: "Modules-Staff-Management-register-staff"
  }, {
    path: "/Modules/Staff-Management/staff-record",
    component: _4ca04915,
    name: "Modules-Staff-Management-staff-record"
  }, {
    path: "/Modules/Staff-Management/usermatrix-view",
    component: _594f53c2,
    name: "Modules-Staff-Management-usermatrix-view"
  }, {
    path: "/static/js/apexcharts.min",
    component: _258fb8c2,
    name: "static-js-apexcharts.min"
  }, {
    path: "/static/js/bootstrap.bundle.min",
    component: _9ba89218,
    name: "static-js-bootstrap.bundle.min"
  }, {
    path: "/static/js/datatables-simple-demo",
    component: _63cb977a,
    name: "static-js-datatables-simple-demo"
  }, {
    path: "/static/js/dataTables.bootstrap5.min",
    component: _d1597c2c,
    name: "static-js-dataTables.bootstrap5.min"
  }, {
    path: "/static/js/fullcalendar",
    component: _13f2e7a6,
    name: "static-js-fullcalendar"
  }, {
    path: "/static/js/jquery-3.5.1",
    component: _4f84f2cc,
    name: "static-js-jquery-3.5.1"
  }, {
    path: "/static/js/jquery.dataTables.min",
    component: _776ab271,
    name: "static-js-jquery.dataTables.min"
  }, {
    path: "/static/js/jquery.richtext",
    component: _1d73defb,
    name: "static-js-jquery.richtext"
  }, {
    path: "/static/js/jquery.table2excel.min",
    component: _2ce7af53,
    name: "static-js-jquery.table2excel.min"
  }, {
    path: "/static/js/scripts",
    component: _249629ec,
    name: "static-js-scripts"
  }, {
    path: "/static/js/select2.min",
    component: _5f0427cc,
    name: "static-js-select2.min"
  }, {
    path: "/",
    component: _f6ab4bdc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
