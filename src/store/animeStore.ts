import {create} from 'zustand';

const useAnimeStore = create(set => ({
  animeData: [],
  setAnimeData: data => set({animeData: data}),
}));

export default useAnimeStore;
