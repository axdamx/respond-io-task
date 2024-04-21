import {create} from 'zustand';

const useFavoriteStore = create(set => ({
  favorites: [],
  toggleFavorite: anime =>
    set(state => {
      const isFavorited = state.favorites.some(
        favItem => favItem.mal_id === anime.mal_id,
      );
      if (isFavorited) {
        return {
          favorites: state.favorites.filter(
            favItem => favItem.mal_id !== anime.mal_id,
          ),
        };
      } else {
        return {favorites: [...state.favorites, anime]};
      }
    }),
}));

export default useFavoriteStore;
