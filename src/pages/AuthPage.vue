<template>
  <section class="authWrapper">
    <form @submit.prevent="sendData" class="auth">
      <label v-if="type !== 'login'">
        Name*
        <input
          @blur="validateName"
          type="text"
          :class="{ err: !validName }"
          id="name"
          v-model.trim="name"
        />
      </label>
      <label>
        Email*
        <input
          @blur="validateEmail"
          type="email"
          :class="{ err: !validEmail }"
          id="email"
          v-model.trim="email"
        />
      </label>
      <label>
        Password*
        <input
          @blur="validatePassword"
          type="password"
          :class="{ err: !validPassword }"
          id="password"
          v-model.trim="password"
        />
      </label>
      <div class="auth__btns">
        <base-button :isBtn="true">{{ btnCaption }}</base-button>
        <base-button :isBtn="true" mode="flat" @click.prevent="switchMode">{{
          switchModeCaption
        }}</base-button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      type: "login",
      email: "",
      password: "",
      name: "",
      validName: true,
      validPassword: true,
      validEmail: true,
      isValid: false,
    };
  },
  computed: {
    btnCaption() {
      if (this.type === "login") {
        return "Login";
      }
      return "Singup";
    },
    switchModeCaption() {
      if (this.type === "login") {
        return "Singup";
      }
      return "Login";
    },
  },
  methods: {
    switchMode() {
      this.type === "login" ? (this.type = "singup") : (this.type = "login");
    },
    validateName() {
      this.name !== "" ? (this.validName = true) : (this.validName = false);
    },
    validateEmail() {
      this.email.includes("@")
        ? (this.validEmail = true)
        : (this.validEmail = false);
    },
    validatePassword() {
      this.password !== ""
        ? (this.validPassword = true)
        : (this.validPassword = false);
    },
    async sendData() {
      this.validateName();
      this.validateEmail();
      this.validatePassword();

      if (this.type === "login") {
        if (!this.validPassword && !this.validEmail) {
          return;
        }
      } else {
        if (!this.validName && !this.validPassword && !this.validEmail) {
          return;
        }
      }

      try {
        if (this.type === "login") {
          //console.log(this.type);
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            name: this.name,
            password: this.password,
          });
          //   await this.$store.dispatch("registerUser", {
          //     email: this.email,
          //     name: this.name,
          //   });
        }
        const redirect = `/${this.$route.query.redirect || ""}`;

        this.$router.replace(redirect);
      } catch (er) {
        this.error = er.message || "Failed to authenticate,try later!";
      }
    },
  },
};
</script>

<style lang="scss">
.auth {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 1rem;
  & label {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    font-size: 0.8rem;
    opacity: 0.8;

    & input {
      border: none;
      font-family: inherit;
      padding: 0.5rem 1rem;
      box-shadow: 0px 1px 3px 0px #15151569;
      border-radius: 12px;
      outline: none;
      border: 2px solid transparent;

      &:focus {
        border-radius: 12px;
        border: 2px solid #6a983c;
      }
    }
  }

  &__btns {
    display: flex;
  }
}

.err {
  border: 1px solid red !important;
}
</style>
