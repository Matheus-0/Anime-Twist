import {
  ADD_TO_HISTORY,
  LOAD_ANIME_LIST,
  MARK_EPISODE_COMPLETE,
  REMOVE_ALL_HISTORY,
  REMOVE_FROM_HISTORY,
  UNDO_MARK_EPISODE_COMPLETE,
} from '../constants';

const initialState = {
  animeList: [],
  animeObjectForEpisodes: {},
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: [
          ...state.history.filter((item) => item.id !== action.anime.id),
          action.anime,
        ],
      };
    case LOAD_ANIME_LIST:
      return {
        ...state,
        animeList: action.animeList,
      };
    case MARK_EPISODE_COMPLETE: {
      const animeID = action.episode.anime_id;
      const episodeNumber = action.episode.number;

      let arrayOfEpisodes = state.animeObjectForEpisodes[animeID] || [];

      arrayOfEpisodes = [...arrayOfEpisodes, episodeNumber];

      return {
        ...state,
        animeObjectForEpisodes: {
          ...state.animeObjectForEpisodes,
          [animeID]: arrayOfEpisodes,
        },
      };
    }
    case REMOVE_ALL_HISTORY:
      return {
        ...state,
        history: [],
      };
    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: [
          ...state.history.filter((item) => item.id !== action.anime.id),
        ],
      };
    case UNDO_MARK_EPISODE_COMPLETE: {
      const animeID = action.episode.anime_id;
      const episodeNumber = action.episode.number;

      return {
        ...state,
        animeObjectForEpisodes: {
          ...state.animeObjectForEpisodes,
          animeID: [
            ...state.animeObjectForEpisodes[animeID].filter(
              (item) => item.number !== episodeNumber,
            ),
          ],
        },
      };
    }
    default:
      return state;
  }
};
