<template>
  <div class="conten">
    <category-list
      :links="links"
      :allLinks="allLinks"
      title="Category 
    menu"
      btnTitle="More categories"
      :listDisplay="true"
    ></category-list>

    <banner-carousel></banner-carousel>
  </div>
  <div class="conten">
    <category-list
      :links="links"
      :allLinks="allLinks"
      title="Best selling products"
      btnTitle="More products"
    ></category-list>
    <product-list></product-list>
  </div>

  <reviews-carousel></reviews-carousel>
  <blog-posts></blog-posts>
</template>

<script>
import ReviewsCarousel from "../components/ReviewsCarousel.vue";
import BannerCarousel from "../components/BannerCarousel.vue";
import BlogPosts from "../components/BlogPosts.vue";
import ProductList from "../components/ProductList.vue";

import CategoryList from "../components/CategoryList.vue";
export default {
  components: {
    ReviewsCarousel,
    BannerCarousel,
    BlogPosts,

    ProductList,
    CategoryList,
  },
  data() {
    return {
      allLinks: [
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
        { name: "Bakery", to: `/products/` },
      ],
    };
  },

  created() {
    this.allLinks.forEach((el) => {
      el.to = `${el.to}${el.name.toLowerCase()}`;
    });
  },

  computed: {
    links() {
      return this.allLinks.slice(0, 5);
    },
  },
};
</script>

<style lang="scss" scoped>
.conten {
  display: grid;
  grid-template-columns: clamp(15rem, 30vw, 20rem) minmax(10px, 1fr);
  gap: 2rem;
  padding: 1.5rem 3rem;
  max-width: 94rem;
  width: 100vw;
  place-items: center;
}
.fullList {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;

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

@media (min-width: 651px) {
  h3 {
    display: none;
  }
}

@media (max-width: 650px) {
  .conten {
    grid-template-columns: minmax(10px, 1fr);
  }
  h3 {
    display: block;
    place-self: start;
  }
}

@media (max-width: 380px) {
  .conten {
    padding: 0 0.5rem;
    margin-bottom: 2rem;
  }
}
</style>
