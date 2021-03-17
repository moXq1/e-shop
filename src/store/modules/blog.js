export default {
  namespace: true,
  state() {
    return {
      post: {},
      posts: [],
    };
  },
  getters: {
    post(state) {
      return state.post;
    },
    posts(state) {
      return state.posts;
    },
    mainPagePosts(state) {
      return state.posts.slice(0, 5);
    },
  },
  mutations: {
    setPost(state, payload) {
      state.post = payload;
    },
    getPosts(state, payload) {
      state.posts = [];
      for (let key of Object.keys(payload)) {
        payload[key].id = key;
        state.posts.push(payload[key]);
      }
    },
  },
  actions: {
    setPost(context, payload) {
      context.commit("setPost", payload);
    },

    async addPost(context, payload) {
      let url = context.rootGetters.dbUrl;

      try {
        const res = await fetch(
          `${url}/posts.json?auth=${context.rootGetters.token}`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) {
          throw new Error("failed to send data");
        }
      } catch (e) {
        throw new Error(e.message);
      }
      context.commit("setPost", payload);
    },

    async getPosts(context) {
      let url = context.rootGetters.dbUrl;

      try {
        const res = await fetch(`${url}/posts.json`);
        if (!res.ok) {
          throw new Error("Failed to load data");
        }
        const respData = await res.json();
        context.commit("getPosts", respData);
        //console.log(respData);
      } catch (e) {
        console.log(e);
      }
    },

    async updatePostData(context, payload) {
      let url = context.rootGetters.dbUrl;
      if (!context.state.posts.length) {
        await context.dispatch("getPosts");
      }

      const filteredPosts = context.state.posts.filter(
        (el) => el.userId === context.rootGetters.userId
      );

      for (let el of filteredPosts) {
        for (let item of Object.keys(payload)) {
          el[item] = payload[item];
        }

        await fetch(
          `${url}/posts/${el.id}.json?auth=${context.rootGetters.token}`,
          {
            method: "PUT",
            body: JSON.stringify(el),
          }
        );
      }
    },
  },
};
