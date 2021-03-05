<template>
  <teleport to="body">
    <div v-if="show" class="mbackdrop" @click="closeModal"></div>
    <transition name="fade" mode="out-in">
      <div v-if="show" class="modal">
        <div class="modal__header">
          <h2 class="modal__title">
            <slot name="title">Title</slot>
          </h2>

          <div class="modal__close">
            <div class="modal__cross" @click="closeModal"></div>
          </div>
        </div>
        <div class="modal__data">
          <slot name="content"> </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  emits: ["close"],

  methods: {
    closeModal(e) {
      if (e.target === e.currentTarget) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss">
// .fade-leave-from {
// }

// .fade-enter-to {
// }

// .fade-leave-to {
//   opacity: 0;
//   transform: scale(1);
// }

.mbackdrop {
  width: 100vw;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 21;
  padding: 0.8rem 1.5rem;
  width: clamp(20rem, 50vw, 40rem);
  border-radius: 0.5rem;
  color: #151515;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__data {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: start;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      background: #e9e9e9;
      width: 100%;
      height: 2px;
      bottom: -5px;
    }
  }

  &__cross {
    &:hover::before,
    &:hover::after {
      background-color: #46760a;
    }
    &:hover::after {
      transform: rotate(135deg) scale(0.8);
    }
    &:hover::before {
      transform: rotate(-135deg) scale(0.8);
    }
    height: 1.5rem;
    width: 0.8rem;
    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 4px;
      height: 1.5rem;
      background-color: #151515;
      transition: transform 0.5s, background-color 0.4s;
    }

    &::after {
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg);
    }
  }
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: transform 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(0%, -50%);
  opacity: 0;
}
</style>
