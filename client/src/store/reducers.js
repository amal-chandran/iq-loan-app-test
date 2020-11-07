import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import modelReducer from './slices/model.slice';

export default combineReducers({
  auth: authReducer,
  model: modelReducer,
});
