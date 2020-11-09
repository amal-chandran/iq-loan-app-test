import queryString from 'query-string';
import { API_URI } from '../configs';

export const requestJsonAPI = (thunk, method, path, body, params) => {
  const state = thunk.getState();
  const requestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let queryParmString = '';
  if (params) {
    const queryParms = queryString.stringify(params);
    queryParmString = `?${queryParms}`;
  }

  if (body) {
    requestInit.body = JSON.stringify(body);
  }
  // console.log(state);
  if (state && state.auth && state.auth.token) {
    requestInit.headers['Authorization'] = `Bearer ${state.auth.token}`;
  }

  return fetch(`${API_URI}${path}${queryParmString}`, requestInit)
    .then((response) => response.json())
    .then((response) => {
      if (response && response.success) {
        return response;
      } else {
        return thunk.rejectWithValue(response.error);
      }
    });
};
