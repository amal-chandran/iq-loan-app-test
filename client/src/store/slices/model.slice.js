import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    openModel(state, action) {
      state[action.payload.name] = { status: true, data: action.payload.data };
    },
    closeModel(state, action) {
      state[action.payload].status = false;
    },
    toggleModel(state, action) {
      state[action.payload].status = !state[action.payload].status;
    },
  },
});

export const { openModel, closeModel, toggleModel } = modelSlice.actions;
export default modelSlice.reducer;
