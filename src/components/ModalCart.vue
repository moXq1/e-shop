<template>
  <div v-if="showCart" class="mbackdrop" @click="closeCart"></div>
  <transition name="cart">
    <aside class="cart" v-if="showCart">
      <div class="cart__wrapper">
        <div class="cart__header">
          <h2 class="cart__head">Your Cart</h2>
          <div class="cart__count">
            items<br />
            in cart <span class="cart__crc">{{ ItemsCount }}</span>
          </div>
        </div>
        <div class="cart__products">
          <div class="cart__desc">
            <p>Product</p>
            <p>Qty.</p>
            <p>Remove</p>
          </div>
          <div
            class="cart__product"
            v-for="item in cartItemsKey"
            :key="item"
            :data-id="item"
          >
            <div class="cart__img">
              <img :src="cartItems[item].img" alt="image of product" />
            </div>
            <div class="cart__title">
              {{ cartItems[item].title }}, ${{
                cartItems[item].onSale
                  ? (
                      cartItems[item].price *
                      (cartItems[item].discount / 100)
                    ).toFixed(2)
                  : cartItems[item].price
              }}
            </div>

            <input
              class="cart__c"
              type="number"
              :value="cartItems[item].count"
              @input="changeAmout"
            />

            <button class="cart__remove" @click="removeFromCart"></button>
          </div>
        </div>

        <div class="cart__subtotal">
          <div class="cart__sub">
            <span>Subtotal: </span><strong>USD {{ total }}</strong>
          </div>
          <div class="cart__sub"><span>Taxes: </span><strong>0.00</strong></div>
          <div class="cart__sub">
            <span>Shipping:</span> <strong>TBD</strong>
          </div>
        </div>
        <div class="cart__total">
          <span>Total Price:</span> <strong>USD {{ total }} </strong>
        </div>
        <div class="cart__checkout">
          <base-button to="/" mode="secondary">Check out</base-button>
          <base-button :isBtn="false" @click.prevent="closeCart"
            >Back to Shopping</base-button
          >
        </div>
      </div>
    </aside>
  </transition>
</template>

<script>
export default {
  props: {
    showCart: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    cartItems() {
      return this.$store.getters["basket"];
    },
    total() {
      return this.$store.getters["basketTotal"];
    },
    ItemsCount() {
      return this.$store.getters["basketNum"];
    },
    cartItemsKey() {
      return Object.keys(this.cartItems);
    },
  },
  emits: ["close"],
  methods: {
    closeCart() {
      this.$emit("close");
    },
    removeFromCart(e) {
      let id = e.target.closest(".cart__product").dataset.id;
      this.$store.dispatch("removeFromBasket", id);
    },
    changeAmout(e) {
      let id = e.target.closest(".cart__product").dataset.id;
      this.$store.dispatch("updateCount", { id: id, value: e.target.value });
    },
  },
};
</script>

<style lang="scss">
.cart-leave-active {
  transition: all 0.3s ease-out;
}

.cart-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.cart-enter-from,
.cart-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.cart {
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 21;
  padding: 24px;
  width: 400px;

  &__products {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__c {
    flex-grow: 0;

    flex-basis: 44px;
    color: #151515;
    border: 1px solid #151515;
    border-radius: 2px;
    background: transparent;
    display: block;
    font-size: 1.1rem;

    flex-grow: 0;
    height: 44px;
    margin-right: 8px;
    padding: 0px;
    text-align: center;
    width: 50px;
  }

  &__title {
    text-align: left;
    flex-grow: 1;
    font-size: 1rem;
    line-height: 1.2;
    width: min-content;
    margin-right: 0.5rem;
  }

  &__line {
    width: 4px;
    height: 1.5rem;
    background-color: #151515;
    position: absolute;

    &:first-child {
      transform: rotate(-45deg);
    }
    &:last-child {
      transform: rotate(45deg);
    }
  }

  &__remove {
    align-items: center;
    background: transparent;
    cursor: pointer;
    font-size: 1.1rem;

    line-height: 2;
    margin-left: 0px;
    border: 1px dotted rgb(22, 36, 59);
    color: #151515;
    display: flex;
    height: 44px;
    -webkit-box-pack: center;
    justify-content: center;
    margin-right: 4px;
    padding: 0px;
    width: 44px;

    &:after {
      content: "❌";
      position: absolute;
    }
  }

  &__product {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    margin-left: 4px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__checkout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  &__subtotal {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__total {
    display: flex;
    color: #151515;
    padding: 0 8px 4px;

    font-weight: bold;
    & span {
      flex-basis: 60%;
      text-align: right;
      font-size: 1.1rem;
    }
    & strong {
      flex-basis: 40%;
      text-align: right;
    }
  }

  &__sub {
    display: flex;
    padding: 0 8px 4px;

    & span {
      flex-basis: 60%;
      text-align: right;
      font-size: 0.9rem;
    }
    & strong {
      flex-basis: 40%;
      text-align: right;
      color: #151515;
      font-weight: bold;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  &__count {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    line-height: 1.2;
    text-align: right;
  }
  &__crc {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #c7522d;
    font-size: 1rem;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
  }

  &__desc {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & p {
      flex-basis: 60px;
      flex-grow: 0;
      font-size: 0.8rem;
      padding-bottom: 8px;
    }

    & p:first-child {
      flex-grow: 1;
      text-align: left;
    }
  }
}
@media (max-width: 700px) {
  .cart {
    left: 0;
    width: 100vw;
    right: 0;
  }
}
</style>
