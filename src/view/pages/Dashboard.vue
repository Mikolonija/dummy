<template>
  <div>
    <h1 class="font-poppins-medium-24">Products Information</h1>
    <div class="search-products">
      <div
        v-for="(criteria, index) in searchCriteria"
        :key="index"
        class="search-products-container"
      >
        <label
          class="font-poppins-regular-16 search-products-description"
          :for="'criteria-' + index"
        >
          {{ criteria.label }}
        </label>
        <input
          :id="'criteria-' + index"
          class="search-products-input font-poppins-light-16"
          type="text"
          disabled
          :placeholder="`Enter ${criteria.label.toLowerCase()}`"
        />
      </div>
    </div>
    <div class="product-table" v-if="!loading">
      <table :class="productList.length === 0 && 'table-empty'">
        <thead class="font-lato-bold-16">
          <tr>
            <th>
              <span class="layout-center">
                <input
                  type="checkbox"
                  class="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  aria-label="Selected  {{ selectedRows.length }} of {{ productList.length }}"
                />
              </span>
            </th>
            <th v-for="(column, i) in headerTitle" :key="i">
              <template v-if="column.sort && productList.length > 0">
                <button @click="sortDataItem(column.text)" class="font-lato-bold-16">
                  {{ column.text }}
                  {{ sortState.column === column.text && sortState.order === 'asc' ? '▲' : '▼' }}
                </button>
              </template>
              <template v-else>
                {{ column.text }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody class="font-poppins-regular-16 product-table-tbody">
          <template v-if="productList.length > 0">
            <tr v-for="product in productList" :key="product.id">
              <td>
                <span class="layout-center">
                  <input
                    type="checkbox"
                    class="checkbox"
                    v-model="selectedRows"
                    :value="product.id"
                    aria-label="Select product {{ product.name }}"
                  />
                </span>
              </td>
              <td @click="redirectProductInfo(product.id)" class="product-table-active-text">
                <span :title="checkAndFormatData(product.title)" class="hide-text">
                  {{ checkAndFormatData(product.title) }}
                </span>
              </td>
              <td class="hide-laptop">
                <span :title="checkAndFormatData(product.category)" class="hide-text">
                  {{ checkAndFormatData(product.category) }}
                </span>
              </td>
              <td class="hide-phone">
                <span :title="checkAndFormatData(product.brand)" class="hide-text">
                  {{ checkAndFormatData(product.brand) }}
                </span>
              </td>
              <td class="hide-laptop">
                <span :title="checkAndFormatData(product.price)">
                  {{ checkAndFormatData(product.price, '$') }}
                </span>
              </td>
              <td class="hide-laptop">
                <span :title="checkAndFormatData(product.stock)">
                  {{ checkAndFormatData(product.stock) }}
                </span>
              </td>
              <td class="hide-laptop">
                <span :title="checkAndFormatData(product.rating)">
                  {{ checkAndFormatData(product.rating, '$') }}
                </span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="7">
              <span> Not found </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="layout-center">
      <div class="loader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { productAPI, defaultSortState, defaultSearchCriteria, defaultHeaderTitle } from '@/config';
import { useFetch, checkAndFormatData } from '@/utils/helpers';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import type { IProduct, IProducts } from '@/types/interfaces/product';
import type { IHeader, ISearch, ISortState } from '@/types/interfaces/table';
import { useSearchStore } from '@/stores/search';

const productList = ref<IProduct[]>([]);
const selectedRows = ref<number[]>([]);
const sortState = ref<ISortState>(defaultSortState);
const searchCriteria = ref<ISearch[]>(defaultSearchCriteria);
const headerTitle: IHeader[] = defaultHeaderTitle;
const { fetchData, loading, error } = useFetch<IProducts>();
const router = useRouter();
const searchStore = useSearchStore();

const isAllSelected = computed(() => {
  return productList.value.length !== 0 && productList.value.length === selectedRows.value.length;
});

const toggleSelectAll = (): void => {
  if (isAllSelected.value) selectedRows.value = [];
  else selectedRows.value = productList.value.map((product) => product.id);
};

const redirectProductInfo = (productId: number): void => {
  router.push({ name: 'product', params: { id: productId } });
};

const sortDataItem = (column: string): void => {
  if (sortState.value.column === column) {
    sortState.value.order = sortState.value.order === 'asc' ? 'desc' : 'asc';
  } else {
    sortState.value.column = column;
    sortState.value.order = 'asc';
  }
  sortData();
};

const sortData = (): void => {
  const { column, order } = sortState.value;
  if (column && productList.value.length > 0) {
    productList.value.sort((a: IProduct, b: IProduct) => {
      const valueA = a[column.toLowerCase() as keyof IProduct];
      const valueB = b[column.toLowerCase() as keyof IProduct];
      if (valueA === undefined) return 1;
      if (valueB === undefined) return -1;
      const strA = valueA.toString().toLowerCase();
      const strB = valueB.toString().toLowerCase();
      if (order === 'asc') return strA.localeCompare(strB);
      else return strB.localeCompare(strA);
    });
  }
};

const resetTable = (): void => {
  selectedRows.value = [];
  sortState.value = { ...defaultSortState };
};

const searchData = async (searchText: string): Promise<void> => {
  const res = await fetchData(`${productAPI}/search?q=${searchText}`, {
    method: 'GET',
  });
  if (res?.data?.products) {
    resetTable();
    productList.value = res.data.products;
  } else toast.error(error.value ?? 'Failed to fetch products.');
};

watch(
  () => searchStore.confirmProductText,
  (newValue) => {
    searchData(newValue);
  },
);

const fetchProducts = async (): Promise<void> => {
  const res = await fetchData(productAPI, { method: 'GET' });
  if (res?.data?.products) productList.value = res.data.products;
  else toast.error(error.value ?? 'Failed to fetch products.');
};

onMounted(() => {
  fetchProducts();
});
</script>

<style lang="scss" scoped>
.search-products {
  margin: $spacing-x-large 0;
  gap: 22px;
  display: flex;
  flex-wrap: wrap;

  &-container {
    display: grid;
  }

  &-description {
    padding: 0 0 $spacing-medium 0;
  }

  &-input {
    cursor: not-allowed;
  }
}

.product-table {
  overflow-x: auto;

  &-tbody {
    color: var(--c-table-text);
  }

  &-active-text {
    cursor: pointer;
    color: var(--c-active);
  }
}

.table-empty td {
  text-align: center;
}

@include media-query(laptop) {
  table {
    min-width: 100%;
  }

  th {
    display: none;
  }

  th:nth-child(1) {
    width: 24px;
    display: table-cell;
  }

  th:nth-child(2),
  th:nth-child(4) {
    display: table-cell;
    width: auto;
  }

  .search-products-container {
    width: 100%;

    input {
      width: 100%;
    }
  }

  .hide-laptop {
    display: none;
  }
}

@include media-query(phone) {
  tr {
    width: 100%;
  }

  th:nth-child(4) {
    display: none;
  }

  th:nth-child(2) {
    padding: $spacing-small 0;
    display: table-cell;
    width: auto;
  }

  .hide-phone {
    display: none;
  }
}
</style>
