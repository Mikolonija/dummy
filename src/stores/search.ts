import { defineStore } from 'pinia';

const useSearchStore = defineStore('search', {
  state: () => ({
    confirmProductText: '' as string,
    productSearchText: '' as string,
  }),
  actions: {
    confirmProductTextValue(): void {
      this.confirmProductText = this.productSearchText;
    },
    clearProductSearchTextValue(): void {
      this.confirmProductText = '';
      this.productSearchText = '';
    },
  },
});

export { useSearchStore };
