import { Data } from '../../../../@types';
import { instance } from '../../instance';

const SEARCH_REPOSITOIRES_BASE_URL = 'search/repositories';

export const getRepositories = async (
  query,
  page,
  per_page,
  sort,
  order
): Promise<Data[]> => {
  const searchParams: Record<string, any> = new URLSearchParams({
    page: page,
    per_page: '' + per_page,
    sort: sort,
    order: order,
  });
  const response = await instance.get(
    `${SEARCH_REPOSITOIRES_BASE_URL}?q=${query}`,
    {
      params: searchParams,
    }
  );
  return response.data.items;
};
