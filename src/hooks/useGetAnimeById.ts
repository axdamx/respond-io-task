// useAnimeDetails.js
// import { useQuery } from 'react-query';

import {useQuery} from '@tanstack/react-query';

const fetchAnimeDetailsById = async (id: number) => {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime details');
  }
  return response.json();
};

const useAnimeDetailsById = (id: number) => {
  return useQuery({
    queryFn: () => fetchAnimeDetailsById(id),
    queryKey: ['animeById'],
  });
};

export default useAnimeDetailsById;
