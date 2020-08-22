import {
  ADD_TO_HISTORY, LOAD_ANIME_LIST, REMOVE_ALL_HISTORY, REMOVE_FROM_HISTORY,
} from '../constants';

export const addToHistory = (anime) => ({
  type: ADD_TO_HISTORY,
  anime,
});

export const loadAnimeList = (animeList) => ({
  type: LOAD_ANIME_LIST,
  animeList,
});

export const removeAllHistory = () => ({
  type: REMOVE_ALL_HISTORY,
});

export const removeFromHistory = (anime) => ({
  type: REMOVE_FROM_HISTORY,
  anime,
});
