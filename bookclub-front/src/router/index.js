import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditUser from '@/components/EditUser.vue'
import UsersView from '@/views/UsersView.vue'
import BooksToReadView from '@/views/BooksToReadView.vue'
import BooksInReadingView from '@/views/BooksInReadingView.vue'

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
    },
    {
        path: '/booksToRead',
        name: 'BooksToRead',
        component: BooksToReadView
    },
    {
        path: '/booksInReading',
        name: 'BooksInReading',
        component: BooksInReadingView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router