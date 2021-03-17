<template>
  <blog-content :id="id"></blog-content>
</template>

<script>
import BlogContent from "../components/BlogContent.vue";
export default {
  components: {
    BlogContent,
  },
  props: ["id"],
  created() {
    window.scrollTo(0, 0);
    let cuPost = this.$store.getters["posts"].find((el) => el.id === this.id);
    this.$store.dispatch("setPost", cuPost);
  },
};
</script>
