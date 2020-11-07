import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';

export default combineReducers({
  auth: authReducer,
});
