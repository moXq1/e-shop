<template>
  <section class="prod">
    <div class="prod__img">
      <img width="200" height='200' :src="prod.img" alt="product img" />
    </div>
    <div class="prod__info">
      <base-button class="prod__b" mode="flat" to="/products"
        >Back to Product List</base-button
      >
      <div class="prod__desc">
        <h1 class="prod__title">{{ prod.title }}</h1>
        <p class="prod__txt">{{ prod.bigDescription }}</p>
        <p class="prod__price">
          USD
          <strong
            >${{
              prod.onSale
                ? (prod.price * (prod.discount / 100)).toFixed(2)
                : prod.price
            }}</strong
          >
        </p>
      </div>

      <div class="prod__toBasket">
        <label class="prod__label">
          Qty.
          <input min="1" type="number" name="qty" v-model="num" />
        </label>
        <base-button @click="addToBasket" :isBtn="true" mode="secondary">
          Add to cart</base-button
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      num: 1,
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    "$route.params.id": function(id) {
      this.load(id);
    },
  },
  computed: {
    prod() {
      return this.$store.getters["curProduct"];
    },
  },
  methods: {
    addToBasket() {
      this.$store.dispatch("addToBasketPr", { ...this.prod, count: +this.num });
    },
    load(id) {
      if (id) {
        this.$store.dispatch("setCurProduct", id);
      } else {
        this.$store.dispatch("setCurProduct", this.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.prod {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0 3rem;
  align-items: center;
  color: #303030;

  &__price {
    font-size: 1rem;
    font-weight: 700;
    color: #27262699;
    letter-spacing: 0.02em;
    & strong {
      font-size: 1.55rem;

      letter-spacing: 0.02em;
      color: #303030;
      margin-left: 7px;
    }
  }

  &__label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & input {
      border: none;
      font-size: 1rem;
      padding: 0.5rem;
      border: 2px solid #46760a;
      margin-bottom: 0.5rem;
    }
  }

  &__toBasket {
    display: flex;
    flex-direction: column;
  }

  &__info {
    max-width: 480px;

    min-height: 490px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 3rem;
    color: #303030;
    font-weight: 500;
    line-height: 3rem;
  }

  &__txt {
    font-size: 1rem;
    margin: 1rem 0;
  }

  &__desc {
    padding: 40px 16px 0px;
    display: flex;
    flex-direction: column;
  }
  &__b {
    align-self: flex-start;
  }

  &__img {
    max-width: 500px;
    width: 500px;
    height: 500px;
    margin-right: 3rem;

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: 1000px) {
  .prod {
    flex-direction: column;
    padding: 0;

    &__img {
      margin: 0;
      margin-bottom: 3rem;
    }
  }
}

@media (max-width: 500px) {
  .prod {
    &__img {
      height: 300px;
      width: 300px;
    }
    &__title {
      font-size: 2rem;
    }
  }
}

@media (max-width: 320px) {
  .prod {
    &__img {
      height: 200px;
      width: 200px;
    }
    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>
