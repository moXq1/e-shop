import store from "../store/index.js";

export default {
  mounted: (el) => {
    async function req() {
      await store.dispatch("getPosts");
    }

    function callback(entries, observer) {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          await req();
          observer.unobserve(el);
        }
      });
    }

    function createIntersectObserver() {
      const options = {
        root: null,
        threshold: 0,
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createIntersectObserver();
    }
  },
};
