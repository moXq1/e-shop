<template>
  <base-button :isBtn="true" class="filterMenu" @click="showFilters = true"
    >Filters</base-button
  >
  <div v-if="showFilters" class="mbackdrop" @click="showFilters = false"></div>

  <aside class="filter" :class="{ filterMove: showFilters }">
    <div class="filter__wrapper">
      <div class="filter__brands">
        <h3>Brands</h3>
        <label v-for="brand in brands" :key="brand" class="checkbox-label">
          <input
            type="checkbox"
            :value="brand"
            v-model="checkedBrands"
            name="check"
          />{{ brand }}
        </label>
      </div>
      <div class="filter__rating">
        <h3>Rating</h3>

        <label
          class="filter__label checkbox-label"
          v-for="(n, i) in 5"
          :key="n"
        >
          <input
            type="checkbox"
            :value="5 - i"
            v-model="checkedRatings"
            name="check"
          />
          <div class="stars">
            <span class="filter__img" v-for="m in 5 - i" :key="m"
              ><img src="../assets/star.svg" alt="filled Star"
            /></span>
            <span class="filter__img filter__img--grey" v-for="m in i" :key="m"
              ><img src="../assets/star-outline.svg" alt="outline Star"
            /></span>
          </div>
        </label>
      </div>
      <div class="filter__price">
        <h3>Price</h3>
        <div class="price-range">
          <div class="range-slider">
            <input
              type="range"
              :max="maxPrice"
              :min="minPrice"
              v-model="min"
              class="range-left"
              @input="minMove"
            />
            <input
              type="range"
              :max="maxPrice"
              :min="minPrice"
              v-model="max"
              class="range-right"
              @input="maxMove"
            />

            <div class="slider">
              <div class="track"></div>
              <div class="range"></div>
              <div class="thumb thumb-left"></div>
              <div class="thumb thumb-right"></div>
            </div>
          </div>
        </div>
        <div class="range-of-prices">
          <label>
            Min
            <input
              type="number"
              :value="min"
              :max="maxPrice"
              :min="minPrice"
              @input="minMove($event, parseFloat(min))"
            />
          </label>
          <label>
            Max
            <input
              type="number"
              :value="max"
              :max="maxPrice"
              :min="minPrice"
              @input="maxMove($event, parseFloat(max))"
            />
          </label>
        </div>
        <base-button mode="secondary" @click="checkedPrice = true" :isBtn="true"
          >Apply</base-button
        >
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      brands: [],
      checkedBrands: [],
      checkedRatings: [],
      checkedPrice: false,
      product: [],
      showFilters: false,
      minPrice: 0,
      maxPrice: 100,
      min: 0,
      max: 100,
    };
  },

  props: ["products"],
  emits: ["filt"],
  created() {
    this.brands = [...new Set(this.products.map((el) => el.brand))];
    this.product = this.products;
    const arr = this.products.map((el) => {
      if (el.onSale) {
        return parseFloat(el.price) * (el.discount / 100);
      } else {
        return parseFloat(el.price);
      }
    });
    this.minPrice = Math.floor(Math.min(...arr));
    this.maxPrice = Math.ceil(Math.max(...arr));
    this.min = this.minPrice;
    this.max = this.maxPrice;
  },

  methods: {
    filter() {
      this.product = this.products;
      if (this.checkedBrands.length !== 0) {
        this.filterByBrands();
      }
      if (this.checkedRatings.length !== 0) {
        this.filterByRating();
      }
      if (this.checkedPrice !== false) {
        this.filterByPrice();
      }
      this.$emit("filt", this.product);
    },
    filterByBrands() {
      //   if (this.checkedBrands.length === 0) {
      //     this.$emit("brandsFilt", this.products);
      //   }
      this.product = this.product.filter((el) =>
        this.checkedBrands.includes(el.brand)
      );
    },
    filterByRating() {
      this.product = this.product.filter((el) =>
        this.checkedRatings.includes(Math.floor(el.rating))
      );
    },
    filterByPrice() {
      this.product = this.product.filter((el) => {
        if (el.onSale) {
          return (
            this.min <= parseFloat(el.price) * (el.discount / 100) &&
            this.max >= parseFloat(el.price) * (el.discount / 100)
          );
        } else {
          return (
            this.min <= parseFloat(el.price) && this.max >= parseFloat(el.price)
          );
        }
      });
    },

    minMove(e, min = null) {
      const leftThumb = document.querySelector(".thumb-left");

      const rightInput = document.querySelector(".range-right");
      let t = e.target;
      if (min) {
        // t = document.querySelector(".range-left");

        this.min = e.target.value;
        min = e.target.value;
      }

      let value = min ?? t.value;

      const range = document.querySelector(".range");

      value = Math.min(parseInt(value), parseInt(rightInput.value) - 1);

      const percent = ((+value - +t.min) * 100) / (+t.max - +t.min);

      leftThumb.style.left = percent + "%";
      range.style.left = percent + "%";
    },

    maxMove(e, max) {
      const leftInput = document.querySelector(".range-left");

      const rightThumb = document.querySelector(".thumb-right");

      const range = document.querySelector(".range");
      const t = e.target;

      if (max) {
        //  t = document.querySelector(".range-right");

        this.max = e.target.value;
        max = e.target.value;
      }

      let value = max ?? t.value;
      value = Math.max(parseInt(value), parseInt(leftInput.value) + 1);

      // const percent = ((+t.value - +t.min) * 100) / (+t.max - +t.min);

      rightThumb.style.right = ((+t.max - value) * 100) / +t.max + "%";
      range.style.right = ((+t.max - value) * 100) / +t.max + "%";
    },
  },

  watch: {
    checkedBrands() {
      this.filter();
    },
    checkedRatings() {
      this.filter();
    },
    checkedPrice() {
      if (this.checkedPrice) {
        this.filter();
        this.checkedPrice = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  padding: 2rem 0;
  padding-left: 2rem;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  &__price {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    align-items: flex-start;
  }

  &__brands {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
    overflow-y: auto;
    max-height: 20rem;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;

    & label {
    }
  }

  &__rating {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__img {
    width: 1rem;
    height: 1rem;
    display: block;

    & img {
      width: 100%;
      height: auto;
      object-fit: cover;
      filter: invert(85%) sepia(29%) saturate(4147%) hue-rotate(343deg)
        brightness(103%) contrast(105%);
    }

    &--grey {
      & img {
        filter: invert(100%) sepia(1%) saturate(1962%) hue-rotate(299deg)
          brightness(83%) contrast(99%);
      }
    }
  }
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding-top: 0.5rem;
}

.filterMenu {
  display: none;
}

@media (max-width: 1110px) {
  .filterMenu {
    display: block;
    width: max-content;
    margin-left: 3rem;
  }
  .filter {
    position: fixed;
    z-index: 21;
    top: 0;
    left: 0;
    padding-right: 3rem;
    height: 100vh;
    background-color: #fff;
    width: max-content;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.3s ease-out;
  }
}

.filterMove {
  opacity: 1;
  transform: translateX(0);
}

.price-range {
  position: relative;
  height: max-content;
  width: 100%;
}

.slider {
  position: relative;
  height: 10px;
  z-index: 1;
  margin: 0 15px;
}

.slider > .track {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ebebeb;
  border-radius: 12px;
  height: 6px;
}

.range {
  position: absolute;
  height: 6px;
  z-index: 2;
  left: 0;
  right: 0;
  background: #6a983c;
  border-radius: 12px;
  bottom: 0;
  top: 0;
}

.thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;

  border: 1px solid #d1d1d1;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

  z-index: 2;

  &-left {
    left: 0;
    transform: translate(-10px, -6px);
  }

  &-right {
    right: 0;
    transform: translate(10px, -6px);
  }
}

input[type="range"] {
  position: absolute;
  left: 0;
  height: 10px;
  width: 100%;
  z-index: 3;
  appearance: none;

  pointer-events: none;
  opacity: 0;
}

input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 30px;
  height: 30px;
  border: none;
  appearance: none;
  border-radius: 50%;
  background: green;
}

.range-of-prices {
  display: flex;
  gap: 1rem;

  & label {
    display: flex;
    flex-direction: column;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #151515;
    align-items: flex-start;
  }
}
input[type="number"] {
  background: #f9f9f9;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  width: 6rem;
  padding: 1rem;
}

.checkbox-label {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: clamp(0.7rem, calc(0.6341rem + 0.2927vw), 1rem);
  line-height: 19px;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  padding-bottom: 0;
}

input[type="checkbox"] {
  visibility: hidden;
  &:after {
    content: " ";
    position: absolute;
    background-color: #f9f9f9;
    border: 1px solid #d1d1d1;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: visible;
    height: 1rem;
    width: 1rem;
    border-radius: 5px;
  }

  &:hover:after {
    border: 1px solid #151515;
  }

  &:checked:after {
    content: "\2714";
    background: #6a983c;
    border: 1.5px solid #46760a;
    color: white;
  }
}
</style>
