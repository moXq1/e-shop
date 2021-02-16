<template>
  <the-header></the-header>
  <main></main>
  <the-footer></the-footer>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  height: 100vh;
  width: 100%;
}

html {
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
