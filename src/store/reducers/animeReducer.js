import {
  ADD_TO_HISTORY, LOAD_ANIME_LIST, REMOVE_ALL_HISTORY, REMOVE_FROM_HISTORY,
} from '../constants';

const initialState = {
  animeList: [],
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY: {
      const isAnimeInHistory = state.history.some((item) => item.id === action.anime.id);

      return isAnimeInHistory
        ? state
        : {
          ...state,
          history: [...state.history, action.anime],
        };
    }
    case LOAD_ANIME_LIST:
      return {
        ...state,
        animeList: action.animeList,
      };
    case REMOVE_ALL_HISTORY:
      return {
        ...state,
        history: [],
      };
    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: [
          ...state.history.filter((item, index) => index !== action.index),
        ],
      };
    default:
      return state;
  }
};
