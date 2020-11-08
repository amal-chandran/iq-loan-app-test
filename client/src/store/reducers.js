import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import usersReducer from './slices/users.slice';
import modelReducer from './slices/model.slice';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  model: modelReducer,
});
