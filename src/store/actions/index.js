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

// Episode actions
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

// Favorites actions
export const addToFavorite = (anime) => ({
  type: Constants.ADD_TO_FAVORITE,
  anime,
});

export const removeAllFavorite = () => ({
  type: Constants.REMOVE_ALL_FAVORITE,
});

export const removeFromFavorite = (anime) => ({
  type: Constants.REMOVE_FROM_FAVORITE,
  anime,
});
