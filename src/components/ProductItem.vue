<template>
  <li>
    <div class="product" :data-id="id">
      <div class="product__image">
        <span v-if="onSale" class="product__percentage">- {{ discount }}%</span>
        <div class="product__placeholder">
          <div class="product__activity"></div>
        </div>
        <img v-if="img" :src="img" alt="photo of product" @load="loadImg" />
      </div>
      <div class="product__info">
        <h3 class="product__title">{{ title }}</h3>
        <p class="product__description">{{ description }}</p>
        <div class="product__buy">
          <div class="product__prices">
            <span
              class="product__price"
              :class="{ 'product__price--sale': onSale }"
              >{{ price }} USD</span
            >
            <span v-if="onSale" class="product__discount"
              >{{ discountPrice }} USD</span
            >
          </div>

          <base-button @click="addItem" mode="secondary" :isBtn="true"
            >Buy now</base-button
          >
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["title", "description", "price", "img", "discount", "onSale", "id"],
  computed: {
    discountPrice() {
      return (this.price * (this.discount / 100)).toFixed(2);
    },
  },
  methods: {
    loadImg(e) {
      const t = e.target.closest(".product__image");
      t.querySelector(".product__placeholder").remove();
    },
    addItem(e) {
      let t = e.target.closest(".product").dataset.id;

      let data = this.$store.getters["products"].find((el) => el.id === t);

      this.$store.dispatch("addToBasket", { ...data });
    },
  },
};
</script>

<style lang="scss">
.product {
  padding: 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.7rem;
  height: 20rem;
  &__image {
    width: 14rem;
    height: 10rem;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    align-self: center;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.5);
    }
  }

  &__title {
    font-weight: 700;
    font-size: clamp(1rem, calc(0.8902rem + 0.4878vw), 1.5rem);
    line-height: 22px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    max-width: 13rem;

    color: #151515;
  }

  &__percentage {
    position: absolute;
    left: 12px;
    top: 12px;
    padding: 0px 8px;
    background: #f4f8ec;
    border-radius: 12px;
    font-weight: 600;
    font-size: clamp(0.7rem, calc(0.6341rem + 0.2927vw), 1rem);
    line-height: 18px;
    color: #6a983c;
    z-index: 2;
  }

  &__placeholder {
    background-color: #d1d1d1;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

  &__activity {
    height: 100%;
    position: absolute;
    left: -45%;
    width: 45%;
    background-image: linear-gradient(
      to left,
      rgba(251, 251, 251, 0.05),
      rgba(251, 251, 251, 0.3),
      rgba(251, 251, 251, 0.6),
      rgba(251, 251, 251, 0.3),
      rgba(251, 251, 251, 0.05)
    );
    z-index: 40;
    animation: blik 1s ease infinite;
  }

  @keyframes blik {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(300%);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  &__description {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: clamp(0.7rem, calc(0.6341rem + 0.2927vw), 1rem);
    line-height: 16px;
    color: #575757;
  }

  &__buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 0.7rem;
  }

  &__prices {
    display: flex;
    align-items: flex-start;
    flex-direction: column-reverse;
  }

  &__price,
  &__discount {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;

    color: #151515;

    &--sale {
      text-decoration: line-through;
      transform: scale(0.8);
      opacity: 0.8;
    }
  }
}
</style>
