<template>
  <div class="category" :class="{ 'category--hide': listDisplay }">
    <h3>{{ title }}</h3>
    <ul class="category__list">
      <li v-for="link in links" :key="link.name">
        <router-link class="category__link" :to="link.to">
          {{ link.name }}
        </router-link>
      </li>
    </ul>
    <base-button @click="show = true" :isBtn="true">{{ btnTitle }}</base-button>
  </div>

  <base-modal :show="show" @close="close">
    <template v-slot:title>
      Categories
    </template>
    <template v-slot:content>
      <ul class="fullList">
        <li class="fullList__link" v-for="l in allLinks" :key="l.name">
          <router-link :to="l.to">{{ l.name }}</router-link>
          <span class="fullList__underline"></span>
        </li>
      </ul>
    </template>
  </base-modal>
</template>

<script>
export default {
  props: ["links", "allLinks", "title", "btnTitle", "listDisplay"],
  data() {
    return {
      show: false,
    };
  },

  mounted() {
    window.addEventListener("resize", this.itemCount);
    this.itemCount();
  },
  unmounted() {
    window.addEventListener("resize", this.itemCount);
  },
  methods: {
    itemCount() {
      let c = window.innerWidth;

      if (c <= 650) {
        this.$store.commit("setItems", 4);
      } else if (c < 900) {
        this.$store.commit("setItems", 1);
      } else if (c < 1270) {
        this.$store.commit("setItems", 2);
      }
    },
    close() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss">
h3 {
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #151515;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  gap: 1rem;
  place-self: self-start;

  &__list {
    list-style: none;
  }

  &__link {
    color: #6a983c;
    font-size: 14px;
    line-height: 19px;

    text-decoration-line: underline;
    transition: all 0.5s ease;

    &:hover {
      color: #c8deb3;
    }
  }

  &__img {
    width: 16px;
    height: 16px;

    & img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}

.fullList {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;

  &__link {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &:hover {
      & a {
        color: #46760a;
      }
    }

    & a {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 4px;
      text-decoration: none;
      background: transparent;
      color: #151515;
      cursor: pointer;
      font-size: 15px;
      line-height: 22px;
      font-weight: bold;
      position: relative;

      outline: #6a983c;
    }
  }

  &__link:hover &__underline {
    width: 100%;
    display: block;
  }
  &__underline {
    width: 0;
    display: block;
    height: 2px;
    background-color: #46760a;
    transition: width 0.5s cubic-bezier(0.35, -0.42, 0, 1.49);
  }
}

@media (max-width: 650px) {
  .category {
    &--hide {
      display: none;
    }
    place-self: start;
    &__list {
      display: none;
    }
  }
}
</style>
