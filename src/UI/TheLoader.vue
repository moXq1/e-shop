<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 1.1em solid rgba(185, 180, 180, 0.2);
  border-bottom-color: #6a983c;

  animation: spin 1s ease infinite;

  &:after {
    content: "";
    position: absolute;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
