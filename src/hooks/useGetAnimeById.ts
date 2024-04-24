// @ts-nocheck to disable type checking per file
import {useQuery} from '@tanstack/react-query';
import {baseUrl, endPoints} from '../constants/api';

const fetchAnimeDetailsById = async (id: number) => {
  const response = await fetch(`${baseUrl}${endPoints.animeById}${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime details');
  }
  return response.json();
};

const useAnimeDetailsById = (id: number) => {
  return useQuery({
    queryFn: () => fetchAnimeDetailsById(id),
    queryKey: ['animeId'],
  });
};

export default useAnimeDetailsById;
