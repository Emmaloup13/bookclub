import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '@/views/UsersView.vue'
import BooksToReadView from '@/views/BooksToReadView.vue'
import BooksInReadingView from '@/views/BooksInReadingView.vue'
import BooksReadView from '@/views/BooksReadView.vue'
import BookDetails from '@/views/BookDetails.vue'

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
        path: '/booksToRead',
        name: 'BooksToRead',
        component: BooksToReadView
    },
    {
        path: '/booksInReading',
        name: 'BooksInReading',
        component: BooksInReadingView
    },
    {
        path: '/booksRead',
        name: 'BooksRead',
        component: BooksReadView
    },
    {
        path: '/books/:id',
        name: 'BookDetails',
        component: BookDetails,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router