<template>
  <div>
    <div class="product-title-container">
      <router-link to="/" class="font-poppins-medium-24">&lt; Back</router-link>
      <h1 v-show="Object.entries(product).length > 0" class="font-poppins-medium-24">
        {{ product.title }}
      </h1>
    </div>
    <template v-if="!loading">
      <div class="product-card" v-if="Object.entries(product).length > 0">
        <ul>
          <li>{</li>
          <li
            class="product-card-container"
            v-for="[key, value] in Object.entries(product)"
            :key="key"
          >
            <span class="font-lato-bold-16"> {{ key }}: </span>
            <span class="font-poppins-light-16">
              {{ value }}
            </span>
          </li>
          <li>}</li>
        </ul>
      </div>
      <template v-else>
        <Empty />
      </template>
    </template>
    <div v-else class="layout-center">
      <div class="loader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { productAPI } from '@/config';
import type { IProduct } from '@/types/interfaces/product';
import { useFetch } from '@/utils/helpers';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import Empty from '@/components/Empty.vue';

const router = useRouter();
const product = ref<IProduct>({} as IProduct);
const { fetchData, loading, error } = useFetch();

const fetchProduct = async (): Promise<void> => {
  const res = await fetchData(`${productAPI}/${router.currentRoute.value.params.id}`, {
    method: 'GET',
  });
  if (res?.data) product.value = res.data as IProduct;
  else toast.error(error.value ?? 'Failed to fetch products.');
};

onMounted(() => {
  fetchProduct();
});
</script>

<style lang="scss" scoped>
.product-title-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: $spacing-medium;
}

.product-card {
  word-break: break-word;
  background-color: var(--c-dark);
  border-radius: $radius-small;
  text-align: left;
  color: var(--c-green);
  padding: $spacing-medium;
  margin: $spacing-large 0 0 0;

  &-container {
    padding-left: $spacing-medium;
  }
}
</style>
