import { createApp } from "vue";
import store from "./store/index.js";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import TheHeader from "./UI/TheHeader.vue";
import TheFooter from "./UI/TheFooter.vue";
import BaseButton from "./UI/BaseButton.vue";
import BaseModal from "./UI/BaseModal.vue";
import ModalCart from "./components/ModalCart.vue";
import HomePage from "./pages/HomePage.vue";
import ProductPage from "./pages/ProductPage.vue";
import BlogsPage from "./pages/BlogsPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import AccountPage from "./pages/AccountPage.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/account/:userid",
      component: AccountPage,
      props: true,
      name: "acc",
      meta: { requiresAuth: true },
    },
    {
      path: "/products/:id",
      component: ProductPage,
      props: true,
    },
    {
      path: "/blogs",
      component: BlogsPage,
    },
    {
      path: "/auth",
      component: AuthPage,
      meta: { requiresUnauth: true },
    },
  ],
  history: createWebHistory(),
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next(`/account/${store.getters.userId}`);
  } else {
    next();
  }
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component("the-footer", TheFooter);
app.component("the-header", TheHeader);
app.component("base-button", BaseButton);
app.component("base-modal", BaseModal);
app.component("modal-cart", ModalCart);

app.mount("#app");
