export default {
  namespace: true,
  state() {
    return {
      products: [
        {
          title: "Bread",
          description: "Space for a small product description",
          bigDescription: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
          molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!`,
          price: "12.48",
          img: require("../../assets/victoria-shes-IUk1S6n2s0o-unsplash.jpg"),
          onSale: false,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "a",
          id: "p1",
        },
        {
          title: "Croissant",
          description: "Space for a small product description",
          bigDescription: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
          molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!`,
          price: "32.48",
          img: require("../../assets/mahyar-motebassem-123wTsGP4LU-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "b",
          id: "p2",
        },
        {
          title: "Cookies",
          description: "Space for a small product description",
          bigDescription: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
          molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!`,
          price: "6.48",
          img: require("../../assets/mae-mu-kID9sxbJ3BQ-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "c",
          id: "p3",
        },
        {
          title: "Spoon",
          description: "Space for a small product description",
          bigDescription: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
          molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!`,
          price: "1.48",
          img: require("../../assets/hue12-photography-rScZlwNBezc-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "kitchen",
          rating: 1.5,
          brand: "a",
          id: "p4",
        },
        {
          title: "Brread",
          description: "Space for a small product description",
          bigDescription: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
          molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!`,
          price: "12.48",
          img: require("../../assets/victoria-shes-IUk1S6n2s0o-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "b",
          id: "p5",
        },
        {
          title: "BBread",
          description: "Space for a small product description",
          bigDescription: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus
          molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!`,
          price: "1.48",
          img: require("../../assets/victoria-shes-IUk1S6n2s0o-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "a",
          id: "p6",
        },
      ],
      items: 3,
      basket: {},
      curProduct: {},
    };
  },
  getters: {
    products(state) {
      return state.products;
    },
    curProduct(state) {
      return state.curProduct;
    },
    productsMainPage(state) {
      if (state.products.length > state.items) {
        return state.products.slice(0, state.items);
      }
      return state.products;
    },
    basketNum(state) {
      return Object.keys(state.basket).reduce(
        (acc, cur) => acc + state.basket[cur].count,
        0
      );
    },
    basketTotal(state) {
      return Object.keys(state.basket).reduce((acc, cur) => {
        if (state.basket[cur].onSale) {
          return parseFloat(
            (
              acc +
              state.basket[cur].price *
                (state.basket[cur].discount / 100) *
                state.basket[cur].count
            ).toFixed(2)
          );
        } else {
          return parseFloat(
            (acc + state.basket[cur].price * state.basket[cur].count).toFixed(2)
          );
        }
      }, 0);
    },
    basket(state) {
      console.log(1);
      //const bas = localStorage.getItem("basket");
      // if (bas) {
      //   console.log(bas);
      //   state.basket = JSON.parse(bas);
      // }
      return state.basket;
    },
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload;
    },

    setCurProduct(state, payload) {
      state.curProduct = payload;
    },

    addToBasket(state, payload) {
      state.basket[payload.id] = { ...payload };
      if (localStorage.getItem("basket")) {
        localStorage.removeItem("basket");
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    setBasket(state, payload) {
      localStorage.removeItem("basket");

      state.basket = payload;
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    removeFromBasket(state, payload) {
      delete state.basket[payload];
      if (localStorage.getItem("basket")) {
        localStorage.removeItem("basket");
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    updateCount(state, payload) {
      state.basket[payload.id].count = parseInt(payload.value);
    },
  },
  actions: {
    addToBasket(context, payload) {
      if (Object.keys(context.state.basket).length === 0) {
        context.commit("addToBasket", { ...payload, count: 1 });
      } else {
        if (payload.id in context.state.basket) {
          context.commit("addToBasket", {
            ...payload,
            count: context.state.basket[payload.id].count + 1,
          });
        } else {
          context.commit("addToBasket", { ...payload, count: 1 });
        }
      }
    },

    addToBasketPr(context, payload) {
      if (payload.id in context.state.basket) {
        context.commit("addToBasket", {
          ...payload,
          count: context.state.basket[payload.id].count + payload.count,
        });
      } else {
        context.commit("addToBasket", { ...payload });
      }
    },

    removeFromBasket(context, payload) {
      context.commit("removeFromBasket", payload);
    },
    setBasket(context, payload) {
      context.commit("setBasket", payload);
    },
    updateCount(context, payload) {
      if (payload.value <= 0) {
        context.commit("removeFromBasket", payload.id);
      } else {
        context.commit("updateCount", { ...payload });
      }
    },

    setCurProduct(context, id) {
      const prod = context.state.products.find((el) => el.id === id);

      context.commit("setCurProduct", prod);
    },
  },
};
