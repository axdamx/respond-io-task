// useAnimeDetails.js
// import { useQuery } from 'react-query';

import {useQuery} from '@tanstack/react-query';

const fetchAnimeDetails = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));

  const response = await fetch('https://api.jikan.moe/v4/anime');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useAnimeDetails = () => {
  return useQuery({
    queryFn: () => fetchAnimeDetails(),
    queryKey: ['anime'],
  });
};

export default useAnimeDetails;
