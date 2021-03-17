<template>
  <header>
    <nav
      class="nav"
      :class="{
        nn:
          $route.path.includes('account') ||
          $route.path.includes('auth') ||
          $route.path.includes('new'),
      }"
    >
      <div class="nav__info">
        <router-link to="/contact" class="nav__link nav__link--active"
          >Chat with us</router-link
        >
        <p class="nav__contact">+420 336 775 664</p>
        <p class="nav__contact">info@fresnesecom.com</p>
      </div>
      <div class="nav__links">
        <router-link to="/posts" class="nav__link nav__link--active"
          >Posts</router-link
        >
        <a href="#" class="nav__link nav__link--notActive">About Us</a>
        <a href="#" class="nav__link nav__link--notActive">Careers</a>
      </div>
    </nav>
    <div class="head">
      <div
        class="head__logo"
        :class="{
          log:
            $route.path.includes('account') ||
            $route.path.includes('auth') ||
            $route.path.includes('new'),
        }"
        @click="move"
      >
        Freshnesecom
      </div>
      <div
        v-if="
          !$route.path.includes('account') &&
            !$route.path.includes('new') &&
            !$route.path.includes('auth')
        "
        class="head__categories"
      >
        <!-- <label class="head__label head__label--select" for="select">
          <select id="select">
            <option value="value1"> 1</option>
            <option value="value2" selected>All categories</option>
            <option value="value3">3</option>
          </select>
        </label> -->

        <label class="head__label">
          <input
            type="text"
            placeholder="Search Products"
            v-model="search"
            @blur="hide"
            @focus="toggle = true"
          />
          <div class="head__search">
            <img width='20' height='20' src="../assets/search-outline.svg" alt="search icon" />
          </div>
          <ul class="head__foundProducts" v-if="prod.length > 0 && toggle">
            <li v-for="p in prod.slice(0, 5)" :key="p.id" :data-id="p.id">
              <router-link @click="kkk" :to="`/product/${p.id}`"
                >{{ p.title }}
              </router-link>
            </li>
          </ul>
        </label>
      </div>
      <div
        class="head__icons"
        :class="{
          acc:
            $route.path.includes('account') ||
            $route.path.includes('auth') ||
            $route.path.includes('new'),
        }"
      >
        <div class="head__icon" @click="account">
          <img  width='20' height='20'
            :class="{ logged: loggedIn }"
            src="../assets/person-outline.svg"
            alt="person icon"
          />
        </div>
        <div class="head__icon head__icon--count" @click="showCart = true">
          <div v-if="count > 0" class="head__count">{{ count }}</div>
          <img  width='20' height='20' src="../assets/basket-outline.svg" alt="basket icon" />
        </div>
      </div>
    </div>
  </header>
  <modal-cart :showCart="showCart" @close="showCart = false"></modal-cart>
</template>

<script>
export default {
  data() {
    return {
      showCart: false,
      search: "",
      prod: [],
      toggle: false,
    };
  },

  watch: {
    search(val) {
      let ti = setTimeout(() => {
        if (val === this.search) {
          if (val !== "") {
            this.prod = this.$store.getters["products"].filter((el) =>
              el.title.includes(val)
            );
          }

          console.log(this.prod);
        } else {
          clearTimeout(ti);
        }
      }, 1000);
    },
  },

  computed: {
    count() {
      return this.$store.getters["basketNum"];
    },
    loggedIn() {
      return this.$store.getters["isAuthenticated"];
    },
  },
  methods: {
    move() {
      this.$router.push("/");
    },

    kkk() {
      this.search = "";
    },
    account() {
      this.$router.push("/auth");
    },
    hide() {
      setTimeout(() => (this.toggle = false), 1000);
    },
  },
};
</script>

<style lang="scss">
header {
  width: 100vw;
  height: 100px;

  display: grid;
  place-content: center;
  grid-template-columns: 1fr;
}

.logged {
  filter: invert(40%) sepia(36%) saturate(1969%) hue-rotate(340deg)
    brightness(86%) contrast(87%);
}

.head {
  width: 100%;
  display: flex;
  justify-content: space-between;

  background-color: #fff;

  padding: 1.5rem 3rem;

  &__foundProducts {
    position: absolute;
    /* bottom: -329%; */
    top: 114%;
    left: 0;

    z-index: 10;
    list-style: none;
    /* height: 100%; */
    height: min-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 12px;
    border: 1px solid #d1d1d1;
    background: #f9f9f9;
    border-top: none;
    padding: 0 0.5rem;
    padding-top: 0.5rem;

    & li {
      margin-bottom: 0.5rem;

      & a {
        color: #151515;
        text-decoration: none;
        transition: color 0.5s;

        &:hover {
          color: #6a983c;
        }
      }
    }
  }

  &__categories {
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid #d1d1d1;
    padding: 0 0.5rem;
    width: min-content;
    position: relative;
    & input,
    & select {
      border: none;
      background-color: inherit;
      outline: none;
    }

    & input::placeholder {
      font-family: "Open Sans";
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #a9a9a9;
    }

    & input {
      padding: 0.4rem 0 0.4rem 0.4rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 16.3rem;
      width: clamp(11rem, 40vw, 35.3rem);
      font-size: 14px;
    }

    & select {
      font-weight: 700;
      font-family: inherit;
      //   appearance: none;
      font-size: 15px;
      line-height: 22.5px;
      color: #151515;
      padding: 0 1rem 0 0;
    }
  }

  &__icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__count {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 12px;
    line-height: 18px;
    font-weight: 600;
    background-color: #e6704b;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    box-shadow: 0px 2px 3px #d1d1d1;
    bottom: 1px;
    left: 3px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    transition: all 0.5s ease;
    border-radius: 8px;

    &--count {
      position: relative;
    }

    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }

    &:first-child {
      margin-right: 1rem;
    }

    & img {
      width: 100%;
      height: auto;
      object-fit: cover;
      padding: 0.5rem;
    }
  }

  &__logo {
    font-weight: bold;
    font-size: 1.7rem;
    cursor: pointer;
  }

  &__search {
    width: 16px;
    height: 16px;
    margin-bottom: 0.2rem;

    & img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  & label {
    height: 100%;
  }

  &__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__label--select {
    position: relative;
    padding: 0 0.4rem 0 0.4rem;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   right: 0.8rem;
    //   width: 0.8em;
    //   height: 0.5em;
    //   background-color: green;
    //   clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    // }

    &:before {
      content: "";
      width: 1px;
      height: 20px;
      background-color: #d1d1d1;
      position: absolute;
      right: 0rem;
    }
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 3rem;
  /* padding: 1rem 3rem; */
  padding-top: 4rem;
  padding-bottom: 1rem;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: calc(100vw - 6rem);
    height: 1px;
    background: #151515;
    opacity: 0.05;
    bottom: 0;
  }

  &__info,
  &__links {
    display: flex;
    gap: 2rem;
    align-items: center;
    & .router-link-exact-active {
      color: #c7522d;
    }
  }

  &__contact,
  &__link {
    font-family: "Open Sans";
    font-size: 0.9rem;
    line-height: 16px;
    font-weight: 400;
  }

  &__link {
    text-decoration: none;
    color: #46760a;
    transition: all 0.5s ease;
    user-select: none;

    &:hover {
      color: #c8deb3;
    }

    &--notActive {
      color: #303030;
      cursor: not-allowed;

      &:hover {
        color: #303030;
      }
    }
  }
}

@media (max-width: 799px) {
  .nav {
    padding: 6rem 0 1rem 0;
    display: grid;
    place-content: center;
    place-items: center;

    &:after {
      width: 100%;
    }
    &__info {
      display: none;
    }
  }
  .nn {
    padding: 3rem 0 1rem 0;
  }

  .head {
    display: grid;
    grid-template-columns: 1fr 9rem;
    grid-row-gap: 1rem;

    &__logo {
      grid-column: 1/3;
    }

    &__icons {
      justify-content: flex-end;
    }

    &__categories {
      & input {
        width: clamp(11rem, 35vw, 16.3rem);
      }
    }
  }
}
.acc {
  grid-row: 1/1;
  grid-column: 2/3;
}
.log {
  grid-row: 1/1;
  grid-column: 1/2;
  justify-self: start;
}

@media (max-width: 549px) {
  .head {
    &__logo {
      grid-column: 1/2;
      justify-self: start;
    }
    &__icons {
      grid-row: 1/1;
      grid-column: 2/3;
    }
    &__categories {
      grid-column: 1/3;
      justify-self: center;
      padding: 0.2rem 0.5rem;
      & input {
        width: clamp(11rem, 40vw, 16.3rem);
      }
    }
  }
}

@media (max-width: 399px) {
  .head {
    grid-template-columns: 1fr 7rem;
    &__logo {
      font-size: 1.5rem;
    }
    &__icons {
    }
    &__icon {
      width: 35px;
      height: 35px;

      &:first-child {
        margin-right: 0.5rem;
      }
    }
    &__count {
      width: 13px;
      height: 13px;
      bottom: 2px;
      left: 5px;
    }

    &__categories {
      & input {
        width: clamp(5rem, 30vw, 16.3rem);
        padding: 0 0.5rem;
      }
    }
  }
}
</style>
