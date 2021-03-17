<template>
  <section class="adding">
    <form @submit.prevent="sendPost" class="newBlog" v-if="!preview">
      <label>
        <input type="text" v-model="title" placeholder="title" />
      </label>
      <label class="pic">
        Load Picture
        <input type="file" accept="image" @change="getImage" />
        <div v-if="postImg !== ''" class="imageB">
          <img :src="postImg" alt="preview of image" />
        </div>
      </label>
      <label>
        <textarea v-model="text" placeholder="markdown syntax"></textarea>
      </label>
      <label>
        <input type="text" placeholder="fruits,vegetable" v-model="tag" />
      </label>
      <base-button :isBtn="true" mode="secondary">Post</base-button>
    </form>
    <blog-content v-else></blog-content>
    <base-button :isBtn="true" @click.prevent="showPreview"
      >Preview</base-button
    >
    <p class="inval" v-if="!isValid">Title,image or tags are not valid</p>
  </section>

  <base-modal :show="!!isError" @close="close">
    <template v-slot:title>
      Error
    </template>
    <template v-slot:content>
      <h3>{{ isError.message }}</h3>
    </template></base-modal
  >

  <base-modal :show="show" @close="closeForm">
    <template v-slot:title>
      Adding post
    </template>
    <template v-slot:content>
      <h3>Data has been sent succesfully</h3>
    </template></base-modal
  >
</template>

<script>
import BlogContent from "../components/BlogContent.vue";
export default {
  components: {
    BlogContent,
  },
  data() {
    return {
      title: "",
      text: "",
      tag: "",
      author: "",
      authorAvatar: "",
      postedData: "",
      postImg: "",
      preview: false,
      isValid: true,
      isError: null,
      show: false,
    };
  },
  methods: {
    getImage(e) {
      const target = e.target;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.postImg = ev.target.result;
        };
        reader.readAsDataURL(target.files[0]);
      }
    },
    close() {
      this.isError = null;
    },
    closeForm() {
      this.show = false;
      this.$router.push("/");
    },
    showPreview() {
      this.isValid = true;
      if (this.title !== "" && this.postImg !== "" && this.tag !== "") {
        this.preview = !this.preview;
      } else {
        this.isValid = false;
      }

      if (this.preview) {
        const user = JSON.parse(localStorage.getItem("user"));
        this.$store.dispatch("setPost", {
          title: this.title,
          text: this.text,
          tag: this.tag,
          author: user.name,
          authorAvatar: user.img,
          postedData: "2020.19.07",
          postImg: this.postImg,
        });
      } else {
        return;
      }
    },
    async sendPost() {
      const user = JSON.parse(localStorage.getItem("user"));
      const date = new Date();
      const post = {
        title: this.title,
        text: this.text,
        tag: this.tag.split(","),
        author: user.name,
        authorAvatar: user.img,
        postedData: `${date.getFullYear()}.${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${date
          .getDate()
          .toString()
          .padStart(2, "0")}`,
        postImg: this.postImg,
        userId: this.$store.getters["userId"],
      };

      if (
        this.title !== "" &&
        this.postImg !== "" &&
        this.tag !== "" &&
        this.text !== ""
      ) {
        try {
          await this.$store.dispatch("addPost", post);
          this.show = true;
        } catch (e) {
          this.isError = e;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.inval {
  color: red;
}

.imageB {
  height: 40px;
  width: 70px;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.newBlog {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;

  & label {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 0.8rem;
    opacity: 1;
    align-self: normal;
    font-size: 1.1rem;

    & input,
    & textarea {
      border: none;
      font-family: inherit;
      padding: 0.5rem 1rem;
      box-shadow: 0 8px 6px -6px #555;
      background: #f9f9f9;
      border-radius: 12px;
      outline: none;
      font-size: 1.1rem;
      width: clamp(15rem, 50vw, 70rem);
      border: 2px solid transparent;

      &:focus {
        border-radius: 12px;
        border: 2px solid #6a983c;
      }
    }

    & textarea {
      height: 30vh;
    }
  }
  & .pic {
    padding: 0.5rem;
    box-shadow: 0 8px 6px -6px #555;
    background: #f9f9f9;
    width: min-content;
    align-items: center;
    border-radius: 6px;
    opacity: 1 !important;
    display: flex;
    flex-direction: row;

    cursor: pointer;
  }
}
</style>
