import { combineReducers } from 'redux';
import {
  TOGGLE_DARKMODE
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

const rootReducer = combineReducers({
  darkMode,
});

export default rootReducer;
