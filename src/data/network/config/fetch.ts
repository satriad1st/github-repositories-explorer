import { queryParamToString } from '@/lib/utils';
import { BASE_URL } from './consts';
import type { IHttpClient } from './http-client.interface';
import type { DeleteType, GetType, PatchType, PostType, PutType } from './type';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const FetchHttpClient: IHttpClient = {
  get: async (p: GetType) => {
    const queryParams = queryParamToString(p.queryParams);
    const url = `${BASE_URL}${p.path}?${queryParams}`;
    const response = await fetch(url, { method: 'GET' });

    return handleResponse(response);
  },
  post: async (p: PostType) => {
    const queryParams = queryParamToString(p.queryParams);
    const url = `${BASE_URL}${p.path}?${queryParams}`;
    const response = await fetch(url, { method: 'POST', body: p.body });

    return handleResponse(response);
  },
  put: async (p: PutType) => {
    const queryParams = queryParamToString(p.queryParams);
    const url = `${BASE_URL}${p.path}?${queryParams}`;
    const response = await fetch(url, { method: 'PUT', body: p.body });

    return handleResponse(response);
  },
  patch: async (p: PatchType) => {
    const queryParams = queryParamToString(p.queryParams);
    const url = `${BASE_URL}${p.path}?${queryParams}`;
    const response = await fetch(url, { method: 'PATCH', body: p.body });

    return handleResponse(response);
  },
  delete: async (p: DeleteType) => {
    const queryParams = queryParamToString(p.queryParams);
    const url = `${BASE_URL}${p.path}?${queryParams}`;
    const response = await fetch(url, { method: 'DELETE' });

    return handleResponse(response);
  },
};
