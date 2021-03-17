<template>
  <h1 class="booking-head">Checkout</h1>
  <section class="booking">
    <div class="checkout">
      <h2 class="checkout__head">
        Enter delivery details
      </h2>
      <form @submit.prevent="sendData" class="checkout__form">
        <label class="checkout__label">
          Name*
          <input type="text" name="name" required />
        </label>
        <label class="checkout__label">
          Last Name
          <input type="text" name="lastName" />
        </label>
        <div class="checkout__wrap">
          <label class="checkout__label">
            Email*
            <input type="email" name="Email" required />
          </label>
          <label class="checkout__label">
            Phone*
            <input type="tel" name="Phone" required />
          </label>
        </div>
        <label class="checkout__label">
          Address*
          <input type="text" name="Address" required />
        </label>
        <label class="checkout__label">
          Apartment
          <input type="text" name="Apartment" />
        </label>
        <label class="checkout__label">
          City*
          <input type="text" name="City" required />
        </label>
        <div class="checkout__wrap">
          <label class="checkout__label">
            Country*
            <input type="text" name="Country" required />
          </label>
          <label class="checkout__label">
            Postal Code*
            <input type="text" name="PostalCode" required />
          </label>
        </div>
        <base-button :isBtn="true">Should redirect to payment</base-button>
      </form>
    </div>
    <div class="order">
      <h2>Your Order</h2>
      <div v-for="item in basket" :key="item.id" class="order__card">
        <p class="order__title">
          <strong>{{ item.title }}</strong>
        </p>
        <p class="order__count">
          Count: <strong>{{ item.count }}</strong>
        </p>
        <p class="order__price">
          {{
            item.onSale
              ? ((item.price * item.discount) / 100).toFixed(2)
              : item.price
          }}
          USD
        </p>
      </div>
      <div class="order__total">
        <p class="order__totalPrice">Subtotal: {{ basketPrice }} USD</p>
        <p class="order__Shipping">Shiping: 0 USD</p>
      </div>
      <h2 class="order__totalPay">Total: {{ basketPrice }} USD</h2>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    basket() {
      return this.$store.getters["basket"];
    },
    basketPrice() {
      return this.$store.getters["basketTotal"];
    },
  },
  methods: {
    sendData() {
      this.$store.dispatch("setBasket", {});
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.booking {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(10px, 1fr), 300px;
  place-items: center;
}

.booking-head {
  margin-bottom: 1rem;
  font-size: 3rem;
  font-style: italic;
}

.checkout {
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__wrap {
    display: flex;
    justify-content: space-between;
    width: clamp(11rem, 60vw, 40.3rem);

    & .checkout__label {
      width: 40%;
    }
  }

  &__label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: clamp(11rem, 60vw, 40.3rem);

    & input {
      width: 100%;
      height: 36px;
      padding: 0 15px;
      border-radius: 1000px;
      background: #f4f6f8;
      border: 1px solid #f4f6f8;
      outline: none;
      font-size: 1rem;

      &:focus {
        border: 1px solid #f4f6f8;
      }
    }
  }
}

.order {
  display: flex;
  flex-direction: column;
  grid-column: 2/3;
  align-self: start;
  width: clamp(14rem, 30vw, 17rem);

  &__title {
    text-align: left;
  }

  &__price {
    font-weight: bold;
  }

  &__count {
    color: #818d92;
    font-size: 1rem;

    & strong {
      color: #151515;
    }
  }

  & h2 {
    margin-bottom: 1.6rem;
  }

  &__total {
    background: #f4f6f8;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #f4f6f8;
    border: none;
    padding: 1rem;
    border-bottom: 1px solid grey;
    gap: 0.5rem;

    &:first-of-type {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
  }
}

@media (max-width: 899px) {
  .booking {
    display: flex;
    flex-direction: column-reverse;
  }

  .order {
    align-self: center;
    margin-bottom: 2rem;
  }
}
@media (max-width: 500px) {
  .checkout {
    &__wrap {
      flex-direction: column;
      justify-content: baseline;
      gap: 0.5rem;

      & .checkout__label {
        width: 100%;
      }
    }
  }
}
</style>
