/* eslint no-param-reassign: "error" */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    newChannel(state, { payload }) {
      const { attributes } = payload;
      state.channels.push(attributes);
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      state.channels = state.channels.filter((c) => c.id !== id);
      const generalChannel = state.channels.find((c) => c.name === 'general');
      state.currentChannelId = generalChannel.id;
    },
    renameChannel(state, { payload }) {
      const { id, attributes: { name } } = payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
  },
});

const actions = { ...channelsSlice.actions };
export { actions };
export default channelsSlice.reducer;
