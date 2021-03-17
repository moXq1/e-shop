<template>
  <section class="contact">
    <div class="contact__wrap">
      <h1 v-anima class="contact__header">Contact</h1>
    </div>

    <form @submit.prevent="fakeDataSend" class="contact__form" v-animaForm>
      <label class="contact__label" v-if="sendStep === 'wait'">
        <input type="text" placeholder="Your name goes here..." name="name" />
      </label>
      <label class="contact__label" v-if="sendStep === 'wait'">
        <input
          type="email"
          placeholder="Your email goes here..."
          name="email"
        />
      </label>
      <label class="contact__label" v-if="sendStep === 'wait'">
        <textarea
          placeholder="Your message goes here..."
          maxlength="5000"
          name="message"
        ></textarea>
      </label>
      <input
        type="submit"
        :value="btnValue"
        @click="blur"
        class="contact__send"
        v-if="sendStep === 'wait' || sendStep === 'sending'"
      />
      <div v-if="sendStep === 'sended'" class="contact__success">
        Thank you! Your submission has been received!
      </div>
    </form>
  </section>
</template>

<script>
import anima from "../directives/head.js";
import animaForm from "../directives/form.js";

export default {
  data() {
    return {
      sendStep: "wait",
      btnValue: "Send it",
    };
  },
  methods: {
    fakeDataSend() {
      this.sendStep = "sending";
      this.btnValue = "Pleas Wait ...";
      setTimeout(() => (this.sendStep = "sended"), 500);
    },
    blur(e) {
      e.target.blur();
    },
  },
  directives: { anima, animaForm },
};
</script>

<style lang="scss" scoped>
.contact {
  width: 100%;
  height: 100%;

  &__success {
    border: 1px solid #303030;
    text-align: center;
    font-size: 0.75rem;
    line-height: 1.8;
    color: #303030;
    padding: 20px;
    width: clamp(11rem, 60vw, 40.3rem);
  }

  &__send {
    font-size: 8vw;
    background: transparent;

    border: none;
    font-family: "GT Sectra Display", "Times New Roman", sans-serif;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    margin-top: 1rem;
    -webkit-text-stroke-width: 0.05vw;
    -webkit-text-stroke-color: #303030;
    color: transparent;
    transition: color 0.5s;

    &:hover {
      color: #303030;
    }
    //#f7ebda
  }

  &__wrap {
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
  }

  &__header {
    font-size: 8vw;
    color: #303030;
    font-family: "GT Sectra Display", "Times New Roman", sans-serif;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    position: relative;
    padding-top: 1rem;
    width: min-content;
    text-align: center;
    transform-style: preserve-3d;

    &:before {
      content: "";
      position: absolute;
      height: 2px;
      background: #303030;
      width: 5vw;
      left: 50%;
      top: 0%;
      transform: translateX(-50%);
    }
  }

  &__form {
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  &__label {
    & input,
    & textarea {
      width: clamp(11rem, 60vw, 40.3rem);
      padding: 0.5rem;
      border: 1px solid #303030;
      background: #f7ebda;
      font-size: 1rem;
      transform-origin: 0 50%;
      transform-style: preserve-3d;
      perspective-origin: 50% 50%;
    }

    & textarea {
      height: 10rem;
    }
  }
}

.anim {
  animation: mv 0.5s cubic-bezier(0.55, 0.58, 0, 0.96) forwards;
}

@keyframes mv {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.inputAnim {
  animation: mw 0.5s ease forwards;
}

@keyframes mw {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
