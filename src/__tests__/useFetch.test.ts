import { describe, expect, it } from 'vitest';
import { productAPI } from '@/config';
import { useFetch } from '@/utils/helpers';

describe('#FetchData', () => {
  it('useFetch fetches data successfully', async () => {
    const { fetchData, loading, error } = useFetch();
    await fetchData(productAPI, { method: 'GET' });
    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
  });

  it('useFetch handles fetch error correctly', async () => {
    const { fetchData, loading, error } = useFetch();
    const invalidUrl = 'https://dummyjson.com/dssdaasd';
    await fetchData(invalidUrl, { method: 'GET' });
    expect(loading.value).toBe(false);
    expect(error.value).not.toBe(null);
  });
});
