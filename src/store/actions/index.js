import * as Constants from '../constants';

export const addToHistory = (anime) => ({
  type: Constants.ADD_TO_HISTORY,
  anime,
});

export const loadAnimeList = (animeList) => ({
  type: Constants.LOAD_ANIME_LIST,
  animeList,
});

export const markEpisodeAsComplete = (episode) => ({
  type: Constants.MARK_EPISODE_COMPLETE,
  episode,
});

export const removeAllHistory = () => ({
  type: Constants.REMOVE_ALL_HISTORY,
});

export const removeFromHistory = (anime) => ({
  type: Constants.REMOVE_FROM_HISTORY,
  anime,
});

export const undoMarkEpisodeAsComplete = (episode) => ({
  type: Constants.UNDO_MARK_EPISODE_COMPLETE,
  episode,
});
