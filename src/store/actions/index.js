import {
  ADD_TO_HISTORY,
  LOAD_ANIME_LIST,
  MARK_EPISODE_COMPLETE,
  REMOVE_ALL_HISTORY,
  REMOVE_FROM_HISTORY,
  UNDO_MARK_EPISODE_COMPLETE,
} from '../constants';

export const addToHistory = (anime) => ({
  type: ADD_TO_HISTORY,
  anime,
});

export const loadAnimeList = (animeList) => ({
  type: LOAD_ANIME_LIST,
  animeList,
});

export const markEpisodeAsComplete = (episode) => ({
  type: MARK_EPISODE_COMPLETE,
  episode,
});

export const removeAllHistory = () => ({
  type: REMOVE_ALL_HISTORY,
});

export const removeFromHistory = (anime) => ({
  type: REMOVE_FROM_HISTORY,
  anime,
});

export const undoMarkEpisodeAsComplete = (episode) => ({
  type: UNDO_MARK_EPISODE_COMPLETE,
  episode,
});
