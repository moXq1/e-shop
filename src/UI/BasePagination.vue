<template>
  <div class="pagination" v-if="totalPages.length > 1">
    <span class="pagination__first" @click="firstPage">&laquo;</span>
    <div class="pagination__container">
      <span v-if="showPages[0] !== 1" class="prev" @click="prev">...</span>
      <span
        v-for="(page, index) in showPages"
        :key="index"
        :data-page="page"
        :class="{ 'active-page': index === 0 }"
        @click="changePage"
        class="pagination__page"
        >{{ page }}
      </span>
      <span
        v-if="showPages[showPages.length - 1] !== totalPages.length"
        class="next"
        @click="nxt"
        >...</span
      >
    </div>
    <span @click="lastPage" class="pagination__last">&raquo;</span>
  </div>
</template>

<script>
export default {
  props: ["totalItems", "currentPage", "itemsPerPage"],
  data() {
    return {
      index: 0,
      visiblePages: 2,
    };
  },

  computed: {
    totalPages() {
      let n = Math.ceil(this.totalItems / this.itemsPerPage);
      let arr = [];
      for (let i = 1; i <= n; i++) {
        arr.push(i);
      }
      return arr;
    },
    showPages() {
      return this.totalPages.slice(
        this.index * this.visiblePages,
        this.visiblePages * (this.index + 1)
      );
    },
    // pages() {},
  },
  methods: {
    changePage(e) {
      let curPage = +e.target.dataset.page;
      this.clearAdd(e, curPage);
      this.$emit("chgPage", curPage - 1);
    },
    nxt(e) {
      this.index++;
      this.clear(e);
    },
    prev(e) {
      this.index--;
      this.clear(e);
    },
    clear(e) {
      let pages = e.target.closest(".pagination");
      let active = pages.querySelector(".active-page");
      if (active) {
        active.classList.remove("active-page");
      }
    },
    clearAdd(e, curPage) {
      let pages = e.target.closest(".pagination");
      let active = pages.querySelector(".active-page");
      if (active) {
        active.classList.remove("active-page");
      }
      pages
        .querySelector(`span[data-page="${curPage}"]`)
        .classList.add("active-page");
    },
    firstPage(e) {
      this.index = 0;
      setTimeout(() => {
        this.clearAdd(e, 1);
        this.$emit("chgPage", this.index);
      }, 100);
    },
    lastPage(e) {
      this.index = Math.floor(this.totalPages.length / this.visiblePages);
      console.log(this.index, this.totalPages.length);
      setTimeout(() => {
        this.clearAdd(e, this.totalPages.length);
        this.$emit("chgPage", this.index);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.active-page {
  color: white;
  background: #6a983c;
}
.pagination {
  display: flex;
  gap: 1rem;

  color: #6a983c;

  &__last,
  &__first {
    color: #6a983c;
    border: 1px solid #e3e3e3;
    padding: 0.5rem 1rem;

    &:hover {
      color: white;
      background: #6a983c;
    }
  }

  &__container {
    display: flex;
    align-items: center;

    color: #6a983c;
    border: 1px solid #e3e3e3;
  }

  & span {
    cursor: pointer;
    padding: 0.5rem 1rem;
    user-select: none;
    transition: all 0.5s ease;
    &:hover {
      color: white;
      background: #6a983c;
    }
  }
}
</style>
