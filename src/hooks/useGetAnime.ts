// @ts-nocheck to disable type checking per file
import {useInfiniteQuery} from '@tanstack/react-query';
import {baseUrl, endPoints} from '../constants/api';

interface FetchAnimePageParams {
  pageParam?: number;
  filter?: string;
}

const fetchAnimePage = async ({
  pageParam = 1,
  filter,
}: FetchAnimePageParams) => {
  let url = `${baseUrl}${endPoints.topAnime}?page=${pageParam}`;

  // Append filter to URL if provided
  if (filter) {
    url += `&filter=${filter}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch anime data');
  }
  return response.json();
};

const useAnimePagination = (filter?: string) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [filter],
    queryFn: ({pageParam}) => fetchAnimePage({pageParam, filter}),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};

export default useAnimePagination;
