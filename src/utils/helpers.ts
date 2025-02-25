import axios from 'axios';
import { ref } from 'vue';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions<T> {
  method: HttpMethod;
  headers?: Record<string, string>;
  data?: Record<string, T>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

export function useFetch<T>() {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function fetchData(url: string, options: FetchOptions<T>): Promise<ApiResponse<T> | null> {
    try {
      loading.value = true;
      const axiosConfig = {
        method: options.method,
        headers: options.headers,
        data: options.data,
        url,
      };
      const response = await axios(axiosConfig);
      error.value = null;
      return { data: response.data, status: response.status };
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message;
      else error.value = 'An unknown error occurred.';
      return null;
    } finally {
      loading.value = false;
    }
  }
  return { fetchData, loading, error };
}

export const checkAndFormatData = <T>(data: T, symbol: string = ''): string => {
  return data ? symbol + data.toString() : 'N/A';
};
