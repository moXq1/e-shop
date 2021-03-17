<template>
  <section class="accountPage">
    <div class="accountTitle">
      <h3>{{ name }}</h3>
      <p>Your personal account</p>
    </div>
    <form @submit.prevent="updateData" class="account">
      <div class="account__data">
        <label>
          Name
          <input type="text" v-model="name" />
        </label>
        <label>
          Phone
          <input
            type="tel"
            minlength="9"
            maxlength="14"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            v-model="phone"
          />
        </label>
        <label>
          Location
          <input type="text" v-model="location"
        /></label>

        <label>
          Bio
          <textarea
            cols="40"
            rows="5"
            placeholder="Tell us about yourself"
            v-model="bio"
          ></textarea> </label
        ><base-button :isBtn="true" mode="secondary">Update </base-button>
      </div>
      <div class="account__picture">
        <div class="account__img">
          <div v-if="!img" class="account__placeholder"></div>
          <img
            v-if="img !== ''"
            :src="img"
            alt="Personal image"
            width="200"
            height="200"
          />
        </div>
        <label class="account__picinput"
          >Edit
          <input type="file" @change="previewFiles" accept="image" />
        </label>
      </div>

      <base-button class="account__btn" @click="logout" to="/"
        >Logout</base-button
      >
    </form>
  </section>
</template>

<script>
export default {
  props: ["userid"],
  data() {
    return {
      name: "",
      location: "",
      img: "",
      bio: "",
      phone: "",
    };
  },
  async created() {
      window.scrollTo(0, 0);
    await this.$store.dispatch("loadUser", this.userid);
    for (let prop of Object.keys(this.user)) {
      this[prop] = this.user[prop];
    }
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    previewFiles(e) {
      const target = e.target;
      if (target.files && target.files[0]) {
        const reader = new FileReader();

        reader.onload = (ev) => {
          this.img = ev.target.result;
        };
        reader.readAsDataURL(target.files[0]);
      }
    },
    async updateData() {
      await this.$store.dispatch("updateUser", {
        user: {
          ...this.user,
          name: this.name,
          bio: this.bio,
          location: this.location,
          phone: this.phone,
          img: this.img,
        },
        id: this.userid,
      });
    },
  },
};
</script>

<style lang="scss">
.accountPage {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}

.accountTitle {
  display: flex;
  align-self: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 3rem;

  & p {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  & h3 {
    font-size: 1.5rem;
  }
}

.account {
  display: grid;
  grid-template-columns: 1fr max-content;
  place-content: center;
  place-items: center;
  gap: 2rem;

  &__picture {
    justify-self: end;
    align-self: start;
    position: relative;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: grey;
    border-radius: 50%;
  }
  &__img {
    border-radius: 50%;

    width: 200px;
    height: 200px;
    & img {
      width: 100%;
      height: 100%;

      border-radius: 50%;

      box-shadow: 0 0 0px 1px #f5f5f5;

      object-fit: cover;
    }
  }

  &__data {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  & label {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 0.8rem;
    opacity: 0.8;
    align-self: normal;

    & input,
    & textarea {
      border: none;
      font-family: inherit;
      padding: 0.5rem 1rem;
      box-shadow: 0px 1px 3px 0px #15151569;
      border-radius: 12px;
      outline: none;
      width: clamp(15rem, 50vw, 25rem);
      border: 2px solid transparent;

      &:focus {
        border-radius: 12px;
        border: 2px solid #6a983c;
      }
    }
  }
  &__picinput {
    width: min-content;
    padding: 0.5rem;
    box-shadow: 0 0 2px 0px #4d4d56;
    position: absolute;
    bottom: 0;
    left: 5%;
    background: white;
    border-radius: 6px;
    opacity: 1 !important;

    cursor: pointer;
  }

  &__btn {
    grid-column: 1/-1;
  }
}

input[type="file"] {
  display: none;
}

@media (max-width: 699px) {
  .account {
    grid-template-columns: minmax(10px, 1fr);

    &__picture {
      place-self: center;
      grid-row: 1/2;
    }
    &__data {
      grid-row: 2/3;
    }
  }
}
</style>
