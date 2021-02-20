/* eslint no-param-reassign: "error" */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  type: null,
  item: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      return { ...payload, show: true };
    },
    closeModal() {
      return initialState;
    },
  },
});

const actions = { ...modal.actions };
export { actions };
export default modal.reducer;
