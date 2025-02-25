<template>
  <div class="layout-center">
    <img
      :src="notFound"
      alt="Illustration of a person standing in an empty space, symbolizing a page with no content."
      class="not-found-img"
    />
  </div>
</template>

<script setup lang="ts">
import notFound from '@/assets/notFound.svg?url';
</script>

<style lang="scss" scoped>
.not-found-img {
  width: 600px;
  min-width: 300px;
}
</style>
