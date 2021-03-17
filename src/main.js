import { createApp } from "vue";
import store from "./store/index.js";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import TheHeader from "./UI/TheHeader.vue";
import TheFooter from "./UI/TheFooter.vue";
import TheLoader from "./UI/TheLoader.vue";
import BasePagination from "./UI/BasePagination.vue";
import BaseButton from "./UI/BaseButton.vue";
import BaseModal from "./UI/BaseModal.vue";
import ModalCart from "./components/ModalCart.vue";
import HomePage from "./pages/HomePage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductPage from "./pages/ProductPage.vue";
import BlogsPage from "./pages/BlogsPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import AccountPage from "./pages/AccountPage.vue";
import NewPost from "./pages/NewPost.vue";
import PostPage from "./pages/PostPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import BookingPage from "./pages/BookingPage.vue";
import NotFound from "./pages/NotFound.vue";

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
      path: "/products",
      component: ProductsPage,
    },
    {
      path: "/products/:id",
      component: ProductsPage,
      props: true,
      beforeEnter(to, from, next) {
        next();
      },
    },
    {
      path: "/product/:id",
      component: ProductPage,
      props: true,
    },
    {
      path: "/posts",
      component: BlogsPage,
    },
    {
      path: "/posts/:id",
      component: PostPage,
      props: true,
    },
    { path: "/new", component: NewPost, meta: { requiresAuth: true } },
    {
      path: "/auth",
      component: AuthPage,
      meta: { requiresUnauth: true },
    },
    {
      path: "/contact",
      component: ContactPage,
    },
    {
      path: "/booking",
      component: BookingPage,
      meta: { requiresProd: true },
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
  history: createWebHistory(),
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresProd && store.getters.basketNum > 0) {
    next();
  } else if (to.meta.requiresProd && store.getters.basketNum === 0) {
    next("/");
  } else if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
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
app.component("the-loader", TheLoader);
app.component("base-button", BaseButton);
app.component("base-modal", BaseModal);
app.component("modal-cart", ModalCart);
app.component("base-pagination", BasePagination);

app.mount("#app");
