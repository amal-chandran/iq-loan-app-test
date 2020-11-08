import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import usersReducer from './slices/users.slice';
import loansReducer from './slices/loans.slice';
import modelReducer from './slices/model.slice';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  loans: loansReducer,
  model: modelReducer,
});
