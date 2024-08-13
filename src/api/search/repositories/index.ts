import { GitHubRepositoriesResponse } from '../../../../@types';
import { instance } from '../../instance';

export interface QueryRepositoriesParams {
  query: string;
  page: number;
  per_page: number;
  sort: Sort;
  order: Order;
}

const SEARCH_REPOSITOIRES_BASE_URL = 'search/repositories';

export const getRepositories = async ({
  query,
  page,
  per_page,
  sort,
  order,
}: QueryRepositoriesParams): Promise<GitHubRepositoriesResponse> => {
  const queryParams: Record<string, any> = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
    sort: sort,
    order: order,
  });
  const response = await instance.get(
    `${SEARCH_REPOSITOIRES_BASE_URL}?q=${query}`,
    {
      params: queryParams,
    }
  );
  return response.data;
};
