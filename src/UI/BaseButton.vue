<template>
  <router-link v-if="!isBtn" :to="to" :class="mode" class="l">
    <span class="b"></span>
    <span class="backdrop">
      <slot></slot>
      <div class="forward">
        <img width="20" height='20'
          src="../assets/chevron-forward-outline.svg"
          alt="discover arrow icon"
        />
      </div>
    </span>
  </router-link>

  <button v-else-if="isBtn" :class="mode">
    <span class="b"></span>
    <span class="backdrop">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
    isBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
button {
  border: none;
  background: transparent;
  color: #151515;
  cursor: pointer;
  font-size: 15px;
  line-height: 22px;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 12px 16px;
  user-select: none;

  &:focus {
    box-shadow: 0 0 0 2px #6a983c;
    border-radius: 12px;
  }

  &:hover .b,
  &:active .b {
    transform: scale(1.025);
    border: 2px solid #6a983c;
    transition: transform 150ms ease;
  }
}

// a:focus,
// button:focus {
//   border: 2px solid #6a983c;
// }

.l {
  text-decoration: none;
  background: transparent;
  color: #151515;
  cursor: pointer;
  font-size: 15px;
  line-height: 22px;
  font-weight: bold;
  position: relative;
  padding: 12px 16px;
  outline: none;
  display: block;

  &:focus {
    border-radius: 12px;
  }

  &:hover .b,
  &:active .b {
    transform: scale(1.025);
    border: 2px solid #6a983c;
    transition: transform 150ms ease;
  }
}
// will-change: transform;
// backface-visibility: hidden;
// transform: translateZ(0);
// transition: transform 0.5s linear;

.backdrop {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.b {
  position: absolute;
  border: 2px solid #f5f5f5;
  background: #f5f5f5;
  outline: none;
  inset: 0;
  border-radius: 12px;

  transition: all 250ms ease 0s;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: antialiased;
}

.forward {
  width: 16px;
  height: 16px;

  & img {
    width: 100%;
    height: auto;

    object-fit: cover;
  }
}

.secondary {
  color: white;
  transition: all 0.5s;

  &:hover {
    color: #151515;

    & .b {
      border: 2px solid #46760a;
    }

    & .forward img {
      filter: invert(0);
    }
  }
  & .b {
    background: #6a983c;
    border: 2px solid #46760a;
  }

  & .forward img {
    transition: filter 0.5s;
    filter: invert(1);
  }
}

.flat {
  transition: all 0.5s;
  &:hover {
    color: #6a983c;
  }
  &:hover .b {
    border: none;
  }
  & .b {
    border: none;
    background: transparent;
  }
  & .forward img {
    transition: filter 0.5s;
    filter: invert(53%) sepia(18%) saturate(1224%) hue-rotate(47deg)
      brightness(97%) contrast(90%);
  }
}
</style>
