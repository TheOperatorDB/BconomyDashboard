import { createRouter, createWebHistory } from "vue-router";
import Pets from "../views/Pets.vue";
import Database from "../views/Database.vue";
import Users from "../views/Users.vue";
import Market from "../views/Market.vue";

const routes = [
  {
    path: "/",
    redirect: "/market",
  },
  {
    path: "/market",
    name: "Market",
    component: Market,
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
    path: "/database",
    name: "Database",
    component: Database,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
