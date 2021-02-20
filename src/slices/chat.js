/* eslint no-param-reassign: "error" */

import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';

const chat = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    fetchState(state, { payload }) {
      state.messages = payload;
    },
    newMessageChat(state, { payload }) {
      const { attributes } = payload;
      state.messages = [...state.messages, attributes];
    },
    deleteMessages(state, { payload }) {
      const { id } = payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

const addMessage = async ({ name, message, currentChannelId }) => {
  const url = routes.channelMessagesPath(currentChannelId);
  const data = {
    attributes: {
      name,
      message,
    },
  };
  try {
    await axios.post(url, { data });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const actions = { ...chat.actions };
export { actions, addMessage };
export default chat.reducer;
