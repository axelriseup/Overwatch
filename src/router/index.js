import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {authStore} from 'src/stores/auth'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  //befoew router get the access token from local storage and set it to the store
  Router.beforeEach((to, from, next) => {
    const store = authStore()

    let access_token = localStorage.getItem('access_token')
    //access_token slice to get the token only
    console.log(access_token==null)
    if(access_token==null && to.path!='/login'){
      return next('/login')
    }

    if (access_token) {
      access_token = access_token.split('|')[1]
      access_token = access_token.replace(/"/g, '')
      store.setLoginSession({access_token: access_token})
    }
    next()
  })

  return Router
})
