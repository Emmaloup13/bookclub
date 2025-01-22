import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditUser from '@/components/EditUser.vue'
import UsersView from '@/views/UsersView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/users',
        name: 'Users',
        component: UsersView
    },
    {
      path: '/user/edit/:id',
      name: 'EditUser',
      component: EditUser,
      props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router