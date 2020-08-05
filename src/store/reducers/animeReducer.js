import { LOAD_ANIME_LIST, REMOVE_ALL_HISTORY } from '../constants';

const initialState = {
  animeList: [],
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ANIME_LIST:
      return {
        ...state,
        animeList,
      };
    case REMOVE_ALL_HISTORY:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};
