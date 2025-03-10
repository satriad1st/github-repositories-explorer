import { GithubAccount } from '@/data/models/github-account.model';
import { GithubRepository } from '@/data/models/github-repository.model';
import { FetchHttpClient } from '../config/fetch';
import type { IHttpClient } from '../config/http-client.interface';

const GithubRemoteData = (client: IHttpClient) => ({
  getGithubAccounts: async (p?: {
    search?: string;
  }): Promise<GithubAccount[]> => {
    const response = await client.get({
      path: '/search/users',
      queryParams: {
        q: p?.search,
      },
    });
    return response.items;
  },
  getGithubRepositories: async (username: string): Promise<GithubRepository[]> => {
    const response = await client.get({
      path: `/users/${username}/repos`,
    });
    return response;
  },
});

export const githubRemotedata = GithubRemoteData(FetchHttpClient);
