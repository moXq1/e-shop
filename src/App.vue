<template>
  <div class="wrapper">
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
    <the-footer></the-footer>
  </div>
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
  height: auto;
  width: 100vw;
  margin-top: 5rem;
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

.wrapper {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: minmax(10px, 1fr);
  gap: 2rem;
}

*::-webkit-scrollbar {
  width: 0.3em;
  height: 0.3em;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  background-color: #151515;
  outline: 1px solid slategrey;
}
</style>
