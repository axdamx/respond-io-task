
// const fetchAnimePage = async (pageParam: number = 1) => {
//   const response = await fetch(
//     `https://api.jikan.moe/v4/top/anime?page=${pageParam}`,
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch anime data');
//   }
//   return response.json();
// };

// const useAnimeByPage = (page: number) => {
//   return useInfiniteQuery('animePage', ({ pageParam = 1 }) => fetchAnimePage(pageParam), {
//       getNextPageParam: (lastPage) => lastPage.next_page,
// };

// export default useAnimeByPage;

import {useInfiniteQuery} from 'react-query';

const fetchAnimePage = async (page: number) => {
  const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime data');
  }
  return response.json();
};

const useGetAnimeByPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('animePage', fetchAnimePage, {
    getNextPageParam: (lastPage) => lastPage.next_page,
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useGetAnimeByPage;
