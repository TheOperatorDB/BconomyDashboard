import { createRouter, createWebHistory } from "vue-router";
import Pets from "../views/Pets.vue";
import Items from "../views/Items.vue";
import Users from "../views/Users.vue";

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users/:id?",
    name: "Users",
    component: Users,
  },
  {
    path: "/pets/:id?",
    name: "Pets",
    component: Pets,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
