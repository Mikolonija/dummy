<template>
  <header class="header">
    <div class="header-container">
      <img :src="search" alt="Icon representing search functionality" width="24" height="24" />
      <input
        class="font-poppins-light-16"
        v-model="searchStore.productSearchText"
        @keydown.enter="searchData"
        placeholder="Search"
        aria-label="Enter product name to search"
      />
    </div>
    <div class="card">
      <div class="bubble" />
      <img
        class="bing-position"
        :src="notificationBing"
        alt="Icon representing a Bing notification for new updates or alerts"
        width="24"
        height="24"
      />
    </div>
    <div class="card">
      <img :src="avatar" height="50" width="50" alt="Profile picture" />
    </div>
  </header>
</template>

<script setup lang="ts">
import search from '@/assets/header/search.svg?url';
import notificationBing from '@/assets/header/notification-bing.svg?url';
import avatar from '@/assets/header/avatar.png?url';
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();

const searchData = () => {
  searchStore.confirmProductTextValue();
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  margin: 0 0 $spacing-xx-large 0;
  display: flex;
  gap: 20px;
  justify-content: space-between;

  &-container {
    width: 100%;
    position: relative;
  }

  &-container > img {
    position: absolute;
    top: 13px;
    left: 20px;
  }

  &-container > input {
    padding: 0 0 0 $spacing-xxx-large;
    width: 60%;
    max-width: 665px;
  }
}

.card {
  height: 50px;
  min-width: 50px;
  background-color: var(--c-white);
  border-radius: $radius-small;
  position: relative;
}

.bubble {
  position: absolute;
  right: -5px;
  top: -5px;
  width: 10px;
  height: 10px;
  background-color: var(--c-notification-bg);
  border-radius: 50%;
}

.bing-position {
  position: absolute;
  top: 14px;
  left: 14px;
}

@include media-query(laptop) {
  .header-container > input {
    width: 100%;
  }
}

@include media-query(phone) {
  .header {
    flex-wrap: wrap;
    display: flex;
    justify-content: left;
  }
}
</style>
