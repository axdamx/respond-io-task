// @ts-nocheck to disable type checking per file
import {create} from 'zustand';

const useAnimeStore = create(set => ({
  animeData: [],
  setAnimeData: data => set({animeData: data}),
}));

export default useAnimeStore;
