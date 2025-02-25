import { test, expect } from 'vitest';
import { productAPI } from '@/config';
import { useFetch } from '@/utils/helpers';

const axiosMock = async (config: { url: string; method: string }) => {
  if (config.url === productAPI) {
    return { data: 'test data', status: 200 };
  } else return '404';
};

test('useFetch fetches data successfully', async () => {
  const { fetchData, loading, error } = useFetch();
  await axiosMock({ url: productAPI, method: 'GET' });
  await fetchData(productAPI, { method: 'GET' });
  expect(loading.value).toBe(false);
  expect(error.value).toBe(null);
});

test('useFetch handles error during fetch', async () => {
  const { fetchData, loading, error } = useFetch();
  const invalidUrl = 'https://dummyjson.com/dssdaasd';
  await axiosMock({ url: invalidUrl, method: 'GET' });
  try {
    await fetchData(invalidUrl, { method: 'GET' });
  } catch (err) {
    expect(loading.value).toBe(false);
    expect(error.value).toBe('404');
  }
});
