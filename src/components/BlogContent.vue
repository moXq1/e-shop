<template>
  <article class="post" v-if="post && !isLoading">
    <div class="post__img">
      <img width="200" height="200" :src="post.postImg" alt="Post image" />
    </div>

    <h3 class="post__title">{{ post.title }}</h3>
    <div class="post__subinfo">
      <span>Date: {{ post.postedData }}</span>
      <span>Author: {{ post.author }}</span>
    </div>

    <div class="post__side">
      Tags
      <div class="post__tags">
        <span class="post__tag" v-for="tag in post.tag" :key="tag">{{
          tag
        }}</span>
      </div>
      <base-button mode="flat" to="/posts">Back To Blog</base-button>
    </div>
    <div class="post__content" v-html="markdown"></div>
  </article>
  <p v-if="!post && !isLoading">Cannot load Post</p>
  <the-loader v-if="isLoading"></the-loader>
</template>

<script>
let marked = require("marked");
export default {
  async created() {
    this.isLoading = true;
    if (!this.post) {
      const resp = await fetch(
        `${this.$store.getters["dbUrl"]}/posts/${this.id}.json`
      );
      const respData = await resp.json();
      this.$store.dispatch("setPost", respData);
      this.isLoading = false;
    }
  },
  props: ["id"],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    post() {
      return this.$store.getters["post"];
    },

    tag() {
      if (typeof this.post.tag === "string") {
        return this.post.tag.split(",");
      }
      return this.post.tag;
    },
    markdown() {
      return marked(this.post.text, {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,

        smartLists: true,
        smartypants: false,
      });
    },
  },
};
</script>

<style lang="scss">
.post {
  display: grid;
  grid-template-columns: clamp(10rem, 30vw, 20rem) 1fr;
  max-width: 80rem;
  width: 100%;
  padding: 0 3rem;
  gap: 1rem;
  grid-row-gap: 3rem;

  &__content {
    max-width: 35rem;
    color: #151515;
    & p {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;
      line-height: 1.4rem;
      text-align: left;
      margin-bottom: 2rem;
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
      text-align: left;
      padding: 1rem 0;
    }
  }

  &__side {
    display: flex;
    flex-direction: column;
    justify-self: end;
    font-size: 1.1rem;
    line-height: 1.6;
    font-weight: bold;
    text-align: left;

    color: #151515;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
    max-width: 10rem;
  }

  &__tag {
    background: #f4f8ec;
    border-radius: 12px;
    color: #6a983c;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 1.1rem;
    padding: 0.2rem 1rem;
    margin: 0.5rem;
    margin-left: 0;
  }

  &__subinfo {
    grid-row: 1;
    grid-column: 1/2;
    z-index: 2;
    align-self: end;
    justify-self: end;
    text-align: left;
    padding-bottom: 2rem;
    color: rgb(214, 214, 214);
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    line-height: 1.1rem;
    gap: 1rem;
  }

  &__title {
    grid-row: 1;
    grid-column: 2/3;
    z-index: 2;
    color: white;
    align-self: end;
    justify-self: start;
    padding-bottom: 2rem;
    font-weight: 600;
    font-size: 2rem;
    line-height: 140%;
    max-width: 39rem;
    text-align: left;
  }

  &__img {
    grid-column: 1/-1;
    grid-row: 1;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;

      filter: brightness(0.5);
    }
  }
}
</style>
