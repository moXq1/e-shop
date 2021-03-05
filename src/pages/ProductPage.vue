<template>
  <section class="productsPage">
    <side-filter :products="products" @filt="filt"></side-filter>
    <div class="products-container">
      <product-list :categoryProducts="curProducts"></product-list>
    </div>
    <div class="pages">
      <span
        @click="changePage"
        v-for="(n, index) in pages"
        :key="n"
        :data-page="index"
        :class="{ 'active-page': index === 0 }"
        >{{ n }}</span
      >
    </div>
  </section>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import SideFilter from "../components/SideFilter.vue";
export default {
  components: { ProductList, SideFilter },
  data() {
    return {
      pages: 0,
      curPage: 0,
      itemsPerPage: 4,
      curProducts: [],
      prod: [],
    };
  },
  methods: {
    changePage(e) {
      this.curPage = +e.target.dataset.page;
      let pages = e.target.closest(".pages");
      pages.querySelector(".active-page").classList.remove("active-page");
      pages
        .querySelector(`span[data-page="${this.curPage}"]`)
        .classList.add("active-page");
      this.curProducts = this.prod.slice(
        this.curPage * this.itemsPerPage,
        this.itemsPerPage * (this.curPage + 1)
      );
    },
    filt(data) {
      this.curPage = 0;
      this.prod = data;
      this.curProducts = this.prod.slice(
        this.curPage * this.itemsPerPage,
        this.itemsPerPage * (this.curPage + 1)
      );
    },
  },
  created() {
    this.pages = Math.ceil(this.products.length / this.itemsPerPage);
  },
  mounted() {
    this.prod = this.products;
    this.curProducts = this.prod.slice(
      this.curPage * this.itemsPerPage,
      this.itemsPerPage
    );
  },
  computed: {
    products() {
      return this.$store.getters["products"].filter(
        (el) => (el.type = this.id)
      );
    },
  },
  props: ["id"],
};
</script>

<style lang="scss">
.productsPage {
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: clamp(13rem, 20vw, 20rem) minmax(10px, max-content);
  place-content: center;
}

.products-container {
  justify-self: center;
}

.active-page {
  color: tomato;
}
.pages {
  display: flex;
  gap: 2rem;
  margin-left: 3rem;
  margin-top: 2rem;
  color: #6a983c;
  place-self: center;

  & span {
    cursor: pointer;
    user-select: none;
    transition: all 0.5s ease;
    &:hover {
      color: tomato;
    }
  }
}

@media (max-width: 1600px) {
  .productsPage {
    grid-template-columns: clamp(13rem, 20vw, 20rem) minmax(10px, 1fr);
  }
}

@media (max-width: 1110px) {
  .productsPage {
    grid-template-columns: minmax(10px, 1fr);
  }
}

@media (max-width: 799px) {
  .productsPage {
    padding-top: 2rem;
  }
}
</style>
