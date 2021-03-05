export default {
  namespace: true,
  state() {
    return {
      products: [
        {
          title: "Product Title 4234 fsdfs 42fsdf",
          description: "Space for a small product description",
          price: "12.48",
          img: require("../../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg"),
          onSale: false,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "a",
          id: "p1",
        },
        {
          title: "Product Title",
          description: "Space for a small product description",
          price: "32.48",
          img: require("../../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "b",
          id: "p2",
        },
        {
          title: "Product Title",
          description: "Space for a small product description",
          price: "6.48",
          img: require("../../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "c",
          id: "p3",
        },
        {
          title: "Product Title",
          description: "Space for a small product description",
          price: "1.48",
          img: require("../../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 1.5,
          brand: "a",
          id: "p4",
        },
        {
          title: "Product Title",
          description: "Space for a small product description",
          price: "12.48",
          img: require("../../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg"),
          onSale: true,
          discount: 30,
          type: "bakery",
          rating: 0,
          brand: "b",
          id: "p5",
        },
        {
          title: "Product Title",
          description: "Space for a small product description",
          price: "1.48",
          img: require("../../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg"),
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
    };
  },
  getters: {
    products(state) {
      return state.products;
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
      return state.basket;
    },
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload;
    },

    addToBasket(state, payload) {
      state.basket[payload.id] = { ...payload };
    },
    removeFromBasket(state, payload) {
      delete state.basket[payload];
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
    removeFromBasket(context, payload) {
      context.commit("removeFromBasket", payload);
    },
    updateCount(context, payload) {
      if (payload.value <= 0) {
        context.commit("removeFromBasket", payload.id);
      } else {
        context.commit("updateCount", { ...payload });
      }
    },
  },
};
