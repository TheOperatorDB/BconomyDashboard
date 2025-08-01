import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./style.css";

import FloatingVue from "floating-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(FloatingVue);

app.mount("#app");
