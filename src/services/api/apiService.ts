import { BASE_URL, apiClient } from '../../api/config.ts';

type ObjectWithKeys<T> = {
  [N in keyof T]: T[N]
}

export const apiService = {
  async get(url: string, params: ObjectWithKeys<Record<string, any>> = {}) {
    const urlWithParams = new URL(url);
    if (params) {
      Object.keys(params).forEach((key: string) => {
        console.log('key params[key]', key, params[key])
        urlWithParams.searchParams.append(key, params[key]);
      });
    }
    const response = await apiClient.get(BASE_URL + urlWithParams.toString());
    if (response.status >= 400) {
      return response.status;
    }
    return response.data;
  }
};