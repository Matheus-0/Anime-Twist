import * as Constants from '../constants';

const initialState = {
  animeList: [],
  animeObjectForEpisodes: {},
  animeObjectForCurrentEpisode: {},
  favorites: [],
  settings: {
    askResume: true,
    autoplay: true,
    autoMark: true,
    highlight: true,
    preferEnglish: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((item) => item.id !== action.anime.id),
          action.anime,
        ],
      };
    case Constants.CHANGE_SETTING:
      if (Object.prototype.hasOwnProperty.call(state.settings, action.key)) {
        return {
          ...state,
          settings: {
            ...state.settings,
            [action.key]: action.value,
          },
        };
      }

      return state;
    case Constants.ERASE_ALL:
      return {
        ...state,
        animeObjectForEpisodes: {},
        animeObjectForCurrentEpisode: {},
      };
    case Constants.LOAD_ANIME_LIST:
      return {
        ...state,
        animeList: action.animeList,
      };
    case Constants.MARK_EPISODE_AS_CURRENT: {
      const animeID = action.episode.anime_id;
      const episodeNumber = action.episode.number;

      return {
        ...state,
        animeObjectForCurrentEpisode: {
          ...state.animeObjectForCurrentEpisode,
          [animeID]: episodeNumber,
        },
      };
    }
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
    case Constants.REMOVE_ALL_FAVORITES:
      return {
        ...state,
        favorites: [],
      };
    case Constants.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((item) => item.id !== action.anime.id),
        ],
      };
    case Constants.UNMARK_EPISODE_COMPLETE: {
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
    case Constants.UNMARK_EPISODE_AS_CURRENT: {
      if (state.animeObjectForCurrentEpisode) {
        const animeID = action.episode.anime_id;

        const { [animeID]: _, ...remainingAnime } = state.animeObjectForCurrentEpisode;

        return {
          ...state,
          animeObjectForCurrentEpisode: {
            ...remainingAnime,
          },
        };
      }

      return state;
    }
    case Constants.UPDATE_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };
    default:
      return state;
  }
};
