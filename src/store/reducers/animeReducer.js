import * as Constants from '../constants';

const initialState = {
  animeList: [],
  animeObjectForEpisodes: {},
  history: [],
  favorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.ADD_TO_HISTORY:
      return {
        ...state,
        history: [
          ...state.history.filter((item) => item.id !== action.anime.id),
          action.anime,
        ],
      };
    case Constants.LOAD_ANIME_LIST:
      return {
        ...state,
        animeList: action.animeList,
      };
    case Constants.MARK_EPISODE_COMPLETE: {
      const animeID = action.episode.anime_id;
      const episodeNumber = action.episode.number;

      const arrayOfEpisodes = state.animeObjectForEpisodes[animeID] || [];

      if (arrayOfEpisodes.includes(episodeNumber)) return state;

      return {
        ...state,
        animeObjectForEpisodes: {
          ...state.animeObjectForEpisodes,
          [animeID]: [...arrayOfEpisodes, episodeNumber],
        },
      };
    }
    case Constants.REMOVE_ALL_HISTORY:
      return {
        ...state,
        history: [],
      };
    case Constants.REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: [...state.history.filter((item) => item.id !== action.anime.id)],
      };
    case Constants.UNDO_MARK_EPISODE_COMPLETE: {
      const animeID = action.episode.anime_id;
      const episodeNumber = action.episode.number;

      const arrayOfEpisodes = state.animeObjectForEpisodes[animeID];

      if (arrayOfEpisodes.includes(episodeNumber)) {
        return {
          ...state,
          animeObjectForEpisodes: {
            ...state.animeObjectForEpisodes,
            [animeID]: [...arrayOfEpisodes.filter((item) => item !== episodeNumber)],
          },
        };
      }

      return state;
    }
    case Constants.ADD_TO_FAVORITES: {
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((item) => item.id !== action.anime.id),
          action.anime,
        ],
      };
    }
    case Constants.REMOVE_ALL_FAVORITES: {
      return {
        ...state,
        favorites: [],
      };
    }
    case Constants.REMOVE_FROM_FAVORITES: {
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((item) => item.id !== action.anime.id),
        ],
      };
    }
    default:
      return state;
  }
};
