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
      let url = context.rootGetters.dbUrl;
      const resp = await fetch(`${url}/users/${payload.id}.json`, {
        method: "PUT",
        body: JSON.stringify(payload.user),
      });

      if (!resp.ok) {
        throw new Error("failed to update data");
      }
      //const respData = await resp.json();
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(payload.user));

      context.commit("loadUser", payload.user);
      await context.dispatch("updatePostData", {
        author: payload.user.name,
        authorAvatar: payload.user.img,
      });
    },
    async loadUser(context, payload) {
      const savedUser = localStorage.getItem("user");

      let url = context.rootGetters.dbUrl;

      let data;

      if (!savedUser) {
        const resp = await fetch(`${url}/users/${payload}.json`);

        data = await resp.json();
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        data = JSON.parse(savedUser);
      }

      context.commit("loadUser", data);
    },
  },
};
