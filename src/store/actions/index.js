import * as Constants from '../constants';

// History actions
export const addToHistory = (anime) => ({
  type: Constants.ADD_TO_HISTORY,
  anime,
});

export const removeAllHistory = () => ({
  type: Constants.REMOVE_ALL_HISTORY,
});

export const removeFromHistory = (anime) => ({
  type: Constants.REMOVE_FROM_HISTORY,
  anime,
});

// Anime and episode actions
export const loadAnimeList = (animeList) => ({
  type: Constants.LOAD_ANIME_LIST,
  animeList,
});

export const markEpisodeAsComplete = (episode) => ({
  type: Constants.MARK_EPISODE_COMPLETE,
  episode,
});

export const undoMarkEpisodeAsComplete = (episode) => ({
  type: Constants.UNDO_MARK_EPISODE_COMPLETE,
  episode,
});

// Favorite anime actions
export const addToFavorites = (anime) => ({
  type: Constants.ADD_TO_FAVORITES,
  anime,
});

export const removeAllFavorites = () => ({
  type: Constants.REMOVE_ALL_FAVORITES,
});

export const removeFromFavorites = (anime) => ({
  type: Constants.REMOVE_FROM_FAVORITES,
  anime,
});
