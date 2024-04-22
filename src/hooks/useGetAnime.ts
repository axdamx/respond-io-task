// // // useAnimeDetails.js
// // // import { useQuery } from 'react-query';

// // import {useQuery} from '@tanstack/react-query';

// // const fetchAnimeDetails = async () => {
// // //   await new Promise(resolve => setTimeout(resolve, 3000));

// //   const response = await fetch('https://api.jikan.moe/v4/anime');
// //   if (!response.ok) {
// //     throw new Error('Network response was not ok');
// //   }
// //   return response.json();
// // };

// // const useAnimeDetails = () => {
// //   return useQuery({
// //     queryFn: () => fetchAnimeDetails(),
// //     queryKey: ['anime'],
// //   });
// // };

// // export default useAnimeDetails;

// import {useInfiniteQuery} from '@tanstack/react-query';

// const fetchAnimePage = async ({pageParam = 1}) => {
//   const response = await fetch(
//     `https://api.jikan.moe/v4/top/anime?page=${pageParam}`,
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch anime data');
//   }
//   return response.json();
// };

// const useAnimePagination = () => {
//   return useInfiniteQuery({
//     queryKey: ['pagination'],
//     queryFn: ({pageParam}) => fetchAnimePage({pageParam}),
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
//       lastPage.nextCursor,
//   });
//   return {
//     data,
//     isLoading,
//     isError,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   };
// };

// export default useAnimePagination;

import {useInfiniteQuery} from '@tanstack/react-query';
import useAnimeStore from '../store/animeStore';

const fetchAnimePage = async ({pageParam = 1}) => {
  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?page=${pageParam}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch anime data');
  }
  return response.json();
};

const useAnimePagination = () => {
  const {setAnimeData} = useAnimeStore();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pagination'],
    queryFn: ({pageParam}) => fetchAnimePage({pageParam}),
    getNextPageParam: (lastPage, allPages) => {
       if (lastPage.length === 0) return undefined;
       return allPages.length + 1;
    },
    // onSuccess: (fetchedData) => {
    //     setAnimeData(fetchedData.pages); // Set fetched data in Zustand store
    //   },
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

export default useAnimePagination;
