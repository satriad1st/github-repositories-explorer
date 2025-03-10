import type { DeleteType, GetType, PatchType, PostType, PutType } from './type';

export interface IHttpClient {
  get: (data: GetType) => Promise<any>;
  post: (data: PostType) => Promise<any>;
  put: (data: PutType) => Promise<any>;
  patch: (data: PatchType) => Promise<any>;
  delete: (data: DeleteType) => Promise<any>;
}
