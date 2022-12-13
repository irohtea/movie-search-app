import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviePage from '../views/MoviePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'Movie Page',
    component: MoviePage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/movie-search-app/' : '/'),
  routes
})

export default router
