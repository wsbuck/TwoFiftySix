import { combineReducers } from 'redux';
import {
  TOGGLE_DARKMODE,
  REQUEST_SCORESETTING,
  RECEIVE_SCORESETTING,
} from '../actions';

const darkMode = (
  state=matchMedia('(prefers-color-scheme: dark)').matches,
  action
  ) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return !state;
    default:
      return state;
  }
}

const scoreSetting = (
  state={
    isFetching: false,
    setting: {},
  },
  action
  ) => {
  switch (action.type) {
    case REQUEST_SCORESETTING:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_SCORESETTING:
      return Object.assign({}, state, {
        isFetching: false,
        setting: action.scoreSetting,
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  darkMode,
  scoreSetting,
});

export default rootReducer;
