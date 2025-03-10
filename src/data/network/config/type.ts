export interface GetType {
  path: string;
  headers?: Record<string, any>;
  queryParams?: Record<string, any>;
}

export interface PostType {
  path: string;
  headers?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: any;
}

export interface PutType {
  path: string;
  headers?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: any;
}

export interface PatchType {
  path: string;
  headers?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: any;
}

export interface DeleteType {
  path: string;
  headers?: Record<string, any>;
  queryParams?: Record<string, any>;
}
