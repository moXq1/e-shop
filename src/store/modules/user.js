export default {
  namespace: true,
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    loadUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  actions: {
    async updateUser(context, payload) {
      const resp = await fetch(
        `https://vue-http-demo-3c75b-default-rtdb.firebaseio.com/users/${payload.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(payload.user),
        }
      );

      if (!resp.ok) {
        throw new Error("failed to update data");
      }
      //const respData = await resp.json();
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(payload.user));
      context.commit("loadUser", payload.user);
    },
    async loadUser(context, payload) {
      const savedUser = localStorage.getItem("user");

      let data;

      if (!savedUser) {
        const resp = await fetch(
          `https://vue-http-demo-3c75b-default-rtdb.firebaseio.com/users/${payload}.json`
        );

        data = await resp.json();
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        data = JSON.parse(savedUser);
      }

      context.commit("loadUser", data);
    },
  },
};
