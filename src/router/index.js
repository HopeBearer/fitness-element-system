import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/Home.vue')
        },
        {
          path: '/equipments',
          name: 'Equipments',
          redirect: '/equipments/overview',
          component: () => import('@/views/equipment/Equipment.vue'),
          children: [
            {
              path: '/equipments/overview',
              name: 'Overview',
              component: () => import('@/views/equipment/Overview.vue')
            },
            {
              path: '/equipments/category',
              name: 'Category',
              component: () => import('@/views/equipment/Category.vue')
            },
            {
              path: '/equipments/storage',
              name: 'Storage',
              component: () => import('@/views/equipment/Storage.vue')
            },
            {
              path: '/equipments/maintenance',
              name: 'Maintenance',
              component: () => import('@/views/equipment/Maintenance.vue')
            }
          ]
        },
        {
          path: '/user',
          name: 'User',
          redirect: '/user/list',
          component: () => import('@/views/user/index.vue'),
          children: [
            {
              path: '/user/list',
              name: 'Users',
              component: () => import('@/views/user/UserList.vue')
            },
            {
              path: '/user/profile',
              name: 'Profile',
              component: () => import('@/views/user/ProfilePage.vue')
            },
            {
              path: '/user/security',
              name: 'Security',
              component: () => import('@/views/user/SafeSetting.vue')
            }
          ]
        },
        {
          path: '/user/personal',
          name: 'Personal',
          component: () => import('@/views/user/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/login/Register.vue')
    }
  ]
})
