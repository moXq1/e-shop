<template>
  <section class="productsPage">
    <side-filter :products="products" @filt="filt"></side-filter>
    <div class="products-container">
      <product-list :categoryProducts="curProducts"></product-list>
    </div>

    <base-pagination
      :totalItems="products.length"
      :currentPage="curPage"
      :itemsPerPage="itemsPerPage"
      @chgPage="changePage"
      class="pagin"
    ></base-pagination>
  </section>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import SideFilter from "../components/SideFilter.vue";

export default {
  components: { ProductList, SideFilter },
  data() {
    return {
      curPage: 0,
      itemsPerPage: 10,
      curProducts: [],
      prod: [],
    };
  },
  methods: {
    changePage(curPage) {
      this.curPage = curPage;
      console.log(this.curPage);

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

  mounted() {
    this.prod = this.products;
    this.curProducts = this.prod.slice(
      this.curPage * this.itemsPerPage,
      this.itemsPerPage
    );
  },
  computed: {
    products() {
      if (this.id) {
        return this.$store.getters["products"].filter(
          (el) => el.type === this.id
        );
      } else {
        return this.$store.getters["products"];
      }
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

.pagin {
  grid-column: 2/3;
  place-self: center;
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
