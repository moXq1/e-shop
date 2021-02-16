import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import TheHeader from "./UI/TheHeader.vue";
import TheFooter from "./UI/TheFooter.vue";
import HomePage from "./pages/HomePage.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
  ],
  history: createWebHistory(),
});

const app = createApp(App);

app.use(router);

app.component("the-footer", TheFooter);
app.component("the-header", TheHeader);

app.mount("#app");
