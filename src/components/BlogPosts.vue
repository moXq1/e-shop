<template>
  <section v-blogs class="blog" v-if="!isLoading">
    <div class="blog__head">
      <h3 v-if="posts.length !== 0">Read our Blog posts</h3>
      <h3 v-else>No data access,just template</h3>
      <base-button to="/posts" mode="flat">Go to Blog</base-button>
    </div>
    <div class="posts" v-if="posts.length !== 0">
      <div
        class="posts__main"
        @click="goToPost"
        :data-postid="posts[0].id"
        :style="{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
            posts[0].postImg +
            ')',
        }"
      >
        <span class="posts__badge">{{ posts[0].tag[0] }}</span>
        <div class="posts__info">
          <div class="posts__header">
            {{ posts[0].title }}
          </div>
          <div class="posts__data">
            <div class="posts__img">
              <img
                width="100"
                height="100"
                :src="posts[0].authorAvatar"
                loading="lazy"
                alt="author Avatar"
              />
            </div>
            <p class="posts__details">{{ posts[0].author }}</p>
            <p class="posts__details">{{ posts[0].postedData }}</p>
          </div>
        </div>
      </div>
      <div
        class="posts__secondary"
        @click="goToPost"
        :data-postid="posts[1].id"
      >
        <div class="posts__pic">
          <img
            :src="posts[1].postImg"
            width="200"
            height="200"
            loading="lazy"
            alt="post picture"
          />
        </div>
        <div class="posts__info">
          <span class="posts__badge posts__badge--block">{{
            posts[1].tag[0]
          }}</span>
          <div class="posts__header">
            {{ posts[1].title }}
          </div>
          <div class="posts__data">
            <p class="posts__details">{{ posts[1].author }}</p>
            <p class="posts__details">{{ posts[1].postedData }}</p>
          </div>
        </div>
      </div>
      <div class="posts__other">
        <div
          class="post"
          @click="goToPost"
          v-for="p in posts.slice(2)"
          :key="p.title"
          :data-postid="p.id"
        >
          <div class="posts__info">
            <div class="posts__header">{{ p.title }}</div>
            <div class="posts__data">
              <p class="posts__details">{{ p.author }}</p>
              <p class="posts__details">{{ p.postedData }}</p>
            </div>
          </div>
          <div
            class="posts__picture"
            :style="{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
                p.postImg +
                ')',
            }"
          ></div>
        </div>
      </div>
    </div>

    <div class="posts" v-else>
      <div
        class="posts__main"
        @click="goToPost"
        :data-postid="backPosts[1].id"
        :style="{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
            backPosts[1].postImg +
            ')',
        }"
      >
        <span class="posts__badge">{{ backPosts[1].tag[0] }}</span>
        <div class="posts__info">
          <div class="posts__header">
            {{ backPosts[1].title }}
          </div>
          <div class="posts__data">
            <div class="posts__img">
              <img
                width="100"
                height="100"
                :src="backPosts[0].authorAvatar"
                loading="lazy"
                alt="author Avatar"
              />
            </div>
            <p class="posts__details">{{ backPosts[1].author }}</p>
            <p class="posts__details">{{ backPosts[1].postedData }}</p>
          </div>
        </div>
      </div>
      <div
        class="posts__secondary"
        @click="goToPost"
        :data-postid="backPosts[0].id"
      >
        <div class="posts__pic">
          <img
            width="200"
            height="200"
            :src="backPosts[0].postImg"
            loading="lazy"
            alt="post picture"
          />
        </div>
        <div class="posts__info">
          <span class="posts__badge posts__badge--block">{{
            backPosts[0].tag[0]
          }}</span>
          <div class="posts__header">
            {{ backPosts[0].title }}
          </div>
          <div class="posts__data">
            <p class="posts__details">{{ backPosts[0].author }}</p>
            <p class="posts__details">{{ backPosts[0].postedData }}</p>
          </div>
        </div>
      </div>
      <div class="posts__other">
        <div
          class="post"
          @click="goToPost"
          v-for="p in backPosts.slice(2)"
          :key="p.title"
          :data-postid="p.id"
        >
          <div class="posts__info">
            <div class="posts__header">{{ p.title }}</div>
            <div class="posts__data">
              <p class="posts__details">{{ p.author }}</p>
              <p class="posts__details">{{ p.postedData }}</p>
            </div>
          </div>
          <div
            class="posts__picture"
            :style="{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
                p.postImg +
                ')',
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
  <the-loader v-if="isLoading"></the-loader>
</template>

<script>
import im1 from "../assets/avatar-nikita.jpg";
import p1 from "../assets/brooke-lark-1Rm9GLHV0UA-unsplash.jpg";
import p2 from "../assets/brooke-lark-jUPOXXRNdcA-unsplash.jpg";
import p3 from "../assets/brooke-lark-M4E7X3z80PQ-unsplash.jpg";
import p4 from "../assets/dan-gold-4_jhDO54BYg-unsplash.jpg";
import p5 from "../assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg";

import blogs from "../directives/blogs.js";
export default {
  directives: { blogs },
  data() {
    return {
      backPosts: [
        {
          title:
            "Our chef tips for a great and tasty dinner realy in 20 minutes",
          author: "Author",
          authorAvatar: im1,
          postedData: "17.6.2020",
          tag: "Dinner tips",
          postImg: p5,
        },
        {
          title:
            "Which vegetable your family will love and want's eat each day",
          author: "Author",
          authorAvatar: im1,
          postedData: "15.6.2020",
          tag: "Vegetable",
          postImg: p2,
        },
        {
          title: "Salat is kinda good start to your morning routines",
          author: "Author",
          authorAvatar: im1,
          postedData: "14.6.2020",
          tag: "Vegetable",
          postImg: p4,
        },
        {
          title: "Our chef tips for a great and healthy breakfast",
          author: "Author",
          authorAvatar: im1,
          postedData: "14.6.2020",
          tag: "Vegetable",
          postImg: p1,
        },
        {
          title: "Prepare a simple and delicious breads",
          author: "Author",
          authorAvatar: im1,
          postedData: "14.6.2020",
          tag: "Vegetable",
          postImg: p3,
        },
      ],
      isLoading: false,
    };
  },
  async created() {
    console.log(this.posts);
    // this.isLoading = true;
    // await this.$store.dispatch("getPosts");
    // this.isLoading = false;
  },
  computed: {
    posts() {
      return this.$store.getters["mainPagePosts"];
    },
  },

  methods: {
    goToPost(e) {
      let t = e.target.closest("[data-postid]");
      const id = t.dataset.postid;
      this.$router.push(`/posts/${id}`);
    },
  },
};
</script>

<style lang="scss">
.blog {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 3rem;
  align-items: space-between;
  justify-content: center;
  color: #151515;
  max-width: 94rem;

  &__head {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-bottom: 2rem;
  }

  .post {
    display: grid;
    grid-template-columns: 1fr min-content;
    gap: 1rem;
    align-items: center;

    & .posts__header {
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
    }
  }

  .posts {
    display: grid;
    grid-template-columns: 1.5fr 0.8fr 1fr;
    grid-template-rows: 28rem;
    gap: 2rem;

    &__secondary {
      display: flex;
      flex-direction: column;

      & .posts__pic {
        max-height: 400px;
        cursor: pointer;
      }
    }

    &__other {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 32rem;
      justify-self: center;

      & .post {
        padding: 0;
        padding-right: 3rem;
      }
    }

    &__picture {
      background-size: cover;
      overflow: hidden;
      border-radius: 12px;
      background-repeat: no-repeat;
      background-position: center;
      width: clamp(98px, 10vw, 8rem);
      height: clamp(98px, 10vw, 8rem);
      justify-self: end;
      transition: filter 0.5s;
      cursor: pointer;

      &:hover {
        filter: brightness(50%);
      }
    }

    &__pic {
      overflow: hidden;
      border-radius: 12px;
      width: 100%;
      height: auto;
      transition: filter 0.5s;

      &:hover {
        filter: brightness(50%);
      }

      & img {
        //height: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        vertical-align: bottom;
      }
    }

    &__badge {
      background: #f4f8ec;
      border-radius: 12px;
      color: #6a983c;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      padding: 0.2rem 1rem;
      z-index: 2;

      &--block {
        margin: 1rem 0 -0.6rem 0;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      z-index: 2;
    }

    &__data {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }

    &__details {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: normal;
      font-size: 0.8rem;
      line-height: 16px;
    }

    &__header {
      font-weight: 600;
      font-size: clamp(0.8rem, calc(0.6132rem + 0.934vw), 1.4rem);
      cursor: pointer;

      line-height: clamp(1.6rem, calc(0.6132rem + 0.934vw), 33px);
      text-align: start;
      transition: color 0.5s;

      &:hover {
        color: #6a983c;
      }
    }

    &__img {
      width: 4rem;
      height: 4rem;

      overflow: hidden;
      border-radius: 50%;
      background: white;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__main {
      background-size: cover;
      overflow: hidden;
      border-radius: 12px;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      padding: 1rem;

      &:hover:after {
        opacity: 0.4;
      }

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0;

        transition: opacity 0.5s;
      }

      // &:hover .posts__badge {
      //   z-index: 2;
      //   filter: brightness(150%);
      // }

      // &:hover {
      //   filter: brightness(50%);
      // }
    }
  }

  h3 {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 27px;
    font-size: clamp(1.2rem, calc(1.1471rem + 0.2824vw), 1.5rem);
  }

  @media (max-width: 900px) {
    .posts {
      grid-template-columns: 1.5fr 1fr;
      grid-template-rows: 28rem min-content;

      &__secondary {
        max-width: 100%;
        grid-row: 2/3;
        grid-column: 1 / -1;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }

  @media (max-width: 570px) {
    .blog__head {
      flex-direction: column;
      align-items: flex-start;

      & h3 {
        //font-size: clamp(0.8rem, calc(0.6132rem + 0.934vw), 1.4rem);
        line-height: clamp(1.6rem, calc(0.6132rem + 0.934vw), 33px);
        padding-left: 16px;
      }
    }

    .posts {
      grid-template-columns: 1fr;
    }
  }
}
</style>
