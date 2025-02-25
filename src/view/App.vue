<template>
  <div class="app">
    <aside class="app-aside">
      <Navbar />
    </aside>
    <main class="app-content">
      <div class="app-container">
        <Header />
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import { useSearchStore } from '@/stores/search';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchStore = useSearchStore();

router.afterEach(() => {
  searchStore.clearProductSearchTextValue();
});
</script>

<style lang="scss" scoped>
.app {
  display: grid;
  grid-template-columns: 230px auto;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;

  &-content {
    background-color: var(--c-main-bg);
    padding: $spacing-xx-large;
    overflow-x: auto;
  }

  &-container {
    margin: 0 auto;
    max-width: $breakpoint-large-device;
  }
}

@include media-query(laptop) {
  .app {
    grid-template-columns: 80px auto;
  }
}

@include media-query(phone) {
  .app {
    grid-template-columns: 0 1fr;

    &-content {
      padding: $spacing-medium;
      margin-bottom: 42px;
    }
  }
}
</style>
