<template>
  <div class="wrappe">
    <section
      class="carousel"
      @mousedown="downM"
      @mouseup="up"
      @mouseleave="leave"
      @mousemove="move"
      :class="{ active: down }"
    >
      <div class="review" v-for="r in reviews" :key="r.name">
        <p class="review__comment">{{ r.comment }}</p>
        <p class="review__name">{{ r.name }}</p>
        <div class="review__photo">
          <div class="review__placeholder">
            <div class="activity"></div>
          </div>
          <img :src="r.photo" alt="photo of reviewer" @load="loadImg" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import im1 from "../assets/avatar-nikita.jpg";
import im2 from "../assets/avatar-cruz.jpg";
import im3 from "../assets/avatar-drake.jpg";
import im4 from "../assets/avatar-griffin.jpg";
import im5 from "../assets/avatar-kady.jpg";
import im6 from "../assets/avatar-christian.jpg";

export default {
  data() {
    return {
      firstEnter: 0,
      scrolled: 0,
      down: false,
      reviews: [
        {
          name: "Ivan Ivanov",
          comment: `“ This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here “`,
          photo: im1,
        },
        {
          name: "Ivan Ivanov",
          comment: `“ This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here “`,
          photo: im2,
        },
        {
          name: "Ivan Ivanov",
          comment: `“ This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here “`,
          photo: im3,
        },
        {
          name: "Ivan Ivanov",
          comment: `“ This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here “`,
          photo: im4,
        },
        {
          name: "Ivan Ivanov",
          comment: `“ This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here “`,
          photo: im5,
        },
        {
          name: "Ivan Ivanov",
          comment: `“ This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here “`,
          photo: im6,
        },
      ],
    };
  },
  methods: {
    loadImg(e) {
      const t = e.target.closest(".review__photo");
      t.querySelector(".review__placeholder").remove();
    },
    downM(e) {
      e.preventDefault();

      let t = e.target.closest(".carousel");

      this.firstEnter = e.pageX;
      this.down = true;

      this.scrolled = t.scrollLeft;
    },
    leave() {
      this.down = false;
    },
    up() {
      this.down = false;
    },
    move(e) {
      if (!this.down) return;
      e.preventDefault();
      let t = e.target.closest(".carousel");

      t.scrollLeft = this.firstEnter - e.pageX + this.scrolled;
    },
  },
};
</script>

<style lang="scss">
.carousel {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-padding: 1rem;
  padding: 1.5rem 0rem 3rem 2rem;

  gap: 2rem;
  //   scroll-snap-type: x;
  //   -webkit-overflow-scrolling: touch;
  user-select: none;
  &:hover {
    cursor: grab;
  }
}

.active {
  &:hover {
    cursor: grabbing;
  }
}

.wrappe {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.review {
  height: auto;
  flex: 0 0 23rem;
  width: 23rem;
  border-radius: 12px;
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  justify-content: space-around;
  position: relative;
  padding-bottom: 3rem;
  scroll-snap-align: start;
  box-shadow: 0px 0px 7px 0px #f1f1f1;

  &:last-child {
    margin-right: 3rem;
  }

  &__comment {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    color: #151515;
    padding: 1rem 0;
  }

  &__name {
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #a9a9a9;
    padding: 0.5rem 0;
  }
  &__photo {
    --size: 60px;
    width: var(--size);
    height: var(--size);
    position: absolute;
    bottom: calc(var(--size) / -2);

    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 5px 7px -4px #f1f1f1;

    & img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  &__placeholder {
    width: 100%;
    height: 100%;
    background-color: #d1d1d1;
    position: relative;
    overflow: hidden;
    z-index: 40;
  }
}

.activity {
  height: 100%;
  position: absolute;
  left: -45%;
  width: 45%;
  background-image: linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  z-index: 40;
  animation: blik 1s ease infinite;
}

@keyframes blik {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(300%);
  }
}

@media (max-width: 409px) {
  .review {
    flex: 0 0 clamp(16rem, 75vw, 20rem);
  }
}
</style>
