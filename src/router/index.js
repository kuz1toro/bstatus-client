import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login_form.vue'
import Register from '../components/Register.vue'
import Home from '../views/Home.vue'
import listGdg from '../views/List_gdg.vue'
import test from '../views/test.vue'
import NProgress from 'vue-nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { disallowAuthed: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/listGdg',
    name: 'listGdg',
    component: listGdg
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})


export default router

// method untuk mencegah balik ke halaman login setelah sukses login
/*
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.getItem('token')) next(false)
  else next()
})
*/
