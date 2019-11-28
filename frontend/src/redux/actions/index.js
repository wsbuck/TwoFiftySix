import gql from "graphql-tag";

import { AUTH_TOKEN_NAME } from '../../constants';

export const UPDATE_SCORESETTING = 'UPDATE_SCORESETTING';
export const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
export const SET_SCORESETTING = 'SET_SCORESETTING';
export const REQUEST_SCORESETTING = 'REQUEST_SCORESETTING';
export const RECEIVE_SCORESETTING = 'RECEIVE_SCORESETTING';

const GET_SCORESETTING = gql`
  query userScoreSettingQuery {
    userScoreSetting {
      num_qb
      num_rb
      num_wr
      num_te
      num_wrt
      num_qwrt
      num_teams
      pass_yds_pts
      pass_tds_pts
      pass_int_pts
      rush_yds_pts
      rush_tds_pts
      rec_rcp_pts
      rec_yds_pts
      rec_tds_pts
    }
  }
`;

export function toggleDarkMode() {
  return {
    type: TOGGLE_DARKMODE
  };
}

export function setScoreSetting(scoreSetting) {
  return {
    type: SET_SCORESETTING,
    scoreSetting,
  };
}

function receiveScoreSetting(json) {
  return {
    type: RECEIVE_SCORESETTING,
    scoreSetting: json,
  };
}

export function requestScoreSetting() {
  return {
    type: REQUEST_SCORESETTING,
  };
}

export function fetchScoreSetting() {
  return (dispatch) => {
    dispatch(requestScoreSetting());
    return fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        query: GET_SCORESETTING
      }),
    })
    .then(response => response.json())
    .then(json => dispatch(receiveScoreSetting(json.data.userScoreSetting)))
    .catch(error => console.log(error));
  }
}
