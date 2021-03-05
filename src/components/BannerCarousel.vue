<template>
  <div class="content">
    <div class="banners">
      <div class="banner" v-for="b in banner" :key="b.name">
        <h2 class="banner__head">{{ b.name }}</h2>

        <base-button :to="b.link" mode="secondary">Discover</base-button>
      </div>
      <div class="prev" @click="prev">
        <img src="../assets/chevron-back-outline.svg" alt="arrow prev" />
      </div>
      <div class="next" @click="next" ref="nextSlide">
        <img src="../assets/chevron-forward-outline.svg" alt="arrow next" />
      </div>
      <div class="dots" @click="dotSlide" ref="dots">
        <span
          v-for="(_, i) in banner"
          :key="i"
          :class="{ active: i === 0 }"
          :data-index="i"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      banner: [
        { name: "Baner1", link: "#" },
        { name: "Baner2", link: "#" },
        { name: "Baner3", link: "#" },
        { name: "Baner4", link: "#" },
        { name: "Baner5", link: "#" },
      ],
      i: 0,
      w: 0,
      dot: "",
      interval: null,
      resizing: false,
    };
  },
  // watch: {
  //   w(newVal) {
  //     setTimeout(() => {
  //       if (this.w !== newVal) {
  //         if (this.interval) {
  //           clearInterval(this.interval);
  //         }
  //       } else {
  //         this.autoSlide();
  //       }
  //     }, 1000);
  //   },
  // },

  unmounted() {
    window.addEventListener("resize", this.checkWidth);
  },
  mounted() {
    window.addEventListener("resize", this.checkWidth);
    this.checkWidth();
    this.autoSlide();
  },
  methods: {
    next(e) {
      let t = e.target.closest(".banners");

      if (this.i === this.banner.length - 1) {
        t.scrollLeft = 0;
        this.i = 0;
      } else {
        t.scrollLeft += this.w;
        this.i++;
      }
      this.removeActive();
      this.activate();
      clearInterval(this.interval);
      this.autoSlide();
    },
    prev(e) {
      let t = e.target.closest(".banners");
      if (this.i === 0) {
        this.i = this.banner.length - 1;
        t.scrollLeft = (this.banner.length - 1) * this.w;
      } else {
        t.scrollLeft -= this.w;
        this.i--;
      }
      this.removeActive();
      this.activate();
      clearInterval(this.interval);
      this.autoSlide();
    },
    dotSlide(e) {
      const el = e.target.closest("span");
      if (this.dot) {
        this.dot.classList.remove("active");
      } else {
        this.removeActive();
      }
      this.dot = el;
      let t = e.target.closest(".banners");
      t.scrollLeft = el.dataset.index * this.w;
      this.i = el.dataset.index;
      clearInterval(this.interval);
      this.autoSlide();
      //   const par = e.target.closest(".dots");
      //   par.querySelector(".active").classList.remove("active");
      el.classList.add("active");
    },
    removeActive() {
      this.$refs.dots.querySelector(".active").classList.remove("active");
    },
    activate() {
      this.$refs.dots
        .querySelector(`[data-index='${this.i}']`)
        .classList.add("active");
    },
    autoSlide() {
      this.interval = setInterval(() => {
        try {
          this.$refs.nextSlide.click();
        } catch {
          console.log();
        }
      }, 5000);
    },
    checkWidth() {
      let k = document.querySelector(".banner");
      if (k) {
        this.w = parseInt(getComputedStyle(k).width, 10);
      }
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  max-width: 100%;
  overflow: hidden;
  position: relative;
}

.banners {
  display: flex;
  scroll-behavior: smooth;
  overflow: hidden;
  scroll-snap-type: x;

  //position: relative;
  &:hover .next,
  &:hover .prev {
    display: flex;
    visibility: visible;
  }
}

.banner {
  flex: 0 0 100%;
  height: 18rem;
  display: flex;
  background-color: #f9f9f9;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 2rem;
  padding-left: 4rem;
  border-radius: 12px;
  scroll-snap-align: start;

  &:hover ~ .next,
  &:hover ~ .prev {
    display: flex;
  }
}

.prev,
.next {
  width: 30px;
  height: 40px;
  background: #d1d1d1;
  position: absolute;
  z-index: 2;
  top: 50%;

  align-items: center;
  justify-content: center;
  visibility: hidden;
  display: none;
  opacity: 0.4;
}
.dots {
  display: flex;
  position: absolute;
  z-index: 2;
  width: max-content;
  gap: 0.5rem;
  bottom: 5%;
  right: 5%;
  & span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    cursor: pointer;

    &.active {
      background-color: #e5704b;
    }
  }
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

@media (max-width: 850px) {
  .banner {
    padding: 1rem;
    padding-left: 2rem;
    &__link {
      padding: 6px 8px;
      font-size: 14px;
      line-height: 19px;
    }
  }
}
</style>
