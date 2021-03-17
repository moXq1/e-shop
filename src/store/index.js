import { createStore } from "vuex";
import productModule from "./modules/product.js";
import authModule from "./modules/auth.js";
import userModule from "./modules/user.js";

const store = createStore({
  modules: {
    products: productModule,
    auth: authModule,
    user: userModule,
  },
  getters: {
    dbUrl() {
      return "https://vue-http-demo-3c75b-default-rtdb.firebaseio.com";
    },
  },
});

export default store;
