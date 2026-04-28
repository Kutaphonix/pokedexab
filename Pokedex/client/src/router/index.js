import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetails from '../views/PokemonDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-details',
      component: PokemonDetails
    },
    {
      path: '/add',
      name: 'add-pokemon',
      component: () => import('../views/AddView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit-pokemon',
      component: () => import('../views/EditView.vue')
    }

  ]
})

export default router
