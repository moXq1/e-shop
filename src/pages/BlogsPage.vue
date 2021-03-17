<template>
  <section class="blogs" v-if="!isLoading">
    <div class="blogs__head">
      <h1 class="blogs__header" v-if="posts.length === 0">No access</h1>
      <h1 class="blogs__header" v-else>Posts</h1>

      <base-button to="/new">Create Post</base-button>
    </div>

    <div v-if="posts.length !== 0" class="blogs__list">
      <div
        class="blogs__blog"
        v-for="post in displayPosts"
        :key="post.id"
        @click="readBlog"
        :data-id="post.id"
        :style="{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
            post.postImg +
            ')',
        }"
      >
        <p class="blogs__data">{{ post.postedData }}</p>
        <h2 class="blogs__title">{{ post.title }}</h2>
      </div>
    </div>

    <base-pagination
      :totalItems="posts.length"
      :currentPage="curPage"
      :itemsPerPage="blogsPerPage"
      @chgPage="changePage"
      class="pagin"
    ></base-pagination>
  </section>
  <the-loader v-else></the-loader>
</template>

<script>
export default {
  async created() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    if (this.posts.length === 0) {
      await this.$store.dispatch("getPosts");
      this.displayPosts = this.posts.slice(
        this.curPage * this.blogsPerPage,
        (this.curPage + 1) * this.blogsPerPage
      );
    } else {
      this.displayPosts = this.posts.slice(
        this.curPage * this.blogsPerPage,
        (this.curPage + 1) * this.blogsPerPage
      );
    }

    this.isLoading = false;
  },

  data() {
    return {
      blogsPerPage: 10,
      curPage: 0,
      displayPosts: [],
      isLoading: false,
    };
  },
  computed: {
    posts() {
      return this.$store.getters["posts"];
    },
  },
  methods: {
    readBlog(e) {
      let id = e.target.closest(".blogs__blog").dataset.id;
      this.$router.push(`/posts/${id}`);
    },
    changePage(curPage) {
      this.curPage = curPage;

      this.displayPosts = this.posts.slice(
        this.curPage * this.blogsPerPage,
        this.blogsPerPage * (this.curPage + 1)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.blogs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__header {
    align-self: flex-start;
    font-size: clamp(2rem, 8vw, 7rem);
  }

  &__blog {
    position: relative;
    height: 20rem;
    background-size: cover;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-left: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
  }

  &__data {
    color: white;
    margin-top: 0.5rem;
    font-size: 80%;
    user-select: none;
  }

  &__title {
    color: white;
    width: 85%;

    font-weight: 600;
    font-size: clamp(0.8rem, calc(0.6132rem + 0.934vw), 1.4rem);
    cursor: pointer;
    line-height: clamp(1.6rem, calc(0.6132rem + 0.934vw), 33px);
    text-align: start;
    transition: all 0.5s ease;

    &:hover {
      color: green;
    }
  }

  &__list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, clamp(22rem, 25vw, 30rem));
  }

  &__img {
    width: 400px;
    height: 300px;

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: 1100px) {
  .blogs {
    &__list {
      grid-template-columns: repeat(2, clamp(22rem, 25vw, 30rem));
    }
  }
}
@media (max-width: 735px) {
  .blogs {
    &__list {
      grid-template-columns: clamp(300px, 75vw, 40rem);
    }

    &__blog {
      width: 100%;
      background-position: center;
    }
  }
}
</style>
