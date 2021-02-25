/* eslint no-param-reassign: "error" */

import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    newMessageChat(state, { payload }) {
      const { attributes } = payload;
      state.messages = [...state.messages, attributes];
    },
  },
  extraReducers: {
    [channelsActions.removeChannel](state, { payload }) {
      const { id } = payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

const actions = { ...messagesSlice.actions };
export { actions };
export default messagesSlice.reducer;
