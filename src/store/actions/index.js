import { LOAD_ANIME_LIST, REMOVE_ALL_HISTORY } from '../constants';

export const loadAnimeList = (animeList) => ({
  type: LOAD_ANIME_LIST,
  payload: animeList,
});

export const removeAllHistory = () => ({
  type: REMOVE_ALL_HISTORY,
});
