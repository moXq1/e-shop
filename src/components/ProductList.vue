<template>
  <ul class="products" :class="{ 'products--category': categoryProducts }">
    <product-item
      v-for="product in products"
      :key="product.id"
      v-bind="product"
    ></product-item>
  </ul>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
  components: {
    ProductItem,
  },

  props: ["categoryProducts"],

  computed: {
    products() {
      return this.categoryProducts
        ? this.categoryProducts
        : this.$store.getters["productsMainPage"];
    },
  },
};
</script>

<style lang="scss">
.products {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 2rem;
  padding-left: 4rem;

  &--category {
    display: grid;
    padding: 0;
    grid-template-columns: repeat(3, max-content);
  }
}

@media (min-width: 1500px) {
  .products--category {
    grid-template-columns: repeat(4, max-content);
  }
}

@media (min-width: 2000px) {
  .products--category {
    grid-template-columns: repeat(5, max-content);
  }
}

// @media (max-width: 1600px) {
//   .products--category {
//     grid-template-columns: repeat(3, max-content);
//   }
// }

@media (max-width: 900px) {
  .products--category {
    grid-template-columns: repeat(2, max-content);
  }
}

@media (max-width: 550px) {
  .products--category {
    grid-template-columns: repeat(1, max-content);
  }
}

@media (max-width: 650px) {
  .products {
    flex-wrap: wrap;
    width: 100%;

    justify-content: center;
  }
}
</style>
