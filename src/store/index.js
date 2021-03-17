import { createStore } from "vuex";
import productModule from "./modules/product.js";
import authModule from "./modules/auth.js";
import userModule from "./modules/user.js";
import blogModule from "./modules/blog.js";

const store = createStore({
  modules: {
    products: productModule,
    auth: authModule,
    user: userModule,
    blog: blogModule,
  },
});

export default store;
