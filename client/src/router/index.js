import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Pets from '../views/Pets.vue'
import Items from '../views/Items.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/pets',
    name: 'Pets',
    component: Pets
  },
  {
    path: '/items',
    name: 'Items',
    component: Items
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 